import { SIDEBAR_CONTENT } from '../constants/sidebarContent';
import { TABS } from '../constants/tabs';
import { PROJECT_SETTINGS_SECTION } from '@/shared/constants';


export const initialModeState = {
  mode: SIDEBAR_CONTENT.MAIN,
  subMode: TABS.PROJECT,
};

export const actionsMode = {
  setMode: (state, action) => {
    state.mode = action.payload;
  },

  resetMode: () => initialModeState,

  toggleSettings: (state) => {
    if (state.mode === SIDEBAR_CONTENT.MAIN) {
      state.mode = SIDEBAR_CONTENT.SETTINGS;
      state.subMode = PROJECT_SETTINGS_SECTION.GENERAL;
    } else {
      state.mode = SIDEBAR_CONTENT.MAIN;
      state.subMode = TABS.PROJECT;
    }
  },

  toggleGlobalSearch: (state) => {
    state.mode = state.mode === SIDEBAR_CONTENT.MAIN
      ? SIDEBAR_CONTENT.GLOBAL_SEARCH
      : SIDEBAR_CONTENT.MAIN;
  },

  setSubMode: (state, action) => {
    state.subMode = action.payload;
  },

  resetSubMode: (state) => {
    state.subMode = null;
  },

};
