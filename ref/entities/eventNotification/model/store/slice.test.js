// ===================================================================
// Unit Tests for EventNotification Slice
// CRITICAL BUSINESS LOGIC - Notification State Management
// Phase 1, Day 3 - Part 1 (20 tests)
// ===================================================================

import { describe, it, expect, beforeEach } from 'vitest';
import notificationEntitySlice, {
  setNotifications,
  setHoveredNotificationId,
  setFocusedNotificationId,
  setSelectedNotificationId,
  addNotification,
  updateNotification,
  removeNotification,
} from './slice';

describe('EventNotification Slice', () => {
  let initialState;

  beforeEach(() => {
    initialState = {
      ids: [],
      entities: {},
      ui: {
        hoveredNotificationId: null,
        focusedNotificationId: null,
        selectedNotificationId: null,
      },
    };
  });

  // ===================================================================
  // PART 1: UI State Management (6 tests)
  // ===================================================================

  describe('UI State Management', () => {
    it('should set hovered notification ID', () => {
      const state = notificationEntitySlice(
        initialState,
        setHoveredNotificationId('notif-1'),
      );
      expect(state.ui.hoveredNotificationId).toBe('notif-1');
    });

    it('should set focused notification ID', () => {
      const state = notificationEntitySlice(
        initialState,
        setFocusedNotificationId('notif-2'),
      );
      expect(state.ui.focusedNotificationId).toBe('notif-2');
    });

    it('should set selected notification ID', () => {
      const state = notificationEntitySlice(
        initialState,
        setSelectedNotificationId('notif-3'),
      );
      expect(state.ui.selectedNotificationId).toBe('notif-3');
    });

    it('should update multiple UI states independently', () => {
      let state = notificationEntitySlice(
        initialState,
        setHoveredNotificationId('notif-1'),
      );
      state = notificationEntitySlice(state, setFocusedNotificationId('notif-2'));
      state = notificationEntitySlice(state, setSelectedNotificationId('notif-3'));

      expect(state.ui.hoveredNotificationId).toBe('notif-1');
      expect(state.ui.focusedNotificationId).toBe('notif-2');
      expect(state.ui.selectedNotificationId).toBe('notif-3');
    });

    it('should clear UI state with null', () => {
      initialState.ui.hoveredNotificationId = 'notif-1';
      initialState.ui.focusedNotificationId = 'notif-2';

      let state = notificationEntitySlice(initialState, setHoveredNotificationId(null));
      state = notificationEntitySlice(state, setFocusedNotificationId(null));

      expect(state.ui.hoveredNotificationId).toBeNull();
      expect(state.ui.focusedNotificationId).toBeNull();
    });

    it('should not affect entities when updating UI state', () => {
      initialState.entities['notif-1'] = {
        id: 'notif-1',
        message: 'Test notification',
      };
      initialState.ids.push('notif-1');

      const state = notificationEntitySlice(
        initialState,
        setSelectedNotificationId('notif-1'),
      );

      expect(state.entities['notif-1']).toEqual({
        id: 'notif-1',
        message: 'Test notification',
      });
    });
  });

  // ===================================================================
  // PART 2: Set Notifications (Bulk Load) (11 tests)
  // ===================================================================

  describe('Set Notifications (Bulk Load)', () => {
    it('should set notifications (replace all)', () => {
      const notifications = [
        { id: 'notif-1', message: 'New comment', type: 'comment' },
        { id: 'notif-2', message: 'Task assigned', type: 'task' },
      ];

      const state = notificationEntitySlice(initialState, setNotifications(notifications));

      expect(state.ids).toEqual(['notif-1', 'notif-2']);
      expect(Object.keys(state.entities)).toHaveLength(2);
    });

    it('should clear existing notifications when setting new ones', () => {
      initialState.entities['notif-old'] = {
        id: 'notif-old',
        message: 'Old notification',
      };
      initialState.ids.push('notif-old');

      const notifications = [
        { id: 'notif-new', message: 'New notification', type: 'info' },
      ];
      const state = notificationEntitySlice(initialState, setNotifications(notifications));

      expect(state.entities['notif-old']).toBeUndefined();
      expect(state.entities['notif-new']).toBeDefined();
    });

    it('should handle empty array in setNotifications', () => {
      initialState.entities['notif-1'] = { id: 'notif-1', message: 'Test' };
      initialState.ids.push('notif-1');

      const state = notificationEntitySlice(initialState, setNotifications([]));

      expect(state.ids).toHaveLength(0);
      expect(Object.keys(state.entities)).toHaveLength(0);
    });

    it('should preserve UI state when setting notifications', () => {
      initialState.ui.hoveredNotificationId = 'notif-hover';
      initialState.ui.focusedNotificationId = 'notif-focus';

      const notifications = [{ id: 'notif-1', message: 'Test', type: 'info' }];
      const state = notificationEntitySlice(initialState, setNotifications(notifications));

      expect(state.ui.hoveredNotificationId).toBe('notif-hover');
      expect(state.ui.focusedNotificationId).toBe('notif-focus');
    });

    it('should set notifications with complete metadata', () => {
      const notifications = [
        {
          id: 'notif-1',
          message: 'New comment on task',
          type: 'comment',
          read: false,
          createdAt: '2024-01-15T10:00:00Z',
          userId: 'user-1',
        },
      ];

      const state = notificationEntitySlice(initialState, setNotifications(notifications));

      expect(state.entities['notif-1'].message).toBe('New comment on task');
      expect(state.entities['notif-1'].type).toBe('comment');
      expect(state.entities['notif-1'].read).toBe(false);
      expect(state.entities['notif-1'].createdAt).toBe('2024-01-15T10:00:00Z');
      expect(state.entities['notif-1'].userId).toBe('user-1');
    });

    it('should handle notifications with null values', () => {
      const notifications = [
        {
          id: 'notif-1',
          message: 'Notification',
          type: null,
          read: null,
        },
      ];

      const state = notificationEntitySlice(initialState, setNotifications(notifications));

      expect(state.entities['notif-1'].type).toBeNull();
      expect(state.entities['notif-1'].read).toBeNull();
    });

    it('should handle large number of notifications', () => {
      const notifications = Array.from({ length: 100 }, (_, i) => ({
        id: `notif-${i}`,
        message: `Notification ${i}`,
        type: 'info',
      }));

      const state = notificationEntitySlice(initialState, setNotifications(notifications));

      expect(state.ids).toHaveLength(100);
      expect(Object.keys(state.entities)).toHaveLength(100);
    });

    it('should handle notifications with duplicate IDs (last wins)', () => {
      const notifications = [
        { id: 'notif-1', message: 'First', type: 'info' },
        { id: 'notif-1', message: 'Second', type: 'warning' },
      ];

      const state = notificationEntitySlice(initialState, setNotifications(notifications));

      expect(state.entities['notif-1'].message).toBe('Second');
      expect(state.entities['notif-1'].type).toBe('warning');
    });

    it('should handle notifications with special characters in message', () => {
      const notifications = [
        {
          id: 'notif-1',
          message: 'Test <script>alert("xss")</script> notification',
          type: 'info',
        },
      ];

      const state = notificationEntitySlice(initialState, setNotifications(notifications));

      expect(state.entities['notif-1'].message).toBe(
        'Test <script>alert("xss")</script> notification',
      );
    });

    it('should handle notifications with very long messages', () => {
      const longMessage = 'A'.repeat(10000);
      const notifications = [
        {
          id: 'notif-1',
          message: longMessage,
          type: 'info',
        },
      ];

      const state = notificationEntitySlice(initialState, setNotifications(notifications));

      expect(state.entities['notif-1'].message).toBe(longMessage);
      expect(state.entities['notif-1'].message).toHaveLength(10000);
    });

    it('should handle notifications with various types', () => {
      const notifications = [
        { id: 'notif-1', message: 'Info', type: 'info' },
        { id: 'notif-2', message: 'Warning', type: 'warning' },
        { id: 'notif-3', message: 'Error', type: 'error' },
        { id: 'notif-4', message: 'Success', type: 'success' },
      ];

      const state = notificationEntitySlice(initialState, setNotifications(notifications));

      expect(state.entities['notif-1'].type).toBe('info');
      expect(state.entities['notif-2'].type).toBe('warning');
      expect(state.entities['notif-3'].type).toBe('error');
      expect(state.entities['notif-4'].type).toBe('success');
    });
  });

  // ===================================================================
  // PART 3: Mutation Actions (Stub Tests) (3 tests)
  // ===================================================================

  describe('Mutation Actions (Stubs)', () => {
    it('should handle addNotification without error', () => {
      const notification = { id: 'notif-1', message: 'Test', type: 'info' };

      expect(() => {
        notificationEntitySlice(initialState, addNotification(notification));
      }).not.toThrow();
    });

    it('should handle updateNotification without error', () => {
      const update = { id: 'notif-1', read: true };

      expect(() => {
        notificationEntitySlice(initialState, updateNotification(update));
      }).not.toThrow();
    });

    it('should handle removeNotification without error', () => {
      expect(() => {
        notificationEntitySlice(initialState, removeNotification('notif-1'));
      }).not.toThrow();
    });
  });
});
