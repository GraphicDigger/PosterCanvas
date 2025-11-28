// ===================================================================
// Unit Tests for dataModelField Redux Slice
// Coverage Target: 100%
// Phase 2 - Push to 50% Coverage (41 lines, TypeScript migration)
// Risk: LOW (Redux Toolkit, predictable state management)
// 🎯 FIRST TYPESCRIPT TEST - Migration starts here!
// ===================================================================

import { describe, it, expect, beforeEach } from 'vitest';
import reducer, {
  setHoveredModelFieldId,
  setFocusedModelFieldId,
  setSelectedModelFieldId,
  // setSelectedModelId, // NOTE: Exported in slice but NOT implemented - skipping tests
  addDataModelField,
  addDataModelDefaultFields,
  upsertDataModelFields,
  updateDataModelField,
  updateDataModelFields,
  removeDataModelField,
  setDataModelFieldsForModel,
  setModelFields,
} from '../slice';

// ===================================================================
// TYPE DEFINITIONS
// ===================================================================

interface DataModelField {
  id: string;
  name: string;
  modelId: string;
  type?: string;
  required?: boolean;
  defaultValue?: any;
}

interface DataModelFieldUIState {
  hoveredModelFieldId: string | null;
  focusedModelFieldId: string | null;
  selectedModelFieldId: string | null;
  // NOTE: selectedModelId is exported in slice but NOT implemented in UI state actions
}

interface DataModelFieldState {
  ids: string[];
  entities: Record<string, DataModelField>;
  ui: DataModelFieldUIState;
  draft: DataModelField | null;
}

// ===================================================================
// TESTS
// ===================================================================

