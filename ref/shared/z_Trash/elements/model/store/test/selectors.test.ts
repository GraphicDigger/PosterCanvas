// ===================================================================
// Unit Tests for UiDefaultEntity Entity Redux Selectors
// Coverage Target: 95%+
// Beyond 2,300 Phase (Selector Testing - FINAL ENTITY!)
// ===================================================================

import { describe, it, expect, vi } from 'vitest';
import type { RootState } from '@/app/store';
import {
  selectUiDefaultEntityState,
  selectUiDefaultEntityEntities,
  selectUiDefaultEntityIds,
  selectHoveredUiDefaultEntityId,
  selectFocusedUiDefaultEntityId,
  selectSelectedUiDefaultEntityId,
  selectUiDefaultEntityCheckStates,
  selectAllUiDefaultEntity,
  selectSelectedUiDefaultEntity,
  selectUiDefaultEntityByIds,
  selectUiDefaultEntityById,
  selectWidgetsWithChildrens,
  selectElementsWithChildrens,
  selectFlattenWidgetWithChildren,
  selectFlattenElementWithChildren,
} from '../selectors';

// Mock constants
vi.mock('../constants/uiEntityType', () => ({
  UI_ENTITY_TYPE: {
    WIDGET: 'WIDGET',
    ELEMENT: 'ELEMENT',
    COMPONENT: 'COMPONENT',
  },
}));

vi.mock('@/shared/constants', () => ({
  ENTITY_KINDS: {
    SCREEN: 'SCREEN',
    ELEMENT: 'ELEMENT',
    WIDGET: 'WIDGET',
  },
}));

// Mock cross-entity selectors
vi.mock('@/entities/uiTree/model/store/selector', () => ({
  makeSelectCompositeEntitiesByOwnership: vi.fn(() => () => []),
}));

vi.mock('./selectorsUITree', () => ({
  makeSelectCompositeUiDefaultEntitiesByOwnership: vi.fn(() => () => [
    { id: 'child-1', name: 'Child 1', type: 'ELEMENT' },
    { id: 'child-2', name: 'Child 2', type: 'ELEMENT' },
  ]),
}));

// Mock lib functions
vi.mock('../../lib', () => ({
  flattenElementWithChildren: vi.fn((element) => [
    element,
    ...(element.childrens || []),
  ]),
}));

