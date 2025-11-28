// ===================================================================
// Unit Tests for VarPropValue Slice
// CRITICAL BUSINESS LOGIC - Prop Value State Management
// Phase 1, Day 6 - Part 2 (30 tests)
// ===================================================================

import { describe, it, expect, beforeEach, vi } from 'vitest';

// Mock uuid
vi.mock('uuid', () => ({
  v4: () => 'test-uuid-123',
}));

import propValueEntitySlice, {
  setHoveredPropValueId,
  setFocusedPropValueId,
  setSelectedPropValueId,
  setPropValues,
  addPropValue,
  updatePropValue,
  deletePropValue,
  changeDefaultPropValue,
} from './slice';

describe('VarPropValue Slice', () => {
  let initialState;

  beforeEach(() => {
    initialState = {
      ids: [],
      entities: {},
      byProp: {},
      ui: {
        hoveredPropValueId: null,
        focusedPropValueId: null,
        selectedPropValueId: null,
      },
    };
  });

  // ===================================================================
  // PART 1: UI State Management (3 tests)
  // ===================================================================

  describe('UI State Management', () => {
    it('should set hovered prop value ID', () => {
      const state = propValueEntitySlice(initialState, setHoveredPropValueId('val-1'));
      expect(state.ui.hoveredPropValueId).toBe('val-1');
    });

    it('should set focused prop value ID', () => {
      const state = propValueEntitySlice(initialState, setFocusedPropValueId('val-2'));
      expect(state.ui.focusedPropValueId).toBe('val-2');
    });

    it('should set selected prop value ID', () => {
      const state = propValueEntitySlice(initialState, setSelectedPropValueId('val-3'));
      expect(state.ui.selectedPropValueId).toBe('val-3');
    });
  });

  // ===================================================================
  // PART 2: Set Prop Values (Bulk Load) (5 tests)
  // ===================================================================

  describe('Set Prop Values (Bulk Load)', () => {
    it('should set prop values (replace all)', () => {
      const propValues = [
        { id: 'val-1', name: 'Primary', value: 'primary', propId: 'prop-1' },
        { id: 'val-2', name: 'Secondary', value: 'secondary', propId: 'prop-1' },
      ];

      const state = propValueEntitySlice(initialState, setPropValues(propValues));

      expect(state.ids).toEqual(['val-1', 'val-2']);
      expect(Object.keys(state.entities)).toHaveLength(2);
    });

    it('should clear existing prop values when setting new ones', () => {
      initialState.entities['val-old'] = { id: 'val-old', name: 'Old' };
      initialState.ids.push('val-old');

      const propValues = [{ id: 'val-new', name: 'New', value: 'new', propId: 'prop-1' }];
      const state = propValueEntitySlice(initialState, setPropValues(propValues));

      expect(state.entities['val-old']).toBeUndefined();
      expect(state.entities['val-new']).toBeDefined();
    });

    it('should handle empty array', () => {
      initialState.entities['val-1'] = { id: 'val-1', name: 'Value' };
      initialState.ids.push('val-1');

      const state = propValueEntitySlice(initialState, setPropValues([]));

      expect(state.ids).toHaveLength(0);
      expect(Object.keys(state.entities)).toHaveLength(0);
    });

    it('should preserve UI state when setting prop values', () => {
      initialState.ui.selectedPropValueId = 'val-selected';

      const propValues = [{ id: 'val-1', name: 'Value', propId: 'prop-1' }];
      const state = propValueEntitySlice(initialState, setPropValues(propValues));

      expect(state.ui.selectedPropValueId).toBe('val-selected');
    });

    it('should build byProp index when setting prop values', () => {
      const propValues = [
        { id: 'val-1', name: 'Value 1', propId: 'prop-1' },
        { id: 'val-2', name: 'Value 2', propId: 'prop-1' },
        { id: 'val-3', name: 'Value 3', propId: 'prop-2' },
      ];

      const state = propValueEntitySlice(initialState, setPropValues(propValues));

      expect(state.byProp['prop-1']).toEqual(['val-1', 'val-2']);
      expect(state.byProp['prop-2']).toEqual(['val-3']);
    });
  });

  // ===================================================================
  // PART 3: Add Prop Value (8 tests)
  // ===================================================================

  describe('Add Prop Value', () => {
    it('should add prop value with string type', () => {
      const state = propValueEntitySlice(
        initialState,
        addPropValue({ propId: 'prop-1', type: 'string' }),
      );

      expect(state.ids).toContain('test-uuid-123');
      expect(state.entities['test-uuid-123'].value).toBe('');
      expect(state.entities['test-uuid-123'].type).toBe('string');
    });

    it('should add prop value with number type', () => {
      const state = propValueEntitySlice(
        initialState,
        addPropValue({ propId: 'prop-1', type: 'number' }),
      );

      const id = state.ids[0];
      expect(state.entities[id].type).toBe('number');
      // Value defaults are set, checking structure
      expect(state.entities[id]).toHaveProperty('value');
    });

    it('should add prop value with boolean type', () => {
      const state = propValueEntitySlice(
        initialState,
        addPropValue({ propId: 'prop-1', type: 'boolean' }),
      );

      const id = state.ids[0];
      expect(state.entities[id].type).toBe('boolean');
      // Value defaults are set, checking structure
      expect(state.entities[id]).toHaveProperty('value');
    });

    it('should add prop value with color type', () => {
      const state = propValueEntitySlice(
        initialState,
        addPropValue({ propId: 'prop-1', type: 'color' }),
      );

      const id = state.ids[0];
      expect(state.entities[id].value).toBe('#000000');
    });

    it('should add prop value and update byProp index', () => {
      const state = propValueEntitySlice(
        initialState,
        addPropValue({ propId: 'prop-1', type: 'string' }),
      );

      expect(state.byProp['prop-1']).toContain('test-uuid-123');
    });

    it('should not add duplicate to byProp index', () => {
      initialState.byProp['prop-1'] = ['test-uuid-123'];
      initialState.entities['test-uuid-123'] = {
        id: 'test-uuid-123',
        propId: 'prop-1',
      };
      initialState.ids.push('test-uuid-123');

      const state = propValueEntitySlice(
        initialState,
        addPropValue({ propId: 'prop-1', type: 'string' }),
      );

      expect(state.byProp['prop-1']).toHaveLength(1);
    });

    it('should set isDefault to false by default', () => {
      const state = propValueEntitySlice(
        initialState,
        addPropValue({ propId: 'prop-1', type: 'string' }),
      );

      const id = state.ids[0];
      expect(state.entities[id].isDefault).toBe(false);
    });

    it('should handle unknown type with empty string default', () => {
      const state = propValueEntitySlice(
        initialState,
        addPropValue({ propId: 'prop-1', type: 'unknown' }),
      );

      const id = state.ids[0];
      expect(state.entities[id].value).toBe('');
    });
  });

  // ===================================================================
  // PART 4: Update Prop Value (4 tests)
  // ===================================================================

  describe('Update Prop Value', () => {
    beforeEach(() => {
      initialState.entities['val-1'] = {
        id: 'val-1',
        name: 'Primary',
        value: 'primary',
        propId: 'prop-1',
        type: 'string',
        isDefault: false,
      };
      initialState.ids.push('val-1');
      initialState.byProp['prop-1'] = ['val-1'];
    });

    it('should update prop value properties', () => {
      const state = propValueEntitySlice(
        initialState,
        updatePropValue({
          id: 'val-1',
          propId: 'prop-1',
          name: 'Updated',
          value: 'updated',
        }),
      );

      expect(state.entities['val-1'].name).toBe('Updated');
      expect(state.entities['val-1'].value).toBe('updated');
    });

    it('should handle updating non-existent prop value', () => {
      const state = propValueEntitySlice(
        initialState,
        updatePropValue({ id: 'non-existent', propId: 'prop-1', value: 'new' }),
      );

      expect(state.entities['non-existent']).toBeUndefined();
    });

    it('should update isDefault flag', () => {
      const state = propValueEntitySlice(
        initialState,
        updatePropValue({ id: 'val-1', propId: 'prop-1', isDefault: true }),
      );

      expect(state.entities['val-1'].isDefault).toBe(true);
    });

    it('should preserve other properties when updating', () => {
      const state = propValueEntitySlice(
        initialState,
        updatePropValue({ id: 'val-1', propId: 'prop-1', name: 'New Name' }),
      );

      expect(state.entities['val-1'].type).toBe('string');
      expect(state.entities['val-1'].propId).toBe('prop-1');
    });
  });

  // ===================================================================
  // PART 5: Delete Prop Value (3 tests)
  // ===================================================================

  describe('Delete Prop Value', () => {
    beforeEach(() => {
      initialState.entities = {
        'val-1': { id: 'val-1', name: 'Value 1', propId: 'prop-1' },
        'val-2': { id: 'val-2', name: 'Value 2', propId: 'prop-1' },
      };
      initialState.ids = ['val-1', 'val-2'];
      initialState.byProp = {
        'prop-1': ['val-1', 'val-2'],
      };
    });

    it('should delete prop value and update byProp', () => {
      const state = propValueEntitySlice(initialState, deletePropValue('val-1'));

      expect(state.ids).not.toContain('val-1');
      expect(state.entities['val-1']).toBeUndefined();
      expect(state.byProp['prop-1']).toEqual(['val-2']);
    });

    it('should handle deleting non-existent prop value', () => {
      const state = propValueEntitySlice(initialState, deletePropValue('non-existent'));

      expect(state.ids).toHaveLength(2);
    });

    it('should not affect other prop values', () => {
      const state = propValueEntitySlice(initialState, deletePropValue('val-1'));

      expect(state.entities['val-2']).toEqual({
        id: 'val-2',
        name: 'Value 2',
        propId: 'prop-1',
      });
    });
  });

  // ===================================================================
  // PART 6: Change Default Prop Value (4 tests)
  // ===================================================================

  describe('Change Default Prop Value', () => {
    beforeEach(() => {
      initialState.entities = {
        'val-1': {
          id: 'val-1',
          name: 'Value 1',
          propId: 'prop-1',
          isDefault: true,
        },
        'val-2': {
          id: 'val-2',
          name: 'Value 2',
          propId: 'prop-1',
          isDefault: false,
        },
      };
      initialState.ids = ['val-1', 'val-2'];
      initialState.byProp = {
        'prop-1': ['val-1', 'val-2'],
      };
    });

    it('should change default to new value', () => {
      const state = propValueEntitySlice(initialState, changeDefaultPropValue('val-2'));

      expect(state.entities['val-1'].isDefault).toBe(false);
      expect(state.entities['val-2'].isDefault).toBe(true);
    });

    it('should toggle off if already default', () => {
      const state = propValueEntitySlice(initialState, changeDefaultPropValue('val-1'));

      expect(state.entities['val-1'].isDefault).toBe(false);
      expect(state.entities['val-2'].isDefault).toBe(false);
    });

    it('should handle non-existent value', () => {
      const state = propValueEntitySlice(
        initialState,
        changeDefaultPropValue('non-existent'),
      );

      expect(state.entities['val-1'].isDefault).toBe(true);
    });

    it('should only affect values with same propId', () => {
      initialState.entities['val-3'] = {
        id: 'val-3',
        name: 'Value 3',
        propId: 'prop-2',
        isDefault: true,
      };
      initialState.ids.push('val-3');
      initialState.byProp['prop-2'] = ['val-3'];

      const state = propValueEntitySlice(initialState, changeDefaultPropValue('val-2'));

      expect(state.entities['val-3'].isDefault).toBe(true); // Not affected
    });
  });

  // ===================================================================
  // PART 7: Integration Scenarios (3 tests)
  // ===================================================================

  describe('Integration Scenarios', () => {
    it('should handle complete lifecycle', () => {
      let state = propValueEntitySlice(
        initialState,
        addPropValue({ propId: 'prop-1', type: 'string' }),
      );
      const id = state.ids[0];
      state = propValueEntitySlice(
        state,
        updatePropValue({ id, propId: 'prop-1', name: 'Updated', value: 'updated' }),
      );
      state = propValueEntitySlice(state, changeDefaultPropValue(id));

      expect(state.entities[id].isDefault).toBe(true);
    });

    it('should maintain byProp index integrity', () => {
      let state = propValueEntitySlice(
        initialState,
        addPropValue({ propId: 'prop-1', type: 'string' }),
      );
      const id = state.ids[0];
      state = propValueEntitySlice(state, deletePropValue(id));

      expect(state.byProp['prop-1']).toEqual([]);
    });

    it('should handle default switching', () => {
      // Pre-populate with distinct IDs to test switching
      initialState.entities = {
        'val-1': {
          id: 'val-1',
          name: 'Value 1',
          propId: 'prop-1',
          isDefault: false,
        },
        'val-2': {
          id: 'val-2',
          name: 'Value 2',
          propId: 'prop-1',
          isDefault: false,
        },
      };
      initialState.ids = ['val-1', 'val-2'];
      initialState.byProp = {
        'prop-1': ['val-1', 'val-2'],
      };

      let state = propValueEntitySlice(initialState, changeDefaultPropValue('val-1'));
      expect(state.entities['val-1'].isDefault).toBe(true);

      state = propValueEntitySlice(state, changeDefaultPropValue('val-2'));
      expect(state.entities['val-1'].isDefault).toBe(false);
      expect(state.entities['val-2'].isDefault).toBe(true);
    });
  });
});

