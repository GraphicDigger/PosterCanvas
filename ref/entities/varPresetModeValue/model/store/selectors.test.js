// ===================================================================
// Unit Tests for VarPresetModeValue Entity Redux Selectors
// Coverage Target: 95%+
// Continuation Phase (Selector Testing - PUSH TO 2,000!)
// ===================================================================

import { describe, it, expect, vi } from 'vitest';
import {
  selectPresetModeValueState,
  selectPresetModeValueEntities,
  selectPresetModeValueIds,
  selectPresetModeValueUI,
  selectPresetModeValueById,
  selectAllPresetModeValues,
  selectSelectedPresetModeValue,
  selectModeValueById,
  selectPresetModeValuesByIds,
  selectPresetModeValuesByVariableModeId,
  selectPresetModeValuesByPresetIds,
  selectPresetModeValuesByVariableModeIdAndPresetIds,
  selectPresetModeValueByPresetIdAndVariableModeId,
} from './selectors.js';

// Mock UI state selectors
vi.mock('./selectorsStates', () => ({
  selectSelectedPresetModeValueId: vi.fn((state) => state.mockSelectedPresetModeValueId || null),
}));

// Mock cross-entity selectors
vi.mock('../../@x/variableMode', () => ({
  selectAllVariableModes: vi.fn((state) => [
    { id: 'mode-1', name: 'Light', isDefault: true },
    { id: 'mode-2', name: 'Dark', isDefault: false },
    { id: 'mode-3', name: 'Auto', isDefault: false },
  ]),
}));

