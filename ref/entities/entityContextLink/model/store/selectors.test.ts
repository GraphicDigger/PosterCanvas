// ===================================================================
// Unit Tests for EntityContextLink Entity Redux Selectors
// Coverage Target: 95%+
// Beyond 2,200 Phase (Selector Testing - FINAL PUSH TO 2,300!)
// ===================================================================

import { describe, it, expect, vi } from 'vitest';
import type { RootState } from '@/app/store';
import {
  selectContextLinkState,
  selectContextLinkEntities,
  selectContextLinkIds,
  selectHoveredContextLinkId,
  selectFocusedContextLinkId,
  selectSelectedContextLinkId,
  selectContextLinkCheckStates,
  selectAllContextLinks,
  selectSelectedContextLink,
  selectContextLinksByIds,
  selectContextLinkById,
  selectContextLinksMap,
  selectContextObjectsMap,
} from './selectors';

// Mock cross-entity selectors
vi.mock('@/entities/document', () => ({
  selectDocumentEntities: vi.fn((state: any) => ({
    'doc-1': { id: 'doc-1', title: 'Document 1' },
    'doc-2': { id: 'doc-2', title: 'Document 2' },
  })),
}));

vi.mock('@/entities/task', () => ({
  selectTaskEntities: vi.fn((state: any) => ({
    'task-1': { id: 'task-1', title: 'Task 1' },
    'task-2': { id: 'task-2', title: 'Task 2' },
  })),
}));

vi.mock('@/entities/chat', () => ({
  selectChatEntities: vi.fn((state: any) => ({
    'chat-1': { id: 'chat-1', message: 'Chat 1' },
    'chat-2': { id: 'chat-2', message: 'Chat 2' },
  })),
}));

vi.mock('@/entities/actorMember', () => ({
  selectMemberEntities: vi.fn((state: any) => ({
    'member-1': { id: 'member-1', name: 'Member 1' },
  })),
}));

// Mock getContextObject
vi.mock('../../lib', () => ({
  getContextObject: vi.fn((contextType, contextId, entities) => {
    if (contextType === 'document' && entities.documentEntities[contextId]) {
      return entities.documentEntities[contextId];
    }
    if (contextType === 'task' && entities.taskEntities[contextId]) {
      return entities.taskEntities[contextId];
    }
    if (contextType === 'chat' && entities.chatEntities[contextId]) {
      return entities.chatEntities[contextId];
    }
    return null;
  }),
}));

