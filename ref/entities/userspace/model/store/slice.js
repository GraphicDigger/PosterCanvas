import { createSlice } from '@reduxjs/toolkit';
import { initialUIState, actionsUIState } from './uiStates/actions';
import { initialEntities, actionsQueries } from './queries/actions';
import { actionsMutation } from './mutation/actions';

const initialState = {
  ...initialEntities,
  ...initialUIState,
};

const userspaceEntitySlice = createSlice({
  name: 'userspaceEntity',
  initialState,
  reducers: {
    ...actionsUIState,
    ...actionsQueries,
    ...actionsMutation,
  },
});

export const {

  setUserspaces,

  setHoveredUserspaceId,
  setFocusedUserspaceId,
  setSelectedUserspaceId,

  addUserspace,
  updateUserspace,
  removeUserspace,

} = userspaceEntitySlice.actions;

export default userspaceEntitySlice.reducer;
