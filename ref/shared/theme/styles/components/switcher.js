import { sysLight } from '../_sys';

export const switcher = {
  light: {
    checked: {
      background: sysLight.color.primary,
      icon: sysLight.color.onPrimary,
    },
    unchecked: {
      background: sysLight.color.tertiary,
      icon: sysLight.color.onTertiary,
    },
    disabled: {
      background: sysLight.color.tertiaryContainer,
      icon: sysLight.color.onTertiaryContainer,
    },
  },

  dark: {

  },
};
