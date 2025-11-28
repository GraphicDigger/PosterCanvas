// ===================================================================
// Unit Tests for varTokenCollection (tokenCollectionEntity) Redux Slice
// Coverage Target: 100%
// Phase 2 - Push to 50% Coverage (34 lines, TypeScript)
// Risk: LOW (Redux Toolkit, predictable state management)
// ===================================================================

import { describe, it, expect, beforeEach } from 'vitest';
import reducer, {
  setTokenCollections,
  setHoveredTokenCollectionId,
  setFocusedTokenCollectionId,
  setSelectedTokenCollectionId,
  addTokenCollection,
  removeTokenCollection,
  updateTokenCollection,
} from '../slice';
import { ENTITY_KINDS } from '@/shared/constants';

// ===================================================================
// TYPE DEFINITIONS
// ===================================================================

interface TokenCollection {
  id: string;
  kind: string;
  name: string;
  variableModeIds: string[];
}

interface TokenCollectionUIState {
  hoveredTokenCollectionId: string | null;
  focusedTokenCollectionId: string | null;
  selectedTokenCollectionId: string | null;
}

interface TokenCollectionState {
  ids: string[];
  entities: Record<string, TokenCollection>;
  ui: TokenCollectionUIState;
}

// ===================================================================
// TESTS
// ===================================================================