describe('EntityContextLink Entity Selectors', () => {
  describe('Base Selectors', () => {
    describe('selectContextLinkState', () => {
      it('should return context link entity state', () => {
        const contextLinkState = {
          entities: {},
          ids: [],
          hoveredId: null,
          focusedId: null,
          selectedId: null,
        };
        const state = {
          contextLinkEntity: contextLinkState,
        } as any;

        expect(selectContextLinkState(state)).toEqual(contextLinkState);
      });
    });

    describe('selectContextLinkEntities', () => {
      it('should return context link entities object', () => {
        const entities = {
          'link-1': { id: 'link-1', entityId: 'entity-1', contextType: 'document', contextId: 'doc-1' },
          'link-2': { id: 'link-2', entityId: 'entity-2', contextType: 'task', contextId: 'task-1' },
        };
        const state = {
          contextLinkEntity: {
            entities,
          },
        } as any;

        expect(selectContextLinkEntities(state)).toEqual(entities);
      });
    });

    describe('selectContextLinkIds', () => {
      it('should return context link ids array', () => {
        const ids = ['link-1', 'link-2', 'link-3'];
        const state = {
          contextLinkEntity: {
            ids,
          },
        } as any;

        expect(selectContextLinkIds(state)).toEqual(ids);
      });
    });
  });

  describe('UI State Selectors', () => {
    describe('selectHoveredContextLinkId', () => {
      it('should return hovered context link ID', () => {
        const state = {
          contextLinkEntity: {
            hoveredId: 'link-hovered',
          },
        } as any;

        expect(selectHoveredContextLinkId(state)).toBe('link-hovered');
      });
    });

    describe('selectFocusedContextLinkId', () => {
      it('should return focused context link ID', () => {
        const state = {
          contextLinkEntity: {
            focusedId: 'link-focused',
          },
        } as any;

        expect(selectFocusedContextLinkId(state)).toBe('link-focused');
      });
    });

    describe('selectSelectedContextLinkId', () => {
      it('should return selected context link ID', () => {
        const state = {
          contextLinkEntity: {
            selectedId: 'link-selected',
          },
        } as any;

        expect(selectSelectedContextLinkId(state)).toBe('link-selected');
      });
    });
  });

  describe('Check State Selectors', () => {
    describe('selectContextLinkCheckStates', () => {
      it('should return all false when no states match', () => {
        const state = {
          contextLinkEntity: {
            selectedId: null,
            focusedId: null,
            hoveredId: null,
          },
        } as any;

        const result = selectContextLinkCheckStates(state, 'link-1');
        expect(result).toEqual({
          isSelected: false,
          isFocused: false,
          isHovered: false,
        });
      });

      it('should return isSelected true when context link is selected', () => {
        const state = {
          contextLinkEntity: {
            selectedId: 'link-1',
            focusedId: null,
            hoveredId: null,
          },
        } as any;

        const result = selectContextLinkCheckStates(state, 'link-1');
        expect(result.isSelected).toBe(true);
      });

      it('should return all true when context link has all states', () => {
        const state = {
          contextLinkEntity: {
            selectedId: 'link-1',
            focusedId: 'link-1',
            hoveredId: 'link-1',
          },
        } as any;

        const result = selectContextLinkCheckStates(state, 'link-1');
        expect(result).toEqual({
          isSelected: true,
          isFocused: true,
          isHovered: true,
        });
      });
    });
  });

  describe('Collection Selectors', () => {
    describe('selectAllContextLinks', () => {
      it('should return all context links as array', () => {
        const entities = {
          'link-1': { id: 'link-1', entityId: 'entity-1', contextType: 'document' },
          'link-2': { id: 'link-2', entityId: 'entity-2', contextType: 'task' },
        };
        const state = {
          contextLinkEntity: {
            ids: ['link-1', 'link-2'],
            entities,
          },
        } as any;

        const result = selectAllContextLinks(state);
        expect(result).toHaveLength(2);
      });

      it('should return empty array when no context links', () => {
        const state = {
          contextLinkEntity: {
            ids: [],
            entities: {},
          },
        } as any;

        expect(selectAllContextLinks(state)).toEqual([]);
      });

      it('should handle null ids', () => {
        const state = {
          contextLinkEntity: {
            ids: null,
            entities: {},
          },
        } as any;

        expect(selectAllContextLinks(state)).toEqual([]);
      });
    });

    describe('selectSelectedContextLink', () => {
      it('should return selected context link', () => {
        const link = { id: 'link-selected', entityId: 'entity-1', contextType: 'document' };
        const state = {
          contextLinkEntity: {
            selectedId: 'link-selected',
            entities: {
              'link-selected': link,
            },
          },
        } as any;

        expect(selectSelectedContextLink(state)).toEqual(link);
      });

      it('should return null when no context link selected', () => {
        const state = {
          contextLinkEntity: {
            selectedId: null,
            entities: {},
          },
        } as any;

        expect(selectSelectedContextLink(state)).toBeNull();
      });

      it('should return null when selected context link does not exist', () => {
        const state = {
          contextLinkEntity: {
            selectedId: 'link-missing',
            entities: {},
          },
        } as any;

        expect(selectSelectedContextLink(state)).toBeNull();
      });
    });

    describe('selectContextLinksByIds', () => {
      it('should return context links for given IDs', () => {
        const state = {
          contextLinkEntity: {
            entities: {
              'link-1': { id: 'link-1', entityId: 'entity-1' },
              'link-2': { id: 'link-2', entityId: 'entity-2' },
              'link-3': { id: 'link-3', entityId: 'entity-3' },
            },
          },
        } as any;

        const result = selectContextLinksByIds(state, ['link-1', 'link-3']);
        expect(result).toHaveLength(2);
        expect(result[0].id).toBe('link-1');
        expect(result[1].id).toBe('link-3');
      });

      it('should filter out non-existent context links', () => {
        const state = {
          contextLinkEntity: {
            entities: {
              'link-1': { id: 'link-1', entityId: 'entity-1' },
            },
          },
        } as any;

        const result = selectContextLinksByIds(state, ['link-1', 'link-missing']);
        expect(result).toHaveLength(1);
      });

      it('should return empty array when ids is null', () => {
        const state = {
          contextLinkEntity: {
            entities: {},
          },
        } as any;

        const result = selectContextLinksByIds(state, null);
        expect(result).toEqual([]);
      });
    });

    describe('selectContextLinkById', () => {
      it('should return context link by ID', () => {
        const link = { id: 'link-1', entityId: 'entity-1', contextType: 'document' };
        const state = {
          contextLinkEntity: {
            entities: {
              'link-1': link,
            },
          },
        } as any;

        expect(selectContextLinkById(state, 'link-1')).toEqual(link);
      });

      it('should return null for non-existent ID', () => {
        const state = {
          contextLinkEntity: {
            entities: {},
          },
        } as any;

        expect(selectContextLinkById(state, 'non-existent')).toBeNull();
      });
    });
  });

  describe('Complex Selectors', () => {
    describe('selectContextLinksMap', () => {
      it('should create map grouped by entityId', () => {
        const entities = {
          'link-1': { id: 'link-1', entityId: 'entity-1', contextType: 'document', contextId: 'doc-1' },
          'link-2': { id: 'link-2', entityId: 'entity-1', contextType: 'task', contextId: 'task-1' },
          'link-3': { id: 'link-3', entityId: 'entity-2', contextType: 'chat', contextId: 'chat-1' },
        };
        const state = {
          contextLinkEntity: {
            ids: ['link-1', 'link-2', 'link-3'],
            entities,
          },
        } as any;

        const result = selectContextLinksMap(state);
        expect(result['entity-1']).toHaveLength(2);
        expect(result['entity-2']).toHaveLength(1);
      });

      it('should return empty map when no context links', () => {
        const state = {
          contextLinkEntity: {
            ids: [],
            entities: {},
          },
        } as any;

        const result = selectContextLinksMap(state);
        expect(Object.keys(result)).toHaveLength(0);
      });

      it('should group multiple links for same entity', () => {
        const entities = {
          'link-1': { id: 'link-1', entityId: 'entity-1', contextType: 'document', contextId: 'doc-1' },
          'link-2': { id: 'link-2', entityId: 'entity-1', contextType: 'document', contextId: 'doc-2' },
          'link-3': { id: 'link-3', entityId: 'entity-1', contextType: 'task', contextId: 'task-1' },
        };
        const state = {
          contextLinkEntity: {
            ids: ['link-1', 'link-2', 'link-3'],
            entities,
          },
        } as any;

        const result = selectContextLinksMap(state);
        expect(result['entity-1']).toHaveLength(3);
        expect(result['entity-1'].map((l: any) => l.contextType)).toEqual(['document', 'document', 'task']);
      });
    });

    describe('selectContextObjectsMap', () => {
      it('should create map with enriched context objects', () => {
        const entities = {
          'link-1': { id: 'link-1', entityId: 'entity-1', contextType: 'document', contextId: 'doc-1' },
          'link-2': { id: 'link-2', entityId: 'entity-1', contextType: 'task', contextId: 'task-1' },
        };
        const state = {
          contextLinkEntity: {
            ids: ['link-1', 'link-2'],
            entities,
          },
        } as any;

        const result = selectContextObjectsMap(state);
        expect(result['entity-1']).toBeDefined();
        expect(Array.isArray(result['entity-1'])).toBe(true);
      });

      it('should return empty map when no links', () => {
        const state = {
          contextLinkEntity: {
            ids: [],
            entities: {},
          },
        } as any;

        const result = selectContextObjectsMap(state);
        expect(Object.keys(result)).toHaveLength(0);
      });
    });
  });

  describe('Edge Cases', () => {
    describe('Different context types', () => {
      it('should handle document context links', () => {
        const link = { id: 'link-1', entityId: 'entity-1', contextType: 'document', contextId: 'doc-1' };
        const state = {
          contextLinkEntity: {
            entities: {
              'link-1': link,
            },
          },
        } as any;

        const result = selectContextLinkById(state, 'link-1');
        expect(result?.contextType).toBe('document');
      });

      it('should handle task context links', () => {
        const link = { id: 'link-2', entityId: 'entity-1', contextType: 'task', contextId: 'task-1' };
        const state = {
          contextLinkEntity: {
            entities: {
              'link-2': link,
            },
          },
        } as any;

        const result = selectContextLinkById(state, 'link-2');
        expect(result?.contextType).toBe('task');
      });

      it('should handle chat context links', () => {
        const link = { id: 'link-3', entityId: 'entity-1', contextType: 'chat', contextId: 'chat-1' };
        const state = {
          contextLinkEntity: {
            entities: {
              'link-3': link,
            },
          },
        } as any;

        const result = selectContextLinkById(state, 'link-3');
        expect(result?.contextType).toBe('chat');
      });
    });

    describe('Empty state handling', () => {
      it('should handle completely empty state', () => {
        const state = {
          contextLinkEntity: {
            entities: {},
            ids: [],
            selectedId: null,
            focusedId: null,
            hoveredId: null,
          },
        } as any;

        expect(selectAllContextLinks(state)).toEqual([]);
        expect(selectSelectedContextLink(state)).toBeNull();
        expect(selectContextLinksMap(state)).toEqual({});
        expect(selectContextObjectsMap(state)).toEqual({});
      });
    });
  });
});

