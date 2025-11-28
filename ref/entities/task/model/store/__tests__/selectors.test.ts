// ===================================================================
// Unit Tests for Task Entity Redux Selectors
// Coverage Target: 95%+
// Final Push Phase (Selector Testing - CROSSING 2,200!)
// ===================================================================

import { describe, it, expect, vi } from 'vitest';
import type { RootState } from '@/app/store';
import {
  selectTaskState,
  selectTaskEntities,
  selectTaskIds,
  selectHoveredTaskId,
  selectFocusedTaskId,
  selectSelectedTaskId,
  selectTaskCheckStates,
  selectAllTasks,
  selectSelectedTask,
  selectTasksByIds,
  selectTaskById,
} from '../selectors';

// Mock cross-entity selectors
vi.mock('../@x/actorMember', () => ({
  selectMembersById: vi.fn((state: any, userId: string) => {
    if (userId === 'user-1') {return { id: 'member-1', name: 'John Doe', userId: 'user-1' };}
    if (userId === 'user-2') {return { id: 'member-2', name: 'Jane Smith', userId: 'user-2' };}
    return null;
  }),
  selectMemberEntities: vi.fn((state: any) => state.memberEntity?.entities || {}),
  makeSelectMemberByUserIdWorkspaceId: vi.fn(() => vi.fn()),
  makeSelectCompositeMembersByIds: vi.fn(() => vi.fn()),
}));

// Mock taskAssignee dependencies
vi.mock('../../../taskAssignee', () => ({
  makeSelectTaskIdsByAssigneeMemberId: vi.fn(() => vi.fn()),
  makeSelectAssigneeMemberIdsByTaskId: vi.fn(() => vi.fn()),
}));

// Mock project dependencies
vi.mock('../../../project', () => ({
  makeSelectProjectById: vi.fn(() => vi.fn()),
}));

// Mock entityContextLink dependencies
vi.mock('../../../entityContextLink', () => ({
  selectContextObjectsMap: vi.fn((state: any) => ({})),
}));

vi.mock('@/entities/document', () => ({
  selectDocumentEntities: vi.fn((state: any) => state.documentEntity?.entities || {}),
}));

vi.mock('@/entities/chat', () => ({
  selectChatEntities: vi.fn((state: any) => state.chatEntity?.entities || {}),
}));

vi.mock('@/entities/task', () => ({
  selectTaskEntities: vi.fn((state: any) => state.taskEntity?.entities || {}),
}));

