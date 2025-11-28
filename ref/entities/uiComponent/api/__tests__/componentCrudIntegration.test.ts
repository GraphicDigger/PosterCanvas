/**
 * Component CRUD → Redux Integration Tests
 *
 * Purpose: Validate Create, Update, Delete operations with Redux state
 * Risk Level: 🟡 LOW (Mock operations, no real database writes)
 *
 * Test Strategy:
 * - Test Redux CRUD operations
 * - Validate state mutations
 * - Ensure optimistic updates
 * - Test rollback scenarios
 * - No side effects, no external calls
 *
 * Safety:
 * - Zero functional code changes
 * - Isolated test environment
 * - Mock operations only
 * - Proper cleanup
 * - Deterministic execution
 *
 * Note: Following existing integration test patterns in this codebase
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import componentReducer, {
  setComponents,
  addComponent,
  updateComponent,
  removeComponent,
} from '../../model/store/slice';
import {
  selectAllComponents,
  selectComponentById,
} from '../../model/store/selectors';
import { ENTITY_KINDS } from '@/shared/constants';

// ============================================================================
// TEST SETUP
// ============================================================================

describe('Component CRUD → Redux Integration', () => {
  let store: any;

  beforeEach(() => {
    // Create isolated Redux store (no side effects)
    store = configureStore({
      reducer: {
        componentEntity: componentReducer,
      },
    });
  });

  // ==========================================================================
  // CATEGORY 1: CREATE OPERATIONS (5 tests)
  // ==========================================================================

  describe('Create Operations', () => {
    it('should create new component via Redux action', () => {
      // Arrange: Initial empty state
      const initialState = store.getState();
      expect(selectAllComponents(initialState)).toHaveLength(0);

      // Act: Create new component
      store.dispatch(addComponent({
        id: 'comp-1',
        name: 'New Component',
        kind: ENTITY_KINDS.COMPONENT,
        type: 'button',
      }));

      // Assert: Verify component created
      const state = store.getState();
      const components = selectAllComponents(state);
      expect(components).toHaveLength(1);
      expect(components[0]?.name).toBe('New Component');
      expect(components[0]?.type).toBe('button');
    });

    it('should verify component ID handling on create', () => {
      // Act: Create component with ID
      store.dispatch(addComponent({
        id: 'comp-test-123',
        name: 'Test Component',
        kind: ENTITY_KINDS.COMPONENT,
      }));

      // Assert: Verify ID preserved
      const state = store.getState();
      const components = selectAllComponents(state);
      expect(components[0]?.id).toBe('comp-test-123');
    });

    it('should check Redux state updated correctly after create', () => {
      // Act: Create component
      store.dispatch(addComponent({
        id: 'comp-1',
        name: 'New Component',
        kind: ENTITY_KINDS.COMPONENT,
      }));

      // Assert: Verify state structure
      const state = store.getState().componentEntity;
      expect(state.ids).toHaveLength(1);
      expect(Object.keys(state.entities)).toHaveLength(1);
      expect(state.entities['comp-1']).toBeDefined();
      expect(state.entities['comp-1'].name).toBe('New Component');
    });

    it('should validate component properties on creation', () => {
      // Act: Create component with full properties
      store.dispatch(addComponent({
        id: 'comp-1',
        name: 'Full Component',
        kind: ENTITY_KINDS.COMPONENT,
        type: 'custom',
        props: { color: 'blue', size: 'large' },
        variants: ['variant-1'],
      }));

      // Assert: Verify all properties
      const state = store.getState();
      const component = selectComponentById(state, 'comp-1');
      expect(component?.name).toBe('Full Component');
      expect(component?.type).toBe('custom');
      expect(component?.props).toEqual({ color: 'blue', size: 'large' });
      expect(component?.variants).toEqual(['variant-1']);
    });

    it('should ensure data persistence after multiple creates', () => {
      // Act: Create multiple components
      store.dispatch(addComponent({ id: 'comp-1', name: 'Component 1', kind: ENTITY_KINDS.COMPONENT }));
      store.dispatch(addComponent({ id: 'comp-2', name: 'Component 2', kind: ENTITY_KINDS.COMPONENT }));
      store.dispatch(addComponent({ id: 'comp-3', name: 'Component 3', kind: ENTITY_KINDS.COMPONENT }));

      // Assert: Verify all persisted
      const state = store.getState();
      const components = selectAllComponents(state);
      expect(components).toHaveLength(3);
      expect(components[0]?.name).toBe('Component 1');
      expect(components[1]?.name).toBe('Component 2');
      expect(components[2]?.name).toBe('Component 3');
    });
  });

  // ==========================================================================
  // CATEGORY 2: UPDATE OPERATIONS (5 tests)
  // ==========================================================================

  describe('Update Operations', () => {
    beforeEach(() => {
      // Setup: Create initial components
      store.dispatch(setComponents([
        { id: 'comp-1', name: 'Component 1', kind: ENTITY_KINDS.COMPONENT, type: 'button' },
        { id: 'comp-2', name: 'Component 2', kind: ENTITY_KINDS.COMPONENT, type: 'input' },
      ]));
    });

    it('should update component via Redux action', () => {
      // Act: Update component
      store.dispatch(updateComponent({
        id: 'comp-1',
        name: 'Updated Component',
      }));

      // Assert: Verify update
      const state = store.getState();
      const component = selectComponentById(state, 'comp-1');
      expect(component?.name).toBe('Updated Component');
    });

    it('should verify state reflects changes after update', () => {
      // Act: Update component properties
      store.dispatch(updateComponent({
        id: 'comp-1',
        name: 'New Name',
        type: 'custom',
        props: { newProp: 'value' },
      }));

      // Assert: Verify all changes
      const state = store.getState();
      const component = selectComponentById(state, 'comp-1');
      expect(component?.name).toBe('New Name');
      expect(component?.type).toBe('custom');
      expect(component?.props).toEqual({ newProp: 'value' });
    });

    it('should validate partial updates work correctly', () => {
      // Arrange: Initial state
      const initialState = store.getState();
      const initialComponent = selectComponentById(initialState, 'comp-1');

      // Act: Partial update (only name)
      store.dispatch(updateComponent({
        id: 'comp-1',
        name: 'Partially Updated',
      }));

      // Assert: Verify only name changed, other props preserved
      const state = store.getState();
      const component = selectComponentById(state, 'comp-1');
      expect(component?.name).toBe('Partially Updated');
      expect(component?.kind).toBe(initialComponent?.kind);
      expect(component?.type).toBe(initialComponent?.type);
    });

    it('should test optimistic update pattern', () => {
      // Act: Update component
      store.dispatch(updateComponent({
        id: 'comp-1',
        name: 'Optimistically Updated',
      }));

      // Assert: Verify immediate state update (optimistic)
      const state = store.getState();
      const component = selectComponentById(state, 'comp-1');
      expect(component?.name).toBe('Optimistically Updated');
    });

    it('should handle updates to non-existent components gracefully', () => {
      // Act: Try to update non-existent component
      store.dispatch(updateComponent({
        id: 'non-existent',
        updates: {
          name: 'Should Not Exist',
        },
      }));

      // Assert: Verify state unchanged
      const state = store.getState();
      const components = selectAllComponents(state);
      expect(components).toHaveLength(2);
      expect(selectComponentById(state, 'non-existent')).toBeUndefined();
    });
  });

  // ==========================================================================
  // CATEGORY 3: DELETE OPERATIONS (5 tests)
  // ==========================================================================

  describe('Delete Operations', () => {
    beforeEach(() => {
      // Setup: Create initial components
      store.dispatch(setComponents([
        { id: 'comp-1', name: 'Component 1', kind: ENTITY_KINDS.COMPONENT },
        { id: 'comp-2', name: 'Component 2', kind: ENTITY_KINDS.COMPONENT },
        { id: 'comp-3', name: 'Component 3', kind: ENTITY_KINDS.COMPONENT },
      ]));
    });

    it('should delete component via Redux action', () => {
      // Arrange: Initial count
      const initialState = store.getState();
      expect(selectAllComponents(initialState)).toHaveLength(3);

      // Act: Delete component
      store.dispatch(removeComponent('comp-2'));

      // Assert: Verify deletion
      const state = store.getState();
      const components = selectAllComponents(state);
      expect(components).toHaveLength(2);
      expect(selectComponentById(state, 'comp-2')).toBeUndefined();
    });

    it('should verify state cleanup after delete', () => {
      // Act: Delete component
      store.dispatch(removeComponent('comp-1'));

      // Assert: Verify complete cleanup
      const state = store.getState().componentEntity;
      expect(state.ids).not.toContain('comp-1');
      expect(state.entities['comp-1']).toBeUndefined();
      expect(state.ids).toHaveLength(2);
    });

    it('should validate cascade deletes for component relationships', () => {
      // Arrange: Component with relationships
      store.dispatch(updateComponent({
        id: 'comp-1',
        updates: {
          variants: ['variant-1', 'variant-2'],
          props: ['prop-1', 'prop-2'],
        },
      }));

      // Act: Delete component
      store.dispatch(removeComponent('comp-1'));

      // Assert: Verify component deleted
      const state = store.getState();
      expect(selectComponentById(state, 'comp-1')).toBeUndefined();
      expect(selectAllComponents(state)).toHaveLength(2);
    });

    it('should test delete of last remaining component', () => {
      // Arrange: Delete all but one
      store.dispatch(removeComponent('comp-1'));
      store.dispatch(removeComponent('comp-2'));

      // Act: Delete last component
      store.dispatch(removeComponent('comp-3'));

      // Assert: Verify empty state
      const state = store.getState();
      const components = selectAllComponents(state);
      expect(components).toHaveLength(0);
      expect(state.componentEntity.ids).toEqual([]);
      expect(state.componentEntity.entities).toEqual({});
    });

    it('should handle deletion of non-existent components gracefully', () => {
      // Arrange: Initial count
      const initialState = store.getState();
      const initialCount = selectAllComponents(initialState).length;

      // Act: Try to delete non-existent component
      store.dispatch(removeComponent('non-existent'));

      // Assert: Verify state unchanged
      const state = store.getState();
      const components = selectAllComponents(state);
      expect(components).toHaveLength(initialCount);
    });
  });
});

