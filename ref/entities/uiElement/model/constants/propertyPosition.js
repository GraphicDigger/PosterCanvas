import { STYLE_PROPERTIES } from './propertyTypes';

const POSITION_VALUES = {
  [STYLE_PROPERTIES.position]: {
    static: 'static',
    relative: 'relative',
    absolute: 'absolute',
    fixed: 'fixed',
    sticky: 'sticky',
  },
  [STYLE_PROPERTIES.transform]: {
    translate: 'translate',
    translateX: 'translateX',
    translateY: 'translateY',
    translateZ: 'translateZ',
  },
};

export const POSITION = POSITION_VALUES[STYLE_PROPERTIES.position];
export const TRANSFORM = POSITION_VALUES[STYLE_PROPERTIES.transform];
