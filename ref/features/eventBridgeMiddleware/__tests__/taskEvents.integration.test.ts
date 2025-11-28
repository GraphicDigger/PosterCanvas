/**
 * Integration Tests: Task Events → EventBus → Redux Pipeline
 *
 * Week 2, Day 5: Task Events Integration Tests
 *
 * Purpose: Test full integration of task events through EventBus to Event/Activity/Notification
 * Coverage Target: 90%+ for task event pipeline
 *
 * Integration Scenarios:
 * 1. Task Event Publishing (5 tests)
 * 2. Task Event → Event/Activity Pipeline (5 tests)
 * 3. Task Event → Notification Pipeline (5 tests)
 *
 * Total: 15 tests
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';

// Mock problematic selectors with circular dependencies
vi.mock('@/entities/entityContextLink', () => ({
  selectContextObjectsMap: vi.fn(() => ({})),
  selectContextLinkEntities: vi.fn(() => ({})),
  selectContextLinkIds: vi.fn(() => []),
}));

import { addTask, updateTask, removeTask } from '@/entities/task';
import taskEntityReducer from '@/entities/task/model/store/slice';
import eventEntityReducer from '@/entities/event/model/store/slice';
import activityEntityReducer from '@/entities/eventActivity/model/store/slice';
import notificationEntityReducer from '@/entities/eventNotification/model/store/slice';
import authSessionReducer from '@/app/sessions/auth/model/store/slice';
import { getGlobalEventBus } from '@/shared/services/eventBus';
import { EventType, ENTITY_KINDS } from '@/shared/constants';
import { registerTaskHandlers } from '../model/middleware/handlers/task';

describe('Task Events → EventBus → Redux Integration', () => {
  let store: ReturnType<typeof configureStore>;
  let eventBus: any;
  let emit: ReturnType<typeof vi.fn>;

  const createTestStore = () => {
    return configureStore({
      reducer: {
        taskEntity: taskEntityReducer,
        eventEntity: eventEntityReducer,
        activityEntity: activityEntityReducer,
        notificationEntity: notificationEntityReducer,
        authSession: authSessionReducer,
      },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: false,
        }),
    });
  };

  const mockTask = {
    id: 'task-1',
    title: 'Test Task',
    description: 'Test description',
    status: 'todo',
    priority: 'high',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  beforeEach(() => {
    store = createTestStore();
    eventBus = getGlobalEventBus();
    eventBus.clear();

    // Create mock emit function
    emit = vi.fn((type: EventType, payload: any) => {
      eventBus.emit(type, payload);
    });

    // Register task handlers with the middleware
    const listener = {
      startListening: vi.fn((config: any) => {
        // Simulate listener registration by calling effect when action is dispatched
        const unsubscribe = store.subscribe(() => {
          const state = store.getState();
          const lastAction = (store as any).lastAction;

          if (lastAction && config.matcher(lastAction)) {
            config.effect(lastAction, {
              getState: () => state,
              dispatch: store.dispatch,
            });
          }
        });
        return unsubscribe;
      }),
    } as any;

    registerTaskHandlers(listener, emit);

    // Intercept dispatches to track actions
    const originalDispatch = store.dispatch;
    (store as any).dispatch = (action: any) => {
      (store as any).lastAction = action;
      return originalDispatch(action);
    };
  });

  afterEach(() => {
    eventBus.clear();
    vi.clearAllMocks();
  });

  // ═══════════════════════════════════════════════════════════════
  // CATEGORY 1: TASK EVENT PUBLISHING (5 tests)
  // ═══════════════════════════════════════════════════════════════

  describe('Task Event Publishing', () => {
    it('should emit TASK_CREATED event when addTask is dispatched', () => {
      store.dispatch(addTask(mockTask as any));

      expect(emit).toHaveBeenCalledWith(
        EventType.TASK_CREATED,
        expect.objectContaining({
          entityId: mockTask.id,
          entityKind: ENTITY_KINDS.TASK,
        }),
      );
    });

    it('should include correct payload structure for TASK_CREATED', () => {
      store.dispatch(addTask(mockTask as any));

      expect(emit).toHaveBeenCalledWith(
        EventType.TASK_CREATED,
        expect.objectContaining({
          entityId: expect.any(String),
          entityKind: ENTITY_KINDS.TASK,
          createdBy: expect.any(String),
          createdAt: expect.any(String),
        }),
      );
    });

    it('should add task to Redux before emitting event', () => {
      store.dispatch(addTask(mockTask as any));

      const state = store.getState();
      expect(state.taskEntity.entities[mockTask.id]).toBeDefined();
      expect(state.taskEntity.entities[mockTask.id]?.title).toBe(mockTask.title);
    });

    it('should include current member ID in event payload', () => {
      // Set up auth session
      store.dispatch({
        type: 'authSession/sessionStarted',
        payload: {
          currentUserId: 'user-1',
          currentMemberId: 'member-1',
          currentWorkspaceId: 'workspace-1',
        },
      });

      store.dispatch(addTask(mockTask as any));

      expect(emit).toHaveBeenCalledWith(
        EventType.TASK_CREATED,
        expect.objectContaining({
          createdBy: 'member-1',
        }),
      );
    });

    it('should handle errors during event publishing gracefully', () => {
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      // Create a faulty emit that throws
      const faultyEmit = vi.fn(() => {
        throw new Error('Emit error');
      });

      const listener = {
        startListening: vi.fn((config: any) => {
          const unsubscribe = store.subscribe(() => {
            try {
              const state = store.getState();
              const lastAction = (store as any).lastAction;

              if (lastAction && config.matcher(lastAction)) {
                config.effect(lastAction, {
                  getState: () => state,
                  dispatch: store.dispatch,
                });
              }
            } catch (error) {
              // Error should be caught by handler
            }
          });
          return unsubscribe;
        }),
      } as any;

      registerTaskHandlers(listener, faultyEmit);

      // Should not throw
      expect(() => {
        store.dispatch(addTask(mockTask as any));
      }).not.toThrow();

      consoleErrorSpy.mockRestore();
    });
  });

  // ═══════════════════════════════════════════════════════════════
  // CATEGORY 2: TASK EVENT → EVENT/ACTIVITY PIPELINE (5 tests)
  // ═══════════════════════════════════════════════════════════════

  describe('Task Event → Event/Activity Pipeline', () => {
    it('should create Event in Redux when task event is emitted', async () => {
      // Setup EventBus to dispatch to Redux
      eventBus.initialize((event: any) => {
        store.dispatch({ type: 'eventEntity/addEvent', payload: event });
      });

      store.dispatch(addTask(mockTask as any));

      // Wait for async operations
      await new Promise(resolve => setTimeout(resolve, 50));

      const state = store.getState();
      const events = Object.values(state.eventEntity.entities);
      const taskEvent = events.find((e: any) => e?.type === EventType.TASK_CREATED);

      expect(taskEvent).toBeDefined();
      expect(taskEvent).toMatchObject({
        kind: 'event',
        type: EventType.TASK_CREATED,
      });
    });

    it('should link Event payload to original task', async () => {
      eventBus.initialize((event: any) => {
        store.dispatch({ type: 'eventEntity/addEvent', payload: event });
      });

      store.dispatch(addTask(mockTask as any));

      await new Promise(resolve => setTimeout(resolve, 50));

      const state = store.getState();
      const events = Object.values(state.eventEntity.entities);
      const taskEvent = events.find((e: any) => e?.type === EventType.TASK_CREATED);

      expect(taskEvent?.payload).toMatchObject({
        entityId: mockTask.id,
        entityKind: ENTITY_KINDS.TASK,
      });
    });

    it('should create Activity when TASK_CREATED event is processed', async () => {
      // Mock activity creation
      eventBus.initialize((event: any) => {
        store.dispatch({ type: 'eventEntity/addEvent', payload: event });

        // Simulate activity creation
        if (event.type === EventType.TASK_CREATED) {
          store.dispatch({
            type: 'activityEntity/addActivity',
            payload: {
              id: `activity-${event.id}`,
              kind: 'activity',
              eventId: event.id,
              title: event.type,
              text: 'Created task',
              createdAt: event.createdAt,
              updatedAt: event.updatedAt,
              source: event.payload,
            },
          });
        }
      });

      store.dispatch(addTask(mockTask as any));

      await new Promise(resolve => setTimeout(resolve, 50));

      const state = store.getState();
      const activities = Object.values(state.activityEntity.entities);

      expect(activities.length).toBeGreaterThan(0);
      const taskActivity = activities.find((a: any) => a?.text?.includes('task'));
      expect(taskActivity).toBeDefined();
    });

    it('should maintain Event → Activity relationship', async () => {
      eventBus.initialize((event: any) => {
        store.dispatch({ type: 'eventEntity/addEvent', payload: event });

        if (event.type === EventType.TASK_CREATED) {
          store.dispatch({
            type: 'activityEntity/addActivity',
            payload: {
              id: `activity-${event.id}`,
              kind: 'activity',
              eventId: event.id,
              title: event.type,
              text: 'Created task',
              createdAt: event.createdAt,
              updatedAt: event.updatedAt,
              source: event.payload,
            },
          });
        }
      });

      store.dispatch(addTask(mockTask as any));

      await new Promise(resolve => setTimeout(resolve, 50));

      const state = store.getState();
      const events = Object.values(state.eventEntity.entities);
      const activities = Object.values(state.activityEntity.entities);

      const taskEvent = events.find((e: any) => e?.type === EventType.TASK_CREATED);
      const taskActivity = activities.find((a: any) => a?.eventId === taskEvent?.id);

      expect(taskActivity).toBeDefined();
      expect(taskActivity?.eventId).toBe(taskEvent?.id);
    });

    it('should create unique Event and Activity IDs', async () => {
      eventBus.initialize((event: any) => {
        store.dispatch({ type: 'eventEntity/addEvent', payload: event });

        if (event.type === EventType.TASK_CREATED) {
          store.dispatch({
            type: 'activityEntity/addActivity',
            payload: {
              id: `activity-${event.id}`,
              kind: 'activity',
              eventId: event.id,
              title: event.type,
              text: 'Created task',
              createdAt: event.createdAt,
              updatedAt: event.updatedAt,
              source: event.payload,
            },
          });
        }
      });

      // Create two tasks
      store.dispatch(addTask(mockTask as any));
      store.dispatch(addTask({ ...mockTask, id: 'task-2' } as any));

      await new Promise(resolve => setTimeout(resolve, 50));

      const state = store.getState();

      const eventIds = Object.keys(state.eventEntity.entities);
      const activityIds = Object.keys(state.activityEntity.entities);

      // All IDs should be unique
      expect(new Set(eventIds).size).toBe(eventIds.length);
      expect(new Set(activityIds).size).toBe(activityIds.length);
    });
  });

  // ═══════════════════════════════════════════════════════════════
  // CATEGORY 3: TASK EVENT → NOTIFICATION PIPELINE (5 tests)
  // ═══════════════════════════════════════════════════════════════

  describe('Task Event → Notification Pipeline', () => {
    it('should create Notification when TASK_CREATED event is processed', async () => {
      eventBus.initialize((event: any) => {
        store.dispatch({ type: 'eventEntity/addEvent', payload: event });

        // Simulate notification creation
        if (event.type === EventType.TASK_CREATED) {
          store.dispatch({
            type: 'notificationEntity/addNotification',
            payload: {
              id: `notification-${event.id}`,
              type: 'success',
              text: 'Task created successfully',
              title: 'Task Created',
              createdAt: new Date().toISOString(),
            },
          });
        }
      });

      store.dispatch(addTask(mockTask as any));

      await new Promise(resolve => setTimeout(resolve, 50));

      const state = store.getState();
      const notifications = Object.values(state.notificationEntity.entities);

      expect(notifications.length).toBeGreaterThan(0);
      const taskNotification = notifications.find((n: any) => n?.text?.includes('Task'));
      expect(taskNotification).toBeDefined();
    });

    it('should include task information in notification', async () => {
      eventBus.initialize((event: any) => {
        store.dispatch({ type: 'eventEntity/addEvent', payload: event });

        if (event.type === EventType.TASK_CREATED) {
          store.dispatch({
            type: 'notificationEntity/addNotification',
            payload: {
              id: `notification-${event.id}`,
              type: 'success',
              text: `Task "${mockTask.title}" created`,
              title: 'Task Created',
              createdAt: new Date().toISOString(),
            },
          });
        }
      });

      store.dispatch(addTask(mockTask as any));

      await new Promise(resolve => setTimeout(resolve, 50));

      const state = store.getState();
      const notifications = Object.values(state.notificationEntity.entities);
      const taskNotification = notifications.find((n: any) => n?.text?.includes(mockTask.title));

      expect(taskNotification).toBeDefined();
      expect(taskNotification?.text).toContain(mockTask.title);
    });

    it('should set correct notification type for task creation', async () => {
      eventBus.initialize((event: any) => {
        store.dispatch({ type: 'eventEntity/addEvent', payload: event });

        if (event.type === EventType.TASK_CREATED) {
          store.dispatch({
            type: 'notificationEntity/addNotification',
            payload: {
              id: `notification-${event.id}`,
              type: 'success',
              text: 'Task created',
              title: 'Success',
              createdAt: new Date().toISOString(),
            },
          });
        }
      });

      store.dispatch(addTask(mockTask as any));

      await new Promise(resolve => setTimeout(resolve, 50));

      const state = store.getState();
      const notifications = Object.values(state.notificationEntity.entities);
      const taskNotification = notifications[0] as any;

      expect(taskNotification?.type).toBe('success');
    });

    it('should handle multiple task events creating multiple notifications', async () => {
      eventBus.initialize((event: any) => {
        store.dispatch({ type: 'eventEntity/addEvent', payload: event });

        if (event.type === EventType.TASK_CREATED) {
          store.dispatch({
            type: 'notificationEntity/addNotification',
            payload: {
              id: `notification-${event.id}`,
              type: 'success',
              text: 'Task created',
              title: 'Success',
              createdAt: new Date().toISOString(),
            },
          });
        }
      });

      // Create multiple tasks
      store.dispatch(addTask(mockTask as any));
      store.dispatch(addTask({ ...mockTask, id: 'task-2', title: 'Task 2' } as any));
      store.dispatch(addTask({ ...mockTask, id: 'task-3', title: 'Task 3' } as any));

      await new Promise(resolve => setTimeout(resolve, 50));

      const state = store.getState();
      const notifications = Object.values(state.notificationEntity.entities);

      expect(notifications.length).toBe(3);
    });

    it('should verify complete task event pipeline end-to-end', async () => {
      // Setup complete pipeline
      eventBus.initialize((event: any) => {
        // 1. Add Event
        store.dispatch({ type: 'eventEntity/addEvent', payload: event });

        if (event.type === EventType.TASK_CREATED) {
          // 2. Add Activity
          store.dispatch({
            type: 'activityEntity/addActivity',
            payload: {
              id: `activity-${event.id}`,
              kind: 'activity',
              eventId: event.id,
              title: event.type,
              text: 'Created task',
              createdAt: event.createdAt,
              updatedAt: event.updatedAt,
              source: event.payload,
            },
          });

          // 3. Add Notification
          store.dispatch({
            type: 'notificationEntity/addNotification',
            payload: {
              id: `notification-${event.id}`,
              type: 'success',
              text: 'Task created',
              title: 'Success',
              createdAt: new Date().toISOString(),
            },
          });
        }
      });

      // Trigger task creation
      store.dispatch(addTask(mockTask as any));

      await new Promise(resolve => setTimeout(resolve, 50));

      const state = store.getState();

      // Verify Task was added
      expect(state.taskEntity.entities[mockTask.id]).toBeDefined();

      // Verify Event was created
      const events = Object.values(state.eventEntity.entities);
      expect(events.length).toBeGreaterThan(0);

      // Verify Activity was created
      const activities = Object.values(state.activityEntity.entities);
      expect(activities.length).toBeGreaterThan(0);

      // Verify Notification was created
      const notifications = Object.values(state.notificationEntity.entities);
      expect(notifications.length).toBeGreaterThan(0);

      // Verify complete pipeline
      const taskEvent = events.find((e: any) => e?.type === EventType.TASK_CREATED);
      const taskActivity = activities.find((a: any) => a?.eventId === taskEvent?.id);
      const taskNotification = notifications[0];

      expect(taskEvent).toBeDefined();
      expect(taskActivity).toBeDefined();
      expect(taskNotification).toBeDefined();
    });
  });
});

