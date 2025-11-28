// ===================================================================
// DATA TRANSFORMATION TESTS
// 🔴 CRITICAL-FIRST STRATEGY - Phase 3 🔴
// Field Mapping, Reference Resolution, Display Value Priority
// ===================================================================

import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  selectRawDataRecordFieldValueById,
  selectRecordDisplayValue,
  selectModelFieldsMapByName,
  selectDataRecordEntities,
} from './selectors';

// Import constants
import { MODEL_FIELD_TYPES } from '../../../dataModelField';

describe('Data Record Transformations - CRITICAL BUSINESS LOGIC', () => {

  // ===================================================================
  // Section 1: Field Mapping & Transformation (25 tests)
  // ===================================================================

  describe('Field Mapping & Transformation', () => {
    it('should map field names to field IDs correctly', () => {
      const state = {
        dataModelEntity: {
          entities: {
            'model-1': { id: 'model-1', name: 'Users' },
          },
        },
        dataModelFieldEntity: {
          entities: {
            'field-1': { id: 'field-1', name: 'firstName', modelId: 'model-1' },
            'field-2': { id: 'field-2', name: 'lastName', modelId: 'model-1' },
          },
          ids: ['field-1', 'field-2'],
        },
      };

      const result = selectModelFieldsMapByName(state);

      expect(result['model-1-firstName']).toBe('field-1');
      expect(result['model-1-lastName']).toBe('field-2');
    });

    it('should handle empty fields correctly', () => {
      const state = {
        dataModelFieldEntity: {
          entities: {},
          ids: [],
        },
      };

      const result = selectModelFieldsMapByName(state);

      expect(result).toEqual({});
    });

    it('should handle missing field name', () => {
      const state = {
        dataModelFieldEntity: {
          entities: {
            'field-1': { id: 'field-1', name: '', modelId: 'model-1' },
          },
          ids: ['field-1'],
        },
      };

      const result = selectModelFieldsMapByName(state);

      expect(result['model-1-']).toBe('field-1');
    });

    it('should handle missing modelId in field', () => {
      const state = {
        dataModelFieldEntity: {
          entities: {
            'field-1': { id: 'field-1', name: 'test' }, // Missing modelId
          },
          ids: ['field-1'],
        },
      };

      const result = selectModelFieldsMapByName(state);

      expect(result['undefined-test']).toBe('field-1');
    });

    it('should handle duplicate field names in different models', () => {
      const state = {
        dataModelFieldEntity: {
          entities: {
            'field-1': { id: 'field-1', name: 'name', modelId: 'model-1' },
            'field-2': { id: 'field-2', name: 'name', modelId: 'model-2' },
          },
          ids: ['field-1', 'field-2'],
        },
      };

      const result = selectModelFieldsMapByName(state);

      expect(result['model-1-name']).toBe('field-1');
      expect(result['model-2-name']).toBe('field-2');
    });

    it('should transform raw record to use field IDs', () => {
      const state = {
        dataRecordEntity: {
          entities: {
            'record-1': {
              id: 'record-1',
              modelId: 'model-1',
              kind: 'record',
              firstName: 'John',
              lastName: 'Doe',
            },
          },
          ids: ['record-1'],
        },
        dataModelFieldEntity: {
          entities: {
            'field-1': { id: 'field-1', name: 'firstName', modelId: 'model-1' },
            'field-2': { id: 'field-2', name: 'lastName', modelId: 'model-1' },
          },
          ids: ['field-1', 'field-2'],
        },
      };

      const result = selectDataRecordEntities(state);

      expect(result['record-1']).toEqual({
        id: 'record-1',
        modelId: 'model-1',
        kind: 'record',
        'field-1': 'John',
        'field-2': 'Doe',
      });
    });

    it('should skip fields not in fieldsMap', () => {
      const state = {
        dataRecordEntity: {
          entities: {
            'record-1': {
              id: 'record-1',
              modelId: 'model-1',
              kind: 'record',
              firstName: 'John',
              unknownField: 'value', // Not in fieldsMap
            },
          },
          ids: ['record-1'],
        },
        dataModelFieldEntity: {
          entities: {
            'field-1': { id: 'field-1', name: 'firstName', modelId: 'model-1' },
          },
          ids: ['field-1'],
        },
      };

      const result = selectDataRecordEntities(state);

      expect(result['record-1']).toEqual({
        id: 'record-1',
        modelId: 'model-1',
        kind: 'record',
        'field-1': 'John',
        // unknownField should not be present
      });
      expect(result['record-1'].unknownField).toBeUndefined();
    });

    it('should preserve id, modelId, and kind', () => {
      const state = {
        dataRecordEntity: {
          entities: {
            'record-1': {
              id: 'record-1',
              modelId: 'model-1',
              kind: 'record',
              name: 'Test',
            },
          },
          ids: ['record-1'],
        },
        dataModelFieldEntity: {
          entities: {
            'field-1': { id: 'field-1', name: 'name', modelId: 'model-1' },
          },
          ids: ['field-1'],
        },
      };

      const result = selectDataRecordEntities(state);

      expect(result['record-1'].id).toBe('record-1');
      expect(result['record-1'].modelId).toBe('model-1');
      expect(result['record-1'].kind).toBe('record');
    });

    it('should handle null raw record', () => {
      const state = {
        dataRecordEntity: {
          entities: {},
          ids: [],
        },
        dataModelFieldEntity: {
          entities: {},
          ids: [],
        },
      };

      const result = selectDataRecordEntities(state);

      expect(result).toEqual({});
    });

    it('should handle record with special characters in field names', () => {
      const state = {
        dataRecordEntity: {
          entities: {
            'record-1': {
              id: 'record-1',
              modelId: 'model-1',
              kind: 'record',
              'data-test-id': 'value1',
              'aria-label': 'value2',
            },
          },
          ids: ['record-1'],
        },
        dataModelFieldEntity: {
          entities: {
            'field-1': { id: 'field-1', name: 'data-test-id', modelId: 'model-1' },
            'field-2': { id: 'field-2', name: 'aria-label', modelId: 'model-1' },
          },
          ids: ['field-1', 'field-2'],
        },
      };

      const result = selectDataRecordEntities(state);

      expect(result['record-1']['field-1']).toBe('value1');
      expect(result['record-1']['field-2']).toBe('value2');
    });

    it('should handle multiple records transformation', () => {
      const state = {
        dataRecordEntity: {
          entities: {
            'record-1': { id: 'record-1', modelId: 'model-1', kind: 'record', name: 'John' },
            'record-2': { id: 'record-2', modelId: 'model-1', kind: 'record', name: 'Jane' },
            'record-3': { id: 'record-3', modelId: 'model-1', kind: 'record', name: 'Bob' },
          },
          ids: ['record-1', 'record-2', 'record-3'],
        },
        dataModelFieldEntity: {
          entities: {
            'field-1': { id: 'field-1', name: 'name', modelId: 'model-1' },
          },
          ids: ['field-1'],
        },
      };

      const result = selectDataRecordEntities(state);

      expect(Object.keys(result)).toHaveLength(3);
      expect(result['record-1']['field-1']).toBe('John');
      expect(result['record-2']['field-1']).toBe('Jane');
      expect(result['record-3']['field-1']).toBe('Bob');
    });

    it('should handle records from different models', () => {
      const state = {
        dataRecordEntity: {
          entities: {
            'record-1': { id: 'record-1', modelId: 'model-1', kind: 'record', name: 'User1' },
            'record-2': { id: 'record-2', modelId: 'model-2', kind: 'record', title: 'Product1' },
          },
          ids: ['record-1', 'record-2'],
        },
        dataModelFieldEntity: {
          entities: {
            'field-1': { id: 'field-1', name: 'name', modelId: 'model-1' },
            'field-2': { id: 'field-2', name: 'title', modelId: 'model-2' },
          },
          ids: ['field-1', 'field-2'],
        },
      };

      const result = selectDataRecordEntities(state);

      expect(result['record-1']['field-1']).toBe('User1');
      expect(result['record-2']['field-2']).toBe('Product1');
    });

    it('should handle empty field values', () => {
      const state = {
        dataRecordEntity: {
          entities: {
            'record-1': {
              id: 'record-1',
              modelId: 'model-1',
              kind: 'record',
              name: '',
            },
          },
          ids: ['record-1'],
        },
        dataModelFieldEntity: {
          entities: {
            'field-1': { id: 'field-1', name: 'name', modelId: 'model-1' },
          },
          ids: ['field-1'],
        },
      };

      const result = selectDataRecordEntities(state);

      expect(result['record-1']['field-1']).toBe('');
    });

    it('should handle null field values', () => {
      const state = {
        dataRecordEntity: {
          entities: {
            'record-1': {
              id: 'record-1',
              modelId: 'model-1',
              kind: 'record',
              name: null,
            },
          },
          ids: ['record-1'],
        },
        dataModelFieldEntity: {
          entities: {
            'field-1': { id: 'field-1', name: 'name', modelId: 'model-1' },
          },
          ids: ['field-1'],
        },
      };

      const result = selectDataRecordEntities(state);

      expect(result['record-1']['field-1']).toBeNull();
    });

    it('should handle undefined field values', () => {
      const state = {
        dataRecordEntity: {
          entities: {
            'record-1': {
              id: 'record-1',
              modelId: 'model-1',
              kind: 'record',
              name: undefined,
            },
          },
          ids: ['record-1'],
        },
        dataModelFieldEntity: {
          entities: {
            'field-1': { id: 'field-1', name: 'name', modelId: 'model-1' },
          },
          ids: ['field-1'],
        },
      };

      const result = selectDataRecordEntities(state);

      expect(result['record-1']['field-1']).toBeUndefined();
    });

    it('should handle numeric field values', () => {
      const state = {
        dataRecordEntity: {
          entities: {
            'record-1': {
              id: 'record-1',
              modelId: 'model-1',
              kind: 'record',
              age: 25,
              price: 99.99,
            },
          },
          ids: ['record-1'],
        },
        dataModelFieldEntity: {
          entities: {
            'field-1': { id: 'field-1', name: 'age', modelId: 'model-1' },
            'field-2': { id: 'field-2', name: 'price', modelId: 'model-1' },
          },
          ids: ['field-1', 'field-2'],
        },
      };

      const result = selectDataRecordEntities(state);

      expect(result['record-1']['field-1']).toBe(25);
      expect(result['record-1']['field-2']).toBe(99.99);
    });

    it('should handle boolean field values', () => {
      const state = {
        dataRecordEntity: {
          entities: {
            'record-1': {
              id: 'record-1',
              modelId: 'model-1',
              kind: 'record',
              isActive: true,
              isDeleted: false,
            },
          },
          ids: ['record-1'],
        },
        dataModelFieldEntity: {
          entities: {
            'field-1': { id: 'field-1', name: 'isActive', modelId: 'model-1' },
            'field-2': { id: 'field-2', name: 'isDeleted', modelId: 'model-1' },
          },
          ids: ['field-1', 'field-2'],
        },
      };

      const result = selectDataRecordEntities(state);

      expect(result['record-1']['field-1']).toBe(true);
      expect(result['record-1']['field-2']).toBe(false);
    });

    it('should handle array field values', () => {
      const state = {
        dataRecordEntity: {
          entities: {
            'record-1': {
              id: 'record-1',
              modelId: 'model-1',
              kind: 'record',
              tags: ['tag1', 'tag2', 'tag3'],
            },
          },
          ids: ['record-1'],
        },
        dataModelFieldEntity: {
          entities: {
            'field-1': { id: 'field-1', name: 'tags', modelId: 'model-1' },
          },
          ids: ['field-1'],
        },
      };

      const result = selectDataRecordEntities(state);

      expect(result['record-1']['field-1']).toEqual(['tag1', 'tag2', 'tag3']);
    });

    it('should handle object field values', () => {
      const state = {
        dataRecordEntity: {
          entities: {
            'record-1': {
              id: 'record-1',
              modelId: 'model-1',
              kind: 'record',
              metadata: { key: 'value', nested: { deep: 'data' } },
            },
          },
          ids: ['record-1'],
        },
        dataModelFieldEntity: {
          entities: {
            'field-1': { id: 'field-1', name: 'metadata', modelId: 'model-1' },
          },
          ids: ['field-1'],
        },
      };

      const result = selectDataRecordEntities(state);

      expect(result['record-1']['field-1']).toEqual({
        key: 'value',
        nested: { deep: 'data' },
      });
    });

    it('should handle very long field names', () => {
      const longFieldName = 'a'.repeat(1000);

      const state = {
        dataRecordEntity: {
          entities: {
            'record-1': {
              id: 'record-1',
              modelId: 'model-1',
              kind: 'record',
              [longFieldName]: 'value',
            },
          },
          ids: ['record-1'],
        },
        dataModelFieldEntity: {
          entities: {
            'field-1': { id: 'field-1', name: longFieldName, modelId: 'model-1' },
          },
          ids: ['field-1'],
        },
      };

      const result = selectDataRecordEntities(state);

      expect(result['record-1']['field-1']).toBe('value');
    });

    it('should handle case-sensitive field names', () => {
      const state = {
        dataRecordEntity: {
          entities: {
            'record-1': {
              id: 'record-1',
              modelId: 'model-1',
              kind: 'record',
              Name: 'value1',
              name: 'value2',
              NAME: 'value3',
            },
          },
          ids: ['record-1'],
        },
        dataModelFieldEntity: {
          entities: {
            'field-1': { id: 'field-1', name: 'Name', modelId: 'model-1' },
            'field-2': { id: 'field-2', name: 'name', modelId: 'model-1' },
            'field-3': { id: 'field-3', name: 'NAME', modelId: 'model-1' },
          },
          ids: ['field-1', 'field-2', 'field-3'],
        },
      };

      const result = selectDataRecordEntities(state);

      expect(result['record-1']['field-1']).toBe('value1');
      expect(result['record-1']['field-2']).toBe('value2');
      expect(result['record-1']['field-3']).toBe('value3');
    });

    it('should handle record with 100+ fields efficiently', () => {
      const manyFields = {};
      const fieldEntities = {};

      for (let i = 0; i < 100; i++) {
        const fieldName = `field${i}`;
        const fieldId = `field-${i}`;
        manyFields[fieldName] = `value${i}`;
        fieldEntities[fieldId] = { id: fieldId, name: fieldName, modelId: 'model-1' };
      }

      const state = {
        dataRecordEntity: {
          entities: {
            'record-1': {
              id: 'record-1',
              modelId: 'model-1',
              kind: 'record',
              ...manyFields,
            },
          },
          ids: ['record-1'],
        },
        dataModelFieldEntity: {
          entities: fieldEntities,
          ids: Object.keys(fieldEntities),
        },
      };

      const startTime = performance.now();
      const result = selectDataRecordEntities(state);
      const endTime = performance.now();

      expect(Object.keys(result['record-1'])).toHaveLength(103); // 100 fields + id, modelId, kind
      expect(endTime - startTime).toBeLessThan(10); // Should complete in under 10ms
    });

    it('should handle Unicode characters in field names and values', () => {
      const state = {
        dataRecordEntity: {
          entities: {
            'record-1': {
              id: 'record-1',
              modelId: 'model-1',
              kind: 'record',
              'имя': 'Иван',
              '名前': '太郎',
              'emoji🎉': 'value🚀',
            },
          },
          ids: ['record-1'],
        },
        dataModelFieldEntity: {
          entities: {
            'field-1': { id: 'field-1', name: 'имя', modelId: 'model-1' },
            'field-2': { id: 'field-2', name: '名前', modelId: 'model-1' },
            'field-3': { id: 'field-3', name: 'emoji🎉', modelId: 'model-1' },
          },
          ids: ['field-1', 'field-2', 'field-3'],
        },
      };

      const result = selectDataRecordEntities(state);

      expect(result['record-1']['field-1']).toBe('Иван');
      expect(result['record-1']['field-2']).toBe('太郎');
      expect(result['record-1']['field-3']).toBe('value🚀');
    });

    it('should handle records with missing modelId', () => {
      const state = {
        dataRecordEntity: {
          entities: {
            'record-1': {
              id: 'record-1',
              // Missing modelId
              kind: 'record',
              name: 'Test',
            },
          },
          ids: ['record-1'],
        },
        dataModelFieldEntity: {
          entities: {
            'field-1': { id: 'field-1', name: 'name', modelId: 'model-1' },
          },
          ids: ['field-1'],
        },
      };

      const result = selectDataRecordEntities(state);

      // Should handle gracefully
      expect(result['record-1']).toBeDefined();
    });
  });

  // NOTE: Sections 2 and 3 (Reference Resolution & Display Value Priority)
  // will be added in the next batch to keep file size manageable
});

