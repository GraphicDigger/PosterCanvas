import { createSlice } from '@reduxjs/toolkit';
import { initialUIState, actionsUIState } from './actionsStates';
import { initialEntities, actionsQueries } from './actionsQueries';
import { actionsMutation } from './actionsMutations';

const initialState = {
  ...initialEntities,
  ...initialUIState,
};

const dataVariableEntitySlice = createSlice({
  name: 'dataVariableEntity',
  initialState,
  reducers: {
    ...actionsUIState,
    ...actionsQueries,
    ...actionsMutation,
  },
});

export const {
  setVariables,

  setFocusedVariableId,
  setHoveredVariableId,
  setSelectedVariableId,

  addVariable,
  updateVariable,
  removeVariable,
  updateVariableValue,

} = dataVariableEntitySlice.actions;

export default dataVariableEntitySlice.reducer;
