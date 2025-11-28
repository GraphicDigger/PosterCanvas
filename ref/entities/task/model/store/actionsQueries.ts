import type { TaskState, Task } from '../../types';
import { taskAdapter } from './slice';

export const actionsQueries = {
  setTasks: (state: TaskState, action: { payload: Task[] }) => {
    taskAdapter.setAll(state, action.payload);
  },
};
