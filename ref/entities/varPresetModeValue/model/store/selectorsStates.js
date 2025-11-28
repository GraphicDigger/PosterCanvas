import { selectPresetModeValueUI } from './selectors';
import { createSelector } from '@reduxjs/toolkit';

export const selectHoveredPresetModeValueId = (state) => selectPresetModeValueUI(state).hoveredPresetModeValueId;
export const selectFocusedPresetModeValueId = (state) => selectPresetModeValueUI(state).focusedPresetModeValueId;
export const selectSelectedPresetModeValueId = (state) => selectPresetModeValueUI(state).selectedPresetModeValueId;

export const selectPresetModeValueCheckStates = createSelector(
  [selectSelectedPresetModeValueId, selectFocusedPresetModeValueId, selectHoveredPresetModeValueId, (_, id) => id],
  (selectedId, focusedId, hoveredId, PresetModeValueId) => ({
    isSelected: selectedId === PresetModeValueId,
    isFocused: focusedId === PresetModeValueId,
    isHovered: hoveredId === PresetModeValueId,
  }),
);
