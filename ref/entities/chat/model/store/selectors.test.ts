// ===================================================================
// Unit Tests for Chat Entity Redux Selectors
// Coverage Target: 95%+
// Beyond 2,200 Phase (Selector Testing - Toward 2,300!)
// ===================================================================

import { describe, it, expect, vi } from 'vitest';
import type { RootState } from '@/app/store';
import {
  selectChatState,
  selectChatEntities,
  selectChatIds,
  selectHoveredChatId,
  selectFocusedChatId,
  selectSelectedChatId,
  selectChatCheckStates,
  selectAllChats,
  selectSelectedChat,
  selectChatsByIds,
  selectChatById,
} from './selectors';

// Mock cross-entity selectors
vi.mock('../../@x/actorMember', () => ({
  selectMembersById: vi.fn((state: any, userId: string) => {
    if (userId === 'user-1') {return { id: 'member-1', name: 'Alice', userId: 'user-1' };}
    if (userId === 'user-2') {return { id: 'member-2', name: 'Bob', userId: 'user-2' };}
    return null;
  }),
}));

describe('Chat Entity Selectors', () => {
  describe('Base Selectors', () => {
    describe('selectChatState', () => {
      it('should return chat entity state', () => {
        const chatState = {
          entities: {},
          ids: [],
          hoveredId: null,
          focusedId: null,
          selectedId: null,
        };
        const state = {
          chatEntity: chatState,
        } as any;

        expect(selectChatState(state)).toEqual(chatState);
      });
    });

    describe('selectChatEntities', () => {
      it('should return chat entities object', () => {
        const entities = {
          'chat-1': { id: 'chat-1', message: 'Hello', userId: 'user-1' },
          'chat-2': { id: 'chat-2', message: 'Hi there', userId: 'user-2' },
        };
        const state = {
          chatEntity: {
            entities,
          },
        } as any;

        expect(selectChatEntities(state)).toEqual(entities);
      });

      it('should return empty object when no entities', () => {
        const state = {
          chatEntity: {
            entities: {},
          },
        } as any;

        expect(selectChatEntities(state)).toEqual({});
      });
    });

    describe('selectChatIds', () => {
      it('should return chat ids array', () => {
        const ids = ['chat-1', 'chat-2', 'chat-3'];
        const state = {
          chatEntity: {
            ids,
          },
        } as any;

        expect(selectChatIds(state)).toEqual(ids);
      });

      it('should return empty array when no ids', () => {
        const state = {
          chatEntity: {
            ids: [],
          },
        } as any;

        expect(selectChatIds(state)).toEqual([]);
      });
    });
  });

  describe('UI State Selectors', () => {
    describe('selectHoveredChatId', () => {
      it('should return hovered chat ID', () => {
        const state = {
          chatEntity: {
            hoveredId: 'chat-hovered',
          },
        } as any;

        expect(selectHoveredChatId(state)).toBe('chat-hovered');
      });

      it('should return null when no chat hovered', () => {
        const state = {
          chatEntity: {
            hoveredId: null,
          },
        } as any;

        expect(selectHoveredChatId(state)).toBeNull();
      });
    });

    describe('selectFocusedChatId', () => {
      it('should return focused chat ID', () => {
        const state = {
          chatEntity: {
            focusedId: 'chat-focused',
          },
        } as any;

        expect(selectFocusedChatId(state)).toBe('chat-focused');
      });
    });

    describe('selectSelectedChatId', () => {
      it('should return selected chat ID', () => {
        const state = {
          chatEntity: {
            selectedId: 'chat-selected',
          },
        } as any;

        expect(selectSelectedChatId(state)).toBe('chat-selected');
      });
    });
  });

  describe('Check State Selectors', () => {
    describe('selectChatCheckStates', () => {
      it('should return all false when no states match', () => {
        const state = {
          chatEntity: {
            selectedId: null,
            focusedId: null,
            hoveredId: null,
          },
        } as any;

        const result = selectChatCheckStates(state, 'chat-1');
        expect(result).toEqual({
          isSelected: false,
          isFocused: false,
          isHovered: false,
        });
      });

      it('should return isSelected true when chat is selected', () => {
        const state = {
          chatEntity: {
            selectedId: 'chat-1',
            focusedId: null,
            hoveredId: null,
          },
        } as any;

        const result = selectChatCheckStates(state, 'chat-1');
        expect(result.isSelected).toBe(true);
      });

      it('should return isFocused true when chat is focused', () => {
        const state = {
          chatEntity: {
            selectedId: null,
            focusedId: 'chat-2',
            hoveredId: null,
          },
        } as any;

        const result = selectChatCheckStates(state, 'chat-2');
        expect(result.isFocused).toBe(true);
      });

      it('should return isHovered true when chat is hovered', () => {
        const state = {
          chatEntity: {
            selectedId: null,
            focusedId: null,
            hoveredId: 'chat-3',
          },
        } as any;

        const result = selectChatCheckStates(state, 'chat-3');
        expect(result.isHovered).toBe(true);
      });

      it('should return all true when chat has all states', () => {
        const state = {
          chatEntity: {
            selectedId: 'chat-1',
            focusedId: 'chat-1',
            hoveredId: 'chat-1',
          },
        } as any;

        const result = selectChatCheckStates(state, 'chat-1');
        expect(result).toEqual({
          isSelected: true,
          isFocused: true,
          isHovered: true,
        });
      });
    });
  });

  describe('Collection Selectors', () => {
    describe('selectAllChats', () => {
      it('should return all chats with member data', () => {
        const entities = {
          'chat-1': { id: 'chat-1', message: 'Hello', userId: 'user-1' },
          'chat-2': { id: 'chat-2', message: 'Hi', userId: 'user-2' },
        };
        const state = {
          chatEntity: {
            ids: ['chat-1', 'chat-2'],
            entities,
          },
        } as any;

        const result = selectAllChats(state);
        expect(result).toHaveLength(2);
        expect(result[0].member).toBeDefined();
        expect(result[0].member?.name).toBe('Alice');
        expect(result[1].member?.name).toBe('Bob');
      });

      it('should return empty array when no chats', () => {
        const state = {
          chatEntity: {
            ids: [],
            entities: {},
          },
        } as any;

        expect(selectAllChats(state)).toEqual([]);
      });

      it('should handle null ids', () => {
        const state = {
          chatEntity: {
            ids: null,
            entities: {},
          },
        } as any;

        expect(selectAllChats(state)).toEqual([]);
      });

      it('should set member to null when user not found', () => {
        const entities = {
          'chat-1': { id: 'chat-1', message: 'Hello', userId: 'user-unknown' },
        };
        const state = {
          chatEntity: {
            ids: ['chat-1'],
            entities,
          },
        } as any;

        const result = selectAllChats(state);
        expect(result[0].member).toBeNull();
      });
    });

    describe('selectSelectedChat', () => {
      it('should return selected chat', () => {
        const chat = { id: 'chat-selected', message: 'Selected message', userId: 'user-1' };
        const state = {
          chatEntity: {
            selectedId: 'chat-selected',
            entities: {
              'chat-selected': chat,
            },
          },
        } as any;

        expect(selectSelectedChat(state)).toEqual(chat);
      });

      it('should return null when no chat selected', () => {
        const state = {
          chatEntity: {
            selectedId: null,
            entities: {},
          },
        } as any;

        expect(selectSelectedChat(state)).toBeNull();
      });

      it('should return null when selected chat does not exist', () => {
        const state = {
          chatEntity: {
            selectedId: 'chat-missing',
            entities: {},
          },
        } as any;

        expect(selectSelectedChat(state)).toBeNull();
      });

      it('should return null when entities is null', () => {
        const state = {
          chatEntity: {
            selectedId: 'chat-1',
            entities: null,
          },
        } as any;

        expect(selectSelectedChat(state)).toBeNull();
      });
    });

    describe('selectChatsByIds', () => {
      it('should return chats for given IDs', () => {
        const state = {
          chatEntity: {
            entities: {
              'chat-1': { id: 'chat-1', message: 'First' },
              'chat-2': { id: 'chat-2', message: 'Second' },
              'chat-3': { id: 'chat-3', message: 'Third' },
            },
          },
        } as any;

        const result = selectChatsByIds(state, ['chat-1', 'chat-3']);
        expect(result).toHaveLength(2);
        expect(result[0].message).toBe('First');
        expect(result[1].message).toBe('Third');
      });

      it('should filter out non-existent chats', () => {
        const state = {
          chatEntity: {
            entities: {
              'chat-1': { id: 'chat-1', message: 'First' },
            },
          },
        } as any;

        const result = selectChatsByIds(state, ['chat-1', 'chat-missing']);
        expect(result).toHaveLength(1);
      });

      it('should return empty array when ids is null', () => {
        const state = {
          chatEntity: {
            entities: {},
          },
        } as any;

        const result = selectChatsByIds(state, null);
        expect(result).toEqual([]);
      });

      it('should return empty array when entities is null', () => {
        const state = {
          chatEntity: {
            entities: null,
          },
        } as any;

        const result = selectChatsByIds(state, ['chat-1']);
        expect(result).toEqual([]);
      });

      it('should maintain order from ids array', () => {
        const state = {
          chatEntity: {
            entities: {
              'chat-1': { id: 'chat-1', message: 'First' },
              'chat-2': { id: 'chat-2', message: 'Second' },
              'chat-3': { id: 'chat-3', message: 'Third' },
            },
          },
        } as any;

        const result = selectChatsByIds(state, ['chat-3', 'chat-1', 'chat-2']);
        expect(result[0].message).toBe('Third');
        expect(result[1].message).toBe('First');
        expect(result[2].message).toBe('Second');
      });
    });

    describe('selectChatById', () => {
      it('should return chat by ID', () => {
        const chat = { id: 'chat-1', message: 'Test message', userId: 'user-1' };
        const state = {
          chatEntity: {
            entities: {
              'chat-1': chat,
            },
          },
        } as any;

        expect(selectChatById(state, 'chat-1')).toEqual(chat);
      });

      it('should return null for non-existent ID', () => {
        const state = {
          chatEntity: {
            entities: {},
          },
        } as any;

        expect(selectChatById(state, 'non-existent')).toBeNull();
      });

      it('should handle chat with timestamp', () => {
        const chat = {
          id: 'chat-1',
          message: 'Test message',
          userId: 'user-1',
          timestamp: Date.now(),
          edited: false,
        };
        const state = {
          chatEntity: {
            entities: {
              'chat-1': chat,
            },
          },
        } as any;

        const result = selectChatById(state, 'chat-1');
        expect(result?.timestamp).toBeDefined();
        expect(result?.edited).toBe(false);
      });
    });
  });

  describe('Edge Cases', () => {
    describe('Chat messages with attachments', () => {
      it('should handle chats with attachments', () => {
        const chat = {
          id: 'chat-1',
          message: 'Check this out',
          userId: 'user-1',
          attachments: [
            { type: 'image', url: 'image.jpg' },
            { type: 'file', url: 'document.pdf' },
          ],
        };
        const state = {
          chatEntity: {
            entities: {
              'chat-1': chat,
            },
          },
        } as any;

        const result = selectChatById(state, 'chat-1');
        expect(result?.attachments).toHaveLength(2);
      });
    });

    describe('Chat threads', () => {
      it('should handle chat with replies', () => {
        const chat = {
          id: 'chat-1',
          message: 'Main message',
          userId: 'user-1',
          replyToId: null,
          replyCount: 3,
        };
        const state = {
          chatEntity: {
            entities: {
              'chat-1': chat,
            },
          },
        } as any;

        const result = selectChatById(state, 'chat-1');
        expect(result?.replyCount).toBe(3);
      });

      it('should handle reply messages', () => {
        const chat = {
          id: 'chat-2',
          message: 'Reply message',
          userId: 'user-2',
          replyToId: 'chat-1',
        };
        const state = {
          chatEntity: {
            entities: {
              'chat-2': chat,
            },
          },
        } as any;

        const result = selectChatById(state, 'chat-2');
        expect(result?.replyToId).toBe('chat-1');
      });
    });

    describe('Empty state handling', () => {
      it('should handle completely empty state', () => {
        const state = {
          chatEntity: {
            entities: {},
            ids: [],
            selectedId: null,
            focusedId: null,
            hoveredId: null,
          },
        } as any;

        expect(selectAllChats(state)).toEqual([]);
        expect(selectSelectedChat(state)).toBeNull();
        expect(selectChatsByIds(state, [])).toEqual([]);
      });
    });
  });
});

