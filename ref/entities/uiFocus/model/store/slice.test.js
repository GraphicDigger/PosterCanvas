// ===================================================================
// Unit Tests for UIFocus Slice
// CRITICAL BUSINESS LOGIC - Focus Management System
// Phase 1, Day 5 - Part 1 (30 tests)
// ===================================================================

import { describe, it, expect, beforeEach, vi } from 'vitest';

// Mock constants
vi.mock('../../../../shared/constants', () => ({
  ENTITY_KINDS: {
    SCREEN: 'screen',
    COMPONENT: 'component',
    ELEMENT: 'element',
    INSTANCE: 'instance',
  },
}));

import focusSystemSlice, {
  setFocusEntity,
  resetFocusEntity,
} from './slice';

describe('UIFocus Slice', () => {
  let initialState;

  beforeEach(() => {
    initialState = {
      focusEntity: {
        id: null,
        kind: 'screen',
        type: null,
        data: null,
        parentId: null,
        parentType: null,
        childrenIds: [],
      },
    };
  });

  // ===================================================================
  // PART 1: Set Focus Entity (15 tests)
  // ===================================================================

  describe('Set Focus Entity', () => {
    it('should set focus entity with all properties', () => {
      const focusEntity = {
        id: 'elem-1',
        kind: 'element',
        type: 'button',
        data: { label: 'Click me' },
        parentId: 'comp-1',
        parentType: 'component',
        childrenIds: [],
      };

      const state = focusSystemSlice(initialState, setFocusEntity(focusEntity));

      expect(state.focusEntity).toEqual(focusEntity);
    });

    it('should set focus entity for screen', () => {
      const focusEntity = {
        id: 'screen-1',
        kind: 'screen',
        type: null,
        data: null,
        parentId: null,
        parentType: null,
        childrenIds: ['comp-1', 'comp-2'],
      };

      const state = focusSystemSlice(initialState, setFocusEntity(focusEntity));

      expect(state.focusEntity.id).toBe('screen-1');
      expect(state.focusEntity.kind).toBe('screen');
      expect(state.focusEntity.childrenIds).toEqual(['comp-1', 'comp-2']);
    });

    it('should set focus entity for component', () => {
      const focusEntity = {
        id: 'comp-1',
        kind: 'component',
        type: 'Button',
        data: { variant: 'primary' },
        parentId: 'screen-1',
        parentType: 'screen',
        childrenIds: ['elem-1', 'elem-2'],
      };

      const state = focusSystemSlice(initialState, setFocusEntity(focusEntity));

      expect(state.focusEntity.kind).toBe('component');
      expect(state.focusEntity.type).toBe('Button');
      expect(state.focusEntity.parentId).toBe('screen-1');
    });

    it('should set focus entity for element', () => {
      const focusEntity = {
        id: 'elem-1',
        kind: 'element',
        type: 'div',
        data: { className: 'container' },
        parentId: 'comp-1',
        parentType: 'component',
        childrenIds: [],
      };

      const state = focusSystemSlice(initialState, setFocusEntity(focusEntity));

      expect(state.focusEntity.kind).toBe('element');
      expect(state.focusEntity.type).toBe('div');
    });

    it('should set focus entity for instance', () => {
      const focusEntity = {
        id: 'inst-1',
        kind: 'instance',
        type: 'ButtonInstance',
        data: { componentId: 'comp-1' },
        parentId: 'screen-1',
        parentType: 'screen',
        childrenIds: [],
      };

      const state = focusSystemSlice(initialState, setFocusEntity(focusEntity));

      expect(state.focusEntity.kind).toBe('instance');
      expect(state.focusEntity.data.componentId).toBe('comp-1');
    });

    it('should replace previous focus entity', () => {
      initialState.focusEntity = {
        id: 'old-elem',
        kind: 'element',
        type: 'button',
        data: null,
        parentId: null,
        parentType: null,
        childrenIds: [],
      };

      const newFocusEntity = {
        id: 'new-elem',
        kind: 'element',
        type: 'input',
        data: null,
        parentId: null,
        parentType: null,
        childrenIds: [],
      };

      const state = focusSystemSlice(initialState, setFocusEntity(newFocusEntity));

      expect(state.focusEntity.id).toBe('new-elem');
      expect(state.focusEntity.type).toBe('input');
    });

    it('should set focus entity with complex data', () => {
      const focusEntity = {
        id: 'comp-1',
        kind: 'component',
        type: 'Form',
        data: {
          fields: ['name', 'email', 'message'],
          validation: { required: true },
          onSubmit: 'handleSubmit',
        },
        parentId: 'screen-1',
        parentType: 'screen',
        childrenIds: ['field-1', 'field-2', 'field-3'],
      };

      const state = focusSystemSlice(initialState, setFocusEntity(focusEntity));

      expect(state.focusEntity.data.fields).toEqual(['name', 'email', 'message']);
      expect(state.focusEntity.data.validation).toEqual({ required: true });
    });

    it('should set focus entity with null values', () => {
      const focusEntity = {
        id: 'elem-1',
        kind: 'element',
        type: null,
        data: null,
        parentId: null,
        parentType: null,
        childrenIds: [],
      };

      const state = focusSystemSlice(initialState, setFocusEntity(focusEntity));

      expect(state.focusEntity.type).toBeNull();
      expect(state.focusEntity.data).toBeNull();
      expect(state.focusEntity.parentId).toBeNull();
    });

    it('should set focus entity with empty childrenIds', () => {
      const focusEntity = {
        id: 'elem-1',
        kind: 'element',
        type: 'button',
        data: null,
        parentId: null,
        parentType: null,
        childrenIds: [],
      };

      const state = focusSystemSlice(initialState, setFocusEntity(focusEntity));

      expect(state.focusEntity.childrenIds).toEqual([]);
    });

    it('should set focus entity with multiple children', () => {
      const focusEntity = {
        id: 'comp-1',
        kind: 'component',
        type: 'Container',
        data: null,
        parentId: null,
        parentType: null,
        childrenIds: ['elem-1', 'elem-2', 'elem-3', 'elem-4'],
      };

      const state = focusSystemSlice(initialState, setFocusEntity(focusEntity));

      expect(state.focusEntity.childrenIds).toHaveLength(4);
      expect(state.focusEntity.childrenIds).toEqual(['elem-1', 'elem-2', 'elem-3', 'elem-4']);
    });

    it('should set focus entity with minimal properties', () => {
      const focusEntity = {
        id: 'elem-1',
        kind: 'element',
      };

      const state = focusSystemSlice(initialState, setFocusEntity(focusEntity));

      expect(state.focusEntity.id).toBe('elem-1');
      expect(state.focusEntity.kind).toBe('element');
    });

    it('should handle setting focus multiple times', () => {
      let state = focusSystemSlice(
        initialState,
        setFocusEntity({ id: 'first', kind: 'element', childrenIds: [] }),
      );
      state = focusSystemSlice(
        state,
        setFocusEntity({ id: 'second', kind: 'component', childrenIds: [] }),
      );
      state = focusSystemSlice(
        state,
        setFocusEntity({ id: 'third', kind: 'screen', childrenIds: [] }),
      );

      expect(state.focusEntity.id).toBe('third');
      expect(state.focusEntity.kind).toBe('screen');
    });

    it('should set focus entity with nested parent structure', () => {
      const focusEntity = {
        id: 'elem-deep',
        kind: 'element',
        type: 'span',
        data: { level: 3 },
        parentId: 'elem-parent',
        parentType: 'element',
        childrenIds: [],
      };

      const state = focusSystemSlice(initialState, setFocusEntity(focusEntity));

      expect(state.focusEntity.parentId).toBe('elem-parent');
      expect(state.focusEntity.parentType).toBe('element');
    });

    it('should set focus entity with custom type', () => {
      const focusEntity = {
        id: 'custom-1',
        kind: 'component',
        type: 'CustomWidget',
        data: { customProp: 'value' },
        parentId: null,
        parentType: null,
        childrenIds: [],
      };

      const state = focusSystemSlice(initialState, setFocusEntity(focusEntity));

      expect(state.focusEntity.type).toBe('CustomWidget');
      expect(state.focusEntity.data.customProp).toBe('value');
    });

    it('should set focus entity and preserve all structure', () => {
      const focusEntity = {
        id: 'complex',
        kind: 'component',
        type: 'DataGrid',
        data: {
          columns: [{ field: 'name', width: 200 }],
          rows: 100,
          pagination: true,
        },
        parentId: 'screen-main',
        parentType: 'screen',
        childrenIds: ['cell-1', 'cell-2'],
      };

      const state = focusSystemSlice(initialState, setFocusEntity(focusEntity));

      expect(state.focusEntity).toEqual(focusEntity);
    });
  });

  // ===================================================================
  // PART 2: Reset Focus Entity (10 tests)
  // ===================================================================

  describe('Reset Focus Entity', () => {
    it('should reset focus entity to initial state', () => {
      initialState.focusEntity = {
        id: 'elem-1',
        kind: 'element',
        type: 'button',
        data: { label: 'Click' },
        parentId: 'comp-1',
        parentType: 'component',
        childrenIds: [],
      };

      const state = focusSystemSlice(initialState, resetFocusEntity());

      expect(state.focusEntity.id).toBeNull();
      expect(state.focusEntity.kind).toBe('screen');
      expect(state.focusEntity.type).toBeNull();
      expect(state.focusEntity.data).toBeNull();
      expect(state.focusEntity.parentId).toBeNull();
      expect(state.focusEntity.parentType).toBeNull();
      expect(state.focusEntity.childrenIds).toEqual([]);
    });

    it('should reset focus entity when already null', () => {
      const state = focusSystemSlice(initialState, resetFocusEntity());

      expect(state.focusEntity).toEqual(initialState.focusEntity);
    });

    it('should reset focus entity after setting', () => {
      let state = focusSystemSlice(
        initialState,
        setFocusEntity({
          id: 'elem-1',
          kind: 'element',
          type: 'button',
          data: null,
          parentId: null,
          parentType: null,
          childrenIds: [],
        }),
      );

      state = focusSystemSlice(state, resetFocusEntity());

      expect(state.focusEntity.id).toBeNull();
      expect(state.focusEntity.kind).toBe('screen');
    });

    it('should reset focus entity with complex data', () => {
      initialState.focusEntity = {
        id: 'comp-complex',
        kind: 'component',
        type: 'Form',
        data: {
          fields: ['name', 'email'],
          validation: { required: true },
        },
        parentId: 'screen-1',
        parentType: 'screen',
        childrenIds: ['field-1', 'field-2'],
      };

      const state = focusSystemSlice(initialState, resetFocusEntity());

      expect(state.focusEntity.data).toBeNull();
      expect(state.focusEntity.childrenIds).toEqual([]);
    });

    it('should reset focus entity multiple times', () => {
      let state = focusSystemSlice(initialState, resetFocusEntity());
      state = focusSystemSlice(state, resetFocusEntity());
      state = focusSystemSlice(state, resetFocusEntity());

      expect(state.focusEntity.id).toBeNull();
    });

    it('should reset after multiple focus changes', () => {
      let state = focusSystemSlice(
        initialState,
        setFocusEntity({ id: 'first', kind: 'element', childrenIds: [] }),
      );
      state = focusSystemSlice(
        state,
        setFocusEntity({ id: 'second', kind: 'component', childrenIds: [] }),
      );
      state = focusSystemSlice(state, resetFocusEntity());

      expect(state.focusEntity.id).toBeNull();
    });

    it('should reset focus entity and allow setting again', () => {
      let state = focusSystemSlice(
        initialState,
        setFocusEntity({ id: 'first', kind: 'element', childrenIds: [] }),
      );
      state = focusSystemSlice(state, resetFocusEntity());
      state = focusSystemSlice(
        state,
        setFocusEntity({ id: 'second', kind: 'component', childrenIds: [] }),
      );

      expect(state.focusEntity.id).toBe('second');
      expect(state.focusEntity.kind).toBe('component');
    });

    it('should reset all focus entity properties', () => {
      initialState.focusEntity = {
        id: 'test',
        kind: 'element',
        type: 'button',
        data: { test: 'data' },
        parentId: 'parent',
        parentType: 'component',
        childrenIds: ['child1', 'child2'],
      };

      const state = focusSystemSlice(initialState, resetFocusEntity());

      expect(state.focusEntity.id).toBeNull();
      expect(state.focusEntity.kind).toBe('screen');
      expect(state.focusEntity.type).toBeNull();
      expect(state.focusEntity.data).toBeNull();
      expect(state.focusEntity.parentId).toBeNull();
      expect(state.focusEntity.parentType).toBeNull();
      expect(state.focusEntity.childrenIds).toEqual([]);
    });

    it('should maintain consistent structure after reset', () => {
      const state = focusSystemSlice(initialState, resetFocusEntity());

      expect(state.focusEntity).toHaveProperty('id');
      expect(state.focusEntity).toHaveProperty('kind');
      expect(state.focusEntity).toHaveProperty('type');
      expect(state.focusEntity).toHaveProperty('data');
      expect(state.focusEntity).toHaveProperty('parentId');
      expect(state.focusEntity).toHaveProperty('parentType');
      expect(state.focusEntity).toHaveProperty('childrenIds');
    });

    it('should reset to screen kind by default', () => {
      initialState.focusEntity.kind = 'component';

      const state = focusSystemSlice(initialState, resetFocusEntity());

      expect(state.focusEntity.kind).toBe('screen');
    });
  });

  // ===================================================================
  // PART 3: Integration Scenarios (5 tests)
  // ===================================================================

  describe('Integration Scenarios', () => {
    it('should handle set and reset in sequence', () => {
      let state = focusSystemSlice(
        initialState,
        setFocusEntity({
          id: 'elem-1',
          kind: 'element',
          type: 'button',
          data: null,
          parentId: null,
          parentType: null,
          childrenIds: [],
        }),
      );

      expect(state.focusEntity.id).toBe('elem-1');

      state = focusSystemSlice(state, resetFocusEntity());

      expect(state.focusEntity.id).toBeNull();
    });

    it('should handle rapid focus changes', () => {
      let state = initialState;

      for (let i = 0; i < 10; i++) {
        state = focusSystemSlice(
          state,
          setFocusEntity({
            id: `elem-${i}`,
            kind: 'element',
            childrenIds: [],
          }),
        );
      }

      expect(state.focusEntity.id).toBe('elem-9');
    });

    it('should handle alternating set and reset', () => {
      let state = focusSystemSlice(
        initialState,
        setFocusEntity({ id: 'elem-1', kind: 'element', childrenIds: [] }),
      );
      state = focusSystemSlice(state, resetFocusEntity());
      state = focusSystemSlice(
        state,
        setFocusEntity({ id: 'elem-2', kind: 'component', childrenIds: [] }),
      );
      state = focusSystemSlice(state, resetFocusEntity());

      expect(state.focusEntity.id).toBeNull();
    });

    it('should maintain focus entity structure through operations', () => {
      const state = focusSystemSlice(
        initialState,
        setFocusEntity({
          id: 'complex',
          kind: 'component',
          type: 'Widget',
          data: { config: 'value' },
          parentId: 'screen-1',
          parentType: 'screen',
          childrenIds: ['child-1'],
        }),
      );

      expect(state.focusEntity).toHaveProperty('id');
      expect(state.focusEntity).toHaveProperty('kind');
      expect(state.focusEntity).toHaveProperty('type');
      expect(state.focusEntity).toHaveProperty('data');
      expect(state.focusEntity).toHaveProperty('parentId');
      expect(state.focusEntity).toHaveProperty('parentType');
      expect(state.focusEntity).toHaveProperty('childrenIds');
    });

    it('should handle focus navigation pattern', () => {
      // Simulate navigating through a component tree
      let state = focusSystemSlice(
        initialState,
        setFocusEntity({ id: 'screen-1', kind: 'screen', childrenIds: ['comp-1'] }),
      );
      state = focusSystemSlice(
        state,
        setFocusEntity({
          id: 'comp-1',
          kind: 'component',
          parentId: 'screen-1',
          childrenIds: ['elem-1'],
        }),
      );
      state = focusSystemSlice(
        state,
        setFocusEntity({
          id: 'elem-1',
          kind: 'element',
          parentId: 'comp-1',
          childrenIds: [],
        }),
      );

      expect(state.focusEntity.id).toBe('elem-1');
      expect(state.focusEntity.parentId).toBe('comp-1');
    });
  });
});
