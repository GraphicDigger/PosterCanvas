// ===================================================================
// Unit Tests for UIComponent Slice
// CRITICAL BUSINESS LOGIC - UI Component State Management
// Phase 1, Day 1 - Part 2 (30 tests)
// ===================================================================

import { describe, it, expect, beforeEach } from 'vitest';
import componentEntitySlice, {
  setHoveredComponentId,
  setFocusedComponentId,
  setSelectedComponentId,
  resetSelectedComponent,
  setComponents,
  addComponent,
  updateComponent,
  removeComponent,
} from './slice';

describe('UIComponent Slice', () => {
  let initialState;

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
  });

  // ===================================================================
  // PART 1: UI State Management (4 tests)
  // ===================================================================

  describe('UI State Management', () => {
    it('should set hovered component ID', () => {
      const state = componentEntitySlice(initialState, setHoveredComponentId('comp-1'));
      expect(state.ui.hoveredComponentId).toBe('comp-1');
    });

    it('should set focused component ID', () => {
      const state = componentEntitySlice(initialState, setFocusedComponentId('comp-2'));
      expect(state.ui.focusedComponentId).toBe('comp-2');
    });

    it('should set selected component ID', () => {
      const state = componentEntitySlice(initialState, setSelectedComponentId('comp-3'));
      expect(state.ui.selectedComponentId).toBe('comp-3');
    });

    it('should reset selected component', () => {
      initialState.ui.selectedComponentId = 'comp-1';
      const state = componentEntitySlice(initialState, resetSelectedComponent());
      expect(state.ui.selectedComponentId).toBeNull();
    });
  });

  // ===================================================================
  // PART 2: Add Component (7 tests)
  // ===================================================================

  describe('Add Component', () => {
    it('should add new component', () => {
      const component = { id: 'comp-1', name: 'Button', type: 'component' };
      const state = componentEntitySlice(initialState, addComponent(component));

      expect(state.ids).toContain('comp-1');
      expect(state.entities['comp-1']).toEqual(component);
    });

    it('should not duplicate component ID in ids array', () => {
      const component = { id: 'comp-1', name: 'Button' };
      let state = componentEntitySlice(initialState, addComponent(component));
      state = componentEntitySlice(state, addComponent(component));

      expect(state.ids.filter(id => id === 'comp-1')).toHaveLength(1);
    });

    it('should merge properties when adding existing component', () => {
      const component1 = { id: 'comp-1', name: 'Button', variant: 'primary' };
      const component2 = { id: 'comp-1', name: 'Updated Button' };

      let state = componentEntitySlice(initialState, addComponent(component1));
      state = componentEntitySlice(state, addComponent(component2));

      expect(state.entities['comp-1'].name).toBe('Updated Button');
      expect(state.entities['comp-1'].variant).toBe('primary');
    });

    it('should add multiple different components', () => {
      let state = componentEntitySlice(initialState, addComponent({ id: 'comp-1', name: 'Button' }));
      state = componentEntitySlice(state, addComponent({ id: 'comp-2', name: 'Input' }));
      state = componentEntitySlice(state, addComponent({ id: 'comp-3', name: 'Card' }));

      expect(state.ids).toHaveLength(3);
    });

    it('should add component with complex metadata', () => {
      const component = {
        id: 'comp-1',
        name: 'Button',
        props: ['label', 'onClick'],
        variants: ['primary', 'secondary'],
        elements: ['elem-1', 'elem-2'],
      };

      const state = componentEntitySlice(initialState, addComponent(component));

      expect(state.entities['comp-1'].props).toHaveLength(2);
      expect(state.entities['comp-1'].variants).toHaveLength(2);
    });

    it('should add component with empty arrays', () => {
      const component = { id: 'comp-1', name: 'Button', props: [], variants: [] };
      const state = componentEntitySlice(initialState, addComponent(component));

      expect(state.entities['comp-1'].props).toEqual([]);
    });

    it('should add component with null values', () => {
      const component = { id: 'comp-1', name: 'Button', description: null };
      const state = componentEntitySlice(initialState, addComponent(component));

      expect(state.entities['comp-1'].description).toBeNull();
    });
  });

  // ===================================================================
  // PART 3: Update Component (6 tests)
  // ===================================================================

  describe('Update Component', () => {
    beforeEach(() => {
      initialState.entities['comp-1'] = {
        id: 'comp-1',
        name: 'Button',
        type: 'component',
      };
      initialState.ids.push('comp-1');
    });

    it('should update component properties', () => {
      const state = componentEntitySlice(
        initialState,
        updateComponent({ id: 'comp-1', name: 'Updated Button' }),
      );

      expect(state.entities['comp-1'].name).toBe('Updated Button');
    });

    it('should add updatedAt timestamp', () => {
      const state = componentEntitySlice(
        initialState,
        updateComponent({ id: 'comp-1', updates: { name: 'Updated Button' } }),
      );

      expect(state.entities['comp-1'].updatedAt).toBeDefined();
      expect(typeof state.entities['comp-1'].updatedAt).toBe('string');
      // Verify it's a valid ISO date string
      expect(new Date(state.entities['comp-1'].updatedAt).toISOString()).toBe(
        state.entities['comp-1'].updatedAt,
      );
    });

    it('should preserve unchanged properties', () => {
      const state = componentEntitySlice(
        initialState,
        updateComponent({ id: 'comp-1', description: 'A button component' }),
      );

      expect(state.entities['comp-1'].name).toBe('Button');
      expect(state.entities['comp-1'].description).toBe('A button component');
    });

    it('should not update non-existent component', () => {
      const state = componentEntitySlice(
        initialState,
        updateComponent({ id: 'non-existent', updates: { name: 'Ghost' } }),
      );

      expect(state.entities['non-existent']).toBeUndefined();
    });

    it('should update multiple properties at once', () => {
      const state = componentEntitySlice(
        initialState,
        updateComponent({
          id: 'comp-1',
          name: 'New Button',
          type: 'custom',
          variant: 'primary',
        }),
      );

      expect(state.entities['comp-1'].name).toBe('New Button');
      expect(state.entities['comp-1'].type).toBe('custom');
      expect(state.entities['comp-1'].variant).toBe('primary');
    });

    it('should allow updating to null values', () => {
      const state = componentEntitySlice(
        initialState,
        updateComponent({ id: 'comp-1', description: null }),
      );

      expect(state.entities['comp-1'].description).toBeNull();
    });
  });

  // ===================================================================
  // PART 4: Remove Component (5 tests)
  // ===================================================================

  describe('Remove Component', () => {
    beforeEach(() => {
      initialState.entities = {
        'comp-1': { id: 'comp-1', name: 'Button' },
        'comp-2': { id: 'comp-2', name: 'Input' },
      };
      initialState.ids = ['comp-1', 'comp-2'];
    });

    it('should remove component', () => {
      const state = componentEntitySlice(initialState, removeComponent('comp-1'));

      expect(state.entities['comp-1']).toBeUndefined();
      expect(state.ids).not.toContain('comp-1');
      expect(state.ids).toHaveLength(1);
    });

    it('should clear selectedComponentId when removing selected component', () => {
      initialState.ui.selectedComponentId = 'comp-1';
      const state = componentEntitySlice(initialState, removeComponent('comp-1'));

      expect(state.ui.selectedComponentId).toBeNull();
    });

    it('should not clear selectedComponentId when removing non-selected component', () => {
      initialState.ui.selectedComponentId = 'comp-2';
      const state = componentEntitySlice(initialState, removeComponent('comp-1'));

      expect(state.ui.selectedComponentId).toBe('comp-2');
    });

    it('should not error when removing non-existent component', () => {
      const state = componentEntitySlice(initialState, removeComponent('non-existent'));

      expect(state.ids).toHaveLength(2);
    });

    it('should remove last component', () => {
      let state = componentEntitySlice(initialState, removeComponent('comp-1'));
      state = componentEntitySlice(state, removeComponent('comp-2'));

      expect(state.ids).toHaveLength(0);
      expect(Object.keys(state.entities)).toHaveLength(0);
    });
  });

  // ===================================================================
  // PART 5: Bulk Operations (4 tests)
  // ===================================================================

  describe('Bulk Operations (setComponents)', () => {
    it('should set components (replace all)', () => {
      const components = [
        { id: 'comp-1', name: 'Button' },
        { id: 'comp-2', name: 'Input' },
      ];

      const state = componentEntitySlice(initialState, setComponents(components));

      expect(state.ids).toEqual(['comp-1', 'comp-2']);
      expect(Object.keys(state.entities)).toHaveLength(2);
    });

    it('should clear existing components when setting new ones', () => {
      initialState.entities['comp-old'] = { id: 'comp-old', name: 'Old' };
      initialState.ids.push('comp-old');

      const components = [{ id: 'comp-new', name: 'New' }];
      const state = componentEntitySlice(initialState, setComponents(components));

      expect(state.entities['comp-old']).toBeUndefined();
      expect(state.entities['comp-new']).toBeDefined();
      expect(state.ids).toEqual(['comp-new']);
    });

    it('should handle empty array in setComponents', () => {
      initialState.entities['comp-1'] = { id: 'comp-1', name: 'Button' };
      initialState.ids.push('comp-1');

      const state = componentEntitySlice(initialState, setComponents([]));

      expect(state.ids).toHaveLength(0);
      expect(Object.keys(state.entities)).toHaveLength(0);
    });

    it('should preserve UI state when setting components', () => {
      initialState.ui.hoveredComponentId = 'comp-hover';
      initialState.ui.focusedComponentId = 'comp-focus';
      initialState.ui.selectedComponentId = 'comp-select';

      const components = [{ id: 'comp-1', name: 'Button' }];
      const state = componentEntitySlice(initialState, setComponents(components));

      expect(state.ui.hoveredComponentId).toBe('comp-hover');
      expect(state.ui.focusedComponentId).toBe('comp-focus');
      expect(state.ui.selectedComponentId).toBe('comp-select');
    });
  });

  // ===================================================================
  // PART 6: Edge Cases (4 tests)
  // ===================================================================

  describe('Edge Cases', () => {
    it('should handle component without name', () => {
      const component = { id: 'comp-1' };
      const state = componentEntitySlice(initialState, addComponent(component));

      expect(state.entities['comp-1'].id).toBe('comp-1');
      expect(state.entities['comp-1'].name).toBeUndefined();
    });

    it('should handle component with special characters in ID', () => {
      const component = { id: 'comp-1-special_@#', name: 'Special' };
      const state = componentEntitySlice(initialState, addComponent(component));

      expect(state.entities['comp-1-special_@#']).toBeDefined();
    });

    it('should handle very long component names', () => {
      const longName = 'A'.repeat(1000);
      const component = { id: 'comp-1', name: longName };
      const state = componentEntitySlice(initialState, addComponent(component));

      expect(state.entities['comp-1'].name).toBe(longName);
    });

    it('should maintain order in ids array after operations', () => {
      let state = componentEntitySlice(initialState, addComponent({ id: 'comp-1', name: 'First' }));
      state = componentEntitySlice(state, addComponent({ id: 'comp-2', name: 'Second' }));
      state = componentEntitySlice(state, addComponent({ id: 'comp-3', name: 'Third' }));
      state = componentEntitySlice(state, removeComponent('comp-2'));

      expect(state.ids).toEqual(['comp-1', 'comp-3']);
    });
  });
});
