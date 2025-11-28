import { Event, Notification, NotificationTypeEnum, NotificationMapper } from '../../types';
import { createNotification } from '../../lib';

// Document notification mappers / Мапперы уведомлений документов
export const documentCreatedMapper: NotificationMapper = (event: Event): Partial<Notification> => {
  return {
    ...createNotification(event),
    type: NotificationTypeEnum.SUCCESS,
    text: 'New document',
  };
};

export const documentDeletedMapper: NotificationMapper = (event: Event): Partial<Notification> => {
  return {
    ...createNotification(event),
    type: NotificationTypeEnum.INFO,
    text: 'Document deleted',
  };
};
