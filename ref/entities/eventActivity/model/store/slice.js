import { createSlice } from '@reduxjs/toolkit';
import { initialUIState, actionsUIState } from './uiStates/actions';
import { initialEntities, actionsQueries } from './queries/actions';
import { actionsMutation } from './mutation/actions';

const initialState = {
  ...initialEntities,
  ...initialUIState,
};

const activityEntitySlice = createSlice({
  name: 'activityEntity',
  initialState,
  reducers: {
    ...actionsUIState,
    ...actionsQueries,
    ...actionsMutation,
  },
});

export const {

  setActivities,

  setHoveredActivityId,
  setFocusedActivityId,
  setSelectedActivityId,
  resetSelectedActivityId,

  addActivity,
  updateActivity,
  removeActivity,

} = activityEntitySlice.actions;

export default activityEntitySlice.reducer;