describe('VarPresetModeValue Entity Selectors', () => {
  describe('Base Selectors', () => {
    describe('selectPresetModeValueState', () => {
      it('should return preset mode value entity state', () => {
        const presetModeValueState = {
          entities: {},
          ids: [],
          ui: {},
        };
        const state = {
          presetModeValueEntity: presetModeValueState,
        };

        expect(selectPresetModeValueState(state)).toEqual(presetModeValueState);
      });
    });

    describe('selectPresetModeValueEntities', () => {
      it('should return preset mode value entities object', () => {
        const entities = {
          'pmv-1': { id: 'pmv-1', presetId: 'preset-1', variableModeId: 'mode-1', value: '#ffffff' },
          'pmv-2': { id: 'pmv-2', presetId: 'preset-2', variableModeId: 'mode-2', value: '#000000' },
        };
        const state = {
          presetModeValueEntity: {
            entities,
          },
        };

        expect(selectPresetModeValueEntities(state)).toEqual(entities);
      });
    });

    describe('selectPresetModeValueIds', () => {
      it('should return preset mode value ids array', () => {
        const ids = ['pmv-1', 'pmv-2', 'pmv-3'];
        const state = {
          presetModeValueEntity: {
            ids,
          },
        };

        expect(selectPresetModeValueIds(state)).toEqual(ids);
      });
    });

    describe('selectPresetModeValueUI', () => {
      it('should return preset mode value UI state', () => {
        const uiState = {
          selectedPresetModeValueId: 'pmv-1',
        };
        const state = {
          presetModeValueEntity: {
            ui: uiState,
          },
        };

        expect(selectPresetModeValueUI(state)).toEqual(uiState);
      });
    });
  });

  describe('Entity Lookup Selectors', () => {
    describe('selectPresetModeValueById', () => {
      it('should return preset mode value by ID', () => {
        const presetModeValue = {
          id: 'pmv-1',
          presetId: 'preset-1',
          variableModeId: 'mode-1',
          value: '#ffffff',
        };
        const state = {
          presetModeValueEntity: {
            entities: {
              'pmv-1': presetModeValue,
            },
          },
        };

        expect(selectPresetModeValueById(state, 'pmv-1')).toEqual(presetModeValue);
      });

      it('should return undefined for non-existent ID', () => {
        const state = {
          presetModeValueEntity: {
            entities: {},
          },
        };

        expect(selectPresetModeValueById(state, 'non-existent')).toBeUndefined();
      });
    });

    describe('selectSelectedPresetModeValue', () => {
      it('should return selected preset mode value', () => {
        const presetModeValue = { id: 'pmv-selected', value: '#ff0000' };
        const state = {
          presetModeValueEntity: {
            entities: {
              'pmv-selected': presetModeValue,
            },
          },
          mockSelectedPresetModeValueId: 'pmv-selected',
        };

        expect(selectSelectedPresetModeValue(state)).toEqual(presetModeValue);
      });

      it('should return null when no preset mode value selected', () => {
        const state = {
          presetModeValueEntity: {
            entities: {},
          },
          mockSelectedPresetModeValueId: null,
        };

        expect(selectSelectedPresetModeValue(state)).toBeNull();
      });
    });

    describe('selectModeValueById', () => {
      it('should return mode value by ID with isDefault flag', () => {
        const state = {
          presetModeValueEntity: {
            ids: ['pmv-1'],
            entities: {
              'pmv-1': {
                id: 'pmv-1',
                presetId: 'preset-1',
                variableModeId: 'mode-1',
                value: '#ffffff',
              },
            },
          },
        };

        const result = selectModeValueById(state, 'pmv-1');
        expect(result).toBeDefined();
        expect(result.id).toBe('pmv-1');
        expect(result.isDefault).toBe(true); // mode-1 is default
      });

      it('should return null when id is null', () => {
        const state = {
          presetModeValueEntity: {
            ids: [],
            entities: {},
          },
        };

        const result = selectModeValueById(state, null);
        expect(result).toBeNull();
      });
    });
  });

  describe('Collection Selectors', () => {
    describe('selectAllPresetModeValues', () => {
      it('should return all preset mode values with isDefault flag', () => {
        const entities = {
          'pmv-1': { id: 'pmv-1', variableModeId: 'mode-1', value: '#ffffff' },
          'pmv-2': { id: 'pmv-2', variableModeId: 'mode-2', value: '#000000' },
        };
        const state = {
          presetModeValueEntity: {
            ids: ['pmv-1', 'pmv-2'],
            entities,
          },
        };

        const result = selectAllPresetModeValues(state);
        expect(result).toHaveLength(2);
        expect(result[0].isDefault).toBe(true); // mode-1
        expect(result[1].isDefault).toBe(false); // mode-2
      });

      it('should filter out null values', () => {
        const state = {
          presetModeValueEntity: {
            ids: ['pmv-1', 'non-existent'],
            entities: {
              'pmv-1': { id: 'pmv-1', variableModeId: 'mode-1', value: '#ffffff' },
            },
          },
        };

        const result = selectAllPresetModeValues(state);
        expect(result).toHaveLength(1);
      });

      it('should return empty array when ids is null', () => {
        const state = {
          presetModeValueEntity: {
            ids: null,
            entities: {},
          },
        };

        const result = selectAllPresetModeValues(state);
        expect(result).toEqual([]);
      });
    });

    describe('selectPresetModeValuesByIds', () => {
      it('should return preset mode values for given IDs', () => {
        const state = {
          presetModeValueEntity: {
            entities: {
              'pmv-1': { id: 'pmv-1', value: '#ffffff' },
              'pmv-2': { id: 'pmv-2', value: '#000000' },
              'pmv-3': { id: 'pmv-3', value: '#ff0000' },
            },
          },
        };

        const result = selectPresetModeValuesByIds(state, ['pmv-1', 'pmv-3']);
        expect(result).toHaveLength(2);
        expect(result[0].value).toBe('#ffffff');
        expect(result[1].value).toBe('#ff0000');
      });

      it('should return empty array when ids is null', () => {
        const state = {
          presetModeValueEntity: {
            entities: {},
          },
        };

        const result = selectPresetModeValuesByIds(state, null);
        expect(result).toEqual([]);
      });
    });
  });

  describe('Filter Selectors', () => {
    describe('selectPresetModeValuesByVariableModeId', () => {
      it('should return preset mode values filtered by variable mode ID', () => {
        const state = {
          presetModeValueEntity: {
            entities: {
              'pmv-1': { id: 'pmv-1', variableModeId: 'mode-1', value: '#ffffff' },
              'pmv-2': { id: 'pmv-2', variableModeId: 'mode-1', value: '#eeeeee' },
              'pmv-3': { id: 'pmv-3', variableModeId: 'mode-2', value: '#000000' },
            },
          },
        };

        const result = selectPresetModeValuesByVariableModeId(state, 'mode-1');
        expect(result).toHaveLength(2);
        expect(result.every(pmv => pmv.variableModeId === 'mode-1')).toBe(true);
      });

      it('should return empty array when variableModeId is null', () => {
        const state = {
          presetModeValueEntity: {
            entities: {},
          },
        };

        const result = selectPresetModeValuesByVariableModeId(state, null);
        expect(result).toEqual([]);
      });
    });

    describe('selectPresetModeValuesByPresetIds', () => {
      it('should return preset mode values filtered by preset IDs', () => {
        const state = {
          presetModeValueEntity: {
            entities: {
              'pmv-1': { id: 'pmv-1', presetId: 'preset-1', value: '#ffffff' },
              'pmv-2': { id: 'pmv-2', presetId: 'preset-2', value: '#000000' },
              'pmv-3': { id: 'pmv-3', presetId: 'preset-3', value: '#ff0000' },
            },
          },
        };

        const result = selectPresetModeValuesByPresetIds(state, ['preset-1', 'preset-3']);
        expect(result).toHaveLength(2);
        expect(result.map(pmv => pmv.presetId)).toEqual(['preset-1', 'preset-3']);
      });

      it('should return empty array when presetIds is null', () => {
        const state = {
          presetModeValueEntity: {
            entities: {},
          },
        };

        const result = selectPresetModeValuesByPresetIds(state, null);
        expect(result).toEqual([]);
      });
    });

    describe('selectPresetModeValuesByVariableModeIdAndPresetIds', () => {
      it('should return preset mode values filtered by mode and preset IDs', () => {
        const state = {
          presetModeValueEntity: {
            entities: {
              'pmv-1': { id: 'pmv-1', presetId: 'preset-1', variableModeId: 'mode-1', value: '#ffffff' },
              'pmv-2': { id: 'pmv-2', presetId: 'preset-2', variableModeId: 'mode-1', value: '#eeeeee' },
              'pmv-3': { id: 'pmv-3', presetId: 'preset-1', variableModeId: 'mode-2', value: '#000000' },
            },
          },
        };

        const result = selectPresetModeValuesByVariableModeIdAndPresetIds(
          state,
          'mode-1',
          ['preset-1', 'preset-2'],
        );
        expect(result).toHaveLength(2);
        expect(result.every(pmv => pmv.variableModeId === 'mode-1')).toBe(true);
        expect(result.every(pmv => ['preset-1', 'preset-2'].includes(pmv.presetId))).toBe(true);
      });

      it('should return empty array when variableModeId is null', () => {
        const state = {
          presetModeValueEntity: {
            entities: {},
          },
        };

        const result = selectPresetModeValuesByVariableModeIdAndPresetIds(state, null, ['preset-1']);
        expect(result).toEqual([]);
      });

      it('should return empty array when presetIds is null', () => {
        const state = {
          presetModeValueEntity: {
            entities: {},
          },
        };

        const result = selectPresetModeValuesByVariableModeIdAndPresetIds(state, 'mode-1', null);
        expect(result).toEqual([]);
      });
    });

    describe('selectPresetModeValueByPresetIdAndVariableModeId', () => {
      it('should return preset mode value by presetId and variableModeId', () => {
        const state = {
          presetModeValueEntity: {
            entities: {
              'pmv-1': {
                id: 'pmv-1',
                presetId: 'preset-1',
                variableModeId: 'mode-1',
                value: '#ffffff',
              },
              'pmv-2': {
                id: 'pmv-2',
                presetId: 'preset-1',
                variableModeId: 'mode-2',
                value: '#000000',
              },
            },
          },
        };

        const result = selectPresetModeValueByPresetIdAndVariableModeId(state, 'preset-1', 'mode-2');
        expect(result).toBeDefined();
        expect(result.id).toBe('pmv-2');
        expect(result.value).toBe('#000000');
      });

      it('should return undefined when not found', () => {
        const state = {
          presetModeValueEntity: {
            entities: {},
          },
        };

        const result = selectPresetModeValueByPresetIdAndVariableModeId(state, 'preset-1', 'mode-1');
        expect(result).toBeUndefined();
      });

      it('should return null when presetId is null', () => {
        const state = {
          presetModeValueEntity: {
            entities: {},
          },
        };

        const result = selectPresetModeValueByPresetIdAndVariableModeId(state, null, 'mode-1');
        expect(result).toBeNull();
      });

      it('should return null when variableModeId is null', () => {
        const state = {
          presetModeValueEntity: {
            entities: {},
          },
        };

        const result = selectPresetModeValueByPresetIdAndVariableModeId(state, 'preset-1', null);
        expect(result).toBeNull();
      });
    });
  });

  describe('Edge Cases', () => {
    describe('Complex preset mode value data', () => {
      it('should handle preset mode values with nested properties', () => {
        const presetModeValue = {
          id: 'pmv-1',
          presetId: 'preset-1',
          variableModeId: 'mode-1',
          value: '#ffffff',
          metadata: {
            created: '2024-01-01',
            type: 'color',
          },
        };
        const state = {
          presetModeValueEntity: {
            entities: {
              'pmv-1': presetModeValue,
            },
          },
        };

        const result = selectPresetModeValueById(state, 'pmv-1');
        expect(result.metadata.type).toBe('color');
      });
    });

    describe('Multiple modes and presets', () => {
      it('should handle preset mode values across multiple modes and presets', () => {
        const state = {
          presetModeValueEntity: {
            entities: {
              'pmv-1': { id: 'pmv-1', presetId: 'preset-1', variableModeId: 'mode-1', value: '#ffffff' },
              'pmv-2': { id: 'pmv-2', presetId: 'preset-1', variableModeId: 'mode-2', value: '#000000' },
              'pmv-3': { id: 'pmv-3', presetId: 'preset-2', variableModeId: 'mode-1', value: '#ff0000' },
            },
          },
        };

        const lightMode = selectPresetModeValuesByVariableModeId(state, 'mode-1');
        const preset1 = selectPresetModeValuesByPresetIds(state, ['preset-1']);

        expect(lightMode).toHaveLength(2);
        expect(preset1).toHaveLength(2);
      });
    });

    describe('Default mode handling', () => {
      it('should correctly identify default mode values', () => {
        const state = {
          presetModeValueEntity: {
            ids: ['pmv-1', 'pmv-2'],
            entities: {
              'pmv-1': { id: 'pmv-1', variableModeId: 'mode-1', value: '#ffffff' }, // default
              'pmv-2': { id: 'pmv-2', variableModeId: 'mode-2', value: '#000000' }, // not default
            },
          },
        };

        const result = selectAllPresetModeValues(state);
        const defaultValues = result.filter(pmv => pmv.isDefault);
        const nonDefaultValues = result.filter(pmv => !pmv.isDefault);

        expect(defaultValues).toHaveLength(1);
        expect(nonDefaultValues).toHaveLength(1);
      });
    });

    describe('Empty state handling', () => {
      it('should handle completely empty state', () => {
        const state = {
          presetModeValueEntity: {
            entities: {},
            ids: [],
            ui: {},
          },
        };

        expect(selectAllPresetModeValues(state)).toEqual([]);
        expect(selectSelectedPresetModeValue(state)).toBeNull();
      });
    });
  });
});

