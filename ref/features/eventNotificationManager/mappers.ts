// Notification mappers / Мапперы для создания уведомлений

import { EventType } from '@/shared/constants';
import { NotificationMapper } from './types';
import { defaultNotificationMapper } from './lib';
import {
  elementCreatedMapper, elementDeletedMapper,
  componentCreatedMapper, componentCreatedCodeMapper, componentCreatedNocodeMapper, componentDeletedMapper,
  codeCreatedMapper, codeDeletedMapper,
  taskCreatedMapper, taskCompletedMapper, taskDeletedMapper,
  commentAddedMapper, commentDeletedMapper,
  documentCreatedMapper, documentDeletedMapper,
} from './model';

export const NOTIFICATION_MAPPERS: Record<string, NotificationMapper> = {

  [EventType.ELEMENT_CREATED]: elementCreatedMapper,
  [EventType.ELEMENT_DELETED]: elementDeletedMapper,

  [EventType.COMPONENT_CREATED]: componentCreatedMapper,
  [EventType.COMPONENT_CREATED_CODE]: componentCreatedCodeMapper,
  [EventType.COMPONENT_CREATED_NOCODE]: componentCreatedNocodeMapper,
  [EventType.COMPONENT_DELETED]: componentDeletedMapper,

  [EventType.CODE_CREATED]: codeCreatedMapper,
  [EventType.CODE_DELETED]: codeDeletedMapper,

  [EventType.TASK_CREATED]: taskCreatedMapper,
  [EventType.TASK_COMPLETED]: taskCompletedMapper,
  [EventType.TASK_DELETED]: taskDeletedMapper,

  [EventType.COMMENT_ADDED]: commentAddedMapper,
  [EventType.COMMENT_ADDED_CODE]: commentAddedMapper,
  [EventType.COMMENT_ADDED_NOCODE]: commentAddedMapper,
  [EventType.COMMENT_DELETED]: commentDeletedMapper,

  [EventType.DOCUMENT_CREATED]: documentCreatedMapper,
  [EventType.DOCUMENT_DELETED]: documentDeletedMapper,

  default: defaultNotificationMapper,
};

