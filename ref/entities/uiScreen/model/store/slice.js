import { createSlice } from '@reduxjs/toolkit';
import { initialUIStates, actionsUIStates } from './uiStates/actions';
import { initialEntities, actionsQueries } from './queries/actions';
import { initialWireframeScreenView, actionsWireframeScreenView } from './actionsWireframeScreenView';
import { actionsMutation } from './mutation/actions';
const initialState = {
  ...initialEntities,
  ...initialUIStates,
  viewType: 'wireframe',
  wireframe: {
    blocks: [],
    connections: [],
  },
};

const screenEntitySlice = createSlice({
  name: 'screenEntity',
  initialState,
  reducers: {
    ...actionsUIStates,
    ...actionsQueries,
    ...actionsWireframeScreenView,
    ...actionsMutation,
  },
});

export const {

  setScreens,

  setFocusedScreenId,
  setHoveredScreenId,
  setSelectedScreenId,

  addScreen,
  updateScreen,
  removeScreen,

  setScreenViewType,
  toggleScreenViewType,

} = screenEntitySlice.actions;

export default screenEntitySlice.reducer;
