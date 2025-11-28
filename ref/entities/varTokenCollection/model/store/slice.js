import { createSlice } from '@reduxjs/toolkit';
import { initialUIStates, actionsUIStates } from './actionsStates';
import { initialQueries, actionsQueries } from './actionsQueries';
import { actionsMutation } from './actionsMutation';

const initialState = {
  ... initialQueries,
  ... initialUIStates,
};

const tokenCollectionEntitySlice = createSlice({
  name: 'tokenCollectionEntity',
  initialState,
  reducers: {
    ...actionsUIStates,
    ...actionsQueries,
    ...actionsMutation,
  },
});

export const {
  setTokenCollections,

  setHoveredTokenCollectionId,
  setFocusedTokenCollectionId,
  setSelectedTokenCollectionId,

  addTokenCollection,
  removeTokenCollection,
  updateTokenCollection,

} = tokenCollectionEntitySlice.actions;

export default tokenCollectionEntitySlice.reducer;
