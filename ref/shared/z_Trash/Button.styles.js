import { colors, mainColors, textColors, textColorsMode } from '../../styles';

export const COLOR_SCHEMES = {

  default: {
    filled: (theme) => {
      const isDark = theme === 'dark';
      return {
        default: {
          bg: isDark ? colors.white10 : colors.grey70,
          text: textColorsMode(theme).primary,
        },
        hover: {
          bg: isDark ? colors.white5 : colors.grey65,
          text: textColorsMode(theme).primary,
        },
      };
    },

    blank: (theme) => {
      const isDark = theme === 'dark';
      return {
        default: {
          bg: 'transparent',
          text: textColorsMode(theme).primary,
        },
        hover: {
          bg: isDark ? colors.white10 : colors.grey80,
          text: textColorsMode(theme).primary,
        },
      };
    },

    lite: (theme) => {
      const isDark = theme === 'dark';
      return {
        default: {
          bg: isDark ? colors.white5 : colors.grey90,
          text: textColorsMode(theme).primary,
        },
        hover: {
          bg: isDark ? colors.white5 : colors.grey65,
          text: textColorsMode(theme).primary,
        },
      };
    },
  },

  primary: {
    filled: (theme) => {
      const isDark = theme === 'dark';
      return {
        default: {
          bg: mainColors.primary.main,
          text: colors.white100,
        },
        hover: {
          bg: isDark ? colors.white5 : mainColors.primary.light1,
          text: colors.white100,
        },
      };
    },
    blank: (theme) => {
      const isDark = theme === 'dark';
      return {
        default: {
          bg: 'transparent',
          text: textColorsMode(theme).primary,
        },
        hover: {
          bg: isDark ? colors.white5 : mainColors.primary.main,
          text: colors.white100,
        },
      };
    },
    lite: (theme) => {
      const isDark = theme === 'dark';
      return {
        default: {
          bg: isDark ? colors.white5 : colors.blue95,
          text: textColorsMode(theme).primary,
        },
        hover: {
          bg: isDark ? colors.white10 : colors.blue90,
          text: textColorsMode(theme).primary,
        },
      };
    },
  },
  success: {
    filled: (theme) => ({
      default: {
        bg: mainColors.success.main,
        text: colors.white100,
      },
      hover: {
        bg: mainColors.success.light1,
        text: colors.white100,
      },
    }),
    blank: (theme) => ({
      default: {
        bg: 'transparent',
        text: textColors.success,
      },
      hover: {
        bg: mainColors.success.main,
        text: colors.white100,
      },
    }),
    lite: (theme) => {
      const isDark = theme === 'dark';
      return {
        default: {
          bg: isDark ? colors.white5 : colors.mint98,
          text: mainColors.success.main,
        },
        hover: {
          bg: isDark ? colors.white10 : colors.mint95,
          text: mainColors.success.main,
        },
      };
    },
  },
  warning: {
    filled: (theme) => ({
      default: {
        bg: mainColors.warning.main,
        text: colors.white100,
      },
      hover: {
        bg: mainColors.warning.light1,
        text: colors.white100,
      },
    }),
    blank: (theme) => ({
      default: {
        bg: 'transparent',
        text: textColors.warning,
      },
      hover: {
        bg: mainColors.warning.main,
        text: colors.white100,
      },
    }),
    lite: (theme) => {
      const isDark = theme === 'dark';
      return {
        default: {
          bg: isDark ? colors.white5 : colors.orange95,
          text: mainColors.warning.main,
        },
        hover: {
          bg: isDark ? colors.white10 : colors.orange95,
          text: mainColors.warning.main,
        },
      };
    },
  },
  error: {
    filled: (theme) => ({
      default: {
        bg: mainColors.error.main,
        text: colors.white100,
      },
      hover: {
        bg: mainColors.error.light1,
        text: colors.white100,
      },
    }),
    blank: (theme) => ({
      default: {
        bg: 'transparent',
        text: textColorsMode(theme).primary,
      },
      hover: {
        bg: mainColors.error.main,
        text: colors.white100,
      },
    }),
    lite: (theme) => {
      const isDark = theme === 'dark';
      return {
        default: {
          bg: isDark ? colors.white5 : colors.red95,
          text: mainColors.error.main,
        },
        hover: {
          bg: isDark ? colors.white10 : colors.red90,
          text: mainColors.error.main,
        },
      };
    },
  },
};
