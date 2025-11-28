import { ref } from '../_ref';
import { sysLight, sysDark } from '../_sys';

export const checkbox = {
  light: {
    checked: {
      background: sysLight.color.primary,
      icon: sysLight.color.onPrimary,
    },
    unchecked: {
      background: sysLight.color.tertiaryContainer,
      icon: sysLight.color.onTertiaryContainer,
    },
    disabled: {
      background: sysLight.color.tertiaryContainer,
      icon: sysLight.color.onTertiaryContainer,
    },
  },
  dark: {

    checked: {
      background: sysDark.color.primary,
      icon: sysDark.color.onPrimary,
    },
    unchecked: {
      background: ref.color.white5,
      icon: ref.color.white100,
    },
    disabled: {
      background: sysDark.color.tertiaryContainer,
      icon: sysDark.color.onTertiaryContainer,
    },

  },
};
