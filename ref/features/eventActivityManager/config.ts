// Activity logging configuration / Конфигурация логирования активности

import { EventType } from '@/shared/constants';
import type { ActivityConfig } from './types';
import { VisibleIcon } from '@/shared/assets/icons';


const DEFAULT_CONFIG: ActivityConfig = {
  createActivity: true,
  enabled: true,
  text: 'Member action',
  actions: [
    {
      label: 'Editor',
      icon: VisibleIcon,
      actionKey: 'read',
    },
  ],
};

export const ACTIVITY_CONFIG: Record<string, ActivityConfig> = {

  [EventType.ELEMENT_CREATED]: {
    ...DEFAULT_CONFIG,
    text: 'Created element',
  },
  [EventType.ELEMENT_UPDATED]: { ...DEFAULT_CONFIG },
  [EventType.ELEMENT_DELETED]: { ...DEFAULT_CONFIG },

  [EventType.COMPONENT_CREATED]: {
    ...DEFAULT_CONFIG,
    text: 'Created component',
  },
  [EventType.COMPONENT_CREATED_CODE]: { ...DEFAULT_CONFIG },
  [EventType.COMPONENT_CREATED_NOCODE]: { ...DEFAULT_CONFIG },
  [EventType.COMPONENT_UPDATED]: { ...DEFAULT_CONFIG },
  [EventType.COMPONENT_DELETED]: { ...DEFAULT_CONFIG },

  [EventType.CODE_CREATED]: { ...DEFAULT_CONFIG },
  [EventType.CODE_UPDATED]: { ...DEFAULT_CONFIG },
  [EventType.CODE_DELETED]: { ...DEFAULT_CONFIG },

  [EventType.COMMENT_ADDED]: { ...DEFAULT_CONFIG },
  [EventType.COMMENT_ADDED_CODE]: { ...DEFAULT_CONFIG },
  [EventType.COMMENT_ADDED_NOCODE]: { ...DEFAULT_CONFIG },
  [EventType.COMMENT_UPDATED]: { ...DEFAULT_CONFIG },
  [EventType.COMMENT_DELETED]: { ...DEFAULT_CONFIG },

  [EventType.TASK_CREATED]: {
    ...DEFAULT_CONFIG,
    text: 'Created task',
    actions: [
      {
        label: 'Task',
        icon: VisibleIcon,
        actionKey: 'read',
      },
    ],
  },
  [EventType.TASK_UPDATED]: { ...DEFAULT_CONFIG },
  [EventType.TASK_DELETED]: { ...DEFAULT_CONFIG },
  [EventType.TASK_COMPLETED]: { ...DEFAULT_CONFIG },

  [EventType.DOCUMENT_CREATED]: {
    ...DEFAULT_CONFIG,
    text: 'Created document',
    actions: [
      {
        label: 'Document',
        icon: VisibleIcon,
        actionKey: 'read',
      },
    ],
  },
  [EventType.DOCUMENT_UPDATED]: { ...DEFAULT_CONFIG },
  [EventType.DOCUMENT_DELETED]: { ...DEFAULT_CONFIG },
};

