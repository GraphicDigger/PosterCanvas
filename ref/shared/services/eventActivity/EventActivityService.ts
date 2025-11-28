// Activity Logger Service / Сервис логирования активности
// PURE SERVICE: No Redux dependencies / ЧИСТЫЙ СЕРВИС: Без зависимостей от Redux
import type { EventBusService } from '@/shared/services/eventBus';
import type { Event } from '../../types';
import type { Activity, ActivityLogCallback, ActivityConfig, ActivityMapper } from './types';

export class EventActivityService {
  private eventBus: EventBusService;
  private callback: ActivityLogCallback | null = null;
  private unsubscribers: Array<() => void> = [];
  private mappers: Record<string, ActivityMapper> = {};
  private config: Record<string, ActivityConfig> = {};

  private isDevMode: boolean = process.env.NODE_ENV === 'development';
  private LOG = {
    info: (...msg: any[]) => this.isDevMode && console.log('[A-LOG][I]', ...msg),
    warn: (...msg: any[]) => this.isDevMode && console.warn('[A-LOG][W]', ...msg),
    error: (...msg: any[]) => this.isDevMode && console.error('[A-LOG][E]', ...msg),
  };

  constructor({
    eventBus,
    mappers,
    config,
  }: {
    eventBus: EventBusService;
    mappers: Record<string, ActivityMapper>;
    config: Record<string, ActivityConfig>;
  }) {
    if (!eventBus) {throw new Error('[EventActivityService] eventBus is required');}
    if (!mappers) {throw new Error('[EventActivityService] mappers is required');}
    if (!config) {throw new Error('[EventActivityService] config is required');}
    this.eventBus = eventBus;
    this.mappers = mappers;
    this.config = config;
  }

  initialize(callback: ActivityLogCallback): void {
    if (this.callback) {
      this.LOG.warn('🟠 Already initialized');
      return;
    }
    this.callback = callback;
    this.subscribeToEvents();
  }

  private subscribeToEvents(): void {
    const eventTypes = Object.keys(this.mappers);

    eventTypes.forEach((eventType: string) => {
      const unsubscribe = this.eventBus.on(eventType as any, (event: Event) => {
        this.handleEvent(event); // все обработчики EventBus вызываются с созданным в EventBus событием Event
      });
      this.unsubscribers.push(unsubscribe);
    });

    this.LOG.info('📡 Subscribed to', eventTypes.length, 'event types');
  }

  private handleEvent(event: Event): void {
    if (!this.callback) {
      this.LOG.warn('🟠 No callback, skipping event', event.type);
      return;
    }
    const cfg = this.config[event.type];
    if (!cfg || cfg.enabled === false) {
      return;
    }

    let activity: Activity | null = null;
    if (cfg.createActivity) {
      activity = this.mapToActivity(event);
    }
    this.callback(activity);
  }

  private mapToActivity(event: Event): Activity | null {
    const mapper = this.mappers[event.type] || this.mappers['default'];
    if (!mapper) {
      this.LOG.warn(`🟠 No mapper for event type: ${event.type}`);
      return null;
    }
    return mapper(event);
  }

  destroy(): void {
    this.unsubscribers.forEach((u) => u());
    this.unsubscribers = [];
    this.callback = null;
    this.LOG.info('🧹 Cleaned up');
  }
}

let serviceInstance: EventActivityService | null = null;

export const getActivityLoggerService = (): EventActivityService => {
  if (!serviceInstance) {
    serviceInstance = new EventActivityService();
  }
  return serviceInstance;
};

export const setActivityLoggerService = (instance: EventActivityService): void => {
  serviceInstance = instance;
};

