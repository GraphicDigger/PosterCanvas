import { createSlice } from '@reduxjs/toolkit';
import { initialUIState, actionsUIState } from './uiStates/actions';
import { initialEntities, actionsQueries } from './queries/actions';
import { actionsMutation } from './mutation/actions';

const initialState = {
  ...initialUIState,
  ...initialEntities,
};

const propValueEntitySlice = createSlice({
  name: 'propValueEntity',
  initialState,
  reducers: {
    ...actionsUIState,
    ...actionsQueries,
    ...actionsMutation,
  },
});

export const {

  setHoveredPropValueId,
  setFocusedPropValueId,
  setSelectedPropValueId,

  setPropValues,

  addPropValue,
  updatePropValue,
  deletePropValue,
  changeDefaultPropValue,

} = propValueEntitySlice.actions;

export default propValueEntitySlice.reducer;
