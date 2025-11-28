import type { PayloadAction } from '@reduxjs/toolkit';
import { taskAssigneeAdapter } from './slice';
import type { TaskAssigneeState, TaskAssignee } from '../../types';

export const actionsMutation = {

  addTaskAssignee: (state: TaskAssigneeState, action: PayloadAction<TaskAssignee>) => {
    taskAssigneeAdapter.addOne(state, action.payload);
  },

  updateTaskAssignee: (state: TaskAssigneeState, action: PayloadAction<TaskAssignee>) => {
    taskAssigneeAdapter.updateOne(state, {
      id: action.payload.id,
      changes: action.payload,
    });
  },

  removeTaskAssignee: (state: TaskAssigneeState, action: PayloadAction<string>) => {
    taskAssigneeAdapter.removeOne(state, action.payload);
  },

};
