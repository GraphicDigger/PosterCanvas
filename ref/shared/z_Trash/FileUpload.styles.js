import { colors, mainColors, textColors, textColorsMode } from '../../styles';

export const getColorSchemes = (theme) => {
  const isDark = theme === 'dark';

  return {
    primary: {
      default: {
        background: isDark ? colors.white5 : colors.blue95,
        text: mainColors.primary.main,
        icon: mainColors.primary.main,
      },
      hover: {
        background: isDark ? colors.white10 : colors.blue90,
        text: mainColors.primary.main,
        icon: mainColors.primary.main,
      },
    },

    success: {
      default: {
        background: isDark ? colors.white5 : colors.mint98,
        text: mainColors.success.main,
        icon: mainColors.success.main,
      },
      hover: {
        background: isDark ? colors.white10 : colors.mint95,
        text: mainColors.success.main,
        icon: mainColors.success.main,
      },
    },

    warning: {
      default: {
        background: isDark ? colors.white5 : colors.orange95,
        text: mainColors.warning.main,
        icon: mainColors.warning.main,
      },
      hover: {
        background: isDark ? colors.white10 : colors.orange95,
        text: mainColors.warning.main,
        icon: mainColors.warning.main,
      },
    },

    error: {
      default: {
        background: isDark ? colors.white5 : colors.red95,
        text: mainColors.error.main,
        icon: mainColors.error.main,
      },
      hover: {
        background: isDark ? colors.white10 : colors.red90,
        text: mainColors.error.main,
        icon: mainColors.error.main,
      },
    },
  };
};
