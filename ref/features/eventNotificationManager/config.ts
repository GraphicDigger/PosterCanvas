import { EventType } from '@/shared/constants';
import { NotificationPosition, type NotificationConfig } from '@/shared/services/eventNotification/types';
import { VisibleIcon } from '@/shared/assets/icons';

const DEFAULT_CONFIG: NotificationConfig = {
  enabled: true,
  duration: 5000,
  position: NotificationPosition.TOP_RIGHT,
  icon: 'ℹ',
  persistent: false, // По умолчанию - временные toast уведомления
  actions: [
    {
      label: 'Open',
      icon: VisibleIcon,
      onClick: () => { },
    },
  ],
};

export const NOTIFICATION_CONFIG: Record<string, NotificationConfig> = {

  [EventType.ELEMENT_CREATED]: {
    ...DEFAULT_CONFIG,
    enabled: true,
    duration: 3000,
    persistent: true,
  },
  [EventType.ELEMENT_UPDATED]: {
    ...DEFAULT_CONFIG,
    enabled: false,
  },
  [EventType.ELEMENT_DELETED]: { ...DEFAULT_CONFIG },

  [EventType.COMPONENT_CREATED]: { ...DEFAULT_CONFIG },
  [EventType.COMPONENT_CREATED_CODE]: { ...DEFAULT_CONFIG },
  [EventType.COMPONENT_CREATED_NOCODE]: { ...DEFAULT_CONFIG },
  [EventType.COMPONENT_UPDATED]: { ...DEFAULT_CONFIG },
  [EventType.COMPONENT_DELETED]: { ...DEFAULT_CONFIG },

  [EventType.CODE_CREATED]: { ...DEFAULT_CONFIG },
  [EventType.CODE_UPDATED]: { ...DEFAULT_CONFIG },
  [EventType.CODE_DELETED]: { ...DEFAULT_CONFIG },

  [EventType.COMMENT_ADDED]: {
    ...DEFAULT_CONFIG,
    persistent: true,
  },
  [EventType.COMMENT_ADDED_CODE]: {
    ...DEFAULT_CONFIG,
    persistent: true,
  },
  [EventType.COMMENT_ADDED_NOCODE]: {
    ...DEFAULT_CONFIG,
    persistent: true,
  },
  [EventType.COMMENT_UPDATED]: { ...DEFAULT_CONFIG },
  [EventType.COMMENT_DELETED]: { ...DEFAULT_CONFIG },

  [EventType.TASK_CREATED]: {
    ...DEFAULT_CONFIG,
    persistent: true,
    duration: 5000,
  },
  [EventType.TASK_UPDATED]: { ...DEFAULT_CONFIG },
  [EventType.TASK_DELETED]: { ...DEFAULT_CONFIG },
  [EventType.TASK_COMPLETED]: { ...DEFAULT_CONFIG, persistent: true, duration: 10000 },

  [EventType.DOCUMENT_CREATED]: { ...DEFAULT_CONFIG },
  [EventType.DOCUMENT_UPDATED]: { ...DEFAULT_CONFIG },
  [EventType.DOCUMENT_DELETED]: { ...DEFAULT_CONFIG },
};

