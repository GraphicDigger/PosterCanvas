import { selectUserspaceUI } from '../selectors';
import { createSelector } from '@reduxjs/toolkit';

export const selectHoveredUserspaceId = (state) => selectUserspaceUI(state).hoveredUserspaceId;
export const selectFocusedUserspaceId = (state) => selectUserspaceUI(state).focusedUserspaceId;
export const selectSelectedUserspaceId = (state) => selectUserspaceUI(state).selectedUserspaceId;

export const selectUserspaceCheckStates = createSelector(
  [selectSelectedUserspaceId, selectFocusedUserspaceId, selectHoveredUserspaceId, (_, id) => id],
  (selectedId, focusedId, hoveredId, UserspaceId) => ({
    isSelected: selectedId === UserspaceId,
    isFocused: focusedId === UserspaceId,
    isHovered: hoveredId === UserspaceId,
  }),
);
