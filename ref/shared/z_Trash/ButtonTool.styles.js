import { colors, mainColors, iconColors } from '../../styles';

export const COLOR_SCHEMES = {
  default: {
    filled: (theme) => {
      const isDark = theme === 'dark';
      const iconColor = iconColors(theme);
      return {
        default: {
          bg: isDark ? colors.white5 : colors.grey90,
          iconColor: iconColor.secondary,
        },
        hover: {
          bg: isDark ? colors.white10 : colors.grey70,
          iconColor: iconColor.primary,
        },
        selected: {
          bg: isDark ? colors.white10 : colors.grey60,
          iconColor: iconColor.primary,
        },
        disabled: {
          bg: isDark ? colors.white10 : colors.grey80,
          iconColor: iconColor.light,
        },
      };
    },
    blank: (theme) => {
      const isDark = theme === 'dark';
      const iconColor = iconColors(theme);
      return {
        default: {
          bg: 'transparent',
          iconColor: iconColor.secondary,
        },
        hover: {
          bg: isDark ? colors.white10 : colors.grey70,
          iconColor: iconColor.primary,
        },
        selected: {
          bg: isDark ? colors.white10 : colors.grey60,
          iconColor: iconColor.primary,
        },
        disabled: {
          bg: 'transparent',
          iconColor: iconColor.light,
        },
      };
    },
  },

  primary: {
    filled: (theme) => {
      const isDark = theme === 'dark';
      const iconColor = iconColors(theme);
      return {
        default: {
          bg: isDark ? colors.white5 : colors.grey90,
          iconColor: iconColor.secondary,
        },
        hover: {
          bg: isDark ? colors.white10 : colors.grey70,
          iconColor: iconColor.primary,
        },
        selected: {
          bg: mainColors.primary.main,
          iconColor: colors.white100,
        },
        disabled: {
          bg: isDark ? colors.white10 : colors.grey80,
          iconColor: iconColor.light,
        },
      };
    },
    blank: (theme) => {
      const isDark = theme === 'dark';
      const iconColor = iconColors(theme);
      return {
        default: {
          bg: 'transparent',
          iconColor: iconColor.secondary,
        },
        hover: {
          bg: isDark ? colors.white10 : colors.grey70,
          iconColor: iconColor.primary,
        },
        selected: {
          bg: mainColors.primary.main,
          iconColor: colors.white100,
        },
        disabled: {
          bg: 'transparent',
          iconColor: iconColor.light,
        },
      };
    },
  },

  secondary: {
    filled: (theme) => {
      const isDark = theme === 'dark';
      const iconColor = iconColors(theme);
      return {
        default: {
          bg: isDark ? colors.white5 : colors.grey90,
          iconColor: iconColor.secondary,
        },
        hover: {
          bg: isDark ? colors.white10 : colors.grey70,
          iconColor: iconColor.primary,
        },
        selected: {
          bg: isDark ? colors.grey30 : colors.grey40,
          iconColor: colors.white100,
        },
        disabled: {
          bg: isDark ? colors.white10 : colors.grey80,
          iconColor: iconColor.light,
        },
      };
    },
    blank: (theme) => {
      const isDark = theme === 'dark';
      const iconColor = iconColors(theme);
      return {
        default: {
          bg: 'transparent',
          iconColor: iconColor.secondary,
        },
        hover: {
          bg: isDark ? colors.white10 : colors.grey70,
          iconColor: iconColor.primary,
        },
        selected: {
          bg: isDark ? colors.grey30 : colors.grey40,
          iconColor: colors.white100,
        },
        disabled: {
          bg: 'transparent',
          iconColor: iconColor.light,
        },
      };
    },
  },

  tertiary: {
    filled: (theme) => {
      const isDark = theme === 'dark';
      const iconColor = iconColors(theme);
      return {
        default: {
          bg: isDark ? colors.white5 : colors.grey90,
          iconColor: iconColor.secondary,
        },
        hover: {
          bg: isDark ? colors.white10 : colors.grey70,
          iconColor: iconColor.primary,
        },
        selected: {
          bg: isDark ? colors.white10 : colors.white100,
          iconColor: iconColor.primary,
        },
        disabled: {
          bg: isDark ? colors.white10 : colors.grey80,
          iconColor: iconColor.light,
        },
      };
    },
    blank: (theme) => {
      const isDark = theme === 'dark';
      const iconColor = iconColors(theme);
      return {
        default: {
          bg: 'transparent',
          iconColor: iconColor.secondary,
        },
        hover: {
          bg: isDark ? colors.white10 : colors.grey70,
          iconColor: iconColor.primary,
        },
        selected: {
          bg: isDark ? colors.white10 : colors.white100,
          iconColor: iconColor.primary,
        },
        disabled: {
          bg: 'transparent',
          iconColor: iconColor.light,
        },
      };
    },
  },

  custom: {
    filled: (customBgColor, customIconColor) => {
      return {
        default: {
          bg: customBgColor || 'transparent',
          iconColor: customIconColor || '#000000',
        },
        hover: {
          bg: customBgColor || 'transparent',
          iconColor: customIconColor || '#000000',
        },
        selected: {
          bg: customBgColor || 'transparent',
          iconColor: customIconColor || '#000000',
        },
        disabled: {
          bg: customBgColor || 'transparent',
          iconColor: customIconColor || '#000000',
          opacity: 0.5,
        },
      };
    },
    blank: (customBgColor, customIconColor) => {
      return {
        default: {
          bg: 'transparent',
          iconColor: customIconColor || '#000000',
        },
        hover: {
          bg: customBgColor || 'rgba(0, 0, 0, 0.1)',
          iconColor: customIconColor || '#000000',
        },
        selected: {
          bg: customBgColor || 'rgba(0, 0, 0, 0.1)',
          iconColor: customIconColor || '#000000',
        },
        disabled: {
          bg: 'transparent',
          iconColor: customIconColor || '#000000',
          opacity: 0.5,
        },
      };
    },
  },
};
