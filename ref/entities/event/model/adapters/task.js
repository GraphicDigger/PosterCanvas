import { EventType } from '@/shared/constants';
import { VisibleIcon } from '../../../../shared/assets/icons';

const createBaseData = (event, member, specificData = {}) => {
  return {
    buttonIcon: VisibleIcon,
    buttonText: 'View Task',
    ...specificData,
  };
};

export const taskEventAdapter = {
  [EventType.TASK_CREATED]: (event, member) =>
    createBaseData(event, member, {
      action: 'created a Task',
    }),

  [EventType.COMMENT_ADDED]: (event, member) =>
    createBaseData(event, member, {
      action: 'commented on the Task',
      buttonText: event.payload.taskTitle,
    }),
};
