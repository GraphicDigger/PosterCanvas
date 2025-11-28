// ===================================================================
// Unit Tests for DataModelField Entity Redux Selectors
// Coverage Target: 95%+
// Continuation Phase (Selector Testing - Final Push!)
// ===================================================================

import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  selectState,
  selectEntities,
  selectIds,
  selectUI,
  selectAllDataModelFields,
  selectSelectedModelField,
  selectModelFieldById,
  selectFieldsForSelectedModel,
  selectModelFieldsByModelId,
  selectFilteredModelFieldsInModelMode,
  selectFilteredModelFieldsInTableMode,
  selectFilteredModelFieldsInRecordMode,
} from './selectors';

// Mock exclude fields constants
vi.mock('../constants/exclideFields', () => ({
  EXCLUDE_FIELDS: {
    model: ['password', 'token'],
    table: ['password', 'token', 'metadata'],
    record: ['id', 'createdAt', 'updatedAt'],
  },
}));

// Mock UI state selectors
vi.mock('../store/uiStates/selectors', () => ({
  selectSelectedModelFieldId: vi.fn((state) => state.mockSelectedFieldId || null),
}));

vi.mock('../../../dataModel/model/store/uiStates/selectors', () => ({
  selectSelectedModelId: vi.fn((state) => state.mockSelectedModelId || null),
}));

