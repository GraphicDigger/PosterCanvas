// Activity Logger Provider / Провайдер логирования активности
// Connects activityService to Redux / Подключает activityService к Redux
import { type FC, useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '@/app/store';
import { addActivity } from '@/entities/eventActivity';
import { EventActivityService, setActivityLoggerService, EventActivityProviderProps } from '@/shared/services/eventActivity';
import { ACTIVITY_MAPPERS, ACTIVITY_CONFIG } from '@/features/eventActivityManager';
import type { Activity } from '@/shared/services/eventActivity/types';
import { getGlobalEventBus } from '@/shared/services/eventBus';

/**
 * Provider for Activity Logger Service / Провайдер для сервиса логирования активности
 * Responsibilities:
 * - Initialize activityService with Redux dispatch for Activity / Инициализация activityService с Redux dispatch для Activity
 * - Handle cleanup on unmount / Обработка очистки при размонтировании
 */
export const EventActivityProvider: FC<EventActivityProviderProps> = ({ children }) => {
  const dispatch = useDispatch<AppDispatch>();
  const eventBus = getGlobalEventBus();

  const activityService = useMemo(() => {
    const instance = new EventActivityService({
      eventBus,
      mappers: ACTIVITY_MAPPERS,
      config: ACTIVITY_CONFIG,
    });
    setActivityLoggerService(instance);
    return instance;
  }, [eventBus]);

  const isDevMode: boolean = process.env.NODE_ENV === 'development';
  const LOG = {
    info: (...msg: any[]) => isDevMode && console.log('[A-LOG-PROVIDER][I]', ...msg),
    warn: (...msg: any[]) => isDevMode && console.warn('[A-LOG-PROVIDER][W]', ...msg),
    error: (...msg: any[]) => isDevMode && console.error('[A-LOG-PROVIDER][E]', ...msg),
  };

  useEffect(() => {
    LOG.info('🚀 Initializing Activity Logger');

    // Initialize service with callback that dispatches Activity to Redux / Инициализируем сервис с callback, который диспатчит Activity в Redux
    activityService.initialize((activity: Activity | null) => {
      try {
        if (activity) {
          LOG.info('📦 Received Activity:', activity.id);
          dispatch(addActivity(activity as any));
          if (process.env.NODE_ENV === 'development') {
            LOG.info('🟢 Dispatched Activity to Redux');
          }
        }
      } catch (error) {
        LOG.error('🔴 Error dispatching Activity to Redux:', error);
      }
    });


    // // Handler for UI activity clicks & subscribe to the UI event (return unsubscribe function)
    // const handleActivityClick = (payload: { sourceKind?: string; sourceId?: string }) => {
    //   const { sourceKind, sourceId } = payload;
    //   if (sourceKind && sourceId) {
    //     LOG.info(`🖱️ UI_ACTIVITY_CLICKED: Selecting entity ${sourceKind}:${sourceId}`);
    //     dispatch(entityActions.select(sourceKind, sourceId));
    //   }
    // };
    // const unsubscribeActivityClick = eventBus.on(EventType.UI_ACTIVITY_CLICKED, handleActivityClick);
    // LOG.info('👂 Subscribed to UI_ACTIVITY_CLICKED');


    // Cleanup on unmount
    return () => {
      if (process.env.NODE_ENV === 'development') {
        LOG.info('🧹 Cleaning up Activity Logger');
      }
      activityService.destroy();
      // unsubscribeActivityClick();
    };
  }, [
    dispatch,
    activityService,
    eventBus,
    LOG,
  ]);

  return <>{children}</>;
};

