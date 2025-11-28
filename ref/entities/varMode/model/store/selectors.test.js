// ===================================================================
// Unit Tests for VarMode Entity Redux Selectors
// Coverage Target: 95%+
// Week 4 - Day 6 (Selector Testing - Final Push!)
// ===================================================================

import { describe, it, expect, vi } from 'vitest';
import {
  selectVariableModeState,
  selectVariableModeEntities,
  selectVariableModeIds,
  selectVariableModeUI,
  selectVariableModeById,
  selectSelectedVariableMode,
  selectAllVariableModes,
  selectVariableModesByIds,
  selectVariableModesByVariableId,
  selectVariableModesByType,
  selectVariableModesByModeGroupType,
  selectVariableModesByVariableModeGroupId,
  selectDefaultVariableModeByIds,
  selectDefaultVariableModeByCollectionId,
  selectVariableModesByCollectionId,
  selectSelectedCollectionModes,
} from './selectors';

// Mock UI state selectors
vi.mock('./selectorsStates', () => ({
  selectSelectedVariableModeId: vi.fn((state) => state.mockSelectedModeId || null),
}));

// Mock cross-entity selectors
vi.mock('../../@x/variableModeGroup', () => ({
  selectVariableModeGroupById: vi.fn((state, id) => ({
    id,
    name: `Mode Group ${id}`,
    type: 'theme',
  })),
}));

vi.mock('../../@x/presetCollection', () => ({
  selectPresetCollectionById: vi.fn((state, id) => ({
    id,
    name: `Collection ${id}`,
    variableModeIds: ['mode-1', 'mode-2'],
  })),
  selectSelectedPresetCollection: vi.fn((state) => state.mockSelectedCollection || null),
}));

vi.mock('../../../varPresetCollection/model/store/selectors', () => ({
  selectPresetCollectionById: vi.fn((state, id) => ({
    id,
    name: `Collection ${id}`,
    variableModeIds: ['mode-1', 'mode-2'],
  })),
  selectSelectedPresetCollection: vi.fn((state) => state.mockSelectedCollection || null),
  selectPresetCollectionIds: vi.fn((state) => state.mockPresetCollectionIds || []),
  selectPresetCollectionUI: vi.fn((state) => state.mockPresetCollectionUI || { selectedPresetCollectionId: null }),
  selectSelectedPresetCollectionId: vi.fn((state) => state.mockSelectedPresetCollectionId || null),
}));

