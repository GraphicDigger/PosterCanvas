import { Event, Notification, NotificationTypeEnum, NotificationMapper } from '../../types';
import { createNotification } from '../../lib';

// Comment notification mappers / Мапперы уведомлений комментариев
export const commentAddedMapper: NotificationMapper = (event: Event): Partial<Notification> => {
  return {
    ...createNotification(event),
    type: NotificationTypeEnum.INFO,
    text: 'New comment added',
  };
};

export const commentDeletedMapper: NotificationMapper = (event: Event): Partial<Notification> => {
  return {
    ...createNotification(event),
    type: NotificationTypeEnum.INFO,
    text: 'Comment deleted',
  };
};
