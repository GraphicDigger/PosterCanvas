// ===================================================================
// Unit Tests for UIInstance Entity Redux Selectors
// Coverage Target: 95%+
// Week 4 - Day 1 (Selector Testing)
// ===================================================================

import { describe, it, expect, vi } from 'vitest';
import {
  selectInstanceState,
  selectInstanceEntities,
  selectInstanceIds,
  selectInstanceUI,
  selectInstanceOwnership,
  selectHoveredInstanceId,
  selectFocusedInstanceId,
  selectSelectedInstanceId,
  selectInstanceCheckStates,
  selectSelectedInstance,
  selectAllInstances,
  selectInstanceById,
  selectInstancesByOwnership,
  selectInstancesByScreenId,
  selectInstanceIdsByScreenId,
  selectInstancesByComponentId,
  selectNestedInstancesByComponentId,
  selectInstancesByIds,
  selectCompositeInstanceById,
} from './selectors';
import { ENTITY_KINDS } from '../../../../shared/constants';

// Mock cross-entity selectors
vi.mock('../../@x/component', () => ({
  selectCompositeComponentById: vi.fn((state, componentId) => ({
    id: componentId,
    name: `Component ${componentId}`,
  })),
}));

vi.mock('../../../uiTree', () => ({
  makeSelectAllInstancesFromTree: vi.fn(),
}));

