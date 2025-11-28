import { Event, EventPayload } from '@/shared/types';

// Utility to create Event object from business event payload / Утилита для создания объекта Event из payload бизнес-события
export const createEventFromPayload = (
  eventType: string,
  payload: EventPayload,
): Event => {
  const eventId = `event-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  return {
    id: eventId,
    kind: 'event', // ENTITY_KINDS.EVENT
    type: eventType,
    memberId: payload.memberId,
    source: {
      entityId: payload.entityId || payload.elementId || payload.taskId || payload.componentId || 'unknown',
      entityKind: payload.entityKind || 'unknown',
    },
    payload,
    approved: true,
    timestamp: new Date().toISOString(),
  };
};

