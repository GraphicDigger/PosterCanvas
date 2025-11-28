// ===================================================================
// Unit Tests for UIInstance Slice
// CRITICAL BUSINESS LOGIC - UI Instance State Management
// Phase 1, Day 1 - Part 3 (30 tests)
// ===================================================================

import { describe, it, expect, beforeEach, vi } from 'vitest';
import instanceEntitySlice, {
  setInstances,
  setHoveredInstanceId,
  setFocusedInstanceId,
  setSelectedInstanceId,
  updateInstance,
  updateInstanceStyle,
  updateInstanceProp,
} from './slice';

// Mock ownershipManager
vi.mock('../../lib/ownershipManager', () => ({
  ownershipManager: {
    addOwnership: vi.fn(),
    removeOwnership: vi.fn(),
    clearOwnerships: vi.fn((state) => {
      state.ownership = {};
    }),
  },
}));

describe('UIInstance Slice', () => {
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

  // ===================================================================
  // PART 1: UI State Management (3 tests)
  // ===================================================================

  describe('UI State Management', () => {
    it('should set hovered instance ID', () => {
      const state = instanceEntitySlice(initialState, setHoveredInstanceId('inst-1'));
      expect(state.ui.hoveredInstanceId).toBe('inst-1');
    });

    it('should set focused instance ID', () => {
      const state = instanceEntitySlice(initialState, setFocusedInstanceId('inst-2'));
      expect(state.ui.focusedInstanceId).toBe('inst-2');
    });

    it('should set selected instance ID', () => {
      const state = instanceEntitySlice(initialState, setSelectedInstanceId('inst-3'));
      expect(state.ui.selectedInstanceId).toBe('inst-3');
    });
  });

  // ===================================================================
  // PART 2: Set Instances (Bulk Load) (7 tests)
  // ===================================================================

  describe('Set Instances (Bulk Load)', () => {
    it('should set instances (replace all)', () => {
      const instances = [
        { id: 'inst-1', componentId: 'comp-1' },
        { id: 'inst-2', componentId: 'comp-1' },
      ];

      const state = instanceEntitySlice(initialState, setInstances(instances));

      expect(state.ids).toEqual(['inst-1', 'inst-2']);
      expect(Object.keys(state.entities)).toHaveLength(2);
    });

    it('should clear existing instances when setting new ones', () => {
      initialState.entities['inst-old'] = { id: 'inst-old', componentId: 'comp-old' };
      initialState.ids.push('inst-old');

      const instances = [{ id: 'inst-new', componentId: 'comp-new' }];
      const state = instanceEntitySlice(initialState, setInstances(instances));

      expect(state.entities['inst-old']).toBeUndefined();
      expect(state.entities['inst-new']).toBeDefined();
    });

    it('should handle empty array in setInstances', () => {
      initialState.entities['inst-1'] = { id: 'inst-1', componentId: 'comp-1' };
      initialState.ids.push('inst-1');

      const state = instanceEntitySlice(initialState, setInstances([]));

      expect(state.ids).toHaveLength(0);
      expect(Object.keys(state.entities)).toHaveLength(0);
    });

    it('should preserve UI state when setting instances', () => {
      initialState.ui.hoveredInstanceId = 'inst-hover';
      initialState.ui.focusedInstanceId = 'inst-focus';

      const instances = [{ id: 'inst-1', componentId: 'comp-1' }];
      const state = instanceEntitySlice(initialState, setInstances(instances));

      expect(state.ui.hoveredInstanceId).toBe('inst-hover');
      expect(state.ui.focusedInstanceId).toBe('inst-focus');
    });

    it('should clear ownership when setting instances', () => {
      initialState.ownership = { component: { 'comp-1': ['inst-old'] } };

      const instances = [{ id: 'inst-new', componentId: 'comp-new' }];
      const state = instanceEntitySlice(initialState, setInstances(instances));

      expect(state.ownership).toEqual({});
    });

    it('should set instances with complex properties', () => {
      const instances = [
        {
          id: 'inst-1',
          componentId: 'comp-1',
          override: { props: { label: 'Click me' } },
          properties: { style: { color: 'red' } },
        },
      ];

      const state = instanceEntitySlice(initialState, setInstances(instances));

      expect(state.entities['inst-1'].override.props.label).toBe('Click me');
      expect(state.entities['inst-1'].properties.style.color).toBe('red');
    });

    it('should handle instances with null values', () => {
      const instances = [
        { id: 'inst-1', componentId: 'comp-1', variant: null },
      ];

      const state = instanceEntitySlice(initialState, setInstances(instances));

      expect(state.entities['inst-1'].variant).toBeNull();
    });
  });

  // ===================================================================
  // PART 3: Update Instance (7 tests)
  // ===================================================================

  describe('Update Instance', () => {
    beforeEach(() => {
      initialState.entities['inst-1'] = {
        id: 'inst-1',
        componentId: 'comp-1',
        variant: 'primary',
      };
      initialState.ids.push('inst-1');
    });

    it('should update instance properties', () => {
      const state = instanceEntitySlice(
        initialState,
        updateInstance({ id: 'inst-1', componentId: 'comp-2' }),
      );

      expect(state.entities['inst-1'].componentId).toBe('comp-2');
    });

    it('should preserve existing properties when updating', () => {
      const state = instanceEntitySlice(
        initialState,
        updateInstance({ id: 'inst-1', disabled: true }),
      );

      expect(state.entities['inst-1'].componentId).toBe('comp-1');
      expect(state.entities['inst-1'].disabled).toBe(true);
    });

    it('should update multiple properties at once', () => {
      const state = instanceEntitySlice(
        initialState,
        updateInstance({
          id: 'inst-1',
          componentId: 'comp-2',
          variant: 'secondary',
          disabled: true,
        }),
      );

      expect(state.entities['inst-1'].componentId).toBe('comp-2');
      expect(state.entities['inst-1'].variant).toBe('secondary');
      expect(state.entities['inst-1'].disabled).toBe(true);
    });

    it('should not update non-existent instance', () => {
      const state = instanceEntitySlice(
        initialState,
        updateInstance({ id: 'non-existent', componentId: 'comp-2' }),
      );

      expect(state.entities['non-existent']).toBeUndefined();
    });

    it('should allow updating to null values', () => {
      const state = instanceEntitySlice(
        initialState,
        updateInstance({ id: 'inst-1', variant: null }),
      );

      expect(state.entities['inst-1'].variant).toBeNull();
    });

    it('should handle nested property updates', () => {
      const state = instanceEntitySlice(
        initialState,
        updateInstance({
          id: 'inst-1',
          override: { props: { label: 'New Label' } },
        }),
      );

      expect(state.entities['inst-1'].override.props.label).toBe('New Label');
    });

    it('should not mutate original state', () => {
      const originalEntity = initialState.entities['inst-1'];
      instanceEntitySlice(initialState, updateInstance({ id: 'inst-1', disabled: true }));

      expect(originalEntity.disabled).toBeUndefined();
    });
  });

  // ===================================================================
  // PART 4: Update Instance Style (6 tests)
  // ===================================================================

  describe('Update Instance Style', () => {
    beforeEach(() => {
      initialState.entities['inst-1'] = {
        id: 'inst-1',
        componentId: 'comp-1',
        properties: { style: { color: 'red', fontSize: '16px' } },
      };
      initialState.ids.push('inst-1');
    });

    it('should update instance style properties', () => {
      const state = instanceEntitySlice(
        initialState,
        updateInstanceStyle({ id: 'inst-1', style: { color: 'blue' } }),
      );

      expect(state.entities['inst-1'].properties.style.color).toBe('blue');
      expect(state.entities['inst-1'].properties.style.fontSize).toBe('16px');
    });

    it('should add new style properties', () => {
      const state = instanceEntitySlice(
        initialState,
        updateInstanceStyle({ id: 'inst-1', style: { margin: '10px' } }),
      );

      expect(state.entities['inst-1'].properties.style.margin).toBe('10px');
      expect(state.entities['inst-1'].properties.style.color).toBe('red');
    });

    it('should handle instance without existing properties', () => {
      initialState.entities['inst-2'] = { id: 'inst-2', componentId: 'comp-1' };
      initialState.ids.push('inst-2');

      const state = instanceEntitySlice(
        initialState,
        updateInstanceStyle({ id: 'inst-2', style: { color: 'green' } }),
      );

      expect(state.entities['inst-2'].properties.style.color).toBe('green');
    });

    it('should handle instance without existing style', () => {
      initialState.entities['inst-2'] = {
        id: 'inst-2',
        componentId: 'comp-1',
        properties: {},
      };
      initialState.ids.push('inst-2');

      const state = instanceEntitySlice(
        initialState,
        updateInstanceStyle({ id: 'inst-2', style: { color: 'purple' } }),
      );

      expect(state.entities['inst-2'].properties.style.color).toBe('purple');
    });

    it('should not update style for non-existent instance', () => {
      const state = instanceEntitySlice(
        initialState,
        updateInstanceStyle({ id: 'non-existent', style: { color: 'blue' } }),
      );

      expect(state.entities['non-existent']).toBeUndefined();
    });

    it('should handle complex style objects', () => {
      const complexStyle = {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        padding: { top: '5px', bottom: '10px' },
      };

      const state = instanceEntitySlice(
        initialState,
        updateInstanceStyle({ id: 'inst-1', style: complexStyle }),
      );

      expect(state.entities['inst-1'].properties.style.display).toBe('flex');
      expect(state.entities['inst-1'].properties.style.padding).toEqual({
        top: '5px',
        bottom: '10px',
      });
    });
  });

  // ===================================================================
  // PART 5: Update Instance Prop (4 tests)
  // ===================================================================

  describe('Update Instance Prop', () => {
    beforeEach(() => {
      initialState.entities['inst-1'] = {
        id: 'inst-1',
        componentId: 'comp-1',
        override: { props: { 'prop-1': { value: 'old' } } },
      };
      initialState.ids.push('inst-1');
    });

    it('should update instance prop', () => {
      const state = instanceEntitySlice(
        initialState,
        updateInstanceProp({
          instanceId: 'inst-1',
          propId: 'prop-1',
          updates: { value: 'new' },
        }),
      );

      expect(state.entities['inst-1'].override.props['prop-1'].value).toBe('new');
    });

    it('should add new prop', () => {
      const state = instanceEntitySlice(
        initialState,
        updateInstanceProp({
          instanceId: 'inst-1',
          propId: 'prop-2',
          updates: { value: 'new-prop' },
        }),
      );

      expect(state.entities['inst-1'].override.props['prop-2'].value).toBe('new-prop');
    });

    it('should handle instance without override', () => {
      initialState.entities['inst-2'] = { id: 'inst-2', componentId: 'comp-1' };
      initialState.ids.push('inst-2');

      const state = instanceEntitySlice(
        initialState,
        updateInstanceProp({
          instanceId: 'inst-2',
          propId: 'prop-1',
          updates: { value: 'first-prop' },
        }),
      );

      expect(state.entities['inst-2'].override.props['prop-1'].value).toBe('first-prop');
    });

    it('should not update prop for non-existent instance', () => {
      const state = instanceEntitySlice(
        initialState,
        updateInstanceProp({
          instanceId: 'non-existent',
          propId: 'prop-1',
          updates: { value: 'test' },
        }),
      );

      expect(state.entities['non-existent']).toBeUndefined();
    });
  });

  // ===================================================================
  // PART 6: Integration Scenarios (3 tests)
  // ===================================================================

  describe('Integration Scenarios', () => {
    it('should handle multiple updates in sequence', () => {
      let state = instanceEntitySlice(
        initialState,
        setInstances([{ id: 'inst-1', componentId: 'comp-1' }]),
      );
      state = instanceEntitySlice(
        state,
        updateInstanceStyle({ id: 'inst-1', style: { color: 'blue' } }),
      );
      state = instanceEntitySlice(state, setSelectedInstanceId('inst-1'));

      expect(state.entities['inst-1'].properties.style.color).toBe('blue');
      expect(state.ui.selectedInstanceId).toBe('inst-1');
    });

    it('should maintain data integrity across operations', () => {
      const instances = [
        { id: 'inst-1', componentId: 'comp-1', variant: 'primary' },
        { id: 'inst-2', componentId: 'comp-1', variant: 'secondary' },
      ];

      let state = instanceEntitySlice(initialState, setInstances(instances));
      state = instanceEntitySlice(
        state,
        updateInstance({ id: 'inst-1', disabled: true }),
      );

      expect(state.entities['inst-1'].disabled).toBe(true);
      expect(state.entities['inst-2'].variant).toBe('secondary');
      expect(state.entities['inst-2'].disabled).toBeUndefined();
    });

    it('should handle UI state updates independently from data', () => {
      initialState.entities['inst-1'] = { id: 'inst-1', componentId: 'comp-1' };
      initialState.ids.push('inst-1');

      let state = instanceEntitySlice(initialState, setHoveredInstanceId('inst-1'));
      state = instanceEntitySlice(state, setFocusedInstanceId('inst-1'));
      state = instanceEntitySlice(state, setSelectedInstanceId('inst-1'));

      expect(state.ui.hoveredInstanceId).toBe('inst-1');
      expect(state.ui.focusedInstanceId).toBe('inst-1');
      expect(state.ui.selectedInstanceId).toBe('inst-1');
      expect(state.entities['inst-1']).toBeDefined();
    });
  });
});
