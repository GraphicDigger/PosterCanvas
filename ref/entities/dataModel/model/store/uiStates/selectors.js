import { selectUI } from '../selectors';
import { createSelector } from '@reduxjs/toolkit';

// UI селекторы
export const selectSelectedModelId = (state) => selectUI(state).selectedModelId;
export const selectHoveredModelId = (state) => selectUI(state).hoveredModelId;
export const selectFocusedModelId = (state) => selectUI(state).focusedModelId;


// Field states selector
export const selectDataModelCheckStates = createSelector(
  [selectSelectedModelId, selectFocusedModelId, selectHoveredModelId, (_, id) => id],
  (selectedId, focusedId, hoveredId, modelId) => ({
    isSelected: selectedId === modelId,
    isFocused: focusedId === modelId,
    isHovered: hoveredId === modelId,
  }),
);
