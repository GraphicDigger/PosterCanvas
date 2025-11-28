// ===================================================================
// Unit Tests for VarProp Slice
// CRITICAL BUSINESS LOGIC - Prop State Management with Component Relations
// Phase 1, Day 7 - Part 3 (30 tests) - DAY 7 COMPLETE! 🎉
// ===================================================================

import { describe, it, expect, beforeEach, vi } from 'vitest';

// Mock dependencies
vi.mock('uuid', () => ({
  v4: () => 'uuid-789',
}));

vi.mock('@/shared/constants', () => ({
  ENTITY_KINDS: {
    PROP: 'prop',
  },
  VARIABLE_TYPES: {
    STRING: 'string',
    NUMBER: 'number',
    BOOLEAN: 'boolean',
    COLOR: 'color',
    IMAGE: 'image',
    VIDEO: 'video',
    DATA: 'data',
    DATE: 'date',
    JSON: 'json',
  },
}));

import propEntitySlice, {
  setHoveredPropId,
  setFocusedPropId,
  setSelectedPropId,
  resetSelectedPropId,
  setProps,
  addProp,
  updateProp,
  deleteProp,
  addValueToProp,
  removeValueFromProp,
} from './slice';

describe('VarProp Slice', () => {
  let initialState;

  beforeEach(() => {
    initialState = {
      ids: [],
      entities: {},
      byComponent: {},
      ui: {
        hoveredPropId: null,
        focusedPropId: null,
        selectedPropId: null,
      },
    };
  });

  // ===================================================================
  // PART 1: UI State Management (4 tests)
  // ===================================================================

  describe('UI State Management', () => {
    it('should set hovered prop ID', () => {
      const state = propEntitySlice(initialState, setHoveredPropId('prop-1'));
      expect(state.ui.hoveredPropId).toBe('prop-1');
    });

    it('should set focused prop ID', () => {
      const state = propEntitySlice(initialState, setFocusedPropId('prop-2'));
      expect(state.ui.focusedPropId).toBe('prop-2');
    });

    it('should set selected prop ID', () => {
      const state = propEntitySlice(initialState, setSelectedPropId('prop-3'));
      expect(state.ui.selectedPropId).toBe('prop-3');
    });

    it('should reset selected prop ID', () => {
      initialState.ui.selectedPropId = 'prop-1';
      const state = propEntitySlice(initialState, resetSelectedPropId());
      expect(state.ui.selectedPropId).toBeNull();
    });
  });

  // ===================================================================
  // PART 2: Set Props (Bulk Load) (5 tests)
  // ===================================================================

  describe('Set Props (Bulk Load)', () => {
    it('should set props (replace all)', () => {
      const props = [
        { id: 'prop-1', name: 'title', type: 'string', componentId: 'comp-1' },
        { id: 'prop-2', name: 'count', type: 'number', componentId: 'comp-1' },
      ];

      const state = propEntitySlice(initialState, setProps(props));

      expect(state.ids).toEqual(['prop-1', 'prop-2']);
      expect(Object.keys(state.entities)).toHaveLength(2);
    });

    it('should add new props to existing ones', () => {
      initialState.entities['prop-old'] = { id: 'prop-old', name: 'old' };
      initialState.ids.push('prop-old');

      const props = [{ id: 'prop-new', name: 'new', componentId: 'comp-1' }];
      const state = propEntitySlice(initialState, setProps(props));

      // setProps appends, doesn't replace
      expect(state.entities['prop-old']).toBeDefined();
      expect(state.entities['prop-new']).toBeDefined();
    });

    it('should handle empty array', () => {
      initialState.entities['prop-1'] = { id: 'prop-1', name: 'Prop' };
      initialState.ids.push('prop-1');

      const state = propEntitySlice(initialState, setProps([]));

      // setProps with empty array doesn't clear existing state
      expect(state.ids).toHaveLength(1);
      expect(Object.keys(state.entities)).toHaveLength(1);
    });

    it('should preserve UI state when setting props', () => {
      initialState.ui.selectedPropId = 'prop-selected';

      const props = [{ id: 'prop-1', name: 'prop', componentId: 'comp-1' }];
      const state = propEntitySlice(initialState, setProps(props));

      expect(state.ui.selectedPropId).toBe('prop-selected');
    });

    it('should build byComponent index', () => {
      const props = [
        { id: 'prop-1', name: 'title', componentId: 'comp-1' },
        { id: 'prop-2', name: 'count', componentId: 'comp-1' },
        { id: 'prop-3', name: 'label', componentId: 'comp-2' },
      ];

      const state = propEntitySlice(initialState, setProps(props));

      expect(state.byComponent['comp-1']).toEqual(['prop-1', 'prop-2']);
      expect(state.byComponent['comp-2']).toEqual(['prop-3']);
    });
  });

  // ===================================================================
  // PART 3: Add Prop (8 tests)
  // ===================================================================

  describe('Add Prop', () => {
    it('should add prop with string type', () => {
      const state = propEntitySlice(
        initialState,
        addProp({ componentId: 'comp-1', type: 'string' }),
      );

      expect(state.ids).toHaveLength(1);
      const id = state.ids[0];
      expect(state.entities[id].type).toBe('string');
      expect(state.entities[id].defaultValue).toBe('');
      expect(state.entities[id].kind).toBe('prop');
    });

    it('should add prop with number type', () => {
      const state = propEntitySlice(
        initialState,
        addProp({ componentId: 'comp-1', type: 'number' }),
      );

      const id = state.ids[0];
      expect(state.entities[id].defaultValue).toBe(0);
    });

    it('should add prop with boolean type', () => {
      const state = propEntitySlice(
        initialState,
        addProp({ componentId: 'comp-1', type: 'boolean' }),
      );

      const id = state.ids[0];
      expect(state.entities[id].defaultValue).toBe(false);
    });

    it('should add prop with color type', () => {
      const state = propEntitySlice(
        initialState,
        addProp({ componentId: 'comp-1', type: 'color' }),
      );

      const id = state.ids[0];
      expect(state.entities[id].defaultValue).toBe('#000000');
    });

    it('should add prop and update byComponent index', () => {
      const state = propEntitySlice(
        initialState,
        addProp({ componentId: 'comp-1', type: 'string' }),
      );

      const id = state.ids[0];
      expect(state.byComponent['comp-1']).toContain(id);
    });

    it('should not duplicate in byComponent', () => {
      initialState.byComponent['comp-1'] = ['uuid-789'];
      initialState.entities['uuid-789'] = {
        id: 'uuid-789',
        componentId: 'comp-1',
      };
      initialState.ids.push('uuid-789');

      const state = propEntitySlice(
        initialState,
        addProp({ componentId: 'comp-1', type: 'string' }),
      );

      expect(state.byComponent['comp-1']).toHaveLength(1);
    });

    it('should set prop name based on type', () => {
      const state = propEntitySlice(
        initialState,
        addProp({ componentId: 'comp-1', type: 'color' }),
      );

      const id = state.ids[0];
      expect(state.entities[id].name).toBe('colorProp');
    });

    it('should preserve existing props when adding new one', () => {
      initialState.entities['prop-existing'] = {
        id: 'prop-existing',
        name: 'existing',
      };
      initialState.ids.push('prop-existing');

      const state = propEntitySlice(
        initialState,
        addProp({ componentId: 'comp-1', type: 'string' }),
      );

      expect(state.entities['prop-existing']).toBeDefined();
      expect(state.ids).toHaveLength(2);
    });
  });

  // ===================================================================
  // PART 4: Update Prop (3 tests)
  // ===================================================================

  describe('Update Prop', () => {
    beforeEach(() => {
      initialState.entities['prop-1'] = {
        id: 'prop-1',
        name: 'title',
        type: 'string',
        componentId: 'comp-1',
        defaultValue: '',
      };
      initialState.ids.push('prop-1');
    });

    it('should update prop properties', () => {
      const state = propEntitySlice(
        initialState,
        updateProp({ id: 'prop-1', name: 'newTitle', defaultValue: 'New Title' }),
      );

      expect(state.entities['prop-1'].name).toBe('newTitle');
      expect(state.entities['prop-1'].defaultValue).toBe('New Title');
    });

    it('should handle updating non-existent prop', () => {
      const state = propEntitySlice(
        initialState,
        updateProp({ id: 'non-existent', name: 'new' }),
      );

      expect(state.entities['non-existent']).toBeUndefined();
    });

    it('should not affect other props when updating one', () => {
      initialState.entities['prop-2'] = {
        id: 'prop-2',
        name: 'count',
        type: 'number',
      };
      initialState.ids.push('prop-2');

      const state = propEntitySlice(
        initialState,
        updateProp({ id: 'prop-1', name: 'updated' }),
      );

      expect(state.entities['prop-2']).toEqual({
        id: 'prop-2',
        name: 'count',
        type: 'number',
      });
    });
  });

  // ===================================================================
  // PART 5: Delete Prop (3 tests)
  // ===================================================================

  describe('Delete Prop', () => {
    beforeEach(() => {
      initialState.entities = {
        'prop-1': { id: 'prop-1', name: 'title', componentId: 'comp-1' },
        'prop-2': { id: 'prop-2', name: 'count', componentId: 'comp-1' },
      };
      initialState.ids = ['prop-1', 'prop-2'];
      initialState.byComponent = {
        'comp-1': ['prop-1', 'prop-2'],
      };
    });

    it('should delete prop and update byComponent', () => {
      const state = propEntitySlice(initialState, deleteProp('prop-1'));

      expect(state.ids).not.toContain('prop-1');
      expect(state.entities['prop-1']).toBeUndefined();
      expect(state.byComponent['comp-1']).toEqual(['prop-2']);
    });

    it('should handle deleting non-existent prop', () => {
      const state = propEntitySlice(initialState, deleteProp('non-existent'));

      expect(state.ids).toHaveLength(2);
    });

    it('should not affect other props', () => {
      const state = propEntitySlice(initialState, deleteProp('prop-1'));

      expect(state.ids).toContain('prop-2');
      expect(state.entities['prop-2']).toBeDefined();
    });
  });

  // ===================================================================
  // PART 6: Add/Remove Value (4 tests)
  // ===================================================================

  describe('Add/Remove Value to/from Prop', () => {
    beforeEach(() => {
      initialState.entities['prop-1'] = {
        id: 'prop-1',
        name: 'variant',
        valueIds: ['val-1'],
      };
      initialState.ids.push('prop-1');
    });

    it('should add value to prop', () => {
      const state = propEntitySlice(
        initialState,
        addValueToProp({ propId: 'prop-1', valueId: 'val-2' }),
      );

      expect(state.entities['prop-1'].valueIds).toContain('val-2');
      expect(state.entities['prop-1'].valueIds).toHaveLength(2);
    });

    it('should not add duplicate value', () => {
      const state = propEntitySlice(
        initialState,
        addValueToProp({ propId: 'prop-1', valueId: 'val-1' }),
      );

      expect(state.entities['prop-1'].valueIds).toHaveLength(1);
    });

    it('should remove value from prop', () => {
      const state = propEntitySlice(
        initialState,
        removeValueFromProp({ propId: 'prop-1', valueId: 'val-1' }),
      );

      expect(state.entities['prop-1'].valueIds).not.toContain('val-1');
      expect(state.entities['prop-1'].valueIds).toHaveLength(0);
    });

    it('should handle adding value to prop without valueIds', () => {
      initialState.entities['prop-2'] = { id: 'prop-2', name: 'new' };
      initialState.ids.push('prop-2');

      const state = propEntitySlice(
        initialState,
        addValueToProp({ propId: 'prop-2', valueId: 'val-1' }),
      );

      expect(state.entities['prop-2'].valueIds).toEqual(['val-1']);
    });
  });

  // ===================================================================
  // PART 8: Integration Scenarios (3 tests)
  // ===================================================================

  describe('Integration Scenarios', () => {
    it('should handle complete prop lifecycle', () => {
      let state = propEntitySlice(
        initialState,
        addProp({ componentId: 'comp-1', type: 'string' }),
      );
      const propId = state.ids[0];

      state = propEntitySlice(
        state,
        updateProp({ id: propId, name: 'title', defaultValue: 'Hello' }),
      );
      state = propEntitySlice(
        state,
        addValueToProp({ propId, valueId: 'val-1' }),
      );
      state = propEntitySlice(state, setSelectedPropId(propId));
      state = propEntitySlice(state, deleteProp(propId));

      expect(state.ids).not.toContain(propId);
      expect(state.ui.selectedPropId).toBe(propId); // Still selected
    });

    it('should maintain data integrity across operations', () => {
      const props = [
        { id: 'prop-1', name: 'title', type: 'string', componentId: 'comp-1' },
        { id: 'prop-2', name: 'count', type: 'number', componentId: 'comp-1' },
      ];

      let state = propEntitySlice(initialState, setProps(props));
      state = propEntitySlice(
        state,
        addProp({ componentId: 'comp-2', type: 'boolean' }),
      );
      state = propEntitySlice(
        state,
        updateProp({ id: 'prop-1', defaultValue: 'Updated Title' }),
      );

      expect(state.ids).toHaveLength(3);
      expect(state.entities['prop-1'].defaultValue).toBe('Updated Title');
      expect(state.byComponent['comp-1']).toHaveLength(2);
      expect(state.byComponent['comp-2']).toHaveLength(1);
    });

    it('should handle complex value management', () => {
      let state = propEntitySlice(
        initialState,
        addProp({ componentId: 'comp-1', type: 'string' }),
      );
      const propId = state.ids[0];

      state = propEntitySlice(state, addValueToProp({ propId, valueId: 'val-1' }));
      state = propEntitySlice(state, addValueToProp({ propId, valueId: 'val-2' }));
      state = propEntitySlice(state, addValueToProp({ propId, valueId: 'val-3' }));
      state = propEntitySlice(
        state,
        removeValueFromProp({ propId, valueId: 'val-2' }),
      );

      expect(state.entities[propId].valueIds).toEqual(['val-1', 'val-3']);
      expect(state.entities[propId].valueIds).toHaveLength(2);
    });
  });

});

