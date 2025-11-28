// ===================================================================
// EVENT NOTIFICATION SERVICE UNIT TESTS - Week 1, Day 4-5
// 🟢 LOW RISK - Isolated Service Testing
// 50 tests covering EventNotificationService functionality
// ===================================================================

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { EventNotificationService } from '../EventNotificationService';
import { EventBusService } from '@/shared/services/eventBus';
import type { Event } from '@/shared/types';
import type {
  Notification,
  NotificationMapper,
  NotificationConfig,
  PartialNotification,
  NotificationCallbackAction,
} from '../types';
import { NotificationType, NotificationPosition } from '../types';

describe('EventNotificationService - Unit Tests', () => {
  let eventBus: EventBusService;
  let service: EventNotificationService;
  let mockMappers: Record<string, NotificationMapper>;
  let mockConfig: Record<string, NotificationConfig>;
  let callback: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    // Use fake timers for testing auto-dismiss
    vi.useFakeTimers();

    eventBus = new EventBusService();

    // Default mappers
    mockMappers = {
      'element.created': (event: Event): PartialNotification => ({
        id: `notification-${event.id.replace('event-', '')}`,
        type: NotificationType.SUCCESS,
        text: `Element created: ${event.payload.tag || 'unknown'}`,
        title: 'Success',
      }),
      'task.created': (event: Event): PartialNotification => ({
        id: `notification-${event.id.replace('event-', '')}`,
        type: NotificationType.INFO,
        text: `Task created: ${event.payload.title || 'Untitled'}`,
        title: 'New Task',
      }),
      'error.event': (event: Event): PartialNotification => ({
        id: `notification-${event.id.replace('event-', '')}`,
        type: NotificationType.ERROR,
        text: event.payload.message || 'An error occurred',
        title: 'Error',
      }),
    };

    mockConfig = {
      'element.created': {
        enabled: true,
        duration: 3000,
        position: NotificationPosition.TOP_RIGHT,
        persistent: false, // Temporary
      },
      'task.created': {
        enabled: true,
        duration: 5000,
        persistent: true, // Persistent
      },
      'error.event': {
        enabled: true,
        duration: 0, // No auto-dismiss
        persistent: true,
      },
      'disabled.event': {
        enabled: false,
        duration: 3000,
      },
    };

    service = new EventNotificationService({
      eventBus,
      mappers: mockMappers,
      config: mockConfig,
    });

    callback = vi.fn();
  });

  afterEach(() => {
    service.destroy();
    eventBus.clear();
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  // ===================================================================
  // Section 1: Service Initialization (5 tests)
  // ===================================================================

  describe('Service Initialization', () => {
    it('should initialize with config and mappers', () => {
      expect(service).toBeDefined();
      expect(service).toBeInstanceOf(EventNotificationService);
    });

    it('should throw error if eventBus not provided', () => {
      expect(() => {
        new EventNotificationService({
          eventBus: null as any,
          mappers: mockMappers,
          config: mockConfig,
        });
      }).toThrow('[EventNotificationService] eventBus is required');
    });

    it('should throw error if mappers not provided', () => {
      expect(() => {
        new EventNotificationService({
          eventBus,
          mappers: null as any,
          config: mockConfig,
        });
      }).toThrow('[EventNotificationService] mappers is required');
    });

    it('should throw error if config not provided', () => {
      expect(() => {
        new EventNotificationService({
          eventBus,
          mappers: mockMappers,
          config: null as any,
        });
      }).toThrow('[EventNotificationService] config is required');
    });

    it('should subscribe to eventBus on initialize', () => {
      const listenerCountBefore = eventBus.listenerCount('element.created');

      service.initialize(callback);

      const listenerCountAfter = eventBus.listenerCount('element.created');

      expect(listenerCountAfter).toBe(listenerCountBefore + 1);
    });
  });

  // ===================================================================
  // Section 2: Notification Creation (10 tests)
  // ===================================================================

  describe('Notification Creation', () => {
    it('should create notification from event', () => {
      service.initialize(callback);

      eventBus.emit('element.created', { elementId: '123', tag: 'div' });

      expect(callback).toHaveBeenCalledWith({
        type: 'add',
        payload: expect.objectContaining({
          type: NotificationType.SUCCESS,
          text: 'Element created: div',
          title: 'Success',
        }),
      });
    });

    it('should include core notification fields', () => {
      service.initialize(callback);

      eventBus.emit('element.created', { elementId: '123', tag: 'div' });

      expect(callback).toHaveBeenCalledWith({
        type: 'add',
        payload: expect.objectContaining({
          id: expect.any(String),
          type: NotificationType.SUCCESS,
          text: expect.any(String),
          title: expect.any(String),
        }),
      });
    });

    it('should skip notification when config.enabled = false', () => {
      // Add mapper for disabled event
      const mappersWithDisabled = {
        ...mockMappers,
        'disabled.event': () => ({ type: NotificationType.INFO, text: 'Test' }),
      };

      const customService = new EventNotificationService({
        eventBus,
        mappers: mappersWithDisabled,
        config: mockConfig,
      });

      customService.initialize(callback);

      eventBus.emit('disabled.event', { data: 'test' });

      expect(callback).not.toHaveBeenCalled();

      customService.destroy();
    });

    it('should handle multiple event types with different mappers', () => {
      service.initialize(callback);

      eventBus.emit('element.created', { tag: 'div' });
      eventBus.emit('task.created', { title: 'Test Task' });

      expect(callback).toHaveBeenCalledTimes(2);
      expect(callback).toHaveBeenNthCalledWith(
        1,
        expect.objectContaining({
          payload: expect.objectContaining({
            text: 'Element created: div',
          }),
        }),
      );
      expect(callback).toHaveBeenNthCalledWith(
        2,
        expect.objectContaining({
          payload: expect.objectContaining({
            text: 'Task created: Test Task',
          }),
        }),
      );
    });

    it('should preserve mapper-specific data', () => {
      service.initialize(callback);

      eventBus.emit('element.created', {
        elementId: '123',
        tag: 'button',
      });

      expect(callback).toHaveBeenCalledWith({
        type: 'add',
        payload: expect.objectContaining({
          type: NotificationType.SUCCESS,
          text: 'Element created: button',
        }),
      });
    });

    it('should handle mapper returning null', () => {
      const nullMapper = vi.fn(() => null);
      const customMappers = { 'test.event': nullMapper };
      const customConfig = { 'test.event': { enabled: true } };

      const customService = new EventNotificationService({
        eventBus,
        mappers: customMappers,
        config: customConfig,
      });

      customService.initialize(callback);
      eventBus.emit('test.event', {});

      expect(callback).not.toHaveBeenCalled();

      customService.destroy();
    });

    it('should not call callback before initialize', () => {
      eventBus.emit('element.created', { elementId: '123' });

      expect(callback).not.toHaveBeenCalled();

      service.initialize(callback);

      eventBus.emit('element.created', { elementId: '456' });

      expect(callback).toHaveBeenCalledTimes(1);
    });

    it('should handle events without config entry', () => {
      service.initialize(callback);

      eventBus.emit('unconfigured.event', {});

      expect(callback).not.toHaveBeenCalled();
    });

    it('should create unique IDs for different notifications', () => {
      service.initialize(callback);

      eventBus.emit('element.created', { elementId: '1' });
      eventBus.emit('element.created', { elementId: '2' });

      const call1 = (callback.mock.calls[0][0] as any).payload;
      const call2 = (callback.mock.calls[1][0] as any).payload;

      expect(call1.id).not.toBe(call2.id);
    });

    it('should handle events with different notification types', () => {
      service.initialize(callback);

      eventBus.emit('element.created', {});
      eventBus.emit('error.event', { message: 'Test error' });

      expect(callback).toHaveBeenNthCalledWith(
        1,
        expect.objectContaining({
          payload: expect.objectContaining({
            type: NotificationType.SUCCESS,
          }),
        }),
      );

      expect(callback).toHaveBeenNthCalledWith(
        2,
        expect.objectContaining({
          payload: expect.objectContaining({
            type: NotificationType.ERROR,
          }),
        }),
      );
    });
  });

  // ===================================================================
  // Section 3: Lifecycle Management (15 tests)
  // ===================================================================

  describe('Lifecycle Management', () => {
    it('should auto-dismiss temporary notification after duration', () => {
      service.initialize(callback);

      eventBus.emit('element.created', {}); // 3000ms, persistent: false

      expect(callback).toHaveBeenCalledTimes(1);
      expect(callback).toHaveBeenLastCalledWith({
        type: 'add',
        payload: expect.anything(),
      });

      // Fast-forward time
      vi.advanceTimersByTime(3000);

      // Should call remove for temporary notification
      expect(callback).toHaveBeenCalledTimes(2);
      expect(callback).toHaveBeenLastCalledWith({
        type: 'remove',
        id: expect.any(String),
      });
    });

    it('should hide persistent notification after duration', () => {
      service.initialize(callback);

      eventBus.emit('task.created', { title: 'Test' }); // 5000ms, persistent: true

      expect(callback).toHaveBeenCalledTimes(1);

      // Fast-forward time
      vi.advanceTimersByTime(5000);

      // Should call hide for persistent notification
      expect(callback).toHaveBeenCalledTimes(2);
      expect(callback).toHaveBeenLastCalledWith({
        type: 'hide',
        id: expect.any(String),
      });
    });

    it('should not auto-dismiss when duration is 0', () => {
      service.initialize(callback);

      eventBus.emit('error.event', { message: 'Error' }); // duration: 0

      expect(callback).toHaveBeenCalledTimes(1);

      // Fast-forward time significantly
      vi.advanceTimersByTime(10000);

      // Should only have been called once (no auto-dismiss)
      expect(callback).toHaveBeenCalledTimes(1);
    });

    it('should handle manual dismiss of persistent notification', () => {
      service.initialize(callback);

      eventBus.emit('task.created', { title: 'Test' }); // persistent: true

      const addCall = callback.mock.calls[0][0] as NotificationCallbackAction;
      const notificationId = (addCall as any).payload.id;

      callback.mockClear();

      // Manually dismiss
      service.dismiss(notificationId);

      expect(callback).toHaveBeenCalledWith({
        type: 'dismiss',
        id: notificationId,
      });
    });

    it('should handle manual dismiss of temporary notification', () => {
      service.initialize(callback);

      eventBus.emit('element.created', {}); // persistent: false

      const addCall = callback.mock.calls[0][0] as NotificationCallbackAction;
      const notificationId = (addCall as any).payload.id;

      callback.mockClear();

      // Manually dismiss
      service.dismiss(notificationId);

      expect(callback).toHaveBeenCalledWith({
        type: 'remove',
        id: notificationId,
      });
    });

    it('should handle read action', () => {
      service.initialize(callback);

      eventBus.emit('task.created', { title: 'Test' });

      const addCall = callback.mock.calls[0][0] as NotificationCallbackAction;
      const notificationId = (addCall as any).payload.id;

      callback.mockClear();

      // Mark as read
      service.read(notificationId);

      expect(callback).toHaveBeenCalledWith({
        type: 'read',
        id: notificationId,
      });
    });

    it('should clear timer on manual dismiss', () => {
      service.initialize(callback);

      eventBus.emit('element.created', {}); // 3000ms timeout

      const addCall = callback.mock.calls[0][0] as NotificationCallbackAction;
      const notificationId = (addCall as any).payload.id;

      callback.mockClear();

      // Dismiss before timeout
      service.dismiss(notificationId);

      expect(callback).toHaveBeenCalledTimes(1);

      // Advance time past original duration
      vi.advanceTimersByTime(5000);

      // Should still only have 1 call (dismiss), no auto-dismiss
      expect(callback).toHaveBeenCalledTimes(1);
    });

    it('should clear timer on read', () => {
      service.initialize(callback);

      eventBus.emit('task.created', { title: 'Test' }); // 5000ms timeout

      const addCall = callback.mock.calls[0][0] as NotificationCallbackAction;
      const notificationId = (addCall as any).payload.id;

      callback.mockClear();

      // Read before timeout
      service.read(notificationId);

      expect(callback).toHaveBeenCalledTimes(1);

      // Advance time past original duration
      vi.advanceTimersByTime(7000);

      // Should still only have 1 call (read), no auto-dismiss
      expect(callback).toHaveBeenCalledTimes(1);
    });

    it('should handle multiple notifications with different lifecycles', () => {
      service.initialize(callback);

      // Temporary with 3s duration
      eventBus.emit('element.created', { elementId: '1' });
      // Persistent with 5s duration
      eventBus.emit('task.created', { title: 'Task 1' });

      expect(callback).toHaveBeenCalledTimes(2);
      callback.mockClear();

      // Advance 3 seconds - should remove first, not touch second
      vi.advanceTimersByTime(3000);

      expect(callback).toHaveBeenCalledTimes(1);
      expect(callback).toHaveBeenCalledWith({
        type: 'remove',
        id: expect.any(String),
      });

      callback.mockClear();

      // Advance 2 more seconds - should hide second
      vi.advanceTimersByTime(2000);

      expect(callback).toHaveBeenCalledTimes(1);
      expect(callback).toHaveBeenCalledWith({
        type: 'hide',
        id: expect.any(String),
      });
    });

    it('should handle rapid sequential notifications', () => {
      service.initialize(callback);

      for (let i = 0; i < 10; i++) {
        eventBus.emit('element.created', { elementId: `${i}` });
      }

      expect(callback).toHaveBeenCalledTimes(10);
    });

    it('should differentiate between hide and dismiss actions', () => {
      service.initialize(callback);

      // Persistent notification
      eventBus.emit('task.created', { title: 'Test 1' });
      const id1 = (callback.mock.calls[0][0] as any).payload.id;

      eventBus.emit('task.created', { title: 'Test 2' });
      const id2 = (callback.mock.calls[1][0] as any).payload.id;

      callback.mockClear();

      // Manual dismiss first notification before timer
      service.dismiss(id1);
      expect(callback).toHaveBeenNthCalledWith(1, {
        type: 'dismiss',
        id: id1,
      });

      callback.mockClear();

      // Auto-dismiss second (hide) - wait for its timer
      vi.advanceTimersByTime(5000);
      expect(callback).toHaveBeenCalledWith({
        type: 'hide',
        id: id2,
      });
    });

    it('should handle dismiss before auto-dismiss timer fires', () => {
      service.initialize(callback);

      eventBus.emit('task.created', { title: 'Test' }); // 5000ms

      const notificationId = (callback.mock.calls[0][0] as any).payload.id;

      callback.mockClear();

      // Dismiss at 2 seconds (before 5s timer)
      vi.advanceTimersByTime(2000);
      service.dismiss(notificationId);

      expect(callback).toHaveBeenCalledTimes(1);

      // Advance past original timer
      vi.advanceTimersByTime(5000);

      // Should still only be 1 call
      expect(callback).toHaveBeenCalledTimes(1);
    });

    it('should handle read before auto-dismiss timer fires', () => {
      service.initialize(callback);

      eventBus.emit('task.created', { title: 'Test' }); // 5000ms

      const notificationId = (callback.mock.calls[0][0] as any).payload.id;

      callback.mockClear();

      // Read at 2 seconds
      vi.advanceTimersByTime(2000);
      service.read(notificationId);

      expect(callback).toHaveBeenCalledTimes(1);

      // Advance past original timer
      vi.advanceTimersByTime(5000);

      // Should still only be 1 call
      expect(callback).toHaveBeenCalledTimes(1);
    });

    it('should handle notifications with custom durations', () => {
      const customConfig = {
        'short.event': {
          enabled: true,
          duration: 1000, // 1 second
          persistent: false,
        },
        'long.event': {
          enabled: true,
          duration: 10000, // 10 seconds
          persistent: false,
        },
      };

      const customMappers = {
        'short.event': (event: Event) => ({
          id: `notification-short-${event.id.replace('event-', '')}`,
          type: NotificationType.INFO,
          text: 'Short',
        }),
        'long.event': (event: Event) => ({
          id: `notification-long-${event.id.replace('event-', '')}`,
          type: NotificationType.INFO,
          text: 'Long',
        }),
      };

      const customService = new EventNotificationService({
        eventBus,
        mappers: customMappers,
        config: customConfig,
      });

      customService.initialize(callback);

      eventBus.emit('short.event', {});
      eventBus.emit('long.event', {});

      expect(callback).toHaveBeenCalledTimes(2);
      callback.mockClear();

      // After 1 second, short should be removed
      vi.advanceTimersByTime(1000);
      expect(callback).toHaveBeenCalledTimes(1);
      expect(callback).toHaveBeenCalledWith({
        type: 'remove',
        id: expect.stringMatching(/notification-short-/),
      });

      callback.mockClear();

      // After 9 more seconds, long should be removed
      vi.advanceTimersByTime(9000);
      expect(callback).toHaveBeenCalledTimes(1);
      expect(callback).toHaveBeenCalledWith({
        type: 'remove',
        id: expect.stringMatching(/notification-long-/),
      });

      customService.destroy();
    });

    it('should maintain notification ID mapping for lifecycle operations', () => {
      service.initialize(callback);

      eventBus.emit('task.created', { title: 'Test' });

      const notificationId = (callback.mock.calls[0][0] as any).payload.id;

      callback.mockClear();

      // Should be able to dismiss using the ID
      service.dismiss(notificationId);

      expect(callback).toHaveBeenCalledWith({
        type: 'dismiss',
        id: notificationId,
      });
    });
  });

  // ===================================================================
  // Section 4: Manual Notification Methods (5 tests)
  // ===================================================================

  describe('Manual Notification Methods', () => {
    it('should create success notification via success()', () => {
      service.initialize(callback);

      const id = service.success('Operation successful');

      expect(callback).toHaveBeenCalledWith({
        type: 'add',
        payload: expect.objectContaining({
          id,
          type: NotificationType.SUCCESS,
          text: 'Operation successful',
        }),
      });
    });

    it('should create error notification via error()', () => {
      service.initialize(callback);

      const id = service.error('Operation failed');

      expect(callback).toHaveBeenCalledWith({
        type: 'add',
        payload: expect.objectContaining({
          id,
          type: NotificationType.ERROR,
          text: 'Operation failed',
        }),
      });
    });

    it('should create warning notification via warning()', () => {
      service.initialize(callback);

      const id = service.warning('Be careful');

      expect(callback).toHaveBeenCalledWith({
        type: 'add',
        payload: expect.objectContaining({
          id,
          type: NotificationType.WARNING,
          text: 'Be careful',
        }),
      });
    });

    it('should create info notification via info()', () => {
      service.initialize(callback);

      const id = service.info('New update available');

      expect(callback).toHaveBeenCalledWith({
        type: 'add',
        payload: expect.objectContaining({
          id,
          type: NotificationType.INFO,
          text: 'New update available',
        }),
      });
    });

    it('should create custom notification via show()', () => {
      service.initialize(callback);

      const id = service.show({
        type: NotificationType.SUCCESS,
        text: 'Custom notification',
        title: 'Custom Title',
      });

      expect(callback).toHaveBeenCalledWith({
        type: 'add',
        payload: expect.objectContaining({
          id,
          type: NotificationType.SUCCESS,
          text: 'Custom notification',
          title: 'Custom Title',
        }),
      });
    });
  });

  // ===================================================================
  // Section 5: Timer Cleanup (5 tests)
  // ===================================================================

  describe('Timer Cleanup', () => {
    it('should clear all timers on destroy', () => {
      service.initialize(callback);

      // Create multiple notifications with timers
      eventBus.emit('element.created', { elementId: '1' });
      eventBus.emit('task.created', { title: 'Task 1' });
      eventBus.emit('element.created', { elementId: '2' });

      callback.mockClear();

      service.destroy();

      // Advance time significantly
      vi.advanceTimersByTime(10000);

      // No callbacks should fire after destroy
      expect(callback).not.toHaveBeenCalled();
    });

    it('should not call callback after destroy', () => {
      service.initialize(callback);

      service.destroy();

      eventBus.emit('element.created', {});

      expect(callback).not.toHaveBeenCalled();
    });

    it('should clear subscriptions on destroy', () => {
      service.initialize(callback);

      const countBefore = eventBus.listenerCount('element.created');

      service.destroy();

      const countAfter = eventBus.listenerCount('element.created');

      expect(countAfter).toBeLessThan(countBefore);
    });

    it('should handle multiple destroy calls safely', () => {
      service.initialize(callback);

      service.destroy();
      service.destroy();
      service.destroy();

      expect(() => eventBus.emit('element.created', {})).not.toThrow();
    });

    it('should allow re-initialization after destroy', () => {
      service.initialize(callback);

      eventBus.emit('element.created', {});
      expect(callback).toHaveBeenCalledTimes(1);

      service.destroy();

      const newCallback = vi.fn();
      service.initialize(newCallback);

      eventBus.emit('element.created', {});

      expect(callback).toHaveBeenCalledTimes(1); // Old callback not called
      expect(newCallback).toHaveBeenCalledTimes(1); // New callback called
    });
  });

  // ===================================================================
  // Section 6: Edge Cases & Error Handling (10 tests)
  // ===================================================================

  describe('Edge Cases & Error Handling', () => {
    it('should handle mapper throwing error gracefully', () => {
      const errorMapper = vi.fn(() => {
        throw new Error('Mapper error');
      });

      const errorService = new EventNotificationService({
        eventBus,
        mappers: { 'error.test': errorMapper },
        config: { 'error.test': { enabled: true } },
      });

      errorService.initialize(callback);

      expect(() => {
        eventBus.emit('error.test', {});
      }).not.toThrow();

      errorService.destroy();
    });

    it('should handle empty config object', () => {
      const emptyService = new EventNotificationService({
        eventBus,
        mappers: mockMappers,
        config: {},
      });

      emptyService.initialize(callback);

      eventBus.emit('element.created', {});

      expect(callback).not.toHaveBeenCalled();

      emptyService.destroy();
    });

    it('should handle notification without ID (auto-generate)', () => {
      service.initialize(callback);

      const id = service.show({
        type: NotificationType.INFO,
        text: 'Test',
      });

      expect(id).toBeDefined();
      expect(typeof id).toBe('string');
    });

    it('should handle notification with provided ID', () => {
      service.initialize(callback);

      const customId = 'custom-notification-id';
      const id = service.show({
        id: customId,
        type: NotificationType.INFO,
        text: 'Test',
      });

      expect(id).toBe(customId);
    });

    it('should not allow initialize when already initialized', () => {
      service.initialize(callback);

      const newCallback = vi.fn();
      service.initialize(newCallback);

      eventBus.emit('element.created', {});

      // Only first callback should be used
      expect(callback).toHaveBeenCalled();
      expect(newCallback).not.toHaveBeenCalled();
    });

    it('should handle dismiss of non-existent notification ID', () => {
      service.initialize(callback);

      expect(() => {
        service.dismiss('non-existent-id');
      }).not.toThrow();
    });

    it('should handle read of non-existent notification ID', () => {
      service.initialize(callback);

      expect(() => {
        service.read('non-existent-id');
      }).not.toThrow();
    });

    it('should handle events with missing payload fields', () => {
      service.initialize(callback);

      eventBus.emit('element.created', {}); // No tag field

      expect(callback).toHaveBeenCalledWith({
        type: 'add',
        payload: expect.objectContaining({
          text: 'Element created: unknown',
        }),
      });
    });

    it('should handle manual show without initialized callback', () => {
      const uninitializedService = new EventNotificationService({
        eventBus,
        mappers: mockMappers,
        config: mockConfig,
      });

      expect(() => {
        uninitializedService.show({
          type: NotificationType.INFO,
          text: 'Test',
        });
      }).not.toThrow();

      uninitializedService.destroy();
    });

    it('should handle very short duration (1ms)', () => {
      const shortConfig = {
        'short.event': {
          enabled: true,
          duration: 1, // 1ms
          persistent: false,
        },
      };

      const shortMapper = {
        'short.event': (event: Event) => ({
          id: `notification-${event.id.replace('event-', '')}`,
          type: NotificationType.INFO,
          text: 'Short',
        }),
      };

      const shortService = new EventNotificationService({
        eventBus,
        mappers: shortMapper,
        config: shortConfig,
      });

      shortService.initialize(callback);

      eventBus.emit('short.event', {});

      const notificationId = (callback.mock.calls[0][0] as any).payload.id;

      callback.mockClear();

      vi.advanceTimersByTime(1);

      expect(callback).toHaveBeenCalledWith({
        type: 'remove',
        id: notificationId,
      });

      shortService.destroy();
    });
  });
});

