import { POSITION } from '../../model';
import { JUSTIFY, DIRECTION } from '../../../../../entities/uiElement';

export const getPositionDotInCell = (
  cell,
  direction,
  justifyContent,
  alignItems,
) => {
  if (justifyContent === JUSTIFY.spaceAround) {
    if (direction === DIRECTION.row) {
      if ([POSITION.TOP_LEFT, POSITION.CENTER_LEFT, POSITION.BOTTOM_LEFT].includes(cell))
      {return POSITION.CENTER_RIGHT;}
      if ([POSITION.TOP_CENTER, POSITION.CENTER_CENTER, POSITION.BOTTOM_CENTER].includes(cell))
      {return POSITION.CENTER_CENTER;}
      if ([POSITION.TOP_RIGHT, POSITION.CENTER_RIGHT, POSITION.BOTTOM_RIGHT].includes(cell))
      {return POSITION.CENTER_LEFT;}
    }
    if (direction === DIRECTION.column) {
      if ([POSITION.TOP_LEFT, POSITION.TOP_CENTER, POSITION.TOP_RIGHT].includes(cell))
      {return POSITION.BOTTOM_CENTER;}
      if ([POSITION.CENTER_LEFT, POSITION.CENTER_CENTER, POSITION.CENTER_RIGHT].includes(cell))
      {return POSITION.CENTER_CENTER;}
      if ([POSITION.BOTTOM_LEFT, POSITION.BOTTOM_CENTER, POSITION.BOTTOM_RIGHT].includes(cell))
      {return POSITION.TOP_CENTER;}
    }
  }

  return POSITION.CENTER_CENTER;
};
