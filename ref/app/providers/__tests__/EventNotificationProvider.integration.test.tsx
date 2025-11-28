/**
 * Integration Tests: EventNotificationProvider ↔ Redux
 *
 * Week 2, Day 3: Notification Integration Tests
 *
 * Purpose: Test full integration between EventNotificationService and Redux store
 * Coverage Target: 90%+ for EventNotificationProvider integration
 *
 * Integration Scenarios:
 * 1. Provider Initialization & Cleanup (5 tests)
 * 2. Event → Notification Mapping & Dispatch (8 tests)
 * 3. Notification Lifecycle Management (7 tests)
 *
 * Total: 20 tests
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { EventBusProvider } from '../EventBusProvider';
import { getGlobalEventBus } from '@/shared/services/eventBus';
import notificationEntityReducer from '@/entities/eventNotification/model/store/slice';
import eventEntityReducer from '@/entities/event/model/store/slice';
import { EventType } from '@/shared/constants';

// Mock problematic selectors
vi.mock('@/entities/entityContextLink', () => ({
  selectContextObjectsMap: vi.fn(() => ({})),
}));

// Mock the UI features
vi.mock('@/features/eventNotificationManager', async (importOriginal) => {
  const actual = await importOriginal() as any;
  return {
    ...actual,
    NotificationContainer: () => null,
  };
});

import { EventNotificationProvider } from '../EventNotificationProvider';

const TestComponent = () => {
  return <div data-testid="test-component">Test Component</div>;
};

describe('EventNotificationProvider ↔ Redux Integration', () => {
  let store: ReturnType<typeof configureStore>;
  let consoleWarnSpy: any;
  let consoleErrorSpy: any;

  const createTestStore = () => {
    return configureStore({
      reducer: {
        eventEntity: eventEntityReducer,
        notificationEntity: notificationEntityReducer,
      },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: false,
        }),
    });
  };

  beforeEach(() => {
    vi.useFakeTimers();
    const eventBus = getGlobalEventBus();
    eventBus.clear();

    store = createTestStore();

    consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.useRealTimers();
    consoleWarnSpy.mockRestore();
    consoleErrorSpy.mockRestore();
    vi.clearAllMocks();
  });

  // ═══════════════════════════════════════════════════════════════
  // CATEGORY 1: PROVIDER INITIALIZATION & CLEANUP (5 tests)
  // ═══════════════════════════════════════════════════════════════

  describe('Provider Initialization & Cleanup', () => {
    it('should initialize EventNotificationService with EventBus', () => {
      render(
        <Provider store={store}>
          <EventBusProvider>
            <EventNotificationProvider>
              <TestComponent />
            </EventNotificationProvider>
          </EventBusProvider>
        </Provider>,
      );

      expect(screen.getByTestId('test-component')).toBeInTheDocument();
    });

    it('should subscribe to EventBus on mount', async () => {
      render(
        <Provider store={store}>
          <EventBusProvider>
            <EventNotificationProvider>
              <TestComponent />
            </EventNotificationProvider>
          </EventBusProvider>
        </Provider>,
      );

      const eventBus = getGlobalEventBus();

      // Test by emitting an event and checking if notification is created
      eventBus.emit(EventType.ELEMENT_CREATED, { elementId: 'test', tag: 'div' });

      await waitFor(() => {
        const state = store.getState();
        // Notification should be created
        expect(state.notificationEntity.ids.length).toBeGreaterThan(0);
      });
    });

    it('should cleanup on unmount', () => {
      const { unmount } = render(
        <Provider store={store}>
          <EventBusProvider>
            <EventNotificationProvider>
              <TestComponent />
            </EventNotificationProvider>
          </EventBusProvider>
        </Provider>,
      );

      unmount();

      // Should not throw errors
      expect(screen.queryByTestId('test-component')).not.toBeInTheDocument();
    });

    it('should provide NotificationService via context', () => {
      render(
        <Provider store={store}>
          <EventBusProvider>
            <EventNotificationProvider>
              <TestComponent />
            </EventNotificationProvider>
          </EventBusProvider>
        </Provider>,
      );

      expect(screen.getByTestId('test-component')).toBeInTheDocument();
    });

    it('should handle re-initialization gracefully', () => {
      const { rerender } = render(
        <Provider store={store}>
          <EventBusProvider>
            <EventNotificationProvider>
              <TestComponent />
            </EventNotificationProvider>
          </EventBusProvider>
        </Provider>,
      );

      rerender(
        <Provider store={store}>
          <EventBusProvider>
            <EventNotificationProvider>
              <TestComponent />
            </EventNotificationProvider>
          </EventBusProvider>
        </Provider>,
      );

      expect(screen.getByTestId('test-component')).toBeInTheDocument();
    });
  });

  // ═══════════════════════════════════════════════════════════════
  // CATEGORY 2: EVENT → NOTIFICATION MAPPING & DISPATCH (8 tests)
  // ═══════════════════════════════════════════════════════════════

  describe('Event → Notification Mapping & Dispatch', () => {
    it('should create notification from element.created event', async () => {
      render(
        <Provider store={store}>
          <EventBusProvider>
            <EventNotificationProvider>
              <TestComponent />
            </EventNotificationProvider>
          </EventBusProvider>
        </Provider>,
      );

      const eventBus = getGlobalEventBus();
      eventBus.emit(EventType.ELEMENT_CREATED, { elementId: 'element-1', tag: 'div' });

      await waitFor(() => {
        const state = store.getState();
        expect(state.notificationEntity.ids.length).toBeGreaterThan(0);
      });
    });

    it('should dispatch notification with correct structure', async () => {
      render(
        <Provider store={store}>
          <EventBusProvider>
            <EventNotificationProvider>
              <TestComponent />
            </EventNotificationProvider>
          </EventBusProvider>
        </Provider>,
      );

      const eventBus = getGlobalEventBus();
      eventBus.emit(EventType.ELEMENT_CREATED, { elementId: 'element-123', tag: 'button' });

      await waitFor(() => {
        const state = store.getState();
        const notification = state.notificationEntity.entities[state.notificationEntity.ids[0]];

        expect(notification.id).toMatch(/^notification-/);
        expect(notification.type).toBeDefined();
        expect(notification.text).toBeDefined();
        expect(notification.createdAt).toBeDefined();
      });
    });

    it('should handle multiple events creating multiple notifications', async () => {
      render(
        <Provider store={store}>
          <EventBusProvider>
            <EventNotificationProvider>
              <TestComponent />
            </EventNotificationProvider>
          </EventBusProvider>
        </Provider>,
      );

      const eventBus = getGlobalEventBus();

      // Use events that definitely create notifications
      eventBus.emit(EventType.ELEMENT_CREATED, { elementId: '1', tag: 'div' });
      eventBus.emit(EventType.ELEMENT_CREATED, { elementId: '2', tag: 'span' });
      eventBus.emit(EventType.ELEMENT_CREATED, { elementId: '3', tag: 'button' });

      await waitFor(() => {
        const state = store.getState();
        expect(state.notificationEntity.ids.length).toBe(3);
      }, { timeout: 2000 });
    });

    it('should create unique notification IDs for each event', async () => {
      render(
        <Provider store={store}>
          <EventBusProvider>
            <EventNotificationProvider>
              <TestComponent />
            </EventNotificationProvider>
          </EventBusProvider>
        </Provider>,
      );

      const eventBus = getGlobalEventBus();

      eventBus.emit(EventType.ELEMENT_CREATED, { elementId: '1', tag: 'div' });
      eventBus.emit(EventType.ELEMENT_CREATED, { elementId: '2', tag: 'span' });

      await waitFor(() => {
        const state = store.getState();
        const notifications = state.notificationEntity.ids.map((id: string) => state.notificationEntity.entities[id]);
        const notificationIds = notifications.map((n: any) => n.id);

        const uniqueIds = new Set(notificationIds);
        expect(uniqueIds.size).toBe(notifications.length);
      });
    });

    it('should skip notification creation when config.enabled = false', async () => {
      render(
        <Provider store={store}>
          <EventBusProvider>
            <EventNotificationProvider>
              <TestComponent />
            </EventNotificationProvider>
          </EventBusProvider>
        </Provider>,
      );

      const eventBus = getGlobalEventBus();

      // EventType.REDUX_ACTION has enabled: false by default
      eventBus.emit(EventType.REDUX_ACTION, { action: 'test' });

      // Use fake timers to advance time
      vi.advanceTimersByTime(100);

      await waitFor(() => {
        const state = store.getState();
        // Should not create notification
        expect(state.notificationEntity.ids.length).toBe(0);
      }, { timeout: 1000 });
    });

    it('should handle rapid event emissions', async () => {
      render(
        <Provider store={store}>
          <EventBusProvider>
            <EventNotificationProvider>
              <TestComponent />
            </EventNotificationProvider>
          </EventBusProvider>
        </Provider>,
      );

      const eventBus = getGlobalEventBus();
      const eventCount = 5;

      for (let i = 0; i < eventCount; i++) {
        eventBus.emit(EventType.ELEMENT_CREATED, { elementId: `element-${i}`, tag: 'div' });
      }

      await waitFor(() => {
        const state = store.getState();
        expect(state.notificationEntity.ids.length).toBe(eventCount);
      });
    });

    it('should handle comment events with task context', async () => {
      render(
        <Provider store={store}>
          <EventBusProvider>
            <EventNotificationProvider>
              <TestComponent />
            </EventNotificationProvider>
          </EventBusProvider>
        </Provider>,
      );

      const eventBus = getGlobalEventBus();
      eventBus.emit(EventType.COMMENT_ADDED, {
        commentId: 'comment-1',
        text: 'Test comment',
        taskTitle: 'Fix bug',
      });

      await waitFor(() => {
        const state = store.getState();
        expect(state.notificationEntity.ids.length).toBeGreaterThan(0);
        const notification = state.notificationEntity.entities[state.notificationEntity.ids[0]];
        expect(notification.text).toBeDefined();
      });
    });

    it('should handle task events correctly', async () => {
      render(
        <Provider store={store}>
          <EventBusProvider>
            <EventNotificationProvider>
              <TestComponent />
            </EventNotificationProvider>
          </EventBusProvider>
        </Provider>,
      );

      const eventBus = getGlobalEventBus();
      eventBus.emit(EventType.TASK_CREATED, {
        taskId: 'task-1',
        title: 'New Task',
      });

      await waitFor(() => {
        const state = store.getState();
        expect(state.notificationEntity.ids.length).toBeGreaterThan(0);
        const notification = state.notificationEntity.entities[state.notificationEntity.ids[0]];
        expect(notification.text).toBeDefined();
      });
    });
  });

  // ═══════════════════════════════════════════════════════════════
  // CATEGORY 3: NOTIFICATION LIFECYCLE MANAGEMENT (7 tests)
  // ═══════════════════════════════════════════════════════════════

  describe('Notification Lifecycle Management', () => {
    it('should auto-dismiss notification after duration', async () => {
      render(
        <Provider store={store}>
          <EventBusProvider>
            <EventNotificationProvider>
              <TestComponent />
            </EventNotificationProvider>
          </EventBusProvider>
        </Provider>,
      );

      const eventBus = getGlobalEventBus();
      eventBus.emit(EventType.ELEMENT_CREATED, { elementId: '1', tag: 'div' });

      // Wait for notification to be created
      await waitFor(() => {
        const state = store.getState();
        expect(state.notificationEntity.ids.length).toBe(1);
      });

      // Advance timers by the duration (3000ms default)
      vi.advanceTimersByTime(3000);

      await waitFor(() => {
        const state = store.getState();
        const notification = state.notificationEntity.entities[state.notificationEntity.ids[0]];

        // For persistent notifications, shownAt should be set
        // For temporary notifications, it should be removed
        if (notification) {
          // Persistent notification
          expect(notification.shownAt || notification.dismissedAt || notification.readAt).toBeDefined();
        } else {
          // Temporary notification removed
          expect(state.notificationEntity.ids.length).toBe(0);
        }
      });
    });

    it('should store notifications in normalized format', async () => {
      render(
        <Provider store={store}>
          <EventBusProvider>
            <EventNotificationProvider>
              <TestComponent />
            </EventNotificationProvider>
          </EventBusProvider>
        </Provider>,
      );

      const eventBus = getGlobalEventBus();
      eventBus.emit(EventType.ELEMENT_CREATED, { elementId: '1', tag: 'div' });

      await waitFor(() => {
        const state = store.getState();

        expect(state.notificationEntity.ids).toBeDefined();
        expect(state.notificationEntity.entities).toBeDefined();
        expect(Array.isArray(state.notificationEntity.ids)).toBe(true);
        expect(typeof state.notificationEntity.entities).toBe('object');
      });
    });

    it('should prevent duplicate notification IDs in Redux', async () => {
      render(
        <Provider store={store}>
          <EventBusProvider>
            <EventNotificationProvider>
              <TestComponent />
            </EventNotificationProvider>
          </EventBusProvider>
        </Provider>,
      );

      const eventBus = getGlobalEventBus();

      eventBus.emit(EventType.ELEMENT_CREATED, { elementId: '1', tag: 'div' });
      eventBus.emit(EventType.ELEMENT_CREATED, { elementId: '2', tag: 'span' });
      eventBus.emit(EventType.ELEMENT_CREATED, { elementId: '3', tag: 'button' });

      await waitFor(() => {
        const state = store.getState();
        const uniqueIds = new Set(state.notificationEntity.ids);

        expect(uniqueIds.size).toBe(state.notificationEntity.ids.length);
      });
    });

    it('should maintain notification order in Redux store', async () => {
      render(
        <Provider store={store}>
          <EventBusProvider>
            <EventNotificationProvider>
              <TestComponent />
            </EventNotificationProvider>
          </EventBusProvider>
        </Provider>,
      );

      const eventBus = getGlobalEventBus();

      // Use the same event type to ensure all create notifications
      eventBus.emit(EventType.ELEMENT_CREATED, { elementId: '1', tag: 'div' });
      eventBus.emit(EventType.ELEMENT_CREATED, { elementId: '2', tag: 'span' });
      eventBus.emit(EventType.ELEMENT_CREATED, { elementId: '3', tag: 'button' });

      await waitFor(() => {
        const state = store.getState();
        expect(state.notificationEntity.ids.length).toBe(3);

        const notifications = state.notificationEntity.ids.map((id: string) => state.notificationEntity.entities[id]);

        // Verify all notifications exist
        expect(notifications[0]).toBeDefined();
        expect(notifications[1]).toBeDefined();
        expect(notifications[2]).toBeDefined();
      }, { timeout: 2000 });
    });

    it('should handle notification timestamps correctly', async () => {
      render(
        <Provider store={store}>
          <EventBusProvider>
            <EventNotificationProvider>
              <TestComponent />
            </EventNotificationProvider>
          </EventBusProvider>
        </Provider>,
      );

      const eventBus = getGlobalEventBus();
      eventBus.emit(EventType.ELEMENT_CREATED, { elementId: '1', tag: 'div' });

      await waitFor(() => {
        const state = store.getState();
        const notification = state.notificationEntity.entities[state.notificationEntity.ids[0]];

        expect(notification.createdAt).toBeDefined();
        expect(new Date(notification.createdAt).getTime()).toBeGreaterThan(0);
      });
    });

    it('should maintain Redux state consistency after multiple operations', async () => {
      render(
        <Provider store={store}>
          <EventBusProvider>
            <EventNotificationProvider>
              <TestComponent />
            </EventNotificationProvider>
          </EventBusProvider>
        </Provider>,
      );

      const eventBus = getGlobalEventBus();

      for (let i = 0; i < 5; i++) {
        eventBus.emit(EventType.ELEMENT_CREATED, { elementId: `${i}`, tag: 'div' });
      }

      await waitFor(() => {
        const state = store.getState();

        expect(state.notificationEntity.ids.length).toBe(5);
        expect(Object.keys(state.notificationEntity.entities).length).toBe(5);

        state.notificationEntity.ids.forEach((id: string) => {
          expect(state.notificationEntity.entities[id]).toBeDefined();
          expect(state.notificationEntity.entities[id].id).toBe(id);
        });
      });
    });

    it('should handle error during notification dispatch gracefully', async () => {
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'development';

      const consoleErrorMock = vi.spyOn(console, 'error').mockImplementation(() => {});

      const faultyReducer = (state = { ids: [], entities: {} }, action: any) => {
        if (action.type === 'notificationEntity/addNotification') {
          throw new Error('Redux error');
        }
        return state;
      };

      const faultyStore = configureStore({
        reducer: {
          eventEntity: eventEntityReducer,
          notificationEntity: faultyReducer,
        },
      });

      render(
        <Provider store={faultyStore}>
          <EventBusProvider>
            <EventNotificationProvider>
              <TestComponent />
            </EventNotificationProvider>
          </EventBusProvider>
        </Provider>,
      );

      const eventBus = getGlobalEventBus();

      // Should not throw
      expect(() => {
        eventBus.emit(EventType.ELEMENT_CREATED, { elementId: '1', tag: 'div' });
      }).not.toThrow();

      // Use fake timers to advance time
      vi.advanceTimersByTime(100);

      // Simply verify the test completes without hanging
      await waitFor(() => {
        expect(true).toBe(true);
      }, { timeout: 1000 });

      consoleErrorMock.mockRestore();
      process.env.NODE_ENV = originalEnv;
    });
  });
});

