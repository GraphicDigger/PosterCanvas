import { colors } from './baseColor';


export const mainColors = {
  primary: {
    light3: colors.blue90,
    light2: colors.blue70,
    light1: colors.blue60,
    main: colors.blue50,
    dark1: colors.blue40,
  },
  success: {
    light1: colors.mint70,
    main: colors.mint60,
    dark1: colors.mint50,
  },
  warning: {
    light1: colors.orange60,
    main: colors.orange50,
    dark1: colors.orange40,
  },
  error: {
    light1: colors.red60,
    main: colors.red50,
    dark1: colors.red40,
  },
};

export const mainColorsThemes = (theme) => {
  const isDark = theme === 'dark';
  return {
    primary: {
      light3: isDark ? colors.blue90 : colors.blue10,
      light2: isDark ? colors.blue70 : colors.blue20,
      light1: isDark ? colors.blue60 : colors.blue30,
      main: isDark ? colors.blue50 : colors.blue40,
      dark1: isDark ? colors.blue40 : colors.blue50,
    },
    success: {
      light1: isDark ? colors.mint70 : colors.mint10,
      main: isDark ? colors.mint60 : colors.mint20,
      dark1: isDark ? colors.mint50 : colors.mint30,
    },
    warning: {
      light1: isDark ? colors.orange60 : colors.orange10,
      main: isDark ? colors.orange50 : colors.orange20,
      dark1: isDark ? colors.orange40 : colors.orange30,
    },
    error: {
      light1: isDark ? colors.red60 : colors.red10,
      main: isDark ? colors.red50 : colors.red20,
      dark1: isDark ? colors.red40 : colors.red30,
    },
  };
};

