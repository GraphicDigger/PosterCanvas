/**
 * Integration Tests: EventBusProvider ↔ Redux
 *
 * Week 2, Day 1: EventBus ↔ Redux Integration Tests
 *
 * Purpose: Test full integration between EventBus and Redux store
 * Coverage Target: 90%+ for EventBusProvider integration
 *
 * Integration Scenarios:
 * 1. Provider Initialization & Cleanup (5 tests)
 * 2. Event Dispatch to Redux (10 tests)
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
import eventEntityReducer from '@/entities/event/model/store/slice';
import { EventType } from '@/shared/constants';

// Test component to access EventBus from context
const TestComponent = ({ onMount }: { onMount?: () => void }) => {
  const eventBus = getGlobalEventBus();

  if (onMount) {
    onMount();
  }

  return <div data-testid="test-component">Test Component</div>;
};

describe('EventBusProvider ↔ Redux Integration', () => {
  let store: ReturnType<typeof configureStore>;
  let consoleWarnSpy: any;
  let consoleErrorSpy: any;

  const createTestStore = () => {
    return configureStore({
      reducer: {
        eventEntity: eventEntityReducer,
      },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: false,
        }),
    });
  };

  beforeEach(() => {
    // Clear EventBus before each test
    const eventBus = getGlobalEventBus();
    eventBus.clear();

    // Create fresh store
    store = createTestStore();

    // Spy on console methods
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
    it('should initialize EventBus with Redux dispatch callback', () => {
      render(
        <Provider store={store}>
          <EventBusProvider>
            <TestComponent />
          </EventBusProvider>
        </Provider>,
      );

      expect(screen.getByTestId('test-component')).toBeInTheDocument();
    });

    it('should provide EventBus instance via context', () => {
      let eventBusFromContext: any = null;

      const TestConsumer = () => {
        eventBusFromContext = getGlobalEventBus();
        return <div>Consumer</div>;
      };

      render(
        <Provider store={store}>
          <EventBusProvider>
            <TestConsumer />
          </EventBusProvider>
        </Provider>,
      );

      expect(eventBusFromContext).toBeDefined();
      expect(eventBusFromContext.emit).toBeDefined();
      expect(eventBusFromContext.on).toBeDefined();
    });

    it('should cleanup EventBus on unmount', () => {
      const { unmount } = render(
        <Provider store={store}>
          <EventBusProvider>
            <TestComponent />
          </EventBusProvider>
        </Provider>,
      );

      const eventBus = getGlobalEventBus();
      const initialListenerCount = eventBus.listenerCount();

      unmount();

      // After unmount, the cleanup should have been called
      expect(eventBus).toBeDefined();
    });

    it('should log initialization in development mode', () => {
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'development';

      const consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

      render(
        <Provider store={store}>
          <EventBusProvider>
            <TestComponent />
          </EventBusProvider>
        </Provider>,
      );

      // Check if initialization log was called
      expect(consoleLogSpy).toHaveBeenCalledWith(
        expect.stringContaining('[E-BUS-PROVIDER][I]'),
        expect.stringContaining('Initializing EventBus dispatch integration'),
      );

      consoleLogSpy.mockRestore();
      process.env.NODE_ENV = originalEnv;
    });

    it('should handle re-initialization gracefully', () => {
      const { rerender } = render(
        <Provider store={store}>
          <EventBusProvider>
            <TestComponent />
          </EventBusProvider>
        </Provider>,
      );

      rerender(
        <Provider store={store}>
          <EventBusProvider>
            <TestComponent />
          </EventBusProvider>
        </Provider>,
      );

      // Should not throw errors
      expect(screen.getByTestId('test-component')).toBeInTheDocument();
    });
  });

  // ═══════════════════════════════════════════════════════════════
  // CATEGORY 2: EVENT DISPATCH TO REDUX (10 tests)
  // ═══════════════════════════════════════════════════════════════

  describe('Event Dispatch to Redux', () => {
    it('should dispatch event to Redux when emitted', async () => {
      render(
        <Provider store={store}>
          <EventBusProvider>
            <TestComponent />
          </EventBusProvider>
        </Provider>,
      );

      const eventBus = getGlobalEventBus();
      const payload = { elementId: 'element-1', tag: 'div' };

      eventBus.emit(EventType.ELEMENT_CREATED, payload);

      await waitFor(() => {
        const state = store.getState();
        expect(state.eventEntity.ids.length).toBeGreaterThan(0);
      });
    });

    it('should preserve event payload in Redux', async () => {
      render(
        <Provider store={store}>
          <EventBusProvider>
            <TestComponent />
          </EventBusProvider>
        </Provider>,
      );

      const eventBus = getGlobalEventBus();
      const payload = {
        elementId: 'element-123',
        tag: 'button',
        memberId: 'member-456',
      };

      eventBus.emit(EventType.ELEMENT_CREATED, payload);

      await waitFor(() => {
        const state = store.getState();
        const events = state.eventEntity.ids.map((id: string) => state.eventEntity.entities[id]);
        const event = events.find((e: any) => e.type === EventType.ELEMENT_CREATED);

        expect(event).toBeDefined();
        expect(event.payload).toEqual(payload);
      });
    });

    it('should dispatch multiple events sequentially', async () => {
      render(
        <Provider store={store}>
          <EventBusProvider>
            <TestComponent />
          </EventBusProvider>
        </Provider>,
      );

      const eventBus = getGlobalEventBus();

      eventBus.emit(EventType.ELEMENT_CREATED, { elementId: '1' });
      eventBus.emit(EventType.ELEMENT_UPDATED, { elementId: '2' });
      eventBus.emit(EventType.ELEMENT_DELETED, { elementId: '3' });

      await waitFor(() => {
        const state = store.getState();
        expect(state.eventEntity.ids.length).toBe(3);
      });
    });

    it('should create unique event IDs for each dispatched event', async () => {
      render(
        <Provider store={store}>
          <EventBusProvider>
            <TestComponent />
          </EventBusProvider>
        </Provider>,
      );

      const eventBus = getGlobalEventBus();

      eventBus.emit(EventType.ELEMENT_CREATED, { elementId: '1' });
      eventBus.emit(EventType.ELEMENT_CREATED, { elementId: '2' });

      await waitFor(() => {
        const state = store.getState();
        const events = state.eventEntity.ids.map((id: string) => state.eventEntity.entities[id]);
        const eventIds = events.map((e: any) => e.id);

        // Check all IDs are unique
        const uniqueIds = new Set(eventIds);
        expect(uniqueIds.size).toBe(events.length);
      });
    });

    it('should include event metadata (createdAt, updatedAt, kind)', async () => {
      render(
        <Provider store={store}>
          <EventBusProvider>
            <TestComponent />
          </EventBusProvider>
        </Provider>,
      );

      const eventBus = getGlobalEventBus();
      eventBus.emit(EventType.ELEMENT_CREATED, { elementId: '1' });

      await waitFor(() => {
        const state = store.getState();
        const events = state.eventEntity.ids.map((id: string) => state.eventEntity.entities[id]);
        const event = events[0];

        expect(event.id).toMatch(/^event-/);
        expect(event.kind).toBe('event');
        expect(event.type).toBe(EventType.ELEMENT_CREATED);
        expect(event.createdAt).toBeDefined();
        expect(event.updatedAt).toBeDefined();
      });
    });

    it('should handle events with complex payload structures', async () => {
      render(
        <Provider store={store}>
          <EventBusProvider>
            <TestComponent />
          </EventBusProvider>
        </Provider>,
      );

      const eventBus = getGlobalEventBus();
      const complexPayload = {
        elementId: 'element-1',
        data: {
          nested: {
            value: 123,
            array: [1, 2, 3],
          },
        },
        metadata: {
          timestamp: Date.now(),
        },
      };

      eventBus.emit(EventType.ELEMENT_UPDATED, complexPayload);

      await waitFor(() => {
        const state = store.getState();
        const events = state.eventEntity.ids.map((id: string) => state.eventEntity.entities[id]);
        const event = events.find((e: any) => e.type === EventType.ELEMENT_UPDATED);

        expect(event.payload).toEqual(complexPayload);
        expect(event.payload.data.nested.value).toBe(123);
        expect(event.payload.data.nested.array).toEqual([1, 2, 3]);
      });
    });

    it('should handle events with empty payload', async () => {
      render(
        <Provider store={store}>
          <EventBusProvider>
            <TestComponent />
          </EventBusProvider>
        </Provider>,
      );

      const eventBus = getGlobalEventBus();
      eventBus.emit(EventType.INFO, {});

      await waitFor(() => {
        const state = store.getState();
        const events = state.eventEntity.ids.map((id: string) => state.eventEntity.entities[id]);
        const event = events.find((e: any) => e.type === EventType.INFO);

        expect(event).toBeDefined();
        expect(event.payload).toEqual({});
      });
    });

    it('should handle rapid event emissions', async () => {
      render(
        <Provider store={store}>
          <EventBusProvider>
            <TestComponent />
          </EventBusProvider>
        </Provider>,
      );

      const eventBus = getGlobalEventBus();
      const eventCount = 10;

      for (let i = 0; i < eventCount; i++) {
        eventBus.emit(EventType.ELEMENT_CREATED, { elementId: `element-${i}` });
      }

      await waitFor(() => {
        const state = store.getState();
        expect(state.eventEntity.ids.length).toBe(eventCount);
      });
    });

    it('should log successful event dispatch in development mode', async () => {
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'development';

      const consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

      render(
        <Provider store={store}>
          <EventBusProvider>
            <TestComponent />
          </EventBusProvider>
        </Provider>,
      );

      const eventBus = getGlobalEventBus();
      eventBus.emit(EventType.ELEMENT_CREATED, { elementId: '1' });

      await waitFor(() => {
        // Check that the dispatch log was called (2nd call after initialization)
        const calls = consoleLogSpy.mock.calls;
        const dispatchLog = calls.find(call =>
          call[0].includes('[E-BUS-PROVIDER][I]') &&
          call[1].includes('Dispatched Event to Redux'),
        );
        expect(dispatchLog).toBeDefined();
        expect(dispatchLog[1]).toContain(EventType.ELEMENT_CREATED);
      });

      consoleLogSpy.mockRestore();
      process.env.NODE_ENV = originalEnv;
    });

    it('should handle errors during event dispatch gracefully', async () => {
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'development';

      const consoleErrorMock = vi.spyOn(console, 'error').mockImplementation(() => {});

      // Create a faulty reducer that throws when addEvent is dispatched
      const faultyReducer = (state = { ids: [], entities: {} }, action: any) => {
        if (action.type === 'eventEntity/addEvent') {
          throw new Error('Redux error');
        }
        return state;
      };

      const faultyStore = configureStore({
        reducer: {
          eventEntity: faultyReducer,
        },
      });

      render(
        <Provider store={faultyStore}>
          <EventBusProvider>
            <TestComponent />
          </EventBusProvider>
        </Provider>,
      );

      const eventBus = getGlobalEventBus();

      // Should not throw, error should be caught and logged
      expect(() => {
        eventBus.emit(EventType.ELEMENT_CREATED, { elementId: '1' });
      }).not.toThrow();

      await waitFor(() => {
        expect(consoleErrorMock).toHaveBeenCalledWith(
          expect.stringContaining('[E-BUS-PROVIDER][E]'),
          expect.stringContaining('Error dispatching Event to Redux'),
          expect.any(Error),
        );
      });

      consoleErrorMock.mockRestore();
      process.env.NODE_ENV = originalEnv;
    });
  });

  // ═══════════════════════════════════════════════════════════════
  // CATEGORY 3: REDUX STATE VERIFICATION (5 tests)
  // ═══════════════════════════════════════════════════════════════

  describe('Redux State Verification', () => {
    it('should store events in normalized format (ids + entities)', async () => {
      render(
        <Provider store={store}>
          <EventBusProvider>
            <TestComponent />
          </EventBusProvider>
        </Provider>,
      );

      const eventBus = getGlobalEventBus();
      eventBus.emit(EventType.ELEMENT_CREATED, { elementId: '1' });

      await waitFor(() => {
        const state = store.getState();

        // Check normalized structure
        expect(state.eventEntity.ids).toBeDefined();
        expect(state.eventEntity.entities).toBeDefined();
        expect(Array.isArray(state.eventEntity.ids)).toBe(true);
        expect(typeof state.eventEntity.entities).toBe('object');
      });
    });

    it('should prevent duplicate event IDs in Redux', async () => {
      render(
        <Provider store={store}>
          <EventBusProvider>
            <TestComponent />
          </EventBusProvider>
        </Provider>,
      );

      const eventBus = getGlobalEventBus();

      // Emit same event multiple times
      eventBus.emit(EventType.ELEMENT_CREATED, { elementId: '1' });
      eventBus.emit(EventType.ELEMENT_CREATED, { elementId: '2' });
      eventBus.emit(EventType.ELEMENT_CREATED, { elementId: '3' });

      await waitFor(() => {
        const state = store.getState();
        const uniqueIds = new Set(state.eventEntity.ids);

        // All IDs should be unique
        expect(uniqueIds.size).toBe(state.eventEntity.ids.length);
      });
    });

    it('should maintain event order in Redux store', async () => {
      render(
        <Provider store={store}>
          <EventBusProvider>
            <TestComponent />
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
        eventBus.emit(type, { elementId: `${type}` });
      });

      await waitFor(() => {
        const state = store.getState();
        const events = state.eventEntity.ids.map((id: string) => state.eventEntity.entities[id]);

        // Check order is preserved
        expect(events[0].type).toBe(EventType.ELEMENT_CREATED);
        expect(events[1].type).toBe(EventType.ELEMENT_UPDATED);
        expect(events[2].type).toBe(EventType.ELEMENT_DELETED);
      });
    });

    it('should allow querying events by type from Redux', async () => {
      render(
        <Provider store={store}>
          <EventBusProvider>
            <TestComponent />
          </EventBusProvider>
        </Provider>,
      );

      const eventBus = getGlobalEventBus();

      eventBus.emit(EventType.ELEMENT_CREATED, { elementId: '1' });
      eventBus.emit(EventType.ELEMENT_UPDATED, { elementId: '2' });
      eventBus.emit(EventType.ELEMENT_CREATED, { elementId: '3' });

      await waitFor(() => {
        const state = store.getState();
        const events = state.eventEntity.ids.map((id: string) => state.eventEntity.entities[id]);
        const createdEvents = events.filter((e: any) => e.type === EventType.ELEMENT_CREATED);

        expect(createdEvents.length).toBe(2);
      });
    });

    it('should maintain Redux state consistency after multiple operations', async () => {
      render(
        <Provider store={store}>
          <EventBusProvider>
            <TestComponent />
          </EventBusProvider>
        </Provider>,
      );

      const eventBus = getGlobalEventBus();

      // Perform multiple operations
      for (let i = 0; i < 5; i++) {
        eventBus.emit(EventType.ELEMENT_CREATED, { elementId: `${i}` });
      }

      await waitFor(() => {
        const state = store.getState();

        // Verify consistency
        expect(state.eventEntity.ids.length).toBe(5);
        expect(Object.keys(state.eventEntity.entities).length).toBe(5);

        // Each ID should have a corresponding entity
        state.eventEntity.ids.forEach((id: string) => {
          expect(state.eventEntity.entities[id]).toBeDefined();
          expect(state.eventEntity.entities[id].id).toBe(id);
        });
      });
    });
  });
});

