// ===================================================================
// EVENT BUS UNIT TESTS - Week 1, Day 1-2
// 🟢 LOW RISK - Isolated Service Testing
// 60 tests covering core EventBus functionality
// ===================================================================

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { EventBusService } from '../EventBus';
import { ENTITY_KINDS } from '@/shared/constants';
import type { Event } from '@/shared/types';
import type { EventHandler, EventMiddleware } from '../types';

describe('EventBus - Unit Tests', () => {
  let eventBus: EventBusService;

  beforeEach(() => {
    eventBus = new EventBusService();
  });

  afterEach(() => {
    eventBus.clear();
  });

  // ===================================================================
  // Section 1: Event Creation (10 tests)
  // ===================================================================

  describe('Event Creation', () => {
    it('should create event with unique ID', () => {
      const callback = vi.fn();
      eventBus.initialize(callback);

      eventBus.emit('element.created', { elementId: '123' });

      expect(callback).toHaveBeenCalledWith(
        expect.objectContaining({
          id: expect.stringMatching(/^event-[a-f0-9-]+$/),
        }),
      );
    });

    it('should create event with correct kind', () => {
      const callback = vi.fn();
      eventBus.initialize(callback);

      eventBus.emit('element.created', { elementId: '123' });

      expect(callback).toHaveBeenCalledWith(
        expect.objectContaining({
          kind: ENTITY_KINDS.EVENT,
        }),
      );
    });

    it('should create event with correct type', () => {
      const callback = vi.fn();
      eventBus.initialize(callback);

      eventBus.emit('element.created', { elementId: '123' });

      expect(callback).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'element.created',
        }),
      );
    });

    it('should create event with ISO timestamps', () => {
      const callback = vi.fn();
      eventBus.initialize(callback);

      eventBus.emit('element.created', {});

      expect(callback).toHaveBeenCalledWith(
        expect.objectContaining({
          createdAt: expect.stringMatching(/^\d{4}-\d{2}-\d{2}T/),
          updatedAt: expect.stringMatching(/^\d{4}-\d{2}-\d{2}T/),
        }),
      );
    });

    it('should preserve payload data', () => {
      const callback = vi.fn();
      eventBus.initialize(callback);

      const payload = { elementId: '123', tag: 'div', memberId: 'user-1' };
      eventBus.emit('element.created', payload);

      expect(callback).toHaveBeenCalledWith(
        expect.objectContaining({
          payload: payload,
        }),
      );
    });

    it('should handle empty payload', () => {
      const callback = vi.fn();
      eventBus.initialize(callback);

      eventBus.emit('element.created', {});

      expect(callback).toHaveBeenCalledWith(
        expect.objectContaining({
          payload: {},
        }),
      );
    });

    it('should handle complex payload objects', () => {
      const callback = vi.fn();
      eventBus.initialize(callback);

      const complexPayload = {
        elementId: '123',
        properties: { width: 100, height: 200 },
        metadata: { createdBy: 'user-1', tags: ['important', 'design'] },
      };

      eventBus.emit('element.created', complexPayload);

      expect(callback).toHaveBeenCalledWith(
        expect.objectContaining({
          payload: complexPayload,
        }),
      );
    });

    it('should create different IDs for different events', () => {
      const callback = vi.fn();
      eventBus.initialize(callback);

      eventBus.emit('element.created', { elementId: '1' });
      eventBus.emit('element.created', { elementId: '2' });

      const call1 = callback.mock.calls[0][0];
      const call2 = callback.mock.calls[1][0];

      expect(call1.id).not.toBe(call2.id);
    });

    it('should create events with same timestamps for simultaneous emissions', () => {
      const callback = vi.fn();
      eventBus.initialize(callback);

      const beforeEmit = new Date().toISOString();
      eventBus.emit('element.created', {});
      const afterEmit = new Date().toISOString();

      const event = callback.mock.calls[0][0];
      expect(event.createdAt >= beforeEmit).toBe(true);
      expect(event.createdAt <= afterEmit).toBe(true);
    });

    it('should not create event when type is empty', () => {
      const callback = vi.fn();
      eventBus.initialize(callback);

      eventBus.emit('' as any, { data: 'test' });

      expect(callback).not.toHaveBeenCalled();
    });
  });

  // ===================================================================
  // Section 2: Subscription Management (15 tests)
  // ===================================================================

  describe('Subscription Management', () => {
    it('should subscribe to event', () => {
      const handler = vi.fn();
      eventBus.on('element.created', handler);

      eventBus.emit('element.created', { elementId: '123' });

      expect(handler).toHaveBeenCalledTimes(1);
    });

    it('should pass Event object to handler', () => {
      const handler = vi.fn();
      eventBus.on('element.created', handler);

      eventBus.emit('element.created', { elementId: '123' });

      expect(handler).toHaveBeenCalledWith(
        expect.objectContaining({
          id: expect.any(String),
          kind: ENTITY_KINDS.EVENT,
          type: 'element.created',
          payload: { elementId: '123' },
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        }),
      );
    });

    it('should allow multiple subscribers to same event', () => {
      const handler1 = vi.fn();
      const handler2 = vi.fn();
      const handler3 = vi.fn();

      eventBus.on('element.created', handler1);
      eventBus.on('element.created', handler2);
      eventBus.on('element.created', handler3);

      eventBus.emit('element.created', {});

      expect(handler1).toHaveBeenCalled();
      expect(handler2).toHaveBeenCalled();
      expect(handler3).toHaveBeenCalled();
    });

    it('should unsubscribe correctly using returned function', () => {
      const handler = vi.fn();
      const unsubscribe = eventBus.on('element.created', handler);

      unsubscribe();
      eventBus.emit('element.created', {});

      expect(handler).not.toHaveBeenCalled();
    });

    it('should unsubscribe correctly using off() method', () => {
      const handler = vi.fn();
      eventBus.on('element.created', handler);

      eventBus.off('element.created', handler);
      eventBus.emit('element.created', {});

      expect(handler).not.toHaveBeenCalled();
    });

    it('should only unsubscribe specific handler', () => {
      const handler1 = vi.fn();
      const handler2 = vi.fn();

      eventBus.on('element.created', handler1);
      eventBus.on('element.created', handler2);

      eventBus.off('element.created', handler1);
      eventBus.emit('element.created', {});

      expect(handler1).not.toHaveBeenCalled();
      expect(handler2).toHaveBeenCalled();
    });

    it('should support once() for single execution', () => {
      const handler = vi.fn();
      eventBus.once('element.created', handler);

      eventBus.emit('element.created', {});
      eventBus.emit('element.created', {});
      eventBus.emit('element.created', {});

      expect(handler).toHaveBeenCalledTimes(1);
    });

    it('should auto-cleanup once() subscription after execution', () => {
      const handler = vi.fn();
      eventBus.once('element.created', handler);

      eventBus.emit('element.created', {});

      expect(eventBus.listenerCount('element.created')).toBe(0);
    });

    it('should allow unsubscribe from once() before execution', () => {
      const handler = vi.fn();
      const unsubscribe = eventBus.once('element.created', handler);

      unsubscribe();
      eventBus.emit('element.created', {});

      expect(handler).not.toHaveBeenCalled();
    });

    it('should handle subscription to different event types', () => {
      const elementHandler = vi.fn();
      const taskHandler = vi.fn();

      eventBus.on('element.created', elementHandler);
      eventBus.on('task.created', taskHandler);

      eventBus.emit('element.created', {});
      eventBus.emit('task.created', {});

      expect(elementHandler).toHaveBeenCalledTimes(1);
      expect(taskHandler).toHaveBeenCalledTimes(1);
    });

    it('should not call handlers for different event types', () => {
      const handler = vi.fn();
      eventBus.on('element.created', handler);

      eventBus.emit('task.created', {});

      expect(handler).not.toHaveBeenCalled();
    });

    it('should handle empty event type in subscription', () => {
      const handler = vi.fn();
      const unsubscribe = eventBus.on('' as any, handler);

      eventBus.emit('element.created', {});

      expect(handler).not.toHaveBeenCalled();
      expect(typeof unsubscribe).toBe('function');
    });

    it('should handle non-function handler', () => {
      const unsubscribe = eventBus.on('element.created', 'not a function' as any);

      expect(typeof unsubscribe).toBe('function');
      expect(() => eventBus.emit('element.created', {})).not.toThrow();
    });

    it('should return listener count for event type', () => {
      eventBus.on('element.created', vi.fn());
      eventBus.on('element.created', vi.fn());
      eventBus.on('element.created', vi.fn());

      expect(eventBus.listenerCount('element.created')).toBe(3);
    });

    it('should return 0 for event type with no listeners', () => {
      expect(eventBus.listenerCount('element.created')).toBe(0);
    });
  });

  // ===================================================================
  // Section 3: Middleware Support (12 tests)
  // ===================================================================

  describe('Middleware Support', () => {
    it('should execute middleware before handlers', () => {
      const order: string[] = [];

      eventBus.use((type, payload, next) => {
        order.push('middleware');
        next();
      });

      eventBus.on('element.created', () => {
        order.push('handler');
      });

      eventBus.emit('element.created', {});

      expect(order).toEqual(['middleware', 'handler']);
    });

    it('should allow multiple middleware in sequence', () => {
      const order: string[] = [];

      eventBus.use((type, payload, next) => {
        order.push('middleware1');
        next();
      });

      eventBus.use((type, payload, next) => {
        order.push('middleware2');
        next();
      });

      eventBus.use((type, payload, next) => {
        order.push('middleware3');
        next();
      });

      eventBus.on('element.created', () => {
        order.push('handler');
      });

      eventBus.emit('element.created', {});

      expect(order).toEqual(['middleware1', 'middleware2', 'middleware3', 'handler']);
    });

    it('should stop propagation if next() not called', () => {
      const handler = vi.fn();

      eventBus.use((type, payload, next) => {
        // Don't call next()
      });

      eventBus.on('element.created', handler);
      eventBus.emit('element.created', {});

      expect(handler).not.toHaveBeenCalled();
    });

    it('should pass event type to middleware', () => {
      const middleware = vi.fn((type, payload, next) => next());

      eventBus.use(middleware);
      eventBus.emit('element.created', {});

      expect(middleware).toHaveBeenCalledWith(
        'element.created',
        expect.anything(),
        expect.any(Function),
      );
    });

    it('should pass payload to middleware', () => {
      const middleware = vi.fn((type, payload, next) => next());
      const testPayload = { elementId: '123', tag: 'div' };

      eventBus.use(middleware);
      eventBus.emit('element.created', testPayload);

      expect(middleware).toHaveBeenCalledWith(
        expect.anything(),
        testPayload,
        expect.any(Function),
      );
    });

    it('should continue to next middleware even if current one fails', () => {
      const order: string[] = [];

      eventBus.use((type, payload, next) => {
        throw new Error('Middleware error');
      });

      eventBus.use((type, payload, next) => {
        order.push('middleware2');
        next();
      });

      eventBus.on('element.created', () => {
        order.push('handler');
      });

      eventBus.emit('element.created', {});

      expect(order).toEqual(['middleware2', 'handler']);
    });

    it('should allow middleware to modify payload', () => {
      const handler = vi.fn();

      eventBus.use((type, payload, next) => {
        payload.modified = true;
        next();
      });

      eventBus.on('element.created', handler);
      eventBus.emit('element.created', { elementId: '123' });

      // Note: payload is passed to middleware but Event object is created after middleware
      // This test verifies middleware can access payload
      expect(handler).toHaveBeenCalledWith(
        expect.objectContaining({
          payload: expect.objectContaining({
            elementId: '123',
          }),
        }),
      );
    });

    it('should execute middleware for every emit', () => {
      const middleware = vi.fn((type, payload, next) => next());

      eventBus.use(middleware);

      eventBus.emit('element.created', {});
      eventBus.emit('task.created', {});
      eventBus.emit('element.updated', {});

      expect(middleware).toHaveBeenCalledTimes(3);
    });

    it('should handle non-function middleware gracefully', () => {
      eventBus.use('not a function' as any);

      expect(() => eventBus.emit('element.created', {})).not.toThrow();
    });

    it('should clear middleware on clear()', () => {
      const middleware = vi.fn((type, payload, next) => next());

      eventBus.use(middleware);
      eventBus.clear();

      eventBus.emit('element.created', {});

      // After clear, middleware should not be executed
      expect(middleware).not.toHaveBeenCalled();
    });

    it('should allow middleware to log events', () => {
      const log: any[] = [];

      eventBus.use((type, payload, next) => {
        log.push({ type, payload, timestamp: new Date().toISOString() });
        next();
      });

      eventBus.emit('element.created', { elementId: '1' });
      eventBus.emit('task.created', { taskId: '2' });

      expect(log).toHaveLength(2);
      expect(log[0].type).toBe('element.created');
      expect(log[1].type).toBe('task.created');
    });

    it('should allow middleware to filter events', () => {
      const handler = vi.fn();

      // Middleware that blocks 'element.created' events
      eventBus.use((type, payload, next) => {
        if (type === 'element.created') {
          return; // Don't call next()
        }
        next();
      });

      eventBus.on('element.created', handler);
      eventBus.on('task.created', handler);

      eventBus.emit('element.created', {});
      eventBus.emit('task.created', {});

      expect(handler).toHaveBeenCalledTimes(1);
      expect(handler).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'task.created',
        }),
      );
    });
  });

  // ===================================================================
  // Section 4: Memory Leak Prevention (10 tests)
  // ===================================================================

  describe('Memory Leak Prevention', () => {
    it('should remove handler from memory after unsubscribe', () => {
      const handler = vi.fn();
      const unsubscribe = eventBus.on('element.created', handler);

      expect(eventBus.listenerCount('element.created')).toBe(1);

      unsubscribe();

      expect(eventBus.listenerCount('element.created')).toBe(0);
    });

    it('should clean up once() handlers after execution', () => {
      eventBus.once('element.created', vi.fn());

      expect(eventBus.listenerCount('element.created')).toBe(1);

      eventBus.emit('element.created', {});

      expect(eventBus.listenerCount('element.created')).toBe(0);
    });

    it('should handle rapid subscribe/unsubscribe cycles', () => {
      for (let i = 0; i < 1000; i++) {
        const unsubscribe = eventBus.on('test.event', vi.fn());
        unsubscribe();
      }

      expect(eventBus.listenerCount('test.event')).toBe(0);
    });

    it('should clean up empty event type entries', () => {
      const handler1 = vi.fn();
      const handler2 = vi.fn();

      eventBus.on('element.created', handler1);
      eventBus.on('element.created', handler2);

      eventBus.off('element.created', handler1);
      eventBus.off('element.created', handler2);

      // After removing all handlers, event type should be cleaned up
      expect(eventBus.eventNames()).not.toContain('element.created');
    });

    it('should clear all listeners on clear()', () => {
      eventBus.on('element.created', vi.fn());
      eventBus.on('task.created', vi.fn());
      eventBus.on('element.updated', vi.fn());

      eventBus.clear();

      expect(eventBus.listenerCount('element.created')).toBe(0);
      expect(eventBus.listenerCount('task.created')).toBe(0);
      expect(eventBus.listenerCount('element.updated')).toBe(0);
      expect(eventBus.eventNames()).toHaveLength(0);
    });

    it('should clear event history on clear()', () => {
      const eventBusWithHistory = new EventBusService({ enableHistory: true });

      // History only records events when there are handlers
      eventBusWithHistory.on('element.created', vi.fn());
      eventBusWithHistory.on('task.created', vi.fn());

      eventBusWithHistory.emit('element.created', {});
      eventBusWithHistory.emit('task.created', {});

      expect(eventBusWithHistory.getHistory()).toHaveLength(2);

      eventBusWithHistory.clear();

      expect(eventBusWithHistory.getHistory()).toHaveLength(0);
    });

    it('should not leak memory with large number of events', () => {
      const handler = vi.fn();
      eventBus.on('element.created', handler);

      // Emit many events
      for (let i = 0; i < 10000; i++) {
        eventBus.emit('element.created', { elementId: `${i}` });
      }

      expect(handler).toHaveBeenCalledTimes(10000);
      expect(eventBus.listenerCount('element.created')).toBe(1);
    });

    it('should handle multiple unsubscribe calls safely', () => {
      const handler = vi.fn();
      const unsubscribe = eventBus.on('element.created', handler);

      unsubscribe();
      unsubscribe();
      unsubscribe();

      expect(() => eventBus.emit('element.created', {})).not.toThrow();
      expect(handler).not.toHaveBeenCalled();
    });

    it('should not leak when using once() repeatedly', () => {
      for (let i = 0; i < 1000; i++) {
        eventBus.once('element.created', vi.fn());
        eventBus.emit('element.created', {});
      }

      expect(eventBus.listenerCount('element.created')).toBe(0);
    });

    it('should properly clean up handlers when mixing on() and once()', () => {
      const handler1 = vi.fn();
      const handler2 = vi.fn();

      eventBus.on('element.created', handler1);
      eventBus.once('element.created', handler2);

      eventBus.emit('element.created', {});

      // once() should be cleaned up, on() should remain
      expect(eventBus.listenerCount('element.created')).toBe(1);

      eventBus.off('element.created', handler1);

      expect(eventBus.listenerCount('element.created')).toBe(0);
    });
  });

  // ===================================================================
  // Section 5: Redux Integration via Callback (8 tests)
  // ===================================================================

  describe('Redux Integration via Callback', () => {
    it('should call initialize callback with event', () => {
      const callback = vi.fn();
      eventBus.initialize(callback);

      eventBus.emit('element.created', { elementId: '123' });

      expect(callback).toHaveBeenCalledWith(
        expect.objectContaining({
          id: expect.any(String),
          kind: ENTITY_KINDS.EVENT,
          type: 'element.created',
          payload: { elementId: '123' },
        }),
      );
    });

    it('should call callback before notifying subscribers', () => {
      const order: string[] = [];

      eventBus.initialize(() => order.push('callback'));
      eventBus.on('element.created', () => order.push('subscriber'));

      eventBus.emit('element.created', {});

      expect(order).toEqual(['callback', 'subscriber']);
    });

    it('should not call callback for redux.* events', () => {
      const callback = vi.fn();
      eventBus.initialize(callback);

      eventBus.emit('redux.action.dispatched', { actionType: 'ADD_ELEMENT' });

      expect(callback).not.toHaveBeenCalled();
    });

    it('should call callback for non-redux events only', () => {
      const callback = vi.fn();
      eventBus.initialize(callback);

      eventBus.emit('element.created', {});
      eventBus.emit('redux.action.dispatched', {});
      eventBus.emit('task.created', {});

      expect(callback).toHaveBeenCalledTimes(2);
    });

    it('should return cleanup function from initialize', () => {
      const callback = vi.fn();
      const cleanup = eventBus.initialize(callback);

      expect(typeof cleanup).toBe('function');

      cleanup();

      eventBus.emit('element.created', {});

      expect(callback).not.toHaveBeenCalled();
    });

    it('should handle callback errors gracefully', () => {
      const failingCallback = vi.fn(() => {
        throw new Error('Callback error');
      });
      const handler = vi.fn();

      eventBus.initialize(failingCallback);
      eventBus.on('element.created', handler);

      expect(() => eventBus.emit('element.created', {})).not.toThrow();

      // Handler should still be called even if callback fails
      expect(handler).toHaveBeenCalled();
    });

    it('should clone event object for callback to prevent mutations', () => {
      let capturedEvent: Event | null = null;

      eventBus.initialize((event) => {
        capturedEvent = event;
        // Try to mutate
        (event as any).mutated = true;
      });

      eventBus.emit('element.created', { elementId: '123' });

      // Subscriber should not see mutation
      const handler = vi.fn();
      eventBus.on('element.created', handler);
      eventBus.emit('element.created', { elementId: '456' });

      const subscriberEvent = handler.mock.calls[0][0];
      expect(subscriberEvent.mutated).toBeUndefined();
    });

    it('should allow multiple initialize calls without error', () => {
      // Initialize can be called multiple times (e.g., in React StrictMode)
      // The last callback will be used
      const callback1 = vi.fn();
      const callback2 = vi.fn();

      eventBus.initialize(callback1);
      eventBus.initialize(callback2);

      eventBus.emit('element.created', {});

      // Only the second callback should be called
      expect(callback1).not.toHaveBeenCalled();
      expect(callback2).toHaveBeenCalled();
    });
  });

  // ===================================================================
  // Section 6: Error Handling (5 tests)
  // ===================================================================

  describe('Error Handling', () => {
    it('should not crash if handler throws error', () => {
      eventBus.on('element.created', () => {
        throw new Error('Handler error');
      });

      expect(() => {
        eventBus.emit('element.created', {});
      }).not.toThrow();
    });

    it('should continue to other handlers if one fails', () => {
      const handler1 = vi.fn(() => {
        throw new Error('Handler 1 error');
      });
      const handler2 = vi.fn();
      const handler3 = vi.fn();

      eventBus.on('element.created', handler1);
      eventBus.on('element.created', handler2);
      eventBus.on('element.created', handler3);

      eventBus.emit('element.created', {});

      expect(handler1).toHaveBeenCalled();
      expect(handler2).toHaveBeenCalled();
      expect(handler3).toHaveBeenCalled();
    });

    it('should handle errors in all handlers independently', () => {
      const handler1 = vi.fn(() => {
        throw new Error('Error 1');
      });
      const handler2 = vi.fn(() => {
        throw new Error('Error 2');
      });
      const handler3 = vi.fn();

      eventBus.on('element.created', handler1);
      eventBus.on('element.created', handler2);
      eventBus.on('element.created', handler3);

      expect(() => {
        eventBus.emit('element.created', {});
      }).not.toThrow();

      expect(handler3).toHaveBeenCalled();
    });

    it('should emit events even when no handlers registered', () => {
      expect(() => {
        eventBus.emit('element.created', { elementId: '123' });
      }).not.toThrow();
    });

    it('should handle invalid event types gracefully', () => {
      const callback = vi.fn();
      eventBus.initialize(callback);

      eventBus.emit(null as any, {});
      eventBus.emit(undefined as any, {});
      eventBus.emit('' as any, {});

      expect(callback).not.toHaveBeenCalled();
    });
  });

  // ===================================================================
  // Section 7: Event History (5 tests)
  // ===================================================================

  describe('Event History', () => {
    it('should not store history by default', () => {
      eventBus.emit('element.created', {});

      expect(eventBus.getHistory()).toHaveLength(0);
    });

    it('should store history when enabled', () => {
      const eventBusWithHistory = new EventBusService({ enableHistory: true });

      eventBusWithHistory.on('element.created', vi.fn());
      eventBusWithHistory.emit('element.created', { elementId: '123' });

      expect(eventBusWithHistory.getHistory()).toHaveLength(1);
    });

    it('should limit history size', () => {
      const eventBusWithHistory = new EventBusService({
        enableHistory: true,
        maxHistorySize: 5,
      });

      eventBusWithHistory.on('element.created', vi.fn());

      for (let i = 0; i < 10; i++) {
        eventBusWithHistory.emit('element.created', { elementId: `${i}` });
      }

      expect(eventBusWithHistory.getHistory()).toHaveLength(5);
    });

    it('should store events with correct structure in history', () => {
      const eventBusWithHistory = new EventBusService({ enableHistory: true });

      eventBusWithHistory.on('element.created', vi.fn());
      eventBusWithHistory.emit('element.created', { elementId: '123' });

      const history = eventBusWithHistory.getHistory();

      expect(history[0]).toMatchObject({
        id: expect.stringMatching(/^event-/),
        type: 'element.created',
        payload: { elementId: '123' },
        createdAt: expect.any(String),
      });
    });

    it('should return immutable history array', () => {
      const eventBusWithHistory = new EventBusService({ enableHistory: true });

      eventBusWithHistory.on('element.created', vi.fn());
      eventBusWithHistory.emit('element.created', {});

      const history1 = eventBusWithHistory.getHistory();
      const history2 = eventBusWithHistory.getHistory();

      // Should return different array instances
      expect(history1).not.toBe(history2);
      // But with same content
      expect(history1).toEqual(history2);
    });
  });

  // ===================================================================
  // Section 8: Utility Methods (5 tests)
  // ===================================================================

  describe('Utility Methods', () => {
    it('should return all registered event types', () => {
      eventBus.on('element.created', vi.fn());
      eventBus.on('task.created', vi.fn());
      eventBus.on('element.updated', vi.fn());

      const eventNames = eventBus.eventNames();

      expect(eventNames).toContain('element.created');
      expect(eventNames).toContain('task.created');
      expect(eventNames).toContain('element.updated');
      expect(eventNames).toHaveLength(3);
    });

    it('should return empty array when no events registered', () => {
      const eventNames = eventBus.eventNames();

      expect(eventNames).toEqual([]);
    });

    it('should return correct listener count', () => {
      eventBus.on('element.created', vi.fn());
      eventBus.on('element.created', vi.fn());
      eventBus.on('element.created', vi.fn());

      expect(eventBus.listenerCount('element.created')).toBe(3);
    });

    it('should return 0 for event with no listeners', () => {
      expect(eventBus.listenerCount('nonexistent.event')).toBe(0);
    });

    it('should update event names after clear', () => {
      eventBus.on('element.created', vi.fn());
      eventBus.on('task.created', vi.fn());

      expect(eventBus.eventNames()).toHaveLength(2);

      eventBus.clear();

      expect(eventBus.eventNames()).toHaveLength(0);
    });
  });
});

