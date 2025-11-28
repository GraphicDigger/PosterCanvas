import { createSlice } from '@reduxjs/toolkit';
import { initialUIState, actionsUIState } from './uiStates/actions';
import { initialEntities, actionsQueries } from './queries/actions';
import { actionsMutation } from './mutation/actions';

const initialState = {
  ...initialEntities,
  ...initialUIState,
};

const variableModeGroupEntitySlice = createSlice({
  name: 'variableModeGroupEntity',
  initialState,
  reducers: {
    ...actionsUIState,
    ...actionsQueries,
    ...actionsMutation,
  },
});

export const {

  setVariableModeGroups,

  setHoveredVariableModeGroupId,
  setFocusedVariableModeGroupId,
  setSelectedVariableModeGroupId,

  addVariableModeGroup,
  updateVariableModeGroup,
  removeVariableModeGroup,

} = variableModeGroupEntitySlice.actions;

export default variableModeGroupEntitySlice.reducer;
