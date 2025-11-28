import type { EventEnvelope, EventHandler, EventMiddleware, EventType, Unsubscribe } from './types';
import type { Event } from '@/shared/types';
import { ENTITY_KINDS } from '@/shared/constants';
import { v4 as uuidv4 } from 'uuid';
import type { PayloadForEvent, EventTypeFromPayloadMap } from '@/shared/types';

/**
 * EventBus - Centralized event system for application-wide communication / Централизованная система событий для коммуникации в приложении
 *
 * Features:
 * - Type-safe event handling / Тип-безопасное обработка событий
 * - Event history tracking / Отслеживание истории событий
 * - Middleware support / Поддержка middleware
 * - Automatic error handling / Автоматическое обработка ошибок
 * - Memory leak prevention / Предотвращение утечек памяти
 */
export class EventBusService {
  // Map of event types to their handlers / Карта типов событий к их обработчикам
  private listeners = new Map<EventType, Set<EventHandler>>();
  private callback: ((event: Event) => void) | null = null;
  private eventHistory: EventEnvelope[] = [];
  private maxHistorySize = 100;
  private enableHistory: boolean;
  // Middleware chain (for future extensions) / Цепочка middleware (для будущих расширений)
  private middlewares: EventMiddleware[] = [];
  private isDevMode: boolean = process.env.NODE_ENV === 'development';

  private LOG = {
    info: (...msg: any[]) => this.isDevMode && console.log('[E-BUS][I]', ...msg),
    warn: (...msg: any[]) => this.isDevMode && console.warn('[E-BUS][W]', ...msg),
    error: (...msg: any[]) => this.isDevMode && console.error('[E-BUS][E]', ...msg),
  };

  constructor(options?: { enableHistory?: boolean; maxHistorySize?: number }) {
    this.enableHistory = options?.enableHistory ?? false;
    this.maxHistorySize = options?.maxHistorySize ?? 100;
  }

  initialize(callback: (event: Event) => void): () => void {
    if (this.callback) {
      if (process.env.NODE_ENV === 'development') {
        this.LOG.warn('Event dispatch callback is already initialized');
      }
    }
    this.callback = callback;
    if (process.env.NODE_ENV === 'development') {
      this.LOG.info('Initialized with event dispatch callback');
    }

    // Возвращаем функцию для очистки
    return () => {
      this.callback = null;
      if (process.env.NODE_ENV === 'development') {
        this.LOG.info('Cleared event dispatch callback.');
      }
    };
  }

  //Emit an event to all registered handlers / Публикует событие всем зарегистрированным обработчикам
  emit<T = any>(
    type: EventType,
    payload: T,
  ): void {
    if (!type) {
      this.LOG.warn('Attempted to emit event with empty type');
      return;
    }
    try {
      this.applyMiddlewares(type, payload, () => {
        const event = this.createEvent(type, payload as any);

        // 2. Отправляем этот объект в Redux через callback (если он есть).
        if (this.callback && !type.startsWith('redux.')) {
          try {
            // Клонируем, чтобы избежать случайных мутаций
            const eventForRedux = structuredClone ? structuredClone(event) : JSON.parse(JSON.stringify(event));
            this.callback(eventForRedux);
          } catch (error) {
            this.LOG.error('Error in event dispatch callback:', error);
          }
        }
        // Get handlers for this event type / Получаем обработчики для этого типа события
        const handlers = this.listeners.get(type);

        if (handlers && handlers.size > 0) {
          // Добавляем в историю, создав EventEnvelope
          if (this.enableHistory) {
            const envelope: EventEnvelope = {
              id: event.id,
              type: event.type as EventType,
              payload: event.payload,
              createdAt: event.createdAt,
            };
            this.addToHistory(envelope);
          }

          // Execute all handlers / Выполняем все обработчики
          // All handlers are called with the Event created in EventBus from sources / все обработчики с созданным Event + Payload из источников
          handlers.forEach((handler) => {
            try {
              const safeEvent = structuredClone ? structuredClone(event) : JSON.parse(JSON.stringify(event));
              handler(safeEvent);
            } catch (error) {
              // Log error but don't stop other handlers / Логируем ошибку, но не останавливаем другие обработчики
              this.LOG.error(`Error in handler for event "${type}":`, error);
            }
          });

          this.LOG.info(`Emitted event "${type}" to ${handlers.size} handler(s)`);
        } else {
          // this.log(`No handlers registered for event "${type}"`);
        }
      });
    } catch (error) {
      this.LOG.error(`Error emitting event "${type}":`, error);
    }
  }

  // Subscribe to an event type / Подписка на тип события
  // Event type identifier / Идентификатор типа события
  // Function to call when event is emitted / Функция для вызова при вызове события
  // Returns Unsubscribe function / Функция для отписки
  on<T = any>(
    type: EventType,
    handler: EventHandler<T>,
  ): Unsubscribe {
    if (!type) {
      this.LOG.warn('Attempted to subscribe to event with empty type');
      return () => { };
    }
    if (typeof handler !== 'function') {
      this.LOG.warn('Handler must be a function for event type:', type);
      return () => { };
    }
    // Get or create handler set for this event type / Получаем или создаем набор обработчиков для этого типа события
    if (!this.listeners.has(type)) {
      this.listeners.set(type, new Set());
    }

    const handlers = this.listeners.get(type)!;
    handlers.add(handler);

    // Return unsubscribe function / Возвращаем функцию отписки
    return () => {
      this.off(type, handler);
    };
  }

