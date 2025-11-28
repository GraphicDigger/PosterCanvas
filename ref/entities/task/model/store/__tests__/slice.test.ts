// ===================================================================
// Unit Tests for task Redux Slice
// Coverage Target: 100%
// Phase 1 - Redux Slices (HIGH IMPACT - 41 lines, 6-7x efficiency)
// Risk: LOW (Redux Toolkit with Entity Adapter, predictable state management)
// ===================================================================

import { describe, it, expect, beforeEach } from 'vitest';
import reducer, {
  setTasks,
  setHoveredTaskId,
  setFocusedTaskId,
  setSelectedTaskId,
  resetSelectedTask,
  addTask,
  updateTask,
  removeTask,
} from '../slice';

describe('task Redux Slice', () => {
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
    describe('setHoveredTaskId', () => {
      it('should set hovered task ID', () => {
        const state = reducer(initialState, setHoveredTaskId({ id: 'task-1' }));

        expect(state.hoveredId).toBe('task-1');
      });

      it('should update hovered task ID', () => {
        const stateWithHover = {
          ...initialState,
          hoveredId: 'task-1',
        };

        const state = reducer(stateWithHover, setHoveredTaskId({ id: 'task-2' }));

        expect(state.hoveredId).toBe('task-2');
      });

      it('should handle null ID', () => {
        const stateWithHover = {
          ...initialState,
          hoveredId: 'task-1',
        };

        const state = reducer(stateWithHover, setHoveredTaskId({ id: null }));

        expect(state.hoveredId).toBeNull();
      });
    });

    describe('setFocusedTaskId', () => {
      it('should set focused task ID', () => {
        const state = reducer(initialState, setFocusedTaskId({ id: 'task-1' }));

        expect(state.focusedId).toBe('task-1');
      });

      it('should update focused task ID', () => {
        const stateWithFocus = {
          ...initialState,
          focusedId: 'task-1',
        };

        const state = reducer(stateWithFocus, setFocusedTaskId({ id: 'task-2' }));

        expect(state.focusedId).toBe('task-2');
      });

      it('should handle null ID', () => {
        const stateWithFocus = {
          ...initialState,
          focusedId: 'task-1',
        };

        const state = reducer(stateWithFocus, setFocusedTaskId({ id: null }));

        expect(state.focusedId).toBeNull();
      });
    });

    describe('setSelectedTaskId', () => {
      it('should set selected task ID', () => {
        const state = reducer(initialState, setSelectedTaskId({ id: 'task-1' }));

        expect(state.selectedId).toBe('task-1');
      });

      it('should update selected task ID', () => {
        const stateWithSelection = {
          ...initialState,
          selectedId: 'task-1',
        };

        const state = reducer(stateWithSelection, setSelectedTaskId({ id: 'task-2' }));

        expect(state.selectedId).toBe('task-2');
      });

      it('should handle null ID', () => {
        const stateWithSelection = {
          ...initialState,
          selectedId: 'task-1',
        };

        const state = reducer(stateWithSelection, setSelectedTaskId({ id: null }));

        expect(state.selectedId).toBeNull();
      });
    });

    describe('resetSelectedTask', () => {
      it('should reset selected task to null', () => {
        const stateWithSelection = {
          ...initialState,
          selectedId: 'task-1',
        };

        const state = reducer(stateWithSelection, resetSelectedTask());

        expect(state.selectedId).toBeNull();
      });

      it('should not affect other UI states', () => {
        const stateWithUI = {
          ...initialState,
          hoveredId: 'task-1',
          focusedId: 'task-2',
          selectedId: 'task-3',
        };

        const state = reducer(stateWithUI, resetSelectedTask());

        expect(state.selectedId).toBeNull();
        expect(state.hoveredId).toBe('task-1');
        expect(state.focusedId).toBe('task-2');
      });
    });
  });

  describe('Query Actions', () => {
    describe('setTasks', () => {
      it('should set tasks from array', () => {
        const tasks = [
          { id: 't1', title: 'Task 1', status: 'todo' },
          { id: 't2', title: 'Task 2', status: 'in-progress' },
        ];

        const state = reducer(initialState, setTasks(tasks));

        expect(state.ids).toEqual(['t1', 't2']);
        expect(state.entities.t1).toEqual(tasks[0]);
        expect(state.entities.t2).toEqual(tasks[1]);
      });

      it('should replace existing tasks', () => {
        const stateWithTasks = {
          ...initialState,
          ids: ['old1'],
          entities: { old1: { id: 'old1', title: 'Old' } },
        };

        const newTasks = [
          { id: 'new1', title: 'New 1' },
          { id: 'new2', title: 'New 2' },
        ];

        const state = reducer(stateWithTasks, setTasks(newTasks));

        expect(state.ids).toEqual(['new1', 'new2']);
        expect(state.entities.old1).toBeUndefined();
        expect(state.entities.new1).toEqual(newTasks[0]);
      });

      it('should handle empty array', () => {
        const stateWithTasks = {
          ...initialState,
          ids: ['t1'],
          entities: { t1: { id: 't1', title: 'Task' } },
        };

        const state = reducer(stateWithTasks, setTasks([]));

        expect(state.ids).toEqual([]);
        expect(state.entities).toEqual({});
      });

      it('should preserve UI state when setting tasks', () => {
        const stateWithUI = {
          ...initialState,
          hoveredId: 'hover-1',
          focusedId: 'focus-1',
          selectedId: 'select-1',
        };

        const tasks = [{ id: 't1', title: 'Task' }];

        const state = reducer(stateWithUI, setTasks(tasks));

        expect(state.hoveredId).toBe('hover-1');
        expect(state.focusedId).toBe('focus-1');
        expect(state.selectedId).toBe('select-1');
      });
    });
  });

  describe('Mutation Actions', () => {
    describe('addTask', () => {
      it('should add new task', () => {
        const task = { id: 't1', title: 'New Task', status: 'todo' };

        const state = reducer(initialState, addTask(task));

        expect(state.ids).toContain('t1');
        expect(state.entities.t1).toEqual(task);
      });

      it('should add multiple tasks', () => {
        let state = initialState;

        state = reducer(state, addTask({ id: 't1', title: 'Task 1' }));
        state = reducer(state, addTask({ id: 't2', title: 'Task 2' }));

        expect(state.ids).toEqual(['t1', 't2']);
        expect(Object.keys(state.entities)).toHaveLength(2);
      });

      it('should not duplicate task if ID already exists', () => {
        const stateWithTask = {
          ...initialState,
          ids: ['t1'],
          entities: { t1: { id: 't1', title: 'Original' } },
        };

        const state = reducer(stateWithTask, addTask({ id: 't1', title: 'Updated' }));

        expect(state.ids.filter((id: string) => id === 't1')).toHaveLength(1);
      });
    });

    describe('updateTask', () => {
      it('should update existing task', () => {
        const stateWithTask = {
          ...initialState,
          ids: ['t1'],
          entities: {
            t1: { id: 't1', title: 'Old Title', status: 'todo' },
          },
        };

        const state = reducer(
          stateWithTask,
          updateTask({ id: 't1', title: 'New Title', status: 'done' }),
        );

        expect(state.entities.t1.title).toBe('New Title');
        expect(state.entities.t1.status).toBe('done');
      });

      it('should not update non-existent task', () => {
        const state = reducer(
          initialState,
          updateTask({ id: 'non-existent', title: 'Test' }),
        );

        expect(state.entities['non-existent']).toBeUndefined();
      });

      it('should merge update with existing data', () => {
        const stateWithTask = {
          ...initialState,
          ids: ['t1'],
          entities: {
            t1: { id: 't1', title: 'Title', status: 'todo', assignee: 'user1' },
          },
        };

        const state = reducer(
          stateWithTask,
          updateTask({ id: 't1', status: 'in-progress' }),
        );

        expect(state.entities.t1.title).toBe('Title');
        expect(state.entities.t1.status).toBe('in-progress');
        expect(state.entities.t1.assignee).toBe('user1');
      });
    });

    describe('removeTask', () => {
      it('should remove task from entities and ids', () => {
        const stateWithTasks = {
          ...initialState,
          ids: ['t1', 't2'],
          entities: {
            t1: { id: 't1', title: 'Task 1' },
            t2: { id: 't2', title: 'Task 2' },
          },
        };

        const state = reducer(stateWithTasks, removeTask('t1'));

        expect(state.ids).toEqual(['t2']);
        expect(state.entities.t1).toBeUndefined();
        expect(state.entities.t2).toBeDefined();
      });

      it('should handle removing non-existent task', () => {
        const state = reducer(initialState, removeTask('non-existent'));

        expect(state.ids).toEqual([]);
        expect(state.entities).toEqual({});
      });

      it('should not affect other tasks', () => {
        const stateWithTasks = {
          ...initialState,
          ids: ['t1', 't2', 't3'],
          entities: {
            t1: { id: 't1' },
            t2: { id: 't2' },
            t3: { id: 't3' },
          },
        };

        const state = reducer(stateWithTasks, removeTask('t2'));

        expect(state.ids).toEqual(['t1', 't3']);
        expect(state.entities.t1).toBeDefined();
        expect(state.entities.t3).toBeDefined();
      });

      it('should preserve UI state when removing task', () => {
        const stateWithUI = {
          ...initialState,
          ids: ['t1'],
          entities: { t1: { id: 't1' } },
          hoveredId: 'hover-1',
          focusedId: 'focus-1',
          selectedId: 'select-1',
        };

        const state = reducer(stateWithUI, removeTask('t1'));

        expect(state.hoveredId).toBe('hover-1');
        expect(state.focusedId).toBe('focus-1');
        expect(state.selectedId).toBe('select-1');
      });
    });
  });

  describe('Complex Scenarios', () => {
    it('should handle full task lifecycle', () => {
      let state = initialState;

      // Add task
      state = reducer(state, addTask({ id: 't1', title: 'Task 1', status: 'todo' }));
      expect(state.ids).toContain('t1');

      // Select task
      state = reducer(state, setSelectedTaskId({ id: 't1' }));
      expect(state.selectedId).toBe('t1');

      // Update task status
      state = reducer(state, updateTask({ id: 't1', status: 'in-progress' }));
      expect(state.entities.t1.status).toBe('in-progress');

      // Complete task
      state = reducer(state, updateTask({ id: 't1', status: 'done' }));
      expect(state.entities.t1.status).toBe('done');

      // Remove task
      state = reducer(state, removeTask('t1'));
      expect(state.entities.t1).toBeUndefined();
    });

    it('should handle multiple tasks with different UI states', () => {
      let state = initialState;

      state = reducer(state, setTasks([
        { id: 't1', title: 'Task 1', status: 'todo' },
        { id: 't2', title: 'Task 2', status: 'in-progress' },
        { id: 't3', title: 'Task 3', status: 'done' },
      ]));

      state = reducer(state, setSelectedTaskId({ id: 't1' }));
      state = reducer(state, setFocusedTaskId({ id: 't2' }));
      state = reducer(state, setHoveredTaskId({ id: 't3' }));

      expect(state.selectedId).toBe('t1');
      expect(state.focusedId).toBe('t2');
      expect(state.hoveredId).toBe('t3');
    });

    it('should handle task status workflow', () => {
      let state = initialState;

      // Create task
      state = reducer(state, addTask({ id: 't1', title: 'Implement feature', status: 'todo' }));
      expect(state.entities.t1.status).toBe('todo');

      // Start working
      state = reducer(state, updateTask({ id: 't1', status: 'in-progress' }));
      expect(state.entities.t1.status).toBe('in-progress');

      // Complete
      state = reducer(state, updateTask({ id: 't1', status: 'done' }));
      expect(state.entities.t1.status).toBe('done');
    });

    it('should handle CRUD operations in sequence', () => {
      let state = initialState;

      // Create
      state = reducer(state, addTask({ id: 't1', title: 'Task 1' }));
      state = reducer(state, addTask({ id: 't2', title: 'Task 2' }));
      expect(state.ids).toHaveLength(2);

      // Read (via setTasks)
      state = reducer(state, setTasks([
        { id: 't1', title: 'Task 1 Updated' },
        { id: 't2', title: 'Task 2 Updated' },
        { id: 't3', title: 'Task 3' },
      ]));
      expect(state.ids).toHaveLength(3);

      // Update
      state = reducer(state, updateTask({ id: 't1', title: 'Task 1 Final' }));
      expect(state.entities.t1.title).toBe('Task 1 Final');

      // Delete
      state = reducer(state, removeTask('t2'));
      expect(state.ids).toHaveLength(2);
      expect(state.entities.t2).toBeUndefined();
    });
  });

  describe('Entity Adapter Behavior', () => {
    it('should use normalized state structure', () => {
      const tasks = [
        { id: 't1', title: 'Task 1' },
        { id: 't2', title: 'Task 2' },
      ];

      const state = reducer(initialState, setTasks(tasks));

      expect(state).toHaveProperty('ids');
      expect(state).toHaveProperty('entities');
      expect(Array.isArray(state.ids)).toBe(true);
      expect(typeof state.entities).toBe('object');
    });

    it('should maintain referential integrity', () => {
      const task = {
        id: 't1',
        title: 'Task',
        metadata: { priority: 'high', tags: ['urgent', 'bug'] },
      };

      const state = reducer(initialState, addTask(task));

      expect(state.entities.t1).toEqual(task);
      expect(state.entities.t1.metadata).toEqual({ priority: 'high', tags: ['urgent', 'bug'] });
    });

    it('should handle tasks with complex data', () => {
      const task = {
        id: 't1',
        title: 'Complex Task',
        description: 'Long description...',
        status: 'in-progress',
        assignee: { id: 'user1', name: 'John Doe' },
        metadata: {
          created: '2024-01-01T00:00:00Z',
          dueDate: '2024-01-15T00:00:00Z',
          priority: 'high',
          tags: ['feature', 'frontend'],
          estimatedHours: 8,
        },
      };

      const state = reducer(initialState, addTask(task));

      expect(state.entities.t1).toEqual(task);
    });
  });
});

