// ===================================================================
// Unit Tests for dataModelEditor (dbModelEditor) Redux Slice
// Coverage Target: 100%
// Phase 2 - Push to 50% Coverage (24 lines, TypeScript)
// Risk: LOW (Redux Toolkit, predictable state management)
// ===================================================================

import { describe, it, expect, beforeEach } from 'vitest';
import reducer, {
  addFieldToDraft,
  updateDraftModelField,
  clearModelDraft,
} from '../slice';

// ===================================================================
// TYPE DEFINITIONS
// ===================================================================

interface Field {
  id: string;
  name: string;
  type?: string;
  required?: boolean;
  [key: string]: any;
}

interface ModelDraft {
  fields: Record<string, Partial<Field>>;
  newFields: Field[];
}

interface DataModelEditorState {
  draft: {
    models: Record<string, ModelDraft>;
  };
}

// ===================================================================
// TESTS
// ===================================================================

describe('dataModelEditor (dbModelEditor) Redux Slice (TypeScript)', () => {
  let initialState: DataModelEditorState;

  beforeEach(() => {
    initialState = {
      draft: {
        models: {},
      },
    };
  });

  describe('Initial State', () => {
    it('should return initial state', () => {
      const state = reducer(undefined, { type: '@@INIT' });

      expect(state.draft).toBeDefined();
      expect(state.draft.models).toEqual({});
    });

    it('should have correct state structure', () => {
      const state = reducer(undefined, { type: '@@INIT' });

      expect(state).toHaveProperty('draft');
      expect(state.draft).toHaveProperty('models');
    });

    it('should initialize with empty models', () => {
      const state = reducer(undefined, { type: '@@INIT' });

      expect(Object.keys(state.draft.models)).toHaveLength(0);
    });
  });

  describe('addFieldToDraft Action', () => {
    it('should add field to new model draft', () => {
      const field: Field = { id: 'field-1', name: 'Field 1', type: 'string' };
      const state = reducer(initialState, addFieldToDraft({
        modelId: 'model-1',
        field,
      }));

      expect(state.draft.models['model-1']).toBeDefined();
      expect(state.draft.models['model-1'].newFields).toContain(field);
      expect(state.draft.models['model-1'].newFields).toHaveLength(1);
    });

    it('should add multiple fields to same model', () => {
      let state = initialState;

      const field1: Field = { id: 'field-1', name: 'Field 1' };
      const field2: Field = { id: 'field-2', name: 'Field 2' };

      state = reducer(state, addFieldToDraft({ modelId: 'model-1', field: field1 }));
      state = reducer(state, addFieldToDraft({ modelId: 'model-1', field: field2 }));

      expect(state.draft.models['model-1'].newFields).toHaveLength(2);
      expect(state.draft.models['model-1'].newFields).toContain(field1);
      expect(state.draft.models['model-1'].newFields).toContain(field2);
    });

    it('should add fields to different models', () => {
      let state = initialState;

      const field1: Field = { id: 'field-1', name: 'Model 1 Field' };
      const field2: Field = { id: 'field-2', name: 'Model 2 Field' };

      state = reducer(state, addFieldToDraft({ modelId: 'model-1', field: field1 }));
      state = reducer(state, addFieldToDraft({ modelId: 'model-2', field: field2 }));

      expect(state.draft.models['model-1'].newFields).toContain(field1);
      expect(state.draft.models['model-2'].newFields).toContain(field2);
      expect(Object.keys(state.draft.models)).toHaveLength(2);
    });

    it('should handle missing modelId', () => {
      const field: Field = { id: 'field-1', name: 'Field 1' };
      const state = reducer(initialState, addFieldToDraft({
        modelId: null as any,
        field,
      }));

      // Should not add anything when modelId is missing
      expect(Object.keys(state.draft.models)).toHaveLength(0);
    });

    it('should handle missing field', () => {
      const state = reducer(initialState, addFieldToDraft({
        modelId: 'model-1',
        field: null as any,
      }));

      // Should not add anything when field is missing
      expect(Object.keys(state.draft.models)).toHaveLength(0);
    });

    it('should initialize draft structure if missing', () => {
      const stateWithoutDraft = {} as DataModelEditorState;
      const field: Field = { id: 'field-1', name: 'Field 1' };

      const state = reducer(stateWithoutDraft, addFieldToDraft({
        modelId: 'model-1',
        field,
      }));

      expect(state.draft).toBeDefined();
      expect(state.draft.models).toBeDefined();
      expect(state.draft.models['model-1'].newFields).toContain(field);
    });

    it('should add field with complex data', () => {
      const field: Field = {
        id: 'field-1',
        name: 'Complex Field',
        type: 'object',
        required: true,
        defaultValue: { key: 'value' },
        validation: { min: 0, max: 100 },
      };

      const state = reducer(initialState, addFieldToDraft({
        modelId: 'model-1',
        field,
      }));

      expect(state.draft.models['model-1'].newFields[0]).toEqual(field);
    });
  });

  describe('updateDraftModelField Action', () => {
    it('should update field in draft', () => {
      const state = reducer(initialState, updateDraftModelField({
        modelId: 'model-1',
        fieldId: 'field-1',
        updates: { name: 'Updated Field', type: 'string' },
      }));

      expect(state.draft.models['model-1']).toBeDefined();
      expect(state.draft.models['model-1'].fields['field-1']).toEqual({
        name: 'Updated Field',
        type: 'string',
      });
    });

    it('should create model structure if missing', () => {
      const state = reducer(initialState, updateDraftModelField({
        modelId: 'model-1',
        fieldId: 'field-1',
        updates: { name: 'Field 1' },
      }));

      expect(state.draft.models['model-1']).toBeDefined();
      expect(state.draft.models['model-1'].fields).toBeDefined();
      expect(state.draft.models['model-1'].newFields).toBeDefined();
    });

    it('should merge updates with existing field data', () => {
      let state = initialState;

      // First update
      state = reducer(state, updateDraftModelField({
        modelId: 'model-1',
        fieldId: 'field-1',
        updates: { name: 'Field 1', type: 'string' },
      }));

      // Second update
      state = reducer(state, updateDraftModelField({
        modelId: 'model-1',
        fieldId: 'field-1',
        updates: { required: true },
      }));

      expect(state.draft.models['model-1'].fields['field-1']).toEqual({
        name: 'Field 1',
        type: 'string',
        required: true,
      });
    });

    it('should update multiple fields in same model', () => {
      let state = initialState;

      state = reducer(state, updateDraftModelField({
        modelId: 'model-1',
        fieldId: 'field-1',
        updates: { name: 'Field 1' },
      }));

      state = reducer(state, updateDraftModelField({
        modelId: 'model-1',
        fieldId: 'field-2',
        updates: { name: 'Field 2' },
      }));

      expect(state.draft.models['model-1'].fields['field-1'].name).toBe('Field 1');
      expect(state.draft.models['model-1'].fields['field-2'].name).toBe('Field 2');
    });

    it('should update fields in different models', () => {
      let state = initialState;

      state = reducer(state, updateDraftModelField({
        modelId: 'model-1',
        fieldId: 'field-1',
        updates: { name: 'Model 1 Field' },
      }));

      state = reducer(state, updateDraftModelField({
        modelId: 'model-2',
        fieldId: 'field-1',
        updates: { name: 'Model 2 Field' },
      }));

      expect(state.draft.models['model-1'].fields['field-1'].name).toBe('Model 1 Field');
      expect(state.draft.models['model-2'].fields['field-1'].name).toBe('Model 2 Field');
    });

    it('should initialize draft if missing', () => {
      const stateWithoutDraft = {} as DataModelEditorState;

      const state = reducer(stateWithoutDraft, updateDraftModelField({
        modelId: 'model-1',
        fieldId: 'field-1',
        updates: { name: 'Field 1' },
      }));

      expect(state.draft).toBeDefined();
      expect(state.draft.models['model-1'].fields['field-1'].name).toBe('Field 1');
    });
  });

  describe('clearModelDraft Action', () => {
    it('should clear specific model draft', () => {
      let state = initialState;

      // Add fields to two models
      state = reducer(state, addFieldToDraft({
        modelId: 'model-1',
        field: { id: 'field-1', name: 'Field 1' },
      }));

      state = reducer(state, addFieldToDraft({
        modelId: 'model-2',
        field: { id: 'field-2', name: 'Field 2' },
      }));

      // Clear only model-1
      state = reducer(state, clearModelDraft({ modelId: 'model-1' }));

      expect(state.draft.models['model-1']).toBeUndefined();
      expect(state.draft.models['model-2']).toBeDefined();
    });

    it('should clear all models when no modelId provided', () => {
      let state = initialState;

      // Add fields to two models
      state = reducer(state, addFieldToDraft({
        modelId: 'model-1',
        field: { id: 'field-1', name: 'Field 1' },
      }));

      state = reducer(state, addFieldToDraft({
        modelId: 'model-2',
        field: { id: 'field-2', name: 'Field 2' },
      }));

      // Clear all
      state = reducer(state, clearModelDraft({}));

      expect(state.draft.models).toEqual({});
      expect(Object.keys(state.draft.models)).toHaveLength(0);
    });

    it('should handle clearing non-existent model', () => {
      let state = initialState;

      state = reducer(state, addFieldToDraft({
        modelId: 'model-1',
        field: { id: 'field-1', name: 'Field 1' },
      }));

      // Try to clear non-existent model
      state = reducer(state, clearModelDraft({ modelId: 'model-999' }));

      // model-1 should still exist
      expect(state.draft.models['model-1']).toBeDefined();
    });

    it('should initialize draft if missing', () => {
      const stateWithoutDraft = {} as DataModelEditorState;

      const state = reducer(stateWithoutDraft, clearModelDraft({}));

      expect(state.draft).toBeDefined();
      expect(state.draft.models).toEqual({});
    });

    it('should clear model with both fields and newFields', () => {
      let state = initialState;

      // Add new field
      state = reducer(state, addFieldToDraft({
        modelId: 'model-1',
        field: { id: 'field-1', name: 'New Field' },
      }));

      // Update existing field
      state = reducer(state, updateDraftModelField({
        modelId: 'model-1',
        fieldId: 'field-2',
        updates: { name: 'Updated Field' },
      }));

      expect(state.draft.models['model-1'].newFields).toHaveLength(1);
      expect(state.draft.models['model-1'].fields['field-2']).toBeDefined();

      // Clear the model
      state = reducer(state, clearModelDraft({ modelId: 'model-1' }));

      expect(state.draft.models['model-1']).toBeUndefined();
    });
  });

  describe('Complex Scenarios', () => {
    it('should handle full draft workflow', () => {
      let state = initialState;

      // Add new field
      state = reducer(state, addFieldToDraft({
        modelId: 'model-1',
        field: { id: 'field-1', name: 'New Field', type: 'string' },
      }));

      expect(state.draft.models['model-1'].newFields).toHaveLength(1);

      // Update existing field
      state = reducer(state, updateDraftModelField({
        modelId: 'model-1',
        fieldId: 'field-2',
        updates: { name: 'Updated Field', required: true },
      }));

      expect(state.draft.models['model-1'].fields['field-2']).toBeDefined();

      // Add another new field
      state = reducer(state, addFieldToDraft({
        modelId: 'model-1',
        field: { id: 'field-3', name: 'Another Field' },
      }));

      expect(state.draft.models['model-1'].newFields).toHaveLength(2);

      // Clear the draft
      state = reducer(state, clearModelDraft({ modelId: 'model-1' }));

      expect(state.draft.models['model-1']).toBeUndefined();
    });

    it('should handle multiple models simultaneously', () => {
      let state = initialState;

      // Work with model-1
      state = reducer(state, addFieldToDraft({
        modelId: 'model-1',
        field: { id: 'field-1', name: 'Model 1 Field' },
      }));

      state = reducer(state, updateDraftModelField({
        modelId: 'model-1',
        fieldId: 'field-2',
        updates: { name: 'Model 1 Updated' },
      }));

      // Work with model-2
      state = reducer(state, addFieldToDraft({
        modelId: 'model-2',
        field: { id: 'field-3', name: 'Model 2 Field' },
      }));

      state = reducer(state, updateDraftModelField({
        modelId: 'model-2',
        fieldId: 'field-4',
        updates: { name: 'Model 2 Updated' },
      }));

      expect(Object.keys(state.draft.models)).toHaveLength(2);
      expect(state.draft.models['model-1'].newFields).toHaveLength(1);
      expect(state.draft.models['model-2'].newFields).toHaveLength(1);

      // Clear only model-1
      state = reducer(state, clearModelDraft({ modelId: 'model-1' }));

      expect(state.draft.models['model-1']).toBeUndefined();
      expect(state.draft.models['model-2']).toBeDefined();
    });

    it('should handle rapid operations', () => {
      let state = initialState;

      for (let i = 1; i <= 5; i++) {
        state = reducer(state, addFieldToDraft({
          modelId: 'model-1',
          field: { id: `field-${i}`, name: `Field ${i}` },
        }));
      }

      expect(state.draft.models['model-1'].newFields).toHaveLength(5);

      for (let i = 1; i <= 5; i++) {
        state = reducer(state, updateDraftModelField({
          modelId: 'model-1',
          fieldId: `existing-${i}`,
          updates: { name: `Updated ${i}` },
        }));
      }

      expect(Object.keys(state.draft.models['model-1'].fields)).toHaveLength(5);
    });
  });

  describe('State Structure', () => {
    it('should maintain correct state structure', () => {
      const state = reducer(undefined, { type: '@@INIT' });

      expect(state).toHaveProperty('draft');
      expect(state.draft).toHaveProperty('models');
      expect(typeof state.draft.models).toBe('object');
    });

    it('should maintain structure after operations', () => {
      let state = initialState;

      state = reducer(state, addFieldToDraft({
        modelId: 'model-1',
        field: { id: 'field-1', name: 'Field 1' },
      }));

      expect(state.draft.models['model-1']).toHaveProperty('fields');
      expect(state.draft.models['model-1']).toHaveProperty('newFields');
      expect(Array.isArray(state.draft.models['model-1'].newFields)).toBe(true);
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty payload for clearModelDraft', () => {
      let state = initialState;

      state = reducer(state, addFieldToDraft({
        modelId: 'model-1',
        field: { id: 'field-1', name: 'Field 1' },
      }));

      state = reducer(state, clearModelDraft(undefined as any));

      // Should clear all models when payload is undefined
      expect(state.draft.models).toEqual({});
    });

    it('should handle undefined updates', () => {
      const state = reducer(initialState, updateDraftModelField({
        modelId: 'model-1',
        fieldId: 'field-1',
        updates: undefined as any,
      }));

      // Should still create the structure but with undefined updates
      expect(state.draft.models['model-1']).toBeDefined();
    });

    it('should handle empty string modelId', () => {
      const field: Field = { id: 'field-1', name: 'Field 1' };
      const state = reducer(initialState, addFieldToDraft({
        modelId: '',
        field,
      }));

      // Should not add when modelId is empty string
      expect(Object.keys(state.draft.models)).toHaveLength(0);
    });
  });

  describe('Type Safety', () => {
    it('should enforce field structure', () => {
      const field: Field = {
        id: 'field-1',
        name: 'Typed Field',
        type: 'string',
        required: true,
      };

      const state = reducer(initialState, addFieldToDraft({
        modelId: 'model-1',
        field,
      }));

      expect(state.draft.models['model-1'].newFields[0]).toEqual(field);
    });

    it('should handle partial updates', () => {
      const state = reducer(initialState, updateDraftModelField({
        modelId: 'model-1',
        fieldId: 'field-1',
        updates: { name: 'Partial Update' },
      }));

      expect(state.draft.models['model-1'].fields['field-1'].name).toBe('Partial Update');
    });
  });
});