describe('dataModelField Redux Slice (TypeScript)', () => {
  let initialState: DataModelFieldState;

  beforeEach(() => {
    initialState = {
      ids: [],
      entities: {},
      ui: {
        hoveredModelFieldId: null,
        focusedModelFieldId: null,
        selectedModelFieldId: null,
      },
      draft: null,
    };
  });

  describe('Initial State', () => {
    it('should return initial state', () => {
      const state = reducer(undefined, { type: '@@INIT' });

      expect(state.ids).toEqual([]);
      expect(state.entities).toEqual({});
      expect(state.ui.hoveredModelFieldId).toBeNull();
      expect(state.ui.focusedModelFieldId).toBeNull();
      expect(state.ui.selectedModelFieldId).toBeNull();
      expect(state.draft).toBeNull();
    });

    it('should have correct state structure', () => {
      const state = reducer(undefined, { type: '@@INIT' });

      expect(state).toHaveProperty('ids');
      expect(state).toHaveProperty('entities');
      expect(state).toHaveProperty('ui');
      expect(state).toHaveProperty('draft');
    });
  });

  describe('UI State Actions', () => {
    describe('setHoveredModelFieldId', () => {
      it('should set hovered model field ID', () => {
        const state = reducer(initialState, setHoveredModelFieldId('field-1'));

        expect(state.ui.hoveredModelFieldId).toBe('field-1');
      });

      it('should clear hovered model field ID', () => {
        const stateWithHovered: DataModelFieldState = {
          ...initialState,
          ui: { ...initialState.ui, hoveredModelFieldId: 'field-1' },
        };

        const state = reducer(stateWithHovered, setHoveredModelFieldId(null));

        expect(state.ui.hoveredModelFieldId).toBeNull();
      });
    });

    describe('setFocusedModelFieldId', () => {
      it('should set focused model field ID', () => {
        const state = reducer(initialState, setFocusedModelFieldId('field-1'));

        expect(state.ui.focusedModelFieldId).toBe('field-1');
      });

      it('should clear focused model field ID', () => {
        const stateWithFocused: DataModelFieldState = {
          ...initialState,
          ui: { ...initialState.ui, focusedModelFieldId: 'field-1' },
        };

        const state = reducer(stateWithFocused, setFocusedModelFieldId(null));

        expect(state.ui.focusedModelFieldId).toBeNull();
      });
    });

    describe('setSelectedModelFieldId', () => {
      it('should set selected model field ID', () => {
        const state = reducer(initialState, setSelectedModelFieldId('field-1'));

        expect(state.ui.selectedModelFieldId).toBe('field-1');
      });

      it('should clear selected model field ID', () => {
        const stateWithSelected: DataModelFieldState = {
          ...initialState,
          ui: { ...initialState.ui, selectedModelFieldId: 'field-1' },
        };

        const state = reducer(stateWithSelected, setSelectedModelFieldId(null));

        expect(state.ui.selectedModelFieldId).toBeNull();
      });
    });

    // NOTE: setSelectedModelId is exported in slice.js but NOT implemented in uiStates/actions.js
    // Skipping tests for non-existent action
  });

  describe('Query Actions', () => {
    describe('setModelFields', () => {
      it('should set model fields from array', () => {
        const fields: DataModelField[] = [
          { id: 'field-1', name: 'Field 1', modelId: 'model-1' },
          { id: 'field-2', name: 'Field 2', modelId: 'model-1' },
        ];

        const state = reducer(initialState, setModelFields(fields));

        expect(state.ids).toEqual(['field-1', 'field-2']);
        expect(state.entities['field-1']).toEqual(fields[0]);
        expect(state.entities['field-2']).toEqual(fields[1]);
      });

      it('should replace existing fields', () => {
        const stateWithFields: DataModelFieldState = {
          ...initialState,
          ids: ['field-old'],
          entities: { 'field-old': { id: 'field-old', name: 'Old', modelId: 'model-1' } },
        };

        const newFields: DataModelField[] = [
          { id: 'field-1', name: 'Field 1', modelId: 'model-1' },
        ];

        const state = reducer(stateWithFields, setModelFields(newFields));

        expect(state.ids).toEqual(['field-1']);
        expect(state.entities['field-old']).toBeUndefined();
        expect(state.entities['field-1']).toEqual(newFields[0]);
      });

      it('should handle empty array', () => {
        const stateWithFields: DataModelFieldState = {
          ...initialState,
          ids: ['field-1'],
          entities: { 'field-1': { id: 'field-1', name: 'Field 1', modelId: 'model-1' } },
        };

        const state = reducer(stateWithFields, setModelFields([]));

        expect(state.ids).toEqual([]);
        expect(state.entities).toEqual({});
      });
    });
  });

  describe('Mutation Actions', () => {
    describe('upsertDataModelFields', () => {
      it('should add new fields', () => {
        const fields: DataModelField[] = [
          { id: 'field-1', name: 'Field 1', modelId: 'model-1' },
          { id: 'field-2', name: 'Field 2', modelId: 'model-1' },
        ];

        const state = reducer(initialState, upsertDataModelFields(fields));

        expect(state.ids).toEqual(['field-1', 'field-2']);
        expect(state.entities['field-1']).toEqual(fields[0]);
        expect(state.entities['field-2']).toEqual(fields[1]);
      });

      it('should update existing fields', () => {
        const stateWithField: DataModelFieldState = {
          ...initialState,
          ids: ['field-1'],
          entities: { 'field-1': { id: 'field-1', name: 'Original', modelId: 'model-1' } },
        };

        const updatedFields: DataModelField[] = [
          { id: 'field-1', name: 'Updated', modelId: 'model-1', type: 'string' },
        ];

        const state = reducer(stateWithField, upsertDataModelFields(updatedFields));

        expect(state.entities['field-1'].name).toBe('Updated');
        expect(state.entities['field-1'].type).toBe('string');
      });

      it('should handle mix of new and existing fields', () => {
        const stateWithField: DataModelFieldState = {
          ...initialState,
          ids: ['field-1'],
          entities: { 'field-1': { id: 'field-1', name: 'Existing', modelId: 'model-1' } },
        };

        const fields: DataModelField[] = [
          { id: 'field-1', name: 'Updated', modelId: 'model-1' },
          { id: 'field-2', name: 'New', modelId: 'model-1' },
        ];

        const state = reducer(stateWithField, upsertDataModelFields(fields));

        expect(state.ids).toEqual(['field-1', 'field-2']);
        expect(state.entities['field-1'].name).toBe('Updated');
        expect(state.entities['field-2'].name).toBe('New');
      });

      it('should skip invalid fields', () => {
        const fields: any[] = [
          { id: 'field-1', name: 'Valid', modelId: 'model-1' },
          null,
          { name: 'No ID', modelId: 'model-1' },
          { id: 'field-2', name: 'Also Valid', modelId: 'model-1' },
        ];

        const state = reducer(initialState, upsertDataModelFields(fields));

        expect(state.ids).toEqual(['field-1', 'field-2']);
        expect(Object.keys(state.entities)).toHaveLength(2);
      });
    });

    describe('updateDataModelField', () => {
      it('should update existing field', () => {
        const stateWithField: DataModelFieldState = {
          ...initialState,
          ids: ['field-1'],
          entities: { 'field-1': { id: 'field-1', name: 'Original', modelId: 'model-1' } },
        };

        const state = reducer(stateWithField, updateDataModelField({
          id: 'field-1',
          changes: { name: 'Updated' },
        }));

        expect(state.entities['field-1'].name).toBe('Updated');
        expect(state.entities['field-1'].modelId).toBe('model-1');
      });

      it('should partially update field', () => {
        const stateWithField: DataModelFieldState = {
          ...initialState,
          ids: ['field-1'],
          entities: {
            'field-1': {
              id: 'field-1',
              name: 'Field 1',
              modelId: 'model-1',
              type: 'string',
              required: false,
            },
          },
        };

        const state = reducer(stateWithField, updateDataModelField({
          id: 'field-1',
          changes: { required: true },
        }));

        expect(state.entities['field-1'].name).toBe('Field 1');
        expect(state.entities['field-1'].type).toBe('string');
        expect(state.entities['field-1'].required).toBe(true);
      });

      it('should handle updating non-existent field', () => {
        const state = reducer(initialState, updateDataModelField({
          id: 'non-existent',
          changes: { name: 'Updated' },
        }));

        expect(state.entities['non-existent']).toBeUndefined();
      });
    });

    describe('updateDataModelFields', () => {
      it('should update multiple fields', () => {
        const stateWithFields: DataModelFieldState = {
          ...initialState,
          ids: ['field-1', 'field-2'],
          entities: {
            'field-1': { id: 'field-1', name: 'Field 1', modelId: 'model-1' },
            'field-2': { id: 'field-2', name: 'Field 2', modelId: 'model-1' },
          },
        };

        const updates = [
          { id: 'field-1', changes: { type: 'string' } },
          { id: 'field-2', changes: { type: 'number' } },
        ];

        const state = reducer(stateWithFields, updateDataModelFields(updates));

        expect(state.entities['field-1'].type).toBe('string');
        expect(state.entities['field-2'].type).toBe('number');
      });
    });

    describe('removeDataModelField', () => {
      it('should remove field', () => {
        const stateWithFields: DataModelFieldState = {
          ...initialState,
          ids: ['field-1', 'field-2'],
          entities: {
            'field-1': { id: 'field-1', name: 'Field 1', modelId: 'model-1' },
            'field-2': { id: 'field-2', name: 'Field 2', modelId: 'model-1' },
          },
        };

        const state = reducer(stateWithFields, removeDataModelField('field-1'));

        expect(state.ids).toEqual(['field-2']);
        expect(state.entities['field-1']).toBeUndefined();
        expect(state.entities['field-2']).toBeDefined();
      });

      it('should handle removing non-existent field', () => {
        const stateWithField: DataModelFieldState = {
          ...initialState,
          ids: ['field-1'],
          entities: { 'field-1': { id: 'field-1', name: 'Field 1', modelId: 'model-1' } },
        };

        const state = reducer(stateWithField, removeDataModelField('non-existent'));

        expect(state.ids).toEqual(['field-1']);
        expect(state.entities['field-1']).toBeDefined();
      });
    });

    describe('setDataModelFieldsForModel', () => {
      it('should set fields for specific model', () => {
        const fields: DataModelField[] = [
          { id: 'field-1', name: 'Field 1', modelId: 'model-1' },
          { id: 'field-2', name: 'Field 2', modelId: 'model-1' },
        ];

        const state = reducer(initialState, setDataModelFieldsForModel({
          modelId: 'model-1',
          fields,
        }));

        expect(state.ids).toEqual(['field-1', 'field-2']);
        expect(state.entities['field-1'].modelId).toBe('model-1');
        expect(state.entities['field-2'].modelId).toBe('model-1');
      });

      it('should replace fields for model', () => {
        const stateWithFields: DataModelFieldState = {
          ...initialState,
          ids: ['field-old-1', 'field-old-2'],
          entities: {
            'field-old-1': { id: 'field-old-1', name: 'Old 1', modelId: 'model-1' },
            'field-old-2': { id: 'field-old-2', name: 'Old 2', modelId: 'model-1' },
          },
        };

        const newFields: DataModelField[] = [
          { id: 'field-1', name: 'New 1', modelId: 'model-1' },
        ];

        const state = reducer(stateWithFields, setDataModelFieldsForModel({
          modelId: 'model-1',
          fields: newFields,
        }));

        expect(state.ids).toEqual(['field-1']);
        expect(state.entities['field-old-1']).toBeUndefined();
        expect(state.entities['field-1']).toBeDefined();
      });
    });
  });

  describe('Complex Scenarios', () => {
    it('should handle full field lifecycle', () => {
      let state = initialState;

      // Add field
      state = reducer(state, upsertDataModelFields([
        { id: 'field-1', name: 'Field 1', modelId: 'model-1' },
      ]));
      expect(state.ids).toContain('field-1');

      // Select field
      state = reducer(state, setSelectedModelFieldId('field-1'));
      expect(state.ui.selectedModelFieldId).toBe('field-1');

      // Update field
      state = reducer(state, updateDataModelField({
        id: 'field-1',
        changes: { name: 'Updated Field', type: 'string' },
      }));
      expect(state.entities['field-1'].name).toBe('Updated Field');

      // Remove field
      state = reducer(state, removeDataModelField('field-1'));
      expect(state.ids).not.toContain('field-1');
    });

    it('should handle multiple models with different fields', () => {
      let state = initialState;

      // Add fields for model-1
      state = reducer(state, setDataModelFieldsForModel({
        modelId: 'model-1',
        fields: [
          { id: 'field-1', name: 'Model 1 Field 1', modelId: 'model-1' },
          { id: 'field-2', name: 'Model 1 Field 2', modelId: 'model-1' },
        ],
      }));

      // Add fields for model-2
      state = reducer(state, upsertDataModelFields([
        { id: 'field-3', name: 'Model 2 Field 1', modelId: 'model-2' },
        { id: 'field-4', name: 'Model 2 Field 2', modelId: 'model-2' },
      ]));

      expect(state.ids).toHaveLength(4);
      expect(state.entities['field-1'].modelId).toBe('model-1');
      expect(state.entities['field-3'].modelId).toBe('model-2');
    });

    it('should handle UI state with multiple selections', () => {
      let state = initialState;

      // NOTE: setSelectedModelId not implemented, skipping that part
      state = reducer(state, setHoveredModelFieldId('field-1'));
      state = reducer(state, setFocusedModelFieldId('field-2'));
      state = reducer(state, setSelectedModelFieldId('field-3'));

      expect(state.ui.hoveredModelFieldId).toBe('field-1');
      expect(state.ui.focusedModelFieldId).toBe('field-2');
      expect(state.ui.selectedModelFieldId).toBe('field-3');
    });
  });

  describe('Edge Cases', () => {
    it('should handle rapid UI state changes', () => {
      let state = initialState;

      state = reducer(state, setHoveredModelFieldId('field-1'));
      state = reducer(state, setHoveredModelFieldId('field-2'));
      state = reducer(state, setHoveredModelFieldId('field-3'));
      state = reducer(state, setHoveredModelFieldId(null));

      expect(state.ui.hoveredModelFieldId).toBeNull();
    });

    it('should handle upsert with empty array', () => {
      const state = reducer(initialState, upsertDataModelFields([]));

      expect(state.ids).toEqual([]);
      expect(state.entities).toEqual({});
    });

    it('should maintain draft state through operations', () => {
      const stateWithDraft: DataModelFieldState = {
        ...initialState,
        draft: { id: 'draft-1', name: 'Draft Field', modelId: 'model-1' },
      };

      let state = reducer(stateWithDraft, upsertDataModelFields([
        { id: 'field-1', name: 'Field 1', modelId: 'model-1' },
      ]));

      expect(state.draft).toEqual({ id: 'draft-1', name: 'Draft Field', modelId: 'model-1' });

      state = reducer(state, updateDataModelField({
        id: 'field-1',
        changes: { name: 'Updated' },
      }));

      expect(state.draft).toEqual({ id: 'draft-1', name: 'Draft Field', modelId: 'model-1' });
    });
  });

  describe('Type Safety', () => {
    it('should enforce field structure', () => {
      const field: DataModelField = {
        id: 'field-1',
        name: 'Test Field',
        modelId: 'model-1',
        type: 'string',
        required: true,
        defaultValue: 'default',
      };

      const state = reducer(initialState, upsertDataModelFields([field]));

      expect(state.entities['field-1']).toEqual(field);
    });

    it('should handle optional field properties', () => {
      const minimalField: DataModelField = {
        id: 'field-1',
        name: 'Minimal',
        modelId: 'model-1',
      };

      const state = reducer(initialState, upsertDataModelFields([minimalField]));

      expect(state.entities['field-1'].id).toBe('field-1');
      expect(state.entities['field-1'].type).toBeUndefined();
      expect(state.entities['field-1'].required).toBeUndefined();
    });
  });
});

