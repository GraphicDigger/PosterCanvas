import { ref } from './_ref';

export const sysLight = {

  color: {
    primary: ref.palette.primary50,
    onPrimary: ref.color.white100,
    primaryContainer: ref.palette.primary95,
    onPrimaryContainer: ref.palette.primary50,

    tertiary: ref.palette.tertiary60,
    onTertiary: ref.color.white100,
    tertiaryContainer: ref.palette.tertiary90,
    onTertiaryContainer: ref.palette.tertiary40,

    success: ref.palette.success50,
    onSuccess: ref.color.white100,
    successContainer: ref.palette.success50,
    onSuccessContainer: ref.color.white100,

    warning: ref.palette.warning50,
    onWarning: ref.color.white100,
    warningContainer: ref.palette.warning50,
    onWarningContainer: ref.color.white100,

    error: ref.palette.error50,
    onError: ref.color.white100,
    errorContainer: ref.palette.error50,
    onErrorContainer: ref.color.white100,

    surface: ref.color.white100,
    onSurface: ref.color.grey10,
    onSurfaceVariant: ref.color.grey40,

    surfaceContainer: {
      lowest: ref.color.grey90,
      low: ref.color.grey80,
      default: ref.color.grey70,
      high: ref.color.grey60,
      highest: ref.color.grey50,
    },
    outline: {
      lowest: ref.color.grey90,
      low: ref.color.grey80,
      default: ref.color.grey70,
      high: ref.color.grey65,
      highest: ref.color.grey60,
    },
  },
  state: {
    hover: 0.07999999821186066,
    focus: 0.11999999731779099,
    pressed: 0.11999999731779099,
    dragged: 0.1599999964237213,
  },
  icon: {
    default: ref.color.grey40,
    light1: ref.color.grey50,
    dark1: ref.color.grey30,
    dark2: ref.color.grey20,
  },
  shadow: {
    elevation: {
      0: 'none',
      4: '0 1px 6px rgba(0, 0, 0, 0.1)',
    },
  },
  typography: {
    color: {
      primary: ref.color.grey20,
      secondary: ref.color.grey40,
      disabled: ref.color.grey50,
      link: ref.color.blue50,
      success: ref.color.mint50,
      warning: ref.color.orange50,
      error: ref.color.red50,
    },
    weight: {
      medium: ref.font.weightMedium,
      semibold: ref.font.weightSemibold,
      bold: ref.font.weightBold,
    },
    body: {
      xxsmall: {
        fontSize: ref.font.size10,
        lineHeight: ref.font.lineHeight140,
        fontWeight: ref.font.weightMedium,
      },
      xsmall: {
        fontSize: ref.font.size12,
        lineHeight: ref.font.lineHeight140,
        fontWeight: ref.font.weightMedium,
      },
      small: {
        fontSize: ref.font.size13,
        lineHeight: ref.font.lineHeight140,
        fontWeight: ref.font.weightMedium,
      },
      medium: {
        fontSize: ref.font.size14,
        lineHeight: ref.font.lineHeight140,
        fontWeight: ref.font.weightMedium,
      },
      large: {
        fontSize: ref.font.size16,
        lineHeight: ref.font.lineHeight140,
        fontWeight: ref.font.weightRegular,
      },
    },
    heading: {

      xsmall: {
        fontSize: ref.font.size13,
        lineHeight: ref.font.lineHeight140,
        fontWeight: ref.font.weightBold,
      },
      small: {
        fontSize: ref.font.size14,
        lineHeight: ref.font.lineHeight140,
        fontWeight: ref.font.weightBold,
      },
      medium: {
        fontSize: ref.font.size20,
        lineHeight: ref.font.lineHeight140,
        fontWeight: ref.font.weightBold,
      },
      large: {
        fontSize: ref.font.size24,
        lineHeight: ref.font.lineHeight140,
        fontWeight: ref.font.weightBold,
        letterSpacing: '-0.4px',
      },
      xlarge: {
        fontSize: ref.font.size28,
        lineHeight: ref.font.lineHeight140,
        fontWeight: ref.font.weightBold,
        letterSpacing: '-0.7px',
      },
    },
  },
};

export const sysDark = {
  color: {
    primary: ref.palette.primary50,
    onPrimary: ref.color.white100,
    primaryContainer: ref.palette.primary95,
    onPrimaryContainer: ref.palette.primary50,

    tertiary: ref.palette.tertiary60,
    onTertiary: ref.color.white100,
    tertiaryContainer: ref.palette.tertiary90,
    onTertiaryContainer: ref.palette.tertiary40,

    surface:  ref.color.grey10,
    onSurface: ref.color.white100,
    onSurfaceVariant: ref.color.white60,

    surfaceContainer: {
      lowest: ref.color.grey15,
      low: ref.color.grey20,
      default: ref.color.grey30,
      high: ref.color.grey40,
      highest: ref.color.grey50,
    },

    outline: {
      lowest: ref.color.white5,
      low: ref.color.white10,
      default: ref.color.white15,
      high: ref.color.white20,
      highest: ref.color.white25,
    },
  },
  shadow: {
    elevation: {
      0: 'none',
      4: '0 1px 6px rgba(0, 0, 0, 0.1)',
    },
  },

  typography: {
    color: {
      primary: ref.color.white90,
      secondary: ref.color.white40,
      disabled: ref.color.white50,
      link: ref.color.blue50,
      success: ref.color.mint60,
      warning: ref.color.orange60,
      error: ref.color.red60,
    },
    weight: {
      medium: ref.font.weightMedium,
      semibold: ref.font.weightSemibold,
      bold: ref.font.weightBold,
    },
    body: {
      xxsmall: {
        fontSize: ref.font.size10,
        lineHeight: ref.font.lineHeight140,
        fontWeight: ref.font.weightMedium,
      },
      xsmall: {
        fontSize: ref.font.size12,
        lineHeight: ref.font.lineHeight140,
        fontWeight: ref.font.weightMedium,
      },
      small: {
        fontSize: ref.font.size13,
        lineHeight: ref.font.lineHeight140,
        fontWeight: ref.font.weightMedium,
      },
      medium: {
        fontSize: ref.font.size14,
        lineHeight: ref.font.lineHeight140,
        fontWeight: ref.font.weightMedium,
      },
      large: {
        fontSize: ref.font.size16,
        lineHeight: ref.font.lineHeight140,
        fontWeight: ref.font.weightRegular,
      },
    },
    heading: {
      xsmall: {
        fontSize: ref.font.size12,
        lineHeight: ref.font.lineHeight140,
        fontWeight: ref.font.weightBold,
      },
      small: {
        fontSize: ref.font.size13,
        lineHeight: ref.font.lineHeight140,
        fontWeight: ref.font.weightBold,
      },
      medium: {
        fontSize: ref.font.size14,
        lineHeight: ref.font.lineHeight140,
        fontWeight: ref.font.weightBold,
      },
    },
  },
};
