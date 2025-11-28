import { colors } from '../../../shared/styles';
import { mainColors, iconColors } from '../../../shared/styles';
import { textColors } from '../../../shared/styles';


export const buttonIconStyles = (theme) => {
  const isDark = theme === 'dark';
  const iconColorTheme = iconColors(theme);

  const style = (
    defaultBg,
    defaultIcon,
    hoverBg,
    hoverIcon,
    focusBg,
    focusIcon,
  ) => ({
    default: { backgroundColor: defaultBg, iconColor: defaultIcon },
    hovered: { backgroundColor: hoverBg, iconColor: hoverIcon },
    focused: { backgroundColor: focusBg, iconColor: focusIcon },
    disabled: {
      backgroundColor: isDark ? colors.white5 : colors.grey90,
      iconColor: iconColorTheme.light.color,
    },
  });

  return {

    blank: {

      default: style(
        'transparent',                              // defaultBg
        iconColorTheme.primary.color,             // defaultIcon
        isDark ? colors.white5 : colors.grey80,     // hoverBg
        iconColorTheme.primary.color,               // hoverIcon
        isDark ? colors.white10 : colors.grey80,    // focusBg
        iconColorTheme.primary.color,                // focusIcon
      ),
      primary: style(
        'transparent',
        mainColors.primary.main,
        isDark ? colors.white5 : colors.blue95,
        mainColors.primary.main,
        isDark ? colors.white5 : colors.blue95,
        mainColors.primary.main,
      ),
      success: style(
        'transparent',
        mainColors.success.main,
        isDark ? colors.white5 : colors.blue98,
        mainColors.success.main,
        isDark ? colors.white10 : colors.blue98,
        mainColors.success.main,
      ),
      warning: style(
        'transparent',
        mainColors.warning.main,
        isDark ? colors.white5 : colors.grey70,
        mainColors.warning.main,
        mainColors.warning.main,
        mainColors.warning.main,
      ),
      error: style(
        'transparent',
        mainColors.error.main,
        isDark ? colors.white5 : colors.red95,
        mainColors.error.main,
        isDark ? colors.white5 : colors.red95,
        mainColors.error.main,
      ),
    },

    filled: {

      default: style(
        isDark ? colors.white10 : colors.grey70,
        iconColorTheme.primary.color,
        isDark ? colors.white15 : colors.grey65,
        iconColorTheme.primary.color,
        isDark ? colors.white15 : colors.grey65,
        iconColorTheme.primary.color,
      ),
      primary: style(
        mainColors.primary.main,
        colors.white100,
        isDark ? mainColors.primary.dark1 : mainColors.primary.light1,
        colors.white100,
        isDark ? mainColors.primary.dark1 : mainColors.primary.main,
        colors.white100,
      ),
      success: style(
        mainColors.success.main,
        colors.white100,
        mainColors.success.dark1,
        colors.white100,
        mainColors.success.dark1,
        colors.white100,
      ),
      warning: style(
        mainColors.warning.main,
        colors.white100,
        mainColors.warning.dark1,
        colors.white100,
        mainColors.warning.dark1,
        colors.white100,
      ),
      error: style(
        mainColors.error.main,
        colors.white100,
        mainColors.error.dark1,
        colors.white100,
        mainColors.error.dark1,
        colors.white100,
      ),

      lite: {

        default: style(
          isDark ? colors.white5 : colors.grey90,
          textColors.primary,
          isDark ? colors.white10 : colors.grey80,
          textColors.primary,
          isDark ? colors.white10 : colors.grey80,
          textColors.primary,
        ),
        primary: style(
          isDark ? colors.white5 : colors.blue95,
          textColors.link,
          isDark ? colors.white10 : colors.blue90,
          textColors.link,
          isDark ? colors.white10 : colors.blue90,
          textColors.link,
        ),
        success: style(
          isDark ? colors.white5 : colors.mint98,
          mainColors.success.main,
          isDark ? colors.white10 : colors.mint95,
          mainColors.success.main,
          isDark ? colors.white10 : colors.mint95,
          mainColors.success.main,
        ),
        warning: style(
          isDark ? colors.white5 : colors.orange95,
          mainColors.warning.main,
          isDark ? colors.white10 : colors.orange95,
          mainColors.warning.main,
          isDark ? colors.white10 : colors.orange95,
          mainColors.warning.main,
        ),
        error: style(
          isDark ? colors.white5 : colors.red95,
          mainColors.error.main,
          isDark ? colors.white10 : colors.red90,
          mainColors.error.main,
          isDark ? colors.white10 : colors.red90,
          mainColors.error.main,
        ),
      },
    },
  };
};

