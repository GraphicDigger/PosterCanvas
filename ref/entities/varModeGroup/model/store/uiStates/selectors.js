import { selectVariableModeGroupUI } from '../selectors';
import { createSelector } from '@reduxjs/toolkit';

export const selectHoveredVariableModeGroupId = (state) => selectVariableModeGroupUI(state).hoveredVariableModeGroupId;
export const selectFocusedVariableModeGroupId = (state) => selectVariableModeGroupUI(state).focusedVariableModeGroupId;
export const selectSelectedVariableModeGroupId = (state) => selectVariableModeGroupUI(state).selectedVariableModeGroupId;

export const selectVariableModeGroupCheckStates = createSelector(
  [selectSelectedVariableModeGroupId, selectFocusedVariableModeGroupId, selectHoveredVariableModeGroupId, (_, id) => id],
  (selectedId, focusedId, hoveredId, VariableModeGroupId) => ({
    isSelected: selectedId === VariableModeGroupId,
    isFocused: focusedId === VariableModeGroupId,
    isHovered: hoveredId === VariableModeGroupId,
  }),
);
