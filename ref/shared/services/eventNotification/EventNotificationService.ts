// Notification Service / Сервис уведомлений
// PURE SERVICE: No Redux dependencies / ЧИСТЫЙ СЕРВИС: Без зависимостей от Redux

import type { EventBusService } from '@/shared/services/eventBus';
import { v4 as uuidv4 } from 'uuid';
import type {
  NotificationCallback,
  Notification,
  NotificationConfig,
  NotificationMapper,
  PartialNotification,
} from '@/shared/services/eventNotification/types';
import {
  NotificationType as NotificationTypeEnum,
} from '@/shared/services/eventNotification/types';
import type { Event } from '@/shared/types/event.types';


export class EventNotificationService {
  private timers = new Map<string, number>(); // Храним только timeoutId для управления таймерами
  private notificationEventTypes = new Map<string, string>(); // Храним соответствие notificationId → eventType
  private callback: NotificationCallback | null = null;
  private eventBus: EventBusService;
  private unsubscribers: Array<() => void> = [];
  private mappers: Record<string, NotificationMapper>;
  private config: Record<string, NotificationConfig>;

  private isDevMode: boolean = process.env.NODE_ENV === 'development';
  private LOG = {
    info: (...msg: any[]) => this.isDevMode && console.log('[N-SRV][I]', ...msg),
    warn: (...msg: any[]) => this.isDevMode && console.warn('[N-SRV][W]', ...msg),
    error: (...msg: any[]) => this.isDevMode && console.error('[N-SRV][E]', ...msg),
  };

  constructor({
    eventBus,
    mappers,
    config,
  }: {
    eventBus: EventBusService;
    mappers: Record<string, NotificationMapper>;
    config: Record<string, NotificationConfig>;
  }) {
    if (!eventBus) {throw new Error('[EventNotificationService] eventBus is required');}
    if (!mappers) {throw new Error('[EventNotificationService] mappers is required');}
    if (!config) {throw new Error('[EventNotificationService] config is required');}
    this.eventBus = eventBus;
    this.mappers = mappers;
    this.config = config;
  }


  initialize(callback?: NotificationCallback): void {
    if (callback) {
      if (this.callback) {
        this.LOG.warn('Already initialized');
        return;
      }
      this.callback = callback;
    }

    // Защита от повторной подписки
    if (this.unsubscribers.length === 0) {
      this.subscribeToEvents();
    } else {this.LOG.info('subscribeToEvents skipped — already subscribed');}

    this.LOG.info('Initialized' + (callback ? ' with callback' : ''));
  }

  private subscribeToEvents(): void {
    const eventTypes = Object.keys(this.config);
    eventTypes.forEach((eventType) => {
      const unsubscribe = this.eventBus.on(eventType as any, (event: Event) => {
        this.handleEvent(event); // event from EventBus
      });
      this.unsubscribers.push(unsubscribe);
    });

    this.LOG.info('Subscribed to', eventTypes.length, 'event types');
  }

  private handleEvent(event: Event): void {
    if (!this.callback) {
      this.LOG.warn('No callback, skipping event', event.type);
      return;
    }

    const config = this.config[event.type];
    if (!config) {
      this.LOG.warn(`No config for event type: ${event.type}`);
      return;
    }

    if (config.enabled === false) {return;}

    try {
      this.LOG.info(`Received Event for Notification mapping: ${event.type}`);

      const notification = this.mapToNotification(event);
      if (notification) {
        this.callback({ type: 'add', payload: notification as Notification });
        // Save mapping: notificationId → eventType for later getting config / Сохраняем соответствие notificationId → eventType для последующего получения конфига
        this.notificationEventTypes.set(notification.id as string, event.type);
        // Start timer for auto-dismiss (hide from UI) / Запускаем таймер auto-dismiss (скрытие из UI)
        const duration = config.duration ?? 5000;
        if (duration > 0) {
          const timeoutId = window.setTimeout(
            () => this.handleAutoDismiss(notification.id as string, event.type),
            duration,
          );
          this.timers.set(notification.id as string, timeoutId);
        }

        this.LOG.info(`Added Notification: ${notification.id} (persistent: ${config.persistent})`);
      }
    } catch (error) {
      this.LOG.error('Error handling event:', error);
    }
  }

  private mapToNotification(event: Event): PartialNotification | null {
    const mapper = this.mappers[event.type] || this.mappers['default'];
    if (!mapper) {
      this.LOG.warn(`No mapper for event type: ${event.type}`);
      return null;
    }
    return mapper(event);
  }

