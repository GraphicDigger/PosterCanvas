import { createSlice } from '@reduxjs/toolkit';
import { initialUIState, actionsUIState } from './uiStates/actions';
import { initialEntities, actionsQueries } from './queries/actions';
import { actionsMutation } from './mutation/actions';

const initialState = {
  ...initialEntities,
  ...initialUIState,
};

const workspaceEntitySlice = createSlice({
  name: 'workspaceEntity',
  initialState,
  reducers: {
    ...actionsUIState,
    ...actionsQueries,
    ...actionsMutation,
  },
});

export const {

  setWorkspaces,

  setHoveredWorkspaceId,
  setFocusedWorkspaceId,
  setSelectedWorkspaceId,

  addWorkspace,
  updateWorkspace,
  removeWorkspace,

} = workspaceEntitySlice.actions;

export default workspaceEntitySlice.reducer;
