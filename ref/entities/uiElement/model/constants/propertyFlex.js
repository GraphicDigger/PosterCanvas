import { STYLE_PROPERTIES } from './propertyTypes';

const FLEX_VALUES = {
  [STYLE_PROPERTIES.flexDirection]: {
    row: 'row',
    column: 'column',
    rowReverse: 'row-reverse',
    columnReverse: 'column-reverse',
  },

  [STYLE_PROPERTIES.justifyContent]: {
    start: 'flex-start',
    end: 'flex-end',
    center: 'center',
    spaceBetween: 'space-between',
    spaceAround: 'space-around',
    spaceEvenly: 'space-evenly',
  },

  [STYLE_PROPERTIES.alignItems]: {
    start: 'flex-start',
    end: 'flex-end',
    center: 'center',
    stretch: 'stretch',
    baseline: 'baseline',
  },

  [STYLE_PROPERTIES.flexWrap]: {
    wrap: 'wrap',
    nowrap: 'nowrap',
    wrapReverse: 'wrap-reverse',
  },
};

export const DIRECTION = FLEX_VALUES[STYLE_PROPERTIES.flexDirection];
export const JUSTIFY = FLEX_VALUES[STYLE_PROPERTIES.justifyContent];
export const ALIGN = FLEX_VALUES[STYLE_PROPERTIES.alignItems];
export const WRAP = FLEX_VALUES[STYLE_PROPERTIES.flexWrap];
