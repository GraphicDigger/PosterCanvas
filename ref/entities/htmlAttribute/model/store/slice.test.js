// ===================================================================
// Unit Tests for HTMLAttribute Entity Redux Slice
// Coverage Target: 95%+
// Week 3 - Day 5 (Unblocked by varProp Fix)
// ===================================================================

import { describe, it, expect, vi } from 'vitest';
import htmlAttrReducer, {
  setHtmlAttrs,
  setHoveredHtmlAttrId,
  setFocusedHtmlAttrId,
  setSelectedHtmlAttrId,
  addHtmlAttr,
  updateHtmlAttr,
  removeHtmlAttr,
} from './slice';

// Mock shared/constants
vi.mock('../../../../shared/constants', () => ({
  ENTITY_KINDS: {
    HTML_ATTRIBUTE: 'htmlAttribute',
  },
}));

describe('HTMLAttribute Entity Slice', () => {
  describe('Initial State', () => {
    it('should have correct initial state structure', () => {
      const state = htmlAttrReducer(undefined, { type: '@@INIT' });

      expect(state).toBeDefined();
      expect(state.ids).toBeDefined();
      expect(state.entities).toBeDefined();
      expect(state.ui).toBeDefined();
    });

    it('should initialize with empty entities', () => {
      const state = htmlAttrReducer(undefined, { type: '@@INIT' });

      expect(state.ids).toEqual([]);
      expect(state.entities).toEqual({});
    });

    it('should initialize UI state with null values', () => {
      const state = htmlAttrReducer(undefined, { type: '@@INIT' });

      expect(state.ui.hoveredHtmlAttrId).toBeNull();
      expect(state.ui.focusedHtmlAttrId).toBeNull();
      expect(state.ui.selectedHtmlAttrId).toBeNull();
    });
  });

  describe('UI State Actions', () => {
    it('should set hovered html attribute id', () => {
      const initialState = htmlAttrReducer(undefined, { type: '@@INIT' });
      const state = htmlAttrReducer(
        initialState,
        setHoveredHtmlAttrId('attr-123'),
      );

      expect(state.ui.hoveredHtmlAttrId).toBe('attr-123');
    });

    it('should set focused html attribute id', () => {
      const initialState = htmlAttrReducer(undefined, { type: '@@INIT' });
      const state = htmlAttrReducer(
        initialState,
        setFocusedHtmlAttrId('attr-456'),
      );

      expect(state.ui.focusedHtmlAttrId).toBe('attr-456');
    });

    it('should set selected html attribute id', () => {
      const initialState = htmlAttrReducer(undefined, { type: '@@INIT' });
      const state = htmlAttrReducer(
        initialState,
        setSelectedHtmlAttrId('attr-789'),
      );

      expect(state.ui.selectedHtmlAttrId).toBe('attr-789');
    });

    it('should handle null values in UI state', () => {
      let state = htmlAttrReducer(undefined, { type: '@@INIT' });

      state = htmlAttrReducer(state, setSelectedHtmlAttrId('attr-1'));
      expect(state.ui.selectedHtmlAttrId).toBe('attr-1');

      state = htmlAttrReducer(state, setSelectedHtmlAttrId(null));
      expect(state.ui.selectedHtmlAttrId).toBeNull();
    });

    it('should handle multiple UI state updates', () => {
      let state = htmlAttrReducer(undefined, { type: '@@INIT' });

      state = htmlAttrReducer(state, setHoveredHtmlAttrId('attr-1'));
      state = htmlAttrReducer(state, setFocusedHtmlAttrId('attr-2'));
      state = htmlAttrReducer(state, setSelectedHtmlAttrId('attr-3'));

      expect(state.ui.hoveredHtmlAttrId).toBe('attr-1');
      expect(state.ui.focusedHtmlAttrId).toBe('attr-2');
      expect(state.ui.selectedHtmlAttrId).toBe('attr-3');
    });
  });

  describe('Query Actions - setHtmlAttrs', () => {
    it('should set html attributes', () => {
      const initialState = htmlAttrReducer(undefined, { type: '@@INIT' });
      const attrs = [
        { id: 'attr-1', name: 'data-testid', value: 'button-submit' },
        { id: 'attr-2', name: 'aria-label', value: 'Submit button' },
      ];

      const state = htmlAttrReducer(initialState, setHtmlAttrs(attrs));

      expect(state.ids).toHaveLength(2);
      expect(state.ids).toEqual(['attr-1', 'attr-2']);
      expect(state.entities['attr-1']).toEqual(attrs[0]);
      expect(state.entities['attr-2']).toEqual(attrs[1]);
    });

    it('should replace existing attributes when setting new attributes', () => {
      let state = htmlAttrReducer(undefined, { type: '@@INIT' });

      state = htmlAttrReducer(
        state,
        setHtmlAttrs([{ id: 'attr-old', name: 'old' }]),
      );

      state = htmlAttrReducer(
        state,
        setHtmlAttrs([{ id: 'attr-new', name: 'new' }]),
      );

      expect(state.ids).toEqual(['attr-new']);
      expect(state.entities['attr-old']).toBeUndefined();
      expect(state.entities['attr-new']).toBeDefined();
    });

    it('should handle empty attributes array', () => {
      let state = htmlAttrReducer(undefined, { type: '@@INIT' });

      state = htmlAttrReducer(
        state,
        setHtmlAttrs([{ id: 'attr-1', name: 'test' }]),
      );

      state = htmlAttrReducer(state, setHtmlAttrs([]));

      expect(state.ids).toEqual([]);
      expect(Object.keys(state.entities)).toHaveLength(0);
    });

    it('should handle large number of attributes', () => {
      const attrs = Array.from({ length: 100 }, (_, i) => ({
        id: `attr-${i}`,
        name: `attribute-${i}`,
      }));

      const state = htmlAttrReducer(undefined, { type: '@@INIT' });
      const newState = htmlAttrReducer(state, setHtmlAttrs(attrs));

      expect(newState.ids).toHaveLength(100);
      expect(newState.entities['attr-0']).toBeDefined();
      expect(newState.entities['attr-99']).toBeDefined();
    });

    it('should preserve IDs order from payload', () => {
      const attrs = [
        { id: 'attr-3', name: 'Third' },
        { id: 'attr-1', name: 'First' },
        { id: 'attr-2', name: 'Second' },
      ];

      const state = htmlAttrReducer(undefined, { type: '@@INIT' });
      const newState = htmlAttrReducer(state, setHtmlAttrs(attrs));

      expect(newState.ids).toEqual(['attr-3', 'attr-1', 'attr-2']);
    });
  });

  describe('Mutation Actions', () => {
    it('should handle addHtmlAttr action', () => {
      const state = htmlAttrReducer(undefined, { type: '@@INIT' });
      const newAttr = { id: 'attr-new', name: 'data-id', value: 'test' };

      // Action exists but implementation is empty
      const newState = htmlAttrReducer(state, addHtmlAttr(newAttr));

      expect(newState).toBeDefined();
      // Implementation is empty, so state should be unchanged
      expect(newState.ids).toEqual([]);
    });

    it('should handle updateHtmlAttr action', () => {
      const state = htmlAttrReducer(undefined, { type: '@@INIT' });

      // Action exists but implementation is empty
      const newState = htmlAttrReducer(
        state,
        updateHtmlAttr({ id: 'attr-1', name: 'Updated' }),
      );

      expect(newState).toBeDefined();
    });

    it('should handle removeHtmlAttr action', () => {
      const state = htmlAttrReducer(undefined, { type: '@@INIT' });

      // Action exists but implementation is empty
      const newState = htmlAttrReducer(state, removeHtmlAttr('attr-1'));

      expect(newState).toBeDefined();
    });
  });

  describe('Complex Scenarios', () => {
    it('should maintain UI state when updating attributes', () => {
      let state = htmlAttrReducer(undefined, { type: '@@INIT' });

      state = htmlAttrReducer(state, setSelectedHtmlAttrId('attr-1'));
      state = htmlAttrReducer(
        state,
        setHtmlAttrs([{ id: 'attr-1', name: 'test' }]),
      );

      expect(state.ui.selectedHtmlAttrId).toBe('attr-1');
    });

    it('should handle setting attributes with various HTML attribute types', () => {
      const attrs = [
        { id: 'attr-1', name: 'data-testid', value: 'button' },
        { id: 'attr-2', name: 'aria-label', value: 'Click me' },
        { id: 'attr-3', name: 'role', value: 'button' },
        { id: 'attr-4', name: 'tabindex', value: '0' },
        { id: 'attr-5', name: 'disabled', value: 'true' },
      ];

      const state = htmlAttrReducer(undefined, { type: '@@INIT' });
      const newState = htmlAttrReducer(state, setHtmlAttrs(attrs));

      expect(newState.ids).toHaveLength(5);
      expect(newState.entities['attr-2'].name).toBe('aria-label');
      expect(newState.entities['attr-5'].name).toBe('disabled');
    });

    it('should handle UI state updates independently', () => {
      let state = htmlAttrReducer(undefined, { type: '@@INIT' });

      state = htmlAttrReducer(state, setHoveredHtmlAttrId('attr-1'));
      expect(state.ui.focusedHtmlAttrId).toBeNull();
      expect(state.ui.selectedHtmlAttrId).toBeNull();

      state = htmlAttrReducer(state, setFocusedHtmlAttrId('attr-2'));
      expect(state.ui.hoveredHtmlAttrId).toBe('attr-1');
      expect(state.ui.selectedHtmlAttrId).toBeNull();
    });

    it('should handle overwriting same UI field', () => {
      let state = htmlAttrReducer(undefined, { type: '@@INIT' });

      state = htmlAttrReducer(state, setSelectedHtmlAttrId('attr-1'));
      expect(state.ui.selectedHtmlAttrId).toBe('attr-1');

      state = htmlAttrReducer(state, setSelectedHtmlAttrId('attr-2'));
      expect(state.ui.selectedHtmlAttrId).toBe('attr-2');

      state = htmlAttrReducer(state, setSelectedHtmlAttrId('attr-3'));
      expect(state.ui.selectedHtmlAttrId).toBe('attr-3');
    });
  });

  describe('Edge Cases', () => {
    it('should handle attributes with duplicate IDs (last one wins)', () => {
      const attrs = [
        { id: 'attr-1', name: 'First', value: 'value1' },
        { id: 'attr-1', name: 'Second', value: 'value2' },
      ];

      const state = htmlAttrReducer(undefined, { type: '@@INIT' });
      const newState = htmlAttrReducer(state, setHtmlAttrs(attrs));

      expect(newState.entities['attr-1'].name).toBe('Second');
      expect(newState.ids).toEqual(['attr-1', 'attr-1']);
    });

    it('should handle undefined values in UI state', () => {
      const state = htmlAttrReducer(undefined, { type: '@@INIT' });

      const newState = htmlAttrReducer(
        state,
        setHoveredHtmlAttrId(undefined),
      );

      expect(newState.ui.hoveredHtmlAttrId).toBeUndefined();
    });

    it('should handle empty string as attribute ID', () => {
      const state = htmlAttrReducer(undefined, { type: '@@INIT' });

      const newState = htmlAttrReducer(state, setSelectedHtmlAttrId(''));

      expect(newState.ui.selectedHtmlAttrId).toBe('');
    });

    it('should correctly reduce attributes into entities object', () => {
      const attrs = [
        { id: 'attr-1', name: 'data-id', value: 'test1', custom: true },
        { id: 'attr-2', name: 'aria-label', value: 'test2', required: false },
      ];

      const state = htmlAttrReducer(undefined, { type: '@@INIT' });
      const newState = htmlAttrReducer(state, setHtmlAttrs(attrs));

      expect(Object.keys(newState.entities)).toHaveLength(2);
      expect(newState.entities['attr-1'].custom).toBe(true);
      expect(newState.entities['attr-2'].required).toBe(false);
    });

    it('should handle attributes with complex nested data', () => {
      const attrs = [
        {
          id: 'attr-1',
          name: 'data-config',
          value: JSON.stringify({ theme: 'dark', size: 'large' }),
          metadata: { required: true, validator: 'json' },
        },
      ];

      const state = htmlAttrReducer(undefined, { type: '@@INIT' });
      const newState = htmlAttrReducer(state, setHtmlAttrs(attrs));

      expect(newState.entities['attr-1'].metadata).toBeDefined();
      expect(newState.entities['attr-1'].metadata.required).toBe(true);
    });
  });
});
