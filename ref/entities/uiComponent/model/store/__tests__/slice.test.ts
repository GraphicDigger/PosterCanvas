// ===================================================================
// Unit Tests for uiComponent Redux Slice (TypeScript)
// Coverage Target: 100%
// Phase 1 - Redux Slices (HIGH IMPACT - 90 lines)
// Risk: LOW (Redux Toolkit, component state management)
// ===================================================================

import { describe, it, expect, beforeEach, vi } from 'vitest';
import componentReducer, {
  setHoveredComponentId,
  setFocusedComponentId,
  setSelectedComponentId,
  resetSelectedComponent,
  setComponents,
  addComponent,
  updateComponent,
  removeComponent,
} from '../slice';

describe('uiComponent Redux Slice', () => {
  let initialState: any;

  beforeEach(() => {
    initialState = {
      ids: [],
      entities: {},
      ui: {
        hoveredComponentId: null,
        focusedComponentId: null,
        selectedComponentId: null,
      },
    };

    // Mock console.log
    vi.spyOn(console, 'log').mockImplementation(() => {});
  });

  describe('Initial State', () => {
    it('should return initial state when undefined state is passed', () => {
      const result = componentReducer(undefined, { type: '@@INIT' });

      expect(result).toEqual(initialState);
    });

    it('should have empty ids and entities', () => {
      const result = componentReducer(undefined, { type: '@@INIT' });

      expect(result.ids).toEqual([]);
      expect(result.entities).toEqual({});
    });

    it('should have null UI state values', () => {
      const result = componentReducer(undefined, { type: '@@INIT' });

      expect(result.ui.hoveredComponentId).toBeNull();
      expect(result.ui.focusedComponentId).toBeNull();
      expect(result.ui.selectedComponentId).toBeNull();
    });
  });

  describe('UI Actions - setHoveredComponentId', () => {
    it('should set hovered component ID', () => {
      const result = componentReducer(initialState, setHoveredComponentId('comp-1'));

      expect(result.ui.hoveredComponentId).toBe('comp-1');
    });

    it('should update hovered component ID', () => {
      const state = {
        ...initialState,
        ui: { ...initialState.ui, hoveredComponentId: 'comp-1' },
      };

      const result = componentReducer(state, setHoveredComponentId('comp-2'));

      expect(result.ui.hoveredComponentId).toBe('comp-2');
    });

    it('should allow setting to null', () => {
      const state = {
        ...initialState,
        ui: { ...initialState.ui, hoveredComponentId: 'comp-1' },
      };

      const result = componentReducer(state, setHoveredComponentId(null));

      expect(result.ui.hoveredComponentId).toBeNull();
    });
  });

  describe('UI Actions - setFocusedComponentId', () => {
    it('should set focused component ID', () => {
      const result = componentReducer(initialState, setFocusedComponentId('comp-1'));

      expect(result.ui.focusedComponentId).toBe('comp-1');
    });

    it('should update focused component ID', () => {
      const state = {
        ...initialState,
        ui: { ...initialState.ui, focusedComponentId: 'comp-1' },
      };

      const result = componentReducer(state, setFocusedComponentId('comp-2'));

      expect(result.ui.focusedComponentId).toBe('comp-2');
    });

    it('should allow setting to null', () => {
      const state = {
        ...initialState,
        ui: { ...initialState.ui, focusedComponentId: 'comp-1' },
      };

      const result = componentReducer(state, setFocusedComponentId(null));

      expect(result.ui.focusedComponentId).toBeNull();
    });
  });

  describe('UI Actions - setSelectedComponentId', () => {
    it('should set selected component ID', () => {
      const result = componentReducer(initialState, setSelectedComponentId('comp-1'));

      expect(result.ui.selectedComponentId).toBe('comp-1');
    });

    it('should log selected component ID to console', () => {
      componentReducer(initialState, setSelectedComponentId('comp-1'));

      expect(console.log).toHaveBeenCalledWith('[store] selectedComponentId', 'comp-1');
    });

    it('should update selected component ID', () => {
      const state = {
        ...initialState,
        ui: { ...initialState.ui, selectedComponentId: 'comp-1' },
      };

      const result = componentReducer(state, setSelectedComponentId('comp-2'));

      expect(result.ui.selectedComponentId).toBe('comp-2');
    });

    it('should allow setting to null', () => {
      const state = {
        ...initialState,
        ui: { ...initialState.ui, selectedComponentId: 'comp-1' },
      };

      const result = componentReducer(state, setSelectedComponentId(null));

      expect(result.ui.selectedComponentId).toBeNull();
    });
  });

  describe('UI Actions - resetSelectedComponent', () => {
    it('should reset selected component to null', () => {
      const state = {
        ...initialState,
        ui: { ...initialState.ui, selectedComponentId: 'comp-1' },
      };

      const result = componentReducer(state, resetSelectedComponent());

      expect(result.ui.selectedComponentId).toBeNull();
    });

    it('should do nothing if already null', () => {
      const result = componentReducer(initialState, resetSelectedComponent());

      expect(result.ui.selectedComponentId).toBeNull();
    });

    it('should not affect other UI state', () => {
      const state = {
        ...initialState,
        ui: {
          hoveredComponentId: 'comp-1',
          focusedComponentId: 'comp-2',
          selectedComponentId: 'comp-3',
        },
      };

      const result = componentReducer(state, resetSelectedComponent());

      expect(result.ui.hoveredComponentId).toBe('comp-1');
      expect(result.ui.focusedComponentId).toBe('comp-2');
      expect(result.ui.selectedComponentId).toBeNull();
    });
  });

  describe('Data Actions - setComponents', () => {
    it('should set single component', () => {
      const components = [
        { id: 'comp-1', name: 'Button', type: 'button' },
      ];

      const result = componentReducer(initialState, setComponents(components));

      expect(result.ids).toEqual(['comp-1']);
      expect(result.entities['comp-1']).toEqual(components[0]);
    });

    it('should set multiple components', () => {
      const components = [
        { id: 'comp-1', name: 'Button', type: 'button' },
        { id: 'comp-2', name: 'Input', type: 'input' },
        { id: 'comp-3', name: 'Card', type: 'container' },
      ];

      const result = componentReducer(initialState, setComponents(components));

      expect(result.ids).toEqual(['comp-1', 'comp-2', 'comp-3']);
      expect(Object.keys(result.entities)).toHaveLength(3);
      expect(result.entities['comp-1'].name).toBe('Button');
      expect(result.entities['comp-2'].name).toBe('Input');
      expect(result.entities['comp-3'].name).toBe('Card');
    });

    it('should replace existing components', () => {
      const state = {
        ...initialState,
        ids: ['old-1'],
        entities: { 'old-1': { id: 'old-1', name: 'Old' } },
      };

      const components = [
        { id: 'comp-1', name: 'New' },
      ];

      const result = componentReducer(state, setComponents(components));

      expect(result.ids).toEqual(['comp-1']);
      expect(result.entities['old-1']).toBeUndefined();
      expect(result.entities['comp-1']).toEqual(components[0]);
    });

    it('should handle empty components array', () => {
      const state = {
        ...initialState,
        ids: ['comp-1'],
        entities: { 'comp-1': { id: 'comp-1', name: 'Component' } },
      };

      const result = componentReducer(state, setComponents([]));

      expect(result.ids).toEqual([]);
      expect(result.entities).toEqual({});
    });

    it('should preserve all component properties', () => {
      const components = [
        {
          id: 'comp-1',
          name: 'Button',
          type: 'button',
          props: { text: 'Click me' },
          variants: ['default', 'hover'],
          metadata: { created: '2024-01-01' },
        },
      ];

      const result = componentReducer(initialState, setComponents(components));

      expect(result.entities['comp-1']).toEqual(components[0]);
      expect(result.entities['comp-1'].props).toEqual({ text: 'Click me' });
      expect(result.entities['comp-1'].variants).toEqual(['default', 'hover']);
    });
  });

  describe('Data Actions - addComponent', () => {
    it('should add component to empty state', () => {
      const component = { id: 'comp-1', name: 'Button', type: 'button' };

      const result = componentReducer(initialState, addComponent(component));

      expect(result.ids).toEqual(['comp-1']);
      expect(result.entities['comp-1']).toEqual(component);
    });

    it('should add component to existing components', () => {
      const state = {
        ...initialState,
        ids: ['comp-1'],
        entities: {
          'comp-1': { id: 'comp-1', name: 'Button' },
        },
      };

      const component = { id: 'comp-2', name: 'Input' };

      const result = componentReducer(state, addComponent(component));

      expect(result.ids).toEqual(['comp-1', 'comp-2']);
      expect(result.entities['comp-2']).toEqual(component);
    });

    it('should update existing component if ID already exists', () => {
      const state = {
        ...initialState,
        ids: ['comp-1'],
        entities: {
          'comp-1': { id: 'comp-1', name: 'Button', type: 'button' },
        },
      };

      const component = { id: 'comp-1', name: 'Updated Button', color: 'blue' };

      const result = componentReducer(state, addComponent(component));

      expect(result.ids).toEqual(['comp-1']); // No duplicate ID
      expect(result.entities['comp-1']).toEqual({
        id: 'comp-1',
        name: 'Updated Button',
        type: 'button',
        color: 'blue',
      });
    });

    it('should merge properties when updating existing component', () => {
      const state = {
        ...initialState,
        ids: ['comp-1'],
        entities: {
          'comp-1': {
            id: 'comp-1',
            name: 'Button',
            type: 'button',
            props: { text: 'Click' },
          },
        },
      };

      const component = { id: 'comp-1', color: 'blue' };

      const result = componentReducer(state, addComponent(component));

      expect(result.entities['comp-1']).toEqual({
        id: 'comp-1',
        name: 'Button',
        type: 'button',
        props: { text: 'Click' },
        color: 'blue',
      });
    });
  });

  describe('Data Actions - updateComponent', () => {
    it('should update component name', () => {
      const state = {
        ...initialState,
        ids: ['comp-1'],
        entities: {
          'comp-1': { id: 'comp-1', name: 'Button', type: 'button' },
        },
      };

      const result = componentReducer(state, updateComponent({
        id: 'comp-1',
        name: 'Updated Button',
      }));

      expect(result.entities['comp-1'].name).toBe('Updated Button');
      expect(result.entities['comp-1'].updatedAt).toBeDefined();
    });

    it('should update multiple properties', () => {
      const state = {
        ...initialState,
        ids: ['comp-1'],
        entities: {
          'comp-1': { id: 'comp-1', name: 'Button', type: 'button', color: 'red' },
        },
      };

      const result = componentReducer(state, updateComponent({
        id: 'comp-1',
        name: 'New Button',
        color: 'blue',
        size: 'large',
      }));

      expect(result.entities['comp-1'].name).toBe('New Button');
      expect(result.entities['comp-1'].color).toBe('blue');
      expect(result.entities['comp-1'].size).toBe('large');
    });

    it('should add updatedAt timestamp', () => {
      const state = {
        ...initialState,
        ids: ['comp-1'],
        entities: {
          'comp-1': { id: 'comp-1', name: 'Button' },
        },
      };

      const result = componentReducer(state, updateComponent({
        id: 'comp-1',
        updates: { name: 'Updated' },
      }));

      expect(result.entities['comp-1'].updatedAt).toBeDefined();
      expect(typeof result.entities['comp-1'].updatedAt).toBe('string');
    });

    it('should handle non-existent component gracefully', () => {
      const result = componentReducer(initialState, updateComponent({
        id: 'comp-1',
        updates: { name: 'Updated' },
      }));

      expect(result.entities['comp-1']).toBeUndefined();
    });

    it('should preserve other properties when updating', () => {
      const state = {
        ...initialState,
        ids: ['comp-1'],
        entities: {
          'comp-1': {
            id: 'comp-1',
            name: 'Button',
            type: 'button',
            props: { text: 'Click' },
            metadata: { foo: 'bar' },
          },
        },
      };

      const result = componentReducer(state, updateComponent({
        id: 'comp-1',
        updates: { name: 'Updated Button' },
      }));

      expect(result.entities['comp-1'].type).toBe('button');
      expect(result.entities['comp-1'].props).toEqual({ text: 'Click' });
      expect(result.entities['comp-1'].metadata).toEqual({ foo: 'bar' });
    });
  });

  describe('Data Actions - removeComponent', () => {
    it('should remove component from state', () => {
      const state = {
        ...initialState,
        ids: ['comp-1', 'comp-2'],
        entities: {
          'comp-1': { id: 'comp-1', name: 'Button' },
          'comp-2': { id: 'comp-2', name: 'Input' },
        },
      };

      const result = componentReducer(state, removeComponent('comp-1'));

      expect(result.ids).toEqual(['comp-2']);
      expect(result.entities['comp-1']).toBeUndefined();
      expect(result.entities['comp-2']).toBeDefined();
    });

    it('should remove last component', () => {
      const state = {
        ...initialState,
        ids: ['comp-1'],
        entities: {
          'comp-1': { id: 'comp-1', name: 'Button' },
        },
      };

      const result = componentReducer(state, removeComponent('comp-1'));

      expect(result.ids).toEqual([]);
      expect(result.entities).toEqual({});
    });

    it('should reset selectedComponentId if removing selected component', () => {
      const state = {
        ...initialState,
        ids: ['comp-1'],
        entities: {
          'comp-1': { id: 'comp-1', name: 'Button' },
        },
        ui: {
          ...initialState.ui,
          selectedComponentId: 'comp-1',
        },
      };

      const result = componentReducer(state, removeComponent('comp-1'));

      expect(result.ui.selectedComponentId).toBeNull();
    });

    it('should not reset selectedComponentId if removing different component', () => {
      const state = {
        ...initialState,
        ids: ['comp-1', 'comp-2'],
        entities: {
          'comp-1': { id: 'comp-1', name: 'Button' },
          'comp-2': { id: 'comp-2', name: 'Input' },
        },
        ui: {
          ...initialState.ui,
          selectedComponentId: 'comp-1',
        },
      };

      const result = componentReducer(state, removeComponent('comp-2'));

      expect(result.ui.selectedComponentId).toBe('comp-1');
    });

    it('should handle non-existent component gracefully', () => {
      const state = {
        ...initialState,
        ids: ['comp-1'],
        entities: {
          'comp-1': { id: 'comp-1', name: 'Button' },
        },
      };

      const result = componentReducer(state, removeComponent('comp-2'));

      expect(result.ids).toEqual(['comp-1']);
      expect(result.entities['comp-1']).toBeDefined();
    });

    it('should remove component from middle of list', () => {
      const state = {
        ...initialState,
        ids: ['comp-1', 'comp-2', 'comp-3'],
        entities: {
          'comp-1': { id: 'comp-1', name: 'Button' },
          'comp-2': { id: 'comp-2', name: 'Input' },
          'comp-3': { id: 'comp-3', name: 'Card' },
        },
      };

      const result = componentReducer(state, removeComponent('comp-2'));

      expect(result.ids).toEqual(['comp-1', 'comp-3']);
      expect(result.entities['comp-2']).toBeUndefined();
    });
  });

  describe('Combined Actions', () => {
    it('should handle add, select, and remove workflow', () => {
      let state = initialState;

      state = componentReducer(state, addComponent({ id: 'comp-1', name: 'Button' }));
      state = componentReducer(state, setSelectedComponentId('comp-1'));
      state = componentReducer(state, removeComponent('comp-1'));

      expect(state.ids).toEqual([]);
      expect(state.ui.selectedComponentId).toBeNull();
    });

    it('should handle add, update, and select workflow', () => {
      let state = initialState;

      state = componentReducer(state, addComponent({ id: 'comp-1', name: 'Button' }));
      state = componentReducer(state, updateComponent({ id: 'comp-1', name: 'Updated' }));
      state = componentReducer(state, setSelectedComponentId('comp-1'));

      expect(state.entities['comp-1'].name).toBe('Updated');
      expect(state.ui.selectedComponentId).toBe('comp-1');
    });

    it('should handle setComponents and select workflow', () => {
      let state = initialState;

      const components = [
        { id: 'comp-1', name: 'Button' },
        { id: 'comp-2', name: 'Input' },
      ];

      state = componentReducer(state, setComponents(components));
      state = componentReducer(state, setSelectedComponentId('comp-1'));
      state = componentReducer(state, setHoveredComponentId('comp-2'));

      expect(state.ids).toHaveLength(2);
      expect(state.ui.selectedComponentId).toBe('comp-1');
      expect(state.ui.hoveredComponentId).toBe('comp-2');
    });
  });

  describe('State Immutability', () => {
    it('should not mutate original state when adding component', () => {
      const state = {
        ...initialState,
        ids: ['comp-1'],
        entities: { 'comp-1': { id: 'comp-1', name: 'Button' } },
      };

      const originalState = JSON.parse(JSON.stringify(state));

      componentReducer(state, addComponent({ id: 'comp-2', name: 'Input' }));

      expect(state).toEqual(originalState);
    });

    it('should not mutate original state when updating component', () => {
      const state = {
        ...initialState,
        ids: ['comp-1'],
        entities: { 'comp-1': { id: 'comp-1', name: 'Button' } },
      };

      const originalState = JSON.parse(JSON.stringify(state));

      componentReducer(state, updateComponent({ id: 'comp-1', updates: { name: 'Updated' } }));

      expect(state).toEqual(originalState);
    });
  });
});

