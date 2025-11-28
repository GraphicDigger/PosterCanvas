import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { initialUIState, actionsUIState } from './actionsStates';
import { actionsQueries } from './actionsQueries';
import { actionsMutation } from './actionsMutation';

export const tokenValueAdapter = createEntityAdapter();

const initialState = {
  ...tokenValueAdapter.getInitialState(),
  ...initialUIState,
};

const tokenValueEntitySlice = createSlice({
  name: 'tokenValueEntity',
  initialState,
  reducers: {
    ...actionsUIState,
    ...actionsQueries,
    ...actionsMutation,
  },
});

export const {

  setTokenValues,

  setHoveredTokenValueId,
  setFocusedTokenValueId,
  setSelectedTokenValueId,

  addTokenValue,
  updateTokenValue,
  removeTokenValue,
  removeTokenValues,
  removeTokenValuesByVariableModeId,

} = tokenValueEntitySlice.actions;

export default tokenValueEntitySlice.reducer;
