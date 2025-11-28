import { selectTokenValueUI } from './selectors';
import { createSelector } from '@reduxjs/toolkit';

export const selectHoveredTokenValueId = (state) => selectTokenValueUI(state).hoveredTokenValueId;
export const selectFocusedTokenValueId = (state) => selectTokenValueUI(state).focusedTokenValueId;
export const selectSelectedTokenValueId = (state) => selectTokenValueUI(state).selectedTokenValueId;

export const selectTokenValueCheckStates = createSelector(
  [selectSelectedTokenValueId, selectFocusedTokenValueId, selectHoveredTokenValueId, (_, id) => id],
  (selectedId, focusedId, hoveredId, TokenValueId) => ({
    isSelected: selectedId === TokenValueId,
    isFocused: focusedId === TokenValueId,
    isHovered: hoveredId === TokenValueId,
  }),
);
