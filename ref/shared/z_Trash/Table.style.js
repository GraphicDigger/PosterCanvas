import { colors } from '../../styles';
import {
  mainColors,
} from '../../styles/tokens/mainColors';

export const tableRowSize = {
  small: '32px',
  medium: '40px',
  large: '48px',
};

export const tableStyles = (theme) => {
  const isDark = theme === 'dark';

  return {
    row: {
      default: isDark ? colors.white0 : colors.white0,
      hovered: isDark ? colors.white5 : colors.grey90,
      focused: isDark ? colors.grey15 : colors.blue95,
      disabled: isDark ? colors.white0 : colors.white0,
    },
    cell: {
      focused: isDark ? mainColors.primary.light1 : mainColors.primary.light1,
    },
  };
};

