import { createSelector } from '@reduxjs/toolkit';
import { SIDEBAR_CONTENT } from '../constants/sidebarContent';
import { TABS } from '../constants/tabs';

export const selectMode = (state) => state.explorerSidebar.mode;
export const selectMainMode = (state) => state.explorerSidebar.mode === SIDEBAR_CONTENT.MAIN;
export const selectGlobalSearchMode = (state) => state.explorerSidebar.mode === SIDEBAR_CONTENT.GLOBAL_SEARCH;
export const selectSettingsMode = (state) => state.explorerSidebar.mode === SIDEBAR_CONTENT.SETTINGS;

export const selectSubMode = (state) => state.explorerSidebar.subMode;

export const selectorExplorerSidebar = createSelector([selectMode, selectSubMode], (mode, subMode) => {
  return {
    mode: mode,
    subMode: subMode,
    subModes: Object.values(TABS),
  };
});
