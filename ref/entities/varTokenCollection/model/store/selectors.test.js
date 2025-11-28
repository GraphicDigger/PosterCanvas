// ===================================================================
// Unit Tests for VarTokenCollection Entity Redux Selectors
// Coverage Target: 95%+
// Week 4 - Day 3 (Selector Testing)
// ===================================================================

import { describe, it, expect, vi } from 'vitest';
import {
  selectHoveredTokenCollectionId,
  selectFocusedTokenCollectionId,
  selectSelectedTokenCollectionId,
  selectTokenCollectionCheckStates,
  selectSelectedTokenCollection,
  selectAllTokenCollections,
  selectTokenCollectionById,
  selectCollectionTokensAndModes,
} from './selectors';

// Mock cross-entity selectors
vi.mock('../../@x/tokenValues', () => ({
  selectAllTokenValues: vi.fn(() => [
    { id: 'tv-1', tokenId: 'token-1', variableModeId: 'mode-1', value: '#FF0000' },
    { id: 'tv-2', tokenId: 'token-1', variableModeId: 'mode-2', value: '#00FF00' },
    { id: 'tv-3', tokenId: 'token-2', variableModeId: 'mode-1', value: '16px' },
  ]),
}));

vi.mock('../../@x/token', () => ({
  selectTokensByCollectionId: vi.fn((state, collectionId) => [
    { id: 'token-1', name: 'Primary Color', collectionId },
    { id: 'token-2', name: 'Font Size', collectionId },
  ]),
}));

vi.mock('../../@x/variableMode', () => ({
  selectAllVariableModes: vi.fn(() => [
    { id: 'mode-1', name: 'Light Mode' },
    { id: 'mode-2', name: 'Dark Mode' },
  ]),
}));

