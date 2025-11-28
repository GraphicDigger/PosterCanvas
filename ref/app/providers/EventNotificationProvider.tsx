// Notification Service Provider / Провайдер сервиса уведомлений
// Connects NotificationService to EventBus and Redux / Подключает NotificationService к EventBus и Redux

import { type FC, useMemo, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '@/app/store';
import {
  EventNotificationService,
  setNotificationService,
  NotificationServiceContext,
  type NotificationCallbackAction,
  type NotificationServiceProviderProps,
} from '@/shared/services/eventNotification';
import { addNotification, removeNotification, hideNotification, dismissNotification, readNotification } from '@/entities/eventNotification';
import { getGlobalEventBus } from '@/shared/services/eventBus';
import { NOTIFICATION_MAPPERS, NOTIFICATION_CONFIG } from '@/features/eventNotificationManager';


export const EventNotificationProvider: FC<NotificationServiceProviderProps> = ({
  children,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const notificationService = useMemo(() => {
    const eventBus = getGlobalEventBus();
    const instance = new EventNotificationService({
      eventBus,
      mappers: NOTIFICATION_MAPPERS,
      config: NOTIFICATION_CONFIG,
    });
    setNotificationService(instance);
    return instance;
  }, []);

  useEffect(() => {
    notificationService.initialize((action: NotificationCallbackAction) => {
      switch (action.type) {
      case 'add':
        dispatch(addNotification(action.payload as any));
        break;
      case 'remove':
        dispatch(removeNotification(action.id as any));
        break;
      case 'read':
        dispatch(readNotification(action.id as any));
        break;
      case 'hide':
        dispatch(hideNotification(action.id as any));
        break;
      case 'dismiss':
        dispatch(dismissNotification(action.id as any));
        break;
      default:
        break;
      }
    });

    return () => {
      notificationService.destroy();
    };
  }, [dispatch, notificationService]);

  return (
    <NotificationServiceContext.Provider value={notificationService}>
      {children}
    </NotificationServiceContext.Provider>
  );
};
