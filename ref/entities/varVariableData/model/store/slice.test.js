// ===================================================================
// Unit Tests for VarVariableData Slice
// CRITICAL BUSINESS LOGIC - Variable Data State Management
// Phase 1, Day 5 - Part 3 (30 tests) - DAY 5 COMPLETE! 🎉
// ===================================================================

import { describe, it, expect, beforeEach } from 'vitest';
import variableEntitySlice, {
  setVariables,
  setFocusedVariableId,
  setHoveredVariableId,
  setSelectedVariableId,
  addVariable,
  updateVariable,
  removeVariable,
} from './slice';

describe('VarVariableData Slice', () => {
  let initialState;

  beforeEach(() => {
    initialState = {
      ids: [],
      entities: {},
      ui: {
        focusedVariableId: null,
        hoveredVariableId: null,
        selectedVariableId: null,
      },
    };
  });

  // ===================================================================
  // PART 1: UI State Management (3 tests)
  // ===================================================================

  describe('UI State Management', () => {
    it('should set focused variable ID', () => {
      const state = variableEntitySlice(initialState, setFocusedVariableId('var-1'));
      expect(state.ui.focusedVariableId).toBe('var-1');
    });

    it('should set hovered variable ID', () => {
      const state = variableEntitySlice(initialState, setHoveredVariableId('var-2'));
      expect(state.ui.hoveredVariableId).toBe('var-2');
    });

    it('should set selected variable ID', () => {
      const state = variableEntitySlice(initialState, setSelectedVariableId('var-3'));
      expect(state.ui.selectedVariableId).toBe('var-3');
    });
  });

  // ===================================================================
  // PART 2: Set Variables (Bulk Load) (7 tests)
  // ===================================================================

  describe('Set Variables (Bulk Load)', () => {
    it('should set variables (replace all)', () => {
      const variables = [
        { id: 'var-1', name: 'userName', value: 'John' },
        { id: 'var-2', name: 'userAge', value: 30 },
      ];

      const state = variableEntitySlice(initialState, setVariables(variables));

      expect(state.ids).toEqual(['var-1', 'var-2']);
      expect(Object.keys(state.entities)).toHaveLength(2);
    });

    it('should clear existing variables when setting new ones', () => {
      initialState.entities['var-old'] = { id: 'var-old', name: 'oldVar' };
      initialState.ids.push('var-old');

      const variables = [{ id: 'var-new', name: 'newVar', value: 'new' }];
      const state = variableEntitySlice(initialState, setVariables(variables));

      expect(state.entities['var-old']).toBeUndefined();
      expect(state.entities['var-new']).toBeDefined();
    });

    it('should handle empty array in setVariables', () => {
      initialState.entities['var-1'] = { id: 'var-1', name: 'var' };
      initialState.ids.push('var-1');

      const state = variableEntitySlice(initialState, setVariables([]));

      expect(state.ids).toHaveLength(0);
      expect(Object.keys(state.entities)).toHaveLength(0);
    });

    it('should preserve UI state when setting variables', () => {
      initialState.ui.selectedVariableId = 'var-selected';

      const variables = [{ id: 'var-1', name: 'var', value: 'value' }];
      const state = variableEntitySlice(initialState, setVariables(variables));

      expect(state.ui.selectedVariableId).toBe('var-selected');
    });

    it('should set variables with different types', () => {
      const variables = [
        { id: 'var-1', name: 'stringVar', value: 'text', type: 'string' },
        { id: 'var-2', name: 'numberVar', value: 42, type: 'number' },
        { id: 'var-3', name: 'boolVar', value: true, type: 'boolean' },
      ];

      const state = variableEntitySlice(initialState, setVariables(variables));

      expect(state.entities['var-1'].value).toBe('text');
      expect(state.entities['var-2'].value).toBe(42);
      expect(state.entities['var-3'].value).toBe(true);
    });

    it('should set variables with null values', () => {
      const variables = [
        {
          id: 'var-1',
          name: 'nullVar',
          value: null,
        },
      ];

      const state = variableEntitySlice(initialState, setVariables(variables));

      expect(state.entities['var-1'].value).toBeNull();
    });

    it('should handle large number of variables', () => {
      const variables = Array.from({ length: 100 }, (_, i) => ({
        id: `var-${i}`,
        name: `variable${i}`,
        value: i,
      }));

      const state = variableEntitySlice(initialState, setVariables(variables));

      expect(state.ids).toHaveLength(100);
      expect(Object.keys(state.entities)).toHaveLength(100);
    });
  });

  // ===================================================================
  // PART 3: Add Variable (7 tests)
  // ===================================================================

  describe('Add Variable', () => {
    it('should add variable with all properties', () => {
      const variable = {
        id: 'var-1',
        name: 'userName',
        value: 'John Doe',
        type: 'string',
      };

      const state = variableEntitySlice(initialState, addVariable(variable));

      expect(state.ids).toContain('var-1');
      expect(state.entities['var-1']).toEqual(variable);
    });

    it('should not add duplicate variable ID', () => {
      initialState.entities['var-1'] = {
        id: 'var-1',
        name: 'existing',
        value: 'original',
      };
      initialState.ids.push('var-1');

      const state = variableEntitySlice(
        initialState,
        addVariable({ id: 'var-1', name: 'duplicate', value: 'new' }),
      );

      expect(state.ids).toHaveLength(1);
      // Note: The slice replaces the entity but doesn't add duplicate ID
      expect(state.entities['var-1'].value).toBe('new');
    });

    it('should add multiple variables sequentially', () => {
      let state = variableEntitySlice(
        initialState,
        addVariable({ id: 'var-1', name: 'var1', value: 'value1' }),
      );
      state = variableEntitySlice(
        state,
        addVariable({ id: 'var-2', name: 'var2', value: 'value2' }),
      );

      expect(state.ids).toHaveLength(2);
      expect(state.entities['var-1'].name).toBe('var1');
      expect(state.entities['var-2'].name).toBe('var2');
    });

    it('should add variable with complex value', () => {
      const variable = {
        id: 'var-1',
        name: 'userConfig',
        value: {
          theme: 'dark',
          language: 'en',
          notifications: true,
        },
        type: 'object',
      };

      const state = variableEntitySlice(initialState, addVariable(variable));

      expect(state.entities['var-1'].value).toEqual({
        theme: 'dark',
        language: 'en',
        notifications: true,
      });
    });

    it('should preserve existing variables when adding new one', () => {
      initialState.entities['var-existing'] = {
        id: 'var-existing',
        name: 'existing',
        value: 'existing',
      };
      initialState.ids.push('var-existing');

      const state = variableEntitySlice(
        initialState,
        addVariable({ id: 'var-new', name: 'new', value: 'new' }),
      );

      expect(state.entities['var-existing']).toBeDefined();
      expect(state.entities['var-new']).toBeDefined();
    });

    it('should not affect UI state when adding variable', () => {
      initialState.ui.selectedVariableId = 'var-selected';

      const state = variableEntitySlice(
        initialState,
        addVariable({ id: 'var-1', name: 'var', value: 'value' }),
      );

      expect(state.ui.selectedVariableId).toBe('var-selected');
    });

    it('should add variable with array value', () => {
      const variable = {
        id: 'var-1',
        name: 'items',
        value: ['item1', 'item2', 'item3'],
        type: 'array',
      };

      const state = variableEntitySlice(initialState, addVariable(variable));

      expect(state.entities['var-1'].value).toEqual(['item1', 'item2', 'item3']);
    });
  });

  // ===================================================================
  // PART 4: Update Variable (7 tests)
  // ===================================================================

  describe('Update Variable', () => {
    beforeEach(() => {
      initialState.entities['var-1'] = {
        id: 'var-1',
        name: 'userName',
        value: 'John',
        type: 'string',
      };
      initialState.ids.push('var-1');
    });

    it('should update variable properties (merge)', () => {
      const state = variableEntitySlice(
        initialState,
        updateVariable({ id: 'var-1', value: 'Jane' }),
      );

      expect(state.entities['var-1'].value).toBe('Jane');
      expect(state.entities['var-1'].name).toBe('userName'); // Preserved
    });

    it('should update variable name', () => {
      const state = variableEntitySlice(
        initialState,
        updateVariable({ id: 'var-1', name: 'userFullName' }),
      );

      expect(state.entities['var-1'].name).toBe('userFullName');
    });

    it('should update variable type', () => {
      const state = variableEntitySlice(
        initialState,
        updateVariable({ id: 'var-1', type: 'text' }),
      );

      expect(state.entities['var-1'].type).toBe('text');
    });

    it('should handle updating non-existent variable', () => {
      const state = variableEntitySlice(
        initialState,
        updateVariable({ id: 'non-existent', value: 'new' }),
      );

      expect(state.entities['non-existent']).toBeUndefined();
      expect(state.entities['var-1']).toBeDefined();
    });

    it('should update multiple properties at once', () => {
      const state = variableEntitySlice(
        initialState,
        updateVariable({
          id: 'var-1',
          name: 'updatedName',
          value: 'updatedValue',
          type: 'updatedType',
        }),
      );

      expect(state.entities['var-1'].name).toBe('updatedName');
      expect(state.entities['var-1'].value).toBe('updatedValue');
      expect(state.entities['var-1'].type).toBe('updatedType');
    });

    it('should not affect other variables when updating one', () => {
      initialState.entities['var-2'] = {
        id: 'var-2',
        name: 'otherVar',
        value: 'other',
      };
      initialState.ids.push('var-2');

      const state = variableEntitySlice(
        initialState,
        updateVariable({ id: 'var-1', value: 'updated' }),
      );

      expect(state.entities['var-2']).toEqual({
        id: 'var-2',
        name: 'otherVar',
        value: 'other',
      });
    });

    it('should not affect UI state when updating variable', () => {
      initialState.ui.selectedVariableId = 'var-1';

      const state = variableEntitySlice(
        initialState,
        updateVariable({ id: 'var-1', value: 'updated' }),
      );

      expect(state.ui.selectedVariableId).toBe('var-1');
    });
  });

  // ===================================================================
  // PART 5: Remove Variable (3 tests)
  // ===================================================================

  describe('Remove Variable', () => {
    beforeEach(() => {
      initialState.entities = {
        'var-1': { id: 'var-1', name: 'var1', value: 'value1' },
        'var-2': { id: 'var-2', name: 'var2', value: 'value2' },
      };
      initialState.ids = ['var-1', 'var-2'];
    });

    it('should remove variable', () => {
      const state = variableEntitySlice(initialState, removeVariable('var-1'));

      expect(state.ids).not.toContain('var-1');
      expect(state.entities['var-1']).toBeUndefined();
      expect(state.entities['var-2']).toBeDefined();
    });

    it('should handle removing non-existent variable', () => {
      const state = variableEntitySlice(initialState, removeVariable('non-existent'));

      expect(state.ids).toHaveLength(2);
      expect(state.entities['var-1']).toBeDefined();
    });

    it('should not affect other variables', () => {
      const state = variableEntitySlice(initialState, removeVariable('var-1'));

      expect(state.ids).toContain('var-2');
      expect(state.entities['var-2']).toEqual({
        id: 'var-2',
        name: 'var2',
        value: 'value2',
      });
    });
  });

  // ===================================================================
  // PART 6: Integration Scenarios (3 tests)
  // ===================================================================

  describe('Integration Scenarios', () => {
    it('should handle complete variable lifecycle', () => {
      let state = variableEntitySlice(
        initialState,
        addVariable({ id: 'var-1', name: 'counter', value: 0 }),
      );
      state = variableEntitySlice(
        state,
        updateVariable({ id: 'var-1', value: 10 }),
      );
      state = variableEntitySlice(state, setSelectedVariableId('var-1'));
      state = variableEntitySlice(state, removeVariable('var-1'));

      expect(state.ids).not.toContain('var-1');
      expect(state.ui.selectedVariableId).toBe('var-1'); // Still selected but removed
    });

    it('should maintain data integrity across operations', () => {
      const variables = [
        { id: 'var-1', name: 'var1', value: 'value1' },
        { id: 'var-2', name: 'var2', value: 'value2' },
      ];

      let state = variableEntitySlice(initialState, setVariables(variables));
      state = variableEntitySlice(
        state,
        addVariable({ id: 'var-3', name: 'var3', value: 'value3' }),
      );
      state = variableEntitySlice(state, updateVariable({ id: 'var-1', value: 'updated' }));

      expect(state.ids).toHaveLength(3);
      expect(state.entities['var-1'].value).toBe('updated');
      expect(state.entities['var-3']).toBeDefined();
    });

    it('should handle UI state updates independently from data', () => {
      initialState.entities['var-1'] = { id: 'var-1', name: 'var', value: 'value' };
      initialState.ids.push('var-1');

      let state = variableEntitySlice(initialState, setHoveredVariableId('var-1'));
      state = variableEntitySlice(state, setFocusedVariableId('var-1'));
      state = variableEntitySlice(state, setSelectedVariableId('var-1'));

      expect(state.ui.hoveredVariableId).toBe('var-1');
      expect(state.ui.focusedVariableId).toBe('var-1');
      expect(state.ui.selectedVariableId).toBe('var-1');
      expect(state.entities['var-1']).toBeDefined();
    });
  });
});

