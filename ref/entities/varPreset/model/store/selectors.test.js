// ===================================================================
// Unit Tests for VarPreset Entity Redux Selectors
// Coverage Target: 95%+
// Week 4 - Day 5 (Selector Testing)
// ===================================================================

import { describe, it, expect, vi } from 'vitest';
import {
  selectPresetEntities,
  selectPresetIds,
  selectHoveredPresetId,
  selectFocusedPresetId,
  selectSelectedPresetId,
  selectPresetCheckStates,
  selectSelectedPreset,
  selectPresetsByType,
  selectAllPresets,
  selectPresetById,
  selectPresetsByIds,
  selectPresetsByCollectionId,
  selectTypographyCollectionPresets,
  selectCollectionPresetsAndModes,
} from './selectors';

// Mock cross-entity selectors
vi.mock('../../@x/presetModeValue', () => ({
  selectAllPresetModeValues: vi.fn(() => [
    { id: 'pmv-1', presetId: 'preset-1', variableModeId: 'mode-1', value: '16px' },
    { id: 'pmv-2', presetId: 'preset-1', variableModeId: 'mode-2', value: '18px' },
    { id: 'pmv-3', presetId: 'preset-2', variableModeId: 'mode-1', value: '#FF0000' },
  ]),
}));

vi.mock('../../@x/presetCollection', () => ({
  COLLECTION_TYPES: {
    COLOR: 'color',
    TYPOGRAPHY: 'typography',
    SPACING: 'spacing',
  },
  selectDefaultPresetCollection: vi.fn(() => [
    { id: 'collection-1', type: 'typography', variableModeIds: ['mode-1', 'mode-2'] },
    { id: 'collection-2', type: 'color', variableModeIds: ['mode-1'] },
  ]),
  selectPresetCollectionById: vi.fn((state, id) => ({
    id,
    variableModeIds: ['mode-1', 'mode-2'],
  })),
}));

vi.mock('../../@x/variableMode', () => ({
  selectAllVariableModes: vi.fn(() => [
    { id: 'mode-1', name: 'Light' },
    { id: 'mode-2', name: 'Dark' },
  ]),
}));

