import { colors } from './baseColor';


export const iconColors = (theme) => {
  const isDark = theme === 'dark';

  return {
    primary: isDark ? colors.grey90 : colors.grey20,
    secondary: isDark ? colors.grey55 : colors.grey40,
    light: isDark ? colors.grey40 : colors.grey55,
  };
};

