// ===================================================================
// Unit Tests for VarTokenCollection Slice
// CRITICAL BUSINESS LOGIC - Token Collection State Management
// Phase 1, Day 7 - Part 1 (30 tests)
// ===================================================================

import { describe, it, expect, beforeEach, vi } from 'vitest';

// Mock dependencies
vi.mock('uuid', () => ({
  v4: () => 'uuid-123',
}));

vi.mock('../../../../shared/constants', () => ({
  ENTITY_KINDS: {
    TOKEN_COLLECTION: 'token-collection',
  },
}));

import tokenCollectionEntitySlice, {
  setTokenCollections,
  setHoveredTokenCollectionId,
  setFocusedTokenCollectionId,
  setSelectedTokenCollectionId,
  addTokenCollection,
  removeTokenCollection,
  updateTokenCollection,
} from './slice';

describe('VarTokenCollection Slice', () => {
  let initialState;

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

  // ===================================================================
  // PART 1: UI State Management (3 tests)
  // ===================================================================

  describe('UI State Management', () => {
    it('should set hovered token collection ID', () => {
      const state = tokenCollectionEntitySlice(
        initialState,
        setHoveredTokenCollectionId('coll-1'),
      );
      expect(state.ui.hoveredTokenCollectionId).toBe('coll-1');
    });

    it('should set focused token collection ID', () => {
      const state = tokenCollectionEntitySlice(
        initialState,
        setFocusedTokenCollectionId('coll-2'),
      );
      expect(state.ui.focusedTokenCollectionId).toBe('coll-2');
    });

    it('should set selected token collection ID', () => {
      const state = tokenCollectionEntitySlice(
        initialState,
        setSelectedTokenCollectionId('coll-3'),
      );
      expect(state.ui.selectedTokenCollectionId).toBe('coll-3');
    });
  });

  // ===================================================================
  // PART 2: Set Token Collections (Bulk Load) (7 tests)
  // ===================================================================

  describe('Set Token Collections (Bulk Load)', () => {
    it('should set token collections (replace all)', () => {
      const collections = [
        { id: 'coll-1', name: 'Colors', variableModeIds: [] },
        { id: 'coll-2', name: 'Spacing', variableModeIds: [] },
      ];

      const state = tokenCollectionEntitySlice(
        initialState,
        setTokenCollections(collections),
      );

      expect(state.ids).toEqual(['coll-1', 'coll-2']);
      expect(Object.keys(state.entities)).toHaveLength(2);
    });

    it('should clear existing collections when setting new ones', () => {
      initialState.entities['coll-old'] = { id: 'coll-old', name: 'Old' };
      initialState.ids.push('coll-old');

      const collections = [{ id: 'coll-new', name: 'New', variableModeIds: [] }];
      const state = tokenCollectionEntitySlice(
        initialState,
        setTokenCollections(collections),
      );

      expect(state.entities['coll-old']).toBeUndefined();
      expect(state.entities['coll-new']).toBeDefined();
    });

    it('should handle empty array', () => {
      initialState.entities['coll-1'] = { id: 'coll-1', name: 'Collection' };
      initialState.ids.push('coll-1');

      const state = tokenCollectionEntitySlice(initialState, setTokenCollections([]));

      expect(state.ids).toHaveLength(0);
      expect(Object.keys(state.entities)).toHaveLength(0);
    });

    it('should preserve UI state when setting collections', () => {
      initialState.ui.selectedTokenCollectionId = 'coll-selected';

      const collections = [{ id: 'coll-1', name: 'Collection', variableModeIds: [] }];
      const state = tokenCollectionEntitySlice(
        initialState,
        setTokenCollections(collections),
      );

      expect(state.ui.selectedTokenCollectionId).toBe('coll-selected');
    });

    it('should set collections with variable mode IDs', () => {
      const collections = [
        {
          id: 'coll-1',
          name: 'Theme Tokens',
          variableModeIds: ['mode-light', 'mode-dark'],
        },
      ];

      const state = tokenCollectionEntitySlice(
        initialState,
        setTokenCollections(collections),
      );

      expect(state.entities['coll-1'].variableModeIds).toEqual(['mode-light', 'mode-dark']);
    });

    it('should handle collections with null values', () => {
      const collections = [
        {
          id: 'coll-1',
          name: null,
          variableModeIds: null,
        },
      ];

      const state = tokenCollectionEntitySlice(
        initialState,
        setTokenCollections(collections),
      );

      expect(state.entities['coll-1'].name).toBeNull();
      expect(state.entities['coll-1'].variableModeIds).toBeNull();
    });

    it('should handle large number of collections', () => {
      const collections = Array.from({ length: 50 }, (_, i) => ({
        id: `coll-${i}`,
        name: `Collection ${i}`,
        variableModeIds: [],
      }));

      const state = tokenCollectionEntitySlice(
        initialState,
        setTokenCollections(collections),
      );

      expect(state.ids).toHaveLength(50);
      expect(Object.keys(state.entities)).toHaveLength(50);
    });
  });

  // ===================================================================
  // PART 3: Add Token Collection (8 tests)
  // ===================================================================

  describe('Add Token Collection', () => {
    it('should add token collection with generated ID', () => {
      const state = tokenCollectionEntitySlice(
        initialState,
        addTokenCollection({}),
      );

      expect(state.ids).toHaveLength(1);
      const id = state.ids[0];
      expect(id).toBe('token-collection-uuid-123');
      expect(state.entities[id].kind).toBe('token-collection');
    });

    it('should add token collection with provided ID', () => {
      const state = tokenCollectionEntitySlice(
        initialState,
        addTokenCollection({ id: 'custom-id' }),
      );

      expect(state.ids).toContain('custom-id');
      expect(state.entities['custom-id']).toBeDefined();
    });

    it('should add token collection with default name', () => {
      const state = tokenCollectionEntitySlice(
        initialState,
        addTokenCollection({}),
      );

      const id = state.ids[0];
      expect(state.entities[id].name).toBe('New Collection');
      expect(state.entities[id].variableModeIds).toEqual([]);
    });

    it('should add token collection with custom name', () => {
      const state = tokenCollectionEntitySlice(
        initialState,
        addTokenCollection({ name: 'Custom Colors' }),
      );

      const id = state.ids[0];
      expect(state.entities[id].name).toBe('Custom Colors');
    });

    it('should add token collection with variable mode IDs', () => {
      const state = tokenCollectionEntitySlice(
        initialState,
        addTokenCollection({ variableModeIds: ['mode-1', 'mode-2'] }),
      );

      const id = state.ids[0];
      expect(state.entities[id].variableModeIds).toEqual(['mode-1', 'mode-2']);
    });

    it('should not duplicate ID when adding existing collection', () => {
      const state1 = tokenCollectionEntitySlice(
        initialState,
        addTokenCollection({ id: 'coll-1' }),
      );

      const state2 = tokenCollectionEntitySlice(
        state1,
        addTokenCollection({ id: 'coll-1', name: 'Updated' }),
      );

      expect(state2.ids).toHaveLength(1);
      expect(state2.entities['coll-1'].name).toBe('Updated');
    });

    it('should preserve existing collections when adding new one', () => {
      initialState.entities['coll-existing'] = {
        id: 'coll-existing',
        name: 'Existing',
      };
      initialState.ids.push('coll-existing');

      const state = tokenCollectionEntitySlice(
        initialState,
        addTokenCollection({ id: 'coll-new' }),
      );

      expect(state.entities['coll-existing']).toBeDefined();
      expect(state.ids).toHaveLength(2);
    });

    it('should not affect UI state when adding collection', () => {
      initialState.ui.selectedTokenCollectionId = 'coll-selected';

      const state = tokenCollectionEntitySlice(
        initialState,
        addTokenCollection({}),
      );

      expect(state.ui.selectedTokenCollectionId).toBe('coll-selected');
    });
  });

  // ===================================================================
  // PART 4: Update Token Collection (7 tests)
  // ===================================================================

  describe('Update Token Collection', () => {
    beforeEach(() => {
      initialState.entities['coll-1'] = {
        id: 'coll-1',
        name: 'Colors',
        kind: 'token-collection',
        variableModeIds: ['mode-1'],
      };
      initialState.ids.push('coll-1');
    });

    it('should update collection properties', () => {
      const state = tokenCollectionEntitySlice(
        initialState,
        updateTokenCollection({
          id: 'coll-1',
          updates: { name: 'Updated Colors' },
        }),
      );

      expect(state.entities['coll-1'].name).toBe('Updated Colors');
    });

    it('should handle updating non-existent collection', () => {
      const state = tokenCollectionEntitySlice(
        initialState,
        updateTokenCollection({
          id: 'non-existent',
          updates: { name: 'New' },
        }),
      );

      expect(state.entities['non-existent']).toBeUndefined();
    });

    it('should update variableModeIds and remove duplicates', () => {
      const state = tokenCollectionEntitySlice(
        initialState,
        updateTokenCollection({
          id: 'coll-1',
          updates: { variableModeIds: ['mode-2', 'mode-3', 'mode-2'] },
        }),
      );

      expect(state.entities['coll-1'].variableModeIds).toEqual(['mode-2', 'mode-3']);
    });

    it('should clear variableModeIds when empty array', () => {
      const state = tokenCollectionEntitySlice(
        initialState,
        updateTokenCollection({
          id: 'coll-1',
          updates: { variableModeIds: [] },
        }),
      );

      expect(state.entities['coll-1'].variableModeIds).toEqual([]);
    });

    it('should update other properties without affecting variableModeIds', () => {
      const state = tokenCollectionEntitySlice(
        initialState,
        updateTokenCollection({
          id: 'coll-1',
          updates: { name: 'New Name' },
        }),
      );

      expect(state.entities['coll-1'].name).toBe('New Name');
      expect(state.entities['coll-1'].variableModeIds).toEqual(['mode-1']);
    });

    it('should not affect other collections when updating one', () => {
      initialState.entities['coll-2'] = {
        id: 'coll-2',
        name: 'Spacing',
        variableModeIds: [],
      };
      initialState.ids.push('coll-2');

      const state = tokenCollectionEntitySlice(
        initialState,
        updateTokenCollection({
          id: 'coll-1',
          updates: { name: 'Updated' },
        }),
      );

      expect(state.entities['coll-2']).toEqual({
        id: 'coll-2',
        name: 'Spacing',
        variableModeIds: [],
      });
    });

    it('should not affect UI state when updating collection', () => {
      initialState.ui.selectedTokenCollectionId = 'coll-1';

      const state = tokenCollectionEntitySlice(
        initialState,
        updateTokenCollection({
          id: 'coll-1',
          updates: { name: 'Updated' },
        }),
      );

      expect(state.ui.selectedTokenCollectionId).toBe('coll-1');
    });
  });

  // ===================================================================
  // PART 5: Remove Token Collection (3 tests)
  // ===================================================================

  describe('Remove Token Collection', () => {
    beforeEach(() => {
      initialState.entities = {
        'coll-1': { id: 'coll-1', name: 'Colors' },
        'coll-2': { id: 'coll-2', name: 'Spacing' },
      };
      initialState.ids = ['coll-1', 'coll-2'];
    });

    it('should remove token collection', () => {
      const state = tokenCollectionEntitySlice(
        initialState,
        removeTokenCollection('coll-1'),
      );

      expect(state.ids).not.toContain('coll-1');
      expect(state.entities['coll-1']).toBeUndefined();
      expect(state.entities['coll-2']).toBeDefined();
    });

    it('should handle removing non-existent collection', () => {
      const state = tokenCollectionEntitySlice(
        initialState,
        removeTokenCollection('non-existent'),
      );

      expect(state.ids).toHaveLength(2);
    });

    it('should not affect other collections', () => {
      const state = tokenCollectionEntitySlice(
        initialState,
        removeTokenCollection('coll-1'),
      );

      expect(state.ids).toContain('coll-2');
      expect(state.entities['coll-2']).toEqual({
        id: 'coll-2',
        name: 'Spacing',
      });
    });
  });

  // ===================================================================
  // PART 6: Integration Scenarios (2 tests)
  // ===================================================================

  describe('Integration Scenarios', () => {
    it('should handle complete lifecycle', () => {
      let state = tokenCollectionEntitySlice(
        initialState,
        addTokenCollection({ id: 'coll-1', name: 'Colors', variableModeIds: [] }),
      );
      state = tokenCollectionEntitySlice(
        state,
        updateTokenCollection({
          id: 'coll-1',
          updates: { name: 'Brand Colors', variableModeIds: ['mode-1'] },
        }),
      );
      state = tokenCollectionEntitySlice(
        state,
        setSelectedTokenCollectionId('coll-1'),
      );
      state = tokenCollectionEntitySlice(state, removeTokenCollection('coll-1'));

      expect(state.ids).not.toContain('coll-1');
      expect(state.ui.selectedTokenCollectionId).toBe('coll-1'); // Still selected
    });

    it('should maintain data integrity across operations', () => {
      const collections = [
        { id: 'coll-1', name: 'Colors', variableModeIds: [] },
        { id: 'coll-2', name: 'Spacing', variableModeIds: [] },
      ];

      let state = tokenCollectionEntitySlice(
        initialState,
        setTokenCollections(collections),
      );
      state = tokenCollectionEntitySlice(
        state,
        addTokenCollection({ id: 'coll-3', name: 'Typography' }),
      );
      state = tokenCollectionEntitySlice(
        state,
        updateTokenCollection({
          id: 'coll-1',
          updates: { variableModeIds: ['mode-light', 'mode-dark'] },
        }),
      );

      expect(state.ids).toHaveLength(3);
      expect(state.entities['coll-1'].variableModeIds).toEqual(['mode-light', 'mode-dark']);
      expect(state.entities['coll-3']).toBeDefined();
    });
  });
});
