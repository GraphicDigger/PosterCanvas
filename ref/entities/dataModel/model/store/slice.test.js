// ===================================================================
// Unit Tests for DataModel Slice
// CRITICAL BUSINESS LOGIC - Data Model State Management
// Phase 1, Day 8 - Part 2 (30 tests)
// ===================================================================

import { describe, it, expect, beforeEach, vi } from 'vitest';

// Mock dependencies
vi.mock('uuid', () => ({
  v4: () => 'uuid-model-123',
}));

vi.mock('../../../../../shared/constants', () => ({
  ENTITY_KINDS: {
    DATA_MODEL: 'data-model',
  },
}));

vi.mock('../../../../../entities/dataModel', () => ({
  MODEL_FIELD_TYPES: {
    TEXT: 'text',
    NUMBER: 'number',
    EMAIL: 'email',
    PHONE: 'phone',
  },
}));

import dataModelSlice, {
  setModels,
  addDataModel,
  setHoveredModelId,
  setFocusedModelId,
  setSelectedModelId,
  updateModel,
} from './slice';

describe('DataModel Slice', () => {
  let initialState;

  beforeEach(() => {
    initialState = dataModelSlice(undefined, { type: '@@INIT' });
    // Create a mutable copy for tests
    initialState = JSON.parse(JSON.stringify(initialState));
  });

  // ===================================================================
  // PART 1: UI State Management (3 tests)
  // ===================================================================

  describe('UI State Management', () => {
    it('should set hovered model ID', () => {
      const state = dataModelSlice(initialState, setHoveredModelId('model-1'));
      expect(state.ui.hoveredModelId).toBe('model-1');
    });

    it('should set focused model ID', () => {
      const state = dataModelSlice(initialState, setFocusedModelId('model-2'));
      expect(state.ui.focusedModelId).toBe('model-2');
    });

    it('should set selected model ID', () => {
      const state = dataModelSlice(initialState, setSelectedModelId('model-3'));
      expect(state.ui.selectedModelId).toBe('model-3');
    });
  });

  // ===================================================================
  // PART 2: Set Models (Bulk Load) (7 tests)
  // ===================================================================

  describe('Set Models (Bulk Load)', () => {
    it('should set models (replace all)', () => {
      const models = [
        { id: 'model-1', name: 'users', label: 'Users' },
        { id: 'model-2', name: 'posts', label: 'Posts' },
      ];

      const state = dataModelSlice(initialState, setModels(models));

      expect(state.ids).toEqual(['model-1', 'model-2']);
      expect(Object.keys(state.entities)).toHaveLength(2);
    });

    it('should clear existing models when setting new ones', () => {
      initialState.entities['model-old'] = { id: 'model-old', name: 'old' };
      initialState.ids.push('model-old');

      const models = [{ id: 'model-new', name: 'new', label: 'New Model' }];
      const state = dataModelSlice(initialState, setModels(models));

      expect(state.entities['model-old']).toBeUndefined();
      expect(state.entities['model-new']).toBeDefined();
    });

    it('should handle empty array', () => {
      initialState.entities['model-1'] = { id: 'model-1', name: 'Model' };
      initialState.ids.push('model-1');

      const state = dataModelSlice(initialState, setModels([]));

      expect(state.ids).toHaveLength(0);
      expect(Object.keys(state.entities)).toHaveLength(0);
    });

    it('should preserve UI state when setting models', () => {
      initialState.ui.selectedModelId = 'model-selected';

      const models = [{ id: 'model-1', name: 'model', label: 'Model' }];
      const state = dataModelSlice(initialState, setModels(models));

      expect(state.ui.selectedModelId).toBe('model-selected');
    });

    it('should handle large number of models', () => {
      const models = Array.from({ length: 25 }, (_, i) => ({
        id: `model-${i}`,
        name: `model${i}`,
        label: `Model ${i}`,
      }));

      const state = dataModelSlice(initialState, setModels(models));

      expect(state.ids).toHaveLength(25);
      expect(Object.keys(state.entities)).toHaveLength(25);
    });

    it('should set models with various properties', () => {
      const models = [
        {
          id: 'model-1',
          name: 'users',
          label: 'Users',
          kind: 'data-model',
          description: 'User data model',
        },
      ];

      const state = dataModelSlice(initialState, setModels(models));

      expect(state.entities['model-1']).toEqual(models[0]);
    });

    it('should preserve model order from payload', () => {
      const models = [
        { id: 'model-3', name: 'Third' },
        { id: 'model-1', name: 'First' },
        { id: 'model-2', name: 'Second' },
      ];

      const state = dataModelSlice(initialState, setModels(models));

      expect(state.ids).toEqual(['model-3', 'model-1', 'model-2']);
    });
  });

  // ===================================================================
  // PART 3: Add Data Model (10 tests)
  // ===================================================================

  describe('Add Data Model', () => {
    it('should add data model with generated ID', () => {
      const state = dataModelSlice(initialState, addDataModel());

      expect(state.ids).toHaveLength(1);
      const id = state.ids[0];
      expect(id).toBe('uuid-model-123');
      expect(state.entities[id].kind).toBe('data-model');
    });

    it('should add data model with provided ID', () => {
      const state = dataModelSlice(initialState, addDataModel('custom-id'));

      expect(state.ids).toContain('custom-id');
      expect(state.entities['custom-id'].id).toBe('custom-id');
    });

    it('should add data model with default label', () => {
      const state = dataModelSlice(initialState, addDataModel());

      const id = state.ids[0];
      expect(state.entities[id].label).toBe('New Collection');
      expect(state.entities[id].name).toBe('newModel');
    });

    it('should preserve existing models when adding new one', () => {
      initialState.entities['model-existing'] = {
        id: 'model-existing',
        name: 'existing',
      };
      initialState.ids.push('model-existing');

      const state = dataModelSlice(initialState, addDataModel());

      expect(state.entities['model-existing']).toBeDefined();
      expect(state.ids).toHaveLength(2);
    });

    it('should not affect UI state when adding model', () => {
      initialState.ui.selectedModelId = 'model-selected';

      const state = dataModelSlice(initialState, addDataModel());

      expect(state.ui.selectedModelId).toBe('model-selected');
    });

    it('should add multiple models sequentially', () => {
      let state = dataModelSlice(initialState, addDataModel('model-1'));
      state = dataModelSlice(state, addDataModel('model-2'));
      state = dataModelSlice(state, addDataModel('model-3'));

      expect(state.ids).toHaveLength(3);
    });

    it('should add model with entity kind', () => {
      const state = dataModelSlice(initialState, addDataModel());

      const id = state.ids[0];
      expect(state.entities[id].kind).toBe('data-model');
    });

    it('should handle null payload', () => {
      const state = dataModelSlice(initialState, addDataModel(null));

      expect(state.ids).toHaveLength(1);
      const id = state.ids[0];
      expect(state.entities[id]).toBeDefined();
    });

    it('should handle undefined payload', () => {
      const state = dataModelSlice(initialState, addDataModel(undefined));

      expect(state.ids).toHaveLength(1);
      const id = state.ids[0];
      expect(state.entities[id].id).toBe('uuid-model-123');
    });

    it('should handle empty string payload', () => {
      const state = dataModelSlice(initialState, addDataModel(''));

      expect(state.ids).toHaveLength(1);
      const id = state.ids[0];
      expect(id).toBe('');
      expect(state.entities[id].id).toBe('');
    });
  });

  // ===================================================================
  // PART 4: Update Model (7 tests)
  // ===================================================================

  describe('Update Model', () => {
    beforeEach(() => {
      initialState.entities['model-1'] = {
        id: 'model-1',
        name: 'users',
        label: 'Users',
        kind: 'data-model',
      };
      initialState.ids.push('model-1');
    });

    it('should update model', () => {
      const updatedModel = {
        id: 'model-1',
        name: 'updatedUsers',
        label: 'Updated Users',
        kind: 'data-model',
        description: 'Updated description',
      };

      const state = dataModelSlice(initialState, updateModel(updatedModel));

      expect(state.entities['model-1']).toEqual(updatedModel);
    });

    it('should replace all model properties', () => {
      const updatedModel = {
        id: 'model-1',
        name: 'newName',
        label: 'New Label',
      };

      const state = dataModelSlice(initialState, updateModel(updatedModel));

      expect(state.entities['model-1'].name).toBe('newName');
      expect(state.entities['model-1'].label).toBe('New Label');
      expect(state.entities['model-1'].kind).toBeUndefined(); // Old properties removed
    });

    it('should handle updating non-existent model', () => {
      const updatedModel = {
        id: 'non-existent',
        name: 'ghost',
        label: 'Ghost Model',
      };

      const state = dataModelSlice(initialState, updateModel(updatedModel));

      // Non-existent model gets created
      expect(state.entities['non-existent']).toEqual(updatedModel);
    });

    it('should handle null model', () => {
      const state = dataModelSlice(initialState, updateModel(null));

      // State unchanged
      expect(state.entities['model-1']).toEqual({
        id: 'model-1',
        name: 'users',
        label: 'Users',
        kind: 'data-model',
      });
    });

    it('should handle model without id', () => {
      const updatedModel = {
        name: 'noId',
        label: 'No ID Model',
      };

      const state = dataModelSlice(initialState, updateModel(updatedModel));

      // State unchanged
      expect(state.entities['model-1']).toEqual({
        id: 'model-1',
        name: 'users',
        label: 'Users',
        kind: 'data-model',
      });
    });

    it('should not affect other models when updating one', () => {
      initialState.entities['model-2'] = {
        id: 'model-2',
        name: 'posts',
        label: 'Posts',
      };
      initialState.ids.push('model-2');

      const updatedModel = {
        id: 'model-1',
        name: 'updated',
      };

      const state = dataModelSlice(initialState, updateModel(updatedModel));

      expect(state.entities['model-2']).toEqual({
        id: 'model-2',
        name: 'posts',
        label: 'Posts',
      });
    });

    it('should not affect UI state when updating model', () => {
      initialState.ui.selectedModelId = 'model-1';

      const updatedModel = {
        id: 'model-1',
        name: 'updated',
      };

      const state = dataModelSlice(initialState, updateModel(updatedModel));

      expect(state.ui.selectedModelId).toBe('model-1');
    });
  });

  // ===================================================================
  // PART 5: Integration Scenarios (3 tests)
  // ===================================================================

  describe('Integration Scenarios', () => {
    it('should handle complete model lifecycle', () => {
      let state = dataModelSlice(initialState, addDataModel('users'));
      const modelId = state.ids[0];

      state = dataModelSlice(
        state,
        updateModel({
          id: modelId,
          name: 'users',
          label: 'User Management',
          description: 'Manages user data',
        }),
      );
      state = dataModelSlice(state, setSelectedModelId(modelId));

      expect(state.entities[modelId].label).toBe('User Management');
      expect(state.ui.selectedModelId).toBe(modelId);
    });

    it('should maintain data integrity across operations', () => {
      const models = [
        { id: 'model-1', name: 'users', label: 'Users' },
        { id: 'model-2', name: 'posts', label: 'Posts' },
      ];

      let state = dataModelSlice(initialState, setModels(models));
      state = dataModelSlice(state, addDataModel('comments'));
      state = dataModelSlice(
        state,
        updateModel({
          id: 'model-1',
          name: 'users',
          label: 'Updated Users',
        }),
      );

      expect(state.ids).toHaveLength(3);
      expect(state.entities['model-1'].label).toBe('Updated Users');
      expect(state.entities['model-2']).toBeDefined();
    });

    it('should handle UI state changes with model operations', () => {
      let state = dataModelSlice(initialState, addDataModel('model-1'));
      const modelId = state.ids[0];

      state = dataModelSlice(state, setHoveredModelId(modelId));
      state = dataModelSlice(state, setFocusedModelId(modelId));
      state = dataModelSlice(state, setSelectedModelId(modelId));
      state = dataModelSlice(
        state,
        updateModel({
          id: modelId,
          name: 'updated',
        }),
      );

      expect(state.ui.hoveredModelId).toBe(modelId);
      expect(state.ui.focusedModelId).toBe(modelId);
      expect(state.ui.selectedModelId).toBe(modelId);
      expect(state.entities[modelId].name).toBe('updated');
    });
  });
});

