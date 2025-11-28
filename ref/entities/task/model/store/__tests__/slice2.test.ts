// ===================================================================
// Unit Tests for Task Slice
// CRITICAL BUSINESS LOGIC - Task State Management
// Phase 1, Day 10 - Part 1 (30 tests) - Push to 65%!
// ===================================================================

import { describe, it, expect, beforeEach, vi } from 'vitest';
import type { TaskState } from '../../../types';

// Mock the adapter
vi.mock('@reduxjs/toolkit', async () => {
  const actual = await vi.importActual('@reduxjs/toolkit');
  return {
    ...actual,
    createEntityAdapter: () => ({
      getInitialState: () => ({ ids: [], entities: {} }),
      addOne: (state: any, entity: any) => {
        state.entities[entity.id] = entity;
        if (!state.ids.includes(entity.id)) {
          state.ids.push(entity.id);
        }
      },
      updateOne: (state: any, update: any) => {
        if (state.entities[update.id]) {
          state.entities[update.id] = { ...state.entities[update.id], ...update.changes };
        }
      },
      removeOne: (state: any, id: any) => {
        delete state.entities[id];
        state.ids = state.ids.filter((existingId: any) => existingId !== id);
      },
      setAll: (state: any, entities: any[]) => {
        state.ids = entities.map((e) => e.id);
        state.entities = entities.reduce((acc, e) => ({ ...acc, [e.id]: e }), {});
      },
    }),
  };
});

import taskEntitySlice, {
  setTasks,
  setHoveredTaskId,
  setFocusedTaskId,
  setSelectedTaskId,
  resetSelectedTask,
  addTask,
  updateTask,
  removeTask,
} from '../slice';

