import { v4 as uuidv4 } from 'uuid';
import { IFrameMessage } from './types';
import { IFrameMessageType } from './constants';


/**
 * Bridge service for communication between Host and IFrame Editor / Сервис Bridge для коммуникации между Host и IFrame Editor
 * Implements Request/Response pattern and Event Emitter pattern / Реализует паттерны Request/Response и Event Emitter
 */
export class IFrameBridgeService {
  private iframe: HTMLIFrameElement;
  // Changed to Set to allow multiple handlers for same event type / Изменено на Set для поддержки нескольких обработчиков одного типа
  private messageHandlers: Map<string, Set<Function>> = new Map();
  private pendingRequests: Map<string, { resolve: Function; reject: Function; timeout: NodeJS.Timeout }> = new Map();
  private messageListener: ((event: MessageEvent) => void) | null = null;

  constructor(iframe: HTMLIFrameElement) {
    this.iframe = iframe;
    this.setupMessageListener();
  }

  /**
   * Send a message to the IFrame and optionally wait for a response / Отправка сообщения в IFrame с ожиданием ответа
   * @param type Message type / Тип сообщения
   * @param payload Message payload / Данные сообщения
   * @returns Promise that resolves with the response payload / Promise, который резолвится с данными ответа
   */
  send(type: string, payload: any = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      const requestId = uuidv4();
      const message: IFrameMessage = {
        type: type as IFrameMessageType, // Cast for compatibility
        payload,
        timestamp: Date.now(),
        requestId,
      };

      // Timeout for request (5 seconds) / Таймаут для запроса (5 секунд)
      const timeout = setTimeout(() => {
        if (this.pendingRequests.has(requestId)) {
          this.pendingRequests.delete(requestId);
          reject(new Error(`Request timeout for message type: ${type}`));
        }
      }, 5000);

      this.pendingRequests.set(requestId, { resolve, reject, timeout });

      // Send message to iframe / Отправка сообщения в iframe
      if (this.iframe.contentWindow) {
        this.iframe.contentWindow.postMessage(message, '*');
      } else {
        clearTimeout(timeout);
        this.pendingRequests.delete(requestId);
        reject(new Error('IFrame contentWindow is not available'));
      }
    });
  }

  /**
   * Send a one-way notification (fire and forget) / Отправка одностороннего уведомления (fire and forget)
   */
  notify(type: string, payload: any = {}): void {
    const message: IFrameMessage = {
      type: type as IFrameMessageType,
      payload,
      timestamp: Date.now(),
    };
    
    if (this.iframe.contentWindow) {
      this.iframe.contentWindow.postMessage(message, '*');
    }
  }

  /**
   * Subscribe to messages from IFrame / Подписка на сообщения из IFrame
   */
  on(type: string, handler: Function): void {
    if (!this.messageHandlers.has(type)) {
      this.messageHandlers.set(type, new Set());
    }
    this.messageHandlers.get(type)!.add(handler);
  }

  /**
   * Unsubscribe from messages / Отписка от сообщений
   */
  off(type: string, handler?: Function): void {
    if (!this.messageHandlers.has(type)) return;
    
    if (handler) {
      this.messageHandlers.get(type)!.delete(handler);
      if (this.messageHandlers.get(type)!.size === 0) {
        this.messageHandlers.delete(type);
      }
    } else {
      this.messageHandlers.delete(type);
    }
  }

  /**
   * Setup global message listener / Настройка глобального слушателя сообщений
   */
  private setupMessageListener(): void {
    this.messageListener = (event: MessageEvent) => {
      // Security check: verify source / Проверка безопасности: проверка источника
      if (this.iframe.contentWindow && event.source !== this.iframe.contentWindow) {
        return;
      }

      const message: IFrameMessage = event.data;
      if (!message || !message.type) {
        return;
      }

      // Если есть requestId → это ответ, иначе → это event

      // Handle Response / Обработка ответа
      if (message.requestId && this.pendingRequests.has(message.requestId)) {
        const { resolve, timeout } = this.pendingRequests.get(message.requestId)!;
        clearTimeout(timeout);
        this.pendingRequests.delete(message.requestId);
        resolve(message.payload);
        return;
      }

      // Handle Event / Обработка события
      const handlers = this.messageHandlers.get(message.type);
      if (handlers) {
        handlers.forEach(handler => {
          try {
            handler(message.payload);
          } catch (error) {
            console.error(`Error handling message ${message.type}:`, error);
          }
        });
      }
    };

    window.addEventListener('message', this.messageListener);
  }

  /**
   * Cleanup listeners and pending requests / Очистка слушателей и ожидающих запросов
   */
  destroy(): void {
    if (this.messageListener) {
      window.removeEventListener('message', this.messageListener);
      this.messageListener = null;
    }

    // Cancel all pending requests / Отмена всех ожидающих запросов
    this.pendingRequests.forEach(({ reject, timeout }) => {
      clearTimeout(timeout);
      reject(new Error('Bridge destroyed'));
    });

    this.pendingRequests.clear();
    this.messageHandlers.clear();
  }
}
