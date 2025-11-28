// ===================================================================
// Unit Tests for Chat Slice
// CRITICAL BUSINESS LOGIC - Chat State Management
// Phase 1, Day 9 - Part 2 (32 tests) - 60% MILESTONE! 🎉
// ===================================================================

import { describe, it, expect, beforeEach, vi } from 'vitest';
import type { ChatState } from '../../types';

// Mock the adapter
vi.mock('@reduxjs/toolkit', async () => {
  const actual = await vi.importActual('@reduxjs/toolkit');
  return {
    ...actual,
    createEntityAdapter: () => ({
      getInitialState: () => ({ ids: [], entities: {} }),
      addOne: (state: any, entity: any) => {
        state.entities[entity.id] = entity;
        if (!state.ids.includes(entity.id)) {
          state.ids.push(entity.id);
        }
      },
      updateOne: (state: any, update: any) => {
        if (state.entities[update.id]) {
          state.entities[update.id] = { ...state.entities[update.id], ...update.changes };
        }
      },
      removeOne: (state: any, id: any) => {
        delete state.entities[id];
        state.ids = state.ids.filter((existingId: any) => existingId !== id);
      },
      setAll: (state: any, entities: any[]) => {
        state.ids = entities.map((e) => e.id);
        state.entities = entities.reduce((acc, e) => ({ ...acc, [e.id]: e }), {});
      },
    }),
  };
});

import chatEntitySlice, {
  setChats,
  setHoveredChatId,
  setFocusedChatId,
  setSelectedChatId,
  resetSelectedChat,
  addChat,
  updateChat,
  removeChat,
} from './slice';

