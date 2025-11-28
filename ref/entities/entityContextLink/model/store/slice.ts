import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { initialUIState, actionsUIState } from './actionsStates';
import { actionsQueries } from './actionsQueries';
import { actionsMutation } from './actionsMutation';
import type { ContextLinkState, ContextLink } from '../../types';

export const contextLinkAdapter = createEntityAdapter<ContextLink>({});

export const initialEntities = contextLinkAdapter.getInitialState();

const initialState: ContextLinkState = {
  ...initialEntities,
  ...initialUIState,
};

const contextLinkEntitySlice = createSlice({
  name: 'contextLinkEntity',
  initialState,
  reducers: {
    ...actionsUIState,
    ...actionsQueries,
    ...actionsMutation,
  },
});

export const {

  setContextLinks,

  setHoveredContextLinkId,
  setFocusedContextLinkId,
  setSelectedContextLinkId,
  resetSelectedContextLink,

  addContextLink,
  updateContextLink,
  removeContextLink,

} = contextLinkEntitySlice.actions;

export default contextLinkEntitySlice.reducer;
