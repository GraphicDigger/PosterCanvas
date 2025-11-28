import type { PayloadAction } from '@reduxjs/toolkit';
import { taskAdapter } from './slice';
import type { TaskState, Task } from '../../types';

export const actionsMutation = {

  addTask: (state: TaskState, action: PayloadAction<Task>) => {
    taskAdapter.addOne(state, action.payload);
  },

  updateTask: (state: TaskState, action: PayloadAction<Task>) => {
    taskAdapter.updateOne(state, {
      id: action.payload.id,
      changes: action.payload,
    });
  },

  removeTask: (state: TaskState, action: PayloadAction<string>) => {
    taskAdapter.removeOne(state, action.payload);
  },

};
