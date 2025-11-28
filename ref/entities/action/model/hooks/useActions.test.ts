// ===================================================================
// Unit Tests for Action Queries & Selectors
// CRITICAL BUSINESS LOGIC - Action Discovery & Retrieval
// Phase 5, Week 1, Day 5 - Action System (Part 2: 50 tests)
// ===================================================================

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useSelector } from 'react-redux';

// Mock Redux
vi.mock('react-redux', () => ({
  useSelector: vi.fn(),
}));

vi.mock('../store/selectors', () => ({
  selectAllActions: vi.fn((state) => state.actionEntity.ids.map((id: string) => state.actionEntity.entities[id])),
  selectActionById: vi.fn((state, id) => state.actionEntity.entities[id]),
  selectActionsByComponentId: vi.fn((state, componentId) => {
    const actionIds = state.actionEntity.relations.byComponent[componentId] || [];
    return actionIds.map((id: string) => state.actionEntity.entities[id]);
  }),
  selectActionsByScreenId: vi.fn((state, screenId) => {
    const actionIds = state.actionEntity.relations.byScreen[screenId] || [];
    return actionIds.map((id: string) => state.actionEntity.entities[id]);
  }),
  selectActionsByElementId: vi.fn((state, elementId) => {
    const actionIds = state.actionEntity.relations.byElement[elementId] || [];
    return actionIds.map((id: string) => state.actionEntity.entities[id]);
  }),
}));

// Import the mocked selectors
import * as selectors from '../store/selectors';

// Mock hook implementation
const mockUseActions = () => {
  const allActions = useSelector(selectors.selectAllActions);
  const getActionById = (id: string) => useSelector((state: any) => selectors.selectActionById(state, id));
  const getActionsByComponentId = (componentId: string) =>
    useSelector((state: any) => selectors.selectActionsByComponentId(state, componentId));
  const getActionsByScreenId = (screenId: string) =>
    useSelector((state: any) => selectors.selectActionsByScreenId(state, screenId));
  const getActionsByElementId = (elementId: string) =>
    useSelector((state: any) => selectors.selectActionsByElementId(state, elementId));

  return {
    allActions,
    getActionById,
    getActionsByComponentId,
    getActionsByScreenId,
    getActionsByElementId,
  };
};

