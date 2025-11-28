// ===================================================================
// Unit Tests for DataModel Entity Redux Selectors
// Coverage Target: 95%+
// Continuation Phase (Selector Testing - Pushing Forward!)
// ===================================================================

import { describe, it, expect, vi } from 'vitest';
import {
  selectState,
  selectEntities,
  selectIds,
  selectUI,
  selectAllDataModels,
  selectDataModelById,
  selectSelectedModel,
} from './selectors';

// Mock UI state selectors
vi.mock('../store/uiStates/selectors', () => ({
  selectSelectedModelId: vi.fn((state) => state.mockSelectedModelId || null),
}));

// Mock cross-entity dependencies
vi.mock('../../../dataModelField', () => ({
  selectSelectedModelFieldId: vi.fn((state) => state.mockSelectedFieldId || null),
}));

describe('DataModel Entity Selectors', () => {
  describe('Base Selectors', () => {
    describe('selectState', () => {
      it('should return data model entity state', () => {
        const dataModelState = {
          entities: {},
          ids: [],
          ui: {},
        };
        const state = {
          dataModelEntity: dataModelState,
        };

        expect(selectState(state)).toEqual(dataModelState);
      });

      it('should handle state with data', () => {
        const dataModelState = {
          entities: {
            'model-1': { id: 'model-1', name: 'User Model' },
          },
          ids: ['model-1'],
          ui: {},
        };
        const state = {
          dataModelEntity: dataModelState,
        };

        expect(selectState(state)).toEqual(dataModelState);
      });
    });

    describe('selectEntities', () => {
      it('should return data model entities object', () => {
        const entities = {
          'model-1': { id: 'model-1', name: 'User Model', fields: [] },
          'model-2': { id: 'model-2', name: 'Product Model', fields: [] },
        };
        const state = {
          dataModelEntity: {
            entities,
          },
        };

        expect(selectEntities(state)).toEqual(entities);
      });

      it('should return empty object when no entities', () => {
        const state = {
          dataModelEntity: {
            entities: {},
          },
        };

        expect(selectEntities(state)).toEqual({});
      });
    });

    describe('selectIds', () => {
      it('should return data model ids array', () => {
        const ids = ['model-1', 'model-2', 'model-3'];
        const state = {
          dataModelEntity: {
            ids,
          },
        };

        expect(selectIds(state)).toEqual(ids);
      });

      it('should return empty array when no ids', () => {
        const state = {
          dataModelEntity: {
            ids: [],
          },
        };

        expect(selectIds(state)).toEqual([]);
      });
    });

    describe('selectUI', () => {
      it('should return data model UI state', () => {
        const uiState = {
          selectedModelId: 'model-1',
          hoveredModelId: 'model-2',
        };
        const state = {
          dataModelEntity: {
            ui: uiState,
          },
        };

        expect(selectUI(state)).toEqual(uiState);
      });

      it('should return empty UI state', () => {
        const state = {
          dataModelEntity: {
            ui: {},
          },
        };

        expect(selectUI(state)).toEqual({});
      });
    });
  });

  describe('Entity Lookup Selectors', () => {
    describe('selectDataModelById', () => {
      it('should return data model by ID', () => {
        const dataModel = {
          id: 'model-1',
          name: 'User Model',
          description: 'User data model',
          fields: ['field-1', 'field-2'],
        };
        const state = {
          dataModelEntity: {
            entities: {
              'model-1': dataModel,
            },
          },
        };

        expect(selectDataModelById(state, 'model-1')).toEqual(dataModel);
      });

      it('should return undefined for non-existent ID', () => {
        const state = {
          dataModelEntity: {
            entities: {},
          },
        };

        expect(selectDataModelById(state, 'non-existent')).toBeUndefined();
      });

      it('should handle data model with complex structure', () => {
        const dataModel = {
          id: 'model-1',
          name: 'Complex Model',
          description: 'A complex data model',
          fields: ['field-1', 'field-2', 'field-3'],
          metadata: {
            created: '2024-01-01',
            updated: '2024-01-02',
            version: '1.0',
          },
          relationships: [
            { type: 'hasMany', target: 'model-2' },
          ],
        };
        const state = {
          dataModelEntity: {
            entities: {
              'model-1': dataModel,
            },
          },
        };

        const result = selectDataModelById(state, 'model-1');
        expect(result.fields).toHaveLength(3);
        expect(result.metadata.version).toBe('1.0');
        expect(result.relationships).toHaveLength(1);
      });
    });

    describe('selectSelectedModel', () => {
      it('should return selected data model', () => {
        const dataModel = { id: 'model-selected', name: 'Selected Model' };
        const state = {
          dataModelEntity: {
            entities: {
              'model-selected': dataModel,
            },
            ui: {
              selectedModelId: 'model-selected',
            },
          },
        };

        expect(selectSelectedModel(state)).toEqual(dataModel);
      });

      it('should return undefined when no model selected', () => {
        const state = {
          dataModelEntity: {
            entities: {},
          },
          mockSelectedModelId: null,
        };

        expect(selectSelectedModel(state)).toBeUndefined();
      });

      it('should return undefined when selected model does not exist', () => {
        const state = {
          dataModelEntity: {
            entities: {
              'model-1': { id: 'model-1', name: 'Model 1' },
            },
          },
          mockSelectedModelId: 'non-existent',
        };

        expect(selectSelectedModel(state)).toBeUndefined();
      });

      it('should find model from multiple entities', () => {
        const dataModel = { id: 'model-2', name: 'Target Model' };
        const state = {
          dataModelEntity: {
            entities: {
              'model-1': { id: 'model-1', name: 'Model 1' },
              'model-2': dataModel,
              'model-3': { id: 'model-3', name: 'Model 3' },
            },
            ui: {
              selectedModelId: 'model-2',
            },
          },
        };

        const result = selectSelectedModel(state);
        expect(result).toEqual(dataModel);
        expect(result.name).toBe('Target Model');
      });
    });
  });

  describe('Collection Selectors', () => {
    describe('selectAllDataModels', () => {
      it('should return all data models as array', () => {
        const entities = {
          'model-1': { id: 'model-1', name: 'User Model' },
          'model-2': { id: 'model-2', name: 'Product Model' },
          'model-3': { id: 'model-3', name: 'Order Model' },
        };
        const state = {
          dataModelEntity: {
            ids: ['model-1', 'model-2', 'model-3'],
            entities,
          },
        };

        const result = selectAllDataModels(state);
        expect(result).toHaveLength(3);
        expect(result[0]).toEqual(entities['model-1']);
        expect(result[1]).toEqual(entities['model-2']);
        expect(result[2]).toEqual(entities['model-3']);
      });

      it('should return empty array when no data models', () => {
        const state = {
          dataModelEntity: {
            ids: [],
            entities: {},
          },
        };

        expect(selectAllDataModels(state)).toEqual([]);
      });

      it('should maintain order based on ids array', () => {
        const state = {
          dataModelEntity: {
            ids: ['model-3', 'model-1', 'model-2'],
            entities: {
              'model-1': { id: 'model-1', order: 1 },
              'model-2': { id: 'model-2', order: 2 },
              'model-3': { id: 'model-3', order: 3 },
            },
          },
        };

        const result = selectAllDataModels(state);
        expect(result[0].id).toBe('model-3');
        expect(result[1].id).toBe('model-1');
        expect(result[2].id).toBe('model-2');
      });

      it('should handle undefined models in results', () => {
        const state = {
          dataModelEntity: {
            ids: ['model-1', 'non-existent', 'model-2'],
            entities: {
              'model-1': { id: 'model-1', name: 'Model 1' },
              'model-2': { id: 'model-2', name: 'Model 2' },
            },
          },
        };

        const result = selectAllDataModels(state);
        expect(result).toHaveLength(3);
        expect(result[1]).toBeUndefined();
      });

      it('should handle models with various field counts', () => {
        const state = {
          dataModelEntity: {
            ids: ['model-1', 'model-2', 'model-3'],
            entities: {
              'model-1': { id: 'model-1', name: 'Model 1', fields: [] },
              'model-2': { id: 'model-2', name: 'Model 2', fields: ['field-1'] },
              'model-3': { id: 'model-3', name: 'Model 3', fields: ['field-1', 'field-2', 'field-3'] },
            },
          },
        };

        const result = selectAllDataModels(state);
        expect(result[0].fields).toHaveLength(0);
        expect(result[1].fields).toHaveLength(1);
        expect(result[2].fields).toHaveLength(3);
      });
    });
  });

  describe('Edge Cases', () => {
    describe('Different data model types', () => {
      it('should handle user data models', () => {
        const state = {
          dataModelEntity: {
            entities: {
              'model-1': {
                id: 'model-1',
                name: 'User',
                type: 'entity',
                fields: ['id', 'name', 'email'],
              },
            },
          },
        };

        const result = selectDataModelById(state, 'model-1');
        expect(result.type).toBe('entity');
        expect(result.fields).toContain('email');
      });

      it('should handle system data models', () => {
        const state = {
          dataModelEntity: {
            entities: {
              'model-1': {
                id: 'model-1',
                name: 'SystemConfig',
                type: 'system',
                readonly: true,
              },
            },
          },
        };

        const result = selectDataModelById(state, 'model-1');
        expect(result.type).toBe('system');
        expect(result.readonly).toBe(true);
      });
    });

    describe('Data models with relationships', () => {
      it('should handle models with hasMany relationships', () => {
        const dataModel = {
          id: 'model-1',
          name: 'User',
          relationships: [
            { type: 'hasMany', target: 'Post', foreignKey: 'userId' },
            { type: 'hasMany', target: 'Comment', foreignKey: 'userId' },
          ],
        };
        const state = {
          dataModelEntity: {
            entities: {
              'model-1': dataModel,
            },
          },
        };

        const result = selectDataModelById(state, 'model-1');
        expect(result.relationships).toHaveLength(2);
        expect(result.relationships[0].type).toBe('hasMany');
      });

      it('should handle models with belongsTo relationships', () => {
        const dataModel = {
          id: 'model-1',
          name: 'Post',
          relationships: [
            { type: 'belongsTo', target: 'User', foreignKey: 'userId' },
          ],
        };
        const state = {
          dataModelEntity: {
            entities: {
              'model-1': dataModel,
            },
          },
        };

        const result = selectDataModelById(state, 'model-1');
        expect(result.relationships[0].type).toBe('belongsTo');
      });
    });

    describe('Data models with validation', () => {
      it('should handle models with field validation rules', () => {
        const dataModel = {
          id: 'model-1',
          name: 'User',
          validation: {
            email: { required: true, format: 'email' },
            age: { required: false, min: 0, max: 150 },
          },
        };
        const state = {
          dataModelEntity: {
            entities: {
              'model-1': dataModel,
            },
          },
        };

        const result = selectDataModelById(state, 'model-1');
        expect(result.validation.email.required).toBe(true);
        expect(result.validation.age.max).toBe(150);
      });
    });

    describe('Empty state handling', () => {
      it('should handle completely empty state', () => {
        const state = {
          dataModelEntity: {
            entities: {},
            ids: [],
            ui: {},
          },
        };

        expect(selectAllDataModels(state)).toEqual([]);
        expect(selectSelectedModel(state)).toBeUndefined();
      });
    });
  });
});