  // Показать уведомление вручную
  show(notif: PartialNotification): string {
    const id = notif.id || uuidv4();
    const fullNotification: Notification = {
      id,
      ...notif,
      // Гарантируем обязательные поля
      type: notif.type || NotificationTypeEnum.INFO,
      text: notif.text || '',
      title: notif.title || '',
      createdAt: notif.createdAt || new Date().toISOString(),
    } as Notification;

    // Отправляем в Redux
    if (this.callback) {
      this.callback({ type: 'add', payload: fullNotification });
    }

    // Запускаем таймер (если указан duration)
    const duration = (notif as any).duration ?? 5000;
    if (duration > 0) {
      const timeoutId = window.setTimeout(
        () => this.dismiss(id),
        duration,
      );
      this.timers.set(id, timeoutId);
    }

    this.LOG.info(`Manually added Notification: ${id}`);
    return id;
  }

  success(message: string, config?: PartialNotification): string {
    return this.show({
      ...config,
      text: message,
      type: NotificationTypeEnum.SUCCESS,
    });
  }

  error(message: string, config?: PartialNotification): string {
    return this.show({
      ...config,
      text: message,
      type: NotificationTypeEnum.ERROR,
    });
  }

  warning(message: string, config?: PartialNotification): string {
    return this.show({
      ...config,
      text: message,
      type: NotificationTypeEnum.WARNING,
    });
  }

  info(message: string, config?: PartialNotification): string {
    return this.show({
      ...config,
      text: message,
      type: NotificationTypeEnum.INFO,
    });
  }

  // Обработка auto-dismiss (скрытие из UI после истечения duration)
  // Set shownAt timestamp to hide from UI
  // Persistent: keep in Redux, Temporary: remove from Redux
  private handleAutoDismiss(id: string, eventType: string): void {
    const timeoutId = this.timers.get(id);

    if (timeoutId) {
      window.clearTimeout(timeoutId);
      this.timers.delete(id);
    }

    const config = this.config[eventType];
    const isPersistent = config?.persistent ?? false;

    if (isPersistent) {
      // Постоянные уведомления: устанавливаем shownAt через dispatch (скрываем из UI), храним в Redux
      if (this.callback) {
        this.callback({ type: 'hide', id });
      }
      this.LOG.info(`Hidden persistent notification ${id} (set shownAt, kept in Redux)`);
    } else {
      // Временные уведомления: удаляем из Redux полностью
      if (this.callback) {
        this.callback({ type: 'remove', id });
      }
      this.LOG.info(`Removed temporary notification ${id}`);
    }
  }

  // Ручное закрытие крестиком (устанавливает dismissedAt)
  // Уведомление скрывается из UI, но остается в Redux до Activity Highlight
  dismiss(id: string): void {
    const timeoutId = this.timers.get(id);

    if (timeoutId) {
      window.clearTimeout(timeoutId);
      this.timers.delete(id);
    }

    // Получаем eventType для определения persistent
    const eventType = this.notificationEventTypes.get(id);
    const config = eventType ? this.config[eventType] : undefined;
    const isPersistent = config?.persistent ?? false;

    if (isPersistent) {
      // Постоянные уведомления: устанавливаем dismissedAt (скрываем из UI), храним в Redux
      if (this.callback) {
        this.callback({ type: 'dismiss', id });
      }
      this.LOG.info(`User dismissed persistent notification ${id} (set dismissedAt, kept in Redux)`);
    } else {
      // Временные уведомления: удаляем из Redux
      if (this.callback) {
        this.callback({ type: 'remove', id });
      }
      this.notificationEventTypes.delete(id);
      this.LOG.info(`User dismissed temporary notification ${id} (removed from Redux)`);
    }
  }

  // Открытие уведомления (клик по уведомлению или кнопке)
  // Устанавливает readAt и удаляет из Redux
  read(id: string): void {
    const timeoutId = this.timers.get(id);

    if (timeoutId) {
      window.clearTimeout(timeoutId);
      this.timers.delete(id);
    }

    if (this.callback) {
      this.callback({ type: 'read', id });
    }

    // Очищаем соответствие notificationId → eventType
    this.notificationEventTypes.delete(id);

    this.LOG.info(`User read notification ${id} (set readAt, removed from Redux)`);
  }

  destroy(): void {
    this.unsubscribers.forEach((u) => u());
    this.unsubscribers = [];
    this.callback = null;

    // Очищаем все таймеры
    this.timers.forEach((timeoutId) => clearTimeout(timeoutId));
    this.timers.clear();

    // Очищаем соответствия
    this.notificationEventTypes.clear();

    this.LOG.info('Cleaned up');
  }
}

let serviceInstance: EventNotificationService | null = null;

export const getNotificationService = (): EventNotificationService => {
  if (!serviceInstance) {
    throw new Error('EventNotificationService not initialized. Use NotificationServiceProvider.');
  }
  return serviceInstance;
};

export const setNotificationService = (instance: EventNotificationService): void => {
  serviceInstance = instance;
};