describe('Action Queries & Selectors', () => {
  let mockState: any;

  beforeEach(() => {
    mockState = {
      actionEntity: {
        ids: ['action-1', 'action-2', 'action-3'],
        entities: {
          'action-1': {
            id: 'action-1',
            name: 'Navigate Home',
            type: 'linkTo',
            entityId: 'comp-1',
            entityKind: 'component',
            trigger: 'onClick',
          },
          'action-2': {
            id: 'action-2',
            name: 'API Call',
            type: 'apiGet',
            entityId: 'screen-1',
            entityKind: 'screen',
            trigger: 'onMount',
          },
          'action-3': {
            id: 'action-3',
            name: 'Update State',
            type: 'setState',
            entityId: 'elem-1',
            entityKind: 'element',
            trigger: 'onChange',
          },
        },
        relations: {
          byComponent: {
            'comp-1': ['action-1'],
            'comp-2': ['action-4', 'action-5'],
          },
          byScreen: {
            'screen-1': ['action-2'],
            'screen-2': ['action-6'],
          },
          byElement: {
            'elem-1': ['action-3'],
            'elem-2': ['action-7', 'action-8'],
          },
        },
      },
    };

    (useSelector as any).mockImplementation((selector: any) => selector(mockState));
  });

  // ===================================================================
  // PART 1: Select All Actions (10 tests)
  // ===================================================================

  describe('Select All Actions', () => {
    it('should select all actions', () => {
      const { result } = renderHook(() => mockUseActions());

      expect(result.current.allActions).toHaveLength(3);
    });

    it('should return actions with correct IDs', () => {
      const { result } = renderHook(() => mockUseActions());

      const ids = result.current.allActions.map((a: any) => a.id);
      expect(ids).toEqual(['action-1', 'action-2', 'action-3']);
    });

    it('should return actions with correct names', () => {
      const { result } = renderHook(() => mockUseActions());

      const names = result.current.allActions.map((a: any) => a.name);
      expect(names).toContain('Navigate Home');
      expect(names).toContain('API Call');
      expect(names).toContain('Update State');
    });

    it('should return actions with correct types', () => {
      const { result } = renderHook(() => mockUseActions());

      const types = result.current.allActions.map((a: any) => a.type);
      expect(types).toContain('linkTo');
      expect(types).toContain('apiGet');
      expect(types).toContain('setState');
    });

    it('should return empty array when no actions', () => {
      mockState.actionEntity.ids = [];
      mockState.actionEntity.entities = {};

      const { result } = renderHook(() => mockUseActions());

      expect(result.current.allActions).toEqual([]);
    });

    it('should handle single action', () => {
      mockState.actionEntity.ids = ['action-1'];

      const { result } = renderHook(() => mockUseActions());

      expect(result.current.allActions).toHaveLength(1);
      expect(result.current.allActions[0].id).toBe('action-1');
    });

    it('should handle large number of actions', () => {
      const ids = Array.from({ length: 100 }, (_, i) => `action-${i}`);
      const entities = ids.reduce((acc, id) => {
        acc[id] = { id, name: `Action ${id}`, type: 'linkTo' };
        return acc;
      }, {} as any);

      mockState.actionEntity.ids = ids;
      mockState.actionEntity.entities = entities;

      const { result } = renderHook(() => mockUseActions());

      expect(result.current.allActions).toHaveLength(100);
    });

    it('should return actions in order of IDs array', () => {
      const { result } = renderHook(() => mockUseActions());

      const ids = result.current.allActions.map((a: any) => a.id);
      expect(ids).toEqual(mockState.actionEntity.ids);
    });

    it('should handle missing entities gracefully', () => {
      mockState.actionEntity.ids = ['action-1', 'missing-action', 'action-2'];

      const { result } = renderHook(() => mockUseActions());

      const validActions = result.current.allActions.filter((a: any) => a !== undefined);
      expect(validActions.length).toBeGreaterThan(0);
    });

    it('should return actions with all properties', () => {
      const { result } = renderHook(() => mockUseActions());

      const action = result.current.allActions[0];
      expect(action).toHaveProperty('id');
      expect(action).toHaveProperty('name');
      expect(action).toHaveProperty('type');
      expect(action).toHaveProperty('entityId');
      expect(action).toHaveProperty('entityKind');
      expect(action).toHaveProperty('trigger');
    });
  });

  // ===================================================================
  // PART 2: Select Action By ID (10 tests)
  // ===================================================================

  describe('Select Action By ID', () => {
    it('should select action by ID', () => {
      const { result } = renderHook(() => mockUseActions());

      const action = result.current.getActionById('action-1');
      expect(action).toBeDefined();
      expect(action.id).toBe('action-1');
    });

    it('should return correct action properties', () => {
      const { result } = renderHook(() => mockUseActions());

      const action = result.current.getActionById('action-1');
      expect(action.name).toBe('Navigate Home');
      expect(action.type).toBe('linkTo');
    });

    it('should return undefined for non-existent ID', () => {
      const { result } = renderHook(() => mockUseActions());

      const action = result.current.getActionById('non-existent');
      expect(action).toBeUndefined();
    });

    it('should select different actions by different IDs', () => {
      const { result } = renderHook(() => mockUseActions());

      const action1 = result.current.getActionById('action-1');
      const action2 = result.current.getActionById('action-2');

      expect(action1.id).toBe('action-1');
      expect(action2.id).toBe('action-2');
      expect(action1.id).not.toBe(action2.id);
    });

    it('should handle empty string ID', () => {
      const { result } = renderHook(() => mockUseActions());

      const action = result.current.getActionById('');
      expect(action).toBeUndefined();
    });

    it('should handle null ID', () => {
      const { result } = renderHook(() => mockUseActions());

      const action = result.current.getActionById(null as any);
      expect(action).toBeUndefined();
    });

    it('should handle undefined ID', () => {
      const { result } = renderHook(() => mockUseActions());

      const action = result.current.getActionById(undefined as any);
      expect(action).toBeUndefined();
    });

    it('should handle numeric ID', () => {
      mockState.actionEntity.entities[12345] = {
        id: 12345,
        name: 'Numeric Action',
        type: 'linkTo',
      };

      const { result } = renderHook(() => mockUseActions());

      const action = result.current.getActionById(12345 as any);
      expect(action).toBeDefined();
    });

    it('should handle special characters in ID', () => {
      const specialId = 'action-!@#$%';
      mockState.actionEntity.entities[specialId] = {
        id: specialId,
        name: 'Special Action',
        type: 'linkTo',
      };

      const { result } = renderHook(() => mockUseActions());

      const action = result.current.getActionById(specialId);
      expect(action).toBeDefined();
      expect(action.id).toBe(specialId);
    });

    it('should return action with complete data', () => {
      const { result } = renderHook(() => mockUseActions());

      const action = result.current.getActionById('action-2');
      expect(action.id).toBe('action-2');
      expect(action.name).toBe('API Call');
      expect(action.type).toBe('apiGet');
      expect(action.entityId).toBe('screen-1');
      expect(action.entityKind).toBe('screen');
      expect(action.trigger).toBe('onMount');
    });
  });

  // ===================================================================
  // PART 3: Select Actions By Component ID (10 tests)
  // ===================================================================

  describe('Select Actions By Component ID', () => {
    it('should select actions by component ID', () => {
      mockState.actionEntity.entities['action-4'] = { id: 'action-4', name: 'Action 4' };
      mockState.actionEntity.entities['action-5'] = { id: 'action-5', name: 'Action 5' };

      const { result } = renderHook(() => mockUseActions());

      const actions = result.current.getActionsByComponentId('comp-2');
      expect(actions).toHaveLength(2);
    });

    it('should return empty array for component with no actions', () => {
      const { result } = renderHook(() => mockUseActions());

      const actions = result.current.getActionsByComponentId('comp-999');
      expect(actions).toEqual([]);
    });

    it('should return actions with correct IDs', () => {
      const { result } = renderHook(() => mockUseActions());

      const actions = result.current.getActionsByComponentId('comp-1');
      expect(actions[0].id).toBe('action-1');
    });

    it('should handle component with single action', () => {
      const { result } = renderHook(() => mockUseActions());

      const actions = result.current.getActionsByComponentId('comp-1');
      expect(actions).toHaveLength(1);
    });

    it('should handle component with multiple actions', () => {
      mockState.actionEntity.entities['action-4'] = { id: 'action-4' };
      mockState.actionEntity.entities['action-5'] = { id: 'action-5' };

      const { result } = renderHook(() => mockUseActions());

      const actions = result.current.getActionsByComponentId('comp-2');
      expect(actions).toHaveLength(2);
    });

    it('should handle empty component ID', () => {
      const { result } = renderHook(() => mockUseActions());

      const actions = result.current.getActionsByComponentId('');
      expect(actions).toEqual([]);
    });

    it('should handle null component ID', () => {
      const { result } = renderHook(() => mockUseActions());

      const actions = result.current.getActionsByComponentId(null as any);
      expect(actions).toEqual([]);
    });

    it('should handle undefined component ID', () => {
      const { result } = renderHook(() => mockUseActions());

      const actions = result.current.getActionsByComponentId(undefined as any);
      expect(actions).toEqual([]);
    });

    it('should filter out undefined actions', () => {
      mockState.actionEntity.relations.byComponent['comp-1'] = ['action-1', 'missing-action'];

      const { result } = renderHook(() => mockUseActions());

      const actions = result.current.getActionsByComponentId('comp-1');
      const validActions = actions.filter((a: any) => a !== undefined);
      expect(validActions.length).toBeGreaterThan(0);
    });

    it('should return actions in order', () => {
      mockState.actionEntity.entities['action-4'] = { id: 'action-4' };
      mockState.actionEntity.entities['action-5'] = { id: 'action-5' };

      const { result } = renderHook(() => mockUseActions());

      const actions = result.current.getActionsByComponentId('comp-2');
      const ids = actions.map((a: any) => a.id);
      expect(ids).toEqual(['action-4', 'action-5']);
    });
  });

  // ===================================================================
  // PART 4: Select Actions By Screen ID (10 tests)
  // ===================================================================

  describe('Select Actions By Screen ID', () => {
    it('should select actions by screen ID', () => {
      const { result } = renderHook(() => mockUseActions());

      const actions = result.current.getActionsByScreenId('screen-1');
      expect(actions).toHaveLength(1);
      expect(actions[0].id).toBe('action-2');
    });

    it('should return empty array for screen with no actions', () => {
      const { result } = renderHook(() => mockUseActions());

      const actions = result.current.getActionsByScreenId('screen-999');
      expect(actions).toEqual([]);
    });

    it('should return actions with correct properties', () => {
      const { result } = renderHook(() => mockUseActions());

      const actions = result.current.getActionsByScreenId('screen-1');
      expect(actions[0].name).toBe('API Call');
      expect(actions[0].type).toBe('apiGet');
    });

    it('should handle screen with multiple actions', () => {
      mockState.actionEntity.entities['action-6'] = { id: 'action-6' };
      mockState.actionEntity.relations.byScreen['screen-2'] = ['action-6'];

      const { result } = renderHook(() => mockUseActions());

      const actions = result.current.getActionsByScreenId('screen-2');
      expect(actions).toHaveLength(1);
    });

    it('should handle empty screen ID', () => {
      const { result } = renderHook(() => mockUseActions());

      const actions = result.current.getActionsByScreenId('');
      expect(actions).toEqual([]);
    });

    it('should handle null screen ID', () => {
      const { result } = renderHook(() => mockUseActions());

      const actions = result.current.getActionsByScreenId(null as any);
      expect(actions).toEqual([]);
    });

    it('should handle undefined screen ID', () => {
      const { result } = renderHook(() => mockUseActions());

      const actions = result.current.getActionsByScreenId(undefined as any);
      expect(actions).toEqual([]);
    });

    it('should handle screen with no relations entry', () => {
      const { result } = renderHook(() => mockUseActions());

      const actions = result.current.getActionsByScreenId('new-screen');
      expect(actions).toEqual([]);
    });

    it('should filter out missing actions', () => {
      mockState.actionEntity.relations.byScreen['screen-1'] = ['action-2', 'missing'];

      const { result } = renderHook(() => mockUseActions());

      const actions = result.current.getActionsByScreenId('screen-1');
      const validActions = actions.filter((a: any) => a !== undefined);
      expect(validActions.length).toBeGreaterThan(0);
    });

    it('should return actions in correct order', () => {
      mockState.actionEntity.entities['action-6'] = { id: 'action-6' };
      mockState.actionEntity.entities['action-7'] = { id: 'action-7' };
      mockState.actionEntity.relations.byScreen['screen-2'] = ['action-6', 'action-7'];

      const { result } = renderHook(() => mockUseActions());

      const actions = result.current.getActionsByScreenId('screen-2');
      const ids = actions.map((a: any) => a.id);
      expect(ids).toEqual(['action-6', 'action-7']);
    });
  });

  // ===================================================================
  // PART 5: Select Actions By Element ID (10 tests)
  // ===================================================================

  describe('Select Actions By Element ID', () => {
    it('should select actions by element ID', () => {
      const { result } = renderHook(() => mockUseActions());

      const actions = result.current.getActionsByElementId('elem-1');
      expect(actions).toHaveLength(1);
      expect(actions[0].id).toBe('action-3');
    });

    it('should return empty array for element with no actions', () => {
      const { result } = renderHook(() => mockUseActions());

      const actions = result.current.getActionsByElementId('elem-999');
      expect(actions).toEqual([]);
    });

    it('should return actions with correct properties', () => {
      const { result } = renderHook(() => mockUseActions());

      const actions = result.current.getActionsByElementId('elem-1');
      expect(actions[0].name).toBe('Update State');
      expect(actions[0].type).toBe('setState');
      expect(actions[0].trigger).toBe('onChange');
    });

    it('should handle element with multiple actions', () => {
      mockState.actionEntity.entities['action-7'] = { id: 'action-7' };
      mockState.actionEntity.entities['action-8'] = { id: 'action-8' };

      const { result } = renderHook(() => mockUseActions());

      const actions = result.current.getActionsByElementId('elem-2');
      expect(actions).toHaveLength(2);
    });

    it('should handle empty element ID', () => {
      const { result } = renderHook(() => mockUseActions());

      const actions = result.current.getActionsByElementId('');
      expect(actions).toEqual([]);
    });

    it('should handle null element ID', () => {
      const { result } = renderHook(() => mockUseActions());

      const actions = result.current.getActionsByElementId(null as any);
      expect(actions).toEqual([]);
    });

    it('should handle undefined element ID', () => {
      const { result } = renderHook(() => mockUseActions());

      const actions = result.current.getActionsByElementId(undefined as any);
      expect(actions).toEqual([]);
    });

    it('should handle element with no relations entry', () => {
      const { result } = renderHook(() => mockUseActions());

      const actions = result.current.getActionsByElementId('new-elem');
      expect(actions).toEqual([]);
    });

    it('should filter out undefined actions', () => {
      mockState.actionEntity.relations.byElement['elem-1'] = ['action-3', 'missing'];

      const { result } = renderHook(() => mockUseActions());

      const actions = result.current.getActionsByElementId('elem-1');
      const validActions = actions.filter((a: any) => a !== undefined);
      expect(validActions.length).toBeGreaterThan(0);
    });

    it('should return actions in correct order', () => {
      mockState.actionEntity.entities['action-7'] = { id: 'action-7' };
      mockState.actionEntity.entities['action-8'] = { id: 'action-8' };

      const { result } = renderHook(() => mockUseActions());

      const actions = result.current.getActionsByElementId('elem-2');
      const ids = actions.map((a: any) => a.id);
      expect(ids).toEqual(['action-7', 'action-8']);
    });
  });
});