describe('Task Slice', () => {
  let initialState: TaskState;

  beforeEach(() => {
    initialState = {
      ids: [],
      entities: {},
      hoveredId: null,
      focusedId: null,
      selectedId: null,
    };
  });

  // ===================================================================
  // PART 1: UI State Management (4 tests)
  // ===================================================================

  describe('UI State Management', () => {
    it('should set hovered task ID', () => {
      const state = taskEntitySlice(initialState, setHoveredTaskId({ id: 'task-1' } as any));
      expect(state.hoveredId).toBe('task-1');
    });

    it('should set focused task ID', () => {
      const state = taskEntitySlice(initialState, setFocusedTaskId({ id: 'task-2' } as any));
      expect(state.focusedId).toBe('task-2');
    });

    it('should set selected task ID', () => {
      const state = taskEntitySlice(initialState, setSelectedTaskId({ id: 'task-3' } as any));
      expect(state.selectedId).toBe('task-3');
    });

    it('should reset selected task', () => {
      initialState.selectedId = 'task-1';
      const state = taskEntitySlice(initialState, resetSelectedTask());
      expect(state.selectedId).toBeNull();
    });
  });

  // ===================================================================
  // PART 2: Set Tasks (Bulk Load) (6 tests)
  // ===================================================================

  describe('Set Tasks (Bulk Load)', () => {
    it('should set tasks (replace all)', () => {
      const tasks = [
        { id: 'task-1', title: 'Implement feature', status: 'in-progress', assigneeId: 'user-1' },
        { id: 'task-2', title: 'Fix bug', status: 'todo', assigneeId: 'user-2' },
      ];

      const state = taskEntitySlice(initialState, setTasks(tasks));

      expect(state.ids).toEqual(['task-1', 'task-2']);
      expect(Object.keys(state.entities)).toHaveLength(2);
    });

    it('should clear existing tasks when setting new ones', () => {
      initialState.entities['task-old'] = { id: 'task-old', title: 'Old Task' } as any;
      initialState.ids.push('task-old');

      const tasks = [{ id: 'task-new', title: 'New Task', status: 'todo' }];
      const state = taskEntitySlice(initialState, setTasks(tasks));

      expect(state.entities['task-old']).toBeUndefined();
      expect(state.entities['task-new']).toBeDefined();
    });

    it('should handle empty array', () => {
      initialState.entities['task-1'] = { id: 'task-1', title: 'Task' } as any;
      initialState.ids.push('task-1');

      const state = taskEntitySlice(initialState, setTasks([]));

      expect(state.ids).toHaveLength(0);
      expect(Object.keys(state.entities)).toHaveLength(0);
    });

    it('should preserve UI state when setting tasks', () => {
      initialState.selectedId = 'task-selected';

      const tasks = [{ id: 'task-1', title: 'Task', status: 'todo' }];
      const state = taskEntitySlice(initialState, setTasks(tasks));

      expect(state.selectedId).toBe('task-selected');
    });

    it('should handle large number of tasks', () => {
      const tasks = Array.from({ length: 100 }, (_, i) => ({
        id: `task-${i}`,
        title: `Task ${i}`,
        status: 'todo',
      }));

      const state = taskEntitySlice(initialState, setTasks(tasks));

      expect(state.ids).toHaveLength(100);
      expect(Object.keys(state.entities)).toHaveLength(100);
    });

    it('should set tasks with various properties', () => {
      const tasks = [
        {
          id: 'task-1',
          title: 'Implement feature',
          description: 'Add new user authentication',
          status: 'in-progress',
          assigneeId: 'user-1',
          dueDate: '2025-12-31',
        },
      ];

      const state = taskEntitySlice(initialState, setTasks(tasks));

      expect(state.entities['task-1']).toEqual(tasks[0]);
    });
  });

  // ===================================================================
  // PART 3: Add Task (7 tests)
  // ===================================================================

  describe('Add Task', () => {
    it('should add task', () => {
      const task = {
        id: 'task-1',
        title: 'Implement feature',
        status: 'todo',
      };

      const state = taskEntitySlice(initialState, addTask(task));

      expect(state.ids).toContain('task-1');
      expect(state.entities['task-1']).toEqual(task);
    });

    it('should not add duplicate task', () => {
      initialState.entities['task-1'] = { id: 'task-1', title: 'Existing' } as any;
      initialState.ids.push('task-1');

      const task = { id: 'task-1', title: 'Duplicate' };
      const state = taskEntitySlice(initialState, addTask(task));

      expect(state.ids).toHaveLength(1);
    });

    it('should preserve existing tasks when adding new one', () => {
      initialState.entities['task-existing'] = {
        id: 'task-existing',
        title: 'Existing Task',
      } as any;
      initialState.ids.push('task-existing');

      const task = { id: 'task-new', title: 'New Task' };
      const state = taskEntitySlice(initialState, addTask(task));

      expect(state.entities['task-existing']).toBeDefined();
      expect(state.ids).toHaveLength(2);
    });

    it('should not affect UI state when adding task', () => {
      initialState.selectedId = 'task-selected';

      const task = { id: 'task-1', title: 'Task' };
      const state = taskEntitySlice(initialState, addTask(task));

      expect(state.selectedId).toBe('task-selected');
    });

    it('should add task with minimal properties', () => {
      const task = { id: 'task-1' };
      const state = taskEntitySlice(initialState, addTask(task as any));

      expect(state.entities['task-1']).toEqual(task);
    });

    it('should add task with full properties', () => {
      const task = {
        id: 'task-1',
        title: 'Complete testing',
        description: 'Add unit tests for all components',
        status: 'in-progress',
        priority: 'high',
        assigneeId: 'user-1',
        dueDate: '2025-12-31',
        tags: ['testing', 'urgent'],
      };

      const state = taskEntitySlice(initialState, addTask(task as any));

      expect(state.entities['task-1']).toEqual(task);
    });

    it('should maintain insertion order', () => {
      let state = taskEntitySlice(initialState, addTask({ id: 'task-3', title: 'Third' } as any));
      state = taskEntitySlice(state, addTask({ id: 'task-1', title: 'First' } as any));
      state = taskEntitySlice(state, addTask({ id: 'task-2', title: 'Second' } as any));

      expect(state.ids).toEqual(['task-3', 'task-1', 'task-2']);
    });
  });

  // ===================================================================
  // PART 4: Update Task (6 tests)
  // ===================================================================

  describe('Update Task', () => {
    beforeEach(() => {
      initialState.entities['task-1'] = {
        id: 'task-1',
        title: 'Implement feature',
        status: 'todo',
        assigneeId: 'user-1',
      } as any;
      initialState.ids.push('task-1');
    });

    it('should update task properties', () => {
      const state = taskEntitySlice(
        initialState,
        updateTask({
          id: 'task-1',
          title: 'Updated feature',
          status: 'in-progress',
          assigneeId: 'user-2',
        } as any),
      );

      expect(state.entities['task-1'].title).toBe('Updated feature');
      expect(state.entities['task-1'].status).toBe('in-progress');
      expect(state.entities['task-1'].assigneeId).toBe('user-2');
    });

    it('should handle updating non-existent task', () => {
      const state = taskEntitySlice(
        initialState,
        updateTask({
          id: 'non-existent',
          title: 'Ghost',
        } as any),
      );

      expect(state.entities['non-existent']).toBeUndefined();
    });

    it('should update task status', () => {
      const state = taskEntitySlice(
        initialState,
        updateTask({
          id: 'task-1',
          title: 'Implement feature',
          status: 'completed',
          assigneeId: 'user-1',
        } as any),
      );

      expect(state.entities['task-1'].status).toBe('completed');
    });

    it('should not affect other tasks when updating one', () => {
      initialState.entities['task-2'] = {
        id: 'task-2',
        title: 'Other Task',
      } as any;
      initialState.ids.push('task-2');

      const state = taskEntitySlice(
        initialState,
        updateTask({
          id: 'task-1',
          title: 'Updated',
          status: 'todo',
          assigneeId: 'user-1',
        } as any),
      );

      expect(state.entities['task-2']).toEqual({
        id: 'task-2',
        title: 'Other Task',
      });
    });

    it('should not affect UI state when updating task', () => {
      initialState.selectedId = 'task-1';

      const state = taskEntitySlice(
        initialState,
        updateTask({
          id: 'task-1',
          title: 'Updated',
          status: 'todo',
          assigneeId: 'user-1',
        } as any),
      );

      expect(state.selectedId).toBe('task-1');
    });

    it('should handle reassigning task', () => {
      const state = taskEntitySlice(
        initialState,
        updateTask({
          id: 'task-1',
          title: 'Implement feature',
          status: 'in-progress',
          assigneeId: 'user-3',
        } as any),
      );

      expect(state.entities['task-1'].assigneeId).toBe('user-3');
    });
  });

  // ===================================================================
  // PART 5: Remove Task (3 tests)
  // ===================================================================

  describe('Remove Task', () => {
    beforeEach(() => {
      initialState.entities = {
        'task-1': { id: 'task-1', title: 'Task 1' } as any,
        'task-2': { id: 'task-2', title: 'Task 2' } as any,
      };
      initialState.ids = ['task-1', 'task-2'];
    });

    it('should remove task', () => {
      const state = taskEntitySlice(initialState, removeTask('task-1'));

      expect(state.ids).not.toContain('task-1');
      expect(state.entities['task-1']).toBeUndefined();
      expect(state.entities['task-2']).toBeDefined();
    });

    it('should handle removing non-existent task', () => {
      const state = taskEntitySlice(initialState, removeTask('non-existent'));

      expect(state.ids).toHaveLength(2);
    });

    it('should not affect other tasks', () => {
      const state = taskEntitySlice(initialState, removeTask('task-1'));

      expect(state.ids).toContain('task-2');
      expect(state.entities['task-2']).toEqual({
        id: 'task-2',
        title: 'Task 2',
      });
    });
  });

  // ===================================================================
  // PART 6: Integration Scenarios (4 tests)
  // ===================================================================

  describe('Integration Scenarios', () => {
    it('should handle complete task lifecycle', () => {
      let state = taskEntitySlice(
        initialState,
        addTask({
          id: 'task-1',
          title: 'Implement feature',
          status: 'todo',
          assigneeId: 'user-1',
        } as any),
      );
      state = taskEntitySlice(
        state,
        updateTask({
          id: 'task-1',
          title: 'Implement feature',
          status: 'in-progress',
          assigneeId: 'user-1',
        } as any),
      );
      state = taskEntitySlice(
        state,
        updateTask({
          id: 'task-1',
          title: 'Implement feature',
          status: 'completed',
          assigneeId: 'user-1',
        } as any),
      );
      state = taskEntitySlice(state, setSelectedTaskId({ id: 'task-1' } as any));
      state = taskEntitySlice(state, removeTask('task-1'));

      expect(state.ids).not.toContain('task-1');
      expect(state.selectedId).toBe('task-1'); // Still selected
    });

    it('should maintain data integrity across operations', () => {
      const tasks = [
        { id: 'task-1', title: 'Task 1', status: 'todo' },
        { id: 'task-2', title: 'Task 2', status: 'todo' },
      ];

      let state = taskEntitySlice(initialState, setTasks(tasks));
      state = taskEntitySlice(state, addTask({ id: 'task-3', title: 'Task 3', status: 'todo' } as any));
      state = taskEntitySlice(
        state,
        updateTask({
          id: 'task-1',
          title: 'Updated Task 1',
          status: 'completed',
        } as any),
      );

      expect(state.ids).toHaveLength(3);
      expect(state.entities['task-1'].title).toBe('Updated Task 1');
      expect(state.entities['task-1'].status).toBe('completed');
      expect(state.entities['task-3']).toBeDefined();
    });

    it('should handle UI state changes with task operations', () => {
      let state = taskEntitySlice(
        initialState,
        addTask({ id: 'task-1', title: 'Task', status: 'todo' } as any),
      );
      state = taskEntitySlice(state, setHoveredTaskId({ id: 'task-1' } as any));
      state = taskEntitySlice(state, setFocusedTaskId({ id: 'task-1' } as any));
      state = taskEntitySlice(state, setSelectedTaskId({ id: 'task-1' } as any));
      state = taskEntitySlice(
        state,
        updateTask({
          id: 'task-1',
          title: 'Updated',
          status: 'in-progress',
        } as any),
      );

      expect(state.hoveredId).toBe('task-1');
      expect(state.focusedId).toBe('task-1');
      expect(state.selectedId).toBe('task-1');
      expect(state.entities['task-1'].title).toBe('Updated');
      expect(state.entities['task-1'].status).toBe('in-progress');
    });

    it('should handle task workflow transitions', () => {
      let state = taskEntitySlice(
        initialState,
        addTask({
          id: 'task-1',
          title: 'Feature',
          status: 'todo',
          assigneeId: 'user-1',
        } as any),
      );

      // Move to in-progress
      state = taskEntitySlice(
        state,
        updateTask({
          id: 'task-1',
          title: 'Feature',
          status: 'in-progress',
          assigneeId: 'user-1',
        } as any),
      );
      expect(state.entities['task-1'].status).toBe('in-progress');

      // Complete task
      state = taskEntitySlice(
        state,
        updateTask({
          id: 'task-1',
          title: 'Feature',
          status: 'completed',
          assigneeId: 'user-1',
        } as any),
      );
      expect(state.entities['task-1'].status).toBe('completed');
    });
  });
});