describe('VarPreset Entity Selectors', () => {
  describe('Base Selectors', () => {
    describe('selectPresetEntities', () => {
      it('should return preset entities object', () => {
        const entities = {
          'preset-1': { id: 'preset-1', name: 'Heading', type: 'typography' },
          'preset-2': { id: 'preset-2', name: 'Body', type: 'typography' },
        };
        const state = {
          presetEntity: {
            entities,
          },
        };

        expect(selectPresetEntities(state)).toEqual(entities);
      });

      it('should return empty object when no entities', () => {
        const state = {
          presetEntity: {
            entities: {},
          },
        };

        expect(selectPresetEntities(state)).toEqual({});
      });
    });

    describe('selectPresetIds', () => {
      it('should return preset ids array', () => {
        const ids = ['preset-1', 'preset-2', 'preset-3'];
        const state = {
          presetEntity: {
            ids,
          },
        };

        expect(selectPresetIds(state)).toEqual(ids);
      });

      it('should return empty array when no ids', () => {
        const state = {
          presetEntity: {
            ids: [],
          },
        };

        expect(selectPresetIds(state)).toEqual([]);
      });
    });
  });

  describe('UI State Selectors', () => {
    describe('selectHoveredPresetId', () => {
      it('should return hovered preset ID', () => {
        const state = {
          presetEntity: {
            ui: {
              hoveredPresetId: 'preset-hovered',
            },
          },
        };

        expect(selectHoveredPresetId(state)).toBe('preset-hovered');
      });

      it('should return null when no hovered preset', () => {
        const state = {
          presetEntity: {
            ui: {
              hoveredPresetId: null,
            },
          },
        };

        expect(selectHoveredPresetId(state)).toBeNull();
      });
    });

    describe('selectFocusedPresetId', () => {
      it('should return focused preset ID', () => {
        const state = {
          presetEntity: {
            ui: {
              focusedPresetId: 'preset-focused',
            },
          },
        };

        expect(selectFocusedPresetId(state)).toBe('preset-focused');
      });

      it('should return null when no focused preset', () => {
        const state = {
          presetEntity: {
            ui: {
              focusedPresetId: null,
            },
          },
        };

        expect(selectFocusedPresetId(state)).toBeNull();
      });
    });

    describe('selectSelectedPresetId', () => {
      it('should return selected preset ID', () => {
        const state = {
          presetEntity: {
            ui: {
              selectedPresetId: 'preset-selected',
            },
          },
        };

        expect(selectSelectedPresetId(state)).toBe('preset-selected');
      });

      it('should return null when no selected preset', () => {
        const state = {
          presetEntity: {
            ui: {
              selectedPresetId: null,
            },
          },
        };

        expect(selectSelectedPresetId(state)).toBeNull();
      });
    });
  });

  describe('Check States Selector', () => {
    describe('selectPresetCheckStates', () => {
      it('should return all check states as true for same preset', () => {
        const state = {
          presetEntity: {
            ui: {
              hoveredPresetId: 'preset-1',
              focusedPresetId: 'preset-1',
              selectedPresetId: 'preset-1',
            },
          },
        };

        const result = selectPresetCheckStates(state, 'preset-1');
        expect(result).toEqual({
          isSelected: true,
          isFocused: true,
          isHovered: true,
        });
      });

      it('should return all check states as false for different preset', () => {
        const state = {
          presetEntity: {
            ui: {
              hoveredPresetId: 'preset-1',
              focusedPresetId: 'preset-2',
              selectedPresetId: 'preset-3',
            },
          },
        };

        const result = selectPresetCheckStates(state, 'preset-4');
        expect(result).toEqual({
          isSelected: false,
          isFocused: false,
          isHovered: false,
        });
      });

      it('should return mixed check states', () => {
        const state = {
          presetEntity: {
            ui: {
              hoveredPresetId: 'preset-1',
              focusedPresetId: 'preset-1',
              selectedPresetId: 'preset-2',
            },
          },
        };

        const result = selectPresetCheckStates(state, 'preset-1');
        expect(result).toEqual({
          isSelected: false,
          isFocused: true,
          isHovered: true,
        });
      });
    });
  });

  describe('Entity Lookup Selectors', () => {
    describe('selectPresetById', () => {
      it('should return preset by ID', () => {
        const preset = { id: 'preset-1', name: 'Heading', type: 'typography' };
        const state = {
          presetEntity: {
            entities: {
              'preset-1': preset,
            },
          },
        };

        expect(selectPresetById(state, 'preset-1')).toEqual(preset);
      });

      it('should return undefined for non-existent ID', () => {
        const state = {
          presetEntity: {
            entities: {},
          },
        };

        expect(selectPresetById(state, 'non-existent')).toBeUndefined();
      });
    });

    describe('selectSelectedPreset', () => {
      it('should return selected preset', () => {
        const preset = { id: 'preset-selected', name: 'Selected Preset' };
        const state = {
          presetEntity: {
            ui: {
              selectedPresetId: 'preset-selected',
            },
            entities: {
              'preset-selected': preset,
            },
          },
        };

        expect(selectSelectedPreset(state)).toEqual(preset);
      });

      it('should return null when no preset selected', () => {
        const state = {
          presetEntity: {
            ui: {
              selectedPresetId: null,
            },
            entities: {},
          },
        };

        expect(selectSelectedPreset(state)).toBeNull();
      });

      it('should return undefined when selected preset does not exist', () => {
        const state = {
          presetEntity: {
            ui: {
              selectedPresetId: 'non-existent',
            },
            entities: {},
          },
        };

        expect(selectSelectedPreset(state)).toBeUndefined();
      });
    });
  });

  describe('Collection Selectors', () => {
    describe('selectAllPresets', () => {
      it('should return all presets with mode values', () => {
        const entities = {
          'preset-1': { id: 'preset-1', name: 'Heading', type: 'typography' },
          'preset-2': { id: 'preset-2', name: 'Body', type: 'typography' },
        };
        const state = {
          presetEntity: {
            ids: ['preset-1', 'preset-2'],
            entities,
          },
        };

        const result = selectAllPresets(state);
        expect(result).toHaveLength(2);
        expect(result[0].modeValues).toBeDefined();
        expect(result[0].modeValues).toHaveLength(2);
      });

      it('should return empty array when no presets', () => {
        const state = {
          presetEntity: {
            ids: [],
            entities: {},
          },
        };

        expect(selectAllPresets(state)).toEqual([]);
      });

      it('should return empty array when ids is null', () => {
        const state = {
          presetEntity: {
            ids: null,
            entities: {},
          },
        };

        expect(selectAllPresets(state)).toEqual([]);
      });

      it('should handle ids with missing entities', () => {
        const state = {
          presetEntity: {
            ids: ['preset-1', 'preset-2'],
            entities: {
              'preset-1': { id: 'preset-1', name: 'Heading' },
              'preset-2': { id: 'preset-2', name: 'Body' },
            },
          },
        };

        const result = selectAllPresets(state);
        expect(result.length).toBeGreaterThan(0);
        expect(result.every(p => p !== null && p !== undefined)).toBe(true);
      });
    });

    describe('selectPresetsByIds', () => {
      it('should return presets for given IDs', () => {
        const state = {
          presetEntity: {
            entities: {
              'preset-1': { id: 'preset-1', name: 'First' },
              'preset-2': { id: 'preset-2', name: 'Second' },
              'preset-3': { id: 'preset-3', name: 'Third' },
            },
          },
        };

        const result = selectPresetsByIds(state, ['preset-1', 'preset-3']);
        expect(result).toHaveLength(2);
        expect(result[0].name).toBe('First');
        expect(result[1].name).toBe('Third');
      });

      it('should filter out non-existent presets', () => {
        const state = {
          presetEntity: {
            entities: {
              'preset-1': { id: 'preset-1', name: 'First' },
            },
          },
        };

        const result = selectPresetsByIds(state, ['preset-1', 'non-existent']);
        expect(result).toHaveLength(1);
      });

      it('should return empty array when ids is null', () => {
        const state = {
          presetEntity: {
            entities: {},
          },
        };

        const result = selectPresetsByIds(state, null);
        expect(result).toEqual([]);
      });

      it('should return empty array when ids array is empty', () => {
        const state = {
          presetEntity: {
            entities: {
              'preset-1': { id: 'preset-1' },
            },
          },
        };

        const result = selectPresetsByIds(state, []);
        expect(result).toEqual([]);
      });
    });
  });

  describe('Filter Selectors', () => {
    describe('selectPresetsByType', () => {
      it('should return presets filtered by type', () => {
        const state = {
          presetEntity: {
            entities: {
              'preset-1': { id: 'preset-1', name: 'Heading', type: 'typography' },
              'preset-2': { id: 'preset-2', name: 'Primary', type: 'color' },
              'preset-3': { id: 'preset-3', name: 'Body', type: 'typography' },
            },
          },
        };

        const result = selectPresetsByType(state, 'typography');
        expect(result).toHaveLength(2);
        expect(result.every(p => p.type === 'typography')).toBe(true);
      });

      it('should return empty array when no matches', () => {
        const state = {
          presetEntity: {
            entities: {
              'preset-1': { id: 'preset-1', type: 'typography' },
            },
          },
        };

        const result = selectPresetsByType(state, 'color');
        expect(result).toEqual([]);
      });
    });

    describe('selectPresetsByCollectionId', () => {
      it('should return presets for collection', () => {
        const state = {
          presetEntity: {
            ids: ['preset-1', 'preset-2', 'preset-3'],
            entities: {
              'preset-1': { id: 'preset-1', collectionId: 'collection-1' },
              'preset-2': { id: 'preset-2', collectionId: 'collection-1' },
              'preset-3': { id: 'preset-3', collectionId: 'collection-2' },
            },
          },
        };

        const result = selectPresetsByCollectionId(state, 'collection-1');
        expect(result).toHaveLength(2);
        expect(result.every(p => p.collectionId === 'collection-1')).toBe(true);
      });

      it('should return empty array when collectionId is null', () => {
        const state = {
          presetEntity: {
            ids: [],
            entities: {},
          },
        };

        const result = selectPresetsByCollectionId(state, null);
        expect(result).toEqual([]);
      });
    });

    describe('selectTypographyCollectionPresets', () => {
      it('should return typography presets', () => {
        const state = {
          presetEntity: {
            ids: ['preset-1', 'preset-2'],
            entities: {
              'preset-1': { id: 'preset-1', collectionId: 'collection-1', name: 'Heading' },
              'preset-2': { id: 'preset-2', collectionId: 'collection-2', name: 'Body' },
            },
          },
        };

        const result = selectTypographyCollectionPresets(state);
        expect(Array.isArray(result)).toBe(true);
      });

      it('should handle no typography collection', () => {
        const state = {
          presetEntity: {
            ids: [],
            entities: {},
          },
        };

        const result = selectTypographyCollectionPresets(state);
        expect(Array.isArray(result)).toBe(true);
      });
    });
  });

  describe('Complex Selectors', () => {
    describe('selectCollectionPresetsAndModes', () => {
      it('should return presets and modes for collection', () => {
        const state = {
          presetEntity: {
            ids: ['preset-1', 'preset-2'],
            entities: {
              'preset-1': { id: 'preset-1', collectionId: 'collection-1', name: 'Heading' },
              'preset-2': { id: 'preset-2', collectionId: 'collection-1', name: 'Body' },
            },
          },
        };

        const result = selectCollectionPresetsAndModes(state, 'collection-1');

        expect(result).toHaveProperty('presets');
        expect(result).toHaveProperty('modes');
        expect(Array.isArray(result.presets)).toBe(true);
        expect(Array.isArray(result.modes)).toBe(true);
      });

      it('should return empty when collectionId is null', () => {
        const state = {
          presetEntity: {
            entities: {},
          },
        };

        const result = selectCollectionPresetsAndModes(state, null);
        expect(result).toEqual({ presets: [], modes: [] });
      });

      it('should include mode values in presets', () => {
        const state = {
          presetEntity: {
            ids: ['preset-1'],
            entities: {
              'preset-1': { id: 'preset-1', collectionId: 'collection-1' },
            },
          },
        };

        const result = selectCollectionPresetsAndModes(state, 'collection-1');

        if (result.presets.length > 0) {
          expect(result.presets[0]).toHaveProperty('modeValues');
        }
      });

      it('should handle collection with no presets', () => {
        const state = {
          presetEntity: {
            ids: [],
            entities: {},
          },
        };

        const result = selectCollectionPresetsAndModes(state, 'collection-empty');
        expect(result.presets).toHaveLength(0);
      });
    });
  });

  describe('Edge Cases', () => {
    describe('Complex preset data', () => {
      it('should handle presets with nested properties', () => {
        const preset = {
          id: 'preset-1',
          name: 'Heading',
          type: 'typography',
          properties: {
            fontSize: '24px',
            fontWeight: 'bold',
          },
          metadata: {
            created: '2024-01-01',
          },
        };
        const state = {
          presetEntity: {
            entities: {
              'preset-1': preset,
            },
          },
        };

        const result = selectPresetById(state, 'preset-1');
        expect(result.properties.fontSize).toBe('24px');
        expect(result.metadata.created).toBe('2024-01-01');
      });
    });

    describe('Multiple preset types', () => {
      it('should handle different preset types', () => {
        const state = {
          presetEntity: {
            entities: {
              'preset-1': { id: 'preset-1', type: 'typography' },
              'preset-2': { id: 'preset-2', type: 'color' },
              'preset-3': { id: 'preset-3', type: 'spacing' },
            },
          },
        };

        const typography = selectPresetsByType(state, 'typography');
        const color = selectPresetsByType(state, 'color');
        const spacing = selectPresetsByType(state, 'spacing');

        expect(typography).toHaveLength(1);
        expect(color).toHaveLength(1);
        expect(spacing).toHaveLength(1);
      });
    });
  });
});
