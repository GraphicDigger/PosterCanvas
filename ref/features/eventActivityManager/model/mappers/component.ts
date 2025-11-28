import type { Event, Activity, ActivityMapper } from '../../types';
import { createActivity } from '../../lib';


// Component activity mappers / Мапперы активности компонентов
export const componentCreatedMapper: ActivityMapper = (event: Event): Activity => {
  const name = event.payload.name || 'Unnamed component';
  return {
    ...createActivity(event),
    text: `Created component: ${name}`,
  };
};
