// ===================================================================
// Unit Tests for VarPropValue Entity Redux Selectors
// Coverage Target: 95%+
// Continuation Phase (Selector Testing - Beyond 2,000!)
// ===================================================================

import { describe, it, expect, vi } from 'vitest';
import {
  selectPropValueState,
  selectSelectedPropValue,
  selectAllPropValues,
  selectPropValueById,
  selectPropValuesByIds,
  selectPropValuesByPropId,
} from './selectors';

// Mock UI state selectors
vi.mock('./uiStates/selectors', () => ({
  selectSelectedPropValueId: vi.fn((state) => state.mockSelectedPropValueId || null),
}));

describe('VarPropValue Entity Selectors', () => {
  describe('Base Selectors', () => {
    describe('selectPropValueState', () => {
      it('should return prop value entity state', () => {
        const propValueState = {
          entities: {},
          ids: [],
          byProp: {},
        };
        const state = {
          propValueEntity: propValueState,
        };

        expect(selectPropValueState(state)).toEqual(propValueState);
      });

      it('should handle state with data', () => {
        const propValueState = {
          entities: {
            'pv-1': { id: 'pv-1', propId: 'prop-1', value: 'red' },
          },
          ids: ['pv-1'],
          byProp: {
            'prop-1': ['pv-1'],
          },
        };
        const state = {
          propValueEntity: propValueState,
        };

        expect(selectPropValueState(state)).toEqual(propValueState);
      });
    });
  });

  describe('Entity Lookup Selectors', () => {
    describe('selectPropValueById', () => {
      it('should return prop value by ID', () => {
        const propValue = {
          id: 'pv-1',
          propId: 'prop-1',
          value: 'blue',
          type: 'color',
        };
        const state = {
          propValueEntity: {
            entities: {
              'pv-1': propValue,
            },
            ids: ['pv-1'],
          },
        };

        expect(selectPropValueById(state, 'pv-1')).toEqual(propValue);
      });

      it('should return undefined for non-existent ID', () => {
        const state = {
          propValueEntity: {
            entities: {},
            ids: [],
          },
        };

        expect(selectPropValueById(state, 'non-existent')).toBeUndefined();
      });

      it('should handle prop value with complex data', () => {
        const propValue = {
          id: 'pv-1',
          propId: 'prop-1',
          value: {
            r: 255,
            g: 0,
            b: 0,
            a: 1,
          },
          type: 'color',
          metadata: {
            created: '2024-01-01',
          },
        };
        const state = {
          propValueEntity: {
            entities: {
              'pv-1': propValue,
            },
            ids: ['pv-1'],
          },
        };

        const result = selectPropValueById(state, 'pv-1');
        expect(result.value.r).toBe(255);
        expect(result.metadata.created).toBe('2024-01-01');
      });
    });

    describe('selectSelectedPropValue', () => {
      it('should return selected prop value', () => {
        const propValue = { id: 'pv-selected', value: 'green' };
        const state = {
          propValueEntity: {
            entities: {
              'pv-selected': propValue,
            },
            ids: ['pv-selected'],
          },
          mockSelectedPropValueId: 'pv-selected',
        };

        expect(selectSelectedPropValue(state)).toEqual(propValue);
      });

      it('should return null when no prop value selected', () => {
        const state = {
          propValueEntity: {
            entities: {},
            ids: [],
          },
          mockSelectedPropValueId: null,
        };

        expect(selectSelectedPropValue(state)).toBeNull();
      });

      it('should return undefined when selected prop value does not exist', () => {
        const state = {
          propValueEntity: {
            entities: {},
            ids: [],
          },
          mockSelectedPropValueId: 'non-existent',
        };

        expect(selectSelectedPropValue(state)).toBeUndefined();
      });

      it('should handle valid selection', () => {
        const propValue = {
          id: 'pv-1',
          propId: 'prop-1',
          value: 'selected-value',
        };
        const state = {
          propValueEntity: {
            entities: {
              'pv-1': propValue,
            },
            ids: ['pv-1'],
          },
          mockSelectedPropValueId: 'pv-1',
        };

        const result = selectSelectedPropValue(state);
        expect(result.value).toBe('selected-value');
      });
    });
  });

  describe('Collection Selectors', () => {
    describe('selectAllPropValues', () => {
      it('should return all prop values as array', () => {
        const entities = {
          'pv-1': { id: 'pv-1', propId: 'prop-1', value: 'red' },
          'pv-2': { id: 'pv-2', propId: 'prop-2', value: 'blue' },
          'pv-3': { id: 'pv-3', propId: 'prop-3', value: 'green' },
        };
        const state = {
          propValueEntity: {
            ids: ['pv-1', 'pv-2', 'pv-3'],
            entities,
          },
        };

        const result = selectAllPropValues(state);
        expect(result).toHaveLength(3);
        expect(result[0]).toEqual(entities['pv-1']);
        expect(result[1]).toEqual(entities['pv-2']);
        expect(result[2]).toEqual(entities['pv-3']);
      });

      it('should return empty array when no prop values', () => {
        const state = {
          propValueEntity: {
            ids: [],
            entities: {},
          },
        };

        expect(selectAllPropValues(state)).toEqual([]);
      });

      it('should maintain order based on ids array', () => {
        const state = {
          propValueEntity: {
            ids: ['pv-3', 'pv-1', 'pv-2'],
            entities: {
              'pv-1': { id: 'pv-1', order: 1 },
              'pv-2': { id: 'pv-2', order: 2 },
              'pv-3': { id: 'pv-3', order: 3 },
            },
          },
        };

        const result = selectAllPropValues(state);
        expect(result[0].id).toBe('pv-3');
        expect(result[1].id).toBe('pv-1');
        expect(result[2].id).toBe('pv-2');
      });

      it('should handle undefined prop values in results', () => {
        const state = {
          propValueEntity: {
            ids: ['pv-1', 'non-existent', 'pv-2'],
            entities: {
              'pv-1': { id: 'pv-1', value: 'red' },
              'pv-2': { id: 'pv-2', value: 'blue' },
            },
          },
        };

        const result = selectAllPropValues(state);
        expect(result).toHaveLength(3);
        expect(result[1]).toBeUndefined();
      });
    });

    describe('selectPropValuesByIds', () => {
      it('should return prop values for given IDs', () => {
        const state = {
          propValueEntity: {
            entities: {
              'pv-1': { id: 'pv-1', value: 'red' },
              'pv-2': { id: 'pv-2', value: 'blue' },
              'pv-3': { id: 'pv-3', value: 'green' },
            },
          },
        };

        const result = selectPropValuesByIds(state, ['pv-1', 'pv-3']);
        expect(result).toHaveLength(2);
        expect(result[0].value).toBe('red');
        expect(result[1].value).toBe('green');
      });

      it('should filter out non-existent prop values', () => {
        const state = {
          propValueEntity: {
            entities: {
              'pv-1': { id: 'pv-1', value: 'red' },
            },
          },
        };

        const result = selectPropValuesByIds(state, ['pv-1', 'non-existent']);
        expect(result).toHaveLength(1);
        expect(result[0].id).toBe('pv-1');
      });

      it('should return empty array when ids is null', () => {
        const state = {
          propValueEntity: {
            entities: {},
          },
        };

        const result = selectPropValuesByIds(state, null);
        expect(result).toEqual([]);
      });

      it('should return empty array when ids is undefined', () => {
        const state = {
          propValueEntity: {
            entities: {},
          },
        };

        const result = selectPropValuesByIds(state, undefined);
        expect(result).toEqual([]);
      });

      it('should maintain order from ids array', () => {
        const state = {
          propValueEntity: {
            entities: {
              'pv-1': { id: 'pv-1', value: 'red' },
              'pv-2': { id: 'pv-2', value: 'blue' },
              'pv-3': { id: 'pv-3', value: 'green' },
            },
          },
        };

        const result = selectPropValuesByIds(state, ['pv-3', 'pv-1', 'pv-2']);
        expect(result[0].value).toBe('green');
        expect(result[1].value).toBe('red');
        expect(result[2].value).toBe('blue');
      });
    });
  });

  describe('Indexed Lookup Selectors', () => {
    describe('selectPropValuesByPropId', () => {
      it('should return prop values for given prop ID', () => {
        const state = {
          propValueEntity: {
            entities: {
              'pv-1': { id: 'pv-1', propId: 'prop-1', value: 'red' },
              'pv-2': { id: 'pv-2', propId: 'prop-1', value: 'blue' },
              'pv-3': { id: 'pv-3', propId: 'prop-2', value: 'green' },
            },
            byProp: {
              'prop-1': ['pv-1', 'pv-2'],
              'prop-2': ['pv-3'],
            },
          },
        };

        const result = selectPropValuesByPropId(state, 'prop-1');
        expect(result).toHaveLength(2);
        expect(result[0].propId).toBe('prop-1');
        expect(result[1].propId).toBe('prop-1');
      });

      it('should return empty array when propId is null', () => {
        const state = {
          propValueEntity: {
            entities: {},
            byProp: {},
          },
        };

        const result = selectPropValuesByPropId(state, null);
        expect(result).toEqual([]);
      });

      it('should return empty array when propId is undefined', () => {
        const state = {
          propValueEntity: {
            entities: {},
            byProp: {},
          },
        };

        const result = selectPropValuesByPropId(state, undefined);
        expect(result).toEqual([]);
      });

      it('should return empty array when prop has no values', () => {
        const state = {
          propValueEntity: {
            entities: {},
            byProp: {},
          },
        };

        const result = selectPropValuesByPropId(state, 'prop-unknown');
        expect(result).toEqual([]);
      });

      it('should handle prop with multiple values', () => {
        const state = {
          propValueEntity: {
            entities: {
              'pv-1': { id: 'pv-1', propId: 'prop-1', value: 'value1' },
              'pv-2': { id: 'pv-2', propId: 'prop-1', value: 'value2' },
              'pv-3': { id: 'pv-3', propId: 'prop-1', value: 'value3' },
            },
            byProp: {
              'prop-1': ['pv-1', 'pv-2', 'pv-3'],
            },
          },
        };

        const result = selectPropValuesByPropId(state, 'prop-1');
        expect(result).toHaveLength(3);
        expect(result.map(pv => pv.value)).toEqual(['value1', 'value2', 'value3']);
      });

      it('should maintain order from byProp index', () => {
        const state = {
          propValueEntity: {
            entities: {
              'pv-1': { id: 'pv-1', propId: 'prop-1', order: 1 },
              'pv-2': { id: 'pv-2', propId: 'prop-1', order: 2 },
              'pv-3': { id: 'pv-3', propId: 'prop-1', order: 3 },
            },
            byProp: {
              'prop-1': ['pv-3', 'pv-1', 'pv-2'], // custom order
            },
          },
        };

        const result = selectPropValuesByPropId(state, 'prop-1');
        expect(result[0].id).toBe('pv-3');
        expect(result[1].id).toBe('pv-1');
        expect(result[2].id).toBe('pv-2');
      });
    });
  });

  describe('Edge Cases', () => {
    describe('Different value types', () => {
      it('should handle string values', () => {
        const state = {
          propValueEntity: {
            entities: {
              'pv-1': { id: 'pv-1', propId: 'prop-1', value: 'text value' },
            },
          },
        };

        const result = selectPropValueById(state, 'pv-1');
        expect(typeof result.value).toBe('string');
      });

      it('should handle numeric values', () => {
        const state = {
          propValueEntity: {
            entities: {
              'pv-1': { id: 'pv-1', propId: 'prop-1', value: 42 },
            },
          },
        };

        const result = selectPropValueById(state, 'pv-1');
        expect(typeof result.value).toBe('number');
        expect(result.value).toBe(42);
      });

      it('should handle boolean values', () => {
        const state = {
          propValueEntity: {
            entities: {
              'pv-1': { id: 'pv-1', propId: 'prop-1', value: true },
            },
          },
        };

        const result = selectPropValueById(state, 'pv-1');
        expect(typeof result.value).toBe('boolean');
        expect(result.value).toBe(true);
      });

      it('should handle object values', () => {
        const state = {
          propValueEntity: {
            entities: {
              'pv-1': {
                id: 'pv-1',
                propId: 'prop-1',
                value: {
                  color: 'red',
                  size: 'large',
                },
              },
            },
          },
        };

        const result = selectPropValueById(state, 'pv-1');
        expect(typeof result.value).toBe('object');
        expect(result.value.color).toBe('red');
      });

      it('should handle array values', () => {
        const state = {
          propValueEntity: {
            entities: {
              'pv-1': {
                id: 'pv-1',
                propId: 'prop-1',
                value: ['option1', 'option2', 'option3'],
              },
            },
          },
        };

        const result = selectPropValueById(state, 'pv-1');
        expect(Array.isArray(result.value)).toBe(true);
        expect(result.value).toHaveLength(3);
      });
    });

    describe('Complex prop value structures', () => {
      it('should handle prop values with metadata', () => {
        const propValue = {
          id: 'pv-1',
          propId: 'prop-1',
          value: 'complex value',
          metadata: {
            created: '2024-01-01',
            updated: '2024-01-02',
            author: 'user-123',
          },
        };
        const state = {
          propValueEntity: {
            entities: {
              'pv-1': propValue,
            },
          },
        };

        const result = selectPropValueById(state, 'pv-1');
        expect(result.metadata.author).toBe('user-123');
      });

      it('should handle prop values with validation', () => {
        const propValue = {
          id: 'pv-1',
          propId: 'prop-1',
          value: 'validated value',
          validation: {
            isValid: true,
            errors: [],
          },
        };
        const state = {
          propValueEntity: {
            entities: {
              'pv-1': propValue,
            },
          },
        };

        const result = selectPropValueById(state, 'pv-1');
        expect(result.validation.isValid).toBe(true);
      });
    });

    describe('Empty state handling', () => {
      it('should handle completely empty state', () => {
        const state = {
          propValueEntity: {
            entities: {},
            ids: [],
            byProp: {},
          },
        };

        expect(selectAllPropValues(state)).toEqual([]);
        expect(selectSelectedPropValue(state)).toBeNull();
        expect(selectPropValuesByPropId(state, 'prop-1')).toEqual([]);
      });
    });
  });
});

