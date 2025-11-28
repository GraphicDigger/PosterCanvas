import { colors } from '../../styles/tokens/baseColor';

export const cardStyles = (theme) => {
  const isDark = theme === 'dark';

  return {
    backgroundColor: isDark ? colors.grey10 : colors.white100,
    hoverBackgroundColor: isDark ? colors.grey20 : colors.grey90,
    focusBackgroundColor: isDark ? colors.grey20 : colors.grey90,
    selectedBackgroundColor: isDark ? colors.grey20 : colors.grey90,
  };
};
