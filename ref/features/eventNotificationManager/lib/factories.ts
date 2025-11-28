import { Event } from '@/shared/types';
import {
  Notification,
  NotificationPriorityEnum,
  NotificationTypeEnum,
  NotificationMapper,
} from '@/shared/services/eventNotification';

const createNotificationId = (eventId: string): string => {
  return `notification-${eventId}`;
};

export const createNotification = (event: Event): Notification => {
  const src = event.payload;

  return {
    id: createNotificationId(event.id),
    kind: event.kind,
    type: NotificationTypeEnum.INFO,
    eventId: event.id,
    eventType: event.type,
    createdAt: new Date().toISOString(),
    shownAt: null,
    readAt: null,
    dismissedAt: null,

    source: src,
    title: src.title || '',
    text: src.text || '',
    recipients: src.recipients,
    priority: src.priority || NotificationPriorityEnum.LOW,


  };
};

// Default notification mapper / Маппер уведомлений по умолчанию
export const defaultNotificationMapper: NotificationMapper = (event: Event): Partial<Notification> => {
  return {
    id: createNotificationId(event.id),
    eventId: event.id,
    text: `Event: ${event.type}`,
    title: '',
    kind: event.kind,
    type: NotificationTypeEnum.INFO,
    createdAt: new Date().toISOString(),
  };
};
