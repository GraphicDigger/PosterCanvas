// ===================================================================
// Unit Tests for ActorPosition Entity Redux Selectors
// Coverage Target: 95%+
// Week 4 - Day 2 (Selector Testing)
// ===================================================================

import { describe, it, expect, vi } from 'vitest';
import {
  selectActorPositionState,
  selectActorPositionEntities,
  selectActorPositionIds,
  selectActorPositionUI,
  selectAllActorPositions,
  selectActorPositionById,
  selectSelectedActorPosition,
  selectActorPositionsByIds,
} from './selectors';

// Mock UI state selectors
vi.mock('./uiStates/selectors', () => ({
  selectSelectedActorPositionId: vi.fn((state) => state.mockSelectedPositionId || null),
}));

describe('ActorPosition Entity Selectors', () => {
  describe('Base Selectors', () => {
    describe('selectActorPositionState', () => {
      it('should return actorPosition entity state', () => {
        const positionState = {
          entities: {},
          ids: [],
          ui: {},
        };
        const state = {
          actorPositionEntity: positionState,
        };

        expect(selectActorPositionState(state)).toEqual(positionState);
      });
    });

    describe('selectActorPositionEntities', () => {
      it('should return actorPosition entities object', () => {
        const entities = {
          'position-1': { id: 'position-1', name: 'CEO', level: 1 },
          'position-2': { id: 'position-2', name: 'Developer', level: 3 },
        };
        const state = {
          actorPositionEntity: {
            entities,
          },
        };

        expect(selectActorPositionEntities(state)).toEqual(entities);
      });

      it('should return empty object when no entities', () => {
        const state = {
          actorPositionEntity: {
            entities: {},
          },
        };

        expect(selectActorPositionEntities(state)).toEqual({});
      });
    });

    describe('selectActorPositionIds', () => {
      it('should return actorPosition ids array', () => {
        const ids = ['position-1', 'position-2', 'position-3'];
        const state = {
          actorPositionEntity: {
            ids,
          },
        };

        expect(selectActorPositionIds(state)).toEqual(ids);
      });

      it('should return empty array when no ids', () => {
        const state = {
          actorPositionEntity: {
            ids: [],
          },
        };

        expect(selectActorPositionIds(state)).toEqual([]);
      });
    });

    describe('selectActorPositionUI', () => {
      it('should return actorPosition UI state', () => {
        const uiState = {
          selectedPositionId: 'position-1',
          hoveredPositionId: 'position-2',
        };
        const state = {
          actorPositionEntity: {
            ui: uiState,
          },
        };

        expect(selectActorPositionUI(state)).toEqual(uiState);
      });

      it('should return empty UI state', () => {
        const state = {
          actorPositionEntity: {
            ui: {},
          },
        };

        expect(selectActorPositionUI(state)).toEqual({});
      });
    });
  });

  describe('Entity Lookup Selectors', () => {
    describe('selectActorPositionById', () => {
      it('should return position by ID', () => {
        const position = { id: 'position-1', name: 'Manager', level: 2 };
        const state = {
          actorPositionEntity: {
            entities: {
              'position-1': position,
            },
          },
        };

        expect(selectActorPositionById(state, 'position-1')).toEqual(position);
      });

      it('should return undefined for non-existent ID', () => {
        const state = {
          actorPositionEntity: {
            entities: {},
          },
        };

        expect(selectActorPositionById(state, 'non-existent')).toBeUndefined();
      });

      it('should handle null entities', () => {
        const state = {
          actorPositionEntity: {
            entities: null,
          },
        };

        expect(() => selectActorPositionById(state, 'position-1')).toThrow();
      });
    });

    describe('selectSelectedActorPosition', () => {
      it('should return selected position', () => {
        const position = { id: 'position-selected', name: 'Selected Position' };
        const state = {
          actorPositionEntity: {
            entities: {
              'position-selected': position,
            },
          },
          mockSelectedPositionId: 'position-selected',
        };

        expect(selectSelectedActorPosition(state)).toEqual(position);
      });

      it('should return null when no position selected', () => {
        const state = {
          actorPositionEntity: {
            entities: {},
          },
          mockSelectedPositionId: null,
        };

        expect(selectSelectedActorPosition(state)).toBeNull();
      });

      it('should return null when entities is null', () => {
        const state = {
          actorPositionEntity: {
            entities: null,
          },
          mockSelectedPositionId: 'position-1',
        };

        expect(selectSelectedActorPosition(state)).toBeNull();
      });

      it('should return null when selected position does not exist', () => {
        const state = {
          actorPositionEntity: {
            entities: {},
          },
          mockSelectedPositionId: 'non-existent',
        };

        expect(selectSelectedActorPosition(state)).toBeNull();
      });
    });
  });

  describe('Collection Selectors', () => {
    describe('selectAllActorPositions', () => {
      it('should return all positions as array', () => {
        const entities = {
          'position-1': { id: 'position-1', name: 'CEO' },
          'position-2': { id: 'position-2', name: 'Manager' },
          'position-3': { id: 'position-3', name: 'Developer' },
        };
        const state = {
          actorPositionEntity: {
            ids: ['position-1', 'position-2', 'position-3'],
            entities,
          },
        };

        const result = selectAllActorPositions(state);
        expect(result).toHaveLength(3);
        expect(result[0]).toEqual(entities['position-1']);
        expect(result[1]).toEqual(entities['position-2']);
        expect(result[2]).toEqual(entities['position-3']);
      });

      it('should return empty array when no positions', () => {
        const state = {
          actorPositionEntity: {
            ids: [],
            entities: {},
          },
        };

        expect(selectAllActorPositions(state)).toEqual([]);
      });

      it('should maintain order based on ids array', () => {
        const state = {
          actorPositionEntity: {
            ids: ['position-3', 'position-1', 'position-2'],
            entities: {
              'position-1': { id: 'position-1', order: 1 },
              'position-2': { id: 'position-2', order: 2 },
              'position-3': { id: 'position-3', order: 3 },
            },
          },
        };

        const result = selectAllActorPositions(state);
        expect(result[0].id).toBe('position-3');
        expect(result[1].id).toBe('position-1');
        expect(result[2].id).toBe('position-2');
      });

      it('should handle undefined positions in the list', () => {
        const state = {
          actorPositionEntity: {
            ids: ['position-1', 'non-existent', 'position-2'],
            entities: {
              'position-1': { id: 'position-1', name: 'CEO' },
              'position-2': { id: 'position-2', name: 'Manager' },
            },
          },
        };

        const result = selectAllActorPositions(state);
        expect(result).toHaveLength(3);
        expect(result[1]).toBeUndefined();
      });
    });

    describe('selectActorPositionsByIds', () => {
      it('should return positions for given IDs', () => {
        const state = {
          actorPositionEntity: {
            entities: {
              'position-1': { id: 'position-1', name: 'CEO' },
              'position-2': { id: 'position-2', name: 'Manager' },
              'position-3': { id: 'position-3', name: 'Developer' },
            },
          },
        };

        const result = selectActorPositionsByIds(state, ['position-1', 'position-3']);
        expect(result).toHaveLength(2);
        expect(result[0].name).toBe('CEO');
        expect(result[1].name).toBe('Developer');
      });

      it('should filter out non-existent positions', () => {
        const state = {
          actorPositionEntity: {
            entities: {
              'position-1': { id: 'position-1', name: 'CEO' },
            },
          },
        };

        const result = selectActorPositionsByIds(state, ['position-1', 'non-existent']);
        expect(result).toHaveLength(1);
        expect(result[0].id).toBe('position-1');
      });

      it('should return empty array when ids is null', () => {
        const state = {
          actorPositionEntity: {
            entities: {},
          },
        };

        const result = selectActorPositionsByIds(state, null);
        expect(result).toEqual([]);
      });

      it('should return empty array when entities is null', () => {
        const state = {
          actorPositionEntity: {
            entities: null,
          },
        };

        const result = selectActorPositionsByIds(state, ['position-1']);
        expect(result).toEqual([]);
      });

      it('should return empty array when ids array is empty', () => {
        const state = {
          actorPositionEntity: {
            entities: {
              'position-1': { id: 'position-1' },
            },
          },
        };

        const result = selectActorPositionsByIds(state, []);
        expect(result).toEqual([]);
      });

      it('should maintain order from ids array', () => {
        const state = {
          actorPositionEntity: {
            entities: {
              'position-1': { id: 'position-1', name: 'CEO' },
              'position-2': { id: 'position-2', name: 'Manager' },
              'position-3': { id: 'position-3', name: 'Developer' },
            },
          },
        };

        const result = selectActorPositionsByIds(state, ['position-3', 'position-1', 'position-2']);
        expect(result[0].name).toBe('Developer');
        expect(result[1].name).toBe('CEO');
        expect(result[2].name).toBe('Manager');
      });
    });
  });

  describe('Edge Cases', () => {
    describe('selectAllActorPositions with hierarchical positions', () => {
      it('should handle positions with level hierarchy', () => {
        const state = {
          actorPositionEntity: {
            ids: ['position-1', 'position-2', 'position-3'],
            entities: {
              'position-1': { id: 'position-1', name: 'CEO', level: 1 },
              'position-2': { id: 'position-2', name: 'Manager', level: 2 },
              'position-3': { id: 'position-3', name: 'Developer', level: 3 },
            },
          },
        };

        const result = selectAllActorPositions(state);
        expect(result).toHaveLength(3);
        expect(result.every(p => p.level)).toBe(true);
      });
    });

    describe('selectActorPositionById with complex data', () => {
      it('should handle positions with nested properties', () => {
        const position = {
          id: 'position-1',
          name: 'Senior Developer',
          level: 3,
          permissions: ['read', 'write', 'admin'],
          metadata: {
            department: 'Engineering',
            created: '2024-01-01',
          },
        };
        const state = {
          actorPositionEntity: {
            entities: {
              'position-1': position,
            },
          },
        };

        const result = selectActorPositionById(state, 'position-1');
        expect(result).toEqual(position);
        expect(result.permissions).toHaveLength(3);
        expect(result.metadata.department).toBe('Engineering');
      });
    });
  });
});

