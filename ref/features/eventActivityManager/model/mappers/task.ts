import type { Event, Activity, ActivityMapper } from '../../types';
import { createActivity } from '../../lib';


// Task activity mappers / Мапперы активности задач
export const taskCreatedMapper: ActivityMapper = (event: Event): Activity => {
  const title = event.payload.title || 'Untitled task';
  return {
    ...createActivity(event),
    text: `Created task: ${title}`,
  };
};

export const taskCompletedMapper: ActivityMapper = (event: Event): Activity => {
  return {
    ...createActivity(event),
    text: 'Completed task',
  };
};
