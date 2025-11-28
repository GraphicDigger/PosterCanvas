// ===================================================================
// Unit Tests for chat Redux Slice
// Coverage Target: 100%
// Phase 1 - Redux Slices (HIGH IMPACT - 43 lines, 6-7x efficiency)
// Risk: LOW (Redux Toolkit with Entity Adapter, predictable state management)
// ===================================================================

import { describe, it, expect, beforeEach } from 'vitest';
import reducer, {
  setChats,
  setHoveredChatId,
  setFocusedChatId,
  setSelectedChatId,
  resetSelectedChat,
  addChat,
  updateChat,
  removeChat,
} from '../slice';

describe('chat Redux Slice', () => {
  let initialState: any;

  beforeEach(() => {
    initialState = {
      ids: [],
      entities: {},
      hoveredId: null,
      focusedId: null,
      selectedId: null,
    };
  });

  describe('Initial State', () => {
    it('should return initial state', () => {
      const state = reducer(undefined, { type: '@@INIT' });

      expect(state.ids).toEqual([]);
      expect(state.entities).toEqual({});
      expect(state.hoveredId).toBeNull();
      expect(state.focusedId).toBeNull();
      expect(state.selectedId).toBeNull();
    });
  });

  describe('UI State Actions', () => {
    describe('setHoveredChatId', () => {
      it('should set hovered chat ID', () => {
        const state = reducer(initialState, setHoveredChatId({ id: 'chat-1' }));

        expect(state.hoveredId).toBe('chat-1');
      });

      it('should update hovered chat ID', () => {
        const stateWithHover = {
          ...initialState,
          hoveredId: 'chat-1',
        };

        const state = reducer(stateWithHover, setHoveredChatId({ id: 'chat-2' }));

        expect(state.hoveredId).toBe('chat-2');
      });

      it('should handle null ID', () => {
        const stateWithHover = {
          ...initialState,
          hoveredId: 'chat-1',
        };

        const state = reducer(stateWithHover, setHoveredChatId({ id: null }));

        expect(state.hoveredId).toBeNull();
      });
    });

    describe('setFocusedChatId', () => {
      it('should set focused chat ID', () => {
        const state = reducer(initialState, setFocusedChatId({ id: 'chat-1' }));

        expect(state.focusedId).toBe('chat-1');
      });

      it('should update focused chat ID', () => {
        const stateWithFocus = {
          ...initialState,
          focusedId: 'chat-1',
        };

        const state = reducer(stateWithFocus, setFocusedChatId({ id: 'chat-2' }));

        expect(state.focusedId).toBe('chat-2');
      });

      it('should handle null ID', () => {
        const stateWithFocus = {
          ...initialState,
          focusedId: 'chat-1',
        };

        const state = reducer(stateWithFocus, setFocusedChatId({ id: null }));

        expect(state.focusedId).toBeNull();
      });
    });

    describe('setSelectedChatId', () => {
      it('should set selected chat ID', () => {
        const state = reducer(initialState, setSelectedChatId({ id: 'chat-1' }));

        expect(state.selectedId).toBe('chat-1');
      });

      it('should update selected chat ID', () => {
        const stateWithSelection = {
          ...initialState,
          selectedId: 'chat-1',
        };

        const state = reducer(stateWithSelection, setSelectedChatId({ id: 'chat-2' }));

        expect(state.selectedId).toBe('chat-2');
      });

      it('should handle null ID', () => {
        const stateWithSelection = {
          ...initialState,
          selectedId: 'chat-1',
        };

        const state = reducer(stateWithSelection, setSelectedChatId({ id: null }));

        expect(state.selectedId).toBeNull();
      });
    });

    describe('resetSelectedChat', () => {
      it('should reset selected chat to null', () => {
        const stateWithSelection = {
          ...initialState,
          selectedId: 'chat-1',
        };

        const state = reducer(stateWithSelection, resetSelectedChat());

        expect(state.selectedId).toBeNull();
      });

      it('should not affect other UI states', () => {
        const stateWithUI = {
          ...initialState,
          hoveredId: 'chat-1',
          focusedId: 'chat-2',
          selectedId: 'chat-3',
        };

        const state = reducer(stateWithUI, resetSelectedChat());

        expect(state.selectedId).toBeNull();
        expect(state.hoveredId).toBe('chat-1');
        expect(state.focusedId).toBe('chat-2');
      });
    });
  });

  describe('Query Actions', () => {
    describe('setChats', () => {
      it('should set chats from array', () => {
        const chats = [
          { id: 'c1', name: 'Chat 1', participants: ['user1', 'user2'] },
          { id: 'c2', name: 'Chat 2', participants: ['user1', 'user3'] },
        ];

        const state = reducer(initialState, setChats(chats));

        expect(state.ids).toEqual(['c1', 'c2']);
        expect(state.entities.c1).toEqual(chats[0]);
        expect(state.entities.c2).toEqual(chats[1]);
      });

      it('should replace existing chats', () => {
        const stateWithChats = {
          ...initialState,
          ids: ['old1'],
          entities: { old1: { id: 'old1', name: 'Old' } },
        };

        const newChats = [
          { id: 'new1', name: 'New 1' },
          { id: 'new2', name: 'New 2' },
        ];

        const state = reducer(stateWithChats, setChats(newChats));

        expect(state.ids).toEqual(['new1', 'new2']);
        expect(state.entities.old1).toBeUndefined();
        expect(state.entities.new1).toEqual(newChats[0]);
      });

      it('should handle empty array', () => {
        const stateWithChats = {
          ...initialState,
          ids: ['c1'],
          entities: { c1: { id: 'c1', name: 'Chat' } },
        };

        const state = reducer(stateWithChats, setChats([]));

        expect(state.ids).toEqual([]);
        expect(state.entities).toEqual({});
      });

      it('should preserve UI state when setting chats', () => {
        const stateWithUI = {
          ...initialState,
          hoveredId: 'hover-1',
          focusedId: 'focus-1',
          selectedId: 'select-1',
        };

        const chats = [{ id: 'c1', name: 'Chat' }];

        const state = reducer(stateWithUI, setChats(chats));

        expect(state.hoveredId).toBe('hover-1');
        expect(state.focusedId).toBe('focus-1');
        expect(state.selectedId).toBe('select-1');
      });
    });
  });

  describe('Mutation Actions', () => {
    describe('addChat', () => {
      it('should add new chat', () => {
        const chat = { id: 'c1', name: 'New Chat', participants: ['user1'] };

        const state = reducer(initialState, addChat(chat));

        expect(state.ids).toContain('c1');
        expect(state.entities.c1).toEqual(chat);
      });

      it('should add multiple chats', () => {
        let state = initialState;

        state = reducer(state, addChat({ id: 'c1', name: 'Chat 1' }));
        state = reducer(state, addChat({ id: 'c2', name: 'Chat 2' }));

        expect(state.ids).toEqual(['c1', 'c2']);
        expect(Object.keys(state.entities)).toHaveLength(2);
      });

      it('should not duplicate chat if ID already exists', () => {
        const stateWithChat = {
          ...initialState,
          ids: ['c1'],
          entities: { c1: { id: 'c1', name: 'Original' } },
        };

        const state = reducer(stateWithChat, addChat({ id: 'c1', name: 'Updated' }));

        expect(state.ids.filter((id: string) => id === 'c1')).toHaveLength(1);
      });

      it('should handle chat with key instead of id', () => {
        const chat = { key: 'chat-key-1', name: 'Chat with key' };

        const state = reducer(initialState, addChat(chat));

        expect(state.ids).toContain('chat-key-1');
        expect(state.entities['chat-key-1']).toEqual(chat);
      });
    });

    describe('updateChat', () => {
      it('should update existing chat', () => {
        const stateWithChat = {
          ...initialState,
          ids: ['c1'],
          entities: {
            c1: { id: 'c1', name: 'Old Name', participants: ['user1'] },
          },
        };

        const state = reducer(
          stateWithChat,
          updateChat({ id: 'c1', name: 'New Name', participants: ['user1', 'user2'] }),
        );

        expect(state.entities.c1.name).toBe('New Name');
        expect(state.entities.c1.participants).toEqual(['user1', 'user2']);
      });

      it('should not update non-existent chat', () => {
        const state = reducer(
          initialState,
          updateChat({ id: 'non-existent', name: 'Test' }),
        );

        expect(state.entities['non-existent']).toBeUndefined();
      });

      it('should merge update with existing data', () => {
        const stateWithChat = {
          ...initialState,
          ids: ['c1'],
          entities: {
            c1: { id: 'c1', name: 'Name', participants: ['user1'], createdAt: '2024-01-01' },
          },
        };

        const state = reducer(
          stateWithChat,
          updateChat({ id: 'c1', name: 'New Name' }),
        );

        expect(state.entities.c1.name).toBe('New Name');
        expect(state.entities.c1.participants).toEqual(['user1']);
        expect(state.entities.c1.createdAt).toBe('2024-01-01');
      });
    });

    describe('removeChat', () => {
      it('should remove chat from entities and ids', () => {
        const stateWithChats = {
          ...initialState,
          ids: ['c1', 'c2'],
          entities: {
            c1: { id: 'c1', name: 'Chat 1' },
            c2: { id: 'c2', name: 'Chat 2' },
          },
        };

        const state = reducer(stateWithChats, removeChat('c1'));

        expect(state.ids).toEqual(['c2']);
        expect(state.entities.c1).toBeUndefined();
        expect(state.entities.c2).toBeDefined();
      });

      it('should handle removing non-existent chat', () => {
        const state = reducer(initialState, removeChat('non-existent'));

        expect(state.ids).toEqual([]);
        expect(state.entities).toEqual({});
      });

      it('should not affect other chats', () => {
        const stateWithChats = {
          ...initialState,
          ids: ['c1', 'c2', 'c3'],
          entities: {
            c1: { id: 'c1' },
            c2: { id: 'c2' },
            c3: { id: 'c3' },
          },
        };

        const state = reducer(stateWithChats, removeChat('c2'));

        expect(state.ids).toEqual(['c1', 'c3']);
        expect(state.entities.c1).toBeDefined();
        expect(state.entities.c3).toBeDefined();
      });

      it('should preserve UI state when removing chat', () => {
        const stateWithUI = {
          ...initialState,
          ids: ['c1'],
          entities: { c1: { id: 'c1' } },
          hoveredId: 'hover-1',
          focusedId: 'focus-1',
          selectedId: 'select-1',
        };

        const state = reducer(stateWithUI, removeChat('c1'));

        expect(state.hoveredId).toBe('hover-1');
        expect(state.focusedId).toBe('focus-1');
        expect(state.selectedId).toBe('select-1');
      });
    });
  });

  describe('Complex Scenarios', () => {
    it('should handle full chat lifecycle', () => {
      let state = initialState;

      // Add chat
      state = reducer(state, addChat({ id: 'c1', name: 'Chat 1', participants: ['user1'] }));
      expect(state.ids).toContain('c1');

      // Select chat
      state = reducer(state, setSelectedChatId({ id: 'c1' }));
      expect(state.selectedId).toBe('c1');

      // Update chat
      state = reducer(state, updateChat({ id: 'c1', name: 'Updated Chat' }));
      expect(state.entities.c1.name).toBe('Updated Chat');

      // Remove chat
      state = reducer(state, removeChat('c1'));
      expect(state.entities.c1).toBeUndefined();
    });

    it('should handle multiple chats with different UI states', () => {
      let state = initialState;

      state = reducer(state, setChats([
        { id: 'c1', name: 'Chat 1' },
        { id: 'c2', name: 'Chat 2' },
        { id: 'c3', name: 'Chat 3' },
      ]));

      state = reducer(state, setSelectedChatId({ id: 'c1' }));
      state = reducer(state, setFocusedChatId({ id: 'c2' }));
      state = reducer(state, setHoveredChatId({ id: 'c3' }));

      expect(state.selectedId).toBe('c1');
      expect(state.focusedId).toBe('c2');
      expect(state.hoveredId).toBe('c3');
    });

    it('should handle CRUD operations in sequence', () => {
      let state = initialState;

      // Create
      state = reducer(state, addChat({ id: 'c1', name: 'Chat 1' }));
      state = reducer(state, addChat({ id: 'c2', name: 'Chat 2' }));
      expect(state.ids).toHaveLength(2);

      // Read (via setChats)
      state = reducer(state, setChats([
        { id: 'c1', name: 'Chat 1 Updated' },
        { id: 'c2', name: 'Chat 2 Updated' },
        { id: 'c3', name: 'Chat 3' },
      ]));
      expect(state.ids).toHaveLength(3);

      // Update
      state = reducer(state, updateChat({ id: 'c1', name: 'Chat 1 Final' }));
      expect(state.entities.c1.name).toBe('Chat 1 Final');

      // Delete
      state = reducer(state, removeChat('c2'));
      expect(state.ids).toHaveLength(2);
      expect(state.entities.c2).toBeUndefined();
    });
  });

  describe('Entity Adapter Behavior', () => {
    it('should use normalized state structure', () => {
      const chats = [
        { id: 'c1', name: 'Chat 1' },
        { id: 'c2', name: 'Chat 2' },
      ];

      const state = reducer(initialState, setChats(chats));

      expect(state).toHaveProperty('ids');
      expect(state).toHaveProperty('entities');
      expect(Array.isArray(state.ids)).toBe(true);
      expect(typeof state.entities).toBe('object');
    });

    it('should maintain referential integrity', () => {
      const chat = {
        id: 'c1',
        name: 'Chat',
        metadata: { type: 'group', isArchived: false },
      };

      const state = reducer(initialState, addChat(chat));

      expect(state.entities.c1).toEqual(chat);
      expect(state.entities.c1.metadata).toEqual({ type: 'group', isArchived: false });
    });

    it('should handle chats with complex data', () => {
      const chat = {
        id: 'c1',
        name: 'Project Discussion',
        participants: ['user1', 'user2', 'user3'],
        metadata: {
          created: '2024-01-01T00:00:00Z',
          lastMessage: '2024-01-15T12:00:00Z',
          type: 'group',
          isArchived: false,
          settings: {
            notifications: true,
            theme: 'light',
          },
        },
      };

      const state = reducer(initialState, addChat(chat));

      expect(state.entities.c1).toEqual(chat);
    });
  });
});

