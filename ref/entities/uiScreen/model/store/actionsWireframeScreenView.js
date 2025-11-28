import { SCREEN_VIEW_TYPES } from '../constants/screenViewTypes';

export const initialWireframeScreenView = {
  viewType: SCREEN_VIEW_TYPES.WIREFRAME,
};

export const actionsWireframeScreenView = {
  setScreenViewType: (state, action) => {
    state.viewType = action.payload;
  },
  toggleScreenViewType: (state) => {
    state.viewType = state.viewType === SCREEN_VIEW_TYPES.PREVIEW
      ? SCREEN_VIEW_TYPES.WIREFRAME
      : SCREEN_VIEW_TYPES.PREVIEW;
    console.log('state.ui.viewType', state.viewType);
  },
};