describe('UiDefaultEntity Entity Selectors', () => {
  describe('Base Selectors', () => {
    describe('selectUiDefaultEntityState', () => {
      it('should return ui default entity state', () => {
        const uiDefaultEntityState = {
          entities: {},
          ids: [],
          hoveredId: null,
          focusedId: null,
          selectedId: null,
        };
        const state = {
          uiDefaultEntity: uiDefaultEntityState,
        } as any;

        expect(selectUiDefaultEntityState(state)).toEqual(uiDefaultEntityState);
      });
    });

    describe('selectUiDefaultEntityEntities', () => {
      it('should return ui default entity entities object', () => {
        const entities = {
          'entity-1': { id: 'entity-1', name: 'Entity 1', type: 'WIDGET' },
          'entity-2': { id: 'entity-2', name: 'Entity 2', type: 'ELEMENT' },
        };
        const state = {
          uiDefaultEntity: {
            entities,
          },
        } as any;

        expect(selectUiDefaultEntityEntities(state)).toEqual(entities);
      });
    });

    describe('selectUiDefaultEntityIds', () => {
      it('should return ui default entity ids array', () => {
        const ids = ['entity-1', 'entity-2', 'entity-3'];
        const state = {
          uiDefaultEntity: {
            ids,
          },
        } as any;

        expect(selectUiDefaultEntityIds(state)).toEqual(ids);
      });
    });
  });

  describe('UI State Selectors', () => {
    describe('selectHoveredUiDefaultEntityId', () => {
      it('should return hovered ui default entity ID', () => {
        const state = {
          uiDefaultEntity: {
            hoveredId: 'entity-hovered',
          },
        } as any;

        expect(selectHoveredUiDefaultEntityId(state)).toBe('entity-hovered');
      });
    });

    describe('selectFocusedUiDefaultEntityId', () => {
      it('should return focused ui default entity ID', () => {
        const state = {
          uiDefaultEntity: {
            focusedId: 'entity-focused',
          },
        } as any;

        expect(selectFocusedUiDefaultEntityId(state)).toBe('entity-focused');
      });
    });

    describe('selectSelectedUiDefaultEntityId', () => {
      it('should return selected ui default entity ID', () => {
        const state = {
          uiDefaultEntity: {
            selectedId: 'entity-selected',
          },
        } as any;

        expect(selectSelectedUiDefaultEntityId(state)).toBe('entity-selected');
      });
    });
  });

  describe('Check State Selectors', () => {
    describe('selectUiDefaultEntityCheckStates', () => {
      it('should return all false when no states match', () => {
        const state = {
          uiDefaultEntity: {
            selectedId: null,
            focusedId: null,
            hoveredId: null,
          },
        } as any;

        const result = selectUiDefaultEntityCheckStates(state, 'entity-1');
        expect(result).toEqual({
          isSelected: false,
          isFocused: false,
          isHovered: false,
        });
      });

      it('should return isSelected true when entity is selected', () => {
        const state = {
          uiDefaultEntity: {
            selectedId: 'entity-1',
            focusedId: null,
            hoveredId: null,
          },
        } as any;

        const result = selectUiDefaultEntityCheckStates(state, 'entity-1');
        expect(result.isSelected).toBe(true);
      });

      it('should return all true when entity has all states', () => {
        const state = {
          uiDefaultEntity: {
            selectedId: 'entity-1',
            focusedId: 'entity-1',
            hoveredId: 'entity-1',
          },
        } as any;

        const result = selectUiDefaultEntityCheckStates(state, 'entity-1');
        expect(result).toEqual({
          isSelected: true,
          isFocused: true,
          isHovered: true,
        });
      });
    });
  });

  describe('Collection Selectors', () => {
    describe('selectAllUiDefaultEntity', () => {
      it('should return all ui default entities as array', () => {
        const entities = {
          'entity-1': { id: 'entity-1', name: 'Entity 1' },
          'entity-2': { id: 'entity-2', name: 'Entity 2' },
        };
        const state = {
          uiDefaultEntity: {
            ids: ['entity-1', 'entity-2'],
            entities,
          },
        } as any;

        const result = selectAllUiDefaultEntity(state);
        expect(result).toHaveLength(2);
      });

      it('should return empty array when no entities', () => {
        const state = {
          uiDefaultEntity: {
            ids: [],
            entities: {},
          },
        } as any;

        expect(selectAllUiDefaultEntity(state)).toEqual([]);
      });

      it('should handle null ids', () => {
        const state = {
          uiDefaultEntity: {
            ids: null,
            entities: {},
          },
        } as any;

        expect(selectAllUiDefaultEntity(state)).toEqual([]);
      });
    });

    describe('selectSelectedUiDefaultEntity', () => {
      it('should return selected ui default entity', () => {
        const entity = { id: 'entity-selected', name: 'Selected' };
        const state = {
          uiDefaultEntity: {
            selectedId: 'entity-selected',
            entities: {
              'entity-selected': entity,
            },
          },
        } as any;

        expect(selectSelectedUiDefaultEntity(state)).toEqual(entity);
      });

      it('should return null when no entity selected', () => {
        const state = {
          uiDefaultEntity: {
            selectedId: null,
            entities: {},
          },
        } as any;

        expect(selectSelectedUiDefaultEntity(state)).toBeNull();
      });

      it('should return null when selected entity does not exist', () => {
        const state = {
          uiDefaultEntity: {
            selectedId: 'entity-missing',
            entities: {},
          },
        } as any;

        expect(selectSelectedUiDefaultEntity(state)).toBeNull();
      });
    });

    describe('selectUiDefaultEntityByIds', () => {
      it('should return entities for given IDs', () => {
        const state = {
          uiDefaultEntity: {
            entities: {
              'entity-1': { id: 'entity-1', name: 'First' },
              'entity-2': { id: 'entity-2', name: 'Second' },
              'entity-3': { id: 'entity-3', name: 'Third' },
            },
          },
        } as any;

        const result = selectUiDefaultEntityByIds(state, ['entity-1', 'entity-3']);
        expect(result).toHaveLength(2);
        expect(result[0].name).toBe('First');
        expect(result[1].name).toBe('Third');
      });

      it('should filter out non-existent entities', () => {
        const state = {
          uiDefaultEntity: {
            entities: {
              'entity-1': { id: 'entity-1', name: 'First' },
            },
          },
        } as any;

        const result = selectUiDefaultEntityByIds(state, ['entity-1', 'entity-missing']);
        expect(result).toHaveLength(1);
      });

      it('should return empty array when ids is null', () => {
        const state = {
          uiDefaultEntity: {
            entities: {},
          },
        } as any;

        const result = selectUiDefaultEntityByIds(state, null);
        expect(result).toEqual([]);
      });
    });

    describe('selectUiDefaultEntityById', () => {
      it('should return entity by ID', () => {
        const entity = { id: 'entity-1', name: 'Test Entity' };
        const state = {
          uiDefaultEntity: {
            entities: {
              'entity-1': entity,
            },
          },
        } as any;

        expect(selectUiDefaultEntityById(state, 'entity-1')).toEqual(entity);
      });

      it('should return null for non-existent ID', () => {
        const state = {
          uiDefaultEntity: {
            entities: {},
          },
        } as any;

        expect(selectUiDefaultEntityById(state, 'non-existent')).toBeNull();
      });
    });
  });

  describe('Widget & Element Selectors', () => {
    describe('selectWidgetsWithChildrens', () => {
      it('should return widgets with their children', () => {
        const entities = {
          'widget-1': { id: 'widget-1', name: 'Widget 1', type: 'WIDGET' },
          'widget-2': { id: 'widget-2', name: 'Widget 2', type: 'WIDGET' },
          'element-1': { id: 'element-1', name: 'Element 1', type: 'ELEMENT' },
        };
        const state = {
          uiDefaultEntity: {
            entities,
          },
        } as any;

        const result = selectWidgetsWithChildrens(state);
        expect(result).toHaveLength(2);
        expect(result[0].childrens).toBeDefined();
        expect(result[1].childrens).toBeDefined();
      });

      it('should return empty array when no widgets', () => {
        const entities = {
          'element-1': { id: 'element-1', name: 'Element 1', type: 'ELEMENT' },
        };
        const state = {
          uiDefaultEntity: {
            entities,
          },
        } as any;

        const result = selectWidgetsWithChildrens(state);
        expect(result).toEqual([]);
      });

      it('should return empty array when entities is null', () => {
        const state = {
          uiDefaultEntity: {
            entities: null,
          },
        } as any;

        const result = selectWidgetsWithChildrens(state);
        expect(result).toEqual([]);
      });
    });

    describe('selectElementsWithChildrens', () => {
      it('should return elements with their children', () => {
        const entities = {
          'element-1': { id: 'element-1', name: 'Element 1', type: 'ELEMENT' },
          'element-2': { id: 'element-2', name: 'Element 2', type: 'ELEMENT' },
          'widget-1': { id: 'widget-1', name: 'Widget 1', type: 'WIDGET' },
        };
        const state = {
          uiDefaultEntity: {
            entities,
          },
        } as any;

        const result = selectElementsWithChildrens(state);
        expect(result).toHaveLength(2);
        expect(result[0].childrens).toBeDefined();
      });

      it('should return empty array when no elements', () => {
        const entities = {
          'widget-1': { id: 'widget-1', name: 'Widget 1', type: 'WIDGET' },
        };
        const state = {
          uiDefaultEntity: {
            entities,
          },
        } as any;

        const result = selectElementsWithChildrens(state);
        expect(result).toEqual([]);
      });

      it('should return empty array when entities is null', () => {
        const state = {
          uiDefaultEntity: {
            entities: null,
          },
        } as any;

        const result = selectElementsWithChildrens(state);
        expect(result).toEqual([]);
      });
    });

    describe('selectFlattenWidgetWithChildren', () => {
      it('should return flattened widget with children', () => {
        const entities = {
          'widget-1': {
            id: 'widget-1',
            name: 'Widget 1',
            type: 'WIDGET',
            childrens: [
              { id: 'child-1', name: 'Child 1' },
              { id: 'child-2', name: 'Child 2' },
            ],
          },
        };
        const state = {
          uiDefaultEntity: {
            entities,
          },
        } as any;

        const result = selectFlattenWidgetWithChildren(state, 'widget-1');
        expect(Array.isArray(result)).toBe(true);
      });

      it('should return empty array when widget not found', () => {
        const state = {
          uiDefaultEntity: {
            entities: {},
          },
        } as any;

        const result = selectFlattenWidgetWithChildren(state, 'non-existent');
        expect(result).toEqual([]);
      });
    });

    describe('selectFlattenElementWithChildren', () => {
      it('should return flattened element with children', () => {
        const entities = {
          'element-1': {
            id: 'element-1',
            name: 'Element 1',
            type: 'ELEMENT',
            childrens: [
              { id: 'child-1', name: 'Child 1' },
            ],
          },
        };
        const state = {
          uiDefaultEntity: {
            entities,
          },
        } as any;

        const result = selectFlattenElementWithChildren(state, 'element-1');
        expect(Array.isArray(result)).toBe(true);
      });

      it('should return empty array when element not found', () => {
        const state = {
          uiDefaultEntity: {
            entities: {},
          },
        } as any;

        const result = selectFlattenElementWithChildren(state, 'non-existent');
        expect(result).toEqual([]);
      });
    });
  });

  describe('Edge Cases', () => {
    describe('Mixed entity types', () => {
      it('should handle multiple entity types', () => {
        const entities = {
          'widget-1': { id: 'widget-1', name: 'Widget', type: 'WIDGET' },
          'element-1': { id: 'element-1', name: 'Element', type: 'ELEMENT' },
          'component-1': { id: 'component-1', name: 'Component', type: 'COMPONENT' },
        };
        const state = {
          uiDefaultEntity: {
            ids: ['widget-1', 'element-1', 'component-1'],
            entities,
          },
        } as any;

        const result = selectAllUiDefaultEntity(state);
        expect(result).toHaveLength(3);
        expect(result.map((e: any) => e.type)).toEqual(['WIDGET', 'ELEMENT', 'COMPONENT']);
      });
    });

    describe('Hierarchical structures', () => {
      it('should handle widgets with nested children', () => {
        const entities = {
          'widget-1': {
            id: 'widget-1',
            name: 'Parent Widget',
            type: 'WIDGET',
            childrens: [
              {
                id: 'child-1',
                name: 'Child Element',
                childrens: [
                  { id: 'grandchild-1', name: 'Grandchild' },
                ],
              },
            ],
          },
        };
        const state = {
          uiDefaultEntity: {
            entities,
          },
        } as any;

        const result = selectWidgetsWithChildrens(state);
        expect(result[0].childrens).toBeDefined();
      });
    });

    describe('Empty state handling', () => {
      it('should handle completely empty state', () => {
        const state = {
          uiDefaultEntity: {
            entities: {},
            ids: [],
            selectedId: null,
            focusedId: null,
            hoveredId: null,
          },
        } as any;

        expect(selectAllUiDefaultEntity(state)).toEqual([]);
        expect(selectSelectedUiDefaultEntity(state)).toBeNull();
        expect(selectWidgetsWithChildrens(state)).toEqual([]);
        expect(selectElementsWithChildrens(state)).toEqual([]);
      });
    });
  });
});