describe('Chat Slice', () => {
  let initialState: ChatState;

  beforeEach(() => {
    initialState = {
      ids: [],
      entities: {},
      hoveredId: null,
      focusedId: null,
      selectedId: null,
    };
  });

  // ===================================================================
  // PART 1: UI State Management (4 tests)
  // ===================================================================

  describe('UI State Management', () => {
    it('should set hovered chat ID', () => {
      const state = chatEntitySlice(initialState, setHoveredChatId({ id: 'chat-1' } as any));
      expect(state.hoveredId).toBe('chat-1');
    });

    it('should set focused chat ID', () => {
      const state = chatEntitySlice(initialState, setFocusedChatId({ id: 'chat-2' } as any));
      expect(state.focusedId).toBe('chat-2');
    });

    it('should set selected chat ID', () => {
      const state = chatEntitySlice(initialState, setSelectedChatId({ id: 'chat-3' } as any));
      expect(state.selectedId).toBe('chat-3');
    });

    it('should reset selected chat', () => {
      initialState.selectedId = 'chat-1';
      const state = chatEntitySlice(initialState, resetSelectedChat());
      expect(state.selectedId).toBeNull();
    });
  });

  // ===================================================================
  // PART 2: Set Chats (Bulk Load) (7 tests)
  // ===================================================================

  describe('Set Chats (Bulk Load)', () => {
    it('should set chats (replace all)', () => {
      const chats = [
        { id: 'chat-1', title: 'General', memberIds: ['user-1', 'user-2'] },
        { id: 'chat-2', title: 'Development', memberIds: ['user-1'] },
      ];

      const state = chatEntitySlice(initialState, setChats(chats));

      expect(state.ids).toEqual(['chat-1', 'chat-2']);
      expect(Object.keys(state.entities)).toHaveLength(2);
    });

    it('should clear existing chats when setting new ones', () => {
      initialState.entities['chat-old'] = { id: 'chat-old', title: 'Old Chat' } as any;
      initialState.ids.push('chat-old');

      const chats = [{ id: 'chat-new', title: 'New Chat' }];
      const state = chatEntitySlice(initialState, setChats(chats));

      expect(state.entities['chat-old']).toBeUndefined();
      expect(state.entities['chat-new']).toBeDefined();
    });

    it('should handle empty array', () => {
      initialState.entities['chat-1'] = { id: 'chat-1', title: 'Chat' } as any;
      initialState.ids.push('chat-1');

      const state = chatEntitySlice(initialState, setChats([]));

      expect(state.ids).toHaveLength(0);
      expect(Object.keys(state.entities)).toHaveLength(0);
    });

    it('should preserve UI state when setting chats', () => {
      initialState.selectedId = 'chat-selected';

      const chats = [{ id: 'chat-1', title: 'Chat' }];
      const state = chatEntitySlice(initialState, setChats(chats));

      expect(state.selectedId).toBe('chat-selected');
    });

    it('should handle large number of chats', () => {
      const chats = Array.from({ length: 50 }, (_, i) => ({
        id: `chat-${i}`,
        title: `Chat ${i}`,
        memberIds: [],
      }));

      const state = chatEntitySlice(initialState, setChats(chats));

      expect(state.ids).toHaveLength(50);
      expect(Object.keys(state.entities)).toHaveLength(50);
    });

    it('should set chats with various properties', () => {
      const chats = [
        {
          id: 'chat-1',
          title: 'Team Chat',
          memberIds: ['user-1', 'user-2'],
          createdAt: '2025-01-01',
        },
      ];

      const state = chatEntitySlice(initialState, setChats(chats));

      expect(state.entities['chat-1']).toEqual(chats[0]);
    });

    it('should preserve chat order from payload', () => {
      const chats = [
        { id: 'chat-3', title: 'Third' },
        { id: 'chat-1', title: 'First' },
        { id: 'chat-2', title: 'Second' },
      ];

      const state = chatEntitySlice(initialState, setChats(chats));

      expect(state.ids).toEqual(['chat-3', 'chat-1', 'chat-2']);
    });
  });

  // ===================================================================
  // PART 3: Add Chat (7 tests)
  // ===================================================================

  describe('Add Chat', () => {
    it('should add chat', () => {
      const chat = {
        id: 'chat-1',
        title: 'General',
        memberIds: ['user-1'],
      };

      const state = chatEntitySlice(initialState, addChat(chat));

      expect(state.ids).toContain('chat-1');
      expect(state.entities['chat-1']).toEqual(chat);
    });

    it('should not add duplicate chat', () => {
      initialState.entities['chat-1'] = { id: 'chat-1', title: 'Existing' } as any;
      initialState.ids.push('chat-1');

      const chat = { id: 'chat-1', title: 'Duplicate' };
      const state = chatEntitySlice(initialState, addChat(chat));

      expect(state.ids).toHaveLength(1);
    });

    it('should preserve existing chats when adding new one', () => {
      initialState.entities['chat-existing'] = {
        id: 'chat-existing',
        title: 'Existing Chat',
      } as any;
      initialState.ids.push('chat-existing');

      const chat = { id: 'chat-new', title: 'New Chat' };
      const state = chatEntitySlice(initialState, addChat(chat));

      expect(state.entities['chat-existing']).toBeDefined();
      expect(state.ids).toHaveLength(2);
    });

    it('should not affect UI state when adding chat', () => {
      initialState.selectedId = 'chat-selected';

      const chat = { id: 'chat-1', title: 'Chat' };
      const state = chatEntitySlice(initialState, addChat(chat));

      expect(state.selectedId).toBe('chat-selected');
    });

    it('should add chat with minimal properties', () => {
      const chat = { id: 'chat-1' };
      const state = chatEntitySlice(initialState, addChat(chat as any));

      expect(state.entities['chat-1']).toEqual(chat);
    });

    it('should add chat with full properties', () => {
      const chat = {
        id: 'chat-1',
        title: 'Development Team',
        memberIds: ['user-1', 'user-2', 'user-3'],
        createdAt: '2025-01-01',
        lastMessage: 'Hello world',
      };

      const state = chatEntitySlice(initialState, addChat(chat as any));

      expect(state.entities['chat-1']).toEqual(chat);
    });

    it('should maintain insertion order', () => {
      let state = chatEntitySlice(initialState, addChat({ id: 'chat-3', title: 'Third' } as any));
      state = chatEntitySlice(state, addChat({ id: 'chat-1', title: 'First' } as any));
      state = chatEntitySlice(state, addChat({ id: 'chat-2', title: 'Second' } as any));

      expect(state.ids).toEqual(['chat-3', 'chat-1', 'chat-2']);
    });
  });

  // ===================================================================
  // PART 4: Update Chat (6 tests)
  // ===================================================================

  describe('Update Chat', () => {
    beforeEach(() => {
      initialState.entities['chat-1'] = {
        id: 'chat-1',
        title: 'General',
        memberIds: ['user-1'],
      } as any;
      initialState.ids.push('chat-1');
    });

    it('should update chat properties', () => {
      const state = chatEntitySlice(
        initialState,
        updateChat({
          id: 'chat-1',
          title: 'Updated General',
          memberIds: ['user-1', 'user-2'],
        } as any),
      );

      expect(state.entities['chat-1'].title).toBe('Updated General');
      expect(state.entities['chat-1'].memberIds).toEqual(['user-1', 'user-2']);
    });

    it('should handle updating non-existent chat', () => {
      const state = chatEntitySlice(
        initialState,
        updateChat({
          id: 'non-existent',
          title: 'Ghost',
        } as any),
      );

      expect(state.entities['non-existent']).toBeUndefined();
    });

    it('should update single property', () => {
      const state = chatEntitySlice(
        initialState,
        updateChat({
          id: 'chat-1',
          title: 'Updated Title',
          memberIds: ['user-1'],
        } as any),
      );

      expect(state.entities['chat-1'].title).toBe('Updated Title');
    });

    it('should not affect other chats when updating one', () => {
      initialState.entities['chat-2'] = {
        id: 'chat-2',
        title: 'Other Chat',
      } as any;
      initialState.ids.push('chat-2');

      const state = chatEntitySlice(
        initialState,
        updateChat({
          id: 'chat-1',
          title: 'Updated',
          memberIds: ['user-1'],
        } as any),
      );

      expect(state.entities['chat-2']).toEqual({
        id: 'chat-2',
        title: 'Other Chat',
      });
    });

    it('should not affect UI state when updating chat', () => {
      initialState.selectedId = 'chat-1';

      const state = chatEntitySlice(
        initialState,
        updateChat({
          id: 'chat-1',
          title: 'Updated',
          memberIds: ['user-1'],
        } as any),
      );

      expect(state.selectedId).toBe('chat-1');
    });

    it('should handle adding members to chat', () => {
      const state = chatEntitySlice(
        initialState,
        updateChat({
          id: 'chat-1',
          title: 'General',
          memberIds: ['user-1', 'user-2', 'user-3'],
        } as any),
      );

      expect(state.entities['chat-1'].memberIds).toHaveLength(3);
    });
  });

  // ===================================================================
  // PART 5: Remove Chat (3 tests)
  // ===================================================================

  describe('Remove Chat', () => {
    beforeEach(() => {
      initialState.entities = {
        'chat-1': { id: 'chat-1', title: 'Chat 1' } as any,
        'chat-2': { id: 'chat-2', title: 'Chat 2' } as any,
      };
      initialState.ids = ['chat-1', 'chat-2'];
    });

    it('should remove chat', () => {
      const state = chatEntitySlice(initialState, removeChat('chat-1'));

      expect(state.ids).not.toContain('chat-1');
      expect(state.entities['chat-1']).toBeUndefined();
      expect(state.entities['chat-2']).toBeDefined();
    });

    it('should handle removing non-existent chat', () => {
      const state = chatEntitySlice(initialState, removeChat('non-existent'));

      expect(state.ids).toHaveLength(2);
    });

    it('should not affect other chats', () => {
      const state = chatEntitySlice(initialState, removeChat('chat-1'));

      expect(state.ids).toContain('chat-2');
      expect(state.entities['chat-2']).toEqual({
        id: 'chat-2',
        title: 'Chat 2',
      });
    });
  });

  // ===================================================================
  // PART 6: Integration Scenarios (5 tests) - BONUS FOR 60%!
  // ===================================================================

  describe('Integration Scenarios', () => {
    it('should handle complete chat lifecycle', () => {
      let state = chatEntitySlice(
        initialState,
        addChat({
          id: 'chat-1',
          title: 'Team Chat',
          memberIds: ['user-1'],
        } as any),
      );
      state = chatEntitySlice(
        state,
        updateChat({
          id: 'chat-1',
          title: 'Updated Team Chat',
          memberIds: ['user-1', 'user-2'],
        } as any),
      );
      state = chatEntitySlice(state, setSelectedChatId({ id: 'chat-1' } as any));
      state = chatEntitySlice(state, removeChat('chat-1'));

      expect(state.ids).not.toContain('chat-1');
      expect(state.selectedId).toBe('chat-1'); // Still selected
    });

    it('should maintain data integrity across operations', () => {
      const chats = [
        { id: 'chat-1', title: 'Chat 1' },
        { id: 'chat-2', title: 'Chat 2' },
      ];

      let state = chatEntitySlice(initialState, setChats(chats));
      state = chatEntitySlice(state, addChat({ id: 'chat-3', title: 'Chat 3' } as any));
      state = chatEntitySlice(
        state,
        updateChat({
          id: 'chat-1',
          title: 'Updated Chat 1',
        } as any),
      );

      expect(state.ids).toHaveLength(3);
      expect(state.entities['chat-1'].title).toBe('Updated Chat 1');
      expect(state.entities['chat-3']).toBeDefined();
    });

    it('should handle UI state changes with chat operations', () => {
      let state = chatEntitySlice(
        initialState,
        addChat({ id: 'chat-1', title: 'Chat' } as any),
      );
      state = chatEntitySlice(state, setHoveredChatId({ id: 'chat-1' } as any));
      state = chatEntitySlice(state, setFocusedChatId({ id: 'chat-1' } as any));
      state = chatEntitySlice(state, setSelectedChatId({ id: 'chat-1' } as any));
      state = chatEntitySlice(
        state,
        updateChat({
          id: 'chat-1',
          title: 'Updated',
        } as any),
      );

      expect(state.hoveredId).toBe('chat-1');
      expect(state.focusedId).toBe('chat-1');
      expect(state.selectedId).toBe('chat-1');
      expect(state.entities['chat-1'].title).toBe('Updated');
    });

    it('should handle batch operations efficiently', () => {
      let state = chatEntitySlice(initialState, addChat({ id: 'chat-1', title: 'First' } as any));
      state = chatEntitySlice(state, addChat({ id: 'chat-2', title: 'Second' } as any));
      state = chatEntitySlice(state, addChat({ id: 'chat-3', title: 'Third' } as any));
      state = chatEntitySlice(state, removeChat('chat-2'));

      expect(state.ids).toEqual(['chat-1', 'chat-3']);
      expect(state.entities['chat-2']).toBeUndefined();
    });

    it('should handle complex member management', () => {
      let state = chatEntitySlice(
        initialState,
        addChat({
          id: 'chat-1',
          title: 'Team',
          memberIds: ['user-1'],
        } as any),
      );
      state = chatEntitySlice(
        state,
        updateChat({
          id: 'chat-1',
          title: 'Team',
          memberIds: ['user-1', 'user-2', 'user-3'],
        } as any),
      );
      state = chatEntitySlice(
        state,
        updateChat({
          id: 'chat-1',
          title: 'Team',
          memberIds: ['user-1', 'user-3'],
        } as any),
      );

      expect(state.entities['chat-1'].memberIds).toHaveLength(2);
      expect(state.entities['chat-1'].memberIds).toContain('user-1');
      expect(state.entities['chat-1'].memberIds).not.toContain('user-2');
    });
  });
});

