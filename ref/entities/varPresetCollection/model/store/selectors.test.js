// ===================================================================
// Unit Tests for VarPresetCollection Entity Redux Selectors
// Coverage Target: 95%+
// Week 4 - Day 3 (Selector Testing)
// ===================================================================

import { describe, it, expect, vi } from 'vitest';
import {
  selectHoveredPresetCollectionId,
  selectFocusedPresetCollectionId,
  selectSelectedPresetCollectionId,
  selectPresetCollectionCheckStates,
  selectAllPresetCollections,
  selectDefaultPresetCollection,
  selectTypographyPresetCollection,
  selectPresetCollectionById,
  selectSelectedPresetCollection,
} from './selectors';
import { COLLECTION_TYPES } from '../constants/collectionTypes';

// Mock cross-entity selectors
vi.mock('../../@x/variableMode', () => ({
  selectAllVariableModes: vi.fn(() => [
    { id: 'mode-1', name: 'Light' },
    { id: 'mode-2', name: 'Dark' },
  ]),
}));

describe('VarPresetCollection Entity Selectors', () => {
  describe('UI State Selectors', () => {
    describe('selectHoveredPresetCollectionId', () => {
      it('should return hovered collection ID', () => {
        const state = {
          presetCollectionEntity: {
            ui: {
              hoveredPresetCollectionId: 'preset-collection-hovered',
            },
          },
        };

        expect(selectHoveredPresetCollectionId(state)).toBe('preset-collection-hovered');
      });

      it('should return null when no hovered collection', () => {
        const state = {
          presetCollectionEntity: {
            ui: {
              hoveredPresetCollectionId: null,
            },
          },
        };

        expect(selectHoveredPresetCollectionId(state)).toBeNull();
      });
    });

    describe('selectFocusedPresetCollectionId', () => {
      it('should return focused collection ID', () => {
        const state = {
          presetCollectionEntity: {
            ui: {
              focusedPresetCollectionId: 'preset-collection-focused',
            },
          },
        };

        expect(selectFocusedPresetCollectionId(state)).toBe('preset-collection-focused');
      });

      it('should return null when no focused collection', () => {
        const state = {
          presetCollectionEntity: {
            ui: {
              focusedPresetCollectionId: null,
            },
          },
        };

        expect(selectFocusedPresetCollectionId(state)).toBeNull();
      });
    });

    describe('selectSelectedPresetCollectionId', () => {
      it('should return selected collection ID', () => {
        const state = {
          presetCollectionEntity: {
            ui: {
              selectedPresetCollectionId: 'preset-collection-selected',
            },
          },
        };

        expect(selectSelectedPresetCollectionId(state)).toBe('preset-collection-selected');
      });

      it('should return null when no selected collection', () => {
        const state = {
          presetCollectionEntity: {
            ui: {
              selectedPresetCollectionId: null,
            },
          },
        };

        expect(selectSelectedPresetCollectionId(state)).toBeNull();
      });
    });
  });

  describe('Check States Selector', () => {
    describe('selectPresetCollectionCheckStates', () => {
      it('should return all check states as true for same collection', () => {
        const state = {
          presetCollectionEntity: {
            ui: {
              hoveredPresetCollectionId: 'collection-1',
              focusedPresetCollectionId: 'collection-1',
              selectedPresetCollectionId: 'collection-1',
            },
          },
        };

        const result = selectPresetCollectionCheckStates(state, 'collection-1');
        expect(result).toEqual({
          isSelected: true,
          isFocused: true,
          isHovered: true,
        });
      });

      it('should return all check states as false for different collection', () => {
        const state = {
          presetCollectionEntity: {
            ui: {
              hoveredPresetCollectionId: 'collection-1',
              focusedPresetCollectionId: 'collection-2',
              selectedPresetCollectionId: 'collection-3',
            },
          },
        };

        const result = selectPresetCollectionCheckStates(state, 'collection-4');
        expect(result).toEqual({
          isSelected: false,
          isFocused: false,
          isHovered: false,
        });
      });

      it('should return mixed check states', () => {
        const state = {
          presetCollectionEntity: {
            ui: {
              hoveredPresetCollectionId: 'collection-1',
              focusedPresetCollectionId: 'collection-1',
              selectedPresetCollectionId: 'collection-2',
            },
          },
        };

        const result = selectPresetCollectionCheckStates(state, 'collection-1');
        expect(result).toEqual({
          isSelected: false,
          isFocused: true,
          isHovered: true,
        });
      });
    });
  });

  describe('Collection List Selectors', () => {
    describe('selectAllPresetCollections', () => {
      it('should return all preset collections as array', () => {
        const entities = {
          'collection-1': { id: 'collection-1', name: 'Colors', type: COLLECTION_TYPES.COLOR },
          'collection-2': { id: 'collection-2', name: 'Typography', type: COLLECTION_TYPES.TYPOGRAPHY },
          'collection-3': { id: 'collection-3', name: 'Spacing', type: COLLECTION_TYPES.SPACING },
        };
        const state = {
          presetCollectionEntity: {
            ids: ['collection-1', 'collection-2', 'collection-3'],
            entities,
          },
        };

        const result = selectAllPresetCollections(state);
        expect(result).toHaveLength(3);
        expect(result[0]).toEqual(entities['collection-1']);
        expect(result[1]).toEqual(entities['collection-2']);
        expect(result[2]).toEqual(entities['collection-3']);
      });

      it('should return empty array when no collections', () => {
        const state = {
          presetCollectionEntity: {
            ids: [],
            entities: {},
          },
        };

        expect(selectAllPresetCollections(state)).toEqual([]);
      });

      it('should return empty array when ids is null', () => {
        const state = {
          presetCollectionEntity: {
            ids: null,
            entities: {},
          },
        };

        expect(selectAllPresetCollections(state)).toEqual([]);
      });

      it('should return empty array when entities is null', () => {
        const state = {
          presetCollectionEntity: {
            ids: ['collection-1'],
            entities: null,
          },
        };

        expect(selectAllPresetCollections(state)).toEqual([]);
      });

      it('should filter out undefined collections', () => {
        const state = {
          presetCollectionEntity: {
            ids: ['collection-1', 'non-existent', 'collection-2'],
            entities: {
              'collection-1': { id: 'collection-1', name: 'Colors' },
              'collection-2': { id: 'collection-2', name: 'Typography' },
            },
          },
        };

        const result = selectAllPresetCollections(state);
        expect(result).toHaveLength(2);
        expect(result[0].id).toBe('collection-1');
        expect(result[1].id).toBe('collection-2');
      });

      it('should maintain order based on ids array', () => {
        const state = {
          presetCollectionEntity: {
            ids: ['collection-3', 'collection-1', 'collection-2'],
            entities: {
              'collection-1': { id: 'collection-1', order: 1 },
              'collection-2': { id: 'collection-2', order: 2 },
              'collection-3': { id: 'collection-3', order: 3 },
            },
          },
        };

        const result = selectAllPresetCollections(state);
        expect(result[0].id).toBe('collection-3');
        expect(result[1].id).toBe('collection-1');
        expect(result[2].id).toBe('collection-2');
      });
    });
  });

  describe('Filtered Collection Selectors', () => {
    describe('selectDefaultPresetCollection', () => {
      it('should return collections with defined type', () => {
        const state = {
          presetCollectionEntity: {
            ids: ['collection-1', 'collection-2', 'collection-3'],
            entities: {
              'collection-1': { id: 'collection-1', name: 'Colors', type: COLLECTION_TYPES.COLOR },
              'collection-2': { id: 'collection-2', name: 'No Type' },
              'collection-3': { id: 'collection-3', name: 'Typography', type: COLLECTION_TYPES.TYPOGRAPHY },
            },
          },
        };

        const result = selectDefaultPresetCollection(state);
        expect(result.length).toBeGreaterThan(0);
        expect(result.every(c => c.type !== undefined)).toBe(true);
      });

      it('should return empty array when no collections', () => {
        const state = {
          presetCollectionEntity: {
            ids: [],
            entities: {},
          },
        };

        const result = selectDefaultPresetCollection(state);
        expect(result).toEqual([]);
      });

      it('should return empty array when collections have no type', () => {
        const state = {
          presetCollectionEntity: {
            ids: ['collection-1'],
            entities: {
              'collection-1': { id: 'collection-1', name: 'No Type' },
            },
          },
        };

        const result = selectDefaultPresetCollection(state);
        expect(result).toHaveLength(0);
      });
    });

    describe('selectTypographyPresetCollection', () => {
      it('should return typography collection', () => {
        const typographyCollection = {
          id: 'collection-typography',
          name: 'Typography',
          type: COLLECTION_TYPES.TYPOGRAPHY,
        };
        const state = {
          presetCollectionEntity: {
            ids: ['collection-1', 'collection-typography', 'collection-3'],
            entities: {
              'collection-1': { id: 'collection-1', name: 'Colors', type: COLLECTION_TYPES.COLOR },
              'collection-typography': typographyCollection,
              'collection-3': { id: 'collection-3', name: 'Spacing', type: COLLECTION_TYPES.SPACING },
            },
          },
        };

        const result = selectTypographyPresetCollection(state);
        expect(result).toEqual(typographyCollection);
      });

      it('should return undefined when no typography collection', () => {
        const state = {
          presetCollectionEntity: {
            ids: ['collection-1'],
            entities: {
              'collection-1': { id: 'collection-1', name: 'Colors', type: COLLECTION_TYPES.COLOR },
            },
          },
        };

        const result = selectTypographyPresetCollection(state);
        expect(result).toBeUndefined();
      });

      it('should return undefined when no collections', () => {
        const state = {
          presetCollectionEntity: {
            ids: [],
            entities: {},
          },
        };

        const result = selectTypographyPresetCollection(state);
        expect(result).toBeUndefined();
      });
    });
  });

  describe('Collection Lookup Selectors', () => {
    describe('selectPresetCollectionById', () => {
      it('should return collection by ID', () => {
        const collection = { id: 'collection-1', name: 'Colors', type: COLLECTION_TYPES.COLOR };
        const state = {
          presetCollectionEntity: {
            ids: ['collection-1', 'collection-2'],
            entities: {
              'collection-1': collection,
              'collection-2': { id: 'collection-2', name: 'Typography' },
            },
          },
        };

        expect(selectPresetCollectionById(state, 'collection-1')).toEqual(collection);
      });

      it('should return null for non-existent ID', () => {
        const state = {
          presetCollectionEntity: {
            ids: ['collection-1'],
            entities: {
              'collection-1': { id: 'collection-1', name: 'Colors' },
            },
          },
        };

        expect(selectPresetCollectionById(state, 'non-existent')).toBeNull();
      });

      it('should return null when no collections', () => {
        const state = {
          presetCollectionEntity: {
            ids: [],
            entities: {},
          },
        };

        expect(selectPresetCollectionById(state, 'collection-1')).toBeNull();
      });
    });

    describe('selectSelectedPresetCollection', () => {
      it('should return selected collection', () => {
        const collection = { id: 'collection-selected', name: 'Selected Collection' };
        const state = {
          presetCollectionEntity: {
            ui: {
              selectedPresetCollectionId: 'collection-selected',
            },
            entities: {
              'collection-selected': collection,
            },
          },
        };

        expect(selectSelectedPresetCollection(state)).toEqual(collection);
      });

      it('should return null when no collection selected', () => {
        const state = {
          presetCollectionEntity: {
            ui: {
              selectedPresetCollectionId: null,
            },
            entities: {},
          },
        };

        expect(selectSelectedPresetCollection(state)).toBeNull();
      });

      it('should return null when entities is null', () => {
        const state = {
          presetCollectionEntity: {
            ui: {
              selectedPresetCollectionId: 'collection-1',
            },
            entities: null,
          },
        };

        expect(selectSelectedPresetCollection(state)).toBeNull();
      });

      it('should return null when selected collection does not exist', () => {
        const state = {
          presetCollectionEntity: {
            ui: {
              selectedPresetCollectionId: 'non-existent',
            },
            entities: {},
          },
        };

        expect(selectSelectedPresetCollection(state)).toBeNull();
      });
    });
  });

  describe('Edge Cases', () => {
    describe('Multiple collections of same type', () => {
      it('should handle multiple COLOR collections', () => {
        const state = {
          presetCollectionEntity: {
            ids: ['collection-1', 'collection-2', 'collection-3'],
            entities: {
              'collection-1': { id: 'collection-1', name: 'Primary Colors', type: COLLECTION_TYPES.COLOR },
              'collection-2': { id: 'collection-2', name: 'Secondary Colors', type: COLLECTION_TYPES.COLOR },
              'collection-3': { id: 'collection-3', name: 'Typography', type: COLLECTION_TYPES.TYPOGRAPHY },
            },
          },
        };

        const allCollections = selectAllPresetCollections(state);
        const colorCollections = allCollections.filter(c => c.type === COLLECTION_TYPES.COLOR);
        expect(colorCollections).toHaveLength(2);
      });
    });

    describe('Collections with complex metadata', () => {
      it('should handle collections with nested properties', () => {
        const collection = {
          id: 'collection-1',
          name: 'Complex Collection',
          type: COLLECTION_TYPES.TYPOGRAPHY,
          metadata: {
            created: '2024-01-01',
            tags: ['fonts', 'sizes'],
          },
          settings: {
            autoUpdate: true,
            source: 'figma',
          },
        };
        const state = {
          presetCollectionEntity: {
            ids: ['collection-1'],
            entities: {
              'collection-1': collection,
            },
          },
        };

        const result = selectPresetCollectionById(state, 'collection-1');
        expect(result.metadata.tags).toHaveLength(2);
        expect(result.settings.autoUpdate).toBe(true);
      });
    });

    describe('selectTypographyPresetCollection with multiple typography', () => {
      it('should return first typography collection when multiple exist', () => {
        const firstTypography = {
          id: 'collection-1',
          name: 'First Typography',
          type: COLLECTION_TYPES.TYPOGRAPHY,
        };
        const state = {
          presetCollectionEntity: {
            ids: ['collection-1', 'collection-2'],
            entities: {
              'collection-1': firstTypography,
              'collection-2': {
                id: 'collection-2',
                name: 'Second Typography',
                type: COLLECTION_TYPES.TYPOGRAPHY,
              },
            },
          },
        };

        const result = selectTypographyPresetCollection(state);
        expect(result).toEqual(firstTypography);
      });
    });
  });
});

