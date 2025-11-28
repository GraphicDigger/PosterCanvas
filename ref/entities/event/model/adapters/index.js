import { ENTITY_KINDS } from '../../../../shared/constants';
import { taskEventAdapter } from './task';
import { documentEventAdapter } from './document';
import { componentEventAdapter } from './component';
import { codeEventAdapter } from './code';

const eventAdapters = {
  [ENTITY_KINDS.COMPONENT]: componentEventAdapter,
  [ENTITY_KINDS.CODE]: codeEventAdapter,
  [ENTITY_KINDS.TASK]: taskEventAdapter,
  [ENTITY_KINDS.DOCUMENT]: documentEventAdapter,
  // other
};

export const getAdditionalEventData = (event, member, source) => {

  try {
    if (!event ||
            !source ||
            !eventAdapters[source] ||
            !event.type ||
            typeof eventAdapters[source][event.type] !== 'function') {
      return {
        title: event?.type ? `Event: ${event.type}` : 'Unknown event',
        description: 'No data to display',
        member,
        actions: [],
      };
    }
    return eventAdapters[source][event.type](event, member);

  } catch (error) {
    return {
      title: 'Error processing event',
      description: 'An error occurred while displaying data',
      member,
      actions: [],
    };
  }
};
