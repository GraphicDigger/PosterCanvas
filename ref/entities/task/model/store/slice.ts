import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { initialUIState, actionsUIState } from './actionsStates';
import { actionsQueries } from './actionsQueries';
import { actionsMutation } from './actionsMutation';
import type { TaskState, Task } from '../../types';

export const taskAdapter = createEntityAdapter<Task>({});

export const initialEntities = taskAdapter.getInitialState();

const initialState: TaskState = {
  ...initialEntities,
  ...initialUIState,
};

const taskEntitySlice = createSlice({
  name: 'taskEntity',
  initialState,
  reducers: {
    ...actionsUIState,
    ...actionsQueries,
    ...actionsMutation,
  },
});

export const {

  setTasks,

  setHoveredTaskId,
  setFocusedTaskId,
  setSelectedTaskId,
  resetSelectedTask,

  addTask,
  updateTask,
  removeTask,

} = taskEntitySlice.actions;

export default taskEntitySlice.reducer;
