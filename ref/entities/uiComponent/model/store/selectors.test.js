// ===================================================================
// Unit Tests for UIComponent Entity Redux Selectors
// Coverage Target: 95%+
// Week 4 - Day 5 (Selector Testing)
// ===================================================================

import { describe, it, expect, vi } from 'vitest';
import {
  selectComponentEntities,
  selectComponentIds,
  selectComponentStates,
  selectHoveredComponentId,
  selectFocusedComponentId,
  selectSelectedComponentId,
  selectComponentById,
  selectComponentCheckStates,
  selectAllComponents,
  selectSelectedComponent,
  selectCompositeComponentById,
} from './selectors';

// Mock cross-entity selectors
vi.mock('../../@x/props', () => ({
  selectPropsByComponentId: vi.fn((state, componentId) => [
    { id: 'prop-1', componentId, name: 'width', value: '100px' },
    { id: 'prop-2', componentId, name: 'height', value: '200px' },
  ]),
}));

vi.mock('../../@x/instances', () => ({
  selectNestedInstancesByComponentId: vi.fn((state, componentId) => [
    { id: 'instance-1', componentId },
    { id: 'instance-2', componentId },
  ]),
}));

describe('UIComponent Entity Selectors', () => {
  describe('Base Selectors', () => {
    describe('selectComponentEntities', () => {
      it('should return component entities object', () => {
        const entities = {
          'component-1': { id: 'component-1', name: 'Button' },
          'component-2': { id: 'component-2', name: 'Card' },
        };
        const state = {
          componentEntity: {
            entities,
          },
        };

        expect(selectComponentEntities(state)).toEqual(entities);
      });

      it('should return empty object when no entities', () => {
        const state = {
          componentEntity: {
            entities: {},
          },
        };

        expect(selectComponentEntities(state)).toEqual({});
      });
    });

    describe('selectComponentIds', () => {
      it('should return component ids array', () => {
        const ids = ['component-1', 'component-2', 'component-3'];
        const state = {
          componentEntity: {
            ids,
          },
        };

        expect(selectComponentIds(state)).toEqual(ids);
      });

      it('should return empty array when no ids', () => {
        const state = {
          componentEntity: {
            ids: [],
          },
        };

        expect(selectComponentIds(state)).toEqual([]);
      });
    });

    describe('selectComponentStates', () => {
      it('should return component UI state', () => {
        const uiState = {
          hoveredComponentId: 'component-1',
          focusedComponentId: 'component-2',
          selectedComponentId: 'component-3',
        };
        const state = {
          componentEntity: {
            ui: uiState,
          },
        };

        expect(selectComponentStates(state)).toEqual(uiState);
      });
    });
  });

  describe('UI State Selectors', () => {
    describe('selectHoveredComponentId', () => {
      it('should return hovered component ID', () => {
        const state = {
          componentEntity: {
            ui: {
              hoveredComponentId: 'component-hovered',
            },
          },
        };

        expect(selectHoveredComponentId(state)).toBe('component-hovered');
      });

      it('should return null when no hovered component', () => {
        const state = {
          componentEntity: {
            ui: {
              hoveredComponentId: null,
            },
          },
        };

        expect(selectHoveredComponentId(state)).toBeNull();
      });
    });

    describe('selectFocusedComponentId', () => {
      it('should return focused component ID', () => {
        const state = {
          componentEntity: {
            ui: {
              focusedComponentId: 'component-focused',
            },
          },
        };

        expect(selectFocusedComponentId(state)).toBe('component-focused');
      });

      it('should return null when no focused component', () => {
        const state = {
          componentEntity: {
            ui: {
              focusedComponentId: null,
            },
          },
        };

        expect(selectFocusedComponentId(state)).toBeNull();
      });
    });

    describe('selectSelectedComponentId', () => {
      it('should return selected component ID', () => {
        const state = {
          componentEntity: {
            ui: {
              selectedComponentId: 'component-selected',
            },
          },
        };

        expect(selectSelectedComponentId(state)).toBe('component-selected');
      });

      it('should return null when no selected component', () => {
        const state = {
          componentEntity: {
            ui: {
              selectedComponentId: null,
            },
          },
        };

        expect(selectSelectedComponentId(state)).toBeNull();
      });
    });
  });

  describe('Check States Selector', () => {
    describe('selectComponentCheckStates', () => {
      it('should return all check states as true for same component', () => {
        const state = {
          componentEntity: {
            ui: {
              hoveredComponentId: 'component-1',
              focusedComponentId: 'component-1',
              selectedComponentId: 'component-1',
            },
          },
        };

        const result = selectComponentCheckStates(state, 'component-1');
        expect(result).toEqual({
          isSelected: true,
          isFocused: true,
          isHovered: true,
        });
      });

      it('should return all check states as false for different component', () => {
        const state = {
          componentEntity: {
            ui: {
              hoveredComponentId: 'component-1',
              focusedComponentId: 'component-2',
              selectedComponentId: 'component-3',
            },
          },
        };

        const result = selectComponentCheckStates(state, 'component-4');
        expect(result).toEqual({
          isSelected: false,
          isFocused: false,
          isHovered: false,
        });
      });

      it('should return mixed check states', () => {
        const state = {
          componentEntity: {
            ui: {
              hoveredComponentId: 'component-1',
              focusedComponentId: 'component-1',
              selectedComponentId: 'component-2',
            },
          },
        };

        const result = selectComponentCheckStates(state, 'component-1');
        expect(result).toEqual({
          isSelected: false,
          isFocused: true,
          isHovered: true,
        });
      });
    });
  });

  describe('Entity Lookup Selectors', () => {
    describe('selectComponentById', () => {
      it('should return component by ID', () => {
        const component = { id: 'component-1', name: 'Button', type: 'interactive' };
        const state = {
          componentEntity: {
            entities: {
              'component-1': component,
            },
          },
        };

        expect(selectComponentById(state, 'component-1')).toEqual(component);
      });

      it('should return undefined for non-existent ID', () => {
        const state = {
          componentEntity: {
            entities: {},
          },
        };

        expect(selectComponentById(state, 'non-existent')).toBeUndefined();
      });

      it('should handle null entities', () => {
        const state = {
          componentEntity: {
            entities: null,
          },
        };

        expect(() => selectComponentById(state, 'component-1')).toThrow();
      });
    });

    describe('selectSelectedComponent', () => {
      it('should return selected component', () => {
        const component = { id: 'component-selected', name: 'Selected Component' };
        const state = {
          componentEntity: {
            ui: {
              selectedComponentId: 'component-selected',
            },
            entities: {
              'component-selected': component,
            },
          },
        };

        expect(selectSelectedComponent(state)).toEqual(component);
      });

      it('should return null when no component selected', () => {
        const state = {
          componentEntity: {
            ui: {
              selectedComponentId: null,
            },
            entities: {},
          },
        };

        expect(selectSelectedComponent(state)).toBeNull();
      });

      it('should return undefined when selected component does not exist', () => {
        const state = {
          componentEntity: {
            ui: {
              selectedComponentId: 'non-existent',
            },
            entities: {},
          },
        };

        expect(selectSelectedComponent(state)).toBeUndefined();
      });
    });
  });

  describe('Collection Selectors', () => {
    describe('selectAllComponents', () => {
      it('should return all components as array', () => {
        const entities = {
          'component-1': { id: 'component-1', name: 'Button' },
          'component-2': { id: 'component-2', name: 'Card' },
          'component-3': { id: 'component-3', name: 'Modal' },
        };
        const state = {
          componentEntity: {
            ids: ['component-1', 'component-2', 'component-3'],
            entities,
          },
        };

        const result = selectAllComponents(state);
        expect(result).toHaveLength(3);
        expect(result[0]).toEqual(entities['component-1']);
        expect(result[1]).toEqual(entities['component-2']);
        expect(result[2]).toEqual(entities['component-3']);
      });

      it('should return empty array when no components', () => {
        const state = {
          componentEntity: {
            ids: [],
            entities: {},
          },
        };

        expect(selectAllComponents(state)).toEqual([]);
      });

      it('should maintain order based on ids array', () => {
        const state = {
          componentEntity: {
            ids: ['component-3', 'component-1', 'component-2'],
            entities: {
              'component-1': { id: 'component-1', order: 1 },
              'component-2': { id: 'component-2', order: 2 },
              'component-3': { id: 'component-3', order: 3 },
            },
          },
        };

        const result = selectAllComponents(state);
        expect(result[0].id).toBe('component-3');
        expect(result[1].id).toBe('component-1');
        expect(result[2].id).toBe('component-2');
      });

      it('should handle undefined components', () => {
        const state = {
          componentEntity: {
            ids: ['component-1', 'non-existent', 'component-2'],
            entities: {
              'component-1': { id: 'component-1', name: 'Button' },
              'component-2': { id: 'component-2', name: 'Card' },
            },
          },
        };

        const result = selectAllComponents(state);
        expect(result).toHaveLength(3);
        expect(result[1]).toBeUndefined();
      });
    });
  });

  describe('Composite Selectors', () => {
    describe('selectCompositeComponentById', () => {
      it('should return component with props', () => {
        const component = { id: 'component-1', name: 'Button', type: 'interactive' };
        const state = {
          componentEntity: {
            entities: {
              'component-1': component,
            },
          },
        };

        const result = selectCompositeComponentById(state, 'component-1');

        expect(result).toBeDefined();
        expect(result.id).toBe('component-1');
        expect(result.props).toBeDefined();
        expect(result.props).toHaveLength(2);
      });

      it('should return null when component does not exist', () => {
        const state = {
          componentEntity: {
            entities: {},
          },
        };

        const result = selectCompositeComponentById(state, 'non-existent');
        expect(result).toBeNull();
      });

      it('should preserve original component properties', () => {
        const component = {
          id: 'component-1',
          name: 'Button',
          type: 'interactive',
          metadata: { created: '2024-01-01' },
        };
        const state = {
          componentEntity: {
            entities: {
              'component-1': component,
            },
          },
        };

        const result = selectCompositeComponentById(state, 'component-1');

        expect(result.name).toBe('Button');
        expect(result.type).toBe('interactive');
        expect(result.metadata.created).toBe('2024-01-01');
      });

      it('should include props array in result', () => {
        const component = { id: 'component-1', name: 'Button' };
        const state = {
          componentEntity: {
            entities: {
              'component-1': component,
            },
          },
        };

        const result = selectCompositeComponentById(state, 'component-1');

        expect(result.props).toHaveLength(2);
        expect(result.props[0].name).toBe('width');
        expect(result.props[1].name).toBe('height');
      });

      it('should handle component with complex structure', () => {
        const component = {
          id: 'component-1',
          name: 'Complex Component',
          type: 'container',
          styles: {
            backgroundColor: '#fff',
            padding: '10px',
          },
          variants: ['default', 'hover', 'active'],
        };
        const state = {
          componentEntity: {
            entities: {
              'component-1': component,
            },
          },
        };

        const result = selectCompositeComponentById(state, 'component-1');

        expect(result.styles.backgroundColor).toBe('#fff');
        expect(result.variants).toHaveLength(3);
        expect(result.props).toBeDefined();
      });
    });
  });

  describe('Edge Cases', () => {
    describe('Complex component data', () => {
      it('should handle components with nested properties', () => {
        const component = {
          id: 'component-1',
          name: 'Advanced Button',
          type: 'interactive',
          properties: {
            variant: 'primary',
            size: 'medium',
          },
          events: {
            onClick: 'handleClick',
            onHover: 'handleHover',
          },
        };
        const state = {
          componentEntity: {
            entities: {
              'component-1': component,
            },
          },
        };

        const result = selectComponentById(state, 'component-1');
        expect(result.properties.variant).toBe('primary');
        expect(result.events.onClick).toBe('handleClick');
      });
    });

    describe('Component with variants', () => {
      it('should handle component variants', () => {
        const component = {
          id: 'component-1',
          name: 'Button',
          variants: [
            { name: 'default', props: {} },
            { name: 'hover', props: { backgroundColor: 'blue' } },
          ],
        };
        const state = {
          componentEntity: {
            entities: {
              'component-1': component,
            },
          },
        };

        const result = selectComponentById(state, 'component-1');
        expect(result.variants).toHaveLength(2);
      });
    });

    describe('Empty state handling', () => {
      it('should handle completely empty state', () => {
        const state = {
          componentEntity: {
            entities: {},
            ids: [],
            ui: {
              hoveredComponentId: null,
              focusedComponentId: null,
              selectedComponentId: null,
            },
          },
        };

        expect(selectAllComponents(state)).toEqual([]);
        expect(selectSelectedComponent(state)).toBeNull();
      });
    });
  });
});
