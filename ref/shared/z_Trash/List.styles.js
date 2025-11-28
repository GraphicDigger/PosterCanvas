import { colors } from '../../../shared/styles';


export const listItemColors = (theme) => {
  const isDark = theme === 'dark';

  return {
    blank: {
      default: isDark ? colors.white0 : colors.white0,
      hovered: isDark ? colors.white10 : colors.grey90,
      selected: isDark ? colors.white10 : colors.grey80,
      disabled: isDark ? colors.white0 : colors.white0,
    },
    filled: {
      default: isDark ? colors.white5 : colors.grey90,
      hovered: isDark ? colors.white15 : colors.grey80,
      selected: isDark ? colors.white20 : colors.grey70,
      disabled: isDark ? colors.white5 : colors.grey90,
    },
  };
};
