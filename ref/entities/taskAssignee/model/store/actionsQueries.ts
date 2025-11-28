import type { TaskAssigneeState, TaskAssignee } from '../../types';
import { taskAssigneeAdapter } from './slice';

export const actionsQueries = {
  setTaskAssignees: (state: TaskAssigneeState, action: { payload: TaskAssignee[] }) => {
    taskAssigneeAdapter.setAll(state, action.payload);
  },
};
