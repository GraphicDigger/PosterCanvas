import { createSelector } from '@reduxjs/toolkit';

const selectPropValueUI = state => state.propValueEntity.ui;
export const selectHoveredPropValueId = state => selectPropValueUI(state).hoveredPropValueId;
export const selectFocusedPropValueId = state => selectPropValueUI(state).focusedPropValueId;
export const selectSelectedPropValueId = state => selectPropValueUI(state).selectedPropValueId;

export const selectPropValueCheckStates = createSelector(
  [selectSelectedPropValueId, selectFocusedPropValueId, selectHoveredPropValueId, (_, id) => id],
  (selectedId, focusedId, hoveredId, propValueId) => ({
    isSelected: selectedId === propValueId,
    isFocused: focusedId === propValueId,
    isHovered: hoveredId === propValueId,
  }),
);
