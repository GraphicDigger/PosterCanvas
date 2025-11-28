import { colors } from './baseColor';

export const lineColors = (theme) => {
  const isDark = theme === 'dark';
  return {
    light2: isDark ? colors.white5 : colors.grey90,
    light1: isDark ? colors.white10 : colors.grey80,
    default: isDark ? colors.white15 : colors.grey70,
    dark1: isDark ? colors.white20 : colors.grey65,
    dark2: isDark ? colors.white25 : colors.grey60,
    dark3: isDark ? colors.white30 : colors.grey40,
  };
};
