// ===================================================================
// Unit Tests for VarModeGroup Entity Redux Selectors
// Coverage Target: 95%+
// Week 4 - Day 6 (Selector Testing)
// ===================================================================

import { describe, it, expect, vi } from 'vitest';
import {
  selectVariableModeGroupState,
  selectVariableModeGroupEntities,
  selectVariableModeGroupIds,
  selectVariableModeGroupUI,
  selectAllVariableModeGroups,
  selectSelectedVariableModeGroup,
  selectVariableModeGroupsByIds,
  selectVariableModeGroupById,
} from './selectors';

// Mock UI state selectors
vi.mock('./uiStates/selectors', () => ({
  selectSelectedVariableModeGroupId: vi.fn((state) => state.mockSelectedModeGroupId || null),
}));

describe('VarModeGroup Entity Selectors', () => {
  describe('Base Selectors', () => {
    describe('selectVariableModeGroupState', () => {
      it('should return mode group entity state', () => {
        const modeGroupState = {
          entities: {},
          ids: [],
          ui: {},
        };
        const state = {
          variableModeGroupEntity: modeGroupState,
        };

        expect(selectVariableModeGroupState(state)).toEqual(modeGroupState);
      });
    });

    describe('selectVariableModeGroupEntities', () => {
      it('should return mode group entities object', () => {
        const entities = {
          'group-1': { id: 'group-1', name: 'Theme Modes' },
          'group-2': { id: 'group-2', name: 'Layout Modes' },
        };
        const state = {
          variableModeGroupEntity: {
            entities,
          },
        };

        expect(selectVariableModeGroupEntities(state)).toEqual(entities);
      });

      it('should return empty object when no entities', () => {
        const state = {
          variableModeGroupEntity: {
            entities: {},
          },
        };

        expect(selectVariableModeGroupEntities(state)).toEqual({});
      });
    });

    describe('selectVariableModeGroupIds', () => {
      it('should return mode group ids array', () => {
        const ids = ['group-1', 'group-2', 'group-3'];
        const state = {
          variableModeGroupEntity: {
            ids,
          },
        };

        expect(selectVariableModeGroupIds(state)).toEqual(ids);
      });

      it('should return empty array when no ids', () => {
        const state = {
          variableModeGroupEntity: {
            ids: [],
          },
        };

        expect(selectVariableModeGroupIds(state)).toEqual([]);
      });
    });

    describe('selectVariableModeGroupUI', () => {
      it('should return mode group UI state', () => {
        const uiState = {
          selectedModeGroupId: 'group-1',
          hoveredModeGroupId: 'group-2',
        };
        const state = {
          variableModeGroupEntity: {
            ui: uiState,
          },
        };

        expect(selectVariableModeGroupUI(state)).toEqual(uiState);
      });

      it('should return empty UI state', () => {
        const state = {
          variableModeGroupEntity: {
            ui: {},
          },
        };

        expect(selectVariableModeGroupUI(state)).toEqual({});
      });
    });
  });

  describe('Entity Lookup Selectors', () => {
    describe('selectVariableModeGroupById', () => {
      it('should return mode group by ID', () => {
        const modeGroup = { id: 'group-1', name: 'Theme Modes', modes: ['light', 'dark'] };
        const state = {
          variableModeGroupEntity: {
            entities: {
              'group-1': modeGroup,
            },
          },
        };

        expect(selectVariableModeGroupById(state, 'group-1')).toEqual(modeGroup);
      });

      it('should return null for non-existent ID', () => {
        const state = {
          variableModeGroupEntity: {
            entities: {},
          },
        };

        expect(selectVariableModeGroupById(state, 'non-existent')).toBeNull();
      });

      it('should return null when id is null', () => {
        const state = {
          variableModeGroupEntity: {
            entities: {},
          },
        };

        expect(selectVariableModeGroupById(state, null)).toBeNull();
      });

      it('should return null when entities is null', () => {
        const state = {
          variableModeGroupEntity: {
            entities: null,
          },
        };

        expect(selectVariableModeGroupById(state, 'group-1')).toBeNull();
      });
    });

    describe('selectSelectedVariableModeGroup', () => {
      it('should return selected mode group', () => {
        const modeGroup = { id: 'group-selected', name: 'Selected Mode Group' };
        const state = {
          variableModeGroupEntity: {
            entities: {
              'group-selected': modeGroup,
            },
          },
          mockSelectedModeGroupId: 'group-selected',
        };

        expect(selectSelectedVariableModeGroup(state)).toEqual(modeGroup);
      });

      it('should return null when no mode group selected', () => {
        const state = {
          variableModeGroupEntity: {
            entities: {},
          },
          mockSelectedModeGroupId: null,
        };

        expect(selectSelectedVariableModeGroup(state)).toBeNull();
      });

      it('should return null when entities is null', () => {
        const state = {
          variableModeGroupEntity: {
            entities: null,
          },
          mockSelectedModeGroupId: 'group-1',
        };

        expect(selectSelectedVariableModeGroup(state)).toBeNull();
      });

      it('should return null when selected mode group does not exist', () => {
        const state = {
          variableModeGroupEntity: {
            entities: {},
          },
          mockSelectedModeGroupId: 'non-existent',
        };

        expect(selectSelectedVariableModeGroup(state)).toBeNull();
      });
    });
  });

  describe('Collection Selectors', () => {
    describe('selectAllVariableModeGroups', () => {
      it('should return all mode groups as array', () => {
        const entities = {
          'group-1': { id: 'group-1', name: 'Theme Modes' },
          'group-2': { id: 'group-2', name: 'Layout Modes' },
          'group-3': { id: 'group-3', name: 'Size Modes' },
        };
        const state = {
          variableModeGroupEntity: {
            ids: ['group-1', 'group-2', 'group-3'],
            entities,
          },
        };

        const result = selectAllVariableModeGroups(state);
        expect(result).toHaveLength(3);
        expect(result[0]).toEqual(entities['group-1']);
        expect(result[1]).toEqual(entities['group-2']);
        expect(result[2]).toEqual(entities['group-3']);
      });

      it('should return empty array when no mode groups', () => {
        const state = {
          variableModeGroupEntity: {
            ids: [],
            entities: {},
          },
        };

        expect(selectAllVariableModeGroups(state)).toEqual([]);
      });

      it('should maintain order based on ids array', () => {
        const state = {
          variableModeGroupEntity: {
            ids: ['group-3', 'group-1', 'group-2'],
            entities: {
              'group-1': { id: 'group-1', order: 1 },
              'group-2': { id: 'group-2', order: 2 },
              'group-3': { id: 'group-3', order: 3 },
            },
          },
        };

        const result = selectAllVariableModeGroups(state);
        expect(result[0].id).toBe('group-3');
        expect(result[1].id).toBe('group-1');
        expect(result[2].id).toBe('group-2');
      });

      it('should handle null mode groups', () => {
        const state = {
          variableModeGroupEntity: {
            ids: ['group-1', 'non-existent', 'group-2'],
            entities: {
              'group-1': { id: 'group-1', name: 'Theme' },
              'group-2': { id: 'group-2', name: 'Layout' },
            },
          },
        };

        const result = selectAllVariableModeGroups(state);
        expect(result).toHaveLength(3);
        expect(result[1]).toBeNull();
      });
    });

    describe('selectVariableModeGroupsByIds', () => {
      it('should return mode groups for given IDs', () => {
        const state = {
          variableModeGroupEntity: {
            entities: {
              'group-1': { id: 'group-1', name: 'Theme' },
              'group-2': { id: 'group-2', name: 'Layout' },
              'group-3': { id: 'group-3', name: 'Size' },
            },
          },
        };

        const result = selectVariableModeGroupsByIds(state, ['group-1', 'group-3']);
        expect(result).toHaveLength(2);
        expect(result[0].name).toBe('Theme');
        expect(result[1].name).toBe('Size');
      });

      it('should filter out non-existent mode groups', () => {
        const state = {
          variableModeGroupEntity: {
            entities: {
              'group-1': { id: 'group-1', name: 'Theme' },
            },
          },
        };

        const result = selectVariableModeGroupsByIds(state, ['group-1', 'non-existent']);
        expect(result).toHaveLength(1);
        expect(result[0].id).toBe('group-1');
      });

      it('should return empty array when ids is null', () => {
        const state = {
          variableModeGroupEntity: {
            entities: {},
          },
        };

        const result = selectVariableModeGroupsByIds(state, null);
        expect(result).toEqual([]);
      });

      it('should return empty array when entities is null', () => {
        const state = {
          variableModeGroupEntity: {
            entities: null,
          },
        };

        const result = selectVariableModeGroupsByIds(state, ['group-1']);
        expect(result).toEqual([]);
      });

      it('should return empty array when ids array is empty', () => {
        const state = {
          variableModeGroupEntity: {
            entities: {
              'group-1': { id: 'group-1' },
            },
          },
        };

        const result = selectVariableModeGroupsByIds(state, []);
        expect(result).toEqual([]);
      });

      it('should maintain order from ids array', () => {
        const state = {
          variableModeGroupEntity: {
            entities: {
              'group-1': { id: 'group-1', name: 'Theme' },
              'group-2': { id: 'group-2', name: 'Layout' },
              'group-3': { id: 'group-3', name: 'Size' },
            },
          },
        };

        const result = selectVariableModeGroupsByIds(state, ['group-3', 'group-1', 'group-2']);
        expect(result[0].name).toBe('Size');
        expect(result[1].name).toBe('Theme');
        expect(result[2].name).toBe('Layout');
      });
    });
  });

  describe('Edge Cases', () => {
    describe('Complex mode group data', () => {
      it('should handle mode groups with nested properties', () => {
        const modeGroup = {
          id: 'group-1',
          name: 'Theme Modes',
          modes: ['light', 'dark', 'auto'],
          settings: {
            defaultMode: 'light',
            allowCustom: true,
          },
          metadata: {
            created: '2024-01-01',
          },
        };
        const state = {
          variableModeGroupEntity: {
            entities: {
              'group-1': modeGroup,
            },
          },
        };

        const result = selectVariableModeGroupById(state, 'group-1');
        expect(result.modes).toHaveLength(3);
        expect(result.settings.defaultMode).toBe('light');
        expect(result.metadata.created).toBe('2024-01-01');
      });
    });

    describe('Multiple mode groups', () => {
      it('should handle multiple mode groups with different configurations', () => {
        const state = {
          variableModeGroupEntity: {
            ids: ['group-1', 'group-2'],
            entities: {
              'group-1': { id: 'group-1', name: 'Theme', modes: ['light', 'dark'] },
              'group-2': { id: 'group-2', name: 'Layout', modes: ['desktop', 'mobile', 'tablet'] },
            },
          },
        };

        const allGroups = selectAllVariableModeGroups(state);

        expect(allGroups[0].modes).toHaveLength(2);
        expect(allGroups[1].modes).toHaveLength(3);
      });
    });

    describe('Empty state handling', () => {
      it('should handle completely empty state', () => {
        const state = {
          variableModeGroupEntity: {
            entities: {},
            ids: [],
            ui: {},
          },
        };

        expect(selectAllVariableModeGroups(state)).toEqual([]);
        expect(selectSelectedVariableModeGroup(state)).toBeNull();
      });
    });
  });
});

