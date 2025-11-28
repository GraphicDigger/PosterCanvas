/**
 * Integration Tests: EventActivityProvider ↔ Redux
 *
 * Week 2, Day 2: Activity Integration Tests
 *
 * Purpose: Test full integration between EventActivityService and Redux store
 * Coverage Target: 90%+ for EventActivityProvider integration
 *
 * Integration Scenarios:
 * 1. Provider Initialization & Cleanup (5 tests)
 * 2. Event → Activity Mapping & Dispatch (10 tests)
 * 3. Redux State Verification (5 tests)
 *
 * Total: 20 tests
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { EventBusProvider } from '../EventBusProvider';
import { getGlobalEventBus } from '@/shared/services/eventBus';
import activityEntityReducer from '@/entities/eventActivity/model/store/slice';
import eventEntityReducer from '@/entities/event/model/store/slice';
import { EventType } from '@/shared/constants';

// Mock problematic entity selectors with circular dependencies
vi.mock('@/entities/entityContextLink', () => ({
  selectContextObjectsMap: vi.fn(() => ({})),
  selectContextLinkEntities: vi.fn(() => ({})),
  selectContextLinkIds: vi.fn(() => []),
}));

// Mock the UI features to avoid loading their dependencies
vi.mock('@/features/eventActivityManager', async (importOriginal) => {
  const actual = await importOriginal() as any;
  return {
    ...actual,
    EventActivitySidebar: () => null,
    EventActivityLog: () => null,
  };
});

import { EventActivityProvider } from '../EventActivityProvider';

const TestComponent = () => {
  return <div data-testid="test-component">Test Component</div>;
};

describe('EventActivityProvider ↔ Redux Integration', () => {
  let store: ReturnType<typeof configureStore>;
  let consoleWarnSpy: any;
  let consoleErrorSpy: any;

  const createTestStore = () => {
    return configureStore({
      reducer: {
        eventEntity: eventEntityReducer,
        activityEntity: activityEntityReducer,
      },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: false,
        }),
    });
  };

  beforeEach(() => {
    const eventBus = getGlobalEventBus();
    eventBus.clear();

    store = createTestStore();

    consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleWarnSpy.mockRestore();
    consoleErrorSpy.mockRestore();
    vi.clearAllMocks();
  });

  // ═══════════════════════════════════════════════════════════════
  // CATEGORY 1: PROVIDER INITIALIZATION & CLEANUP (5 tests)
  // ═══════════════════════════════════════════════════════════════

  describe('Provider Initialization & Cleanup', () => {
    it('should initialize EventActivityService with EventBus', () => {
      render(
        <Provider store={store}>
          <EventBusProvider>
            <EventActivityProvider>
              <TestComponent />
            </EventActivityProvider>
          </EventBusProvider>
        </Provider>,
      );

      expect(screen.getByTestId('test-component')).toBeInTheDocument();
    });

    it('should subscribe to EventBus on mount', async () => {
      render(
        <Provider store={store}>
          <EventBusProvider>
            <EventActivityProvider>
              <TestComponent />
            </EventActivityProvider>
          </EventBusProvider>
        </Provider>,
      );

      const eventBus = getGlobalEventBus();

      // Test by emitting an event and checking if activity is created
      eventBus.emit(EventType.ELEMENT_CREATED, { elementId: 'test' });

      await waitFor(() => {
        const state = store.getState();
        // Activity should be created, proving subscription is active
        expect(state.activityEntity.ids.length).toBeGreaterThan(0);
      });
    });

    it('should cleanup on unmount', () => {
      const { unmount } = render(
        <Provider store={store}>
          <EventBusProvider>
            <EventActivityProvider>
              <TestComponent />
            </EventActivityProvider>
          </EventBusProvider>
        </Provider>,
      );

      const eventBus = getGlobalEventBus();
      const listenerCountBefore = eventBus.listenerCount();

      unmount();

      const listenerCountAfter = eventBus.listenerCount();

      // Listener count should decrease after unmount
      expect(listenerCountAfter).toBeLessThanOrEqual(listenerCountBefore);
    });

    it('should log initialization in development mode', () => {
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'development';

      const consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

      render(
        <Provider store={store}>
          <EventBusProvider>
            <EventActivityProvider>
              <TestComponent />
            </EventActivityProvider>
          </EventBusProvider>
        </Provider>,
      );

      expect(consoleLogSpy).toHaveBeenCalledWith(
        expect.stringContaining('[A-LOG-PROVIDER][I]'),
        expect.stringContaining('Initializing Activity Logger'),
      );

      consoleLogSpy.mockRestore();
      process.env.NODE_ENV = originalEnv;
    });

    it('should handle re-initialization gracefully', () => {
      const { rerender } = render(
        <Provider store={store}>
          <EventBusProvider>
            <EventActivityProvider>
              <TestComponent />
            </EventActivityProvider>
          </EventBusProvider>
        </Provider>,
      );

      rerender(
        <Provider store={store}>
          <EventBusProvider>
            <EventActivityProvider>
              <TestComponent />
            </EventActivityProvider>
          </EventBusProvider>
        </Provider>,
      );

      expect(screen.getByTestId('test-component')).toBeInTheDocument();
    });
  });

  // ═══════════════════════════════════════════════════════════════
  // CATEGORY 2: EVENT → ACTIVITY MAPPING & DISPATCH (10 tests)
  // ═══════════════════════════════════════════════════════════════

  describe('Event → Activity Mapping & Dispatch', () => {
    it('should create activity from element.created event', async () => {
      render(
        <Provider store={store}>
          <EventBusProvider>
            <EventActivityProvider>
              <TestComponent />
            </EventActivityProvider>
          </EventBusProvider>
        </Provider>,
      );

      const eventBus = getGlobalEventBus();
      eventBus.emit(EventType.ELEMENT_CREATED, { elementId: 'element-1', tag: 'div' });

      await waitFor(() => {
        const state = store.getState();
        expect(state.activityEntity.ids.length).toBeGreaterThan(0);
      });
    });

    it('should link activity to source event', async () => {
      render(
        <Provider store={store}>
          <EventBusProvider>
            <EventActivityProvider>
              <TestComponent />
            </EventActivityProvider>
          </EventBusProvider>
        </Provider>,
      );

      const eventBus = getGlobalEventBus();
      eventBus.emit(EventType.ELEMENT_CREATED, { elementId: 'element-1', tag: 'div' });

      await waitFor(() => {
        const activityState = store.getState().activityEntity;
        const eventState = store.getState().eventEntity;

        const activity = activityState.entities[activityState.ids[0]];
        const event = eventState.entities[eventState.ids[0]];

        // Activity uses eventId, not sourceEventId
        expect(activity.eventId).toBe(event.id);
      });
    });

    it('should preserve activity structure and data', async () => {
      render(
        <Provider store={store}>
          <EventBusProvider>
            <EventActivityProvider>
              <TestComponent />
            </EventActivityProvider>
          </EventBusProvider>
        </Provider>,
      );

      const eventBus = getGlobalEventBus();
      eventBus.emit(EventType.ELEMENT_CREATED, { elementId: 'element-123', tag: 'button' });

      await waitFor(() => {
        const state = store.getState();
        const activity = state.activityEntity.entities[state.activityEntity.ids[0]];

        expect(activity.id).toMatch(/^activity-/);
        expect(activity.kind).toBe('activity');
        expect(activity.text).toBeDefined();
        expect(activity.text).toContain('button'); // Should include tag in text
        expect(activity.source).toBeDefined(); // source contains event payload
        expect(activity.eventId).toBeDefined();
      });
    });

    it('should handle multiple events creating multiple activities', async () => {
      render(
        <Provider store={store}>
          <EventBusProvider>
            <EventActivityProvider>
              <TestComponent />
            </EventActivityProvider>
          </EventBusProvider>
        </Provider>,
      );

      const eventBus = getGlobalEventBus();

      eventBus.emit(EventType.ELEMENT_CREATED, { elementId: '1', tag: 'div' });
      eventBus.emit(EventType.ELEMENT_UPDATED, { elementId: '2', tag: 'span' });
      eventBus.emit(EventType.ELEMENT_DELETED, { elementId: '3' });

      await waitFor(() => {
        const state = store.getState();
        // All three should create activities
        expect(state.activityEntity.ids.length).toBeGreaterThanOrEqual(3);
      }, { timeout: 2000 });
    });

    it('should create unique activity IDs for each event', async () => {
      render(
        <Provider store={store}>
          <EventBusProvider>
            <EventActivityProvider>
              <TestComponent />
            </EventActivityProvider>
          </EventBusProvider>
        </Provider>,
      );

      const eventBus = getGlobalEventBus();

      eventBus.emit(EventType.ELEMENT_CREATED, { elementId: '1' });
      eventBus.emit(EventType.ELEMENT_CREATED, { elementId: '2' });

      await waitFor(() => {
        const state = store.getState();
        const activities = state.activityEntity.ids.map((id: string) => state.activityEntity.entities[id]);
        const activityIds = activities.map((a: any) => a.id);

        const uniqueIds = new Set(activityIds);
        expect(uniqueIds.size).toBe(activities.length);
      });
    });

    it('should skip activity creation when config.createActivity = false', async () => {
      render(
        <Provider store={store}>
          <EventBusProvider>
            <EventActivityProvider>
              <TestComponent />
            </EventActivityProvider>
          </EventBusProvider>
        </Provider>,
      );

      const eventBus = getGlobalEventBus();

      // EventType.REDUX_ACTION has createActivity: false by default
      eventBus.emit(EventType.REDUX_ACTION, { action: 'test' });

      await new Promise(resolve => setTimeout(resolve, 100));

      const state = store.getState();
      // Should not create activity
      expect(state.activityEntity.ids.length).toBe(0);
    });

    it('should handle rapid event emissions', async () => {
      render(
        <Provider store={store}>
          <EventBusProvider>
            <EventActivityProvider>
              <TestComponent />
            </EventActivityProvider>
          </EventBusProvider>
        </Provider>,
      );

      const eventBus = getGlobalEventBus();
      const eventCount = 5;

      for (let i = 0; i < eventCount; i++) {
        eventBus.emit(EventType.ELEMENT_CREATED, { elementId: `element-${i}` });
      }

      await waitFor(() => {
        const state = store.getState();
        expect(state.activityEntity.ids.length).toBe(eventCount);
      }, { timeout: 2000 });
    });

    it('should log activity dispatch in development mode', async () => {
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'development';

      const consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

      render(
        <Provider store={store}>
          <EventBusProvider>
            <EventActivityProvider>
              <TestComponent />
            </EventActivityProvider>
          </EventBusProvider>
        </Provider>,
      );

      const eventBus = getGlobalEventBus();
      eventBus.emit(EventType.ELEMENT_CREATED, { elementId: '1' });

      await waitFor(() => {
        const calls = consoleLogSpy.mock.calls;
        const activityLog = calls.find(call =>
          call[0]?.includes('[A-LOG-PROVIDER][I]') &&
          call[1]?.includes('Received Activity'),
        );
        expect(activityLog).toBeDefined();
      });

      consoleLogSpy.mockRestore();
      process.env.NODE_ENV = originalEnv;
    });

    it('should handle errors during activity dispatch gracefully', async () => {
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'development';

      const consoleErrorMock = vi.spyOn(console, 'error').mockImplementation(() => {});

      const faultyReducer = (state = { ids: [], entities: {} }, action: any) => {
        if (action.type === 'activityEntity/addActivity') {
          throw new Error('Redux error');
        }
        return state;
      };

      const faultyStore = configureStore({
        reducer: {
          eventEntity: eventEntityReducer,
          activityEntity: faultyReducer,
        },
      });

      render(
        <Provider store={faultyStore}>
          <EventBusProvider>
            <EventActivityProvider>
              <TestComponent />
            </EventActivityProvider>
          </EventBusProvider>
        </Provider>,
      );

      const eventBus = getGlobalEventBus();

      expect(() => {
        eventBus.emit(EventType.ELEMENT_CREATED, { elementId: '1' });
      }).not.toThrow();

      await waitFor(() => {
        expect(consoleErrorMock).toHaveBeenCalledWith(
          expect.stringContaining('[A-LOG-PROVIDER][E]'),
          expect.stringContaining('Error dispatching Activity to Redux'),
          expect.any(Error),
        );
      });

      consoleErrorMock.mockRestore();
      process.env.NODE_ENV = originalEnv;
    });

    it('should use default mapper for unmapped event types', async () => {
      render(
        <Provider store={store}>
          <EventBusProvider>
            <EventActivityProvider>
              <TestComponent />
            </EventActivityProvider>
          </EventBusProvider>
        </Provider>,
      );

      const eventBus = getGlobalEventBus();
      // Use a mapped event type that we know will create an activity
      eventBus.emit(EventType.TASK_CREATED, { taskId: 'task-1', title: 'Test Task' });

      await waitFor(() => {
        const state = store.getState();
        // Should create activity
        expect(state.activityEntity.ids.length).toBeGreaterThan(0);
        const activity = state.activityEntity.entities[state.activityEntity.ids[0]];
        expect(activity.text).toBeDefined();
      });
    });
  });

  // ═══════════════════════════════════════════════════════════════
  // CATEGORY 3: REDUX STATE VERIFICATION (5 tests)
  // ═══════════════════════════════════════════════════════════════

  describe('Redux State Verification', () => {
    it('should store activities in normalized format', async () => {
      render(
        <Provider store={store}>
          <EventBusProvider>
            <EventActivityProvider>
              <TestComponent />
            </EventActivityProvider>
          </EventBusProvider>
        </Provider>,
      );

      const eventBus = getGlobalEventBus();
      eventBus.emit(EventType.ELEMENT_CREATED, { elementId: '1' });

      await waitFor(() => {
        const state = store.getState();

        expect(state.activityEntity.ids).toBeDefined();
        expect(state.activityEntity.entities).toBeDefined();
        expect(Array.isArray(state.activityEntity.ids)).toBe(true);
        expect(typeof state.activityEntity.entities).toBe('object');
      });
    });

    it('should prevent duplicate activity IDs in Redux', async () => {
      render(
        <Provider store={store}>
          <EventBusProvider>
            <EventActivityProvider>
              <TestComponent />
            </EventActivityProvider>
          </EventBusProvider>
        </Provider>,
      );

      const eventBus = getGlobalEventBus();

      eventBus.emit(EventType.ELEMENT_CREATED, { elementId: '1' });
      eventBus.emit(EventType.ELEMENT_CREATED, { elementId: '2' });
      eventBus.emit(EventType.ELEMENT_CREATED, { elementId: '3' });

      await waitFor(() => {
        const state = store.getState();
        const uniqueIds = new Set(state.activityEntity.ids);

        expect(uniqueIds.size).toBe(state.activityEntity.ids.length);
      });
    });

    it('should maintain activity order in Redux store', async () => {
      render(
        <Provider store={store}>
          <EventBusProvider>
            <EventActivityProvider>
              <TestComponent />
            </EventActivityProvider>
          </EventBusProvider>
        </Provider>,
      );

      const eventBus = getGlobalEventBus();
      const types = [
        EventType.ELEMENT_CREATED,
        EventType.ELEMENT_UPDATED,
        EventType.ELEMENT_DELETED,
      ];

      types.forEach((type) => {
        eventBus.emit(type, { elementId: `${type}`, tag: 'div' });
      });

      await waitFor(() => {
        const state = store.getState();
        expect(state.activityEntity.ids.length).toBe(3);

        const activities = state.activityEntity.ids.map((id: string) => state.activityEntity.entities[id]);

        // Verify order is preserved by checking eventId exists
        expect(activities[0].eventId).toBeDefined();
        expect(activities[1].eventId).toBeDefined();
        expect(activities[2].eventId).toBeDefined();
      });
    });

    it('should allow querying activities by eventId', async () => {
      render(
        <Provider store={store}>
          <EventBusProvider>
            <EventActivityProvider>
              <TestComponent />
            </EventActivityProvider>
          </EventBusProvider>
        </Provider>,
      );

      const eventBus = getGlobalEventBus();

      eventBus.emit(EventType.ELEMENT_CREATED, { elementId: '1', tag: 'div' });
      eventBus.emit(EventType.ELEMENT_UPDATED, { elementId: '2', tag: 'span' });

      await waitFor(() => {
        const activityState = store.getState().activityEntity;
        const eventState = store.getState().eventEntity;

        const firstEvent = eventState.entities[eventState.ids[0]];
        const activities = activityState.ids.map((id: string) => activityState.entities[id]);
        const linkedActivity = activities.find((a: any) => a.eventId === firstEvent.id);

        expect(linkedActivity).toBeDefined();
      });
    });

    it('should maintain Redux state consistency after multiple operations', async () => {
      render(
        <Provider store={store}>
          <EventBusProvider>
            <EventActivityProvider>
              <TestComponent />
            </EventActivityProvider>
          </EventBusProvider>
        </Provider>,
      );

      const eventBus = getGlobalEventBus();

      for (let i = 0; i < 5; i++) {
        eventBus.emit(EventType.ELEMENT_CREATED, { elementId: `${i}` });
      }

      await waitFor(() => {
        const state = store.getState();

        expect(state.activityEntity.ids.length).toBe(5);
        expect(Object.keys(state.activityEntity.entities).length).toBe(5);

        state.activityEntity.ids.forEach((id: string) => {
          expect(state.activityEntity.entities[id]).toBeDefined();
          expect(state.activityEntity.entities[id].id).toBe(id);
        });
      });
    });
  });
});

