import { PRESET_MANAGER_SIDEBAR_MODES } from '../constants/sidebarModes';

export const initialSidebarModeState = {
  sidebarMode: PRESET_MANAGER_SIDEBAR_MODES.COLLECTION_SETTINGS,
};

export const actionsSidebarMode = {
  setMode: (state, action) => {
    state.sidebarMode = action.payload;
  },

  resetMode: (state) => {
    state.sidebarMode = initialSidebarModeState.sidebarMode;
  },

  toggleSettings: (state) => {
    state.sidebarMode = state.sidebarMode === PRESET_MANAGER_SIDEBAR_MODES.PROPERTY_LIST
      ? PRESET_MANAGER_SIDEBAR_MODES.COLLECTION_SETTINGS
      : PRESET_MANAGER_SIDEBAR_MODES.PROPERTY_LIST;
  },


};
