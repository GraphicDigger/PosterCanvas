// Activity mappers / Мапперы для создания активности

import type { Event, Activity, ActivityMapper } from '../../types';
import { createActivity } from '../../lib';

export const elementCreatedMapper: ActivityMapper = (event: Event): Activity => {
  const tag = event.payload.tag || 'element';
  return {
    ...createActivity(event),
    text: `Created element: ${tag}`,
  };
};

export const elementUpdatedMapper: ActivityMapper = (event: Event): Activity => {
  const tag = event.payload.tag || 'element';
  return {
    ...createActivity(event),
    text: `Updated element: ${tag}`,
  };
};

export const elementDeletedMapper: ActivityMapper = (event: Event): Activity => {
  return {
    ...createActivity(event),
    text: 'Deleted element',
  };
};