describe('varTokenCollection (tokenCollectionEntity) Redux Slice (TypeScript)', () => {
  let initialState: TokenCollectionState;

  beforeEach(() => {
    initialState = {
      ids: [],
      entities: {},
      ui: {
        hoveredTokenCollectionId: null,
        focusedTokenCollectionId: null,
        selectedTokenCollectionId: null,
      },
    };
  });

  describe('Initial State', () => {
    it('should return initial state', () => {
      const state = reducer(undefined, { type: '@@INIT' });

      expect(state.ids).toEqual([]);
      expect(state.entities).toEqual({});
      expect(state.ui.hoveredTokenCollectionId).toBeNull();
      expect(state.ui.focusedTokenCollectionId).toBeNull();
      expect(state.ui.selectedTokenCollectionId).toBeNull();
    });

    it('should have correct state structure', () => {
      const state = reducer(undefined, { type: '@@INIT' });

      expect(state).toHaveProperty('ids');
      expect(state).toHaveProperty('entities');
      expect(state).toHaveProperty('ui');
    });
  });

  describe('UI State Actions', () => {
    describe('setHoveredTokenCollectionId', () => {
      it('should set hovered collection ID', () => {
        const state = reducer(initialState, setHoveredTokenCollectionId('coll-1'));

        expect(state.ui.hoveredTokenCollectionId).toBe('coll-1');
      });

      it('should clear hovered collection ID', () => {
        const stateWithHovered: TokenCollectionState = {
          ...initialState,
          ui: { ...initialState.ui, hoveredTokenCollectionId: 'coll-1' },
        };

        const state = reducer(stateWithHovered, setHoveredTokenCollectionId(null));

        expect(state.ui.hoveredTokenCollectionId).toBeNull();
      });
    });

    describe('setFocusedTokenCollectionId', () => {
      it('should set focused collection ID', () => {
        const state = reducer(initialState, setFocusedTokenCollectionId('coll-1'));

        expect(state.ui.focusedTokenCollectionId).toBe('coll-1');
      });

      it('should clear focused collection ID', () => {
        const stateWithFocused: TokenCollectionState = {
          ...initialState,
          ui: { ...initialState.ui, focusedTokenCollectionId: 'coll-1' },
        };

        const state = reducer(stateWithFocused, setFocusedTokenCollectionId(null));

        expect(state.ui.focusedTokenCollectionId).toBeNull();
      });
    });

    describe('setSelectedTokenCollectionId', () => {
      it('should set selected collection ID', () => {
        const state = reducer(initialState, setSelectedTokenCollectionId('coll-1'));

        expect(state.ui.selectedTokenCollectionId).toBe('coll-1');
      });

      it('should clear selected collection ID', () => {
        const stateWithSelected: TokenCollectionState = {
          ...initialState,
          ui: { ...initialState.ui, selectedTokenCollectionId: 'coll-1' },
        };

        const state = reducer(stateWithSelected, setSelectedTokenCollectionId(null));

        expect(state.ui.selectedTokenCollectionId).toBeNull();
      });
    });
  });

  describe('Query Actions', () => {
    describe('setTokenCollections', () => {
      it('should set token collections from array', () => {
        const collections: TokenCollection[] = [
          { id: 'coll-1', kind: ENTITY_KINDS.TOKEN_COLLECTION, name: 'Colors', variableModeIds: [] },
          { id: 'coll-2', kind: ENTITY_KINDS.TOKEN_COLLECTION, name: 'Spacing', variableModeIds: [] },
        ];

        const state = reducer(initialState, setTokenCollections(collections));

        expect(state.ids).toEqual(['coll-1', 'coll-2']);
        expect(state.entities['coll-1']).toEqual(collections[0]);
        expect(state.entities['coll-2']).toEqual(collections[1]);
      });

      it('should replace existing collections', () => {
        const stateWithCollections: TokenCollectionState = {
          ...initialState,
          ids: ['old-coll'],
          entities: {
            'old-coll': { id: 'old-coll', kind: ENTITY_KINDS.TOKEN_COLLECTION, name: 'Old', variableModeIds: [] },
          },
        };

        const newCollections: TokenCollection[] = [
          { id: 'coll-1', kind: ENTITY_KINDS.TOKEN_COLLECTION, name: 'New', variableModeIds: [] },
        ];

        const state = reducer(stateWithCollections, setTokenCollections(newCollections));

        expect(state.ids).toEqual(['coll-1']);
        expect(state.entities['old-coll']).toBeUndefined();
        expect(state.entities['coll-1']).toEqual(newCollections[0]);
      });

      it('should handle empty array', () => {
        const stateWithCollections: TokenCollectionState = {
          ...initialState,
          ids: ['coll-1'],
          entities: {
            'coll-1': { id: 'coll-1', kind: ENTITY_KINDS.TOKEN_COLLECTION, name: 'Collection', variableModeIds: [] },
          },
        };

        const state = reducer(stateWithCollections, setTokenCollections([]));

        expect(state.ids).toEqual([]);
        expect(state.entities).toEqual({});
      });
    });
  });

  describe('Mutation Actions', () => {
    describe('addTokenCollection', () => {
      it('should add new token collection with provided ID', () => {
        const collection = {
          id: 'coll-1',
          name: 'Colors',
          variableModeIds: ['mode-1'],
        };

        const state = reducer(initialState, addTokenCollection(collection));

        expect(state.ids).toContain('coll-1');
        expect(state.entities['coll-1'].id).toBe('coll-1');
        expect(state.entities['coll-1'].name).toBe('Colors');
        expect(state.entities['coll-1'].kind).toBe(ENTITY_KINDS.TOKEN_COLLECTION);
        expect(state.entities['coll-1'].variableModeIds).toEqual(['mode-1']);
      });

      it('should generate ID if not provided', () => {
        const collection = {
          name: 'Spacing',
        };

        const state = reducer(initialState, addTokenCollection(collection));

        expect(state.ids).toHaveLength(1);
        const collId = state.ids[0];
        expect(collId).toContain('token-collection-');
        expect(state.entities[collId].name).toBe('Spacing');
      });

      it('should use default name if not provided', () => {
        const collection = {
          id: 'coll-1',
        };

        const state = reducer(initialState, addTokenCollection(collection));

        expect(state.entities['coll-1'].name).toBe('New Collection');
      });

      it('should initialize empty variableModeIds if not provided', () => {
        const collection = {
          id: 'coll-1',
          name: 'Collection',
        };

        const state = reducer(initialState, addTokenCollection(collection));

        expect(state.entities['coll-1'].variableModeIds).toEqual([]);
      });

      it('should not duplicate ID in ids array', () => {
        const stateWithCollection: TokenCollectionState = {
          ...initialState,
          ids: ['coll-1'],
          entities: {
            'coll-1': { id: 'coll-1', kind: ENTITY_KINDS.TOKEN_COLLECTION, name: 'Old', variableModeIds: [] },
          },
        };

        const collection = {
          id: 'coll-1',
          name: 'Updated',
        };

        const state = reducer(stateWithCollection, addTokenCollection(collection));

        expect(state.ids).toEqual(['coll-1']);
        expect(state.entities['coll-1'].name).toBe('Updated');
      });

      it('should preserve additional properties', () => {
        const collection = {
          id: 'coll-1',
          name: 'Colors',
          variableModeIds: ['mode-1'],
          description: 'Color tokens',
          customProp: 'value',
        };

        const state = reducer(initialState, addTokenCollection(collection as any));

        expect(state.entities['coll-1']).toHaveProperty('description');
        expect(state.entities['coll-1']).toHaveProperty('customProp');
      });
    });

    describe('removeTokenCollection', () => {
      it('should remove token collection', () => {
        const stateWithCollections: TokenCollectionState = {
          ...initialState,
          ids: ['coll-1', 'coll-2'],
          entities: {
            'coll-1': { id: 'coll-1', kind: ENTITY_KINDS.TOKEN_COLLECTION, name: 'Colors', variableModeIds: [] },
            'coll-2': { id: 'coll-2', kind: ENTITY_KINDS.TOKEN_COLLECTION, name: 'Spacing', variableModeIds: [] },
          },
        };

        const state = reducer(stateWithCollections, removeTokenCollection('coll-1'));

        expect(state.ids).toEqual(['coll-2']);
        expect(state.entities['coll-1']).toBeUndefined();
        expect(state.entities['coll-2']).toBeDefined();
      });

      it('should handle removing non-existent collection', () => {
        const stateWithCollection: TokenCollectionState = {
          ...initialState,
          ids: ['coll-1'],
          entities: {
            'coll-1': { id: 'coll-1', kind: ENTITY_KINDS.TOKEN_COLLECTION, name: 'Colors', variableModeIds: [] },
          },
        };

        const state = reducer(stateWithCollection, removeTokenCollection('non-existent'));

        expect(state.ids).toEqual(['coll-1']);
        expect(state.entities['coll-1']).toBeDefined();
      });

      it('should remove last collection', () => {
        const stateWithCollection: TokenCollectionState = {
          ...initialState,
          ids: ['coll-1'],
          entities: {
            'coll-1': { id: 'coll-1', kind: ENTITY_KINDS.TOKEN_COLLECTION, name: 'Colors', variableModeIds: [] },
          },
        };

        const state = reducer(stateWithCollection, removeTokenCollection('coll-1'));

        expect(state.ids).toEqual([]);
        expect(state.entities).toEqual({});
      });
    });

    describe('updateTokenCollection', () => {
      it('should update collection name', () => {
        const stateWithCollection: TokenCollectionState = {
          ...initialState,
          ids: ['coll-1'],
          entities: {
            'coll-1': { id: 'coll-1', kind: ENTITY_KINDS.TOKEN_COLLECTION, name: 'Old Name', variableModeIds: [] },
          },
        };

        const state = reducer(stateWithCollection, updateTokenCollection({
          id: 'coll-1',
          updates: { name: 'New Name' },
        }));

        expect(state.entities['coll-1'].name).toBe('New Name');
      });

      it('should handle non-existent collection', () => {
        const state = reducer(initialState, updateTokenCollection({
          id: 'non-existent',
          updates: { name: 'New Name' },
        }));

        expect(state.entities['non-existent']).toBeUndefined();
      });

      it('should update variableModeIds and remove duplicates', () => {
        const stateWithCollection: TokenCollectionState = {
          ...initialState,
          ids: ['coll-1'],
          entities: {
            'coll-1': { id: 'coll-1', kind: ENTITY_KINDS.TOKEN_COLLECTION, name: 'Colors', variableModeIds: ['mode-1'] },
          },
        };

        const state = reducer(stateWithCollection, updateTokenCollection({
          id: 'coll-1',
          updates: { variableModeIds: ['mode-2', 'mode-3', 'mode-2'] },
        }));

        expect(state.entities['coll-1'].variableModeIds).toEqual(['mode-2', 'mode-3']);
      });

      it('should clear variableModeIds when empty array provided', () => {
        const stateWithCollection: TokenCollectionState = {
          ...initialState,
          ids: ['coll-1'],
          entities: {
            'coll-1': { id: 'coll-1', kind: ENTITY_KINDS.TOKEN_COLLECTION, name: 'Colors', variableModeIds: ['mode-1', 'mode-2'] },
          },
        };

        const state = reducer(stateWithCollection, updateTokenCollection({
          id: 'coll-1',
          updates: { variableModeIds: [] },
        }));

        expect(state.entities['coll-1'].variableModeIds).toEqual([]);
      });

      it('should update multiple properties', () => {
        const stateWithCollection: TokenCollectionState = {
          ...initialState,
          ids: ['coll-1'],
          entities: {
            'coll-1': { id: 'coll-1', kind: ENTITY_KINDS.TOKEN_COLLECTION, name: 'Old', variableModeIds: [] },
          },
        };

        const state = reducer(stateWithCollection, updateTokenCollection({
          id: 'coll-1',
          updates: {
            name: 'New Name',
            variableModeIds: ['mode-1', 'mode-2'],
          },
        }));

        expect(state.entities['coll-1'].name).toBe('New Name');
        expect(state.entities['coll-1'].variableModeIds).toEqual(['mode-1', 'mode-2']);
      });

      it('should preserve other properties when updating', () => {
        const stateWithCollection: TokenCollectionState = {
          ...initialState,
          ids: ['coll-1'],
          entities: {
            'coll-1': { id: 'coll-1', kind: ENTITY_KINDS.TOKEN_COLLECTION, name: 'Colors', variableModeIds: ['mode-1'] },
          },
        };

        const state = reducer(stateWithCollection, updateTokenCollection({
          id: 'coll-1',
          updates: { name: 'New Colors' },
        }));

        expect(state.entities['coll-1'].kind).toBe(ENTITY_KINDS.TOKEN_COLLECTION);
        expect(state.entities['coll-1'].variableModeIds).toEqual(['mode-1']);
      });
    });
  });

  describe('Complex Scenarios', () => {
    it('should handle full collection lifecycle', () => {
      let state = initialState;

      // Add collection
      state = reducer(state, addTokenCollection({
        id: 'coll-1',
        name: 'Colors',
        variableModeIds: ['mode-1'],
      }));
      expect(state.ids).toContain('coll-1');

      // Select collection
      state = reducer(state, setSelectedTokenCollectionId('coll-1'));
      expect(state.ui.selectedTokenCollectionId).toBe('coll-1');

      // Update collection
      state = reducer(state, updateTokenCollection({
        id: 'coll-1',
        updates: { name: 'Updated Colors', variableModeIds: ['mode-1', 'mode-2'] },
      }));
      expect(state.entities['coll-1'].name).toBe('Updated Colors');
      expect(state.entities['coll-1'].variableModeIds).toEqual(['mode-1', 'mode-2']);

      // Remove collection
      state = reducer(state, removeTokenCollection('coll-1'));
      expect(state.ids).not.toContain('coll-1');
    });

    it('should handle multiple collections', () => {
      let state = initialState;

      state = reducer(state, addTokenCollection({ id: 'coll-1', name: 'Colors' }));
      state = reducer(state, addTokenCollection({ id: 'coll-2', name: 'Spacing' }));
      state = reducer(state, addTokenCollection({ id: 'coll-3', name: 'Typography' }));

      expect(state.ids).toHaveLength(3);
      expect(Object.keys(state.entities)).toHaveLength(3);

      state = reducer(state, removeTokenCollection('coll-2'));
      expect(state.ids).toEqual(['coll-1', 'coll-3']);
    });

    it('should handle variableModeIds deduplication', () => {
      let state = initialState;

      state = reducer(state, addTokenCollection({
        id: 'coll-1',
        name: 'Colors',
        variableModeIds: ['mode-1', 'mode-2'],
      }));

      // Update with duplicates
      state = reducer(state, updateTokenCollection({
        id: 'coll-1',
        updates: { variableModeIds: ['mode-1', 'mode-2', 'mode-1', 'mode-3'] },
      }));

      expect(state.entities['coll-1'].variableModeIds).toEqual(['mode-1', 'mode-2', 'mode-3']);
    });
  });

  describe('Type Safety', () => {
    it('should enforce token collection structure', () => {
      const collection: TokenCollection = {
        id: 'coll-1',
        kind: ENTITY_KINDS.TOKEN_COLLECTION,
        name: 'Colors',
        variableModeIds: ['mode-1'],
      };

      const state = reducer(initialState, setTokenCollections([collection]));

      expect(state.entities['coll-1']).toEqual(collection);
    });

    it('should handle variableModeIds as array', () => {
      const collection = {
        id: 'coll-1',
        name: 'Colors',
        variableModeIds: ['mode-1', 'mode-2', 'mode-3'],
      };

      const state = reducer(initialState, addTokenCollection(collection));

      expect(Array.isArray(state.entities['coll-1'].variableModeIds)).toBe(true);
      expect(state.entities['coll-1'].variableModeIds).toHaveLength(3);
    });
  });
});

