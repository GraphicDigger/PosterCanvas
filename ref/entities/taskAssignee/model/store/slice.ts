import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { initialUIState, actionsUIState } from './actionsStates';
import { actionsQueries } from './actionsQueries';
import { actionsMutation } from './actionsMutation';
import type { TaskAssigneeState, TaskAssignee } from '../../types';

export const taskAssigneeAdapter = createEntityAdapter<TaskAssignee>({});

export const initialEntities = taskAssigneeAdapter.getInitialState();

const initialState: TaskAssigneeState = {
  ...initialEntities,
  ...initialUIState,
};

const taskAssigneeEntitySlice = createSlice({
  name: 'taskAssigneeEntity',
  initialState,
  reducers: {
    ...actionsUIState,
    ...actionsQueries,
    ...actionsMutation,
  },
});

export const {

  setTaskAssignees,

  setHoveredTaskAssigneeId,
  setFocusedTaskAssigneeId,
  setSelectedTaskAssigneeId,
  resetSelectedTaskAssignee,

  addTaskAssignee,
  updateTaskAssignee,
  removeTaskAssignee,

} = taskAssigneeEntitySlice.actions;

export default taskAssigneeEntitySlice.reducer;
