import { createSelector } from '@reduxjs/toolkit';

const selectPropUI = state => state.propEntity.ui;
export const selectHoveredPropId = state => selectPropUI(state).hoveredPropId;
export const selectFocusedPropId = state => selectPropUI(state).focusedPropId;
export const selectSelectedPropId = state => selectPropUI(state).selectedPropId;

export const selectPropCheckStates = createSelector(
  [selectSelectedPropId, selectFocusedPropId, selectHoveredPropId, (_, id) => id],
  (selectedId, focusedId, hoveredId, propId) => ({
    isSelected: selectedId === propId,
    isFocused: focusedId === propId,
    isHovered: hoveredId === propId,
  }),
);