describe('UIInstance Entity Selectors', () => {
  describe('Base Selectors', () => {
    describe('selectInstanceState', () => {
      it('should return instance entity state', () => {
        const instanceState = {
          entities: {},
          ids: [],
          ui: {},
          ownership: {},
        };
        const state = {
          instanceEntity: instanceState,
        };

        expect(selectInstanceState(state)).toEqual(instanceState);
      });
    });

    describe('selectInstanceEntities', () => {
      it('should return instance entities object', () => {
        const entities = {
          'instance-1': { id: 'instance-1', componentId: 'comp-1' },
          'instance-2': { id: 'instance-2', componentId: 'comp-2' },
        };
        const state = {
          instanceEntity: {
            entities,
          },
        };

        expect(selectInstanceEntities(state)).toEqual(entities);
      });

      it('should return empty object when no entities', () => {
        const state = {
          instanceEntity: {
            entities: {},
          },
        };

        expect(selectInstanceEntities(state)).toEqual({});
      });
    });

    describe('selectInstanceIds', () => {
      it('should return instance ids array', () => {
        const ids = ['instance-1', 'instance-2', 'instance-3'];
        const state = {
          instanceEntity: {
            ids,
          },
        };

        expect(selectInstanceIds(state)).toEqual(ids);
      });

      it('should return empty array when no ids', () => {
        const state = {
          instanceEntity: {
            ids: [],
          },
        };

        expect(selectInstanceIds(state)).toEqual([]);
      });
    });

    describe('selectInstanceUI', () => {
      it('should return instance UI state', () => {
        const uiState = {
          hoveredInstanceId: 'instance-1',
          focusedInstanceId: 'instance-2',
          selectedInstanceId: 'instance-3',
        };
        const state = {
          instanceEntity: {
            ui: uiState,
          },
        };

        expect(selectInstanceUI(state)).toEqual(uiState);
      });

      it('should return UI state with null values', () => {
        const state = {
          instanceEntity: {
            ui: {
              hoveredInstanceId: null,
              focusedInstanceId: null,
              selectedInstanceId: null,
            },
          },
        };

        expect(selectInstanceUI(state).hoveredInstanceId).toBeNull();
        expect(selectInstanceUI(state).focusedInstanceId).toBeNull();
        expect(selectInstanceUI(state).selectedInstanceId).toBeNull();
      });
    });

    describe('selectInstanceOwnership', () => {
      it('should return instance ownership structure', () => {
        const ownership = {
          [ENTITY_KINDS.SCREEN]: {
            'screen-1': ['instance-1', 'instance-2'],
          },
          [ENTITY_KINDS.COMPONENT]: {
            'component-1': ['instance-3', 'instance-4'],
          },
        };
        const state = {
          instanceEntity: {
            ownership,
          },
        };

        expect(selectInstanceOwnership(state)).toEqual(ownership);
      });

      it('should return empty ownership object', () => {
        const state = {
          instanceEntity: {
            ownership: {},
          },
        };

        expect(selectInstanceOwnership(state)).toEqual({});
      });
    });
  });

  describe('UI State Selectors', () => {
    describe('selectHoveredInstanceId', () => {
      it('should return hovered instance ID', () => {
        const state = {
          instanceEntity: {
            ui: {
              hoveredInstanceId: 'instance-hovered',
            },
          },
        };

        expect(selectHoveredInstanceId(state)).toBe('instance-hovered');
      });

      it('should return null when no hovered instance', () => {
        const state = {
          instanceEntity: {
            ui: {
              hoveredInstanceId: null,
            },
          },
        };

        expect(selectHoveredInstanceId(state)).toBeNull();
      });
    });

    describe('selectFocusedInstanceId', () => {
      it('should return focused instance ID', () => {
        const state = {
          instanceEntity: {
            ui: {
              focusedInstanceId: 'instance-focused',
            },
          },
        };

        expect(selectFocusedInstanceId(state)).toBe('instance-focused');
      });

      it('should return null when no focused instance', () => {
        const state = {
          instanceEntity: {
            ui: {
              focusedInstanceId: null,
            },
          },
        };

        expect(selectFocusedInstanceId(state)).toBeNull();
      });
    });

    describe('selectSelectedInstanceId', () => {
      it('should return selected instance ID', () => {
        const state = {
          instanceEntity: {
            ui: {
              selectedInstanceId: 'instance-selected',
            },
          },
        };

        expect(selectSelectedInstanceId(state)).toBe('instance-selected');
      });

      it('should return null when no selected instance', () => {
        const state = {
          instanceEntity: {
            ui: {
              selectedInstanceId: null,
            },
          },
        };

        expect(selectSelectedInstanceId(state)).toBeNull();
      });
    });
  });

  describe('Check States Selector', () => {
    describe('selectInstanceCheckStates', () => {
      it('should return all check states as true for same instance', () => {
        const state = {
          instanceEntity: {
            ui: {
              hoveredInstanceId: 'instance-1',
              focusedInstanceId: 'instance-1',
              selectedInstanceId: 'instance-1',
            },
          },
        };

        const result = selectInstanceCheckStates(state, 'instance-1');
        expect(result).toEqual({
          isSelected: true,
          isFocused: true,
          isHovered: true,
        });
      });

      it('should return all check states as false for different instance', () => {
        const state = {
          instanceEntity: {
            ui: {
              hoveredInstanceId: 'instance-1',
              focusedInstanceId: 'instance-2',
              selectedInstanceId: 'instance-3',
            },
          },
        };

        const result = selectInstanceCheckStates(state, 'instance-4');
        expect(result).toEqual({
          isSelected: false,
          isFocused: false,
          isHovered: false,
        });
      });

      it('should return mixed check states', () => {
        const state = {
          instanceEntity: {
            ui: {
              hoveredInstanceId: 'instance-1',
              focusedInstanceId: 'instance-1',
              selectedInstanceId: 'instance-2',
            },
          },
        };

        const result = selectInstanceCheckStates(state, 'instance-1');
        expect(result).toEqual({
          isSelected: false,
          isFocused: true,
          isHovered: true,
        });
      });

      it('should handle null UI states', () => {
        const state = {
          instanceEntity: {
            ui: {
              hoveredInstanceId: null,
              focusedInstanceId: null,
              selectedInstanceId: null,
            },
          },
        };

        const result = selectInstanceCheckStates(state, 'instance-1');
        expect(result).toEqual({
          isSelected: false,
          isFocused: false,
          isHovered: false,
        });
      });
    });
  });

  describe('Instance Lookup Selectors', () => {
    describe('selectInstanceById', () => {
      it('should return instance by ID', () => {
        const instance = { id: 'instance-1', componentId: 'comp-1', name: 'Test' };
        const state = {
          instanceEntity: {
            entities: {
              'instance-1': instance,
            },
          },
        };

        expect(selectInstanceById(state, 'instance-1')).toEqual(instance);
      });

      it('should return undefined for non-existent ID', () => {
        const state = {
          instanceEntity: {
            entities: {},
          },
        };

        expect(selectInstanceById(state, 'non-existent')).toBeUndefined();
      });
    });

    describe('selectSelectedInstance', () => {
      it('should return selected instance', () => {
        const instance = { id: 'instance-selected', componentId: 'comp-1' };
        const state = {
          instanceEntity: {
            ui: {
              selectedInstanceId: 'instance-selected',
            },
            entities: {
              'instance-selected': instance,
            },
          },
        };

        expect(selectSelectedInstance(state)).toEqual(instance);
      });

      it('should return null when no instance selected', () => {
        const state = {
          instanceEntity: {
            ui: {
              selectedInstanceId: null,
            },
            entities: {},
          },
        };

        expect(selectSelectedInstance(state)).toBeNull();
      });

      it('should return null when selected instance does not exist', () => {
        const state = {
          instanceEntity: {
            ui: {
              selectedInstanceId: 'non-existent',
            },
            entities: {},
          },
        };

        expect(selectSelectedInstance(state)).toBeNull();
      });

      it('should return null when entities is null', () => {
        const state = {
          instanceEntity: {
            ui: {
              selectedInstanceId: 'instance-1',
            },
            entities: null,
          },
        };

        expect(selectSelectedInstance(state)).toBeNull();
      });
    });
  });

  describe('Collection Selectors', () => {
    describe('selectAllInstances', () => {
      it('should return all instances as array', () => {
        const instances = {
          'instance-1': { id: 'instance-1', componentId: 'comp-1' },
          'instance-2': { id: 'instance-2', componentId: 'comp-2' },
          'instance-3': { id: 'instance-3', componentId: 'comp-3' },
        };
        const state = {
          instanceEntity: {
            ids: ['instance-1', 'instance-2', 'instance-3'],
            entities: instances,
          },
        };

        const result = selectAllInstances(state);
        expect(result).toHaveLength(3);
        expect(result[0]).toEqual(instances['instance-1']);
        expect(result[1]).toEqual(instances['instance-2']);
        expect(result[2]).toEqual(instances['instance-3']);
      });

      it('should return empty array when no instances', () => {
        const state = {
          instanceEntity: {
            ids: [],
            entities: {},
          },
        };

        expect(selectAllInstances(state)).toEqual([]);
      });

      it('should maintain order based on ids array', () => {
        const state = {
          instanceEntity: {
            ids: ['instance-3', 'instance-1', 'instance-2'],
            entities: {
              'instance-1': { id: 'instance-1' },
              'instance-2': { id: 'instance-2' },
              'instance-3': { id: 'instance-3' },
            },
          },
        };

        const result = selectAllInstances(state);
        expect(result[0].id).toBe('instance-3');
        expect(result[1].id).toBe('instance-1');
        expect(result[2].id).toBe('instance-2');
      });
    });

    describe('selectInstancesByIds', () => {
      it('should return instances for given IDs', () => {
        const state = {
          instanceEntity: {
            entities: {
              'instance-1': { id: 'instance-1', name: 'First' },
              'instance-2': { id: 'instance-2', name: 'Second' },
              'instance-3': { id: 'instance-3', name: 'Third' },
            },
          },
        };

        const result = selectInstancesByIds(state, ['instance-1', 'instance-3']);
        expect(result).toHaveLength(2);
        expect(result[0].name).toBe('First');
        expect(result[1].name).toBe('Third');
      });

      it('should filter out non-existent instances', () => {
        const state = {
          instanceEntity: {
            entities: {
              'instance-1': { id: 'instance-1' },
            },
          },
        };

        const result = selectInstancesByIds(state, ['instance-1', 'non-existent']);
        expect(result).toHaveLength(1);
        expect(result[0].id).toBe('instance-1');
      });

      it('should return empty array when ids is null', () => {
        const state = {
          instanceEntity: {
            entities: {},
          },
        };

        const result = selectInstancesByIds(state, null);
        expect(result).toEqual([]);
      });

      it('should return empty array when entities is null', () => {
        const state = {
          instanceEntity: {
            entities: null,
          },
        };

        const result = selectInstancesByIds(state, ['instance-1']);
        expect(result).toEqual([]);
      });
    });
  });

  describe('Ownership Selectors', () => {
    describe('selectInstancesByOwnership', () => {
      it('should return instances by screen ownership', () => {
        const state = {
          instanceEntity: {
            entities: {
              'instance-1': { id: 'instance-1', componentId: 'comp-1' },
              'instance-2': { id: 'instance-2', componentId: 'comp-2' },
            },
            ownership: {
              [ENTITY_KINDS.SCREEN]: {
                'screen-1': ['instance-1', 'instance-2'],
              },
            },
          },
        };

        const result = selectInstancesByOwnership(state, ENTITY_KINDS.SCREEN, 'screen-1');
        expect(result).toHaveLength(2);
      });

      it('should return instances by component ownership', () => {
        const state = {
          instanceEntity: {
            entities: {
              'instance-1': { id: 'instance-1', componentId: 'comp-1' },
            },
            ownership: {
              [ENTITY_KINDS.COMPONENT]: {
                'component-1': ['instance-1'],
              },
            },
          },
        };

        const result = selectInstancesByOwnership(state, ENTITY_KINDS.COMPONENT, 'component-1');
        expect(result).toHaveLength(1);
      });

      it('should return empty array for non-existent owner', () => {
        const state = {
          instanceEntity: {
            entities: {},
            ownership: {},
          },
        };

        const result = selectInstancesByOwnership(state, ENTITY_KINDS.SCREEN, 'non-existent');
        expect(result).toEqual([]);
      });

      it('should filter out undefined instances', () => {
        const state = {
          instanceEntity: {
            entities: {
              'instance-1': { id: 'instance-1', componentId: 'comp-1' },
            },
            ownership: {
              [ENTITY_KINDS.SCREEN]: {
                'screen-1': ['instance-1', 'non-existent'],
              },
            },
          },
        };

        const result = selectInstancesByOwnership(state, ENTITY_KINDS.SCREEN, 'screen-1');
        expect(result).toHaveLength(1);
        expect(result[0].id).toBe('instance-1');
      });
    });

    describe('selectInstancesByScreenId', () => {
      it('should return instances for specific screen', () => {
        const state = {
          instanceEntity: {
            entities: {
              'instance-1': { id: 'instance-1', componentId: 'comp-1' },
              'instance-2': { id: 'instance-2', componentId: 'comp-2' },
            },
            ownership: {
              [ENTITY_KINDS.SCREEN]: {
                'screen-1': ['instance-1', 'instance-2'],
              },
            },
          },
        };

        const result = selectInstancesByScreenId(state, 'screen-1');
        expect(result).toHaveLength(2);
      });

      it('should return empty array for screen with no instances', () => {
        const state = {
          instanceEntity: {
            entities: {},
            ownership: {
              [ENTITY_KINDS.SCREEN]: {},
            },
          },
        };

        const result = selectInstancesByScreenId(state, 'screen-empty');
        expect(result).toEqual([]);
      });
    });

    describe('selectInstanceIdsByScreenId', () => {
      it('should return instance entities for screen', () => {
        const state = {
          instanceEntity: {
            entities: {
              'instance-1': { id: 'instance-1', componentId: 'comp-1' },
              'instance-2': { id: 'instance-2', componentId: 'comp-2' },
            },
            ownership: {
              [ENTITY_KINDS.SCREEN]: {
                'screen-1': ['instance-1', 'instance-2'],
              },
            },
          },
        };

        const result = selectInstanceIdsByScreenId(state, 'screen-1');
        expect(result).toHaveLength(2);
        expect(result[0]).toEqual({ id: 'instance-1', componentId: 'comp-1' });
      });

      it('should return empty array for non-existent screen', () => {
        const state = {
          instanceEntity: {
            entities: {},
            ownership: {},
          },
        };

        const result = selectInstanceIdsByScreenId(state, 'non-existent');
        expect(result).toEqual([]);
      });
    });

    describe('selectInstancesByComponentId', () => {
      it('should return instances for specific component', () => {
        const state = {
          instanceEntity: {
            entities: {
              'instance-1': { id: 'instance-1', componentId: 'comp-1' },
              'instance-2': { id: 'instance-2', componentId: 'comp-1' },
              'instance-3': { id: 'instance-3', componentId: 'comp-2' },
            },
          },
        };

        const result = selectInstancesByComponentId(state, 'comp-1');
        expect(result).toHaveLength(2);
        expect(result.every(inst => inst.componentId === 'comp-1')).toBe(true);
      });

      it('should return empty array for component with no instances', () => {
        const state = {
          instanceEntity: {
            entities: {
              'instance-1': { id: 'instance-1', componentId: 'comp-1' },
            },
          },
        };

        const result = selectInstancesByComponentId(state, 'comp-2');
        expect(result).toEqual([]);
      });
    });

    describe('selectNestedInstancesByComponentId', () => {
      it('should return nested instances owned by component', () => {
        const state = {
          instanceEntity: {
            entities: {
              'instance-1': {
                id: 'instance-1',
                componentId: 'comp-1',
                ownership: { type: ENTITY_KINDS.COMPONENT, id: 'parent-comp' },
              },
              'instance-2': {
                id: 'instance-2',
                componentId: 'comp-2',
                ownership: { type: ENTITY_KINDS.COMPONENT, id: 'parent-comp' },
              },
              'instance-3': {
                id: 'instance-3',
                componentId: 'comp-3',
                ownership: { type: ENTITY_KINDS.SCREEN, id: 'screen-1' },
              },
            },
          },
        };

        const result = selectNestedInstancesByComponentId(state, 'parent-comp');
        expect(result).toHaveLength(2);
        expect(result.every(inst => inst.ownership.id === 'parent-comp')).toBe(true);
      });

      it('should return empty array when no nested instances', () => {
        const state = {
          instanceEntity: {
            entities: {
              'instance-1': {
                id: 'instance-1',
                ownership: { type: ENTITY_KINDS.SCREEN, id: 'screen-1' },
              },
            },
          },
        };

        const result = selectNestedInstancesByComponentId(state, 'comp-1');
        expect(result).toEqual([]);
      });
    });
  });

  describe('Composite Selectors', () => {
    describe('selectCompositeInstanceById', () => {
      it('should return instance with component data', () => {
        const instance = { id: 'instance-1', componentId: 'comp-1', name: 'Test' };
        const state = {
          instanceEntity: {
            entities: {
              'instance-1': instance,
            },
          },
        };

        const result = selectCompositeInstanceById(state, 'instance-1');
        expect(result).toBeDefined();
        expect(result.id).toBe('instance-1');
        expect(result.component).toBeDefined();
        expect(result.component.id).toBe('comp-1');
      });

      it('should return null when instance does not exist', () => {
        const state = {
          instanceEntity: {
            entities: {},
          },
        };

        const result = selectCompositeInstanceById(state, 'non-existent');
        expect(result).toBeNull();
      });

      it('should include component data in composite', () => {
        const state = {
          instanceEntity: {
            entities: {
              'instance-1': { id: 'instance-1', componentId: 'comp-1' },
            },
          },
        };

        const result = selectCompositeInstanceById(state, 'instance-1');
        expect(result.component.name).toBe('Component comp-1');
      });
    });
  });
});

