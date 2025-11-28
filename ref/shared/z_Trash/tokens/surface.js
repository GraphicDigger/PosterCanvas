import { colors } from './baseColor';

export const surfaceColors = (theme) => {
  const isDark = theme === 'dark';

  return {
    saturate100: isDark ? colors.grey10 : colors.white100,
    saturate10: isDark ? colors.grey20 : colors.grey90,
    saturate5: isDark ? colors.grey15 : colors.grey95,
  };
};
