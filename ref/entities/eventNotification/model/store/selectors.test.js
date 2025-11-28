// ===================================================================
// Unit Tests for EventNotification Entity Redux Selectors
// Coverage Target: 95%+
// Continuation Phase (Selector Testing)
// ===================================================================

import { describe, it, expect, vi } from 'vitest';
import {
  selectNotificationState,
  selectNotificationEntities,
  selectNotificationIds,
  selectNotificationUI,
  selectAllNotifications,
  selectNotificationById,
  selectSelectedNotification,
  selectNotificationsByIds,
} from './selectors';

// Mock UI state selectors
vi.mock('./uiStates/selectors', () => ({
  selectSelectedNotificationId: vi.fn((state) => state.mockSelectedNotificationId || null),
}));

describe('EventNotification Entity Selectors', () => {
  describe('Base Selectors', () => {
    describe('selectNotificationState', () => {
      it('should return notification entity state', () => {
        const notificationState = {
          entities: {},
          ids: [],
          ui: {},
        };
        const state = {
          notificationEntity: notificationState,
        };

        expect(selectNotificationState(state)).toEqual(notificationState);
      });
    });

    describe('selectNotificationEntities', () => {
      it('should return notification entities object', () => {
        const entities = {
          'notification-1': { id: 'notification-1', message: 'Test notification', type: 'info' },
          'notification-2': { id: 'notification-2', message: 'Warning', type: 'warning' },
        };
        const state = {
          notificationEntity: {
            entities,
          },
        };

        expect(selectNotificationEntities(state)).toEqual(entities);
      });

      it('should return empty object when no entities', () => {
        const state = {
          notificationEntity: {
            entities: {},
          },
        };

        expect(selectNotificationEntities(state)).toEqual({});
      });
    });

    describe('selectNotificationIds', () => {
      it('should return notification ids array', () => {
        const ids = ['notification-1', 'notification-2', 'notification-3'];
        const state = {
          notificationEntity: {
            ids,
          },
        };

        expect(selectNotificationIds(state)).toEqual(ids);
      });

      it('should return empty array when no ids', () => {
        const state = {
          notificationEntity: {
            ids: [],
          },
        };

        expect(selectNotificationIds(state)).toEqual([]);
      });
    });

    describe('selectNotificationUI', () => {
      it('should return notification UI state', () => {
        const uiState = {
          selectedNotificationId: 'notification-1',
          hoveredNotificationId: 'notification-2',
        };
        const state = {
          notificationEntity: {
            ui: uiState,
          },
        };

        expect(selectNotificationUI(state)).toEqual(uiState);
      });

      it('should return empty UI state', () => {
        const state = {
          notificationEntity: {
            ui: {},
          },
        };

        expect(selectNotificationUI(state)).toEqual({});
      });
    });
  });

  describe('Entity Lookup Selectors', () => {
    describe('selectNotificationById', () => {
      it('should return notification by ID', () => {
        const notification = {
          id: 'notification-1',
          message: 'Test notification',
          type: 'info',
          timestamp: Date.now(),
        };
        const state = {
          notificationEntity: {
            entities: {
              'notification-1': notification,
            },
          },
        };

        expect(selectNotificationById(state, 'notification-1')).toEqual(notification);
      });

      it('should return undefined for non-existent ID', () => {
        const state = {
          notificationEntity: {
            entities: {},
          },
        };

        expect(selectNotificationById(state, 'non-existent')).toBeUndefined();
      });

      it('should handle notification with complex properties', () => {
        const notification = {
          id: 'notification-1',
          message: 'Complex notification',
          type: 'success',
          metadata: {
            source: 'system',
            priority: 'high',
          },
          actions: [
            { label: 'View', action: 'view' },
            { label: 'Dismiss', action: 'dismiss' },
          ],
        };
        const state = {
          notificationEntity: {
            entities: {
              'notification-1': notification,
            },
          },
        };

        const result = selectNotificationById(state, 'notification-1');
        expect(result.metadata.priority).toBe('high');
        expect(result.actions).toHaveLength(2);
      });
    });

    describe('selectSelectedNotification', () => {
      it('should return selected notification', () => {
        const notification = { id: 'notification-selected', message: 'Selected notification' };
        const state = {
          notificationEntity: {
            entities: {
              'notification-selected': notification,
            },
          },
          mockSelectedNotificationId: 'notification-selected',
        };

        expect(selectSelectedNotification(state)).toEqual(notification);
      });

      it('should return null when no notification selected', () => {
        const state = {
          notificationEntity: {
            entities: {},
          },
          mockSelectedNotificationId: null,
        };

        expect(selectSelectedNotification(state)).toBeNull();
      });

      it('should return null when entities is null', () => {
        const state = {
          notificationEntity: {
            entities: null,
          },
          mockSelectedNotificationId: 'notification-1',
        };

        expect(selectSelectedNotification(state)).toBeNull();
      });

      it('should return null when selected notification does not exist', () => {
        const state = {
          notificationEntity: {
            entities: {},
          },
          mockSelectedNotificationId: 'non-existent',
        };

        expect(selectSelectedNotification(state)).toBeNull();
      });
    });
  });

  describe('Collection Selectors', () => {
    describe('selectAllNotifications', () => {
      it('should return all notifications as array', () => {
        const entities = {
          'notification-1': { id: 'notification-1', message: 'First', type: 'info' },
          'notification-2': { id: 'notification-2', message: 'Second', type: 'warning' },
          'notification-3': { id: 'notification-3', message: 'Third', type: 'error' },
        };
        const state = {
          notificationEntity: {
            ids: ['notification-1', 'notification-2', 'notification-3'],
            entities,
          },
        };

        const result = selectAllNotifications(state);
        expect(result).toHaveLength(3);
        expect(result[0]).toEqual(entities['notification-1']);
        expect(result[1]).toEqual(entities['notification-2']);
        expect(result[2]).toEqual(entities['notification-3']);
      });

      it('should return empty array when no notifications', () => {
        const state = {
          notificationEntity: {
            ids: [],
            entities: {},
          },
        };

        expect(selectAllNotifications(state)).toEqual([]);
      });

      it('should maintain order based on ids array', () => {
        const state = {
          notificationEntity: {
            ids: ['notification-3', 'notification-1', 'notification-2'],
            entities: {
              'notification-1': { id: 'notification-1', order: 1 },
              'notification-2': { id: 'notification-2', order: 2 },
              'notification-3': { id: 'notification-3', order: 3 },
            },
          },
        };

        const result = selectAllNotifications(state);
        expect(result[0].id).toBe('notification-3');
        expect(result[1].id).toBe('notification-1');
        expect(result[2].id).toBe('notification-2');
      });

      it('should handle undefined notifications', () => {
        const state = {
          notificationEntity: {
            ids: ['notification-1', 'non-existent', 'notification-2'],
            entities: {
              'notification-1': { id: 'notification-1', message: 'First' },
              'notification-2': { id: 'notification-2', message: 'Second' },
            },
          },
        };

        const result = selectAllNotifications(state);
        expect(result).toHaveLength(3);
        expect(result[1]).toBeUndefined();
      });
    });

    describe('selectNotificationsByIds', () => {
      it('should return notifications for given IDs', () => {
        const state = {
          notificationEntity: {
            entities: {
              'notification-1': { id: 'notification-1', message: 'First' },
              'notification-2': { id: 'notification-2', message: 'Second' },
              'notification-3': { id: 'notification-3', message: 'Third' },
            },
          },
        };

        const result = selectNotificationsByIds(state, ['notification-1', 'notification-3']);
        expect(result).toHaveLength(2);
        expect(result[0].message).toBe('First');
        expect(result[1].message).toBe('Third');
      });

      it('should filter out non-existent notifications', () => {
        const state = {
          notificationEntity: {
            entities: {
              'notification-1': { id: 'notification-1', message: 'First' },
            },
          },
        };

        const result = selectNotificationsByIds(state, ['notification-1', 'non-existent']);
        expect(result).toHaveLength(1);
        expect(result[0].id).toBe('notification-1');
      });

      it('should return empty array when ids is null', () => {
        const state = {
          notificationEntity: {
            entities: {},
          },
        };

        const result = selectNotificationsByIds(state, null);
        expect(result).toEqual([]);
      });

      it('should return empty array when entities is null', () => {
        const state = {
          notificationEntity: {
            entities: null,
          },
        };

        const result = selectNotificationsByIds(state, ['notification-1']);
        expect(result).toEqual([]);
      });

      it('should return empty array when ids array is empty', () => {
        const state = {
          notificationEntity: {
            entities: {
              'notification-1': { id: 'notification-1' },
            },
          },
        };

        const result = selectNotificationsByIds(state, []);
        expect(result).toEqual([]);
      });

      it('should maintain order from ids array', () => {
        const state = {
          notificationEntity: {
            entities: {
              'notification-1': { id: 'notification-1', message: 'First' },
              'notification-2': { id: 'notification-2', message: 'Second' },
              'notification-3': { id: 'notification-3', message: 'Third' },
            },
          },
        };

        const result = selectNotificationsByIds(state, ['notification-3', 'notification-1', 'notification-2']);
        expect(result[0].message).toBe('Third');
        expect(result[1].message).toBe('First');
        expect(result[2].message).toBe('Second');
      });
    });
  });

  describe('Edge Cases', () => {
    describe('Different notification types', () => {
      it('should handle info notifications', () => {
        const state = {
          notificationEntity: {
            entities: {
              'notification-1': {
                id: 'notification-1',
                type: 'info',
                message: 'Information message',
                icon: 'info',
              },
            },
          },
        };

        const result = selectNotificationById(state, 'notification-1');
        expect(result.type).toBe('info');
        expect(result.icon).toBe('info');
      });

      it('should handle warning notifications', () => {
        const state = {
          notificationEntity: {
            entities: {
              'notification-1': {
                id: 'notification-1',
                type: 'warning',
                message: 'Warning message',
                icon: 'warning',
              },
            },
          },
        };

        const result = selectNotificationById(state, 'notification-1');
        expect(result.type).toBe('warning');
      });

      it('should handle error notifications', () => {
        const state = {
          notificationEntity: {
            entities: {
              'notification-1': {
                id: 'notification-1',
                type: 'error',
                message: 'Error message',
                icon: 'error',
              },
            },
          },
        };

        const result = selectNotificationById(state, 'notification-1');
        expect(result.type).toBe('error');
      });

      it('should handle success notifications', () => {
        const state = {
          notificationEntity: {
            entities: {
              'notification-1': {
                id: 'notification-1',
                type: 'success',
                message: 'Success message',
                icon: 'check',
              },
            },
          },
        };

        const result = selectNotificationById(state, 'notification-1');
        expect(result.type).toBe('success');
      });
    });

    describe('Notification with actions', () => {
      it('should handle notifications with action buttons', () => {
        const notification = {
          id: 'notification-1',
          message: 'Confirm action',
          type: 'warning',
          actions: [
            { label: 'Confirm', callback: 'handleConfirm' },
            { label: 'Cancel', callback: 'handleCancel' },
          ],
        };
        const state = {
          notificationEntity: {
            entities: {
              'notification-1': notification,
            },
          },
        };

        const result = selectNotificationById(state, 'notification-1');
        expect(result.actions).toHaveLength(2);
        expect(result.actions[0].label).toBe('Confirm');
      });
    });

    describe('Notification with metadata', () => {
      it('should handle notifications with timestamps', () => {
        const timestamp = Date.now();
        const notification = {
          id: 'notification-1',
          message: 'Timestamped notification',
          type: 'info',
          timestamp,
          expiresAt: timestamp + 60000,
        };
        const state = {
          notificationEntity: {
            entities: {
              'notification-1': notification,
            },
          },
        };

        const result = selectNotificationById(state, 'notification-1');
        expect(result.timestamp).toBe(timestamp);
        expect(result.expiresAt).toBeGreaterThan(timestamp);
      });

      it('should handle notifications with user context', () => {
        const notification = {
          id: 'notification-1',
          message: 'User notification',
          type: 'info',
          userId: 'user-123',
          userRole: 'admin',
        };
        const state = {
          notificationEntity: {
            entities: {
              'notification-1': notification,
            },
          },
        };

        const result = selectNotificationById(state, 'notification-1');
        expect(result.userId).toBe('user-123');
        expect(result.userRole).toBe('admin');
      });
    });

    describe('Empty state handling', () => {
      it('should handle completely empty state', () => {
        const state = {
          notificationEntity: {
            entities: {},
            ids: [],
            ui: {},
          },
        };

        expect(selectAllNotifications(state)).toEqual([]);
        expect(selectSelectedNotification(state)).toBeNull();
      });
    });
  });
});

