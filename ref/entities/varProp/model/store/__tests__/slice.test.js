// ===================================================================
// Unit Tests for varProp Redux Slice
// Coverage Target: 100%
// Phase 1 - Redux Slices (MEDIUM IMPACT - 41 lines + actions)
// Risk: LOW (Redux Toolkit, prop state management)
// ===================================================================

import { describe, it, expect, beforeEach, vi } from 'vitest';
import propReducer, {
  setHoveredPropId,
  setFocusedPropId,
  setSelectedPropId,
  resetSelectedPropId,
  setProps,
  addProp,
  updateProp,
  deleteProp,
} from '../slice';
import { ENTITY_KINDS } from '@/shared/constants';

// Mock uuid
vi.mock('uuid', () => ({
  v4: () => 'mock-uuid-prop-1234',
}));

// Mock VARIABLE_TYPES
vi.mock('@/shared/constants', async () => {
  const actual = await vi.importActual('@/shared/constants');
  return {
    ...actual,
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
  };
});

describe('varProp Redux Slice', () => {
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

    // Mock console.log
    vi.spyOn(console, 'log').mockImplementation(() => {});
  });

  describe('Initial State', () => {
    it('should return initial state when undefined state is passed', () => {
      const result = propReducer(undefined, { type: '@@INIT' });

      expect(result).toEqual(initialState);
    });

    it('should have empty ids, entities, and byComponent', () => {
      const result = propReducer(undefined, { type: '@@INIT' });

      expect(result.ids).toEqual([]);
      expect(result.entities).toEqual({});
      expect(result.byComponent).toEqual({});
    });

    it('should have null UI state values', () => {
      const result = propReducer(undefined, { type: '@@INIT' });

      expect(result.ui.hoveredPropId).toBeNull();
      expect(result.ui.focusedPropId).toBeNull();
      expect(result.ui.selectedPropId).toBeNull();
    });
  });

  describe('UI Actions - setHoveredPropId', () => {
    it('should set hovered prop ID', () => {
      const result = propReducer(initialState, setHoveredPropId('prop-1'));

      expect(result.ui.hoveredPropId).toBe('prop-1');
    });

    it('should update hovered prop ID', () => {
      const state = {
        ...initialState,
        ui: { ...initialState.ui, hoveredPropId: 'prop-1' },
      };

      const result = propReducer(state, setHoveredPropId('prop-2'));

      expect(result.ui.hoveredPropId).toBe('prop-2');
    });

    it('should allow setting to null', () => {
      const state = {
        ...initialState,
        ui: { ...initialState.ui, hoveredPropId: 'prop-1' },
      };

      const result = propReducer(state, setHoveredPropId(null));

      expect(result.ui.hoveredPropId).toBeNull();
    });
  });

  describe('UI Actions - setFocusedPropId', () => {
    it('should set focused prop ID', () => {
      const result = propReducer(initialState, setFocusedPropId('prop-1'));

      expect(result.ui.focusedPropId).toBe('prop-1');
    });

    it('should update focused prop ID', () => {
      const state = {
        ...initialState,
        ui: { ...initialState.ui, focusedPropId: 'prop-1' },
      };

      const result = propReducer(state, setFocusedPropId('prop-2'));

      expect(result.ui.focusedPropId).toBe('prop-2');
    });
  });

  describe('UI Actions - setSelectedPropId', () => {
    it('should set selected prop ID', () => {
      const result = propReducer(initialState, setSelectedPropId('prop-1'));

      expect(result.ui.selectedPropId).toBe('prop-1');
    });

    it('should update selected prop ID', () => {
      const state = {
        ...initialState,
        ui: { ...initialState.ui, selectedPropId: 'prop-1' },
      };

      const result = propReducer(state, setSelectedPropId('prop-2'));

      expect(result.ui.selectedPropId).toBe('prop-2');
    });
  });

  describe('UI Actions - resetSelectedPropId', () => {
    it('should reset selected prop ID to null', () => {
      const state = {
        ...initialState,
        ui: { ...initialState.ui, selectedPropId: 'prop-1' },
      };

      const result = propReducer(state, resetSelectedPropId());

      expect(result.ui.selectedPropId).toBeNull();
    });

    it('should do nothing if already null', () => {
      const result = propReducer(initialState, resetSelectedPropId());

      expect(result.ui.selectedPropId).toBeNull();
    });
  });

  describe('Data Actions - setProps', () => {
    it('should set single prop', () => {
      const props = [
        { id: 'prop-1', name: 'textProp', type: 'string', componentId: 'comp-1' },
      ];

      const result = propReducer(initialState, setProps(props));

      expect(result.ids).toEqual(['prop-1']);
      expect(result.entities['prop-1']).toEqual(props[0]);
      expect(result.byComponent['comp-1']).toEqual(['prop-1']);
    });

    it('should set multiple props', () => {
      const props = [
        { id: 'prop-1', name: 'textProp', type: 'string', componentId: 'comp-1' },
        { id: 'prop-2', name: 'colorProp', type: 'color', componentId: 'comp-1' },
        { id: 'prop-3', name: 'sizeProp', type: 'number', componentId: 'comp-2' },
      ];

      const result = propReducer(initialState, setProps(props));

      expect(result.ids).toEqual(['prop-1', 'prop-2', 'prop-3']);
      expect(Object.keys(result.entities)).toHaveLength(3);
      expect(result.byComponent['comp-1']).toEqual(['prop-1', 'prop-2']);
      expect(result.byComponent['comp-2']).toEqual(['prop-3']);
    });

    it('should not add duplicate props', () => {
      const state = {
        ...initialState,
        ids: ['prop-1'],
        entities: {
          'prop-1': { id: 'prop-1', name: 'textProp', componentId: 'comp-1' },
        },
        byComponent: {
          'comp-1': ['prop-1'],
        },
      };

      const props = [
        { id: 'prop-1', name: 'textProp', componentId: 'comp-1' },
        { id: 'prop-2', name: 'colorProp', componentId: 'comp-1' },
      ];

      const result = propReducer(state, setProps(props));

      expect(result.ids).toEqual(['prop-1', 'prop-2']);
      expect(result.byComponent['comp-1']).toEqual(['prop-1', 'prop-2']);
    });

    it('should handle props without componentId', () => {
      const props = [
        { id: 'prop-1', name: 'textProp', type: 'string' },
      ];

      const result = propReducer(initialState, setProps(props));

      expect(result.ids).toEqual(['prop-1']);
      expect(result.entities['prop-1']).toEqual(props[0]);
      expect(result.byComponent).toEqual({});
    });

    it('should not add duplicate prop IDs to byComponent', () => {
      const state = {
        ...initialState,
        ids: ['prop-1'],
        entities: {
          'prop-1': { id: 'prop-1', name: 'textProp', componentId: 'comp-1' },
        },
        byComponent: {
          'comp-1': ['prop-1'],
        },
      };

      const props = [
        { id: 'prop-1', name: 'textProp', componentId: 'comp-1' },
      ];

      const result = propReducer(state, setProps(props));

      expect(result.byComponent['comp-1']).toEqual(['prop-1']); // No duplicate
    });
  });

  describe('Data Actions - addProp', () => {
    it('should add string prop with default value', () => {
      const result = propReducer(initialState, addProp({
        componentId: 'comp-1',
        type: 'string',
      }));

      expect(result.ids).toHaveLength(1);
      const propId = result.ids[0];
      expect(result.entities[propId]).toMatchObject({
        id: propId,
        name: 'stringProp',
        kind: ENTITY_KINDS.PROP,
        type: 'string',
        componentId: 'comp-1',
        defaultValue: '',
      });
      expect(result.byComponent['comp-1']).toEqual([propId]);
    });

    it('should add number prop with default value 0', () => {
      const result = propReducer(initialState, addProp({
        componentId: 'comp-1',
        type: 'number',
      }));

      const propId = result.ids[0];
      expect(result.entities[propId].defaultValue).toBe(0);
      expect(result.entities[propId].name).toBe('numberProp');
    });

    it('should add boolean prop with default value false', () => {
      const result = propReducer(initialState, addProp({
        componentId: 'comp-1',
        type: 'boolean',
      }));

      const propId = result.ids[0];
      expect(result.entities[propId].defaultValue).toBe(false);
      expect(result.entities[propId].name).toBe('booleanProp');
    });

    it('should add color prop with default value #000000', () => {
      const result = propReducer(initialState, addProp({
        componentId: 'comp-1',
        type: 'color',
      }));

      const propId = result.ids[0];
      expect(result.entities[propId].defaultValue).toBe('#000000');
      expect(result.entities[propId].name).toBe('colorProp');
    });

    it('should log componentId and type to console', () => {
      propReducer(initialState, addProp({
        componentId: 'comp-1',
        type: 'string',
      }));

      expect(console.log).toHaveBeenCalledWith('[addProp] componentId: ', 'comp-1');
      expect(console.log).toHaveBeenCalledWith('[addProp] type: ', 'string');
    });

    it('should add prop to existing component', () => {
      const state = {
        ...initialState,
        ids: ['prop-1'],
        entities: {
          'prop-1': { id: 'prop-1', name: 'textProp', componentId: 'comp-1' },
        },
        byComponent: {
          'comp-1': ['prop-1'],
        },
      };

      const result = propReducer(state, addProp({
        componentId: 'comp-1',
        type: 'number',
      }));

      expect(result.ids).toHaveLength(2);
      expect(result.byComponent['comp-1']).toHaveLength(2);
    });

    it('should not add duplicate prop ID', () => {
      const state = {
        ...initialState,
        ids: ['mock-uuid-prop-1234'],
        entities: {
          'mock-uuid-prop-1234': { id: 'mock-uuid-prop-1234', name: 'existing' },
        },
      };

      const result = propReducer(state, addProp({
        componentId: 'comp-1',
        type: 'string',
      }));

      expect(result.ids).toEqual(['mock-uuid-prop-1234']); // No duplicate
    });

    it('should generate UUID for prop ID', () => {
      const result = propReducer(initialState, addProp({
        componentId: 'comp-1',
        type: 'string',
      }));

      expect(result.ids[0]).toBe('mock-uuid-prop-1234');
    });
  });

  describe('Data Actions - updateProp', () => {
    it('should update prop name', () => {
      const state = {
        ...initialState,
        ids: ['prop-1'],
        entities: {
          'prop-1': { id: 'prop-1', name: 'textProp', type: 'string' },
        },
      };

      const result = propReducer(state, updateProp({
        id: 'prop-1',
        name: 'updatedProp',
      }));

      expect(result.entities['prop-1'].name).toBe('updatedProp');
    });

    it('should update multiple properties', () => {
      const state = {
        ...initialState,
        ids: ['prop-1'],
        entities: {
          'prop-1': { id: 'prop-1', name: 'textProp', type: 'string', defaultValue: '' },
        },
      };

      const result = propReducer(state, updateProp({
        id: 'prop-1',
        name: 'newName',
        defaultValue: 'Hello',
        description: 'A text prop',
      }));

      expect(result.entities['prop-1'].name).toBe('newName');
      expect(result.entities['prop-1'].defaultValue).toBe('Hello');
      expect(result.entities['prop-1'].description).toBe('A text prop');
    });

    it('should handle non-existent prop gracefully', () => {
      const result = propReducer(initialState, updateProp({
        id: 'prop-1',
        name: 'updated',
      }));

      expect(result.entities['prop-1']).toBeUndefined();
    });

    it('should preserve other properties when updating', () => {
      const state = {
        ...initialState,
        ids: ['prop-1'],
        entities: {
          'prop-1': {
            id: 'prop-1',
            name: 'textProp',
            type: 'string',
            componentId: 'comp-1',
            defaultValue: '',
          },
        },
      };

      const result = propReducer(state, updateProp({
        id: 'prop-1',
        name: 'updatedProp',
      }));

      expect(result.entities['prop-1'].type).toBe('string');
      expect(result.entities['prop-1'].componentId).toBe('comp-1');
      expect(result.entities['prop-1'].defaultValue).toBe('');
    });
  });

  describe('Data Actions - deleteProp', () => {
    it('should delete prop from state', () => {
      const state = {
        ...initialState,
        ids: ['prop-1', 'prop-2'],
        entities: {
          'prop-1': { id: 'prop-1', name: 'textProp', componentId: 'comp-1' },
          'prop-2': { id: 'prop-2', name: 'colorProp', componentId: 'comp-1' },
        },
        byComponent: {
          'comp-1': ['prop-1', 'prop-2'],
        },
      };

      const result = propReducer(state, deleteProp('prop-1'));

      expect(result.ids).toEqual(['prop-2']);
      expect(result.entities['prop-1']).toBeUndefined();
      expect(result.byComponent['comp-1']).toEqual(['prop-2']);
    });

    it('should delete last prop from component', () => {
      const state = {
        ...initialState,
        ids: ['prop-1'],
        entities: {
          'prop-1': { id: 'prop-1', name: 'textProp', componentId: 'comp-1' },
        },
        byComponent: {
          'comp-1': ['prop-1'],
        },
      };

      const result = propReducer(state, deleteProp('prop-1'));

      expect(result.ids).toEqual([]);
      expect(result.entities).toEqual({});
      expect(result.byComponent['comp-1']).toEqual([]);
    });

    it('should handle non-existent prop gracefully', () => {
      const state = {
        ...initialState,
        ids: ['prop-1'],
        entities: {
          'prop-1': { id: 'prop-1', name: 'textProp' },
        },
      };

      const result = propReducer(state, deleteProp('prop-2'));

      expect(result.ids).toEqual(['prop-1']);
      expect(result.entities['prop-1']).toBeDefined();
    });

    it('should handle prop without componentId', () => {
      const state = {
        ...initialState,
        ids: ['prop-1'],
        entities: {
          'prop-1': { id: 'prop-1', name: 'textProp' },
        },
      };

      const result = propReducer(state, deleteProp('prop-1'));

      expect(result.ids).toEqual([]);
      expect(result.entities['prop-1']).toBeUndefined();
    });
  });

  describe('Combined Actions', () => {
    it('should handle add, select, and delete workflow', () => {
      let state = initialState;

      state = propReducer(state, addProp({ componentId: 'comp-1', type: 'string' }));
      const propId = state.ids[0];

      state = propReducer(state, setSelectedPropId(propId));
      expect(state.ui.selectedPropId).toBe(propId);

      state = propReducer(state, deleteProp(propId));
      expect(state.ids).toEqual([]);
      // Note: selectedPropId is NOT automatically cleared
      expect(state.ui.selectedPropId).toBe(propId);
    });

    it('should handle add, update, and select workflow', () => {
      let state = initialState;

      state = propReducer(state, addProp({ componentId: 'comp-1', type: 'string' }));
      const propId = state.ids[0];

      state = propReducer(state, updateProp({ id: propId, name: 'updatedProp' }));
      state = propReducer(state, setSelectedPropId(propId));

      expect(state.entities[propId].name).toBe('updatedProp');
      expect(state.ui.selectedPropId).toBe(propId);
    });

    it('should handle setProps and select workflow', () => {
      let state = initialState;

      const props = [
        { id: 'prop-1', name: 'textProp', componentId: 'comp-1' },
        { id: 'prop-2', name: 'colorProp', componentId: 'comp-1' },
      ];

      state = propReducer(state, setProps(props));
      state = propReducer(state, setSelectedPropId('prop-1'));
      state = propReducer(state, setHoveredPropId('prop-2'));

      expect(state.ids).toHaveLength(2);
      expect(state.ui.selectedPropId).toBe('prop-1');
      expect(state.ui.hoveredPropId).toBe('prop-2');
    });
  });

  describe('State Immutability', () => {
    it('should not mutate original state when adding prop', () => {
      const state = {
        ...initialState,
        ids: ['prop-1'],
        entities: { 'prop-1': { id: 'prop-1', name: 'textProp' } },
      };

      const originalState = JSON.parse(JSON.stringify(state));

      propReducer(state, addProp({ componentId: 'comp-1', type: 'string' }));

      expect(state).toEqual(originalState);
    });

    it('should not mutate original state when updating prop', () => {
      const state = {
        ...initialState,
        ids: ['prop-1'],
        entities: { 'prop-1': { id: 'prop-1', name: 'textProp' } },
      };

      const originalState = JSON.parse(JSON.stringify(state));

      propReducer(state, updateProp({ id: 'prop-1', name: 'updated' }));

      expect(state).toEqual(originalState);
    });
  });
});

