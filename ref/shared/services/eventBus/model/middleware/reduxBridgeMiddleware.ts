// Redux middleware for EventBus integration / Redux middleware для интеграции EventBus
import type { Middleware, UnknownAction } from '@reduxjs/toolkit';
import type { EventBus } from '../../EventBus';
import { EventType } from '../../types';

// Creates Redux middleware that publishes all Redux actions to EventBus / Создает Redux middleware, публикующий все Redux actions в EventBus
// EventBus instance / Экземпляр EventBus
// Redux middleware / Redux middleware
export const createReduxBridgeMiddleware = (eventBus: EventBus): Middleware => {
  return (store) => (next) => (action) => {
    const reduxAction = action as UnknownAction;
    // Process action through Redux first / Сначала обрабатываем action через Redux
    const result = next(action);

    try {
      // Get action type / Получаем тип action
      const actionType = reduxAction.type;

      if (!actionType || typeof actionType !== 'string') {
        // Skip actions without valid type / Пропускаем actions без валидного типа
        return result;
      }

      // Get current state after action / Получаем текущий state после action
      const state = store.getState();

      // Publish to EventBus specific redux action event / Публикуем в EventBus тип события с префиксом "redux."
      eventBus.emit(`${EventType.REDUX_ACTION_PREFIX}${actionType}`, {
        action: {
          type: actionType,
          payload: reduxAction.payload,
          meta: reduxAction.meta,
          error: reduxAction.error,
        },
        state,
        timestamp: Date.now(),
      });

      // Also publish generic redux action event / Публикуем общее событие в EventBus типа "redux.*"
      eventBus.emit(EventType.REDUX_ACTION, {
        action: {
          type: actionType,
          payload: reduxAction.payload,
          meta: reduxAction.meta,
          error: reduxAction.error,
        },
        state,
        timestamp: Date.now(),
      });
    } catch (error) {
      // Log error but don't break Redux flow / Логируем ошибку, но не ломаем Redux flow
      if (process.env.NODE_ENV === 'development') {
        console.error('[EventBusMiddleware] Error publishing action to EventBus:', error);
      }
    }

    return result;
  };
};

// Allows to exclude certain actions from being published to EventBus / Позволяет исключить определенные actions из публикации в EventBus
export const createReduxBridgeMiddlewareWithFilter = (
  eventBus: EventBus,
  options?: {
    // Action types to exclude from publishing / Типы actions для исключения из публикации
    exclude?: string[];
    // If provided, only these action types will be published / Если указано, публикуются только эти типы actions
    includeOnly?: string[];
    // Function to determine if action should be published / Функция для определения, публиковать ли action
    shouldPublish?: (action: UnknownAction) => boolean;
  },
): Middleware => {

  const { exclude = [], includeOnly, shouldPublish } = options || {};

  return (store) => (next) => (action) => {

    const reduxAction = action as UnknownAction;
    const result = next(action);

    try {
      const actionType = reduxAction.type;
      // console.log('[ReduxBridgeMiddleware] Action type:', actionType);

      if (!actionType || typeof actionType !== 'string') {
        return result;
      }

      // Check if action should be published / Проверяем, нужно ли публиковать action
      if (shouldPublish && !shouldPublish(reduxAction)) {
        return result;
      }

      // Check exclude list / Проверяем список исключений
      if (exclude.includes(actionType)) {
        return result;
      }

      // Check include list / Проверяем список включений
      if (includeOnly && !includeOnly.includes(actionType)) {
        return result;
      }

      const state = store.getState();

      // Publish to EventBus / Публикуем в EventBus
      eventBus.emit(`${EventType.REDUX_ACTION_PREFIX}${actionType}`, {
        action: {
          type: actionType,
          payload: reduxAction.payload,
          meta: reduxAction.meta,
          error: reduxAction.error,
        },
        state,
        timestamp: Date.now(),
      });

      eventBus.emit(EventType.REDUX_ACTION, {
        action: {
          type: actionType,
          payload: reduxAction.payload,
          meta: reduxAction.meta,
          error: reduxAction.error,
        },
        state,
        timestamp: Date.now(),
      });
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('[EventBusMiddleware] Error publishing action to EventBus:', error);
      }
    }

    return result;
  };
};
