import { selectVariableModeUI } from './selectors';
import { createSelector } from '@reduxjs/toolkit';

export const selectHoveredVariableModeId = (state) => selectVariableModeUI(state).hoveredVariableModeId;
export const selectFocusedVariableModeId = (state) => selectVariableModeUI(state).focusedVariableModeId;
export const selectSelectedVariableModeId = (state) => selectVariableModeUI(state).selectedVariableModeId;

export const selectVariableModeCheckStates = createSelector(
  [selectSelectedVariableModeId, selectFocusedVariableModeId, selectHoveredVariableModeId, (_, id) => id],
  (selectedId, focusedId, hoveredId, VariableModeId) => ({
    isSelected: selectedId === VariableModeId,
    isFocused: focusedId === VariableModeId,
    isHovered: hoveredId === VariableModeId,
  }),
);
