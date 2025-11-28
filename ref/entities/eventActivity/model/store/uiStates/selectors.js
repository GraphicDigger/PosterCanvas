import { createSelector } from '@reduxjs/toolkit';
import { selectActivityUI } from '../selectors';

export const selectHoveredActivityId = (state) => selectActivityUI(state).hoveredActivityId;
export const selectFocusedActivityId = (state) => selectActivityUI(state).focusedActivityId;
export const selectSelectedActivityId = (state) => selectActivityUI(state).selectedActivityId;

export const selectActivityCheckStates = createSelector(
  [selectSelectedActivityId, selectFocusedActivityId, selectHoveredActivityId, (_, id) => id],
  (selectedId, focusedId, hoveredId, ActivityId) => ({
    isSelected: selectedId === ActivityId,
    isFocused: focusedId === ActivityId,
    isHovered: hoveredId === ActivityId,
  }),
);

