// ===================================================================
// Unit Tests for UIVariant Slice
// CRITICAL BUSINESS LOGIC - Component Variant State Management
// Phase 1, Day 5 - Part 2 (30 tests)
// ===================================================================

import { describe, it, expect, beforeEach } from 'vitest';
import variantEntitySlice, {
  setFocusedVariantId,
  setHoveredVariantId,
  setSelectedVariantId,
  setVariants,
  selectFirstVariantByComponent,
  addVariant,
  removeVariant,
} from './slice';

describe('UIVariant Slice', () => {
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

  // ===================================================================
  // PART 1: UI State Management (3 tests)
  // ===================================================================

  describe('UI State Management', () => {
    it('should set hovered variant ID', () => {
      const state = variantEntitySlice(initialState, setHoveredVariantId('var-1'));
      expect(state.ui.hoveredVariantId).toBe('var-1');
    });

    it('should set focused variant ID', () => {
      const state = variantEntitySlice(initialState, setFocusedVariantId('var-2'));
      expect(state.ui.focusedVariantId).toBe('var-2');
    });

    it('should set selected variant ID', () => {
      const state = variantEntitySlice(initialState, setSelectedVariantId('var-3'));
      expect(state.ui.selectedVariantId).toBe('var-3');
    });
  });

  // ===================================================================
  // PART 2: Set Variants with Component Relations (8 tests)
  // ===================================================================

  describe('Set Variants with Component Relations', () => {
    it('should set variants and build component relations', () => {
      const variants = [
        { id: 'var-1', name: 'Primary', componentId: 'comp-1' },
        { id: 'var-2', name: 'Secondary', componentId: 'comp-1' },
      ];

      const state = variantEntitySlice(initialState, setVariants(variants));

      expect(state.ids).toEqual(['var-1', 'var-2']);
      expect(state.byComponent['comp-1']).toEqual(['var-1', 'var-2']);
    });

    it('should clear existing variants and relations', () => {
      initialState.entities['var-old'] = { id: 'var-old', componentId: 'comp-old' };
      initialState.ids.push('var-old');
      initialState.byComponent['comp-old'] = ['var-old'];

      const variants = [{ id: 'var-new', name: 'New', componentId: 'comp-new' }];
      const state = variantEntitySlice(initialState, setVariants(variants));

      expect(state.entities['var-old']).toBeUndefined();
      expect(state.byComponent['comp-old']).toBeUndefined();
      expect(state.byComponent['comp-new']).toEqual(['var-new']);
    });

    it('should group multiple variants by component', () => {
      const variants = [
        { id: 'var-1', name: 'Variant 1', componentId: 'comp-1' },
        { id: 'var-2', name: 'Variant 2', componentId: 'comp-2' },
        { id: 'var-3', name: 'Variant 3', componentId: 'comp-1' },
      ];

      const state = variantEntitySlice(initialState, setVariants(variants));

      expect(state.byComponent['comp-1']).toEqual(['var-1', 'var-3']);
      expect(state.byComponent['comp-2']).toEqual(['var-2']);
    });

    it('should handle empty array', () => {
      initialState.entities['var-1'] = { id: 'var-1' };
      initialState.ids.push('var-1');

      const state = variantEntitySlice(initialState, setVariants([]));

      expect(state.ids).toHaveLength(0);
      expect(Object.keys(state.entities)).toHaveLength(0);
      expect(Object.keys(state.byComponent)).toHaveLength(0);
    });

    it('should preserve UI state when setting variants', () => {
      initialState.ui.selectedVariantId = 'var-selected';

      const variants = [{ id: 'var-1', name: 'Variant', componentId: 'comp-1' }];
      const state = variantEntitySlice(initialState, setVariants(variants));

      expect(state.ui.selectedVariantId).toBe('var-selected');
    });

    it('should handle variants with complete metadata', () => {
      const variants = [
        {
          id: 'var-1',
          name: 'Primary Button',
          componentId: 'comp-btn',
          props: { variant: 'primary', size: 'large' },
        },
      ];

      const state = variantEntitySlice(initialState, setVariants(variants));

      expect(state.entities['var-1'].props).toEqual({ variant: 'primary', size: 'large' });
    });

    it('should handle multiple variants for same component', () => {
      const variants = [
        { id: 'var-1', name: 'Small', componentId: 'comp-1' },
        { id: 'var-2', name: 'Medium', componentId: 'comp-1' },
        { id: 'var-3', name: 'Large', componentId: 'comp-1' },
      ];

      const state = variantEntitySlice(initialState, setVariants(variants));

      expect(state.byComponent['comp-1']).toHaveLength(3);
      expect(state.byComponent['comp-1']).toEqual(['var-1', 'var-2', 'var-3']);
    });

    it('should handle variants from multiple components', () => {
      const variants = [
        { id: 'var-1', name: 'Button Primary', componentId: 'comp-btn' },
        { id: 'var-2', name: 'Button Secondary', componentId: 'comp-btn' },
        { id: 'var-3', name: 'Input Small', componentId: 'comp-input' },
        { id: 'var-4', name: 'Input Large', componentId: 'comp-input' },
      ];

      const state = variantEntitySlice(initialState, setVariants(variants));

      expect(Object.keys(state.byComponent)).toHaveLength(2);
      expect(state.byComponent['comp-btn']).toHaveLength(2);
      expect(state.byComponent['comp-input']).toHaveLength(2);
    });
  });

  // ===================================================================
  // PART 3: Select First Variant by Component (6 tests)
  // ===================================================================

  describe('Select First Variant by Component', () => {
    beforeEach(() => {
      initialState.byComponent = {
        'comp-1': ['var-1', 'var-2', 'var-3'],
        'comp-2': ['var-4'],
      };
      initialState.entities = {
        'var-1': { id: 'var-1', componentId: 'comp-1' },
        'var-2': { id: 'var-2', componentId: 'comp-1' },
        'var-3': { id: 'var-3', componentId: 'comp-1' },
        'var-4': { id: 'var-4', componentId: 'comp-2' },
      };
      initialState.ids = ['var-1', 'var-2', 'var-3', 'var-4'];
    });

    it('should select first variant for component', () => {
      const state = variantEntitySlice(
        initialState,
        selectFirstVariantByComponent('comp-1'),
      );

      expect(state.ui.selectedVariantId).toBe('var-1');
    });

    it('should select only variant for component with one variant', () => {
      const state = variantEntitySlice(
        initialState,
        selectFirstVariantByComponent('comp-2'),
      );

      expect(state.ui.selectedVariantId).toBe('var-4');
    });

    it('should set null if component has no variants', () => {
      const state = variantEntitySlice(
        initialState,
        selectFirstVariantByComponent('comp-nonexistent'),
      );

      expect(state.ui.selectedVariantId).toBeNull();
    });

    it('should replace previous selection', () => {
      initialState.ui.selectedVariantId = 'var-old';

      const state = variantEntitySlice(
        initialState,
        selectFirstVariantByComponent('comp-1'),
      );

      expect(state.ui.selectedVariantId).toBe('var-1');
    });

    it('should handle empty byComponent for component', () => {
      initialState.byComponent['comp-empty'] = [];

      const state = variantEntitySlice(
        initialState,
        selectFirstVariantByComponent('comp-empty'),
      );

      expect(state.ui.selectedVariantId).toBeNull();
    });

    it('should not affect other UI states', () => {
      initialState.ui.hoveredVariantId = 'var-hover';
      initialState.ui.focusedVariantId = 'var-focus';

      const state = variantEntitySlice(
        initialState,
        selectFirstVariantByComponent('comp-1'),
      );

      expect(state.ui.hoveredVariantId).toBe('var-hover');
      expect(state.ui.focusedVariantId).toBe('var-focus');
    });
  });

  // ===================================================================
  // PART 4: Add Variant (5 tests)
  // ===================================================================

  describe('Add Variant', () => {
    it('should add variant and update relations', () => {
      const variant = {
        id: 'var-1',
        name: 'Primary',
        componentId: 'comp-1',
      };

      const state = variantEntitySlice(initialState, addVariant(variant));

      expect(state.ids).toContain('var-1');
      expect(state.entities['var-1']).toEqual(variant);
      expect(state.byComponent['comp-1']).toContain('var-1');
    });

    it('should add multiple variants to same component', () => {
      let state = variantEntitySlice(
        initialState,
        addVariant({ id: 'var-1', name: 'Variant 1', componentId: 'comp-1' }),
      );
      state = variantEntitySlice(
        state,
        addVariant({ id: 'var-2', name: 'Variant 2', componentId: 'comp-1' }),
      );

      expect(state.byComponent['comp-1']).toEqual(['var-1', 'var-2']);
    });

    it('should add variants to different components', () => {
      let state = variantEntitySlice(
        initialState,
        addVariant({ id: 'var-1', name: 'Variant 1', componentId: 'comp-1' }),
      );
      state = variantEntitySlice(
        state,
        addVariant({ id: 'var-2', name: 'Variant 2', componentId: 'comp-2' }),
      );

      expect(state.byComponent['comp-1']).toEqual(['var-1']);
      expect(state.byComponent['comp-2']).toEqual(['var-2']);
    });

    it('should preserve existing variants when adding new one', () => {
      initialState.entities['var-existing'] = {
        id: 'var-existing',
        componentId: 'comp-1',
      };
      initialState.ids.push('var-existing');
      initialState.byComponent['comp-1'] = ['var-existing'];

      const state = variantEntitySlice(
        initialState,
        addVariant({ id: 'var-new', name: 'New', componentId: 'comp-1' }),
      );

      expect(state.byComponent['comp-1']).toEqual(['var-existing', 'var-new']);
    });

    it('should not affect UI state when adding variant', () => {
      initialState.ui.selectedVariantId = 'var-selected';

      const state = variantEntitySlice(
        initialState,
        addVariant({ id: 'var-1', name: 'Variant', componentId: 'comp-1' }),
      );

      expect(state.ui.selectedVariantId).toBe('var-selected');
    });
  });

  // ===================================================================
  // PART 5: Remove Variant (5 tests)
  // ===================================================================

  describe('Remove Variant', () => {
    beforeEach(() => {
      initialState.entities = {
        'var-1': { id: 'var-1', name: 'Variant 1', componentId: 'comp-1' },
        'var-2': { id: 'var-2', name: 'Variant 2', componentId: 'comp-1' },
      };
      initialState.ids = ['var-1', 'var-2'];
      initialState.byComponent = {
        'comp-1': ['var-1', 'var-2'],
      };
    });

    it('should remove variant and update relations', () => {
      const state = variantEntitySlice(initialState, removeVariant('var-1'));

      expect(state.ids).not.toContain('var-1');
      expect(state.entities['var-1']).toBeUndefined();
      expect(state.byComponent['comp-1']).toEqual(['var-2']);
    });

    it('should remove last variant from component', () => {
      let state = variantEntitySlice(initialState, removeVariant('var-1'));
      state = variantEntitySlice(state, removeVariant('var-2'));

      expect(state.byComponent['comp-1']).toEqual([]);
    });

    it('should handle removing non-existent variant', () => {
      const state = variantEntitySlice(initialState, removeVariant('non-existent'));

      expect(state.ids).toHaveLength(2);
      expect(state.entities['var-1']).toBeDefined();
    });

    it('should not affect other components', () => {
      initialState.entities['var-3'] = {
        id: 'var-3',
        componentId: 'comp-2',
      };
      initialState.ids.push('var-3');
      initialState.byComponent['comp-2'] = ['var-3'];

      const state = variantEntitySlice(initialState, removeVariant('var-1'));

      expect(state.byComponent['comp-2']).toEqual(['var-3']);
    });

    it('should not affect UI state when removing variant', () => {
      initialState.ui.selectedVariantId = 'var-2';

      const state = variantEntitySlice(initialState, removeVariant('var-1'));

      expect(state.ui.selectedVariantId).toBe('var-2');
    });
  });

  // ===================================================================
  // PART 6: Integration Scenarios (3 tests)
  // ===================================================================

  describe('Integration Scenarios', () => {
    it('should handle complete variant lifecycle', () => {
      let state = variantEntitySlice(
        initialState,
        addVariant({ id: 'var-1', name: 'Primary', componentId: 'comp-1' }),
      );
      state = variantEntitySlice(state, selectFirstVariantByComponent('comp-1'));
      state = variantEntitySlice(state, removeVariant('var-1'));

      expect(state.ids).not.toContain('var-1');
      expect(state.ui.selectedVariantId).toBe('var-1'); // Still selected but removed
    });

    it('should maintain data integrity across operations', () => {
      const variants = [
        { id: 'var-1', name: 'Variant 1', componentId: 'comp-1' },
        { id: 'var-2', name: 'Variant 2', componentId: 'comp-2' },
      ];

      let state = variantEntitySlice(initialState, setVariants(variants));
      state = variantEntitySlice(
        state,
        addVariant({ id: 'var-3', name: 'Variant 3', componentId: 'comp-1' }),
      );

      expect(state.byComponent['comp-1']).toEqual(['var-1', 'var-3']);
      expect(state.byComponent['comp-2']).toEqual(['var-2']);
    });

    it('should handle UI state updates independently from data', () => {
      initialState.entities['var-1'] = { id: 'var-1', componentId: 'comp-1' };
      initialState.ids.push('var-1');
      initialState.byComponent['comp-1'] = ['var-1'];

      let state = variantEntitySlice(initialState, setHoveredVariantId('var-1'));
      state = variantEntitySlice(state, setFocusedVariantId('var-1'));
      state = variantEntitySlice(state, setSelectedVariantId('var-1'));

      expect(state.ui.hoveredVariantId).toBe('var-1');
      expect(state.ui.focusedVariantId).toBe('var-1');
      expect(state.ui.selectedVariantId).toBe('var-1');
      expect(state.entities['var-1']).toBeDefined();
    });
  });
});
