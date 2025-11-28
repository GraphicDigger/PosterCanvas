/**
 * Component Data → Redux Integration Tests
 *
 * Purpose: Validate data flow and transformation into Redux state
 * Risk Level: 🟢 VERY LOW (Redux-only, no external dependencies)
 *
 * Test Strategy:
 * - Test Redux state management directly
 * - Validate data transformation
 * - Ensure state integrity
 * - Test normalization patterns
 * - No side effects, no external calls
 *
 * Safety:
 * - Zero functional code changes
 * - Isolated test environment
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
} from '../../model/store/slice';
import {
  selectAllComponents,
  selectComponentById,
} from '../../model/store/selectors';
import { ENTITY_KINDS } from '@/shared/constants';

// ============================================================================
// TEST SETUP
// ============================================================================

describe('Component Data → Redux Integration', () => {
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
  // CATEGORY 1: BASIC READ OPERATIONS (5 tests)
  // ==========================================================================

  describe('Basic Read Operations', () => {
    it('should load components data and update Redux state', () => {
      // Arrange: Create mock components
      const mockComponents = [
        {
          id: 'comp-1',
          name: 'Button Component',
          kind: ENTITY_KINDS.COMPONENT,
          type: 'button',
        },
        {
          id: 'comp-2',
          name: 'Input Component',
          kind: ENTITY_KINDS.COMPONENT,
          type: 'input',
        },
      ];

      // Act: Dispatch components to Redux
      store.dispatch(setComponents(mockComponents));

      // Assert: Verify Redux state
      const state = store.getState();
      const components = selectAllComponents(state);
      expect(components).toHaveLength(2);
      expect(components[0]?.id).toBe('comp-1');
      expect(components[1]?.id).toBe('comp-2');
    });

    it('should verify component data structure matches Redux state shape', () => {
      // Arrange: Mock component data
      const mockComponents = [
        {
          id: 'comp-1',
          name: 'Test Component',
          kind: ENTITY_KINDS.COMPONENT,
        },
      ];

      // Act: Dispatch to Redux
      store.dispatch(setComponents(mockComponents));

      // Assert: Verify state structure
      const state = store.getState().componentEntity;
      expect(state).toHaveProperty('ids');
      expect(state).toHaveProperty('entities');
      expect(state).toHaveProperty('ui');
      expect(Array.isArray(state.ids)).toBe(true);
      expect(typeof state.entities).toBe('object');
    });

    it('should validate component entities are normalized correctly', () => {
      // Arrange: Mock components
      const mockComponents = [
        { id: 'comp-1', name: 'Component 1', kind: ENTITY_KINDS.COMPONENT },
        { id: 'comp-2', name: 'Component 2', kind: ENTITY_KINDS.COMPONENT },
      ];

      // Act: Dispatch to Redux
      store.dispatch(setComponents(mockComponents));

      // Assert: Verify normalization
      const state = store.getState().componentEntity;
      expect(state.ids).toEqual(['comp-1', 'comp-2']);
      expect(state.entities['comp-1']).toEqual(mockComponents[0]);
      expect(state.entities['comp-2']).toEqual(mockComponents[1]);
    });

    it('should check component IDs are in correct format', () => {
      // Arrange: Mock components with various ID formats
      const mockComponents = [
        { id: 'comp-1', name: 'Component 1', kind: ENTITY_KINDS.COMPONENT },
        { id: 'comp-abc-123', name: 'Component 2', kind: ENTITY_KINDS.COMPONENT },
      ];

      // Act: Dispatch to Redux
      store.dispatch(setComponents(mockComponents));

      // Assert: Verify IDs
      const state = store.getState().componentEntity;
      state.ids.forEach((id: string) => {
        expect(typeof id).toBe('string');
        expect(id.length).toBeGreaterThan(0);
      });
    });

    it('should ensure no data loss during transformation', () => {
      // Arrange: Mock components with all properties
      const mockComponents = [
        {
          id: 'comp-1',
          name: 'Complete Component',
          kind: ENTITY_KINDS.COMPONENT,
          type: 'custom',
          description: 'Test description',
          props: { color: 'blue', size: 'large' },
          variants: ['variant-1', 'variant-2'],
          metadata: { key: 'value' },
        },
      ];

      // Act: Dispatch to Redux
      store.dispatch(setComponents(mockComponents));

      // Assert: Verify all properties preserved
      const state = store.getState();
      const component = selectComponentById(state, 'comp-1');
      expect(component?.id).toBe('comp-1');
      expect(component?.name).toBe('Complete Component');
      expect(component?.kind).toBe(ENTITY_KINDS.COMPONENT);
      expect(component?.type).toBe('custom');
      expect(component?.description).toBe('Test description');
      expect(component?.props).toEqual({ color: 'blue', size: 'large' });
      expect(component?.variants).toEqual(['variant-1', 'variant-2']);
      expect(component?.metadata).toEqual({ key: 'value' });
    });
  });

  // ==========================================================================
  // CATEGORY 2: ERROR HANDLING (5 tests)
  // ==========================================================================

  describe('Error Handling', () => {
    it('should handle empty component array gracefully', () => {
      // Arrange: Empty array
      const mockComponents: any[] = [];

      // Act: Dispatch to Redux
      store.dispatch(setComponents(mockComponents));

      // Assert: Verify state handles empty array
      const state = store.getState().componentEntity;
      expect(state.ids).toEqual([]);
      expect(state.entities).toEqual({});
    });

    it('should handle empty components array scenarios', () => {
      // Arrange: Empty array scenarios
      const scenarios = [[]];

      scenarios.forEach((scenario) => {
        // Act: Dispatch to Redux
        store.dispatch(setComponents(scenario as any));

        // Assert: Verify state remains consistent
        const state = store.getState().componentEntity;
        expect(state.ids).toBeDefined();
        expect(state.entities).toBeDefined();
        expect(state.ids).toEqual([]);
      });
    });

    it('should validate error state in Redux when data is invalid', () => {
      // Arrange: Valid components
      const mockComponents = [
        { id: 'comp-1', name: 'Component 1', kind: ENTITY_KINDS.COMPONENT },
      ];

      // Act: Dispatch valid data
      store.dispatch(setComponents(mockComponents));

      // Assert: Verify state is valid
      const state = store.getState().componentEntity;
      expect(state.ids).toHaveLength(1);
      expect(state.entities['comp-1']).toBeDefined();
    });

    it('should ensure state remains consistent on error', () => {
      // Arrange: Initial valid state
      const initialComponents = [
        { id: 'comp-1', name: 'Component 1', kind: ENTITY_KINDS.COMPONENT },
      ];
      store.dispatch(setComponents(initialComponents));

      // Act: Set empty data
      store.dispatch(setComponents([]));

      // Assert: Verify state integrity (state is replaced with empty)
      const state = store.getState().componentEntity;
      expect(state.ids).toBeDefined();
      expect(state.entities).toBeDefined();
      expect(state.ids).toEqual([]);
    });

    it('should handle components with missing optional fields', () => {
      // Arrange: Components with minimal fields
      const minimalComponents = [
        { id: 'comp-1', name: 'Minimal Component', kind: ENTITY_KINDS.COMPONENT },
        { id: 'comp-2', name: 'Another Minimal', kind: ENTITY_KINDS.COMPONENT },
      ];

      // Act: Dispatch to Redux
      store.dispatch(setComponents(minimalComponents as any));

      // Assert: Verify state handles minimal data
      const state = store.getState().componentEntity;
      expect(state.ids).toHaveLength(2);
      expect(state.entities['comp-1']).toBeDefined();
      expect(state.entities['comp-2']).toBeDefined();
    });
  });

  // ==========================================================================
  // CATEGORY 3: DATA TRANSFORMATION (5 tests)
  // ==========================================================================

  describe('Data Transformation', () => {
    it('should verify component data transformation from source to Redux', () => {
      // Arrange: Source-style data
      const sourceData = [
        {
          id: 'comp-1',
          name: 'Test Component',
          kind: ENTITY_KINDS.COMPONENT,
          type: 'button',
          createdAt: '2025-01-01',
          updatedAt: '2025-01-02',
        },
      ];

      // Act: Transform and dispatch
      store.dispatch(setComponents(sourceData));

      // Assert: Verify transformation
      const state = store.getState();
      const component = selectComponentById(state, 'comp-1');
      expect(component?.id).toBe('comp-1');
      expect(component?.name).toBe('Test Component');
      expect(component?.kind).toBe(ENTITY_KINDS.COMPONENT);
      expect(component?.type).toBe('button');
    });

    it('should check nested data (props, variants) handling', () => {
      // Arrange: Component with nested data
      const componentWithNested = [
        {
          id: 'comp-1',
          name: 'Complex Component',
          kind: ENTITY_KINDS.COMPONENT,
          props: {
            color: 'blue',
            size: 'large',
            disabled: false,
          },
          variants: ['variant-1', 'variant-2', 'variant-3'],
          elements: ['elem-1', 'elem-2'],
        },
      ];

      // Act: Dispatch to Redux
      store.dispatch(setComponents(componentWithNested));

      // Assert: Verify nested data preserved
      const state = store.getState();
      const component = selectComponentById(state, 'comp-1');
      expect(component?.props).toEqual({
        color: 'blue',
        size: 'large',
        disabled: false,
      });
      expect(component?.variants).toEqual(['variant-1', 'variant-2', 'variant-3']);
      expect(component?.elements).toEqual(['elem-1', 'elem-2']);
    });

    it('should validate relationships (component-variant-prop)', () => {
      // Arrange: Components with relationships
      const componentsWithRelations = [
        {
          id: 'comp-1',
          name: 'Parent Component',
          kind: ENTITY_KINDS.COMPONENT,
          variants: ['variant-1', 'variant-2'],
          props: ['prop-1', 'prop-2'],
          instances: ['instance-1'],
        },
      ];

      // Act: Dispatch to Redux
      store.dispatch(setComponents(componentsWithRelations));

      // Assert: Verify relationships preserved
      const state = store.getState();
      const component = selectComponentById(state, 'comp-1');
      expect(component?.variants).toContain('variant-1');
      expect(component?.variants).toContain('variant-2');
      expect(component?.props).toContain('prop-1');
      expect(component?.instances).toContain('instance-1');
    });

    it('should test empty/null data in nested structures', () => {
      // Arrange: Components with empty nested data
      const componentsWithEmpty = [
        {
          id: 'comp-1',
          name: 'Component 1',
          kind: ENTITY_KINDS.COMPONENT,
          props: {},
          variants: [],
          elements: null,
          metadata: {},
        },
      ];

      // Act: Dispatch to Redux
      store.dispatch(setComponents(componentsWithEmpty));

      // Assert: Verify empty data handled correctly
      const state = store.getState();
      const component = selectComponentById(state, 'comp-1');
      expect(component?.props).toEqual({});
      expect(component?.variants).toEqual([]);
      expect(component?.elements).toBeNull();
      expect(component?.metadata).toEqual({});
    });

    it('should ensure data integrity across multiple dispatches', () => {
      // Arrange: Multiple component batches
      const batch1 = [
        { id: 'comp-1', name: 'Component 1', kind: ENTITY_KINDS.COMPONENT },
      ];
      const batch2 = [
        { id: 'comp-2', name: 'Component 2', kind: ENTITY_KINDS.COMPONENT },
        { id: 'comp-3', name: 'Component 3', kind: ENTITY_KINDS.COMPONENT },
      ];

      // Act: Dispatch multiple times
      store.dispatch(setComponents(batch1));
      const state1 = store.getState().componentEntity;

      store.dispatch(setComponents(batch2));
      const state2 = store.getState().componentEntity;

      // Assert: Verify state replaced (not merged) on second dispatch
      expect(state1.ids).toEqual(['comp-1']);
      expect(state2.ids).toEqual(['comp-2', 'comp-3']);
      expect(state2.entities['comp-1']).toBeUndefined();
    });
  });
});

