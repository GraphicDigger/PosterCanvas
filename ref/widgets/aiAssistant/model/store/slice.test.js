// ===================================================================
// Unit Tests for aiAssistant Redux Slice
// Widget State Management - AI Assistant Chat & Visibility
// Quick Win - Widget Testing (30 tests)
// ===================================================================

import { describe, it, expect, beforeEach } from 'vitest';
import aiAssistantReducer, {
  // Messenger actions
  addMessage,
  setActiveChat,
  selectMessage,
  createChat,
  deleteChat,
  resetMessenger,
  // Visible actions
  toggleModelEnabled,
  setModelEnabled,
  toggleAssistant,
  setAssistantOpen,
  resetVisible,
} from './slice';

describe('aiAssistant Redux Slice - Chat & Visibility Management', () => {
  let initialState;

  beforeEach(() => {
    initialState = aiAssistantReducer(undefined, { type: '@@INIT' });
  });

  // ===================================================================
  // PART 1: Initial State (3 tests)
  // ===================================================================

  describe('Initial State', () => {
    it('should return the initial state', () => {
      expect(initialState).toBeDefined();
      expect(initialState).toHaveProperty('chats');
      expect(initialState).toHaveProperty('activeChatId');
      expect(initialState).toHaveProperty('selectedMessageId');
      expect(initialState).toHaveProperty('isModelEnabled');
      expect(initialState).toHaveProperty('isAssistantOpen');
    });

    it('should have correct initial visibility state', () => {
      expect(initialState.isModelEnabled).toBe(true);
      expect(initialState.isAssistantOpen).toBe(false);
    });

    it('should have empty chats initially', () => {
      expect(initialState.chats).toEqual({});
      expect(initialState.activeChatId).toBeNull();
      expect(initialState.selectedMessageId).toBeNull();
    });
  });

  // ===================================================================
  // PART 2: Visibility Actions (8 tests)
  // ===================================================================

  describe('Visibility Actions', () => {
    it('should toggle model enabled state', () => {
      let state = aiAssistantReducer(initialState, toggleModelEnabled());
      expect(state.isModelEnabled).toBe(false);

      state = aiAssistantReducer(state, toggleModelEnabled());
      expect(state.isModelEnabled).toBe(true);
    });

    it('should set model enabled to true', () => {
      let state = aiAssistantReducer(initialState, setModelEnabled(false));
      expect(state.isModelEnabled).toBe(false);

      state = aiAssistantReducer(state, setModelEnabled(true));
      expect(state.isModelEnabled).toBe(true);
    });

    it('should set model enabled to false', () => {
      const state = aiAssistantReducer(initialState, setModelEnabled(false));
      expect(state.isModelEnabled).toBe(false);
    });

    it('should toggle assistant open state', () => {
      let state = aiAssistantReducer(initialState, toggleAssistant());
      expect(state.isAssistantOpen).toBe(true);

      state = aiAssistantReducer(state, toggleAssistant());
      expect(state.isAssistantOpen).toBe(false);
    });

    it('should set assistant open to true', () => {
      const state = aiAssistantReducer(initialState, setAssistantOpen(true));
      expect(state.isAssistantOpen).toBe(true);
    });

    it('should set assistant open to false', () => {
      let state = aiAssistantReducer(initialState, setAssistantOpen(true));
      state = aiAssistantReducer(state, setAssistantOpen(false));
      expect(state.isAssistantOpen).toBe(false);
    });

    it('should reset visibility to initial state', () => {
      let state = aiAssistantReducer(initialState, setModelEnabled(false));
      state = aiAssistantReducer(state, setAssistantOpen(true));

      state = aiAssistantReducer(state, resetVisible());
      expect(state.isModelEnabled).toBe(true);
      expect(state.isAssistantOpen).toBe(false);
    });

    it('should handle multiple visibility toggles', () => {
      let state = initialState;

      state = aiAssistantReducer(state, toggleModelEnabled());
      expect(state.isModelEnabled).toBe(false);

      state = aiAssistantReducer(state, toggleAssistant());
      expect(state.isAssistantOpen).toBe(true);

      state = aiAssistantReducer(state, toggleModelEnabled());
      expect(state.isModelEnabled).toBe(true);
    });
  });

  // ===================================================================
  // PART 3: Chat Creation & Management (6 tests)
  // ===================================================================

  describe('Chat Creation & Management', () => {
    it('should create a new chat', () => {
      const state = aiAssistantReducer(initialState, createChat('chat-1'));

      expect(state.chats['chat-1']).toBeDefined();
      expect(state.chats['chat-1'].id).toBe('chat-1');
      expect(state.chats['chat-1'].messages).toEqual([]);
      expect(state.chats['chat-1'].createdAt).toBeDefined();
      expect(state.activeChatId).toBe('chat-1');
    });

    it('should create chat with auto-generated ID when not provided', () => {
      const state = aiAssistantReducer(initialState, createChat());

      const chatIds = Object.keys(state.chats);
      expect(chatIds.length).toBe(1);
      expect(chatIds[0]).toMatch(/^chat-\d+$/);
      expect(state.activeChatId).toBe(chatIds[0]);
    });

    it('should create multiple chats', () => {
      let state = initialState;

      state = aiAssistantReducer(state, createChat('chat-1'));
      state = aiAssistantReducer(state, createChat('chat-2'));
      state = aiAssistantReducer(state, createChat('chat-3'));

      expect(Object.keys(state.chats).length).toBe(3);
      expect(state.activeChatId).toBe('chat-3'); // Last created becomes active
    });

    it('should delete a chat', () => {
      let state = aiAssistantReducer(initialState, createChat('chat-1'));
      state = aiAssistantReducer(state, deleteChat('chat-1'));

      expect(state.chats['chat-1']).toBeUndefined();
    });

    it('should reset active chat when deleting active chat', () => {
      let state = aiAssistantReducer(initialState, createChat('chat-1'));
      expect(state.activeChatId).toBe('chat-1');

      state = aiAssistantReducer(state, deleteChat('chat-1'));
      expect(state.activeChatId).toBeNull();
    });

    it('should not reset active chat when deleting non-active chat', () => {
      let state = aiAssistantReducer(initialState, createChat('chat-1'));
      state = aiAssistantReducer(state, createChat('chat-2'));
      expect(state.activeChatId).toBe('chat-2');

      state = aiAssistantReducer(state, deleteChat('chat-1'));
      expect(state.activeChatId).toBe('chat-2');
      expect(state.chats['chat-1']).toBeUndefined();
      expect(state.chats['chat-2']).toBeDefined();
    });
  });

  // ===================================================================
  // PART 4: Message Management (7 tests)
  // ===================================================================

  describe('Message Management', () => {
    it('should add message to existing chat', () => {
      let state = aiAssistantReducer(initialState, createChat('chat-1'));

      const message = { id: 'msg-1', text: 'Hello', role: 'user' };
      state = aiAssistantReducer(state, addMessage({ chatId: 'chat-1', message }));

      expect(state.chats['chat-1'].messages).toHaveLength(1);
      expect(state.chats['chat-1'].messages[0]).toEqual(message);
    });

    it('should create chat if not exists when adding message', () => {
      const message = { id: 'msg-1', text: 'Hello', role: 'user' };
      const state = aiAssistantReducer(initialState, addMessage({ chatId: 'chat-1', message }));

      expect(state.chats['chat-1']).toBeDefined();
      expect(state.chats['chat-1'].messages).toHaveLength(1);
      expect(state.chats['chat-1'].messages[0]).toEqual(message);
    });

    it('should add multiple messages to same chat', () => {
      let state = aiAssistantReducer(initialState, createChat('chat-1'));

      const messages = [
        { id: 'msg-1', text: 'Hello', role: 'user' },
        { id: 'msg-2', text: 'Hi there!', role: 'assistant' },
        { id: 'msg-3', text: 'How are you?', role: 'user' },
      ];

      messages.forEach(message => {
        state = aiAssistantReducer(state, addMessage({ chatId: 'chat-1', message }));
      });

      expect(state.chats['chat-1'].messages).toHaveLength(3);
      expect(state.chats['chat-1'].messages).toEqual(messages);
    });

    it('should add messages to different chats', () => {
      let state = initialState;

      const msg1 = { id: 'msg-1', text: 'Hello in chat 1', role: 'user' };
      const msg2 = { id: 'msg-2', text: 'Hello in chat 2', role: 'user' };

      state = aiAssistantReducer(state, addMessage({ chatId: 'chat-1', message: msg1 }));
      state = aiAssistantReducer(state, addMessage({ chatId: 'chat-2', message: msg2 }));

      expect(state.chats['chat-1'].messages).toHaveLength(1);
      expect(state.chats['chat-2'].messages).toHaveLength(1);
      expect(state.chats['chat-1'].messages[0]).toEqual(msg1);
      expect(state.chats['chat-2'].messages[0]).toEqual(msg2);
    });

    it('should set active chat', () => {
      let state = aiAssistantReducer(initialState, createChat('chat-1'));
      state = aiAssistantReducer(state, createChat('chat-2'));

      state = aiAssistantReducer(state, setActiveChat('chat-1'));
      expect(state.activeChatId).toBe('chat-1');
    });

    it('should select message', () => {
      const state = aiAssistantReducer(initialState, selectMessage('msg-1'));
      expect(state.selectedMessageId).toBe('msg-1');
    });

    it('should deselect message by setting null', () => {
      let state = aiAssistantReducer(initialState, selectMessage('msg-1'));
      state = aiAssistantReducer(state, selectMessage(null));
      expect(state.selectedMessageId).toBeNull();
    });
  });

  // ===================================================================
  // PART 5: Reset & Integration Scenarios (6 tests)
  // ===================================================================

  describe('Reset & Integration Scenarios', () => {
    it('should reset messenger state', () => {
      let state = aiAssistantReducer(initialState, createChat('chat-1'));
      const message = { id: 'msg-1', text: 'Hello', role: 'user' };
      state = aiAssistantReducer(state, addMessage({ chatId: 'chat-1', message }));
      state = aiAssistantReducer(state, selectMessage('msg-1'));

      state = aiAssistantReducer(state, resetMessenger());

      expect(state.chats).toEqual({});
      expect(state.activeChatId).toBeNull();
      expect(state.selectedMessageId).toBeNull();
    });

    it('should handle complete chat workflow', () => {
      let state = initialState;

      // Open assistant
      state = aiAssistantReducer(state, setAssistantOpen(true));
      expect(state.isAssistantOpen).toBe(true);

      // Create chat
      state = aiAssistantReducer(state, createChat('chat-1'));
      expect(state.activeChatId).toBe('chat-1');

      // Add messages
      const msg1 = { id: 'msg-1', text: 'Hello', role: 'user' };
      const msg2 = { id: 'msg-2', text: 'Hi!', role: 'assistant' };
      state = aiAssistantReducer(state, addMessage({ chatId: 'chat-1', message: msg1 }));
      state = aiAssistantReducer(state, addMessage({ chatId: 'chat-1', message: msg2 }));

      expect(state.chats['chat-1'].messages).toHaveLength(2);

      // Select message
      state = aiAssistantReducer(state, selectMessage('msg-1'));
      expect(state.selectedMessageId).toBe('msg-1');
    });

    it('should handle multi-chat scenario', () => {
      let state = initialState;

      // Create multiple chats
      state = aiAssistantReducer(state, createChat('chat-1'));
      state = aiAssistantReducer(state, createChat('chat-2'));
      state = aiAssistantReducer(state, createChat('chat-3'));

      // Add messages to different chats
      state = aiAssistantReducer(state, addMessage({
        chatId: 'chat-1',
        message: { id: 'msg-1', text: 'Chat 1 message', role: 'user' },
      }));
      state = aiAssistantReducer(state, addMessage({
        chatId: 'chat-2',
        message: { id: 'msg-2', text: 'Chat 2 message', role: 'user' },
      }));

      // Switch active chat
      state = aiAssistantReducer(state, setActiveChat('chat-1'));
      expect(state.activeChatId).toBe('chat-1');

      // Delete one chat
      state = aiAssistantReducer(state, deleteChat('chat-3'));
      expect(Object.keys(state.chats).length).toBe(2);
    });

    it('should maintain visibility state through messenger operations', () => {
      let state = aiAssistantReducer(initialState, setAssistantOpen(true));
      state = aiAssistantReducer(state, setModelEnabled(false));

      state = aiAssistantReducer(state, createChat('chat-1'));
      state = aiAssistantReducer(state, addMessage({
        chatId: 'chat-1',
        message: { id: 'msg-1', text: 'Hello', role: 'user' },
      }));

      expect(state.isAssistantOpen).toBe(true);
      expect(state.isModelEnabled).toBe(false);
    });

    it('should handle state after full reset', () => {
      let state = initialState;

      // Set up complete state
      state = aiAssistantReducer(state, setAssistantOpen(true));
      state = aiAssistantReducer(state, createChat('chat-1'));
      state = aiAssistantReducer(state, addMessage({
        chatId: 'chat-1',
        message: { id: 'msg-1', text: 'Hello', role: 'user' },
      }));

      // Reset messenger (returns only initialMessenger, losing visibility state)
      state = aiAssistantReducer(state, resetMessenger());
      expect(state.chats).toEqual({});
      // Note: resetMessenger returns only messenger state, visibility is lost

      // Reset visibility restores visibility to initial state
      state = aiAssistantReducer(state, resetVisible());
      expect(state.isAssistantOpen).toBe(false);
      expect(state.isModelEnabled).toBe(true);
    });

    it('should maintain state immutability', () => {
      const state1 = aiAssistantReducer(initialState, createChat('chat-1'));
      const state2 = aiAssistantReducer(state1, addMessage({
        chatId: 'chat-1',
        message: { id: 'msg-1', text: 'Hello', role: 'user' },
      }));

      expect(state1).not.toBe(state2);
      expect(state1.chats['chat-1'].messages).toHaveLength(0);
      expect(state2.chats['chat-1'].messages).toHaveLength(1);
    });
  });
});

