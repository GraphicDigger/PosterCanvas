import { Event } from '../../types/event.types';
import { type ReactNode, type ComponentType } from 'react';


export type NotificationMapper = (event: Event) => Partial<Notification> | null;

// Notification types / Типы уведомлений
export enum NotificationType {
  SUCCESS = 'success',
  ERROR = 'error',
  WARNING = 'warning',
  INFO = 'info',
}

export enum NotificationPosition {
  TOP_LEFT = 'top-left',
  TOP_CENTER = 'top-center',
  TOP_RIGHT = 'top-right',
  BOTTOM_LEFT = 'bottom-left',
  BOTTOM_CENTER = 'bottom-center',
  BOTTOM_RIGHT = 'bottom-right',
}

export enum NotificationPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  URGENT = 'urgent',
}


//Notification action button / Кнопка действия уведомления
export interface NotificationAction {
  label: string;
  onClick: () => void;
}

export interface NotificationServiceProviderProps {
  children: ReactNode;
}

// Event metadata / Метаданные события
export interface NotificationEventMetadata {
  eventId?: string; // Source event ID / ID исходного события
  sourceEventId?: string; // Alias for eventId (for compatibility) / Алиас для eventId (для совместимости)
  kind?: string; // Entity kind (ENTITY_KINDS.NOTIFICATION) / Тип сущности
  recipients?: string[]; // User IDs who should receive this notification / ID пользователей, которые должны получить уведомление
  actorId?: string; // User ID who triggered the event / ID пользователя, который вызвал событие
  priority?: NotificationPriority | string; // Notification priority / Приоритет уведомления
  timestamp?: string; // ISO timestamp / ISO временная метка
}

// Icon component type / Тип компонента иконки
// Гибкий тип для совместимости с существующими иконками (jsx файлы без строгой типизации)
// В идеале должен быть ComponentType<IconProps>, но для совместимости с jsx файлами используем any
export type IconComponent = ComponentType<any>;

// Notification action / Действие уведомления
export interface NotificationAction {
    label: string; // Лейбл действия / Action label
    icon: IconComponent; // Иконка действия / Action icon (React component)
    onClick: () => void; // Функция действия / Action function
}

// Configuration for each event type / Конфигурация для каждого типа события
export interface NotificationConfig {
  // Показывать ли уведомление для этого типа события / Whether to show notification for this event type
  enabled?: boolean;
  duration?: number;
  position?: NotificationPosition;
  icon?: React.ReactNode | string;
  persistent?: boolean; // Если true, уведомление не удаляется автоматически из Redux / If true, notification is not auto-removed from Redux
  actions?: NotificationAction[]; // Действия для этого типа события / Actions for this event type
}

/**
 * Notification / Уведомление
 * Final notification object that will be dispatched to Redux store
 * Финальный объект уведомления, который будет диспатчиться в Redux store
 *
 * Created from partial Notification by NotificationService (mappers return Partial<Notification>)
 * Создается из частичного Notification сервисом NotificationService (мапперы возвращают Partial<Notification>)
 */
export interface Notification {
  // Required fields / Обязательные поля
  id: string;
  kind?: string;
  type: NotificationType;
  eventId?: string;
  eventType?: string; // Event type for getting config in UI / Тип события для получения конфига в UI
  createdAt: string; // ISO timestamp (replaces timestamp) / ISO временная метка (заменяет timestamp)

  source?: any;
  title: string;
  text: string;
  priority?: NotificationPriority | string;
  recipients?: string[];

  // Lifecycle timestamps / Временные метки жизненного цикла
  shownAt: string | null; // NULL = показывать в UI, NOT NULL = скрыто из UI / NULL = show in UI, NOT NULL = hidden from UI
  readAt: string | null; // Время когда пользователь открыл уведомление → удалить из Redux / When user opened notification → remove from Redux
  dismissedAt: string | null; // Время когда пользователь закрыл (крестик) → хранить до Activity Highlight / When user closed (X button) → keep until Activity Highlight

  persistent?: boolean; // Deprecated: use timestamps instead / Устарело: используйте временные метки
}

// Temporary notification object / Временный объект уведомления для отображения в UI
export type TempNotification = Notification & NotificationConfig;

export type PartialNotification = Partial<Notification>;

// Callback action types / Типы действий callback
export type NotificationCallbackAction =
  | { type: 'add'; payload: Notification }
  | { type: 'remove'; id: string }
  | { type: 'hide'; id: string } // Скрыть из UI (set shownAt) - auto-dismiss
  | { type: 'dismiss'; id: string } // Пользователь закрыл (set dismissedAt) - крестик
  | { type: 'read'; id: string }; // Пользователь открыл (set readAt) → удалить из Redux

export type NotificationCallback = (action: NotificationCallbackAction) => void;


/**
 * EventBus event to notification mapping / Маппинг событий EventBus в уведомления
 */
export interface EventNotificationMapping {
  eventType: string;
  enabled?: boolean;
  config: (payload: any) => Partial<Notification> | null;
}

