import { IFrameBridgeService } from './IFrameBridgeService'
import { IFrameMessageType } from './constants';

// IFrame -> Redux

// Interface for interaction strategies / Интерфейс для стратегий взаимодействия
export interface InteractionStrategyInterface {
  onElementFocused(elementId: string): void;
  onCanvasClick(): void;
  // Future methods: onDragStart, onDragMove, onDragEnd...
}

// Context class for managing interactions / Класс-контекст для управления взаимодействиями
export class IFrameInteractionService {
  private strategy: InteractionStrategyInterface | null = null;
  private bridge: IFrameBridgeService;

  private isDevMode: boolean = process.env.NODE_ENV === 'development';
  private LOG = {
      info: (...msg: any[]) => this.isDevMode && console.log('[🕹️ INT-STR] I:', ...msg),
      warn: (...msg: any[]) => this.isDevMode && console.warn('[🕹️ INT-STR] W:', ...msg),
      error: (...msg: any[]) => this.isDevMode && console.error('[🕹️ INT-STR] E:', ...msg),
  };

  constructor(bridge: IFrameBridgeService) {
    this.bridge = bridge;
    this.setupListeners();
  }

  // Set current interaction strategy / Установка текущей стратегии взаимодействия
  setStrategy(strategy: InteractionStrategyInterface) {
    this.strategy = strategy;
    this.LOG.info('Strategy switched to:', strategy.constructor.name);
  }

  // Setup listeners for Bridge events / Настройка слушателей событий Bridge
  private setupListeners() {
    // Element clicked in IFrame / Клик по элементу в IFrame
    this.bridge.on(IFrameMessageType.FOCUS_ELEMENT, (payload: { elementId: string }) => {
      this.LOG.info('Element focused event', payload);
      if (this.strategy) {
        this.strategy.onElementFocused(payload.elementId);
      }
    });

    // Canvas clicked (empty space) / Клик по пустому месту
    this.bridge.on(IFrameMessageType.CANVAS_CLICKED, () => {
        this.LOG.info('Canvas clicked');
        if (this.strategy) {
            this.strategy.onCanvasClick();
        }
    });
  }

  // Cleanup / Очистка
  destroy() {
    // Listeners are cleaned up by Bridge destroy usually, 
    // but if we added specific ones here we should remove them.
    // Since bridge.on registers in the bridge instance, we rely on bridge.destroy()
  }
}
