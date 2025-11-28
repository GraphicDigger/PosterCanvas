// ===================================================================
// Unit Tests for DataModelField Slice
// CRITICAL BUSINESS LOGIC - Data Model Field State Management
// Phase 1, Day 8 - Part 1 (30 tests)
// ===================================================================

import { describe, it, expect, beforeEach } from 'vitest';

import dataModelFieldSlice, {
  setHoveredModelFieldId,
  setFocusedModelFieldId,
  setSelectedModelFieldId,
  addDataModelField,
  upsertDataModelFields,
  updateDataModelField,
  updateDataModelFields,
  removeDataModelField,
  setDataModelFieldsForModel,
  setModelFields,
} from './slice';

describe('DataModelField Slice', () => {
  let initialState;

  beforeEach(() => {
    initialState = {
      ids: [],
      entities: {},
      draft: null,
      ui: {
        hoveredModelFieldId: null,
        focusedModelFieldId: null,
        selectedModelFieldId: null,
        selectedModelId: null,
      },
    };
  });

  // ===================================================================
  // PART 1: UI State Management (3 tests)
  // ===================================================================

  describe('UI State Management', () => {
    it('should set hovered model field ID', () => {
      const state = dataModelFieldSlice(
        initialState,
        setHoveredModelFieldId('field-1'),
      );
      expect(state.ui.hoveredModelFieldId).toBe('field-1');
    });

    it('should set focused model field ID', () => {
      const state = dataModelFieldSlice(
        initialState,
        setFocusedModelFieldId('field-2'),
      );
      expect(state.ui.focusedModelFieldId).toBe('field-2');
    });

    it('should set selected model field ID', () => {
      const state = dataModelFieldSlice(
        initialState,
        setSelectedModelFieldId('field-3'),
      );
      expect(state.ui.selectedModelFieldId).toBe('field-3');
    });
  });

  // ===================================================================
  // PART 2: Set Model Fields (Bulk Load) (5 tests)
  // ===================================================================

  describe('Set Model Fields (Bulk Load)', () => {
    it('should set model fields (replace all)', () => {
      const fields = [
        { id: 'field-1', name: 'firstName', type: 'text', modelId: 'model-1' },
        { id: 'field-2', name: 'lastName', type: 'text', modelId: 'model-1' },
      ];

      const state = dataModelFieldSlice(initialState, setModelFields(fields));

      expect(state.ids).toEqual(['field-1', 'field-2']);
      expect(Object.keys(state.entities)).toHaveLength(2);
    });

    it('should clear existing fields when setting new ones', () => {
      initialState.entities['field-old'] = { id: 'field-old', name: 'old' };
      initialState.ids.push('field-old');

      const fields = [{ id: 'field-new', name: 'new', modelId: 'model-1' }];
      const state = dataModelFieldSlice(initialState, setModelFields(fields));

      expect(state.entities['field-old']).toBeUndefined();
      expect(state.entities['field-new']).toBeDefined();
    });

    it('should handle empty array', () => {
      initialState.entities['field-1'] = { id: 'field-1', name: 'Field' };
      initialState.ids.push('field-1');

      const state = dataModelFieldSlice(initialState, setModelFields([]));

      expect(state.ids).toHaveLength(0);
      expect(Object.keys(state.entities)).toHaveLength(0);
    });

    it('should preserve UI state when setting fields', () => {
      initialState.ui.selectedModelFieldId = 'field-selected';

      const fields = [{ id: 'field-1', name: 'field', modelId: 'model-1' }];
      const state = dataModelFieldSlice(initialState, setModelFields(fields));

      expect(state.ui.selectedModelFieldId).toBe('field-selected');
    });

    it('should handle large number of fields', () => {
      const fields = Array.from({ length: 50 }, (_, i) => ({
        id: `field-${i}`,
        name: `Field ${i}`,
        type: 'text',
        modelId: 'model-1',
      }));

      const state = dataModelFieldSlice(initialState, setModelFields(fields));

      expect(state.ids).toHaveLength(50);
      expect(Object.keys(state.entities)).toHaveLength(50);
    });
  });

  // ===================================================================
  // PART 3: Add Model Field (4 tests)
  // ===================================================================

  describe('Add Model Field', () => {
    it('should add model field', () => {
      const field = {
        id: 'field-1',
        name: 'email',
        type: 'email',
        modelId: 'model-1',
      };

      const state = dataModelFieldSlice(initialState, addDataModelField(field));

      expect(state.ids).toContain('field-1');
      expect(state.entities['field-1']).toEqual(field);
    });

    it('should not add duplicate field', () => {
      initialState.entities['field-1'] = { id: 'field-1', name: 'existing' };
      initialState.ids.push('field-1');

      const field = { id: 'field-1', name: 'duplicate' };
      const state = dataModelFieldSlice(initialState, addDataModelField(field));

      expect(state.ids).toHaveLength(1);
      expect(state.entities['field-1'].name).toBe('existing');
    });

    it('should handle invalid field (no id)', () => {
      const field = { name: 'noId' };
      const state = dataModelFieldSlice(initialState, addDataModelField(field));

      expect(state.ids).toHaveLength(0);
    });

    it('should preserve existing fields when adding new one', () => {
      initialState.entities['field-existing'] = {
        id: 'field-existing',
        name: 'existing',
      };
      initialState.ids.push('field-existing');

      const field = { id: 'field-new', name: 'new' };
      const state = dataModelFieldSlice(initialState, addDataModelField(field));

      expect(state.entities['field-existing']).toBeDefined();
      expect(state.ids).toHaveLength(2);
    });
  });

  // ===================================================================
  // PART 4: Upsert Model Fields (5 tests)
  // ===================================================================

  describe('Upsert Model Fields', () => {
    it('should add new fields', () => {
      const fields = [
        { id: 'field-1', name: 'firstName', modelId: 'model-1' },
        { id: 'field-2', name: 'lastName', modelId: 'model-1' },
      ];

      const state = dataModelFieldSlice(initialState, upsertDataModelFields(fields));

      expect(state.ids).toEqual(['field-1', 'field-2']);
      expect(state.entities['field-1']).toBeDefined();
    });

    it('should update existing fields', () => {
      initialState.entities['field-1'] = {
        id: 'field-1',
        name: 'oldName',
        type: 'text',
      };
      initialState.ids.push('field-1');

      const fields = [{ id: 'field-1', name: 'newName', type: 'email' }];
      const state = dataModelFieldSlice(initialState, upsertDataModelFields(fields));

      expect(state.entities['field-1'].name).toBe('newName');
      expect(state.entities['field-1'].type).toBe('email');
    });

    it('should add new and update existing fields', () => {
      initialState.entities['field-1'] = { id: 'field-1', name: 'existing' };
      initialState.ids.push('field-1');

      const fields = [
        { id: 'field-1', name: 'updated' },
        { id: 'field-2', name: 'new' },
      ];
      const state = dataModelFieldSlice(initialState, upsertDataModelFields(fields));

      expect(state.ids).toEqual(['field-1', 'field-2']);
      expect(state.entities['field-1'].name).toBe('updated');
      expect(state.entities['field-2'].name).toBe('new');
    });

    it('should skip invalid fields', () => {
      const fields = [
        { id: 'field-1', name: 'valid' },
        { name: 'noId' },
        null,
      ];
      const state = dataModelFieldSlice(initialState, upsertDataModelFields(fields));

      expect(state.ids).toHaveLength(1);
      expect(state.entities['field-1']).toBeDefined();
    });

    it('should not duplicate IDs', () => {
      initialState.entities['field-1'] = { id: 'field-1', name: 'existing' };
      initialState.ids.push('field-1');

      const fields = [{ id: 'field-1', name: 'updated' }];
      const state = dataModelFieldSlice(initialState, upsertDataModelFields(fields));

      expect(state.ids).toHaveLength(1);
    });
  });

  // ===================================================================
  // PART 5: Update Model Field (3 tests)
  // ===================================================================

  describe('Update Model Field', () => {
    beforeEach(() => {
      initialState.entities['field-1'] = {
        id: 'field-1',
        name: 'email',
        type: 'email',
        required: false,
      };
      initialState.ids.push('field-1');
    });

    it('should update field properties', () => {
      const state = dataModelFieldSlice(
        initialState,
        updateDataModelField({
          id: 'field-1',
          changes: { name: 'emailAddress', required: true },
        }),
      );

      expect(state.entities['field-1'].name).toBe('emailAddress');
      expect(state.entities['field-1'].required).toBe(true);
      expect(state.entities['field-1'].type).toBe('email'); // Preserved
    });

    it('should handle updating non-existent field', () => {
      const state = dataModelFieldSlice(
        initialState,
        updateDataModelField({
          id: 'non-existent',
          changes: { name: 'new' },
        }),
      );

      expect(state.entities['non-existent']).toBeUndefined();
    });

    it('should not affect other fields', () => {
      initialState.entities['field-2'] = {
        id: 'field-2',
        name: 'phone',
        type: 'phone',
      };
      initialState.ids.push('field-2');

      const state = dataModelFieldSlice(
        initialState,
        updateDataModelField({
          id: 'field-1',
          changes: { name: 'updated' },
        }),
      );

      expect(state.entities['field-2']).toEqual({
        id: 'field-2',
        name: 'phone',
        type: 'phone',
      });
    });
  });

  // ===================================================================
  // PART 6: Update Multiple Model Fields (2 tests)
  // ===================================================================

  describe('Update Multiple Model Fields', () => {
    beforeEach(() => {
      initialState.entities = {
        'field-1': { id: 'field-1', name: 'firstName', required: false },
        'field-2': { id: 'field-2', name: 'lastName', required: false },
        'field-3': { id: 'field-3', name: 'email', required: false },
      };
      initialState.ids = ['field-1', 'field-2', 'field-3'];
    });

    it('should update multiple fields', () => {
      const updates = [
        { id: 'field-1', changes: { required: true } },
        { id: 'field-2', changes: { required: true } },
      ];

      const state = dataModelFieldSlice(
        initialState,
        updateDataModelFields(updates),
      );

      expect(state.entities['field-1'].required).toBe(true);
      expect(state.entities['field-2'].required).toBe(true);
      expect(state.entities['field-3'].required).toBe(false); // Unchanged
    });

    it('should skip non-existent fields', () => {
      const updates = [
        { id: 'field-1', changes: { required: true } },
        { id: 'non-existent', changes: { name: 'new' } },
      ];

      const state = dataModelFieldSlice(
        initialState,
        updateDataModelFields(updates),
      );

      expect(state.entities['field-1'].required).toBe(true);
      expect(state.entities['non-existent']).toBeUndefined();
    });
  });

  // ===================================================================
  // PART 7: Remove Model Field (3 tests)
  // ===================================================================

  describe('Remove Model Field', () => {
    beforeEach(() => {
      initialState.entities = {
        'field-1': { id: 'field-1', name: 'firstName' },
        'field-2': { id: 'field-2', name: 'lastName' },
      };
      initialState.ids = ['field-1', 'field-2'];
    });

    it('should remove model field', () => {
      const state = dataModelFieldSlice(
        initialState,
        removeDataModelField('field-1'),
      );

      expect(state.ids).not.toContain('field-1');
      expect(state.entities['field-1']).toBeUndefined();
      expect(state.entities['field-2']).toBeDefined();
    });

    it('should handle removing non-existent field', () => {
      const state = dataModelFieldSlice(
        initialState,
        removeDataModelField('non-existent'),
      );

      expect(state.ids).toHaveLength(2);
    });

    it('should not affect other fields', () => {
      const state = dataModelFieldSlice(
        initialState,
        removeDataModelField('field-1'),
      );

      expect(state.ids).toContain('field-2');
      expect(state.entities['field-2']).toEqual({
        id: 'field-2',
        name: 'lastName',
      });
    });
  });

  // ===================================================================
  // PART 8: Set Fields For Model (4 tests)
  // ===================================================================

  describe('Set Fields For Model', () => {
    beforeEach(() => {
      initialState.entities = {
        'field-1': { id: 'field-1', name: 'oldField1', modelId: 'model-1' },
        'field-2': { id: 'field-2', name: 'oldField2', modelId: 'model-1' },
        'field-3': { id: 'field-3', name: 'keepThis', modelId: 'model-2' },
      };
      initialState.ids = ['field-1', 'field-2', 'field-3'];
    });

    it('should replace fields for specific model', () => {
      const fields = [
        { id: 'field-new1', name: 'newField1', modelId: 'model-1' },
        { id: 'field-new2', name: 'newField2', modelId: 'model-1' },
      ];

      const state = dataModelFieldSlice(
        initialState,
        setDataModelFieldsForModel({ modelId: 'model-1', fields }),
      );

      expect(state.ids).not.toContain('field-1');
      expect(state.ids).not.toContain('field-2');
      expect(state.ids).toContain('field-new1');
      expect(state.ids).toContain('field-new2');
      expect(state.ids).toContain('field-3'); // Other model's field preserved
    });

    it('should not affect fields from other models', () => {
      const fields = [
        { id: 'field-new', name: 'newField', modelId: 'model-1' },
      ];

      const state = dataModelFieldSlice(
        initialState,
        setDataModelFieldsForModel({ modelId: 'model-1', fields }),
      );

      expect(state.entities['field-3']).toEqual({
        id: 'field-3',
        name: 'keepThis',
        modelId: 'model-2',
      });
    });

    it('should handle empty fields array', () => {
      const state = dataModelFieldSlice(
        initialState,
        setDataModelFieldsForModel({ modelId: 'model-1', fields: [] }),
      );

      expect(state.ids).not.toContain('field-1');
      expect(state.ids).not.toContain('field-2');
      expect(state.ids).toContain('field-3');
      expect(state.ids).toHaveLength(1);
    });

    it('should skip invalid fields', () => {
      const fields = [
        { id: 'field-new', name: 'valid', modelId: 'model-1' },
        { name: 'noId' },
        null,
      ];

      const state = dataModelFieldSlice(
        initialState,
        setDataModelFieldsForModel({ modelId: 'model-1', fields }),
      );

      expect(state.entities['field-new']).toBeDefined();
      expect(state.ids).toContain('field-new');
      expect(state.ids).toContain('field-3');
    });
  });

  // ===================================================================
  // PART 9: Integration Scenario (1 test)
  // ===================================================================

  describe('Integration Scenario', () => {
    it('should handle complete field lifecycle', () => {
      // Add field
      let state = dataModelFieldSlice(
        initialState,
        addDataModelField({
          id: 'field-1',
          name: 'email',
          type: 'email',
          modelId: 'model-1',
          required: false,
        }),
      );

      // Update field
      state = dataModelFieldSlice(
        state,
        updateDataModelField({
          id: 'field-1',
          changes: { required: true, name: 'emailAddress' },
        }),
      );

      // Upsert new field
      state = dataModelFieldSlice(
        state,
        upsertDataModelFields([
          { id: 'field-2', name: 'phone', type: 'phone', modelId: 'model-1' },
        ]),
      );

      // Set selected
      state = dataModelFieldSlice(state, setSelectedModelFieldId('field-1'));

      // Verify state
      expect(state.ids).toHaveLength(2);
      expect(state.entities['field-1'].required).toBe(true);
      expect(state.entities['field-1'].name).toBe('emailAddress');
      expect(state.entities['field-2']).toBeDefined();
      expect(state.ui.selectedModelFieldId).toBe('field-1');

      // Remove field
      state = dataModelFieldSlice(state, removeDataModelField('field-1'));
      expect(state.ids).not.toContain('field-1');
      expect(state.ui.selectedModelFieldId).toBe('field-1'); // Still selected
    });
  });
});

