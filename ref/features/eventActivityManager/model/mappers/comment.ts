import type { Event, Activity, ActivityMapper } from '../../types';
import { createActivity } from '../../lib';

// Comment activity mappers / Мапперы активности комментариев
export const commentAddedMapper: ActivityMapper = (event: Event): Activity => {
  const comment = event.payload.comment || 'Added comment';
  return {
    ...createActivity(event),
    text: `Added comment: ${comment.substring(0, 50)}${comment.length > 50 ? '...' : ''}`,
  };
};
