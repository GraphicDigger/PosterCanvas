// ===================================================================
// Unit Tests for Action Slice
// CRITICAL BUSINESS LOGIC - Action State Management with Relations
// Phase 1, Day 4 - Part 2 (30 tests)
// ===================================================================

import { describe, it, expect, beforeEach, vi } from 'vitest';

// Mock constants
vi.mock('../../../../shared/constants', () => ({
  ENTITY_KINDS: {
    ACTION: 'action',
    COMPONENT: 'component',
    SCREEN: 'screen',
    ELEMENT: 'element',
  },
}));

vi.mock('../constants/actionConfig', () => ({
  ACTION_CONFIG: {
    navigate: { label: 'Navigate', config: { url: '' } },
    setState: { label: 'Set State', config: { variable: '', value: '' } },
  },
}));

vi.mock('../constants/actionTypes', () => ({
  ACTION_TYPES: {
    CUSTOM_ACTION: 'custom-action',
    NAVIGATE: 'navigate',
    SET_STATE: 'setState',
  },
}));

import actionEntitySlice, {
  setHoveredActionId,
  setFocusedActionId,
  setSelectedActionId,
  setActions,
  createAction,
  createCustomAction,
  deleteAction,
  setActionType,
  updateAction,
} from './slice';

describe('Action Slice', () => {
  let initialState;

  beforeEach(() => {
    initialState = {
      ids: [],
      entities: {},
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
  });

  // ===================================================================
  // PART 1: UI State Management (3 tests)
  // ===================================================================

  describe('UI State Management', () => {
    it('should set hovered action ID', () => {
      const state = actionEntitySlice(initialState, setHoveredActionId('act-1'));
      expect(state.ui.hoveredActionId).toBe('act-1');
    });

    it('should set focused action ID', () => {
      const state = actionEntitySlice(initialState, setFocusedActionId('act-2'));
      expect(state.ui.focusedActionId).toBe('act-2');
    });

    it('should set selected action ID', () => {
      const state = actionEntitySlice(initialState, setSelectedActionId('act-3'));
      expect(state.ui.selectedActionId).toBe('act-3');
    });
  });

  // ===================================================================
  // PART 2: Set Actions with Relations (6 tests)
  // ===================================================================

  describe('Set Actions with Relations', () => {
    it('should set actions and build component relations', () => {
      const actions = [
        { id: 'act-1', name: 'Action 1', componentId: 'comp-1' },
        { id: 'act-2', name: 'Action 2', componentId: 'comp-1' },
      ];

      const state = actionEntitySlice(initialState, setActions(actions));

      expect(state.ids).toEqual(['act-1', 'act-2']);
      expect(state.relations.byComponent['comp-1']).toEqual(['act-1', 'act-2']);
    });

    it('should clear existing actions and relations', () => {
      initialState.entities['act-old'] = { id: 'act-old', name: 'Old' };
      initialState.ids.push('act-old');
      initialState.relations.byComponent['comp-old'] = ['act-old'];

      const actions = [{ id: 'act-new', name: 'New', componentId: 'comp-new' }];
      const state = actionEntitySlice(initialState, setActions(actions));

      expect(state.entities['act-old']).toBeUndefined();
      expect(state.relations.byComponent['comp-old']).toBeUndefined();
      expect(state.relations.byComponent['comp-new']).toEqual(['act-new']);
    });

    it('should handle actions without componentId', () => {
      const actions = [{ id: 'act-1', name: 'Action 1' }];

      const state = actionEntitySlice(initialState, setActions(actions));

      expect(state.ids).toContain('act-1');
      expect(Object.keys(state.relations.byComponent)).toHaveLength(0);
    });

    it('should group multiple actions by component', () => {
      const actions = [
        { id: 'act-1', name: 'Action 1', componentId: 'comp-1' },
        { id: 'act-2', name: 'Action 2', componentId: 'comp-2' },
        { id: 'act-3', name: 'Action 3', componentId: 'comp-1' },
      ];

      const state = actionEntitySlice(initialState, setActions(actions));

      expect(state.relations.byComponent['comp-1']).toEqual(['act-1', 'act-3']);
      expect(state.relations.byComponent['comp-2']).toEqual(['act-2']);
    });

    it('should preserve UI state when setting actions', () => {
      initialState.ui.selectedActionId = 'act-selected';

      const actions = [{ id: 'act-1', name: 'Action', componentId: 'comp-1' }];
      const state = actionEntitySlice(initialState, setActions(actions));

      expect(state.ui.selectedActionId).toBe('act-selected');
    });

    it('should handle empty array', () => {
      initialState.entities['act-1'] = { id: 'act-1', name: 'Action' };
      initialState.ids.push('act-1');

      const state = actionEntitySlice(initialState, setActions([]));

      expect(state.ids).toHaveLength(0);
      expect(Object.keys(state.entities)).toHaveLength(0);
    });
  });

  // ===================================================================
  // PART 3: Create Action (7 tests)
  // ===================================================================

  describe('Create Action', () => {
    it('should create action for component', () => {
      const state = actionEntitySlice(
        initialState,
        createAction({
          entityId: 'comp-1',
          entityKind: 'component',
          trigger: 'click',
        }),
      );

      expect(state.ids).toHaveLength(1);
      const actionId = state.ids[0];
      expect(state.entities[actionId].entityId).toBe('comp-1');
      expect(state.entities[actionId].entityKind).toBe('component');
      expect(state.entities[actionId].kind).toBe('action');
    });

    it('should create action and add to component relations', () => {
      const state = actionEntitySlice(
        initialState,
        createAction({
          entityId: 'comp-1',
          entityKind: 'component',
          trigger: 'hover',
        }),
      );

      const actionId = state.ids[0];
      expect(state.relations.byComponent['comp-1']).toContain(actionId);
    });

    it('should create action for screen', () => {
      const state = actionEntitySlice(
        initialState,
        createAction({
          entityId: 'screen-1',
          entityKind: 'screen',
          trigger: 'load',
        }),
      );

      const actionId = state.ids[0];
      expect(state.relations.byScreen['screen-1']).toContain(actionId);
    });

    it('should create action for element', () => {
      const state = actionEntitySlice(
        initialState,
        createAction({
          entityId: 'elem-1',
          entityKind: 'element',
          trigger: 'click',
        }),
      );

      const actionId = state.ids[0];
      expect(state.relations.byElement['elem-1']).toContain(actionId);
    });

    it('should set newly created action as selected', () => {
      const state = actionEntitySlice(
        initialState,
        createAction({
          entityId: 'comp-1',
          entityKind: 'component',
          trigger: 'click',
        }),
      );

      const actionId = state.ids[0];
      expect(state.ui.selectedActionId).toBe(actionId);
    });

    it('should create multiple actions', () => {
      const state1 = actionEntitySlice(
        initialState,
        createAction({
          entityId: 'comp-1',
          entityKind: 'component',
          trigger: 'click',
        }),
      );

      const state2 = actionEntitySlice(
        state1,
        createAction({
          entityId: 'comp-1',
          entityKind: 'component',
          trigger: 'hover',
        }),
      );

      expect(state2.ids).toHaveLength(2);
      expect(state2.entities[state2.ids[0]]).toBeDefined();
      expect(state2.entities[state2.ids[1]]).toBeDefined();
    });

    it('should set default config as empty object', () => {
      const state = actionEntitySlice(
        initialState,
        createAction({
          entityId: 'comp-1',
          entityKind: 'component',
          trigger: 'click',
        }),
      );

      const actionId = state.ids[0];
      expect(state.entities[actionId].config).toEqual({});
    });
  });

  // ===================================================================
  // PART 4: Delete Action (4 tests)
  // ===================================================================

  describe('Delete Action', () => {
    beforeEach(() => {
      initialState.entities['act-1'] = {
        id: 'act-1',
        name: 'Action 1',
        entityId: 'comp-1',
        entityKind: 'component',
      };
      initialState.ids.push('act-1');
      initialState.relations.byComponent['comp-1'] = ['act-1'];
    });

    it('should delete action and remove from relations', () => {
      const state = actionEntitySlice(initialState, deleteAction('act-1'));

      expect(state.entities['act-1']).toBeUndefined();
      expect(state.ids).not.toContain('act-1');
      expect(state.relations.byComponent['comp-1']).toEqual([]);
    });

    it('should handle deleting non-existent action', () => {
      const state = actionEntitySlice(initialState, deleteAction('non-existent'));

      expect(state.ids).toHaveLength(1);
      expect(state.entities['act-1']).toBeDefined();
    });

    it('should delete action from screen relations', () => {
      initialState.entities['act-2'] = {
        id: 'act-2',
        entityId: 'screen-1',
        entityKind: 'screen',
      };
      initialState.ids.push('act-2');
      initialState.relations.byScreen['screen-1'] = ['act-2'];

      const state = actionEntitySlice(initialState, deleteAction('act-2'));

      expect(state.relations.byScreen['screen-1']).toEqual([]);
    });

    it('should delete action from element relations', () => {
      initialState.entities['act-3'] = {
        id: 'act-3',
        entityId: 'elem-1',
        entityKind: 'element',
      };
      initialState.ids.push('act-3');
      initialState.relations.byElement['elem-1'] = ['act-3'];

      const state = actionEntitySlice(initialState, deleteAction('act-3'));

      expect(state.relations.byElement['elem-1']).toEqual([]);
    });
  });

  // ===================================================================
  // PART 5: Set Action Type (3 tests)
  // ===================================================================

  describe('Set Action Type', () => {
    beforeEach(() => {
      initialState.entities['act-1'] = {
        id: 'act-1',
        name: 'Action 1',
        type: null,
        config: {},
      };
      initialState.ids.push('act-1');
    });

    it('should set action type and update name', () => {
      const state = actionEntitySlice(
        initialState,
        setActionType({
          actionId: 'act-1',
          type: 'navigate',
          config: { url: '/home' },
        }),
      );

      expect(state.entities['act-1'].type).toBe('navigate');
      expect(state.entities['act-1'].name).toBe('New Navigate');
      expect(state.entities['act-1'].config).toEqual({ url: '/home' });
    });

    it('should set custom action name for custom type', () => {
      const state = actionEntitySlice(
        initialState,
        setActionType({
          actionId: 'act-1',
          type: 'custom-action',
          config: {},
        }),
      );

      expect(state.entities['act-1'].name).toBe('Custom Action');
    });

    it('should handle setting type for non-existent action', () => {
      const state = actionEntitySlice(
        initialState,
        setActionType({
          actionId: 'non-existent',
          type: 'navigate',
        }),
      );

      expect(state.entities['non-existent']).toBeUndefined();
    });
  });

  // ===================================================================
  // PART 6: Update Action (4 tests)
  // ===================================================================

  describe('Update Action', () => {
    beforeEach(() => {
      initialState.entities['act-1'] = {
        id: 'act-1',
        name: 'Action 1',
        type: 'navigate',
        entityId: 'comp-1',
        entityKind: 'component',
        config: { url: '/home' },
      };
      initialState.ids.push('act-1');
      initialState.relations.byComponent['comp-1'] = ['act-1'];
    });

    it('should update action properties', () => {
      const state = actionEntitySlice(
        initialState,
        updateAction({
          actionId: 'act-1',
          updates: { name: 'Updated Action' },
        }),
      );

      expect(state.entities['act-1'].name).toBe('Updated Action');
    });

    it('should update action type and config', () => {
      const state = actionEntitySlice(
        initialState,
        updateAction({
          actionId: 'act-1',
          updates: {
            type: 'setState',
            config: { variable: 'count', value: '10' },
          },
        }),
      );

      expect(state.entities['act-1'].type).toBe('setState');
      expect(state.entities['act-1'].config.variable).toBe('count');
    });

    it('should update entity relations when entityId changes', () => {
      const state = actionEntitySlice(
        initialState,
        updateAction({
          actionId: 'act-1',
          updates: { entityId: 'comp-2' },
        }),
      );

      expect(state.relations.byComponent['comp-1']).toEqual([]);
      expect(state.relations.byComponent['comp-2']).toContain('act-1');
    });

    it('should update entity kind relations when entityKind changes', () => {
      const state = actionEntitySlice(
        initialState,
        updateAction({
          actionId: 'act-1',
          updates: {
            entityKind: 'screen',
            entityId: 'screen-1',
          },
        }),
      );

      expect(state.relations.byComponent['comp-1']).toEqual([]);
      expect(state.relations.byScreen['screen-1']).toContain('act-1');
    });
  });

  // ===================================================================
  // PART 7: Create Custom Action (3 tests)
  // ===================================================================

  describe('Create Custom Action', () => {
    it('should create custom action', () => {
      const customAction = {
        id: 'custom-1',
        name: 'My Custom Action',
        trigger: 'custom',
      };

      const state = actionEntitySlice(initialState, createCustomAction(customAction));

      expect(state.entities['custom-1']).toBeDefined();
      expect(state.entities['custom-1'].kind).toBe('action');
      expect(state.entities['custom-1'].type).toBe('custom-action');
    });

    it('should set custom action as selected', () => {
      const customAction = {
        id: 'custom-1',
        name: 'My Custom Action',
      };

      const state = actionEntitySlice(initialState, createCustomAction(customAction));

      expect(state.ui.selectedActionId).toBe('custom-1');
    });

    it('should add timestamps to custom action', () => {
      const customAction = {
        id: 'custom-1',
        name: 'My Custom Action',
      };

      const state = actionEntitySlice(initialState, createCustomAction(customAction));

      expect(state.entities['custom-1'].createdAt).toBeTruthy();
      expect(state.entities['custom-1'].updatedAt).toBeTruthy();
    });
  });
});
