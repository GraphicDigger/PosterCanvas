import { createSelector } from '@reduxjs/toolkit';
import { ALIGN, DIRECTION, JUSTIFY, STYLE_PROPERTIES } from '../../../../../entities/uiElement';
import { selectElementById } from '../../../../../entities/uiElement';
import { ALIGNMENT_MAP } from '../constants/flex';


export const selectIsFlexEnabled = (state) => state.flexSettings.isEnabled;
export const selectFlexDirection = (state) => state.flexSettings.flexDirection;
export const selectJustifyContent = (state) => state.flexSettings.justifyContent;
export const selectAlignItems = (state) => state.flexSettings.alignItems;
export const selectFlexWrap = (state) => state.flexSettings.flexWrap;
export const selectGapRow = (state) => state.flexSettings.gapRow;
export const selectGapColumn = (state) => state.flexSettings.gapColumn;


export const selectSelectedCells = createSelector(
  [selectElementById, (_, elementId) => elementId],
  (element, elementId) => {

    if (!element) {return [];}

    const justifyContent = element?.properties?.style?.[STYLE_PROPERTIES.justifyContent];
    const alignItems = element?.properties?.style?.[STYLE_PROPERTIES.alignItems];
    const flexDirection = element?.properties?.style?.[STYLE_PROPERTIES.flexDirection];

    const isColumn = flexDirection === DIRECTION.column;

    for (const [cell, properties] of Object.entries(ALIGNMENT_MAP)) {
      const justify = isColumn ?
        properties.alignItems : properties.justifyContent;
      const align = isColumn ?
        properties.justifyContent : properties.alignItems;

      if (justify === justifyContent && align === alignItems) {
        return [cell];
      }
    }

    // SPACE_BETWEEN & STRETCH
    if (justifyContent === JUSTIFY.spaceBetween &&
            alignItems === ALIGN.stretch) {
      return [
        'top-left', 'top-center', 'top-right',
        'center-left', 'center-center', 'center-right',
        'bottom-left', 'bottom-center', 'bottom-right',
      ];
    }
    // SPACE_AROUND & STRETCH
    if (justifyContent === JUSTIFY.spaceAround &&
            alignItems === ALIGN.stretch) {
      return [
        'top-left', 'top-center', 'top-right',
        'center-left', 'center-center', 'center-right',
        'bottom-left', 'bottom-center', 'bottom-right',
      ];
    }
    // STRETCH depending on DIRECTION & JUSTIFY_CONTENT
    if (alignItems === ALIGN.stretch) {
      if (isColumn) {
        switch (justifyContent) {
        case JUSTIFY.start:
          return ['top-left', 'top-center', 'top-right'];
        case JUSTIFY.center:
          return ['center-left', 'center-center', 'center-right'];
        case JUSTIFY.end:
          return ['bottom-left', 'bottom-center', 'bottom-right'];
        default:
          return [];
        }
      } else {
        switch (justifyContent) {
        case JUSTIFY.start:
          return ['top-left', 'center-left', 'bottom-left'];
        case JUSTIFY.center:
          return ['top-center', 'center-center', 'bottom-center'];
        case JUSTIFY.end:
          return ['top-right', 'center-right', 'bottom-right'];
        default:
          return [];
        }
      }
    }
    // SPACE BETWEEN depending on DIRECTION & ALIGN_ITEMS
    if (justifyContent === JUSTIFY.spaceBetween) {
      if (isColumn) {
        switch (alignItems) {
        case ALIGN.start:
          return ['top-left', 'center-left', 'bottom-left'];
        case ALIGN.center:
          return ['top-center', 'center-center', 'bottom-center'];
        case ALIGN.end:
          return ['top-right', 'center-right', 'bottom-right'];
        default:
          return [];
        }
      } else {
        switch (alignItems) {
        case ALIGN.start:
          return ['top-left', 'top-center', 'top-right'];
        case ALIGN.center:
          return ['center-left', 'center-center', 'center-right'];
        case ALIGN.end:
          return ['bottom-left', 'bottom-center', 'bottom-right'];
        default:
          return [];
        }
      }
    }
    // SPACE AROUND depending on DIRECTION & ALIGN_ITEMS
    if (justifyContent === JUSTIFY.spaceAround) {
      if (isColumn) {
        switch (alignItems) {
        case ALIGN.start:
          return ['top-left', 'center-left', 'bottom-left'];
        case ALIGN.center:
          return ['top-center', 'center-center', 'bottom-center'];
        case ALIGN.end:
          return ['top-right', 'center-right', 'bottom-right'];
        default:
          return [];
        }
      } else {
        switch (alignItems) {
        case ALIGN.start:
          return ['top-left', 'top-center', 'top-right'];
        case ALIGN.center:
          return ['center-left', 'center-center', 'center-right'];
        case ALIGN.end:
          return ['bottom-left', 'bottom-center', 'bottom-right'];
        default:
          return [];
        }
      }
    }
    return [];
  },
);

