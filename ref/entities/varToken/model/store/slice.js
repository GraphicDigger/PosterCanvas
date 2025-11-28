import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { initialUIStates, actionsUIStates } from './actionsStates';
import { actionsQueries } from './actionsQueries';
import { actionsMutation } from './actionsMutation';

export const tokenAdapter = createEntityAdapter();

const initialState = {
  ...tokenAdapter.getInitialState(),
  ... initialUIStates,
};

const tokenEntitySlice = createSlice({
  name: 'tokenEntity',
  initialState,
  reducers: {
    ...actionsUIStates,
    ...actionsQueries,
    ...actionsMutation,
  },
});

export const {
  setTokens,

  setHoveredTokenId,
  setFocusedTokenId,
  setSelectedTokenId,

  addToken,
  updateToken,
  removeToken,
  removeTokensFromCollection,

} = tokenEntitySlice.actions;

export default tokenEntitySlice.reducer;
