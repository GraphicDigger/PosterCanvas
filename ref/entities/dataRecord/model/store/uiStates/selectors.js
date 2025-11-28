import { createSelector } from '@reduxjs/toolkit';
import { selectDataRecordUI } from '../selectors';

// UI selectors
export const selectHoveredRecordId = (state) => selectDataRecordUI(state).hoveredRecordId;
export const selectFocusedRecordId = (state) => selectDataRecordUI(state).focusedRecordId;
export const selectSelectedRecordId = (state) => selectDataRecordUI(state).selectedRecordId;

export const selectDataRecordCheckStates = createSelector(
  [selectSelectedRecordId, selectFocusedRecordId, selectHoveredRecordId, (_, id) => id],
  (selectedId, focusedId, hoveredId, recordId) => ({
    isSelected: selectedId === recordId,
    isFocused: focusedId === recordId,
    isHovered: hoveredId === recordId,
  }),
);

export const selectIsFocused = createSelector(
  [selectFocusedRecordId, (_, id) => id],
  (focusedId, recordId) => focusedId === recordId,
);

export const selectIsHovered = createSelector(
  [selectHoveredRecordId, (_, id) => id],
  (hoveredId, recordId) => hoveredId === recordId,
);

export const selectIsSelected = createSelector(
  [selectSelectedRecordId, (_, id) => id],
  (selectedId, recordId) => selectedId === recordId,
);
