// ===================================================================
// Unit Tests for taskAssignee Redux Slice
// Coverage Target: 100%
// Phase 1 - Redux Slices (HIGH IMPACT - 41 lines, 6-7x efficiency)
// Risk: LOW (Redux Toolkit with Entity Adapter, predictable state management)
// ===================================================================

import { describe, it, expect, beforeEach } from 'vitest';
import reducer, {
  setTaskAssignees,
  setHoveredTaskAssigneeId,
  setFocusedTaskAssigneeId,
  setSelectedTaskAssigneeId,
  resetSelectedTaskAssignee,
  addTaskAssignee,
  updateTaskAssignee,
  removeTaskAssignee,
} from '../slice';

describe('taskAssignee Redux Slice', () => {
  let initialState: any;

  beforeEach(() => {
    initialState = {
      ids: [],
      entities: {},
      hoveredId: null,
      focusedId: null,
      selectedId: null,
    };
  });

  describe('Initial State', () => {
    it('should return initial state', () => {
      const state = reducer(undefined, { type: '@@INIT' });

      expect(state.ids).toEqual([]);
      expect(state.entities).toEqual({});
      expect(state.hoveredId).toBeNull();
      expect(state.focusedId).toBeNull();
      expect(state.selectedId).toBeNull();
    });
  });

  describe('UI State Actions', () => {
    describe('setHoveredTaskAssigneeId', () => {
      it('should set hovered task assignee ID', () => {
        const state = reducer(initialState, setHoveredTaskAssigneeId({ id: 'ta-1' }));

        expect(state.hoveredId).toBe('ta-1');
      });

      it('should update hovered task assignee ID', () => {
        const stateWithHover = {
          ...initialState,
          hoveredId: 'ta-1',
        };

        const state = reducer(stateWithHover, setHoveredTaskAssigneeId({ id: 'ta-2' }));

        expect(state.hoveredId).toBe('ta-2');
      });

      it('should handle null ID', () => {
        const stateWithHover = {
          ...initialState,
          hoveredId: 'ta-1',
        };

        const state = reducer(stateWithHover, setHoveredTaskAssigneeId({ id: null }));

        expect(state.hoveredId).toBeNull();
      });
    });

    describe('setFocusedTaskAssigneeId', () => {
      it('should set focused task assignee ID', () => {
        const state = reducer(initialState, setFocusedTaskAssigneeId({ id: 'ta-1' }));

        expect(state.focusedId).toBe('ta-1');
      });

      it('should update focused task assignee ID', () => {
        const stateWithFocus = {
          ...initialState,
          focusedId: 'ta-1',
        };

        const state = reducer(stateWithFocus, setFocusedTaskAssigneeId({ id: 'ta-2' }));

        expect(state.focusedId).toBe('ta-2');
      });

      it('should handle null ID', () => {
        const stateWithFocus = {
          ...initialState,
          focusedId: 'ta-1',
        };

        const state = reducer(stateWithFocus, setFocusedTaskAssigneeId({ id: null }));

        expect(state.focusedId).toBeNull();
      });
    });

    describe('setSelectedTaskAssigneeId', () => {
      it('should set selected task assignee ID', () => {
        const state = reducer(initialState, setSelectedTaskAssigneeId({ id: 'ta-1' }));

        expect(state.selectedId).toBe('ta-1');
      });

      it('should update selected task assignee ID', () => {
        const stateWithSelection = {
          ...initialState,
          selectedId: 'ta-1',
        };

        const state = reducer(stateWithSelection, setSelectedTaskAssigneeId({ id: 'ta-2' }));

        expect(state.selectedId).toBe('ta-2');
      });

      it('should handle null ID', () => {
        const stateWithSelection = {
          ...initialState,
          selectedId: 'ta-1',
        };

        const state = reducer(stateWithSelection, setSelectedTaskAssigneeId({ id: null }));

        expect(state.selectedId).toBeNull();
      });
    });

    describe('resetSelectedTaskAssignee', () => {
      it('should reset selected task assignee to null', () => {
        const stateWithSelection = {
          ...initialState,
          selectedId: 'ta-1',
        };

        const state = reducer(stateWithSelection, resetSelectedTaskAssignee());

        expect(state.selectedId).toBeNull();
      });

      it('should not affect other UI states', () => {
        const stateWithUI = {
          ...initialState,
          hoveredId: 'ta-1',
          focusedId: 'ta-2',
          selectedId: 'ta-3',
        };

        const state = reducer(stateWithUI, resetSelectedTaskAssignee());

        expect(state.selectedId).toBeNull();
        expect(state.hoveredId).toBe('ta-1');
        expect(state.focusedId).toBe('ta-2');
      });
    });
  });

  describe('Query Actions', () => {
    describe('setTaskAssignees', () => {
      it('should set task assignees from array', () => {
        const assignees = [
          { id: 'ta1', taskId: 'task-1', userId: 'user-1', role: 'assignee' },
          { id: 'ta2', taskId: 'task-1', userId: 'user-2', role: 'reviewer' },
        ];

        const state = reducer(initialState, setTaskAssignees(assignees));

        expect(state.ids).toEqual(['ta1', 'ta2']);
        expect(state.entities.ta1).toEqual(assignees[0]);
        expect(state.entities.ta2).toEqual(assignees[1]);
      });

      it('should replace existing task assignees', () => {
        const stateWithAssignees = {
          ...initialState,
          ids: ['old1'],
          entities: { old1: { id: 'old1', role: 'old' } },
        };

        const newAssignees = [
          { id: 'new1', role: 'assignee' },
          { id: 'new2', role: 'reviewer' },
        ];

        const state = reducer(stateWithAssignees, setTaskAssignees(newAssignees));

        expect(state.ids).toEqual(['new1', 'new2']);
        expect(state.entities.old1).toBeUndefined();
        expect(state.entities.new1).toEqual(newAssignees[0]);
      });

      it('should handle empty array', () => {
        const stateWithAssignees = {
          ...initialState,
          ids: ['ta1'],
          entities: { ta1: { id: 'ta1', role: 'assignee' } },
        };

        const state = reducer(stateWithAssignees, setTaskAssignees([]));

        expect(state.ids).toEqual([]);
        expect(state.entities).toEqual({});
      });

      it('should preserve UI state when setting task assignees', () => {
        const stateWithUI = {
          ...initialState,
          hoveredId: 'hover-1',
          focusedId: 'focus-1',
          selectedId: 'select-1',
        };

        const assignees = [{ id: 'ta1', role: 'assignee' }];

        const state = reducer(stateWithUI, setTaskAssignees(assignees));

        expect(state.hoveredId).toBe('hover-1');
        expect(state.focusedId).toBe('focus-1');
        expect(state.selectedId).toBe('select-1');
      });
    });
  });

  describe('Mutation Actions', () => {
    describe('addTaskAssignee', () => {
      it('should add new task assignee', () => {
        const assignee = { id: 'ta1', taskId: 'task-1', userId: 'user-1', role: 'assignee' };

        const state = reducer(initialState, addTaskAssignee(assignee));

        expect(state.ids).toContain('ta1');
        expect(state.entities.ta1).toEqual(assignee);
      });

      it('should add multiple task assignees', () => {
        let state = initialState;

        state = reducer(state, addTaskAssignee({ id: 'ta1', role: 'assignee' }));
        state = reducer(state, addTaskAssignee({ id: 'ta2', role: 'reviewer' }));

        expect(state.ids).toEqual(['ta1', 'ta2']);
        expect(Object.keys(state.entities)).toHaveLength(2);
      });

      it('should not duplicate task assignee if ID already exists', () => {
        const stateWithAssignee = {
          ...initialState,
          ids: ['ta1'],
          entities: { ta1: { id: 'ta1', role: 'assignee' } },
        };

        const state = reducer(stateWithAssignee, addTaskAssignee({ id: 'ta1', role: 'reviewer' }));

        expect(state.ids.filter((id: string) => id === 'ta1')).toHaveLength(1);
      });
    });

    describe('updateTaskAssignee', () => {
      it('should update existing task assignee', () => {
        const stateWithAssignee = {
          ...initialState,
          ids: ['ta1'],
          entities: {
            ta1: { id: 'ta1', taskId: 'task-1', userId: 'user-1', role: 'assignee' },
          },
        };

        const state = reducer(
          stateWithAssignee,
          updateTaskAssignee({ id: 'ta1', role: 'reviewer' }),
        );

        expect(state.entities.ta1.role).toBe('reviewer');
        expect(state.entities.ta1.taskId).toBe('task-1');
      });

      it('should not update non-existent task assignee', () => {
        const state = reducer(
          initialState,
          updateTaskAssignee({ id: 'non-existent', role: 'assignee' }),
        );

        expect(state.entities['non-existent']).toBeUndefined();
      });

      it('should merge update with existing data', () => {
        const stateWithAssignee = {
          ...initialState,
          ids: ['ta1'],
          entities: {
            ta1: { id: 'ta1', taskId: 'task-1', userId: 'user-1', role: 'assignee', status: 'active' },
          },
        };

        const state = reducer(
          stateWithAssignee,
          updateTaskAssignee({ id: 'ta1', role: 'reviewer' }),
        );

        expect(state.entities.ta1.role).toBe('reviewer');
        expect(state.entities.ta1.taskId).toBe('task-1');
        expect(state.entities.ta1.status).toBe('active');
      });
    });

    describe('removeTaskAssignee', () => {
      it('should remove task assignee from entities and ids', () => {
        const stateWithAssignees = {
          ...initialState,
          ids: ['ta1', 'ta2'],
          entities: {
            ta1: { id: 'ta1', role: 'assignee' },
            ta2: { id: 'ta2', role: 'reviewer' },
          },
        };

        const state = reducer(stateWithAssignees, removeTaskAssignee('ta1'));

        expect(state.ids).toEqual(['ta2']);
        expect(state.entities.ta1).toBeUndefined();
        expect(state.entities.ta2).toBeDefined();
      });

      it('should handle removing non-existent task assignee', () => {
        const state = reducer(initialState, removeTaskAssignee('non-existent'));

        expect(state.ids).toEqual([]);
        expect(state.entities).toEqual({});
      });

      it('should not affect other task assignees', () => {
        const stateWithAssignees = {
          ...initialState,
          ids: ['ta1', 'ta2', 'ta3'],
          entities: {
            ta1: { id: 'ta1' },
            ta2: { id: 'ta2' },
            ta3: { id: 'ta3' },
          },
        };

        const state = reducer(stateWithAssignees, removeTaskAssignee('ta2'));

        expect(state.ids).toEqual(['ta1', 'ta3']);
        expect(state.entities.ta1).toBeDefined();
        expect(state.entities.ta3).toBeDefined();
      });

      it('should preserve UI state when removing task assignee', () => {
        const stateWithUI = {
          ...initialState,
          ids: ['ta1'],
          entities: { ta1: { id: 'ta1' } },
          hoveredId: 'hover-1',
          focusedId: 'focus-1',
          selectedId: 'select-1',
        };

        const state = reducer(stateWithUI, removeTaskAssignee('ta1'));

        expect(state.hoveredId).toBe('hover-1');
        expect(state.focusedId).toBe('focus-1');
        expect(state.selectedId).toBe('select-1');
      });
    });
  });

  describe('Complex Scenarios', () => {
    it('should handle full task assignee lifecycle', () => {
      let state = initialState;

      // Add task assignee
      state = reducer(state, addTaskAssignee({ id: 'ta1', taskId: 'task-1', userId: 'user-1', role: 'assignee' }));
      expect(state.ids).toContain('ta1');

      // Select task assignee
      state = reducer(state, setSelectedTaskAssigneeId({ id: 'ta1' }));
      expect(state.selectedId).toBe('ta1');

      // Update task assignee role
      state = reducer(state, updateTaskAssignee({ id: 'ta1', role: 'reviewer' }));
      expect(state.entities.ta1.role).toBe('reviewer');

      // Remove task assignee
      state = reducer(state, removeTaskAssignee('ta1'));
      expect(state.entities.ta1).toBeUndefined();
    });

    it('should handle multiple task assignees with different UI states', () => {
      let state = initialState;

      state = reducer(state, setTaskAssignees([
        { id: 'ta1', role: 'assignee' },
        { id: 'ta2', role: 'reviewer' },
        { id: 'ta3', role: 'observer' },
      ]));

      state = reducer(state, setSelectedTaskAssigneeId({ id: 'ta1' }));
      state = reducer(state, setFocusedTaskAssigneeId({ id: 'ta2' }));
      state = reducer(state, setHoveredTaskAssigneeId({ id: 'ta3' }));

      expect(state.selectedId).toBe('ta1');
      expect(state.focusedId).toBe('ta2');
      expect(state.hoveredId).toBe('ta3');
    });

    it('should handle CRUD operations in sequence', () => {
      let state = initialState;

      // Create
      state = reducer(state, addTaskAssignee({ id: 'ta1', role: 'assignee' }));
      state = reducer(state, addTaskAssignee({ id: 'ta2', role: 'reviewer' }));
      expect(state.ids).toHaveLength(2);

      // Read (via setTaskAssignees)
      state = reducer(state, setTaskAssignees([
        { id: 'ta1', role: 'assignee' },
        { id: 'ta2', role: 'reviewer' },
        { id: 'ta3', role: 'observer' },
      ]));
      expect(state.ids).toHaveLength(3);

      // Update
      state = reducer(state, updateTaskAssignee({ id: 'ta1', role: 'lead' }));
      expect(state.entities.ta1.role).toBe('lead');

      // Delete
      state = reducer(state, removeTaskAssignee('ta2'));
      expect(state.ids).toHaveLength(2);
      expect(state.entities.ta2).toBeUndefined();
    });
  });

  describe('Entity Adapter Behavior', () => {
    it('should use normalized state structure', () => {
      const assignees = [
        { id: 'ta1', role: 'assignee' },
        { id: 'ta2', role: 'reviewer' },
      ];

      const state = reducer(initialState, setTaskAssignees(assignees));

      expect(state).toHaveProperty('ids');
      expect(state).toHaveProperty('entities');
      expect(Array.isArray(state.ids)).toBe(true);
      expect(typeof state.entities).toBe('object');
    });

    it('should maintain referential integrity', () => {
      const assignee = {
        id: 'ta1',
        taskId: 'task-1',
        userId: 'user-1',
        role: 'assignee',
        permissions: ['read', 'write'],
      };

      const state = reducer(initialState, addTaskAssignee(assignee));

      expect(state.entities.ta1).toEqual(assignee);
      expect(state.entities.ta1.permissions).toEqual(['read', 'write']);
    });

    it('should handle task assignees with complex data', () => {
      const assignee = {
        id: 'ta1',
        taskId: 'task-123',
        userId: 'user-456',
        role: 'assignee',
        permissions: ['read', 'write', 'comment'],
        metadata: {
          assignedAt: '2024-01-01T00:00:00Z',
          assignedBy: 'user-789',
          status: 'active',
          workload: 8,
          settings: {
            notifications: true,
            priority: 'high',
          },
        },
      };

      const state = reducer(initialState, addTaskAssignee(assignee));

      expect(state.entities.ta1).toEqual(assignee);
    });
  });
});

