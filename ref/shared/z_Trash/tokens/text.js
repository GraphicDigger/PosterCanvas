import { colors } from './baseColor';
import { mainColors } from './mainColors';


// не зависит от темы
export const textColors = {
  primary: colors.grey20,
  secondary: colors.grey40,
  disabled: colors.grey50,
  link: mainColors.primary.main,
  success: mainColors.success.dark1,
  warning: mainColors.warning.dark1,
  error: mainColors.error.dark1,
};

// зависит от темы
export const textColorsMode = (theme) => {
  const isDark = theme === 'dark';

  return {
    primary: isDark ? colors.white90 : textColors.primary,
    secondary: isDark ? colors.white40 : textColors.secondary,
    disabled: isDark ? colors.white50 : textColors.disabled,
    success: isDark ? mainColors.success.main : textColors.success,
    warning: isDark ? mainColors.warning.main : textColors.warning,
    error: isDark ? mainColors.error.main : textColors.error,
    link: mainColors.primary.main,
  };
};
