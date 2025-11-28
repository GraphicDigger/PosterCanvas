import { createSlice } from '@reduxjs/toolkit';
import { initialUIState, actionsUIState } from './actionsStates';
import { initialEntities, actionsQueries } from './actionsQuery';
import { actionsMutation } from './actionsMutation';

const initialState = {
  ...initialEntities,
  ...initialUIState,
};

const variableModeEntitySlice = createSlice({
  name: 'variableModeEntity',
  initialState,
  reducers: {
    ...actionsUIState,
    ...actionsQueries,
    ...actionsMutation,
  },
});

export const {

  setVariableModes,

  setHoveredVariableModeId,
  setFocusedVariableModeId,
  setSelectedVariableModeId,

  addVariableMode,
  updateVariableMode,
  removeVariableMode,
  removeVariableModesFromCollection,

} = variableModeEntitySlice.actions;

export default variableModeEntitySlice.reducer;
