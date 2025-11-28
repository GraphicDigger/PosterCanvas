// ===================================================================
// Unit Tests for uiFocus Redux Slice
// Coverage Target: 100%
// Phase 1 - Redux Slices (HIGH IMPACT)
// Risk: LOW (Redux Toolkit, focus state management)
// ===================================================================

import { describe, it, expect, beforeEach, vi } from 'vitest';
import focusReducer, {
  setFocusEntity,
  resetFocusEntity,
} from '../slice';
import { ENTITY_KINDS } from '@/shared/constants';

describe('uiFocus Redux Slice', () => {
  let initialState;

  beforeEach(() => {
    initialState = {
      focusEntity: {
        id: null,
        kind: ENTITY_KINDS.SCREEN,
        type: null,
        data: null,
        parentId: null,
        parentType: null,
        childrenIds: [],
      },
    };

    // Mock console.log to avoid noise in test output
    vi.spyOn(console, 'log').mockImplementation(() => {});
  });

  describe('Initial State', () => {
    it('should return initial state when undefined state is passed', () => {
      const result = focusReducer(undefined, { type: '@@INIT' });

      expect(result).toEqual(initialState);
    });

    it('should have focusEntity with null id', () => {
      const result = focusReducer(undefined, { type: '@@INIT' });

      expect(result.focusEntity.id).toBeNull();
    });

    it('should have focusEntity with SCREEN kind by default', () => {
      const result = focusReducer(undefined, { type: '@@INIT' });

      expect(result.focusEntity.kind).toBe(ENTITY_KINDS.SCREEN);
    });

    it('should have focusEntity with null data and type', () => {
      const result = focusReducer(undefined, { type: '@@INIT' });

      expect(result.focusEntity.data).toBeNull();
      expect(result.focusEntity.type).toBeNull();
    });

    it('should have focusEntity with null parent properties', () => {
      const result = focusReducer(undefined, { type: '@@INIT' });

      expect(result.focusEntity.parentId).toBeNull();
      expect(result.focusEntity.parentType).toBeNull();
    });

    it('should have focusEntity with empty childrenIds array', () => {
      const result = focusReducer(undefined, { type: '@@INIT' });

      expect(result.focusEntity.childrenIds).toEqual([]);
    });
  });

  describe('setFocusEntity Action', () => {
    it('should set focus entity with complete data', () => {
      const focusEntity = {
        id: 'screen-1',
        kind: ENTITY_KINDS.SCREEN,
        type: 'home',
        data: { name: 'Home Screen' },
        parentId: null,
        parentType: null,
        childrenIds: ['el-1', 'el-2'],
      };

      const result = focusReducer(initialState, setFocusEntity(focusEntity));

      expect(result.focusEntity).toEqual(focusEntity);
    });

    it('should set focus entity for element', () => {
      const focusEntity = {
        id: 'el-1',
        kind: ENTITY_KINDS.ELEMENT,
        type: 'button',
        data: { tag: 'button', text: 'Click me' },
        parentId: 'screen-1',
        parentType: ENTITY_KINDS.SCREEN,
        childrenIds: [],
      };

      const result = focusReducer(initialState, setFocusEntity(focusEntity));

      expect(result.focusEntity).toEqual(focusEntity);
      expect(result.focusEntity.id).toBe('el-1');
      expect(result.focusEntity.kind).toBe(ENTITY_KINDS.ELEMENT);
    });

    it('should set focus entity for component', () => {
      const focusEntity = {
        id: 'comp-1',
        kind: ENTITY_KINDS.COMPONENT,
        type: 'custom',
        data: { name: 'Button Component' },
        parentId: null,
        parentType: null,
        childrenIds: ['el-3', 'el-4', 'el-5'],
      };

      const result = focusReducer(initialState, setFocusEntity(focusEntity));

      expect(result.focusEntity).toEqual(focusEntity);
      expect(result.focusEntity.id).toBe('comp-1');
      expect(result.focusEntity.kind).toBe(ENTITY_KINDS.COMPONENT);
    });

    it('should replace existing focus entity', () => {
      const state = {
        focusEntity: {
          id: 'screen-1',
          kind: ENTITY_KINDS.SCREEN,
          type: 'home',
          data: { name: 'Home Screen' },
          parentId: null,
          parentType: null,
          childrenIds: [],
        },
      };

      const newFocusEntity = {
        id: 'el-1',
        kind: ENTITY_KINDS.ELEMENT,
        type: 'button',
        data: { tag: 'button' },
        parentId: 'screen-1',
        parentType: ENTITY_KINDS.SCREEN,
        childrenIds: [],
      };

      const result = focusReducer(state, setFocusEntity(newFocusEntity));

      expect(result.focusEntity).toEqual(newFocusEntity);
      expect(result.focusEntity.id).toBe('el-1');
      expect(result.focusEntity.kind).toBe(ENTITY_KINDS.ELEMENT);
    });

    it('should log focus entity to console', () => {
      const focusEntity = {
        id: 'screen-1',
        kind: ENTITY_KINDS.SCREEN,
        type: 'home',
        data: null,
        parentId: null,
        parentType: null,
        childrenIds: [],
      };

      focusReducer(initialState, setFocusEntity(focusEntity));

      expect(console.log).toHaveBeenCalledWith('action_focusEntity', focusEntity);
    });

    it('should handle focus entity with minimal data', () => {
      const focusEntity = {
        id: 'el-1',
        kind: ENTITY_KINDS.ELEMENT,
        type: null,
        data: null,
        parentId: null,
        parentType: null,
        childrenIds: [],
      };

      const result = focusReducer(initialState, setFocusEntity(focusEntity));

      expect(result.focusEntity).toEqual(focusEntity);
      expect(result.focusEntity.id).toBe('el-1');
    });

    it('should handle focus entity with null values', () => {
      const focusEntity = {
        id: null,
        kind: ENTITY_KINDS.SCREEN,
        type: null,
        data: null,
        parentId: null,
        parentType: null,
        childrenIds: [],
      };

      const result = focusReducer(initialState, setFocusEntity(focusEntity));

      expect(result.focusEntity.id).toBeNull();
      expect(result.focusEntity.data).toBeNull();
    });

    it('should handle focus entity with many children', () => {
      const focusEntity = {
        id: 'screen-1',
        kind: ENTITY_KINDS.SCREEN,
        type: 'dashboard',
        data: { name: 'Dashboard' },
        parentId: null,
        parentType: null,
        childrenIds: ['el-1', 'el-2', 'el-3', 'el-4', 'el-5'],
      };

      const result = focusReducer(initialState, setFocusEntity(focusEntity));

      expect(result.focusEntity.childrenIds).toHaveLength(5);
      expect(result.focusEntity.childrenIds).toEqual(['el-1', 'el-2', 'el-3', 'el-4', 'el-5']);
    });
  });

  describe('resetFocusEntity Action', () => {
    it('should reset focus entity to initial state', () => {
      const state = {
        focusEntity: {
          id: 'screen-1',
          kind: ENTITY_KINDS.SCREEN,
          type: 'home',
          data: { name: 'Home Screen' },
          parentId: null,
          parentType: null,
          childrenIds: ['el-1', 'el-2'],
        },
      };

      const result = focusReducer(state, resetFocusEntity());

      expect(result.focusEntity).toEqual(initialState.focusEntity);
      expect(result.focusEntity.id).toBeNull();
      expect(result.focusEntity.kind).toBe(ENTITY_KINDS.SCREEN);
      expect(result.focusEntity.data).toBeNull();
    });

    it('should reset focus entity when already at initial state', () => {
      const result = focusReducer(initialState, resetFocusEntity());

      expect(result.focusEntity).toEqual(initialState.focusEntity);
    });

    it('should clear all focus entity properties on reset', () => {
      const state = {
        focusEntity: {
          id: 'comp-1',
          kind: ENTITY_KINDS.COMPONENT,
          type: 'custom',
          data: { name: 'Button', props: {} },
          parentId: 'screen-1',
          parentType: ENTITY_KINDS.SCREEN,
          childrenIds: ['el-3', 'el-4'],
        },
      };

      const result = focusReducer(state, resetFocusEntity());

      expect(result.focusEntity.id).toBeNull();
      expect(result.focusEntity.data).toBeNull();
      expect(result.focusEntity.parentId).toBeNull();
      expect(result.focusEntity.parentType).toBeNull();
      expect(result.focusEntity.childrenIds).toEqual([]);
    });
  });

  describe('Combined Actions', () => {
    it('should handle set and reset workflow', () => {
      let state = initialState;

      const focusEntity = {
        id: 'screen-1',
        kind: ENTITY_KINDS.SCREEN,
        type: 'home',
        data: { name: 'Home Screen' },
        parentId: null,
        parentType: null,
        childrenIds: [],
      };

      state = focusReducer(state, setFocusEntity(focusEntity));
      expect(state.focusEntity.id).toBe('screen-1');

      state = focusReducer(state, resetFocusEntity());
      expect(state.focusEntity.id).toBeNull();
    });

    it('should handle multiple set operations', () => {
      let state = initialState;

      const focusEntity1 = {
        id: 'screen-1',
        kind: ENTITY_KINDS.SCREEN,
        type: 'home',
        data: null,
        parentId: null,
        parentType: null,
        childrenIds: [],
      };

      const focusEntity2 = {
        id: 'el-1',
        kind: ENTITY_KINDS.ELEMENT,
        type: 'button',
        data: null,
        parentId: 'screen-1',
        parentType: ENTITY_KINDS.SCREEN,
        childrenIds: [],
      };

      state = focusReducer(state, setFocusEntity(focusEntity1));
      expect(state.focusEntity.id).toBe('screen-1');

      state = focusReducer(state, setFocusEntity(focusEntity2));
      expect(state.focusEntity.id).toBe('el-1');
      expect(state.focusEntity.kind).toBe(ENTITY_KINDS.ELEMENT);
    });

    it('should handle set, reset, set workflow', () => {
      let state = initialState;

      const focusEntity1 = {
        id: 'screen-1',
        kind: ENTITY_KINDS.SCREEN,
        type: 'home',
        data: null,
        parentId: null,
        parentType: null,
        childrenIds: [],
      };

      const focusEntity2 = {
        id: 'el-1',
        kind: ENTITY_KINDS.ELEMENT,
        type: 'button',
        data: null,
        parentId: null,
        parentType: null,
        childrenIds: [],
      };

      state = focusReducer(state, setFocusEntity(focusEntity1));
      expect(state.focusEntity.id).toBe('screen-1');

      state = focusReducer(state, resetFocusEntity());
      expect(state.focusEntity.id).toBeNull();

      state = focusReducer(state, setFocusEntity(focusEntity2));
      expect(state.focusEntity.id).toBe('el-1');
    });
  });

  describe('State Immutability', () => {
    it('should not mutate original state when setting focus entity', () => {
      const state = {
        focusEntity: {
          id: 'screen-1',
          kind: ENTITY_KINDS.SCREEN,
          type: 'home',
          data: null,
          parentId: null,
          parentType: null,
          childrenIds: [],
        },
      };

      const originalState = JSON.parse(JSON.stringify(state));

      const newFocusEntity = {
        id: 'el-1',
        kind: ENTITY_KINDS.ELEMENT,
        type: 'button',
        data: null,
        parentId: null,
        parentType: null,
        childrenIds: [],
      };

      focusReducer(state, setFocusEntity(newFocusEntity));

      expect(state).toEqual(originalState);
    });

    it('should not mutate original state when resetting focus entity', () => {
      const state = {
        focusEntity: {
          id: 'screen-1',
          kind: ENTITY_KINDS.SCREEN,
          type: 'home',
          data: null,
          parentId: null,
          parentType: null,
          childrenIds: [],
        },
      };

      const originalState = JSON.parse(JSON.stringify(state));

      focusReducer(state, resetFocusEntity());

      expect(state).toEqual(originalState);
    });
  });

  describe('Edge Cases', () => {
    it('should handle focus entity with complex nested data', () => {
      const focusEntity = {
        id: 'comp-1',
        kind: ENTITY_KINDS.COMPONENT,
        type: 'complex',
        data: {
          name: 'ComplexComponent',
          props: { color: 'blue', size: 'large' },
          variants: ['default', 'hover', 'active'],
          metadata: { created: '2024-01-01', modified: '2024-01-02' },
        },
        parentId: 'screen-1',
        parentType: ENTITY_KINDS.SCREEN,
        childrenIds: ['el-1', 'el-2', 'el-3'],
      };

      const result = focusReducer(initialState, setFocusEntity(focusEntity));

      expect(result.focusEntity.data.props).toEqual({ color: 'blue', size: 'large' });
      expect(result.focusEntity.data.variants).toHaveLength(3);
    });

    it('should handle focus entity with empty childrenIds after having children', () => {
      const state = {
        focusEntity: {
          id: 'screen-1',
          kind: ENTITY_KINDS.SCREEN,
          type: 'home',
          data: null,
          parentId: null,
          parentType: null,
          childrenIds: ['el-1', 'el-2', 'el-3'],
        },
      };

      const newFocusEntity = {
        id: 'screen-1',
        kind: ENTITY_KINDS.SCREEN,
        type: 'home',
        data: null,
        parentId: null,
        parentType: null,
        childrenIds: [],
      };

      const result = focusReducer(state, setFocusEntity(newFocusEntity));

      expect(result.focusEntity.childrenIds).toEqual([]);
    });
  });
});

