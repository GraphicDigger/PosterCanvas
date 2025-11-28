import { createSlice } from '@reduxjs/toolkit';
import { initialUIState, actionsUIState } from './actionUIStates';
import { initialEntities, actionsQueries } from './actionQueries';
import { actionsMutator } from './actionMutator';
import { commentAdapterReference } from './adapter';


const initialState = commentAdapterReference.getInitialState({
  ...initialEntities,
  ...initialUIState,
});

const commentEntitySlice = createSlice({
  name: 'commentEntity',
  initialState,
  reducers: {
    ...actionsUIState,
    ...actionsQueries,
    ...actionsMutator,
  },
});

export const {
  setComments,

  addComment,

  setHoveredCommentId,
  setFocusedCommentId,
  setSelectedCommentId,

} = commentEntitySlice.actions;
export default commentEntitySlice.reducer;