  // Unsubscribe from an event type / Отписка от типа события
  // Event type identifier / Идентификатор типа события
  // Handler function to remove / Функция обработчика для удаления
  off<T = any>(
    type: EventType,
    handler: EventHandler<T>,
  ): void {
    if (!type) {
      return;
    }

    const handlers = this.listeners.get(type);
    if (handlers) {
      const removed = handlers.delete(handler);
      if (removed) {
        this.LOG.info(`Unsubscribed from event "${type}" (remaining handlers: ${handlers.size})`);
        // Clean up empty handler sets / Очищаем пустые наборы обработчиков
        if (handlers.size === 0) {
          this.listeners.delete(type);
        }
      }
    }
  }

  // Subscribe to an event type and automatically unsubscribe after first call / Подписка на тип события с автоматической отпиской после первого вызова
  // Event type identifier / Идентификатор типа события
  // Function to call when event is emitted / Функция для вызова при вызове события
  // Returns Unsubscribe function / Функция для отписки
  once<T = any>(
    type: EventType,
    handler: EventHandler<T>,
  ): Unsubscribe {
    const wrappedHandler: EventHandler<T> = (payload: T) => {
      handler(payload);
      this.off(type, wrappedHandler);
    };

    return this.on(type, wrappedHandler);
  }

  // Add middleware to the event processing chain / Добавляет middleware в цепочку обработки событий
  use(middleware: EventMiddleware): void {
    if (typeof middleware !== 'function') {
      this.LOG.warn('Middleware must be a function');
      return;
    }
    this.middlewares.push(middleware);
    this.LOG.info(`Added middleware (total: ${this.middlewares.length})`);
  }


  // Remove all listeners and clear history / Удаляет все подписки и очищает историю
  clear(): void {
    const totalListeners = Array.from(this.listeners.values()).reduce(
      (sum, handlers) => sum + handlers.size, 0);

    this.listeners.clear();
    this.eventHistory = [];
    this.middlewares = [];

    this.LOG.info(`Cleared all listeners (removed ${totalListeners} handler(s))`);
  }

  // Get event history (for debugging) / Получить историю событий (для отладки)
  // Returns Read-only array of event envelopes / Только для чтения массив конвертов событий
  getHistory(): ReadonlyArray<EventEnvelope> {
    return [...this.eventHistory];
  }

  // Get count of listeners for a specific event type / Получить количество подписчиков для конкретного типа события
  // Event type identifier / Идентификатор типа события
  // Returns Number of listeners / Количество подписчиков
  listenerCount(
    type: EventType,
  ): number {
    const handlers = this.listeners.get(type);
    return handlers ? handlers.size : 0;
  }

  // Get all registered event types / Получить все зарегистрированные типы событий
  eventNames(): EventType[] {
    return Array.from(this.listeners.keys()); // Array of event type strings / Массив строк типов событий
  }

  // PRIVATE METHODS / ПРИВАТНЫЕ МЕТОДЫ

  // Apply middleware chain / Применяет цепочку middleware
  private applyMiddlewares(
    type: EventType,
    payload: any,
    finalHandler: () => void,
  ): void {
    if (this.middlewares.length === 0) {
      finalHandler();
      return;
    }

    let index = 0;

    const next = (): void => {
      if (index >= this.middlewares.length) {
        finalHandler();
        return;
      }

      const middleware = this.middlewares[index++];
      try {
        middleware(type, payload, next);
      } catch (error) {
        this.LOG.error('Error in middleware:', error);
        // Continue to next middleware even if current one fails / Продолжаем к следующему middleware даже если текущий упал
        next();
      }
    };

    next();
  }

  // Create Event object from business event payload / Создает объект Event из payload бизнес-события
  private createEvent(
    eventType: string,
    payload: PayloadForEvent<EventTypeFromPayloadMap>,
  ): Event {
    const eventId = uuidv4();

    return {
      id: `event-${eventId}`,
      kind: ENTITY_KINDS.EVENT,
      type: eventType,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      payload,
    };
  }

  // Add event to history with size limit / Добавляет событие в историю с ограничением размера
  private addToHistory(
    envelope: EventEnvelope,
  ): void {
    this.eventHistory.push(envelope);
    // Limit history size / Ограничиваем размер истории
    if (this.eventHistory.length > this.maxHistorySize) {
      this.eventHistory.shift();
    }
  }
}

// singleton
let serviceInstance: EventBusService | null = null;

export const getGlobalEventBus = (): EventBusService => {
  if (!serviceInstance) {
    serviceInstance = new EventBusService();

    if (process.env.NODE_ENV === 'development') {
      console.log('[EventBus] Global singleton instance created');
    }
  }

  return serviceInstance;
};

