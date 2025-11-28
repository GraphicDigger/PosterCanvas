import { createSelector } from '@reduxjs/toolkit';
import { PRESET_MANAGER_SIDEBAR_MODES } from '../constants/sidebarModes';

export const selectSidebarMode = (state) => state.presetManager.sidebarMode;

export const selectPropertyListMode = (state) => state.presetManager.sidebarMode === PRESET_MANAGER_SIDEBAR_MODES.PROPERTY_LIST;
export const selectCollectionSettingsMode = (state) => state.presetManager.sidebarMode === PRESET_MANAGER_SIDEBAR_MODES.COLLECTION_SETTINGS;

export const selectPresetManagerSidebarMode = createSelector(
  [selectSidebarMode], (sidebarMode) => {
    return {
      sidebarMode,
    };
  });
