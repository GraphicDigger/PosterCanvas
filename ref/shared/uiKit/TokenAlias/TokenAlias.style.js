import { colors } from '../../../shared/styles';

export const TokenAliasStyle1 = {

  primary: {
    light1: colors.blue60,
    main: colors.blue50,
    dark1: colors.blue40,
  },
  secondary: {
    light1: colors.mint70,
    main: colors.mint60,
    dark1: colors.mint50,
  },

};

export const TokenAliasStyle2  = (theme) => {

  const isDark = theme === 'dark';

  return {
    primary: {
      color: isDark ? colors.grey90 : colors.grey20,
    },
    secondary: {
      color: isDark ? colors.grey55 : colors.grey40,
    },
  };
};
