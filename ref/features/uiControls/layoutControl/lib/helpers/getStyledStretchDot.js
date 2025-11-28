import { DIRECTION } from '../../../../../entities/uiElement';
import { POSITION } from '../../model';

export const getStyledStretchDot = (cell, direction) => {
  if (direction === DIRECTION.row) {
    if ([POSITION.TOP_LEFT, POSITION.TOP_CENTER, POSITION.TOP_RIGHT].includes(cell)) {
      return { width: '6px', height: '14px', borderRadius: '3px 3px 0 0', margin: '6px 0 0 0' };
    }
    if ([POSITION.CENTER_LEFT, POSITION.CENTER_CENTER, POSITION.CENTER_RIGHT].includes(cell)) {
      return { width: '6px', height: '100%' };
    }
    if ([POSITION.BOTTOM_LEFT, POSITION.BOTTOM_CENTER, POSITION.BOTTOM_RIGHT].includes(cell)) {
      return { width: '6px', height: '14px', borderRadius: ' 0 0 3px 3px', margin: '0 0 6px 0' };
    }
  }
  if (direction === DIRECTION.column) {
    if ([POSITION.TOP_LEFT, POSITION.CENTER_LEFT, POSITION.BOTTOM_LEFT].includes(cell)) {
      return { width: '14px', height: '6px', borderRadius: '3px 0 0 3px', margin: '0 0 0 6px' };
    }
    if ([POSITION.TOP_CENTER, POSITION.CENTER_CENTER, POSITION.BOTTOM_CENTER].includes(cell)) {
      return { width: '100%', height: '6px' };
    }
    if ([POSITION.TOP_RIGHT, POSITION.CENTER_RIGHT, POSITION.BOTTOM_RIGHT].includes(cell)) {
      return { width: '14px', height: '6px', borderRadius: '0 3px 3px 0', margin: '0 6px 0 0' };
    }
  }
  // Default styles
  return { width: '6px', height: '6px' };
};