describe('VarMode Entity Selectors', () => {
  describe('Base Selectors', () => {
    describe('selectVariableModeState', () => {
      it('should return variable mode entity state', () => {
        const modeState = {
          entities: {},
          ids: [],
          ui: {},
        };
        const state = {
          variableModeEntity: modeState,
        };

        expect(selectVariableModeState(state)).toEqual(modeState);
      });
    });

    describe('selectVariableModeEntities', () => {
      it('should return variable mode entities object', () => {
        const entities = {
          'mode-1': { id: 'mode-1', name: 'Light', type: 'theme' },
          'mode-2': { id: 'mode-2', name: 'Dark', type: 'theme' },
        };
        const state = {
          variableModeEntity: {
            entities,
          },
        };

        expect(selectVariableModeEntities(state)).toEqual(entities);
      });
    });

    describe('selectVariableModeIds', () => {
      it('should return variable mode ids array', () => {
        const ids = ['mode-1', 'mode-2', 'mode-3'];
        const state = {
          variableModeEntity: {
            ids,
          },
        };

        expect(selectVariableModeIds(state)).toEqual(ids);
      });
    });

    describe('selectVariableModeUI', () => {
      it('should return variable mode UI state', () => {
        const uiState = {
          selectedModeId: 'mode-1',
        };
        const state = {
          variableModeEntity: {
            ui: uiState,
          },
        };

        expect(selectVariableModeUI(state)).toEqual(uiState);
      });
    });
  });

  describe('Entity Lookup Selectors', () => {
    describe('selectVariableModeById', () => {
      it('should return mode by ID', () => {
        const mode = { id: 'mode-1', name: 'Light', type: 'theme' };
        const state = {
          variableModeEntity: {
            entities: {
              'mode-1': mode,
            },
          },
        };

        expect(selectVariableModeById(state, 'mode-1')).toEqual(mode);
      });

      it('should return undefined for non-existent ID', () => {
        const state = {
          variableModeEntity: {
            entities: {},
          },
        };

        expect(selectVariableModeById(state, 'non-existent')).toBeUndefined();
      });
    });

    describe('selectSelectedVariableMode', () => {
      it('should return selected mode', () => {
        const mode = { id: 'mode-selected', name: 'Selected Mode' };
        const state = {
          variableModeEntity: {
            entities: {
              'mode-selected': mode,
            },
          },
          mockSelectedModeId: 'mode-selected',
        };

        expect(selectSelectedVariableMode(state)).toEqual(mode);
      });

      it('should return null when no mode selected', () => {
        const state = {
          variableModeEntity: {
            entities: {},
          },
          mockSelectedModeId: null,
        };

        expect(selectSelectedVariableMode(state)).toBeNull();
      });
    });
  });

  describe('Collection Selectors', () => {
    describe('selectAllVariableModes', () => {
      it('should return all modes with mode groups', () => {
        const entities = {
          'mode-1': { id: 'mode-1', name: 'Light', modeGroupId: 'group-1' },
          'mode-2': { id: 'mode-2', name: 'Dark', modeGroupId: 'group-1' },
        };
        const state = {
          variableModeEntity: {
            ids: ['mode-1', 'mode-2'],
            entities,
          },
        };

        const result = selectAllVariableModes(state);
        expect(result).toHaveLength(2);
        expect(result[0].modeGroup).toBeDefined();
        expect(result[1].modeGroup).toBeDefined();
      });

      it('should return empty array when no modes', () => {
        const state = {
          variableModeEntity: {
            ids: [],
            entities: {},
          },
        };

        expect(selectAllVariableModes(state)).toEqual([]);
      });

      it('should filter out null modes', () => {
        const state = {
          variableModeEntity: {
            ids: ['mode-1', 'non-existent'],
            entities: {
              'mode-1': { id: 'mode-1', name: 'Light', modeGroupId: 'group-1' },
            },
          },
        };

        const result = selectAllVariableModes(state);
        expect(result).toHaveLength(1);
      });
    });

    describe('selectVariableModesByIds', () => {
      it('should return modes for given IDs', () => {
        const state = {
          variableModeEntity: {
            entities: {
              'mode-1': { id: 'mode-1', name: 'Light' },
              'mode-2': { id: 'mode-2', name: 'Dark' },
              'mode-3': { id: 'mode-3', name: 'Auto' },
            },
          },
        };

        const result = selectVariableModesByIds(state, ['mode-1', 'mode-3']);
        expect(result).toHaveLength(2);
        expect(result[0].name).toBe('Light');
        expect(result[1].name).toBe('Auto');
      });

      it('should return empty array when ids is null', () => {
        const state = {
          variableModeEntity: {
            entities: {},
          },
        };

        const result = selectVariableModesByIds(state, null);
        expect(result).toEqual([]);
      });
    });
  });

  describe('Filter Selectors', () => {
    describe('selectVariableModesByVariableId', () => {
      it('should return modes filtered by variable ID', () => {
        const state = {
          variableModeEntity: {
            entities: {
              'mode-1': { id: 'mode-1', VariableId: 'var-1' },
              'mode-2': { id: 'mode-2', VariableId: 'var-1' },
              'mode-3': { id: 'mode-3', VariableId: 'var-2' },
            },
          },
        };

        const result = selectVariableModesByVariableId(state, 'var-1');
        expect(result).toHaveLength(2);
        expect(result.every(m => m.VariableId === 'var-1')).toBe(true);
      });

      it('should return empty array when VariableId is null', () => {
        const state = {
          variableModeEntity: {
            entities: {},
          },
        };

        const result = selectVariableModesByVariableId(state, null);
        expect(result).toEqual([]);
      });
    });

    describe('selectVariableModesByType', () => {
      it('should return modes filtered by type', () => {
        const state = {
          variableModeEntity: {
            entities: {
              'mode-1': { id: 'mode-1', type: 'theme' },
              'mode-2': { id: 'mode-2', type: 'theme' },
              'mode-3': { id: 'mode-3', type: 'layout' },
            },
          },
        };

        const result = selectVariableModesByType(state, 'theme');
        expect(result).toHaveLength(2);
        expect(result.every(m => m.type === 'theme')).toBe(true);
      });

      it('should return empty array when type is null', () => {
        const state = {
          variableModeEntity: {
            entities: {},
          },
        };

        const result = selectVariableModesByType(state, null);
        expect(result).toEqual([]);
      });
    });

    describe('selectVariableModesByModeGroupType', () => {
      it('should return modes filtered by mode group type', () => {
        const state = {
          variableModeEntity: {
            ids: ['mode-1', 'mode-2'],
            entities: {
              'mode-1': { id: 'mode-1', modeGroupId: 'group-1' },
              'mode-2': { id: 'mode-2', modeGroupId: 'group-2' },
            },
          },
        };

        const result = selectVariableModesByModeGroupType(state, 'theme');
        expect(Array.isArray(result)).toBe(true);
      });

      it('should return empty array when modeGroupType is null', () => {
        const state = {
          variableModeEntity: {
            ids: [],
            entities: {},
          },
        };

        const result = selectVariableModesByModeGroupType(state, null);
        expect(result).toEqual([]);
      });
    });

    describe('selectVariableModesByVariableModeGroupId', () => {
      it('should return modes for mode group', () => {
        const state = {
          variableModeEntity: {
            entities: {
              'mode-1': { id: 'mode-1', modeGroupId: 'group-1' },
              'mode-2': { id: 'mode-2', modeGroupId: 'group-1' },
              'mode-3': { id: 'mode-3', modeGroupId: 'group-2' },
            },
          },
        };

        const result = selectVariableModesByVariableModeGroupId(state, 'group-1');
        expect(result).toHaveLength(2);
        expect(result.every(m => m.modeGroupId === 'group-1')).toBe(true);
      });

      it('should return empty array when modeGroupId is null', () => {
        const state = {
          variableModeEntity: {
            entities: {},
          },
        };

        const result = selectVariableModesByVariableModeGroupId(state, null);
        expect(result).toEqual([]);
      });
    });
  });

  describe('Default Mode Selectors', () => {
    describe('selectDefaultVariableModeByIds', () => {
      it('should return default mode from ids', () => {
        const state = {
          variableModeEntity: {
            ids: ['mode-1', 'mode-2', 'mode-3'],
            entities: {
              'mode-1': { id: 'mode-1', name: 'Light', isDefault: false, modeGroupId: 'group-1' },
              'mode-2': { id: 'mode-2', name: 'Dark', isDefault: true, modeGroupId: 'group-1' },
              'mode-3': { id: 'mode-3', name: 'Auto', isDefault: false, modeGroupId: 'group-1' },
            },
          },
        };

        const result = selectDefaultVariableModeByIds(state, ['mode-1', 'mode-2', 'mode-3']);
        expect(result).toBeDefined();
        expect(result.isDefault).toBe(true);
        expect(result.name).toBe('Dark');
      });

      it('should return undefined when no default mode', () => {
        const state = {
          variableModeEntity: {
            ids: ['mode-1'],
            entities: {
              'mode-1': { id: 'mode-1', isDefault: false, modeGroupId: 'group-1' },
            },
          },
        };

        const result = selectDefaultVariableModeByIds(state, ['mode-1']);
        expect(result).toBeUndefined();
      });

      it('should return empty array when ids is null', () => {
        const state = {
          variableModeEntity: {
            ids: [],
            entities: {},
          },
        };

        const result = selectDefaultVariableModeByIds(state, null);
        expect(result).toEqual([]);
      });
    });

    describe('selectDefaultVariableModeByCollectionId', () => {
      it('should return default mode for collection', () => {
        const state = {
          variableModeEntity: {
            ids: ['mode-1', 'mode-2'],
            entities: {
              'mode-1': { id: 'mode-1', isDefault: true, modeGroupId: 'group-1' },
              'mode-2': { id: 'mode-2', isDefault: false, modeGroupId: 'group-1' },
            },
          },
        };

        const result = selectDefaultVariableModeByCollectionId(state, 'collection-1');
        expect(result).toBeDefined();
      });

      it('should return empty array when collectionId is null', () => {
        const state = {
          variableModeEntity: {
            entities: {},
          },
        };

        const result = selectDefaultVariableModeByCollectionId(state, null);
        expect(result).toEqual([]);
      });
    });
  });

  describe('Collection-Based Selectors', () => {
    describe('selectVariableModesByCollectionId', () => {
      it('should return modes for collection', () => {
        const state = {
          variableModeEntity: {
            ids: ['mode-1', 'mode-2', 'mode-3'],
            entities: {
              'mode-1': { id: 'mode-1', name: 'Light', modeGroupId: 'group-1' },
              'mode-2': { id: 'mode-2', name: 'Dark', modeGroupId: 'group-1' },
              'mode-3': { id: 'mode-3', name: 'Auto', modeGroupId: 'group-1' },
            },
          },
        };

        const result = selectVariableModesByCollectionId(state, 'collection-1');
        expect(Array.isArray(result)).toBe(true);
      });

      it('should return empty array when collection has no modes', () => {
        const state = {
          variableModeEntity: {
            ids: [],
            entities: {},
          },
        };

        const result = selectVariableModesByCollectionId(state, 'collection-1');
        expect(result).toEqual([]);
      });
    });

    describe('selectSelectedCollectionModes', () => {
      it('should return modes for selected collection', () => {
        const state = {
          variableModeEntity: {
            ids: ['mode-1', 'mode-2'],
            entities: {
              'mode-1': { id: 'mode-1', name: 'Light', modeGroupId: 'group-1' },
              'mode-2': { id: 'mode-2', name: 'Dark', modeGroupId: 'group-1' },
            },
          },
          mockSelectedCollection: {
            id: 'collection-1',
            variableModeIds: ['mode-1', 'mode-2'],
          },
        };

        const result = selectSelectedCollectionModes(state);
        expect(result).toHaveLength(2);
      });

      it('should return empty array when no collection selected', () => {
        const state = {
          variableModeEntity: {
            ids: [],
            entities: {},
          },
          mockSelectedCollection: null,
        };

        const result = selectSelectedCollectionModes(state);
        expect(result).toEqual([]);
      });

      it('should return empty array when selected collection has no mode ids', () => {
        const state = {
          variableModeEntity: {
            ids: [],
            entities: {},
          },
          mockSelectedCollection: {
            id: 'collection-1',
          },
        };

        const result = selectSelectedCollectionModes(state);
        expect(result).toEqual([]);
      });
    });
  });

  describe('Edge Cases', () => {
    describe('Complex mode data', () => {
      it('should handle modes with nested properties', () => {
        const mode = {
          id: 'mode-1',
          name: 'Light Mode',
          type: 'theme',
          isDefault: true,
          settings: {
            primaryColor: '#ffffff',
            secondaryColor: '#000000',
          },
        };
        const state = {
          variableModeEntity: {
            entities: {
              'mode-1': mode,
            },
          },
        };

        const result = selectVariableModeById(state, 'mode-1');
        expect(result.settings.primaryColor).toBe('#ffffff');
      });
    });

    describe('Multiple mode types', () => {
      it('should handle different mode types', () => {
        const state = {
          variableModeEntity: {
            entities: {
              'mode-1': { id: 'mode-1', type: 'theme' },
              'mode-2': { id: 'mode-2', type: 'layout' },
              'mode-3': { id: 'mode-3', type: 'size' },
            },
          },
        };

        const themeResult = selectVariableModesByType(state, 'theme');
        const layoutResult = selectVariableModesByType(state, 'layout');

        expect(themeResult).toHaveLength(1);
        expect(layoutResult).toHaveLength(1);
      });
    });
  });
});

