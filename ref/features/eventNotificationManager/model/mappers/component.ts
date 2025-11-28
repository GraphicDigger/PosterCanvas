import { Event, Notification, NotificationTypeEnum, NotificationMapper } from '../../types';
import { createNotification } from '../../lib';

// Component notification mappers / Мапперы уведомлений компонентов
export const componentCreatedMapper: NotificationMapper = (event: Event): Partial<Notification> => {
  return {
    ...createNotification(event),
    type: NotificationTypeEnum.SUCCESS,
    text: 'Component created',
  };
};
export const componentCreatedCodeMapper: NotificationMapper = (event: Event): Partial<Notification> => {
  return {
    ...createNotification(event),
    type: NotificationTypeEnum.SUCCESS,
    title: 'Component Created',
    text: 'Code component created successfully',
  };
};

export const componentCreatedNocodeMapper: NotificationMapper = (event: Event): Partial<Notification> => {
  return {
    ...createNotification(event),
    type: NotificationTypeEnum.SUCCESS,
    message: 'Visual component created successfully',
  };
};

export const componentDeletedMapper: NotificationMapper = (event: Event): Partial<Notification> => {
  return {
    ...createNotification(event),
    type: NotificationTypeEnum.INFO,
    message: 'Component deleted',
  };
};