describe('DataModelField Entity Selectors', () => {
  describe('Base Selectors', () => {
    describe('selectState', () => {
      it('should return data model field entity state', () => {
        const dataModelFieldState = {
          entities: {},
          ids: [],
          ui: {},
        };
        const state = {
          dataModelFieldEntity: dataModelFieldState,
        };

        expect(selectState(state)).toEqual(dataModelFieldState);
      });
    });

    describe('selectEntities', () => {
      it('should return data model field entities object', () => {
        const entities = {
          'field-1': { id: 'field-1', name: 'email', type: 'string' },
          'field-2': { id: 'field-2', name: 'age', type: 'number' },
        };
        const state = {
          dataModelFieldEntity: {
            entities,
          },
        };

        expect(selectEntities(state)).toEqual(entities);
      });
    });

    describe('selectIds', () => {
      it('should return data model field ids array', () => {
        const ids = ['field-1', 'field-2', 'field-3'];
        const state = {
          dataModelFieldEntity: {
            ids,
          },
        };

        expect(selectIds(state)).toEqual(ids);
      });
    });

    describe('selectUI', () => {
      it('should return data model field UI state', () => {
        const uiState = {
          selectedFieldId: 'field-1',
        };
        const state = {
          dataModelFieldEntity: {
            ui: uiState,
          },
        };

        expect(selectUI(state)).toEqual(uiState);
      });
    });
  });

  describe('Entity Lookup Selectors', () => {
    describe('selectModelFieldById', () => {
      it('should return model field by ID', () => {
        const field = {
          id: 'field-1',
          name: 'email',
          type: 'string',
          required: true,
        };
        const state = {
          dataModelFieldEntity: {
            ids: ['field-1'],
            entities: {
              'field-1': field,
            },
          },
        };

        expect(selectModelFieldById(state, 'field-1')).toEqual(field);
      });

      it('should return undefined for non-existent ID', () => {
        const state = {
          dataModelFieldEntity: {
            ids: [],
            entities: {},
          },
        };

        expect(selectModelFieldById(state, 'non-existent')).toBeUndefined();
      });
    });

    describe('selectSelectedModelField', () => {
      it('should return selected model field', () => {
        const field = { id: 'field-selected', name: 'username' };
        const state = {
          dataModelFieldEntity: {
            entities: {
              'field-selected': field,
            },
          },
          mockSelectedFieldId: 'field-selected',
        };

        expect(selectSelectedModelField(state)).toEqual(field);
      });

      it('should return null when no field selected', () => {
        const state = {
          dataModelFieldEntity: {
            entities: {},
          },
          mockSelectedFieldId: null,
        };

        expect(selectSelectedModelField(state)).toBeNull();
      });

      it('should return undefined when selected field does not exist', () => {
        const state = {
          dataModelFieldEntity: {
            entities: {},
          },
          mockSelectedFieldId: 'non-existent',
        };

        expect(selectSelectedModelField(state)).toBeUndefined();
      });
    });
  });

  describe('Collection Selectors', () => {
    describe('selectAllDataModelFields', () => {
      it('should return all model fields as array', () => {
        const entities = {
          'field-1': { id: 'field-1', name: 'email', type: 'string' },
          'field-2': { id: 'field-2', name: 'age', type: 'number' },
          'field-3': { id: 'field-3', name: 'active', type: 'boolean' },
        };
        const state = {
          dataModelFieldEntity: {
            ids: ['field-1', 'field-2', 'field-3'],
            entities,
          },
        };

        const result = selectAllDataModelFields(state);
        expect(result).toHaveLength(3);
        expect(result[0]).toEqual(entities['field-1']);
      });

      it('should return empty array when no fields', () => {
        const state = {
          dataModelFieldEntity: {
            ids: [],
            entities: {},
          },
        };

        expect(selectAllDataModelFields(state)).toEqual([]);
      });

      it('should maintain order based on ids array', () => {
        const state = {
          dataModelFieldEntity: {
            ids: ['field-3', 'field-1', 'field-2'],
            entities: {
              'field-1': { id: 'field-1', order: 1 },
              'field-2': { id: 'field-2', order: 2 },
              'field-3': { id: 'field-3', order: 3 },
            },
          },
        };

        const result = selectAllDataModelFields(state);
        expect(result[0].id).toBe('field-3');
        expect(result[1].id).toBe('field-1');
        expect(result[2].id).toBe('field-2');
      });
    });

    describe('selectFieldsForSelectedModel', () => {
      it('should return fields for selected model', () => {
        const state = {
          dataModelFieldEntity: {
            ids: ['field-1', 'field-2', 'field-3'],
            entities: {
              'field-1': { id: 'field-1', name: 'email', modelId: 'model-1' },
              'field-2': { id: 'field-2', name: 'age', modelId: 'model-1' },
              'field-3': { id: 'field-3', name: 'title', modelId: 'model-2' },
            },
          },
          mockSelectedModelId: 'model-1',
        };

        const result = selectFieldsForSelectedModel(state);
        expect(result).toHaveLength(2);
        expect(result.every(f => f.modelId === 'model-1')).toBe(true);
      });

      it('should return empty array when no model selected', () => {
        const state = {
          dataModelFieldEntity: {
            ids: [],
            entities: {},
          },
          mockSelectedModelId: null,
        };

        const result = selectFieldsForSelectedModel(state);
        expect(result).toEqual([]);
      });

      it('should return empty array when selected model has no fields', () => {
        const state = {
          dataModelFieldEntity: {
            ids: ['field-1'],
            entities: {
              'field-1': { id: 'field-1', modelId: 'model-1' },
            },
          },
          mockSelectedModelId: 'model-2',
        };

        const result = selectFieldsForSelectedModel(state);
        expect(result).toEqual([]);
      });
    });

    describe('selectModelFieldsByModelId', () => {
      it('should return fields filtered by model ID', () => {
        const state = {
          dataModelFieldEntity: {
            ids: ['field-1', 'field-2', 'field-3'],
            entities: {
              'field-1': { id: 'field-1', name: 'email', modelId: 'model-1' },
              'field-2': { id: 'field-2', name: 'age', modelId: 'model-1' },
              'field-3': { id: 'field-3', name: 'title', modelId: 'model-2' },
            },
          },
        };

        const result = selectModelFieldsByModelId(state, 'model-1');
        expect(result).toHaveLength(2);
        expect(result.every(f => f.modelId === 'model-1')).toBe(true);
      });

      it('should return empty array when model has no fields', () => {
        const state = {
          dataModelFieldEntity: {
            ids: [],
            entities: {},
          },
        };

        const result = selectModelFieldsByModelId(state, 'model-unknown');
        expect(result).toEqual([]);
      });
    });
  });

  describe('Filtered Selectors', () => {
    describe('selectFilteredModelFieldsInModelMode', () => {
      it('should filter out excluded fields in model mode', () => {
        const state = {
          dataModelFieldEntity: {
            ids: ['field-1', 'field-2', 'field-3'],
            entities: {
              'field-1': { id: 'field-1', name: 'email', modelId: 'model-1' },
              'field-2': { id: 'field-2', name: 'password', modelId: 'model-1' }, // excluded
              'field-3': { id: 'field-3', name: 'token', modelId: 'model-1' }, // excluded
            },
          },
          mockSelectedModelId: 'model-1',
        };

        const result = selectFilteredModelFieldsInModelMode(state);
        expect(result).toHaveLength(1);
        expect(result[0].name).toBe('email');
      });

      it('should return all fields when none are excluded', () => {
        const state = {
          dataModelFieldEntity: {
            ids: ['field-1', 'field-2'],
            entities: {
              'field-1': { id: 'field-1', name: 'email', modelId: 'model-1' },
              'field-2': { id: 'field-2', name: 'username', modelId: 'model-1' },
            },
          },
          mockSelectedModelId: 'model-1',
        };

        const result = selectFilteredModelFieldsInModelMode(state);
        expect(result).toHaveLength(2);
      });
    });

    describe('selectFilteredModelFieldsInTableMode', () => {
      it('should filter out excluded fields in table mode', () => {
        const state = {
          dataModelFieldEntity: {
            ids: ['field-1', 'field-2', 'field-3', 'field-4'],
            entities: {
              'field-1': { id: 'field-1', name: 'email', modelId: 'model-1' },
              'field-2': { id: 'field-2', name: 'password', modelId: 'model-1' }, // excluded
              'field-3': { id: 'field-3', name: 'metadata', modelId: 'model-1' }, // excluded (table only)
              'field-4': { id: 'field-4', name: 'username', modelId: 'model-1' },
            },
          },
          mockSelectedModelId: 'model-1',
        };

        const result = selectFilteredModelFieldsInTableMode(state);
        expect(result).toHaveLength(2);
        expect(result.map(f => f.name)).toEqual(['email', 'username']);
      });

      it('should exclude more fields than model mode', () => {
        const state = {
          dataModelFieldEntity: {
            ids: ['field-1', 'field-2', 'field-3'],
            entities: {
              'field-1': { id: 'field-1', name: 'email', modelId: 'model-1' },
              'field-2': { id: 'field-2', name: 'metadata', modelId: 'model-1' }, // excluded in table, not model
              'field-3': { id: 'field-3', name: 'token', modelId: 'model-1' }, // excluded in both
            },
          },
          mockSelectedModelId: 'model-1',
        };

        const tableResult = selectFilteredModelFieldsInTableMode(state);
        const modelResult = selectFilteredModelFieldsInModelMode(state);

        expect(tableResult).toHaveLength(1);
        expect(modelResult).toHaveLength(2); // metadata not excluded in model mode
      });
    });

    describe('selectFilteredModelFieldsInRecordMode', () => {
      it('should filter out excluded fields in record mode', () => {
        const state = {
          dataModelFieldEntity: {
            ids: ['field-1', 'field-2', 'field-3', 'field-4'],
            entities: {
              'field-1': { id: 'field-1', name: 'email', modelId: 'model-1' },
              'field-2': { id: 'field-2', name: 'id', modelId: 'model-1' }, // excluded (record only)
              'field-3': { id: 'field-3', name: 'createdAt', modelId: 'model-1' }, // excluded (record only)
              'field-4': { id: 'field-4', name: 'username', modelId: 'model-1' },
            },
          },
          mockSelectedModelId: 'model-1',
        };

        const result = selectFilteredModelFieldsInRecordMode(state);
        expect(result).toHaveLength(2);
        expect(result.map(f => f.name)).toEqual(['email', 'username']);
      });

      it('should have different exclusions than model/table modes', () => {
        const state = {
          dataModelFieldEntity: {
            ids: ['field-1', 'field-2'],
            entities: {
              'field-1': { id: 'field-1', name: 'id', modelId: 'model-1' }, // excluded in record, not others
              'field-2': { id: 'field-2', name: 'password', modelId: 'model-1' }, // excluded in model/table, not record
            },
          },
          mockSelectedModelId: 'model-1',
        };

        const recordResult = selectFilteredModelFieldsInRecordMode(state);
        const modelResult = selectFilteredModelFieldsInModelMode(state);

        expect(recordResult).toHaveLength(1);
        expect(recordResult[0].name).toBe('password');
        expect(modelResult).toHaveLength(1);
        expect(modelResult[0].name).toBe('id');
      });
    });
  });

  describe('Edge Cases', () => {
    describe('Different field types', () => {
      it('should handle various field types', () => {
        const state = {
          dataModelFieldEntity: {
            ids: ['field-1', 'field-2', 'field-3'],
            entities: {
              'field-1': { id: 'field-1', name: 'email', type: 'string', modelId: 'model-1' },
              'field-2': { id: 'field-2', name: 'age', type: 'number', modelId: 'model-1' },
              'field-3': { id: 'field-3', name: 'active', type: 'boolean', modelId: 'model-1' },
            },
          },
        };

        const result = selectModelFieldsByModelId(state, 'model-1');
        expect(result[0].type).toBe('string');
        expect(result[1].type).toBe('number');
        expect(result[2].type).toBe('boolean');
      });
    });

    describe('Fields with validation', () => {
      it('should handle fields with validation rules', () => {
        const field = {
          id: 'field-1',
          name: 'email',
          type: 'string',
          validation: {
            required: true,
            format: 'email',
            maxLength: 255,
          },
        };
        const state = {
          dataModelFieldEntity: {
            entities: {
              'field-1': field,
            },
          },
        };

        const result = selectEntities(state)['field-1'];
        expect(result.validation.required).toBe(true);
        expect(result.validation.format).toBe('email');
      });
    });

    describe('Empty state handling', () => {
      it('should handle completely empty state', () => {
        const state = {
          dataModelFieldEntity: {
            entities: {},
            ids: [],
            ui: {},
          },
        };

        expect(selectAllDataModelFields(state)).toEqual([]);
        expect(selectSelectedModelField(state)).toBeNull();
      });
    });
  });
});

