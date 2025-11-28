import { createContext, useContext } from 'react';
import type { NotificationService } from '../../types';
import { getNotificationService } from '../../EventNotificationService';
import { useEffect, useCallback } from 'react';
import type { PartialNotification } from '@/shared/services/eventNotification';


// Context for NotificationService / Контекст для NotificationService
export const NotificationServiceContext = createContext<NotificationService | null>(null);

// Hook to access NotificationService instance / Хук для доступа к экземпляру NotificationService
export const useNotificationService = (): NotificationService => {
  const notificationService = useContext(NotificationServiceContext);

  // Fallback to global singleton / Используем глобальный singleton
  if (!notificationService) {
    if (process.env.NODE_ENV === 'development') {
      console.warn(
        '[useNotificationService] NotificationServiceProvider not found, using global singleton. ' +
        'Consider adding NotificationServiceProvider to your component tree.',
      );
    }
    return getNotificationService();
  }
  return notificationService;
};


// Hook to show notifications / Хук для показа уведомлений
// Example:
// const { show, success, error, warning, info } = useNotification();
// success('Operation completed successfully!');
// error('Something went wrong');
// warning('Please review your changes');
// info('New version available');

export const useNotificationServiceActions = () => {
  const service = useNotificationService();

  const show = useCallback(
    (config: PartialNotification) => service.show(config),
    [service],
  );

  const success = useCallback((
    message: string,
    config?: PartialNotification,
  ) =>
    service.success(message, config),
  [service],
  );

  const error = useCallback((
    message: string,
    config?: PartialNotification,
  ) =>
    service.error(message, config),
  [service],
  );

  const warning = useCallback((
    message: string,
    config?: PartialNotification,
  ) =>
    service.warning(message, config),
  [service],
  );

  const info = useCallback((
    message: string,
    config?: PartialNotification,
  ) =>
    service.info(message, config),
  [service],
  );

  const dismiss = useCallback((
    id: string,
  ) => service.dismiss(id),
  [service],
  );

  const dismissAll = useCallback(
    () => service.dismissAll(),
    [service],
  );

  const read = useCallback((
    id: string,
  ) => service.read(id),
  [service],
  );

  return {
    show,
    success,
    error,
    warning,
    info,
    dismiss,
    dismissAll,
    read,
  };
};

// Hook to show notification on mount / Хук для показа уведомления при монтировании
// Example:
// useNotificationOnMount({
//   type: NotificationType.INFO,
//   message: 'Component mounted!'
// });
export const useNotificationOnMount = (
  config: PartialNotification,
  deps: React.DependencyList = [],
): void => {
  const service = useNotificationService();

  useEffect(() => {
    service.show(config);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [service, ...deps]);
};
