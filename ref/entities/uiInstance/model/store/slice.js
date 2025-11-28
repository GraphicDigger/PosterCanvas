import { createSlice } from '@reduxjs/toolkit';
import { initialInstanceData, actionsInstanceData } from './actionsQueries';
import { initialInstanceUI, actionsInstanceUI } from './actionsStates';
import { actionsInstanceMutation } from './actionsMutation';

const initialState = {
  ...initialInstanceData,
  ui: initialInstanceUI,
};

const instanceEntitySlice = createSlice({
  name: 'instanceEntity',
  initialState,
  reducers: {
    ...actionsInstanceUI,
    ...actionsInstanceData,
    ...actionsInstanceMutation,
  },
});

export const {
  setInstances,

  setHoveredInstanceId,
  setFocusedInstanceId,
  setSelectedInstanceId,

  updateInstance,
  updateInstanceStyle,
  updateInstanceProps,
  updateInstanceProp,
  removeInstanceProp,
  updateInstancePropValue,


} = instanceEntitySlice.actions;

export default instanceEntitySlice.reducer;