describe('Task Entity Selectors', () => {
  describe('Base Selectors', () => {
    describe('selectTaskState', () => {
      it('should return task entity state', () => {
        const taskState = {
          entities: {},
          ids: [],
          hoveredId: null,
          focusedId: null,
          selectedId: null,
        };
        const state = {
          taskEntity: taskState,
        } as any;

        expect(selectTaskState(state)).toEqual(taskState);
      });

      it('should handle state with data', () => {
        const taskState = {
          entities: {
            'task-1': { id: 'task-1', title: 'Test Task' },
          },
          ids: ['task-1'],
          hoveredId: null,
          focusedId: null,
          selectedId: null,
        };
        const state = {
          taskEntity: taskState,
        } as any;

        expect(selectTaskState(state)).toEqual(taskState);
      });
    });

    describe('selectTaskEntities', () => {
      it('should return task entities object', () => {
        const entities = {
          'task-1': { id: 'task-1', title: 'Task 1', userId: 'user-1' },
          'task-2': { id: 'task-2', title: 'Task 2', userId: 'user-2' },
        };
        const state = {
          taskEntity: {
            entities,
          },
        } as any;

        expect(selectTaskEntities(state)).toEqual(entities);
      });

      it('should return empty object when no entities', () => {
        const state = {
          taskEntity: {
            entities: {},
          },
        } as any;

        expect(selectTaskEntities(state)).toEqual({});
      });
    });

    describe('selectTaskIds', () => {
      it('should return task ids array', () => {
        const ids = ['task-1', 'task-2', 'task-3'];
        const state = {
          taskEntity: {
            ids,
          },
        } as any;

        expect(selectTaskIds(state)).toEqual(ids);
      });

      it('should return empty array when no ids', () => {
        const state = {
          taskEntity: {
            ids: [],
          },
        } as any;

        expect(selectTaskIds(state)).toEqual([]);
      });
    });
  });

  describe('UI State Selectors', () => {
    describe('selectHoveredTaskId', () => {
      it('should return hovered task ID', () => {
        const state = {
          taskEntity: {
            hoveredId: 'task-hovered',
          },
        } as any;

        expect(selectHoveredTaskId(state)).toBe('task-hovered');
      });

      it('should return null when no task hovered', () => {
        const state = {
          taskEntity: {
            hoveredId: null,
          },
        } as any;

        expect(selectHoveredTaskId(state)).toBeNull();
      });
    });

    describe('selectFocusedTaskId', () => {
      it('should return focused task ID', () => {
        const state = {
          taskEntity: {
            focusedId: 'task-focused',
          },
        } as any;

        expect(selectFocusedTaskId(state)).toBe('task-focused');
      });

      it('should return null when no task focused', () => {
        const state = {
          taskEntity: {
            focusedId: null,
          },
        } as any;

        expect(selectFocusedTaskId(state)).toBeNull();
      });
    });

    describe('selectSelectedTaskId', () => {
      it('should return selected task ID', () => {
        const state = {
          taskEntity: {
            selectedId: 'task-selected',
          },
        } as any;

        expect(selectSelectedTaskId(state)).toBe('task-selected');
      });

      it('should return null when no task selected', () => {
        const state = {
          taskEntity: {
            selectedId: null,
          },
        } as any;

        expect(selectSelectedTaskId(state)).toBeNull();
      });
    });
  });

  describe('Check State Selectors', () => {
    describe('selectTaskCheckStates', () => {
      it('should return all false when no states match', () => {
        const state = {
          taskEntity: {
            selectedId: null,
            focusedId: null,
            hoveredId: null,
          },
        } as any;

        const result = selectTaskCheckStates(state, 'task-1');
        expect(result).toEqual({
          isSelected: false,
          isFocused: false,
          isHovered: false,
        });
      });

      it('should return isSelected true when task is selected', () => {
        const state = {
          taskEntity: {
            selectedId: 'task-1',
            focusedId: null,
            hoveredId: null,
          },
        } as any;

        const result = selectTaskCheckStates(state, 'task-1');
        expect(result.isSelected).toBe(true);
        expect(result.isFocused).toBe(false);
        expect(result.isHovered).toBe(false);
      });

      it('should return isFocused true when task is focused', () => {
        const state = {
          taskEntity: {
            selectedId: null,
            focusedId: 'task-2',
            hoveredId: null,
          },
        } as any;

        const result = selectTaskCheckStates(state, 'task-2');
        expect(result.isFocused).toBe(true);
        expect(result.isSelected).toBe(false);
        expect(result.isHovered).toBe(false);
      });

      it('should return isHovered true when task is hovered', () => {
        const state = {
          taskEntity: {
            selectedId: null,
            focusedId: null,
            hoveredId: 'task-3',
          },
        } as any;

        const result = selectTaskCheckStates(state, 'task-3');
        expect(result.isHovered).toBe(true);
        expect(result.isSelected).toBe(false);
        expect(result.isFocused).toBe(false);
      });

      it('should return all true when task has all states', () => {
        const state = {
          taskEntity: {
            selectedId: 'task-1',
            focusedId: 'task-1',
            hoveredId: 'task-1',
          },
        } as any;

        const result = selectTaskCheckStates(state, 'task-1');
        expect(result).toEqual({
          isSelected: true,
          isFocused: true,
          isHovered: true,
        });
      });

      it('should handle mixed states for different tasks', () => {
        const state = {
          taskEntity: {
            selectedId: 'task-1',
            focusedId: 'task-2',
            hoveredId: 'task-3',
          },
        } as any;

        const result1 = selectTaskCheckStates(state, 'task-1');
        const result2 = selectTaskCheckStates(state, 'task-2');
        const result3 = selectTaskCheckStates(state, 'task-3');

        expect(result1.isSelected).toBe(true);
        expect(result2.isFocused).toBe(true);
        expect(result3.isHovered).toBe(true);
      });
    });
  });

  describe('Collection Selectors', () => {
    describe('selectAllTasks', () => {
      it('should return all tasks with member data', () => {
        const entities = {
          'task-1': { id: 'task-1', title: 'Task 1', userId: 'user-1' },
          'task-2': { id: 'task-2', title: 'Task 2', userId: 'user-2' },
        };
        const state = {
          taskEntity: {
            ids: ['task-1', 'task-2'],
            entities,
          },
          memberEntity: {
            entities: {
              'user-1': { id: 'member-1', name: 'John Doe', userId: 'user-1' }, // Keyed by userId
              'user-2': { id: 'member-2', name: 'Jane Smith', userId: 'user-2' }, // Keyed by userId
            },
            ids: ['user-1', 'user-2'],
          },
        } as any;

        const result = selectAllTasks(state);
        expect(result).toHaveLength(2);
        expect(result[0].member).toBeDefined();
        expect(result[0].member?.name).toBe('John Doe');
        expect(result[1].member?.name).toBe('Jane Smith');
      });

      it('should return empty array when no tasks', () => {
        const state = {
          taskEntity: {
            ids: [],
            entities: {},
          },
        } as any;

        expect(selectAllTasks(state)).toEqual([]);
      });

      it('should handle null ids', () => {
        const state = {
          taskEntity: {
            ids: null,
            entities: {},
          },
        } as any;

        expect(selectAllTasks(state)).toEqual([]);
      });

      it('should handle only valid tasks', () => {
        const entities = {
          'task-1': { id: 'task-1', title: 'Task 1', userId: 'user-1' },
          'task-2': { id: 'task-2', title: 'Task 2', userId: 'user-2' },
        };
        const state = {
          taskEntity: {
            ids: ['task-1', 'task-2'],
            entities,
          },
          memberEntity: {
            entities: {
              'user-1': { id: 'member-1', name: 'John Doe', userId: 'user-1' }, // Keyed by userId
              'user-2': { id: 'member-2', name: 'Jane Smith', userId: 'user-2' }, // Keyed by userId
            },
            ids: ['user-1', 'user-2'],
          },
        } as any;

        const result = selectAllTasks(state);
        expect(result).toHaveLength(2);
      });

      it('should set member to null when user not found', () => {
        const entities = {
          'task-1': { id: 'task-1', title: 'Task 1', userId: 'user-unknown' },
        };
        const state = {
          taskEntity: {
            ids: ['task-1'],
            entities,
          },
          memberEntity: {
            entities: {}, // No members - user not found
            ids: [],
          },
        } as any;

        const result = selectAllTasks(state);
        expect(result[0].member).toBeNull();
      });
    });

    describe('selectSelectedTask', () => {
      it('should return selected task', () => {
        const task = { id: 'task-selected', title: 'Selected Task', userId: 'user-1' };
        const state = {
          taskEntity: {
            selectedId: 'task-selected',
            entities: {
              'task-selected': task,
            },
          },
        } as any;

        expect(selectSelectedTask(state)).toEqual(task);
      });

      it('should return null when no task selected', () => {
        const state = {
          taskEntity: {
            selectedId: null,
            entities: {},
          },
        } as any;

        expect(selectSelectedTask(state)).toBeNull();
      });

      it('should return null when selected task does not exist', () => {
        const state = {
          taskEntity: {
            selectedId: 'task-missing',
            entities: {},
          },
        } as any;

        expect(selectSelectedTask(state)).toBeNull();
      });

      it('should return null when entities is null', () => {
        const state = {
          taskEntity: {
            selectedId: 'task-1',
            entities: null,
          },
        } as any;

        expect(selectSelectedTask(state)).toBeNull();
      });
    });

    describe('selectTasksByIds', () => {
      it('should return tasks for given IDs', () => {
        const state = {
          taskEntity: {
            entities: {
              'task-1': { id: 'task-1', title: 'Task 1' },
              'task-2': { id: 'task-2', title: 'Task 2' },
              'task-3': { id: 'task-3', title: 'Task 3' },
            },
          },
        } as any;

        const result = selectTasksByIds(state, ['task-1', 'task-3']);
        expect(result).toHaveLength(2);
        expect(result[0].title).toBe('Task 1');
        expect(result[1].title).toBe('Task 3');
      });

      it('should filter out non-existent tasks', () => {
        const state = {
          taskEntity: {
            entities: {
              'task-1': { id: 'task-1', title: 'Task 1' },
            },
          },
        } as any;

        const result = selectTasksByIds(state, ['task-1', 'task-missing']);
        expect(result).toHaveLength(1);
        expect(result[0].id).toBe('task-1');
      });

      it('should return empty array when ids is null', () => {
        const state = {
          taskEntity: {
            entities: {},
          },
        } as any;

        const result = selectTasksByIds(state, null);
        expect(result).toEqual([]);
      });

      it('should return empty array when entities is null', () => {
        const state = {
          taskEntity: {
            entities: null,
          },
        } as any;

        const result = selectTasksByIds(state, ['task-1']);
        expect(result).toEqual([]);
      });

      it('should maintain order from ids array', () => {
        const state = {
          taskEntity: {
            entities: {
              'task-1': { id: 'task-1', title: 'Task 1' },
              'task-2': { id: 'task-2', title: 'Task 2' },
              'task-3': { id: 'task-3', title: 'Task 3' },
            },
          },
        } as any;

        const result = selectTasksByIds(state, ['task-3', 'task-1', 'task-2']);
        expect(result[0].title).toBe('Task 3');
        expect(result[1].title).toBe('Task 1');
        expect(result[2].title).toBe('Task 2');
      });
    });

    describe('selectTaskById', () => {
      it('should return task by ID', () => {
        const task = { id: 'task-1', title: 'Test Task', userId: 'user-1' };
        const state = {
          taskEntity: {
            entities: {
              'task-1': task,
            },
          },
        } as any;

        expect(selectTaskById(state, 'task-1')).toEqual(task);
      });

      it('should return null for non-existent ID', () => {
        const state = {
          taskEntity: {
            entities: {},
          },
        } as any;

        expect(selectTaskById(state, 'non-existent')).toBeNull();
      });

      it('should handle task with complex properties', () => {
        const task = {
          id: 'task-1',
          title: 'Complex Task',
          description: 'A detailed description',
          userId: 'user-1',
          status: 'in_progress',
          priority: 'high',
          dueDate: '2024-12-31',
          tags: ['urgent', 'feature'],
        };
        const state = {
          taskEntity: {
            entities: {
              'task-1': task,
            },
          },
        } as any;

        const result = selectTaskById(state, 'task-1');
        expect(result?.status).toBe('in_progress');
        expect(result?.priority).toBe('high');
        expect(result?.tags).toHaveLength(2);
      });
    });
  });

  describe('Edge Cases', () => {
    describe('Different task statuses', () => {
      it('should handle tasks with various statuses', () => {
        const entities = {
          'task-1': { id: 'task-1', title: 'Todo', status: 'todo', userId: 'user-1' },
          'task-2': { id: 'task-2', title: 'In Progress', status: 'in_progress', userId: 'user-2' },
          'task-3': { id: 'task-3', title: 'Done', status: 'done', userId: 'user-1' },
        };
        const state = {
          taskEntity: {
            ids: ['task-1', 'task-2', 'task-3'],
            entities,
          },
          memberEntity: {
            entities: {
              'user-1': { id: 'member-1', name: 'John Doe', userId: 'user-1' }, // Keyed by userId
              'user-2': { id: 'member-2', name: 'Jane Smith', userId: 'user-2' }, // Keyed by userId
            },
            ids: ['user-1', 'user-2'],
          },
        } as any;

        const result = selectAllTasks(state);
        expect(result).toHaveLength(3);
        expect(result.map((t: any) => t.status)).toEqual(['todo', 'in_progress', 'done']);
      });
    });

    describe('Empty state handling', () => {
      it('should handle completely empty state', () => {
        const state = {
          taskEntity: {
            entities: {},
            ids: [],
            selectedId: null,
            focusedId: null,
            hoveredId: null,
          },
        } as any;

        expect(selectAllTasks(state)).toEqual([]);
        expect(selectSelectedTask(state)).toBeNull();
        expect(selectTasksByIds(state, [])).toEqual([]);
      });
    });
  });
});

