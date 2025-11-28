// ===================================================================
// Unit Tests for Userspace Entity Redux Selectors
// Coverage Target: 95%+
// Week 4 - Day 3 (Selector Testing)
// ===================================================================

import { describe, it, expect, vi } from 'vitest';
import {
  selectUserspaceState,
  selectUserspaceEntities,
  selectUserspaceIds,
  selectUserspaceUI,
  selectUserspaceById,
  selectAllUserspaces,
  selectSelectedUserspace,
  selectUserspacesByIds,
} from './selectors';

// Mock UI state selectors
vi.mock('./uiStates/selectors', () => ({
  selectSelectedUserspaceId: vi.fn((state) => state.mockSelectedUserspaceId || null),
}));

describe('Userspace Entity Selectors', () => {
  describe('Base Selectors', () => {
    describe('selectUserspaceState', () => {
      it('should return userspace entity state', () => {
        const userspaceState = {
          entities: {},
          ids: [],
          ui: {},
        };
        const state = {
          userspaceEntity: userspaceState,
        };

        expect(selectUserspaceState(state)).toEqual(userspaceState);
      });
    });

    describe('selectUserspaceEntities', () => {
      it('should return userspace entities object', () => {
        const entities = {
          'userspace-1': { id: 'userspace-1', name: 'Personal Space', ownerId: 'user-1' },
          'userspace-2': { id: 'userspace-2', name: 'Team Space', ownerId: 'user-2' },
        };
        const state = {
          userspaceEntity: {
            entities,
          },
        };

        expect(selectUserspaceEntities(state)).toEqual(entities);
      });

      it('should return empty object when no entities', () => {
        const state = {
          userspaceEntity: {
            entities: {},
          },
        };

        expect(selectUserspaceEntities(state)).toEqual({});
      });
    });

    describe('selectUserspaceIds', () => {
      it('should return userspace ids array', () => {
        const ids = ['userspace-1', 'userspace-2', 'userspace-3'];
        const state = {
          userspaceEntity: {
            ids,
          },
        };

        expect(selectUserspaceIds(state)).toEqual(ids);
      });

      it('should return empty array when no ids', () => {
        const state = {
          userspaceEntity: {
            ids: [],
          },
        };

        expect(selectUserspaceIds(state)).toEqual([]);
      });
    });

    describe('selectUserspaceUI', () => {
      it('should return userspace UI state', () => {
        const uiState = {
          selectedUserspaceId: 'userspace-1',
          hoveredUserspaceId: 'userspace-2',
        };
        const state = {
          userspaceEntity: {
            ui: uiState,
          },
        };

        expect(selectUserspaceUI(state)).toEqual(uiState);
      });

      it('should return empty UI state', () => {
        const state = {
          userspaceEntity: {
            ui: {},
          },
        };

        expect(selectUserspaceUI(state)).toEqual({});
      });
    });
  });

  describe('Entity Lookup Selectors', () => {
    describe('selectUserspaceById', () => {
      it('should return userspace by ID', () => {
        const userspace = { id: 'userspace-1', name: 'Test Space', ownerId: 'user-1' };
        const state = {
          userspaceEntity: {
            entities: {
              'userspace-1': userspace,
            },
          },
        };

        expect(selectUserspaceById(state, 'userspace-1')).toEqual(userspace);
      });

      it('should return undefined for non-existent ID', () => {
        const state = {
          userspaceEntity: {
            entities: {},
          },
        };

        expect(selectUserspaceById(state, 'non-existent')).toBeUndefined();
      });

      it('should handle null entities', () => {
        const state = {
          userspaceEntity: {
            entities: null,
          },
        };

        expect(() => selectUserspaceById(state, 'userspace-1')).toThrow();
      });
    });

    describe('selectSelectedUserspace', () => {
      it('should return selected userspace', () => {
        const userspace = { id: 'userspace-selected', name: 'Selected Space' };
        const state = {
          userspaceEntity: {
            entities: {
              'userspace-selected': userspace,
            },
          },
          mockSelectedUserspaceId: 'userspace-selected',
        };

        expect(selectSelectedUserspace(state)).toEqual(userspace);
      });

      it('should return null when no userspace selected', () => {
        const state = {
          userspaceEntity: {
            entities: {},
          },
          mockSelectedUserspaceId: null,
        };

        expect(selectSelectedUserspace(state)).toBeNull();
      });

      it('should return null when entities is null', () => {
        const state = {
          userspaceEntity: {
            entities: null,
          },
          mockSelectedUserspaceId: 'userspace-1',
        };

        expect(selectSelectedUserspace(state)).toBeNull();
      });

      it('should return null when selected userspace does not exist', () => {
        const state = {
          userspaceEntity: {
            entities: {},
          },
          mockSelectedUserspaceId: 'non-existent',
        };

        expect(selectSelectedUserspace(state)).toBeNull();
      });
    });
  });

  describe('Collection Selectors', () => {
    describe('selectAllUserspaces', () => {
      it('should return all userspaces as array', () => {
        const entities = {
          'userspace-1': { id: 'userspace-1', name: 'Space One' },
          'userspace-2': { id: 'userspace-2', name: 'Space Two' },
          'userspace-3': { id: 'userspace-3', name: 'Space Three' },
        };
        const state = {
          userspaceEntity: {
            ids: ['userspace-1', 'userspace-2', 'userspace-3'],
            entities,
          },
        };

        const result = selectAllUserspaces(state);
        expect(result).toHaveLength(3);
        expect(result[0]).toEqual(entities['userspace-1']);
        expect(result[1]).toEqual(entities['userspace-2']);
        expect(result[2]).toEqual(entities['userspace-3']);
      });

      it('should return empty array when no userspaces', () => {
        const state = {
          userspaceEntity: {
            ids: [],
            entities: {},
          },
        };

        expect(selectAllUserspaces(state)).toEqual([]);
      });

      it('should maintain order based on ids array', () => {
        const state = {
          userspaceEntity: {
            ids: ['userspace-3', 'userspace-1', 'userspace-2'],
            entities: {
              'userspace-1': { id: 'userspace-1', order: 1 },
              'userspace-2': { id: 'userspace-2', order: 2 },
              'userspace-3': { id: 'userspace-3', order: 3 },
            },
          },
        };

        const result = selectAllUserspaces(state);
        expect(result[0].id).toBe('userspace-3');
        expect(result[1].id).toBe('userspace-1');
        expect(result[2].id).toBe('userspace-2');
      });

      it('should handle undefined userspaces in the list', () => {
        const state = {
          userspaceEntity: {
            ids: ['userspace-1', 'non-existent', 'userspace-2'],
            entities: {
              'userspace-1': { id: 'userspace-1', name: 'Space One' },
              'userspace-2': { id: 'userspace-2', name: 'Space Two' },
            },
          },
        };

        const result = selectAllUserspaces(state);
        expect(result).toHaveLength(3);
        expect(result[1]).toBeUndefined();
      });
    });

    describe('selectUserspacesByIds', () => {
      it('should return userspaces for given IDs', () => {
        const state = {
          userspaceEntity: {
            entities: {
              'userspace-1': { id: 'userspace-1', name: 'First' },
              'userspace-2': { id: 'userspace-2', name: 'Second' },
              'userspace-3': { id: 'userspace-3', name: 'Third' },
            },
          },
        };

        const result = selectUserspacesByIds(state, ['userspace-1', 'userspace-3']);
        expect(result).toHaveLength(2);
        expect(result[0].name).toBe('First');
        expect(result[1].name).toBe('Third');
      });

      it('should filter out non-existent userspaces', () => {
        const state = {
          userspaceEntity: {
            entities: {
              'userspace-1': { id: 'userspace-1', name: 'First' },
            },
          },
        };

        const result = selectUserspacesByIds(state, ['userspace-1', 'non-existent']);
        expect(result).toHaveLength(1);
        expect(result[0].id).toBe('userspace-1');
      });

      it('should return empty array when ids is null', () => {
        const state = {
          userspaceEntity: {
            entities: {},
          },
        };

        const result = selectUserspacesByIds(state, null);
        expect(result).toEqual([]);
      });

      it('should return empty array when entities is null', () => {
        const state = {
          userspaceEntity: {
            entities: null,
          },
        };

        const result = selectUserspacesByIds(state, ['userspace-1']);
        expect(result).toEqual([]);
      });

      it('should return empty array when ids array is empty', () => {
        const state = {
          userspaceEntity: {
            entities: {
              'userspace-1': { id: 'userspace-1' },
            },
          },
        };

        const result = selectUserspacesByIds(state, []);
        expect(result).toEqual([]);
      });

      it('should maintain order from ids array', () => {
        const state = {
          userspaceEntity: {
            entities: {
              'userspace-1': { id: 'userspace-1', name: 'First' },
              'userspace-2': { id: 'userspace-2', name: 'Second' },
              'userspace-3': { id: 'userspace-3', name: 'Third' },
            },
          },
        };

        const result = selectUserspacesByIds(state, ['userspace-3', 'userspace-1', 'userspace-2']);
        expect(result[0].name).toBe('Third');
        expect(result[1].name).toBe('First');
        expect(result[2].name).toBe('Second');
      });
    });
  });

  describe('Edge Cases', () => {
    describe('selectAllUserspaces with partial data', () => {
      it('should handle partial entity data gracefully', () => {
        const state = {
          userspaceEntity: {
            ids: ['userspace-1', 'userspace-2', 'userspace-3'],
            entities: {
              'userspace-1': { id: 'userspace-1', name: 'Space One' },
              // userspace-2 missing
              'userspace-3': { id: 'userspace-3', name: 'Space Three' },
            },
          },
        };

        const result = selectAllUserspaces(state);
        expect(result).toHaveLength(3);
        expect(result[0]).toBeDefined();
        expect(result[1]).toBeUndefined();
        expect(result[2]).toBeDefined();
      });
    });

    describe('selectUserspaceById with special characters', () => {
      it('should handle IDs with special characters', () => {
        const userspace = { id: 'userspace-123-abc_def', name: 'Special ID Space' };
        const state = {
          userspaceEntity: {
            entities: {
              'userspace-123-abc_def': userspace,
            },
          },
        };

        expect(selectUserspaceById(state, 'userspace-123-abc_def')).toEqual(userspace);
      });
    });

    describe('selectSelectedUserspace with complex data', () => {
      it('should handle userspaces with nested properties', () => {
        const userspace = {
          id: 'userspace-1',
          name: 'Complex Space',
          ownerId: 'user-1',
          settings: {
            privacy: 'private',
            theme: 'dark',
          },
          members: ['user-1', 'user-2', 'user-3'],
          metadata: {
            created: '2024-01-01',
            updated: '2024-10-15',
          },
        };
        const state = {
          userspaceEntity: {
            entities: {
              'userspace-1': userspace,
            },
          },
          mockSelectedUserspaceId: 'userspace-1',
        };

        const result = selectSelectedUserspace(state);
        expect(result).toEqual(userspace);
        expect(result.settings.privacy).toBe('private');
        expect(result.members).toHaveLength(3);
        expect(result.metadata.created).toBe('2024-01-01');
      });
    });

    describe('Multiple userspaces for same owner', () => {
      it('should handle multiple userspaces owned by same user', () => {
        const state = {
          userspaceEntity: {
            ids: ['userspace-1', 'userspace-2', 'userspace-3'],
            entities: {
              'userspace-1': { id: 'userspace-1', name: 'Personal', ownerId: 'user-1' },
              'userspace-2': { id: 'userspace-2', name: 'Work', ownerId: 'user-1' },
              'userspace-3': { id: 'userspace-3', name: 'Other', ownerId: 'user-2' },
            },
          },
        };

        const result = selectAllUserspaces(state);
        const user1Spaces = result.filter(s => s.ownerId === 'user-1');
        expect(user1Spaces).toHaveLength(2);
      });
    });
  });
});

