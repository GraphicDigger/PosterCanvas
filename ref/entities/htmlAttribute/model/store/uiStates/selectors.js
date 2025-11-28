import { selectHtmlAttrUI } from '../selectors';
import { createSelector } from '@reduxjs/toolkit';

export const selectHoveredHtmlAttrId = (state) => selectHtmlAttrUI(state).hoveredHtmlAttrId;
export const selectFocusedHtmlAttrId = (state) => selectHtmlAttrUI(state).focusedHtmlAttrId;
export const selectSelectedHtmlAttrId = (state) => selectHtmlAttrUI(state).selectedHtmlAttrId;

export const selectHtmlAttrCheckStates = createSelector(
  [selectSelectedHtmlAttrId, selectFocusedHtmlAttrId, selectHoveredHtmlAttrId, (_, id) => id],
  (selectedId, focusedId, hoveredId, HtmlAttrId) => ({
    isSelected: selectedId === HtmlAttrId,
    isFocused: focusedId === HtmlAttrId,
    isHovered: hoveredId === HtmlAttrId,
  }),
);
