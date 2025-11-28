import { POSITION } from './positions';
import { JUSTIFY, ALIGN } from '../../../../../entities/uiElement';

export const ALIGNMENT_MAP = {
  [POSITION.TOP_LEFT]: {
    justifyContent: JUSTIFY.start,
    alignItems: ALIGN.start,
  },
  [POSITION.TOP_CENTER]: {
    justifyContent: JUSTIFY.center,
    alignItems: ALIGN.start,
  },
  [POSITION.TOP_RIGHT]: {
    justifyContent: JUSTIFY.end,
    alignItems: ALIGN.start,
  },
  [POSITION.CENTER_LEFT]: {
    justifyContent: JUSTIFY.start,
    alignItems: ALIGN.center,
  },
  [POSITION.CENTER_CENTER]: {
    justifyContent: JUSTIFY.center,
    alignItems: ALIGN.center,
  },
  [POSITION.CENTER_RIGHT]: {
    justifyContent: JUSTIFY.end,
    alignItems: ALIGN.center,
  },
  [POSITION.BOTTOM_LEFT]: {
    justifyContent: JUSTIFY.start,
    alignItems: ALIGN.end,
  },
  [POSITION.BOTTOM_CENTER]: {
    justifyContent: JUSTIFY.center,
    alignItems: ALIGN.end,
  },
  [POSITION.BOTTOM_RIGHT]: {
    justifyContent: JUSTIFY.end,
    alignItems: ALIGN.end,
  },
};
