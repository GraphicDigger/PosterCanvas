// ===================================================================
// Unit Tests for VarProp Entity Redux Selectors
// Coverage Target: 95%+
// Week 4 - Day 5 (Selector Testing)
// ===================================================================

import { describe, it, expect, vi } from 'vitest';
import {
  selectAllProps,
  selectSelectedProp,
  selectPropById,
  selectPropsByComponentId,
} from './selectors';

// Mock UI state selectors
vi.mock('./uiStates/selectors', () => ({
  selectSelectedPropId: vi.fn((state) => state.mockSelectedPropId || null),
}));

// Mock cross-entity selectors
vi.mock('../../@x/propValue', () => ({
  selectPropValuesByPropId: vi.fn((state, propId) => [
    { id: 'pv-1', propId, value: 'value1' },
    { id: 'pv-2', propId, value: 'value2' },
  ]),
}));

vi.mock('../../@x/component', () => ({
  selectSelectedComponentId: vi.fn((state) => state.mockSelectedComponentId || null),
}));

describe('VarProp Entity Selectors', () => {
  describe('Collection Selectors', () => {
    describe('selectAllProps', () => {
      it('should return all props as array', () => {
        const entities = {
          'prop-1': { id: 'prop-1', name: 'width', type: 'number' },
          'prop-2': { id: 'prop-2', name: 'height', type: 'number' },
          'prop-3': { id: 'prop-3', name: 'color', type: 'color' },
        };
        const state = {
          propEntity: {
            ids: ['prop-1', 'prop-2', 'prop-3'],
            entities,
          },
        };

        const result = selectAllProps(state);
        expect(result).toHaveLength(3);
        expect(result[0]).toEqual(entities['prop-1']);
        expect(result[1]).toEqual(entities['prop-2']);
        expect(result[2]).toEqual(entities['prop-3']);
      });

      it('should return empty array when no props', () => {
        const state = {
          propEntity: {
            ids: [],
            entities: {},
          },
        };

        expect(selectAllProps(state)).toEqual([]);
      });

      it('should maintain order based on ids array', () => {
        const state = {
          propEntity: {
            ids: ['prop-3', 'prop-1', 'prop-2'],
            entities: {
              'prop-1': { id: 'prop-1', order: 1 },
              'prop-2': { id: 'prop-2', order: 2 },
              'prop-3': { id: 'prop-3', order: 3 },
            },
          },
        };

        const result = selectAllProps(state);
        expect(result[0].id).toBe('prop-3');
        expect(result[1].id).toBe('prop-1');
        expect(result[2].id).toBe('prop-2');
      });

      it('should handle undefined props', () => {
        const state = {
          propEntity: {
            ids: ['prop-1', 'non-existent', 'prop-2'],
            entities: {
              'prop-1': { id: 'prop-1', name: 'width' },
              'prop-2': { id: 'prop-2', name: 'height' },
            },
          },
        };

        const result = selectAllProps(state);
        expect(result).toHaveLength(3);
        expect(result[1]).toBeUndefined();
      });
    });
  });

  describe('Selected Prop Selector', () => {
    describe('selectSelectedProp', () => {
      it('should return selected prop', () => {
        const prop = { id: 'prop-selected', name: 'Selected Prop', type: 'string' };
        const state = {
          propEntity: {
            entities: {
              'prop-selected': prop,
            },
          },
          mockSelectedPropId: 'prop-selected',
        };

        expect(selectSelectedProp(state)).toEqual(prop);
      });

      it('should return null when no prop selected', () => {
        const state = {
          propEntity: {
            entities: {},
          },
          mockSelectedPropId: null,
        };

        expect(selectSelectedProp(state)).toBeNull();
      });

      it('should return undefined when selected prop does not exist', () => {
        const state = {
          propEntity: {
            entities: {},
          },
          mockSelectedPropId: 'non-existent',
        };

        expect(selectSelectedProp(state)).toBeUndefined();
      });
    });
  });

  describe('Prop Lookup Selectors', () => {
    describe('selectPropById', () => {
      it('should return prop with values', () => {
        const prop = { id: 'prop-1', name: 'width', type: 'number' };
        const state = {
          propEntity: {
            entities: {
              'prop-1': prop,
            },
          },
        };

        const result = selectPropById(state, 'prop-1');

        expect(result).toBeDefined();
        expect(result.id).toBe('prop-1');
        expect(result.values).toBeDefined();
        expect(result.values).toHaveLength(2);
      });

      it('should include empty values array when no values', () => {
        const prop = { id: 'prop-1', name: 'width' };
        const state = {
          propEntity: {
            entities: {
              'prop-1': prop,
            },
          },
        };

        const result = selectPropById(state, 'prop-1');

        expect(result.values).toBeDefined();
        expect(Array.isArray(result.values)).toBe(true);
      });

      it('should preserve original prop properties', () => {
        const prop = {
          id: 'prop-1',
          name: 'width',
          type: 'number',
          defaultValue: '100px',
          metadata: { unit: 'px' },
        };
        const state = {
          propEntity: {
            entities: {
              'prop-1': prop,
            },
          },
        };

        const result = selectPropById(state, 'prop-1');

        expect(result.name).toBe('width');
        expect(result.type).toBe('number');
        expect(result.defaultValue).toBe('100px');
        expect(result.metadata.unit).toBe('px');
      });
    });
  });

  describe('Component Props Selector', () => {
    describe('selectPropsByComponentId', () => {
      it('should return props for component', () => {
        const state = {
          propEntity: {
            byComponent: {
              'component-1': ['prop-1', 'prop-2'],
            },
            entities: {
              'prop-1': { id: 'prop-1', name: 'width', type: 'number' },
              'prop-2': { id: 'prop-2', name: 'height', type: 'number' },
            },
          },
        };

        const result = selectPropsByComponentId(state, 'component-1');

        expect(result).toHaveLength(2);
        expect(result[0].name).toBe('width');
        expect(result[1].name).toBe('height');
      });

      it('should include values for each prop', () => {
        const state = {
          propEntity: {
            byComponent: {
              'component-1': ['prop-1'],
            },
            entities: {
              'prop-1': { id: 'prop-1', name: 'width' },
            },
          },
        };

        const result = selectPropsByComponentId(state, 'component-1');

        expect(result).toHaveLength(1);
        expect(result[0].values).toBeDefined();
        expect(result[0].values).toHaveLength(2);
      });

      it('should return empty array when component has no props', () => {
        const state = {
          propEntity: {
            byComponent: {},
            entities: {},
          },
        };

        const result = selectPropsByComponentId(state, 'component-1');

        expect(result).toEqual([]);
      });

      it('should handle component with only valid props', () => {
        const state = {
          propEntity: {
            byComponent: {
              'component-1': ['prop-1', 'prop-2'],
            },
            entities: {
              'prop-1': { id: 'prop-1', name: 'width' },
              'prop-2': { id: 'prop-2', name: 'height' },
            },
          },
        };

        const result = selectPropsByComponentId(state, 'component-1');

        expect(Array.isArray(result)).toBe(true);
        expect(result).toHaveLength(2);
      });

      it('should preserve prop order from byComponent', () => {
        const state = {
          propEntity: {
            byComponent: {
              'component-1': ['prop-3', 'prop-1', 'prop-2'],
            },
            entities: {
              'prop-1': { id: 'prop-1', name: 'first' },
              'prop-2': { id: 'prop-2', name: 'second' },
              'prop-3': { id: 'prop-3', name: 'third' },
            },
          },
        };

        const result = selectPropsByComponentId(state, 'component-1');

        expect(result[0].name).toBe('third');
        expect(result[1].name).toBe('first');
        expect(result[2].name).toBe('second');
      });
    });
  });

  describe('Edge Cases', () => {
    describe('Complex prop data', () => {
      it('should handle props with nested properties', () => {
        const prop = {
          id: 'prop-1',
          name: 'style',
          type: 'object',
          structure: {
            backgroundColor: 'color',
            padding: 'spacing',
          },
          metadata: {
            category: 'layout',
          },
        };
        const state = {
          propEntity: {
            entities: {
              'prop-1': prop,
            },
          },
        };

        const result = selectPropById(state, 'prop-1');

        expect(result.structure.backgroundColor).toBe('color');
        expect(result.metadata.category).toBe('layout');
      });
    });

    describe('Multiple component props', () => {
      it('should handle multiple components with different props', () => {
        const state = {
          propEntity: {
            byComponent: {
              'component-1': ['prop-1', 'prop-2'],
              'component-2': ['prop-3', 'prop-4'],
            },
            entities: {
              'prop-1': { id: 'prop-1', name: 'width' },
              'prop-2': { id: 'prop-2', name: 'height' },
              'prop-3': { id: 'prop-3', name: 'color' },
              'prop-4': { id: 'prop-4', name: 'fontSize' },
            },
          },
        };

        const comp1Props = selectPropsByComponentId(state, 'component-1');
        const comp2Props = selectPropsByComponentId(state, 'component-2');

        expect(comp1Props).toHaveLength(2);
        expect(comp2Props).toHaveLength(2);
        expect(comp1Props[0].name).toBe('width');
        expect(comp2Props[0].name).toBe('color');
      });
    });

    describe('Prop types', () => {
      it('should handle different prop types', () => {
        const state = {
          propEntity: {
            ids: ['prop-1', 'prop-2', 'prop-3', 'prop-4'],
            entities: {
              'prop-1': { id: 'prop-1', name: 'width', type: 'number' },
              'prop-2': { id: 'prop-2', name: 'color', type: 'color' },
              'prop-3': { id: 'prop-3', name: 'label', type: 'string' },
              'prop-4': { id: 'prop-4', name: 'visible', type: 'boolean' },
            },
          },
        };

        const allProps = selectAllProps(state);

        expect(allProps.find(p => p.type === 'number')).toBeDefined();
        expect(allProps.find(p => p.type === 'color')).toBeDefined();
        expect(allProps.find(p => p.type === 'string')).toBeDefined();
        expect(allProps.find(p => p.type === 'boolean')).toBeDefined();
      });
    });

    describe('Empty state handling', () => {
      it('should handle completely empty state', () => {
        const state = {
          propEntity: {
            ids: [],
            entities: {},
            byComponent: {},
          },
        };

        expect(selectAllProps(state)).toEqual([]);
        expect(selectPropsByComponentId(state, 'component-1')).toEqual([]);
      });
    });

    describe('Prop values integration', () => {
      it('should include prop values in lookup', () => {
        const prop = { id: 'prop-1', name: 'width' };
        const state = {
          propEntity: {
            entities: {
              'prop-1': prop,
            },
          },
        };

        const result = selectPropById(state, 'prop-1');

        // Values should be included from mocked selector
        expect(result.values).toHaveLength(2);
        expect(result.values[0].value).toBe('value1');
        expect(result.values[1].value).toBe('value2');
      });
    });
  });
});

