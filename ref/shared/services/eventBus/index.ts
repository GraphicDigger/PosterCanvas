// Public API for EventBus / Публичный API для EventBus

export { EventBusService } from './EventBus';
// Export global singleton instance / Экспорт глобального singleton экземпляра
export { getGlobalEventBus } from './EventBus';

// Export types and constants / Экспорт типов и констант
export {
  // type EventBusType,
  type EventPayloadMap,
  type EventTypeFromPayloadMap,
  type PayloadForEvent,
  type EventSource,
  type EventTrigger,
  type ElementCreatedPayload,
  type ComponentCreatedPayload,
  type CodeCreatedPayload,
  type CommentAddedPayload,
  type TaskCreatedPayload,
  type DocumentCreatedPayload,
  type ReduxActionPayload,
  type EventEnvelope,
  type EventMiddleware,
  type EventBusProviderProps,
} from './types';

// Export hooks / Экспорт хуков
export {
  EventBusContext,
  useEventBus,
  useEventSubscription,
  useEmitEvent,
  useEventOnce,
  useEventHistory,
  useEventListenerCount,
} from './model/hooks/useEventBus';

// Export middleware / Экспорт middleware
export {
  createReduxBridgeMiddleware,
  createReduxBridgeMiddlewareWithFilter,
} from './model/middleware/reduxBridgeMiddleware';

