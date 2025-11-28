// ===================================================================
// Unit Tests for Action Redux Slice
// Coverage Target: 100%
// Phase 1 - Redux Slices (HIGH IMPACT - 256 lines)
// Risk: LOW (Redux Toolkit, action state management)
// ===================================================================

import { describe, it, expect, beforeEach, vi } from 'vitest';
import actionReducer, {
  setHoveredActionId,
  setFocusedActionId,
  setSelectedActionId,
  setActions,
  createAction,
  createCustomAction,
  deleteAction,
  setActionType,
  updateAction,
} from '../slice';
import { ENTITY_KINDS } from '@/shared/constants';

// Mock ACTION_TYPES and ACTION_CONFIG
vi.mock('../../constants/actionTypes', () => ({
  ACTION_TYPES: {
    LINK_TO: 'linkTo',
    GO_BACK: 'goBack',
    DB_CREATE: 'dbCreate',
    CUSTOM_ACTION: 'customAction',
  },
}));

vi.mock('../../constants/actionConfig', () => ({
  ACTION_CONFIG: {
    linkTo: { label: 'Link To', config: { screenId: null } },
    goBack: { label: 'Go Back', config: {} },
    dbCreate: { label: 'Create Record', config: { modelId: null } },
  },
}));

describe('Action Redux Slice', () => {
  let initialState;

  beforeEach(() => {
    initialState = {
      entities: {},
      ids: [],
      ui: {
        hoveredActionId: null,
        focusedActionId: null,
        selectedActionId: null,
      },
      relations: {
        byComponent: {},
        byScreen: {},
        byElement: {},
      },
    };

    // Mock console.log
    vi.spyOn(console, 'log').mockImplementation(() => {});
    // Mock Date.now for predictable IDs
    vi.spyOn(Date, 'now').mockReturnValue(1234567890);
  });

  describe('Initial State', () => {
    it('should return initial state when undefined state is passed', () => {
      const result = actionReducer(undefined, { type: '@@INIT' });

      expect(result).toEqual(initialState);
    });

    it('should have empty entities and ids', () => {
      const result = actionReducer(undefined, { type: '@@INIT' });

      expect(result.entities).toEqual({});
      expect(result.ids).toEqual([]);
    });

    it('should have null UI state values', () => {
      const result = actionReducer(undefined, { type: '@@INIT' });

      expect(result.ui.hoveredActionId).toBeNull();
      expect(result.ui.focusedActionId).toBeNull();
      expect(result.ui.selectedActionId).toBeNull();
    });

    it('should have empty relations', () => {
      const result = actionReducer(undefined, { type: '@@INIT' });

      expect(result.relations.byComponent).toEqual({});
      expect(result.relations.byScreen).toEqual({});
      expect(result.relations.byElement).toEqual({});
    });
  });

  describe('UI Actions - setHoveredActionId', () => {
    it('should set hovered action ID', () => {
      const result = actionReducer(initialState, setHoveredActionId('action-1'));

      expect(result.ui.hoveredActionId).toBe('action-1');
    });

    it('should update hovered action ID', () => {
      const state = {
        ...initialState,
        ui: { ...initialState.ui, hoveredActionId: 'action-1' },
      };

      const result = actionReducer(state, setHoveredActionId('action-2'));

      expect(result.ui.hoveredActionId).toBe('action-2');
    });

    it('should allow setting to null', () => {
      const state = {
        ...initialState,
        ui: { ...initialState.ui, hoveredActionId: 'action-1' },
      };

      const result = actionReducer(state, setHoveredActionId(null));

      expect(result.ui.hoveredActionId).toBeNull();
    });
  });

  describe('UI Actions - setFocusedActionId', () => {
    it('should set focused action ID', () => {
      const result = actionReducer(initialState, setFocusedActionId('action-1'));

      expect(result.ui.focusedActionId).toBe('action-1');
    });

    it('should update focused action ID', () => {
      const state = {
        ...initialState,
        ui: { ...initialState.ui, focusedActionId: 'action-1' },
      };

      const result = actionReducer(state, setFocusedActionId('action-2'));

      expect(result.ui.focusedActionId).toBe('action-2');
    });
  });

  describe('UI Actions - setSelectedActionId', () => {
    it('should set selected action ID', () => {
      const result = actionReducer(initialState, setSelectedActionId('action-1'));

      expect(result.ui.selectedActionId).toBe('action-1');
    });

    it('should log selected action ID to console', () => {
      actionReducer(initialState, setSelectedActionId('action-1'));

      expect(console.log).toHaveBeenCalledWith('selectedActionId', 'action-1');
    });

    it('should update selected action ID', () => {
      const state = {
        ...initialState,
        ui: { ...initialState.ui, selectedActionId: 'action-1' },
      };

      const result = actionReducer(state, setSelectedActionId('action-2'));

      expect(result.ui.selectedActionId).toBe('action-2');
    });
  });

  describe('Data Actions - setActions', () => {
    it('should set single action', () => {
      const actions = [
        { id: 'action-1', name: 'Navigate', entityId: 'comp-1', componentId: 'comp-1' },
      ];

      const result = actionReducer(initialState, setActions(actions));

      expect(result.ids).toEqual(['action-1']);
      expect(result.entities['action-1']).toEqual(actions[0]);
      expect(result.relations.byComponent['comp-1']).toEqual(['action-1']);
    });

    it('should set multiple actions', () => {
      const actions = [
        { id: 'action-1', name: 'Navigate', componentId: 'comp-1' },
        { id: 'action-2', name: 'Submit', componentId: 'comp-1' },
        { id: 'action-3', name: 'Cancel', componentId: 'comp-2' },
      ];

      const result = actionReducer(initialState, setActions(actions));

      expect(result.ids).toEqual(['action-1', 'action-2', 'action-3']);
      expect(Object.keys(result.entities)).toHaveLength(3);
      expect(result.relations.byComponent['comp-1']).toEqual(['action-1', 'action-2']);
      expect(result.relations.byComponent['comp-2']).toEqual(['action-3']);
    });

    it('should replace existing actions', () => {
      const state = {
        ...initialState,
        ids: ['old-1'],
        entities: { 'old-1': { id: 'old-1', name: 'Old' } },
        relations: { byComponent: { 'comp-old': ['old-1'] }, byScreen: {}, byElement: {} },
      };

      const actions = [
        { id: 'action-1', name: 'New', componentId: 'comp-1' },
      ];

      const result = actionReducer(state, setActions(actions));

      expect(result.ids).toEqual(['action-1']);
      expect(result.entities['old-1']).toBeUndefined();
      expect(result.relations.byComponent['comp-old']).toBeUndefined();
    });

    it('should clear all relations when setting new actions', () => {
      const state = {
        ...initialState,
        relations: {
          byComponent: { 'comp-1': ['action-1'] },
          byScreen: { 'screen-1': ['action-2'] },
          byElement: { 'el-1': ['action-3'] },
        },
      };

      const result = actionReducer(state, setActions([]));

      expect(result.relations.byComponent).toEqual({});
      expect(result.relations.byScreen).toEqual({});
      expect(result.relations.byElement).toEqual({});
    });

    it('should handle actions without componentId', () => {
      const actions = [
        { id: 'action-1', name: 'Navigate' },
      ];

      const result = actionReducer(initialState, setActions(actions));

      expect(result.ids).toEqual(['action-1']);
      expect(result.entities['action-1']).toEqual(actions[0]);
      expect(result.relations.byComponent).toEqual({});
    });
  });

  describe('Data Actions - createAction', () => {
    it('should create action for component', () => {
      const payload = {
        entityId: 'comp-1',
        entityKind: ENTITY_KINDS.COMPONENT,
        trigger: 'onClick',
      };

      const result = actionReducer(initialState, createAction(payload));

      expect(result.ids).toHaveLength(1);
      const actionId = result.ids[0];
      expect(result.entities[actionId]).toEqual({
        id: actionId,
        kind: ENTITY_KINDS.ACTION,
        name: 'New Action',
        type: null,
        trigger: 'onClick',
        entityId: 'comp-1',
        entityKind: ENTITY_KINDS.COMPONENT,
        config: {},
      });
      expect(result.relations.byComponent['comp-1']).toEqual([actionId]);
      expect(result.ui.selectedActionId).toBe(actionId);
    });

    it('should create action for screen', () => {
      const payload = {
        entityId: 'screen-1',
        entityKind: ENTITY_KINDS.SCREEN,
        trigger: 'onLoad',
      };

      const result = actionReducer(initialState, createAction(payload));

      const actionId = result.ids[0];
      expect(result.entities[actionId].entityKind).toBe(ENTITY_KINDS.SCREEN);
      expect(result.relations.byScreen['screen-1']).toEqual([actionId]);
    });

    it('should create action for element', () => {
      const payload = {
        entityId: 'el-1',
        entityKind: ENTITY_KINDS.ELEMENT,
        trigger: 'onHover',
      };

      const result = actionReducer(initialState, createAction(payload));

      const actionId = result.ids[0];
      expect(result.entities[actionId].entityKind).toBe(ENTITY_KINDS.ELEMENT);
      expect(result.relations.byElement['el-1']).toEqual([actionId]);
    });

    it('should log created action to console', () => {
      const payload = {
        entityId: 'comp-1',
        entityKind: ENTITY_KINDS.COMPONENT,
        trigger: 'onClick',
      };

      actionReducer(initialState, createAction(payload));

      expect(console.log).toHaveBeenCalledWith('Action: CreateAction —>', expect.any(Object));
    });

    it('should add action to existing component relations', () => {
      const state = {
        ...initialState,
        ids: ['action-1'],
        entities: { 'action-1': { id: 'action-1', entityId: 'comp-1', entityKind: ENTITY_KINDS.COMPONENT } },
        relations: { byComponent: { 'comp-1': ['action-1'] }, byScreen: {}, byElement: {} },
      };

      const payload = {
        entityId: 'comp-1',
        entityKind: ENTITY_KINDS.COMPONENT,
        trigger: 'onHover',
      };

      const result = actionReducer(state, createAction(payload));

      expect(result.relations.byComponent['comp-1']).toHaveLength(2);
      expect(result.relations.byComponent['comp-1'][0]).toBe('action-1');
    });
  });

  describe('Data Actions - createCustomAction', () => {
    it('should create custom action', () => {
      const customAction = {
        id: 'custom-1',
        name: 'My Custom Action',
        trigger: 'onClick',
        entityId: 'comp-1',
        entityKind: ENTITY_KINDS.COMPONENT,
      };

      const result = actionReducer(initialState, createCustomAction(customAction));

      expect(result.ids).toEqual(['custom-1']);
      expect(result.entities['custom-1']).toMatchObject({
        id: 'custom-1',
        name: 'My Custom Action',
        kind: ENTITY_KINDS.ACTION,
        type: 'customAction',
        trigger: 'onClick',
      });
      expect(result.entities['custom-1'].createdAt).toBe(1234567890);
      expect(result.entities['custom-1'].updatedAt).toBe(1234567890);
      expect(result.ui.selectedActionId).toBe('custom-1');
    });

    it('should set custom action type', () => {
      const customAction = {
        id: 'custom-1',
        name: 'Custom',
      };

      const result = actionReducer(initialState, createCustomAction(customAction));

      expect(result.entities['custom-1'].type).toBe('customAction');
    });

    it('should preserve all custom action properties', () => {
      const customAction = {
        id: 'custom-1',
        name: 'Custom',
        config: { foo: 'bar' },
        metadata: { source: 'import' },
      };

      const result = actionReducer(initialState, createCustomAction(customAction));

      expect(result.entities['custom-1'].config).toEqual({ foo: 'bar' });
      expect(result.entities['custom-1'].metadata).toEqual({ source: 'import' });
    });
  });

  describe('Data Actions - deleteAction', () => {
    it('should delete action from component', () => {
      const state = {
        ...initialState,
        ids: ['action-1', 'action-2'],
        entities: {
          'action-1': { id: 'action-1', entityId: 'comp-1', entityKind: ENTITY_KINDS.COMPONENT },
          'action-2': { id: 'action-2', entityId: 'comp-1', entityKind: ENTITY_KINDS.COMPONENT },
        },
        relations: {
          byComponent: { 'comp-1': ['action-1', 'action-2'] },
          byScreen: {},
          byElement: {},
        },
      };

      const result = actionReducer(state, deleteAction('action-1'));

      expect(result.ids).toEqual(['action-2']);
      expect(result.entities['action-1']).toBeUndefined();
      expect(result.relations.byComponent['comp-1']).toEqual(['action-2']);
    });

    it('should delete action from screen', () => {
      const state = {
        ...initialState,
        ids: ['action-1'],
        entities: {
          'action-1': { id: 'action-1', entityId: 'screen-1', entityKind: ENTITY_KINDS.SCREEN },
        },
        relations: {
          byComponent: {},
          byScreen: { 'screen-1': ['action-1'] },
          byElement: {},
        },
      };

      const result = actionReducer(state, deleteAction('action-1'));

      expect(result.ids).toEqual([]);
      expect(result.entities['action-1']).toBeUndefined();
      expect(result.relations.byScreen['screen-1']).toEqual([]);
    });

    it('should delete action from element', () => {
      const state = {
        ...initialState,
        ids: ['action-1'],
        entities: {
          'action-1': { id: 'action-1', entityId: 'el-1', entityKind: ENTITY_KINDS.ELEMENT },
        },
        relations: {
          byComponent: {},
          byScreen: {},
          byElement: { 'el-1': ['action-1'] },
        },
      };

      const result = actionReducer(state, deleteAction('action-1'));

      expect(result.ids).toEqual([]);
      expect(result.entities['action-1']).toBeUndefined();
      expect(result.relations.byElement['el-1']).toEqual([]);
    });

    it('should handle deleting non-existent action gracefully', () => {
      const state = {
        ...initialState,
        ids: ['action-1'],
        entities: { 'action-1': { id: 'action-1' } },
      };

      const result = actionReducer(state, deleteAction('action-2'));

      expect(result.ids).toEqual(['action-1']);
      expect(result.entities['action-1']).toBeDefined();
    });

    it('should delete last action from component', () => {
      const state = {
        ...initialState,
        ids: ['action-1'],
        entities: {
          'action-1': { id: 'action-1', entityId: 'comp-1', entityKind: ENTITY_KINDS.COMPONENT },
        },
        relations: {
          byComponent: { 'comp-1': ['action-1'] },
          byScreen: {},
          byElement: {},
        },
      };

      const result = actionReducer(state, deleteAction('action-1'));

      expect(result.ids).toEqual([]);
      expect(result.relations.byComponent['comp-1']).toEqual([]);
    });
  });

  describe('Data Actions - setActionType', () => {
    it('should set action type', () => {
      const state = {
        ...initialState,
        ids: ['action-1'],
        entities: {
          'action-1': { id: 'action-1', name: 'Old', type: null, config: {} },
        },
      };

      const result = actionReducer(state, setActionType({
        actionId: 'action-1',
        type: 'linkTo',
        config: { screenId: 'screen-1' },
      }));

      expect(result.entities['action-1'].type).toBe('linkTo');
      expect(result.entities['action-1'].name).toBe('New Link To');
      expect(result.entities['action-1'].config).toEqual({ screenId: 'screen-1' });
      expect(result.entities['action-1'].updatedAt).toBe(1234567890);
    });

    it('should set custom action type', () => {
      const state = {
        ...initialState,
        ids: ['action-1'],
        entities: {
          'action-1': { id: 'action-1', name: 'Old', type: null },
        },
      };

      const result = actionReducer(state, setActionType({
        actionId: 'action-1',
        type: 'customAction',
      }));

      expect(result.entities['action-1'].type).toBe('customAction');
      expect(result.entities['action-1'].name).toBe('Custom Action');
    });

    it('should use default config if not provided', () => {
      const state = {
        ...initialState,
        ids: ['action-1'],
        entities: {
          'action-1': { id: 'action-1', name: 'Old', type: null },
        },
      };

      const result = actionReducer(state, setActionType({
        actionId: 'action-1',
        type: 'goBack',
      }));

      expect(result.entities['action-1'].config).toEqual({});
    });

    it('should handle non-existent action gracefully', () => {
      const result = actionReducer(initialState, setActionType({
        actionId: 'action-1',
        type: 'linkTo',
      }));

      expect(result.entities['action-1']).toBeUndefined();
    });

    it('should preserve other action properties', () => {
      const state = {
        ...initialState,
        ids: ['action-1'],
        entities: {
          'action-1': {
            id: 'action-1',
            name: 'Old',
            type: null,
            trigger: 'onClick',
            entityId: 'comp-1',
            metadata: { foo: 'bar' },
          },
        },
      };

      const result = actionReducer(state, setActionType({
        actionId: 'action-1',
        type: 'linkTo',
      }));

      expect(result.entities['action-1'].trigger).toBe('onClick');
      expect(result.entities['action-1'].entityId).toBe('comp-1');
      expect(result.entities['action-1'].metadata).toEqual({ foo: 'bar' });
    });
  });

  describe('Data Actions - updateAction', () => {
    it('should update action name', () => {
      const state = {
        ...initialState,
        ids: ['action-1'],
        entities: {
          'action-1': { id: 'action-1', name: 'Old Name', type: 'linkTo' },
        },
      };

      const result = actionReducer(state, updateAction({
        actionId: 'action-1',
        updates: { name: 'New Name' },
      }));

      expect(result.entities['action-1'].name).toBe('New Name');
      expect(result.entities['action-1'].updatedAt).toBe(1234567890);
    });

    it('should update action config', () => {
      const state = {
        ...initialState,
        ids: ['action-1'],
        entities: {
          'action-1': { id: 'action-1', type: 'linkTo', config: { screenId: null } },
        },
      };

      const result = actionReducer(state, updateAction({
        actionId: 'action-1',
        updates: { config: { screenId: 'screen-1' } },
      }));

      expect(result.entities['action-1'].config).toEqual({ screenId: 'screen-1' });
    });

    it('should update action type and merge config', () => {
      const state = {
        ...initialState,
        ids: ['action-1'],
        entities: {
          'action-1': { id: 'action-1', type: 'linkTo', config: { screenId: 'screen-1' } },
        },
      };

      const result = actionReducer(state, updateAction({
        actionId: 'action-1',
        updates: { type: 'dbCreate', config: { modelId: 'model-1' } },
      }));

      expect(result.entities['action-1'].type).toBe('dbCreate');
      expect(result.entities['action-1'].config).toEqual({
        modelId: 'model-1',
      });
    });

    it('should update entityId and update relations', () => {
      const state = {
        ...initialState,
        ids: ['action-1'],
        entities: {
          'action-1': {
            id: 'action-1',
            entityId: 'comp-1',
            entityKind: ENTITY_KINDS.COMPONENT,
          },
        },
        relations: {
          byComponent: { 'comp-1': ['action-1'] },
          byScreen: {},
          byElement: {},
        },
      };

      const result = actionReducer(state, updateAction({
        actionId: 'action-1',
        updates: { entityId: 'comp-2' },
      }));

      expect(result.entities['action-1'].entityId).toBe('comp-2');
      expect(result.relations.byComponent['comp-1']).toEqual([]);
      expect(result.relations.byComponent['comp-2']).toEqual(['action-1']);
    });

    it('should update entityKind and update relations', () => {
      const state = {
        ...initialState,
        ids: ['action-1'],
        entities: {
          'action-1': {
            id: 'action-1',
            entityId: 'comp-1',
            entityKind: ENTITY_KINDS.COMPONENT,
          },
        },
        relations: {
          byComponent: { 'comp-1': ['action-1'] },
          byScreen: {},
          byElement: {},
        },
      };

      const result = actionReducer(state, updateAction({
        actionId: 'action-1',
        updates: { entityKind: ENTITY_KINDS.SCREEN },
      }));

      expect(result.entities['action-1'].entityKind).toBe(ENTITY_KINDS.SCREEN);
      expect(result.relations.byComponent['comp-1']).toEqual([]);
      expect(result.relations.byScreen['comp-1']).toEqual(['action-1']);
    });

    it('should update both entityId and entityKind', () => {
      const state = {
        ...initialState,
        ids: ['action-1'],
        entities: {
          'action-1': {
            id: 'action-1',
            entityId: 'comp-1',
            entityKind: ENTITY_KINDS.COMPONENT,
          },
        },
        relations: {
          byComponent: { 'comp-1': ['action-1'] },
          byScreen: {},
          byElement: {},
        },
      };

      const result = actionReducer(state, updateAction({
        actionId: 'action-1',
        updates: {
          entityId: 'el-1',
          entityKind: ENTITY_KINDS.ELEMENT,
        },
      }));

      expect(result.entities['action-1'].entityId).toBe('el-1');
      expect(result.entities['action-1'].entityKind).toBe(ENTITY_KINDS.ELEMENT);
      expect(result.relations.byComponent['comp-1']).toEqual([]);
      expect(result.relations.byElement['el-1']).toEqual(['action-1']);
    });

    it('should handle non-existent action gracefully', () => {
      const result = actionReducer(initialState, updateAction({
        actionId: 'action-1',
        updates: { name: 'New Name' },
      }));

      expect(result.entities['action-1']).toBeUndefined();
    });

    it('should update multiple properties at once', () => {
      const state = {
        ...initialState,
        ids: ['action-1'],
        entities: {
          'action-1': {
            id: 'action-1',
            name: 'Old',
            type: 'linkTo',
            trigger: 'onClick',
            config: {},
          },
        },
      };

      const result = actionReducer(state, updateAction({
        actionId: 'action-1',
        updates: {
          name: 'New',
          trigger: 'onHover',
          config: { screenId: 'screen-1' },
        },
      }));

      expect(result.entities['action-1'].name).toBe('New');
      expect(result.entities['action-1'].trigger).toBe('onHover');
      expect(result.entities['action-1'].config).toEqual({ screenId: 'screen-1' });
    });
  });

  describe('Combined Actions', () => {
    it('should handle create and update workflow', () => {
      let state = initialState;

      state = actionReducer(state, createAction({
        entityId: 'comp-1',
        entityKind: ENTITY_KINDS.COMPONENT,
        trigger: 'onClick',
      }));

      const actionId = state.ids[0];

      state = actionReducer(state, updateAction({
        actionId,
        updates: { name: 'Updated Action' },
      }));

      expect(state.entities[actionId].name).toBe('Updated Action');
    });

    it('should handle create, setType, and delete workflow', () => {
      let state = initialState;

      state = actionReducer(state, createAction({
        entityId: 'comp-1',
        entityKind: ENTITY_KINDS.COMPONENT,
        trigger: 'onClick',
      }));

      const actionId = state.ids[0];

      state = actionReducer(state, setActionType({
        actionId,
        type: 'linkTo',
      }));

      expect(state.entities[actionId].type).toBe('linkTo');

      state = actionReducer(state, deleteAction(actionId));

      expect(state.entities[actionId]).toBeUndefined();
    });

    it('should handle multiple actions for same entity', () => {
      let state = initialState;

      state = actionReducer(state, createAction({
        entityId: 'comp-1',
        entityKind: ENTITY_KINDS.COMPONENT,
        trigger: 'onClick',
      }));

      state = actionReducer(state, createAction({
        entityId: 'comp-1',
        entityKind: ENTITY_KINDS.COMPONENT,
        trigger: 'onHover',
      }));

      expect(state.ids).toHaveLength(2);
      expect(state.relations.byComponent['comp-1']).toHaveLength(2);
    });
  });

  describe('State Immutability', () => {
    it('should not mutate original state when creating action', () => {
      const state = {
        ...initialState,
        ids: ['action-1'],
        entities: { 'action-1': { id: 'action-1' } },
      };

      const originalState = JSON.parse(JSON.stringify(state));

      actionReducer(state, createAction({
        entityId: 'comp-1',
        entityKind: ENTITY_KINDS.COMPONENT,
        trigger: 'onClick',
      }));

      expect(state).toEqual(originalState);
    });

    it('should not mutate original state when updating action', () => {
      const state = {
        ...initialState,
        ids: ['action-1'],
        entities: { 'action-1': { id: 'action-1', name: 'Old' } },
      };

      const originalState = JSON.parse(JSON.stringify(state));

      actionReducer(state, updateAction({
        actionId: 'action-1',
        updates: { name: 'New' },
      }));

      expect(state).toEqual(originalState);
    });
  });
});

