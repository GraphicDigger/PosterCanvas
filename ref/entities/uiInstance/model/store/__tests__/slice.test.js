// ===================================================================
// Unit Tests for uiInstance Redux Slice
// Coverage Target: 100%
// Phase 1 - Redux Slices (HIGH IMPACT - 38 lines, 6-7x efficiency)
// Risk: LOW (Redux Toolkit, predictable state management)
// ===================================================================

import { describe, it, expect, beforeEach } from 'vitest';
import reducer, {
  setInstances,
  setHoveredInstanceId,
  setFocusedInstanceId,
  setSelectedInstanceId,
  updateInstance,
  updateInstanceStyle,
  updateInstanceProp,
} from '../slice';

describe('uiInstance Redux Slice', () => {
  let initialState;

  beforeEach(() => {
    initialState = {
      ids: [],
      entities: {},
      ownership: {},
      ui: {
        hoveredInstanceId: null,
        focusedInstanceId: null,
        selectedInstanceId: null,
      },
    };
  });

  describe('Initial State', () => {
    it('should return initial state', () => {
      const state = reducer(undefined, { type: '@@INIT' });

      expect(state.ids).toEqual([]);
      expect(state.entities).toEqual({});
      expect(state.ownership).toEqual({});
      expect(state.ui.hoveredInstanceId).toBeNull();
      expect(state.ui.focusedInstanceId).toBeNull();
      expect(state.ui.selectedInstanceId).toBeNull();
    });
  });

  describe('UI State Actions', () => {
    describe('setHoveredInstanceId', () => {
      it('should set hovered instance ID', () => {
        const state = reducer(initialState, setHoveredInstanceId('inst-1'));

        expect(state.ui.hoveredInstanceId).toBe('inst-1');
      });

      it('should update hovered instance ID', () => {
        const stateWithHovered = {
          ...initialState,
          ui: { ...initialState.ui, hoveredInstanceId: 'inst-1' },
        };

        const state = reducer(stateWithHovered, setHoveredInstanceId('inst-2'));

        expect(state.ui.hoveredInstanceId).toBe('inst-2');
      });

      it('should clear hovered instance ID', () => {
        const stateWithHovered = {
          ...initialState,
          ui: { ...initialState.ui, hoveredInstanceId: 'inst-1' },
        };

        const state = reducer(stateWithHovered, setHoveredInstanceId(null));

        expect(state.ui.hoveredInstanceId).toBeNull();
      });
    });

    describe('setFocusedInstanceId', () => {
      it('should set focused instance ID', () => {
        const state = reducer(initialState, setFocusedInstanceId('inst-1'));

        expect(state.ui.focusedInstanceId).toBe('inst-1');
      });

      it('should update focused instance ID', () => {
        const stateWithFocused = {
          ...initialState,
          ui: { ...initialState.ui, focusedInstanceId: 'inst-1' },
        };

        const state = reducer(stateWithFocused, setFocusedInstanceId('inst-2'));

        expect(state.ui.focusedInstanceId).toBe('inst-2');
      });

      it('should clear focused instance ID', () => {
        const stateWithFocused = {
          ...initialState,
          ui: { ...initialState.ui, focusedInstanceId: 'inst-1' },
        };

        const state = reducer(stateWithFocused, setFocusedInstanceId(null));

        expect(state.ui.focusedInstanceId).toBeNull();
      });
    });

    describe('setSelectedInstanceId', () => {
      it('should set selected instance ID', () => {
        const state = reducer(initialState, setSelectedInstanceId('inst-1'));

        expect(state.ui.selectedInstanceId).toBe('inst-1');
      });

      it('should update selected instance ID', () => {
        const stateWithSelected = {
          ...initialState,
          ui: { ...initialState.ui, selectedInstanceId: 'inst-1' },
        };

        const state = reducer(stateWithSelected, setSelectedInstanceId('inst-2'));

        expect(state.ui.selectedInstanceId).toBe('inst-2');
      });

      it('should clear selected instance ID', () => {
        const stateWithSelected = {
          ...initialState,
          ui: { ...initialState.ui, selectedInstanceId: 'inst-1' },
        };

        const state = reducer(stateWithSelected, setSelectedInstanceId(null));

        expect(state.ui.selectedInstanceId).toBeNull();
      });
    });
  });

  describe('Query Actions', () => {
    describe('setInstances', () => {
      it('should set instances from array', () => {
        const instances = [
          { id: 'inst-1', name: 'Instance 1', ownership: { type: 'component', componentId: 'comp-1' } },
          { id: 'inst-2', name: 'Instance 2', ownership: { type: 'component', componentId: 'comp-2' } },
        ];

        const state = reducer(initialState, setInstances(instances));

        expect(state.ids).toEqual(['inst-1', 'inst-2']);
        expect(state.entities['inst-1']).toEqual(instances[0]);
        expect(state.entities['inst-2']).toEqual(instances[1]);
      });

      it('should replace existing instances', () => {
        const stateWithInstances = {
          ...initialState,
          ids: ['inst-old'],
          entities: { 'inst-old': { id: 'inst-old', name: 'Old' } },
        };

        const newInstances = [
          { id: 'inst-1', name: 'Instance 1', ownership: { type: 'component', componentId: 'comp-1' } },
        ];

        const state = reducer(stateWithInstances, setInstances(newInstances));

        expect(state.ids).toEqual(['inst-1']);
        expect(state.entities['inst-old']).toBeUndefined();
        expect(state.entities['inst-1']).toEqual(newInstances[0]);
      });

      it('should handle empty array', () => {
        const stateWithInstances = {
          ...initialState,
          ids: ['inst-1'],
          entities: { 'inst-1': { id: 'inst-1', name: 'Instance 1' } },
        };

        const state = reducer(stateWithInstances, setInstances([]));

        expect(state.ids).toEqual([]);
        expect(state.entities).toEqual({});
      });

      it('should update ownership when setting instances', () => {
        const instances = [
          { id: 'inst-1', ownership: { type: 'component', componentId: 'comp-1' } },
          { id: 'inst-2', ownership: { type: 'component', componentId: 'comp-1' } },
          { id: 'inst-3', ownership: { type: 'screen', screenId: 'screen-1' } },
        ];

        const state = reducer(initialState, setInstances(instances));

        expect(state.ownership.component).toBeDefined();
        expect(state.ownership.component['comp-1']).toContain('inst-1');
        expect(state.ownership.component['comp-1']).toContain('inst-2');
        expect(state.ownership.screen).toBeDefined();
        expect(state.ownership.screen['screen-1']).toContain('inst-3');
      });

      it('should clear ownership before setting new instances', () => {
        const stateWithOwnership = {
          ...initialState,
          ids: ['inst-old'],
          entities: { 'inst-old': { id: 'inst-old' } },
          ownership: { component: { 'comp-old': ['inst-old'] } },
        };

        const newInstances = [
          { id: 'inst-1', ownership: { type: 'component', componentId: 'comp-1' } },
        ];

        const state = reducer(stateWithOwnership, setInstances(newInstances));

        expect(state.ownership.component['comp-old']).toBeUndefined();
        expect(state.ownership.component['comp-1']).toContain('inst-1');
      });
    });
  });

  describe('Mutation Actions', () => {
    describe('updateInstance', () => {
      it('should update existing instance', () => {
        const stateWithInstance = {
          ...initialState,
          ids: ['inst-1'],
          entities: { 'inst-1': { id: 'inst-1', name: 'Original' } },
        };

        const state = reducer(stateWithInstance, updateInstance({
          id: 'inst-1',
          name: 'Updated',
        }));

        expect(state.entities['inst-1'].name).toBe('Updated');
      });

      it('should partially update instance', () => {
        const stateWithInstance = {
          ...initialState,
          ids: ['inst-1'],
          entities: {
            'inst-1': {
              id: 'inst-1',
              name: 'Instance 1',
              description: 'Original description',
            },
          },
        };

        const state = reducer(stateWithInstance, updateInstance({
          id: 'inst-1',
          description: 'Updated description',
        }));

        expect(state.entities['inst-1'].name).toBe('Instance 1');
        expect(state.entities['inst-1'].description).toBe('Updated description');
      });

      it('should handle updating non-existent instance', () => {
        const state = reducer(initialState, updateInstance({
          id: 'non-existent',
          name: 'Updated',
        }));

        expect(state.entities['non-existent']).toBeUndefined();
      });

      it('should preserve instance ID when updating', () => {
        const stateWithInstance = {
          ...initialState,
          ids: ['inst-1'],
          entities: { 'inst-1': { id: 'inst-1', name: 'Original' } },
        };

        const state = reducer(stateWithInstance, updateInstance({
          id: 'inst-1',
          name: 'Updated',
        }));

        expect(state.entities['inst-1'].id).toBe('inst-1');
      });
    });

    describe('updateInstanceStyle', () => {
      it('should update instance style', () => {
        const stateWithInstance = {
          ...initialState,
          ids: ['inst-1'],
          entities: { 'inst-1': { id: 'inst-1', properties: {} } },
        };

        const state = reducer(stateWithInstance, updateInstanceStyle({
          id: 'inst-1',
          style: { color: 'red', fontSize: '16px' },
        }));

        expect(state.entities['inst-1'].properties.style.color).toBe('red');
        expect(state.entities['inst-1'].properties.style.fontSize).toBe('16px');
      });

      it('should merge with existing style', () => {
        const stateWithInstance = {
          ...initialState,
          ids: ['inst-1'],
          entities: {
            'inst-1': {
              id: 'inst-1',
              properties: {
                style: { color: 'blue', padding: '10px' },
              },
            },
          },
        };

        const state = reducer(stateWithInstance, updateInstanceStyle({
          id: 'inst-1',
          style: { color: 'red', fontSize: '16px' },
        }));

        expect(state.entities['inst-1'].properties.style.color).toBe('red');
        expect(state.entities['inst-1'].properties.style.padding).toBe('10px');
        expect(state.entities['inst-1'].properties.style.fontSize).toBe('16px');
      });

      it('should create properties object if missing', () => {
        const stateWithInstance = {
          ...initialState,
          ids: ['inst-1'],
          entities: { 'inst-1': { id: 'inst-1' } },
        };

        const state = reducer(stateWithInstance, updateInstanceStyle({
          id: 'inst-1',
          style: { color: 'red' },
        }));

        expect(state.entities['inst-1'].properties).toBeDefined();
        expect(state.entities['inst-1'].properties.style.color).toBe('red');
      });

      it('should handle updating non-existent instance', () => {
        const state = reducer(initialState, updateInstanceStyle({
          id: 'non-existent',
          style: { color: 'red' },
        }));

        expect(state.entities['non-existent']).toBeUndefined();
      });
    });

    describe('updateInstanceProp', () => {
      it('should update instance prop', () => {
        const stateWithInstance = {
          ...initialState,
          ids: ['inst-1'],
          entities: { 'inst-1': { id: 'inst-1', override: {} } },
        };

        const state = reducer(stateWithInstance, updateInstanceProp({
          instanceId: 'inst-1',
          propId: 'prop-1',
          updates: { value: 'new value' },
        }));

        expect(state.entities['inst-1'].override.props['prop-1'].value).toBe('new value');
      });

      it('should merge with existing prop', () => {
        const stateWithInstance = {
          ...initialState,
          ids: ['inst-1'],
          entities: {
            'inst-1': {
              id: 'inst-1',
              override: {
                props: {
                  'prop-1': { value: 'old value', type: 'string' },
                },
              },
            },
          },
        };

        const state = reducer(stateWithInstance, updateInstanceProp({
          instanceId: 'inst-1',
          propId: 'prop-1',
          updates: { value: 'new value' },
        }));

        expect(state.entities['inst-1'].override.props['prop-1'].value).toBe('new value');
        expect(state.entities['inst-1'].override.props['prop-1'].type).toBe('string');
      });

      it('should create override structure if missing', () => {
        const stateWithInstance = {
          ...initialState,
          ids: ['inst-1'],
          entities: { 'inst-1': { id: 'inst-1' } },
        };

        const state = reducer(stateWithInstance, updateInstanceProp({
          instanceId: 'inst-1',
          propId: 'prop-1',
          updates: { value: 'new value' },
        }));

        expect(state.entities['inst-1'].override).toBeDefined();
        expect(state.entities['inst-1'].override.props).toBeDefined();
        expect(state.entities['inst-1'].override.props['prop-1'].value).toBe('new value');
      });

      it('should handle updating non-existent instance', () => {
        const state = reducer(initialState, updateInstanceProp({
          instanceId: 'non-existent',
          propId: 'prop-1',
          updates: { value: 'new value' },
        }));

        expect(state.entities['non-existent']).toBeUndefined();
      });

      it('should handle multiple props for same instance', () => {
        const stateWithInstance = {
          ...initialState,
          ids: ['inst-1'],
          entities: { 'inst-1': { id: 'inst-1' } },
        };

        let state = reducer(stateWithInstance, updateInstanceProp({
          instanceId: 'inst-1',
          propId: 'prop-1',
          updates: { value: 'value 1' },
        }));

        state = reducer(state, updateInstanceProp({
          instanceId: 'inst-1',
          propId: 'prop-2',
          updates: { value: 'value 2' },
        }));

        expect(state.entities['inst-1'].override.props['prop-1'].value).toBe('value 1');
        expect(state.entities['inst-1'].override.props['prop-2'].value).toBe('value 2');
      });
    });
  });

  describe('Complex Scenarios', () => {
    it('should handle full instance lifecycle', () => {
      let state = initialState;

      // Set instances
      const instances = [
        { id: 'inst-1', name: 'Instance 1', ownership: { type: 'component', componentId: 'comp-1' } },
      ];
      state = reducer(state, setInstances(instances));
      expect(state.ids).toContain('inst-1');

      // Select instance
      state = reducer(state, setSelectedInstanceId('inst-1'));
      expect(state.ui.selectedInstanceId).toBe('inst-1');

      // Update instance
      state = reducer(state, updateInstance({ id: 'inst-1', name: 'Updated Instance' }));
      expect(state.entities['inst-1'].name).toBe('Updated Instance');

      // Update style
      state = reducer(state, updateInstanceStyle({ id: 'inst-1', style: { color: 'red' } }));
      expect(state.entities['inst-1'].properties.style.color).toBe('red');

      // Update prop
      state = reducer(state, updateInstanceProp({
        instanceId: 'inst-1',
        propId: 'prop-1',
        updates: { value: 'test' },
      }));
      expect(state.entities['inst-1'].override.props['prop-1'].value).toBe('test');
    });

    it('should handle multiple instances with different ownership', () => {
      const instances = [
        { id: 'inst-1', ownership: { type: 'component', componentId: 'comp-1' } },
        { id: 'inst-2', ownership: { type: 'component', componentId: 'comp-1' } },
        { id: 'inst-3', ownership: { type: 'screen', screenId: 'screen-1' } },
        { id: 'inst-4', ownership: { type: 'screen', screenId: 'screen-2' } },
      ];

      const state = reducer(initialState, setInstances(instances));

      expect(state.ids).toHaveLength(4);
      expect(state.ownership.component['comp-1']).toHaveLength(2);
      expect(state.ownership.screen['screen-1']).toHaveLength(1);
      expect(state.ownership.screen['screen-2']).toHaveLength(1);
    });

    it('should handle instance with complex properties', () => {
      const stateWithInstance = {
        ...initialState,
        ids: ['inst-1'],
        entities: { 'inst-1': { id: 'inst-1' } },
      };

      let state = reducer(stateWithInstance, updateInstanceStyle({
        id: 'inst-1',
        style: {
          color: 'red',
          fontSize: '16px',
          padding: '10px',
          margin: '5px',
        },
      }));

      state = reducer(state, updateInstanceProp({
        instanceId: 'inst-1',
        propId: 'prop-1',
        updates: { value: 'value 1', type: 'string' },
      }));

      state = reducer(state, updateInstanceProp({
        instanceId: 'inst-1',
        propId: 'prop-2',
        updates: { value: 'value 2', type: 'number' },
      }));

      expect(state.entities['inst-1'].properties.style).toHaveProperty('color');
      expect(state.entities['inst-1'].properties.style).toHaveProperty('fontSize');
      expect(state.entities['inst-1'].override.props).toHaveProperty('prop-1');
      expect(state.entities['inst-1'].override.props).toHaveProperty('prop-2');
    });
  });

  describe('State Structure', () => {
    it('should maintain correct state structure', () => {
      const state = reducer(undefined, { type: '@@INIT' });

      expect(state).toHaveProperty('ids');
      expect(state).toHaveProperty('entities');
      expect(state).toHaveProperty('ownership');
      expect(state).toHaveProperty('ui');
      expect(state.ui).toHaveProperty('hoveredInstanceId');
      expect(state.ui).toHaveProperty('focusedInstanceId');
      expect(state.ui).toHaveProperty('selectedInstanceId');
    });

    it('should preserve ownership structure', () => {
      const instances = [
        { id: 'inst-1', ownership: { type: 'component', componentId: 'comp-1' } },
        { id: 'inst-2', ownership: { type: 'screen', screenId: 'screen-1' } },
      ];

      const state = reducer(initialState, setInstances(instances));

      expect(state.ownership).toHaveProperty('component');
      expect(state.ownership).toHaveProperty('screen');
      expect(Array.isArray(state.ownership.component['comp-1'])).toBe(true);
      expect(Array.isArray(state.ownership.screen['screen-1'])).toBe(true);
    });
  });

  describe('Edge Cases', () => {
    it('should handle rapid UI state changes', () => {
      let state = initialState;

      state = reducer(state, setHoveredInstanceId('inst-1'));
      state = reducer(state, setHoveredInstanceId('inst-2'));
      state = reducer(state, setHoveredInstanceId('inst-3'));
      state = reducer(state, setHoveredInstanceId(null));

      expect(state.ui.hoveredInstanceId).toBeNull();
    });

    it('should handle updating style multiple times', () => {
      const stateWithInstance = {
        ...initialState,
        ids: ['inst-1'],
        entities: { 'inst-1': { id: 'inst-1' } },
      };

      let state = reducer(stateWithInstance, updateInstanceStyle({
        id: 'inst-1',
        style: { color: 'red' },
      }));

      state = reducer(state, updateInstanceStyle({
        id: 'inst-1',
        style: { fontSize: '16px' },
      }));

      state = reducer(state, updateInstanceStyle({
        id: 'inst-1',
        style: { color: 'blue' },
      }));

      expect(state.entities['inst-1'].properties.style.color).toBe('blue');
      expect(state.entities['inst-1'].properties.style.fontSize).toBe('16px');
    });

    it('should handle updating same prop multiple times', () => {
      const stateWithInstance = {
        ...initialState,
        ids: ['inst-1'],
        entities: { 'inst-1': { id: 'inst-1' } },
      };

      let state = reducer(stateWithInstance, updateInstanceProp({
        instanceId: 'inst-1',
        propId: 'prop-1',
        updates: { value: 'value 1' },
      }));

      state = reducer(state, updateInstanceProp({
        instanceId: 'inst-1',
        propId: 'prop-1',
        updates: { value: 'value 2' },
      }));

      state = reducer(state, updateInstanceProp({
        instanceId: 'inst-1',
        propId: 'prop-1',
        updates: { value: 'value 3', type: 'string' },
      }));

      expect(state.entities['inst-1'].override.props['prop-1'].value).toBe('value 3');
      expect(state.entities['inst-1'].override.props['prop-1'].type).toBe('string');
    });
  });
});

