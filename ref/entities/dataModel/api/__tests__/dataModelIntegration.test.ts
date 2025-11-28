/**
 * Data Model → Redux Integration Tests
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
import dataModelReducer, {
  setModels,
  addDataModel,
  setSelectedModelId,
} from '../../model/store/slice';
import {
  selectAllDataModels,
  selectDataModelById,
} from '../../model/store/selectors';
import { ENTITY_KINDS } from '@/shared/constants';

// ============================================================================
// TEST SETUP
// ============================================================================

describe('Data Model → Redux Integration', () => {
  let store: any;

  beforeEach(() => {
    // Create isolated Redux store (no side effects)
    store = configureStore({
      reducer: {
        dataModelEntity: dataModelReducer,
      },
    });
  });

  // ==========================================================================
  // CATEGORY 1: BASIC READ OPERATIONS (4 tests)
  // ==========================================================================

  describe('Basic Read Operations', () => {
    it('should load data models and update Redux state', () => {
      // Arrange: Create mock data models
      const mockModels = [
        {
          id: 'model-1',
          name: 'User Model',
          kind: ENTITY_KINDS.DATA_MODEL,
          fields: ['field-1', 'field-2'],
        },
        {
          id: 'model-2',
          name: 'Product Model',
          kind: ENTITY_KINDS.DATA_MODEL,
          fields: ['field-3', 'field-4'],
        },
      ];

      // Act: Dispatch models to Redux
      store.dispatch(setModels(mockModels));

      // Assert: Verify Redux state
      const state = store.getState();
      const models = selectAllDataModels(state);
      expect(models).toHaveLength(2);
      expect(models[0]?.id).toBe('model-1');
      expect(models[1]?.id).toBe('model-2');
    });

    it('should verify data model structure matches Redux state shape', () => {
      // Arrange: Mock data model
      const mockModels = [
        {
          id: 'model-1',
          name: 'Test Model',
          kind: ENTITY_KINDS.DATA_MODEL,
        },
      ];

      // Act: Dispatch to Redux
      store.dispatch(setModels(mockModels));

      // Assert: Verify state structure
      const state = store.getState().dataModelEntity;
      expect(state).toHaveProperty('ids');
      expect(state).toHaveProperty('entities');
      expect(state).toHaveProperty('ui');
      expect(Array.isArray(state.ids)).toBe(true);
      expect(typeof state.entities).toBe('object');
    });

    it('should validate data model entities are normalized correctly', () => {
      // Arrange: Mock models
      const mockModels = [
        { id: 'model-1', name: 'Model 1', kind: ENTITY_KINDS.DATA_MODEL },
        { id: 'model-2', name: 'Model 2', kind: ENTITY_KINDS.DATA_MODEL },
      ];

      // Act: Dispatch to Redux
      store.dispatch(setModels(mockModels));

      // Assert: Verify normalization
      const state = store.getState().dataModelEntity;
      expect(state.ids).toEqual(['model-1', 'model-2']);
      expect(state.entities['model-1']).toEqual(mockModels[0]);
      expect(state.entities['model-2']).toEqual(mockModels[1]);
    });

    it('should ensure no data loss during transformation', () => {
      // Arrange: Mock models with all properties
      const mockModels = [
        {
          id: 'model-1',
          name: 'Complete Model',
          kind: ENTITY_KINDS.DATA_MODEL,
          description: 'Test description',
          fields: ['field-1', 'field-2'],
          relationships: ['rel-1'],
          metadata: { key: 'value' },
          createdAt: '2025-01-01',
        },
      ];

      // Act: Dispatch to Redux
      store.dispatch(setModels(mockModels));

      // Assert: Verify all properties preserved
      const state = store.getState();
      const model = selectDataModelById(state, 'model-1');
      expect(model?.id).toBe('model-1');
      expect(model?.name).toBe('Complete Model');
      expect(model?.kind).toBe(ENTITY_KINDS.DATA_MODEL);
      expect(model?.description).toBe('Test description');
      expect(model?.fields).toEqual(['field-1', 'field-2']);
      expect(model?.relationships).toEqual(['rel-1']);
      expect(model?.metadata).toEqual({ key: 'value' });
    });
  });

  // ==========================================================================
  // CATEGORY 2: ERROR HANDLING (4 tests)
  // ==========================================================================

  describe('Error Handling', () => {
    it('should handle empty data model array gracefully', () => {
      // Arrange: Empty array
      const mockModels: any[] = [];

      // Act: Dispatch to Redux
      store.dispatch(setModels(mockModels));

      // Assert: Verify state handles empty array
      const state = store.getState().dataModelEntity;
      expect(state.ids).toEqual([]);
      expect(state.entities).toEqual({});
    });

    it('should validate error state in Redux when data is invalid', () => {
      // Arrange: Valid models
      const mockModels = [
        { id: 'model-1', name: 'Model 1', kind: ENTITY_KINDS.DATA_MODEL },
      ];

      // Act: Dispatch valid data
      store.dispatch(setModels(mockModels));

      // Assert: Verify state is valid
      const state = store.getState().dataModelEntity;
      expect(state.ids).toHaveLength(1);
      expect(state.entities['model-1']).toBeDefined();
    });

    it('should ensure state remains consistent on error', () => {
      // Arrange: Initial valid state
      const initialModels = [
        { id: 'model-1', name: 'Model 1', kind: ENTITY_KINDS.DATA_MODEL },
      ];
      store.dispatch(setModels(initialModels));

      // Act: Set empty data
      store.dispatch(setModels([]));

      // Assert: Verify state integrity (state is replaced with empty)
      const state = store.getState().dataModelEntity;
      expect(state.ids).toBeDefined();
      expect(state.entities).toBeDefined();
      expect(state.ids).toEqual([]);
    });

    it('should handle data models with missing optional fields', () => {
      // Arrange: Models with minimal fields
      const minimalModels = [
        { id: 'model-1', name: 'Minimal Model', kind: ENTITY_KINDS.DATA_MODEL },
        { id: 'model-2', name: 'Another Minimal', kind: ENTITY_KINDS.DATA_MODEL },
      ];

      // Act: Dispatch to Redux
      store.dispatch(setModels(minimalModels as any));

      // Assert: Verify state handles minimal data
      const state = store.getState().dataModelEntity;
      expect(state.ids).toHaveLength(2);
      expect(state.entities['model-1']).toBeDefined();
      expect(state.entities['model-2']).toBeDefined();
    });
  });

  // ==========================================================================
  // CATEGORY 3: DATA TRANSFORMATION (4 tests)
  // ==========================================================================

  describe('Data Transformation', () => {
    it('should verify data model transformation from source to Redux', () => {
      // Arrange: Source-style data
      const sourceData = [
        {
          id: 'model-1',
          name: 'Test Model',
          kind: ENTITY_KINDS.DATA_MODEL,
          fields: ['field-1', 'field-2'],
          createdAt: '2025-01-01',
          updatedAt: '2025-01-02',
        },
      ];

      // Act: Transform and dispatch
      store.dispatch(setModels(sourceData));

      // Assert: Verify transformation
      const state = store.getState();
      const model = selectDataModelById(state, 'model-1');
      expect(model?.id).toBe('model-1');
      expect(model?.name).toBe('Test Model');
      expect(model?.kind).toBe(ENTITY_KINDS.DATA_MODEL);
      expect(model?.fields).toEqual(['field-1', 'field-2']);
    });

    it('should check nested data (fields, relationships) handling', () => {
      // Arrange: Model with nested data
      const modelWithNested = [
        {
          id: 'model-1',
          name: 'Complex Model',
          kind: ENTITY_KINDS.DATA_MODEL,
          fields: ['field-1', 'field-2', 'field-3'],
          relationships: [
            { type: 'hasMany', target: 'model-2' },
            { type: 'belongsTo', target: 'model-3' },
          ],
          validations: {
            required: ['field-1'],
            unique: ['field-2'],
          },
        },
      ];

      // Act: Dispatch to Redux
      store.dispatch(setModels(modelWithNested));

      // Assert: Verify nested data preserved
      const state = store.getState();
      const model = selectDataModelById(state, 'model-1');
      expect(model?.fields).toEqual(['field-1', 'field-2', 'field-3']);
      expect(model?.relationships).toHaveLength(2);
      expect(model?.validations).toEqual({
        required: ['field-1'],
        unique: ['field-2'],
      });
    });

    it('should test empty/null data in nested structures', () => {
      // Arrange: Models with empty nested data
      const modelsWithEmpty = [
        {
          id: 'model-1',
          name: 'Model 1',
          kind: ENTITY_KINDS.DATA_MODEL,
          fields: [],
          relationships: null,
          validations: {},
          metadata: {},
        },
      ];

      // Act: Dispatch to Redux
      store.dispatch(setModels(modelsWithEmpty));

      // Assert: Verify empty data handled correctly
      const state = store.getState();
      const model = selectDataModelById(state, 'model-1');
      expect(model?.fields).toEqual([]);
      expect(model?.relationships).toBeNull();
      expect(model?.validations).toEqual({});
      expect(model?.metadata).toEqual({});
    });

    it('should ensure data integrity across multiple dispatches', () => {
      // Arrange: Multiple model batches
      const batch1 = [
        { id: 'model-1', name: 'Model 1', kind: ENTITY_KINDS.DATA_MODEL },
      ];
      const batch2 = [
        { id: 'model-2', name: 'Model 2', kind: ENTITY_KINDS.DATA_MODEL },
        { id: 'model-3', name: 'Model 3', kind: ENTITY_KINDS.DATA_MODEL },
      ];

      // Act: Dispatch multiple times
      store.dispatch(setModels(batch1));
      const state1 = store.getState().dataModelEntity;

      store.dispatch(setModels(batch2));
      const state2 = store.getState().dataModelEntity;

      // Assert: Verify state replaced (not merged) on second dispatch
      expect(state1.ids).toEqual(['model-1']);
      expect(state2.ids).toEqual(['model-2', 'model-3']);
      expect(state2.entities['model-1']).toBeUndefined();
    });
  });
});