describe('VarTokenCollection Entity Selectors', () => {
  describe('UI State Selectors', () => {
    describe('selectHoveredTokenCollectionId', () => {
      it('should return hovered collection ID', () => {
        const state = {
          tokenCollectionEntity: {
            ui: {
              hoveredTokenCollectionId: 'collection-hovered',
            },
          },
        };

        expect(selectHoveredTokenCollectionId(state)).toBe('collection-hovered');
      });

      it('should return null when no hovered collection', () => {
        const state = {
          tokenCollectionEntity: {
            ui: {
              hoveredTokenCollectionId: null,
            },
          },
        };

        expect(selectHoveredTokenCollectionId(state)).toBeNull();
      });
    });

    describe('selectFocusedTokenCollectionId', () => {
      it('should return focused collection ID', () => {
        const state = {
          tokenCollectionEntity: {
            ui: {
              focusedTokenCollectionId: 'collection-focused',
            },
          },
        };

        expect(selectFocusedTokenCollectionId(state)).toBe('collection-focused');
      });

      it('should return null when no focused collection', () => {
        const state = {
          tokenCollectionEntity: {
            ui: {
              focusedTokenCollectionId: null,
            },
          },
        };

        expect(selectFocusedTokenCollectionId(state)).toBeNull();
      });
    });

    describe('selectSelectedTokenCollectionId', () => {
      it('should return selected collection ID', () => {
        const state = {
          tokenCollectionEntity: {
            ui: {
              selectedTokenCollectionId: 'collection-selected',
            },
          },
        };

        expect(selectSelectedTokenCollectionId(state)).toBe('collection-selected');
      });

      it('should return null when no selected collection', () => {
        const state = {
          tokenCollectionEntity: {
            ui: {
              selectedTokenCollectionId: null,
            },
          },
        };

        expect(selectSelectedTokenCollectionId(state)).toBeNull();
      });
    });
  });

  describe('Check States Selector', () => {
    describe('selectTokenCollectionCheckStates', () => {
      it('should return all check states as true for same collection', () => {
        const state = {
          tokenCollectionEntity: {
            ui: {
              hoveredTokenCollectionId: 'collection-1',
              focusedTokenCollectionId: 'collection-1',
              selectedTokenCollectionId: 'collection-1',
            },
          },
        };

        const result = selectTokenCollectionCheckStates(state, 'collection-1');
        expect(result).toEqual({
          isSelected: true,
          isFocused: true,
          isHovered: true,
        });
      });

      it('should return all check states as false for different collection', () => {
        const state = {
          tokenCollectionEntity: {
            ui: {
              hoveredTokenCollectionId: 'collection-1',
              focusedTokenCollectionId: 'collection-2',
              selectedTokenCollectionId: 'collection-3',
            },
          },
        };

        const result = selectTokenCollectionCheckStates(state, 'collection-4');
        expect(result).toEqual({
          isSelected: false,
          isFocused: false,
          isHovered: false,
        });
      });

      it('should return mixed check states', () => {
        const state = {
          tokenCollectionEntity: {
            ui: {
              hoveredTokenCollectionId: 'collection-1',
              focusedTokenCollectionId: 'collection-1',
              selectedTokenCollectionId: 'collection-2',
            },
          },
        };

        const result = selectTokenCollectionCheckStates(state, 'collection-1');
        expect(result).toEqual({
          isSelected: false,
          isFocused: true,
          isHovered: true,
        });
      });
    });
  });

  describe('Collection Lookup Selectors', () => {
    describe('selectTokenCollectionById', () => {
      it('should return collection by ID', () => {
        const collection = { id: 'collection-1', name: 'Colors', variableModeIds: ['mode-1'] };
        const state = {
          tokenCollectionEntity: {
            entities: {
              'collection-1': collection,
            },
          },
        };

        expect(selectTokenCollectionById(state, 'collection-1')).toEqual(collection);
      });

      it('should return null for non-existent ID', () => {
        const state = {
          tokenCollectionEntity: {
            entities: {},
          },
        };

        expect(selectTokenCollectionById(state, 'non-existent')).toBeNull();
      });
    });

    describe('selectSelectedTokenCollection', () => {
      it('should return selected collection', () => {
        const collection = { id: 'collection-selected', name: 'Selected Collection' };
        const state = {
          tokenCollectionEntity: {
            ui: {
              selectedTokenCollectionId: 'collection-selected',
            },
            entities: {
              'collection-selected': collection,
            },
          },
        };

        expect(selectSelectedTokenCollection(state)).toEqual(collection);
      });

      it('should return null when no collection selected', () => {
        const state = {
          tokenCollectionEntity: {
            ui: {
              selectedTokenCollectionId: null,
            },
            entities: {},
          },
        };

        expect(selectSelectedTokenCollection(state)).toBeNull();
      });

      it('should return null when entities is null', () => {
        const state = {
          tokenCollectionEntity: {
            ui: {
              selectedTokenCollectionId: 'collection-1',
            },
            entities: null,
          },
        };

        expect(selectSelectedTokenCollection(state)).toBeNull();
      });

      it('should return null when selected collection does not exist', () => {
        const state = {
          tokenCollectionEntity: {
            ui: {
              selectedTokenCollectionId: 'non-existent',
            },
            entities: {},
          },
        };

        expect(selectSelectedTokenCollection(state)).toBeNull();
      });
    });
  });

  describe('Collection List Selectors', () => {
    describe('selectAllTokenCollections', () => {
      it('should return all collections as array', () => {
        const entities = {
          'collection-1': { id: 'collection-1', name: 'Colors' },
          'collection-2': { id: 'collection-2', name: 'Typography' },
          'collection-3': { id: 'collection-3', name: 'Spacing' },
        };
        const state = {
          tokenCollectionEntity: {
            ids: ['collection-1', 'collection-2', 'collection-3'],
            entities,
          },
        };

        const result = selectAllTokenCollections(state);
        expect(result).toHaveLength(3);
        expect(result[0]).toEqual(entities['collection-1']);
        expect(result[1]).toEqual(entities['collection-2']);
        expect(result[2]).toEqual(entities['collection-3']);
      });

      it('should return empty array when no collections', () => {
        const state = {
          tokenCollectionEntity: {
            ids: [],
            entities: {},
          },
        };

        expect(selectAllTokenCollections(state)).toEqual([]);
      });

      it('should return empty array when ids is null', () => {
        const state = {
          tokenCollectionEntity: {
            ids: null,
            entities: {},
          },
        };

        expect(selectAllTokenCollections(state)).toEqual([]);
      });

      it('should return empty array when entities is null', () => {
        const state = {
          tokenCollectionEntity: {
            ids: ['collection-1'],
            entities: null,
          },
        };

        expect(selectAllTokenCollections(state)).toEqual([]);
      });

      it('should filter out undefined collections', () => {
        const state = {
          tokenCollectionEntity: {
            ids: ['collection-1', 'non-existent', 'collection-2'],
            entities: {
              'collection-1': { id: 'collection-1', name: 'Colors' },
              'collection-2': { id: 'collection-2', name: 'Typography' },
            },
          },
        };

        const result = selectAllTokenCollections(state);
        expect(result).toHaveLength(2);
        expect(result[0].id).toBe('collection-1');
        expect(result[1].id).toBe('collection-2');
      });

      it('should maintain order based on ids array', () => {
        const state = {
          tokenCollectionEntity: {
            ids: ['collection-3', 'collection-1', 'collection-2'],
            entities: {
              'collection-1': { id: 'collection-1', order: 1 },
              'collection-2': { id: 'collection-2', order: 2 },
              'collection-3': { id: 'collection-3', order: 3 },
            },
          },
        };

        const result = selectAllTokenCollections(state);
        expect(result[0].id).toBe('collection-3');
        expect(result[1].id).toBe('collection-1');
        expect(result[2].id).toBe('collection-2');
      });
    });
  });

  describe('Complex Selectors', () => {
    describe('selectCollectionTokensAndModes', () => {
      it('should return collection tokens with mode values', () => {
        const state = {
          tokenCollectionEntity: {
            entities: {
              'collection-1': {
                id: 'collection-1',
                name: 'Colors',
                variableModeIds: ['mode-1', 'mode-2'],
              },
            },
          },
          variableModeEntity: {
            entities: {
              'mode-1': { id: 'mode-1', name: 'Light Mode' },
              'mode-2': { id: 'mode-2', name: 'Dark Mode' },
            },
            ids: ['mode-1', 'mode-2'],
          },
          tokenValueEntity: {
            entities: {},
          },
          variableModeGroupEntity: {
            entities: {},
          },
        };

        const result = selectCollectionTokensAndModes(state, 'collection-1');

        expect(result).toHaveProperty('tokens');
        expect(result).toHaveProperty('modes');
        expect(result.tokens).toHaveLength(2);
        expect(result.modes).toHaveLength(2);
      });

      it('should return tokens with modeValues mapping', () => {
        const state = {
          tokenCollectionEntity: {
            entities: {
              'collection-1': {
                id: 'collection-1',
                name: 'Colors',
                variableModeIds: ['mode-1', 'mode-2'],
              },
            },
          },
          variableModeEntity: {
            entities: {
              'mode-1': { id: 'mode-1', name: 'Light Mode' },
              'mode-2': { id: 'mode-2', name: 'Dark Mode' },
            },
            ids: ['mode-1', 'mode-2'],
          },
          tokenValueEntity: {
            entities: {},
          },
          variableModeGroupEntity: {
            entities: {},
          },
        };

        const result = selectCollectionTokensAndModes(state, 'collection-1');

        expect(result.tokens).toHaveLength(2);
        expect(result.modes).toHaveLength(2);
      });

      it('should return empty tokens and modes when collectionId is null', () => {
        const state = {
          tokenCollectionEntity: {
            entities: {},
          },
        };

        const result = selectCollectionTokensAndModes(state, null);

        expect(result).toEqual({ tokens: [], modes: [] });
      });

      it('should handle collection with empty variableModeIds', () => {
        const state = {
          tokenCollectionEntity: {
            entities: {
              'collection-1': {
                id: 'collection-1',
                name: 'Empty Modes',
                variableModeIds: [],
              },
            },
          },
        };

        const result = selectCollectionTokensAndModes(state, 'collection-1');

        expect(result.modes).toHaveLength(0);
        expect(result.tokens).toBeDefined();
      });

      it('should filter out null tokens', () => {
        const state = {
          tokenCollectionEntity: {
            entities: {
              'collection-1': {
                id: 'collection-1',
                name: 'Colors',
                variableModeIds: ['mode-1'],
              },
            },
          },
        };

        const result = selectCollectionTokensAndModes(state, 'collection-1');

        expect(result.tokens.every(t => t !== null)).toBe(true);
      });

      it('should handle missing token values in modes', () => {
        const state = {
          tokenCollectionEntity: {
            entities: {
              'collection-1': {
                id: 'collection-1',
                name: 'Colors',
                variableModeIds: ['mode-1', 'mode-3'],
              },
            },
          },
        };

        const result = selectCollectionTokensAndModes(state, 'collection-1');

        // mode-3 doesn't have values in the mock
        expect(result.tokens[0].modeValues['mode-3']).toBeUndefined();
      });
    });
  });

  describe('Edge Cases', () => {
    describe('Empty collections', () => {
      it('should handle collection with no variableModeIds', () => {
        const state = {
          tokenCollectionEntity: {
            entities: {
              'collection-1': {
                id: 'collection-1',
                name: 'Empty Collection',
                variableModeIds: [],
              },
            },
          },
        };

        const result = selectCollectionTokensAndModes(state, 'collection-1');

        expect(result.modes).toHaveLength(0);
      });
    });

    describe('Complex nested data', () => {
      it('should handle collection with metadata', () => {
        const collection = {
          id: 'collection-1',
          name: 'Complex Collection',
          variableModeIds: ['mode-1', 'mode-2'],
          metadata: {
            created: '2024-01-01',
            tags: ['colors', 'theme'],
          },
        };
        const state = {
          tokenCollectionEntity: {
            entities: {
              'collection-1': collection,
            },
          },
        };

        const result = selectTokenCollectionById(state, 'collection-1');
        expect(result.metadata.tags).toHaveLength(2);
      });
    });
  });
});
