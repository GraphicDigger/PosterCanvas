// Notification mappers / Мапперы для создания уведомлений
import { Event, Notification, NotificationTypeEnum, NotificationMapper } from '../../types';
import { createNotification } from '../../lib';

export const elementCreatedMapper: NotificationMapper = (event: Event): Partial<Notification> => {
  const tag = event.payload.tag || 'unknown';
  return {
    ...createNotification(event),
    type: NotificationTypeEnum.SUCCESS,
    text: `Element <${tag}> created`,
  };
};

export const elementDeletedMapper: NotificationMapper = (event: Event): Partial<Notification> => {
  return {
    ...createNotification(event),
    type: NotificationTypeEnum.INFO,
    text: 'Element deleted',
  };
};
