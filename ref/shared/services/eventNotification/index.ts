// Notification Service public API / Публичный API сервиса уведомлений

export {
  EventNotificationService,
  getNotificationService,
  setNotificationService,
} from './EventNotificationService';

export type {
  Notification,
  NotificationCallback,
  NotificationCallbackAction,
  NotificationEventMetadata,
  PartialNotification,
  NotificationAction,
  NotificationMapper,
  TempNotification,
  NotificationServiceProviderProps,
} from './types';

export {
  NotificationType as NotificationTypeEnum,
  NotificationPosition as NotificationPositionEnum,
  NotificationPriority as NotificationPriorityEnum,
} from './types';

export * from './model';
