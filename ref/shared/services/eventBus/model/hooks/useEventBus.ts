import { useContext, useEffect, useCallback, useRef, DependencyList } from 'react';
import { createContext } from 'react';
import type { EventBus } from '../../EventBus';
import type { EventTypeFromPayloadMap, PayloadForEvent } from '../../types';
import { getGlobalEventBus } from '../../EventBus';


export const EventBusContext = createContext<EventBus | null>(null);


// Hook to access EventBus instance from context / Хук для доступа к экземпляру EventBus из контекста
export const useEventBus = (): EventBus => {
  const eventBus = useContext(EventBusContext);

  // Fallback to global singleton if provider is not available / Используем глобальный singleton если провайдер недоступен
  if (!eventBus) {
    if (process.env.NODE_ENV === 'development') {
      console.warn(
        '[useEventBus] EventBusProvider not found, using global singleton. ' +
                'Consider adding EventBusProvider to your component tree.',
      );
    }
    return getGlobalEventBus();
  }

  return eventBus;
};


// Hook to subscribe to an event with automatic cleanup / Хук для подписки на событие с автоматической очисткой
// Event type / Тип события
// Event handler function / Функция обработчика события
// Optional dependency array for handler memoization / Опциональный массив зависимостей для мемоизации обработчика
export const useEventSubscription = <T extends EventTypeFromPayloadMap>(
  type: T,
  handler: (payload: PayloadForEvent<T>) => void,
  deps: DependencyList = [],
): void => {
  const eventBus = useEventBus();
  const handlerRef = useRef(handler);

  // Keep handler ref up to date / Обновляем ref обработчика
  useEffect(() => {
    handlerRef.current = handler;
  }, [handler, ...deps]);

  useEffect(() => {
    // Create wrapper that uses latest handler / Создаем обертку, использующую последний обработчик
    const wrappedHandler = (payload: PayloadForEvent<T>) => {
      handlerRef.current(payload);
    };
    // Subscribe to event / Подписываемся на событие
    const unsubscribe = eventBus.on(type as string, wrappedHandler);
    // Cleanup on unmount / Очистка при размонтировании
    return unsubscribe;
  }, [eventBus, type]);
};


// Hook to emit events / Хук для публикации событий
// Example:
// const emit = useEmitEvent();
// emit(EventType.ELEMENT_CREATED, { elementId: '123', tag: 'div' });
export const useEmitEvent = () => {
  const eventBus = useEventBus();

  return useCallback(
        <T extends EventTypeFromPayloadMap>(
      type: T,
      payload: PayloadForEvent<T>,
    ) => {
          eventBus.emit(type as string, payload);
        },
        [eventBus],
  );
};


// Hook to subscribe to an event once (auto-unsubscribe after first call) / Хук для одноразовой подписки на событие (автоматическая отписка после первого вызова)
// Event type / Тип события
// Event handler function / Функция обработчика события
// Example:
// useEventOnce(EventType.SYSTEM_DATA_INITIALIZED, () => {
// console.log('Data initialized!');
// });
export const useEventOnce = <T extends EventTypeFromPayloadMap>(
  type: T,
  handler: (payload: PayloadForEvent<T>) => void,
): void => {
  const eventBus = useEventBus();

  useEffect(() => {
    const unsubscribe = eventBus.once(type as string, handler);
    return unsubscribe;
  }, [eventBus, type, handler]);
};


// Hook to get event history (for debugging) / Хук для получения истории событий (для отладки)
export const useEventHistory = () => {
  const eventBus = useEventBus();

  return eventBus.getHistory();
};


// Hook to get listener count for a specific event type / Хук для получения количества подписчиков для конкретного типа события
export const useEventListenerCount = (type: string): number => {
  const eventBus = useEventBus();

  return eventBus.listenerCount(type);
};

