import { colors, mainColors } from '../../../styles';

export const fieldStyles = (theme) => {
  const isDark = theme === 'dark';

  const baseColors = {
    defaultColor: isDark ? colors.white5 : colors.grey90,
    hoverColor: isDark ? colors.white10 : colors.grey80,
    focusColor: isDark ? colors.white5 : colors.grey90,
    errorColor: isDark ? mainColors.error.light1 : mainColors.error.main,
  };

  const uploadColors = {
    defaultColor: isDark ? colors.white5 : colors.blue95,
    hoverColor: isDark ? colors.white10 : colors.blue90,
    focusColor: isDark ? colors.white5 : colors.blue95,
    errorColor: isDark ? mainColors.error.light1 : mainColors.error.main,
  };

  return {
    field: {
      default: baseColors.defaultColor,
      hover: baseColors.hoverColor,
      focus: baseColors.focusColor,
      error: baseColors.errorColor,
    },
    upload: {
      default: uploadColors.defaultColor,
      hover: uploadColors.hoverColor,
      focus: uploadColors.focusColor,
      error: uploadColors.errorColor,
    },
  };
};
