import { selectUI } from '../selectors';
import { createSelector } from '@reduxjs/toolkit';

export const selectHoveredModelFieldId = (state) => selectUI(state).hoveredModelFieldId;
export const selectFocusedModelFieldId = (state) => selectUI(state).focusedModelFieldId;
export const selectSelectedModelFieldId = (state) => selectUI(state).selectedModelFieldId;

// Field states selector
export const selectDataModelFieldCheckStates = createSelector(
  [selectSelectedModelFieldId, selectFocusedModelFieldId, selectHoveredModelFieldId, (_, id) => id],
  (selectedId, focusedId, hoveredId, fieldId) => ({
    isSelected: selectedId === fieldId,
    isFocused: focusedId === fieldId,
    isHovered: hoveredId === fieldId,
  }),
);
