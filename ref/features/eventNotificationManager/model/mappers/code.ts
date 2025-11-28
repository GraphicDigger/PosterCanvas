import { Event, Notification, NotificationTypeEnum, NotificationMapper } from '../../types';
import { createNotification } from '../../lib';


// Code notification mappers / Мапперы уведомлений кода
export const codeCreatedMapper: NotificationMapper = (event: Event): Partial<Notification> => {
  return {
    ...createNotification(event),
    type: NotificationTypeEnum.SUCCESS,
    text: 'Code created',
  };
};

export const codeDeletedMapper: NotificationMapper = (event: Event): Partial<Notification> => {
  return {
    ...createNotification(event),
    type: NotificationTypeEnum.INFO,
    text: 'Code deleted',
  };
};
