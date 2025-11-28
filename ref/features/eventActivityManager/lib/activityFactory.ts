// Activity mappers / Мапперы для создания активности

import { Event, Activity, ActivityMapper } from '../types';
import { ENTITY_KINDS } from '@/shared/constants';

// Helper to create Activity ID / Вспомогательная функция для создания ID активности
const createActivityId = (eventId: string): string => {
  return `activity-${eventId}`;
};

// Helper to create Activity payload / Вспомогательная функция для создания payload активности
export const createActivity = (event: Event): Activity => {
  return {
    id: createActivityId(event.id),
    kind: ENTITY_KINDS.ACTIVITY,
    eventId: event.id,
    title: event.type,
    text: event.payload.text || 'Unknown event',
    createdAt: event.createdAt,
    updatedAt: event.updatedAt,
    source: event.payload,
  };
};

// Default activity mapper / Маппер активности по умолчанию
export const defaultActivityMapper: ActivityMapper = (event: Event): Activity | null => {
  return createActivity(event);
};
