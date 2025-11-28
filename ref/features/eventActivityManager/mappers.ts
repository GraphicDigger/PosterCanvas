// Activity mappers / Мапперы для создания активности

import { EventType } from '@/shared/constants';
import type { ActivityMapper } from './types';
import { defaultActivityMapper } from './lib';
import {
  elementCreatedMapper, elementUpdatedMapper, elementDeletedMapper,
  componentCreatedMapper,
  taskCreatedMapper, taskCompletedMapper,
  commentAddedMapper,
} from './model';


// Mapping of event types to activity mappers / Маппинг типов событий на мапперы активности
export const ACTIVITY_MAPPERS: Record<string, ActivityMapper> = {
  // Element events / События элементов
  [EventType.ELEMENT_CREATED]: elementCreatedMapper,
  [EventType.ELEMENT_UPDATED]: elementUpdatedMapper,
  [EventType.ELEMENT_DELETED]: elementDeletedMapper,

  // Component events / События компонентов
  [EventType.COMPONENT_CREATED]: componentCreatedMapper,
  [EventType.COMPONENT_CREATED_CODE]: componentCreatedMapper,
  [EventType.COMPONENT_CREATED_NOCODE]: componentCreatedMapper,
  [EventType.COMPONENT_UPDATED]: componentCreatedMapper,
  [EventType.COMPONENT_DELETED]: componentCreatedMapper,

  // Task events / События задач
  [EventType.TASK_CREATED]: taskCreatedMapper,
  [EventType.TASK_COMPLETED]: taskCompletedMapper,

  // Comment events / События комментариев
  [EventType.COMMENT_ADDED]: commentAddedMapper,
  [EventType.COMMENT_ADDED_CODE]: commentAddedMapper,
  [EventType.COMMENT_ADDED_NOCODE]: commentAddedMapper,

  // Default mapper / Маппер по умолчанию
  default: defaultActivityMapper,
};

