// ===================================================================
// Unit Tests for uiVariant Redux Slice
// Coverage Target: 100%
// Phase 1 - Redux Slices (HIGH IMPACT)
// Risk: LOW (Redux Toolkit, state management)
// ===================================================================

import { describe, it, expect, beforeEach } from 'vitest';
import variantReducer, {
  setFocusedVariantId,
  setHoveredVariantId,
  setSelectedVariantId,
  setVariants,
  selectFirstVariantByComponent,
  addVariant,
  removeVariant,
} from '../slice';

describe('uiVariant Redux Slice', () => {
  let initialState;

  beforeEach(() => {
    initialState = {
      ids: [],
      entities: {},
      byComponent: {},
      ui: {
        hoveredVariantId: null,
        focusedVariantId: null,
        selectedVariantId: null,
      },
    };
  });

  describe('Initial State', () => {
    it('should return initial state when undefined state is passed', () => {
      const result = variantReducer(undefined, { type: '@@INIT' });

      expect(result).toEqual(initialState);
    });

    it('should have empty ids array', () => {
      const result = variantReducer(undefined, { type: '@@INIT' });

      expect(result.ids).toEqual([]);
    });

    it('should have empty entities object', () => {
      const result = variantReducer(undefined, { type: '@@INIT' });

      expect(result.entities).toEqual({});
    });

    it('should have empty byComponent object', () => {
      const result = variantReducer(undefined, { type: '@@INIT' });

      expect(result.byComponent).toEqual({});
    });

    it('should have null UI state values', () => {
      const result = variantReducer(undefined, { type: '@@INIT' });

      expect(result.ui.hoveredVariantId).toBeNull();
      expect(result.ui.focusedVariantId).toBeNull();
      expect(result.ui.selectedVariantId).toBeNull();
    });
  });

  describe('UI Actions - setFocusedVariantId', () => {
    it('should set focused variant ID', () => {
      const result = variantReducer(initialState, setFocusedVariantId('variant-1'));

      expect(result.ui.focusedVariantId).toBe('variant-1');
    });

    it('should update focused variant ID when already set', () => {
      const state = {
        ...initialState,
        ui: { ...initialState.ui, focusedVariantId: 'variant-1' },
      };

      const result = variantReducer(state, setFocusedVariantId('variant-2'));

      expect(result.ui.focusedVariantId).toBe('variant-2');
    });

    it('should allow setting focused variant ID to null', () => {
      const state = {
        ...initialState,
        ui: { ...initialState.ui, focusedVariantId: 'variant-1' },
      };

      const result = variantReducer(state, setFocusedVariantId(null));

      expect(result.ui.focusedVariantId).toBeNull();
    });
  });

  describe('UI Actions - setHoveredVariantId', () => {
    it('should set hovered variant ID', () => {
      const result = variantReducer(initialState, setHoveredVariantId('variant-1'));

      expect(result.ui.hoveredVariantId).toBe('variant-1');
    });

    it('should update hovered variant ID when already set', () => {
      const state = {
        ...initialState,
        ui: { ...initialState.ui, hoveredVariantId: 'variant-1' },
      };

      const result = variantReducer(state, setHoveredVariantId('variant-2'));

      expect(result.ui.hoveredVariantId).toBe('variant-2');
    });

    it('should allow setting hovered variant ID to null', () => {
      const state = {
        ...initialState,
        ui: { ...initialState.ui, hoveredVariantId: 'variant-1' },
      };

      const result = variantReducer(state, setHoveredVariantId(null));

      expect(result.ui.hoveredVariantId).toBeNull();
    });
  });

  describe('UI Actions - setSelectedVariantId', () => {
    it('should set selected variant ID', () => {
      const result = variantReducer(initialState, setSelectedVariantId('variant-1'));

      expect(result.ui.selectedVariantId).toBe('variant-1');
    });

    it('should update selected variant ID when already set', () => {
      const state = {
        ...initialState,
        ui: { ...initialState.ui, selectedVariantId: 'variant-1' },
      };

      const result = variantReducer(state, setSelectedVariantId('variant-2'));

      expect(result.ui.selectedVariantId).toBe('variant-2');
    });

    it('should allow setting selected variant ID to null', () => {
      const state = {
        ...initialState,
        ui: { ...initialState.ui, selectedVariantId: 'variant-1' },
      };

      const result = variantReducer(state, setSelectedVariantId(null));

      expect(result.ui.selectedVariantId).toBeNull();
    });
  });

  describe('Data Actions - setVariants', () => {
    it('should set single variant', () => {
      const variants = [
        { id: 'variant-1', componentId: 'comp-1', name: 'Default' },
      ];

      const result = variantReducer(initialState, setVariants(variants));

      expect(result.ids).toEqual(['variant-1']);
      expect(result.entities['variant-1']).toEqual(variants[0]);
      expect(result.byComponent['comp-1']).toEqual(['variant-1']);
    });

    it('should set multiple variants', () => {
      const variants = [
        { id: 'variant-1', componentId: 'comp-1', name: 'Default' },
        { id: 'variant-2', componentId: 'comp-1', name: 'Hover' },
        { id: 'variant-3', componentId: 'comp-2', name: 'Default' },
      ];

      const result = variantReducer(initialState, setVariants(variants));

      expect(result.ids).toEqual(['variant-1', 'variant-2', 'variant-3']);
      expect(Object.keys(result.entities)).toHaveLength(3);
      expect(result.byComponent['comp-1']).toEqual(['variant-1', 'variant-2']);
      expect(result.byComponent['comp-2']).toEqual(['variant-3']);
    });

    it('should replace existing variants when setVariants is called', () => {
      const state = {
        ...initialState,
        ids: ['old-1'],
        entities: { 'old-1': { id: 'old-1', componentId: 'comp-old', name: 'Old' } },
        byComponent: { 'comp-old': ['old-1'] },
      };

      const variants = [
        { id: 'variant-1', componentId: 'comp-1', name: 'Default' },
      ];

      const result = variantReducer(state, setVariants(variants));

      expect(result.ids).toEqual(['variant-1']);
      expect(result.entities['old-1']).toBeUndefined();
      expect(result.entities['variant-1']).toEqual(variants[0]);
      expect(result.byComponent['comp-old']).toBeUndefined();
    });

    it('should handle empty variants array', () => {
      const state = {
        ...initialState,
        ids: ['variant-1'],
        entities: { 'variant-1': { id: 'variant-1', componentId: 'comp-1', name: 'Default' } },
        byComponent: { 'comp-1': ['variant-1'] },
      };

      const result = variantReducer(state, setVariants([]));

      expect(result.ids).toEqual([]);
      expect(result.entities).toEqual({});
      expect(result.byComponent).toEqual({});
    });

    it('should group variants by component correctly', () => {
      const variants = [
        { id: 'variant-1', componentId: 'comp-1', name: 'Default' },
        { id: 'variant-2', componentId: 'comp-1', name: 'Hover' },
        { id: 'variant-3', componentId: 'comp-1', name: 'Active' },
        { id: 'variant-4', componentId: 'comp-2', name: 'Default' },
        { id: 'variant-5', componentId: 'comp-2', name: 'Disabled' },
      ];

      const result = variantReducer(initialState, setVariants(variants));

      expect(result.byComponent['comp-1']).toEqual(['variant-1', 'variant-2', 'variant-3']);
      expect(result.byComponent['comp-2']).toEqual(['variant-4', 'variant-5']);
    });

    it('should preserve all variant properties', () => {
      const variants = [
        {
          id: 'variant-1',
          componentId: 'comp-1',
          name: 'Default',
          props: { color: 'blue' },
          metadata: { created: '2024-01-01' },
        },
      ];

      const result = variantReducer(initialState, setVariants(variants));

      expect(result.entities['variant-1']).toEqual(variants[0]);
      expect(result.entities['variant-1'].props).toEqual({ color: 'blue' });
      expect(result.entities['variant-1'].metadata).toEqual({ created: '2024-01-01' });
    });
  });

  describe('Data Actions - selectFirstVariantByComponent', () => {
    it('should select first variant of component', () => {
      const state = {
        ...initialState,
        ids: ['variant-1', 'variant-2'],
        entities: {
          'variant-1': { id: 'variant-1', componentId: 'comp-1', name: 'Default' },
          'variant-2': { id: 'variant-2', componentId: 'comp-1', name: 'Hover' },
        },
        byComponent: {
          'comp-1': ['variant-1', 'variant-2'],
        },
      };

      const result = variantReducer(state, selectFirstVariantByComponent('comp-1'));

      expect(result.ui.selectedVariantId).toBe('variant-1');
    });

    it('should select first variant when multiple variants exist', () => {
      const state = {
        ...initialState,
        ids: ['variant-1', 'variant-2', 'variant-3'],
        entities: {
          'variant-1': { id: 'variant-1', componentId: 'comp-1', name: 'Default' },
          'variant-2': { id: 'variant-2', componentId: 'comp-1', name: 'Hover' },
          'variant-3': { id: 'variant-3', componentId: 'comp-1', name: 'Active' },
        },
        byComponent: {
          'comp-1': ['variant-1', 'variant-2', 'variant-3'],
        },
      };

      const result = variantReducer(state, selectFirstVariantByComponent('comp-1'));

      expect(result.ui.selectedVariantId).toBe('variant-1');
    });

    it('should set selectedVariantId to null if component has no variants', () => {
      const state = {
        ...initialState,
        byComponent: {},
      };

      const result = variantReducer(state, selectFirstVariantByComponent('comp-1'));

      expect(result.ui.selectedVariantId).toBeNull();
    });

    it('should set selectedVariantId to null if component is not found', () => {
      const state = {
        ...initialState,
        byComponent: {
          'comp-1': ['variant-1'],
        },
      };

      const result = variantReducer(state, selectFirstVariantByComponent('comp-2'));

      expect(result.ui.selectedVariantId).toBeNull();
    });

    it('should set selectedVariantId to null if component has empty variants array', () => {
      const state = {
        ...initialState,
        byComponent: {
          'comp-1': [],
        },
      };

      const result = variantReducer(state, selectFirstVariantByComponent('comp-1'));

      expect(result.ui.selectedVariantId).toBeNull();
    });
  });

  describe('Data Actions - addVariant', () => {
    it('should add variant to empty state', () => {
      const variant = { id: 'variant-1', componentId: 'comp-1', name: 'Default' };

      const result = variantReducer(initialState, addVariant(variant));

      expect(result.ids).toEqual(['variant-1']);
      expect(result.entities['variant-1']).toEqual(variant);
      expect(result.byComponent['comp-1']).toEqual(['variant-1']);
    });

    it('should add variant to existing variants', () => {
      const state = {
        ...initialState,
        ids: ['variant-1'],
        entities: {
          'variant-1': { id: 'variant-1', componentId: 'comp-1', name: 'Default' },
        },
        byComponent: {
          'comp-1': ['variant-1'],
        },
      };

      const variant = { id: 'variant-2', componentId: 'comp-1', name: 'Hover' };

      const result = variantReducer(state, addVariant(variant));

      expect(result.ids).toEqual(['variant-1', 'variant-2']);
      expect(result.entities['variant-2']).toEqual(variant);
      expect(result.byComponent['comp-1']).toEqual(['variant-1', 'variant-2']);
    });

    it('should add variant for new component', () => {
      const state = {
        ...initialState,
        ids: ['variant-1'],
        entities: {
          'variant-1': { id: 'variant-1', componentId: 'comp-1', name: 'Default' },
        },
        byComponent: {
          'comp-1': ['variant-1'],
        },
      };

      const variant = { id: 'variant-2', componentId: 'comp-2', name: 'Default' };

      const result = variantReducer(state, addVariant(variant));

      expect(result.ids).toEqual(['variant-1', 'variant-2']);
      expect(result.entities['variant-2']).toEqual(variant);
      expect(result.byComponent['comp-2']).toEqual(['variant-2']);
    });

    it('should preserve all variant properties when adding', () => {
      const variant = {
        id: 'variant-1',
        componentId: 'comp-1',
        name: 'Default',
        props: { color: 'blue' },
        metadata: { created: '2024-01-01' },
      };

      const result = variantReducer(initialState, addVariant(variant));

      expect(result.entities['variant-1']).toEqual(variant);
      expect(result.entities['variant-1'].props).toEqual({ color: 'blue' });
    });
  });

  describe('Data Actions - removeVariant', () => {
    it('should remove variant from state', () => {
      const state = {
        ...initialState,
        ids: ['variant-1', 'variant-2'],
        entities: {
          'variant-1': { id: 'variant-1', componentId: 'comp-1', name: 'Default' },
          'variant-2': { id: 'variant-2', componentId: 'comp-1', name: 'Hover' },
        },
        byComponent: {
          'comp-1': ['variant-1', 'variant-2'],
        },
      };

      const result = variantReducer(state, removeVariant('variant-1'));

      expect(result.ids).toEqual(['variant-2']);
      expect(result.entities['variant-1']).toBeUndefined();
      expect(result.entities['variant-2']).toBeDefined();
      expect(result.byComponent['comp-1']).toEqual(['variant-2']);
    });

    it('should remove last variant from component', () => {
      const state = {
        ...initialState,
        ids: ['variant-1'],
        entities: {
          'variant-1': { id: 'variant-1', componentId: 'comp-1', name: 'Default' },
        },
        byComponent: {
          'comp-1': ['variant-1'],
        },
      };

      const result = variantReducer(state, removeVariant('variant-1'));

      expect(result.ids).toEqual([]);
      expect(result.entities['variant-1']).toBeUndefined();
      expect(result.byComponent['comp-1']).toEqual([]);
    });

    it('should handle removing non-existent variant gracefully', () => {
      const state = {
        ...initialState,
        ids: ['variant-1'],
        entities: {
          'variant-1': { id: 'variant-1', componentId: 'comp-1', name: 'Default' },
        },
        byComponent: {
          'comp-1': ['variant-1'],
        },
      };

      const result = variantReducer(state, removeVariant('variant-2'));

      expect(result.ids).toEqual(['variant-1']);
      expect(result.entities['variant-1']).toBeDefined();
      expect(result.byComponent['comp-1']).toEqual(['variant-1']);
    });

    it('should remove variant from middle of list', () => {
      const state = {
        ...initialState,
        ids: ['variant-1', 'variant-2', 'variant-3'],
        entities: {
          'variant-1': { id: 'variant-1', componentId: 'comp-1', name: 'Default' },
          'variant-2': { id: 'variant-2', componentId: 'comp-1', name: 'Hover' },
          'variant-3': { id: 'variant-3', componentId: 'comp-1', name: 'Active' },
        },
        byComponent: {
          'comp-1': ['variant-1', 'variant-2', 'variant-3'],
        },
      };

      const result = variantReducer(state, removeVariant('variant-2'));

      expect(result.ids).toEqual(['variant-1', 'variant-3']);
      expect(result.entities['variant-2']).toBeUndefined();
      expect(result.byComponent['comp-1']).toEqual(['variant-1', 'variant-3']);
    });

    it('should handle empty state gracefully', () => {
      const result = variantReducer(initialState, removeVariant('variant-1'));

      expect(result.ids).toEqual([]);
      expect(result.entities).toEqual({});
      expect(result.byComponent).toEqual({});
    });
  });

  describe('Combined Actions', () => {
    it('should handle setVariants followed by UI updates', () => {
      let state = initialState;

      const variants = [
        { id: 'variant-1', componentId: 'comp-1', name: 'Default' },
        { id: 'variant-2', componentId: 'comp-1', name: 'Hover' },
      ];

      state = variantReducer(state, setVariants(variants));
      state = variantReducer(state, setSelectedVariantId('variant-1'));
      state = variantReducer(state, setHoveredVariantId('variant-2'));

      expect(state.ids).toEqual(['variant-1', 'variant-2']);
      expect(state.ui.selectedVariantId).toBe('variant-1');
      expect(state.ui.hoveredVariantId).toBe('variant-2');
    });

    it('should handle add, select, and remove workflow', () => {
      let state = initialState;

      const variant1 = { id: 'variant-1', componentId: 'comp-1', name: 'Default' };
      const variant2 = { id: 'variant-2', componentId: 'comp-1', name: 'Hover' };

      state = variantReducer(state, addVariant(variant1));
      state = variantReducer(state, addVariant(variant2));
      state = variantReducer(state, selectFirstVariantByComponent('comp-1'));
      state = variantReducer(state, removeVariant('variant-1'));

      expect(state.ids).toEqual(['variant-2']);
      expect(state.ui.selectedVariantId).toBe('variant-1'); // Still pointing to removed variant
      expect(state.entities['variant-1']).toBeUndefined();
    });
  });

  describe('State Immutability', () => {
    it('should not mutate original state when adding variant', () => {
      const state = {
        ...initialState,
        ids: ['variant-1'],
        entities: {
          'variant-1': { id: 'variant-1', componentId: 'comp-1', name: 'Default' },
        },
        byComponent: {
          'comp-1': ['variant-1'],
        },
      };

      const originalState = JSON.parse(JSON.stringify(state));
      const variant = { id: 'variant-2', componentId: 'comp-1', name: 'Hover' };

      variantReducer(state, addVariant(variant));

      expect(state).toEqual(originalState);
    });
  });
});

