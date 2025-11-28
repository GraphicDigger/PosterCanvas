import { createSlice } from '@reduxjs/toolkit';
import { initialUIState, actionsUIState } from './uiStates/actions';
import { initialEntities, actionsQueries } from './queries/actions';
import { actionsMutation } from './mutaion/actions';


const initialState = {
  ...initialUIState,
  ...initialEntities,
};

const propEntitySlice = createSlice({
  name: 'propEntity',
  initialState,
  reducers: {
    ...actionsUIState,
    ...actionsQueries,
    ...actionsMutation,

  },
});

export const {
  setHoveredPropId,
  setFocusedPropId,
  setSelectedPropId,
  resetSelectedPropId,

  setProps,

  addProp,
  updateProp,
  deleteProp,
  addValueToProp,
  removeValueFromProp,

  bindingPropsToComponent,

} = propEntitySlice.actions;

export default propEntitySlice.reducer;
