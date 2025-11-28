import { sysLight, sysDark } from '../_sys';

export const avatar = {
  light: {
    background:{
      default: sysLight.color.surfaceContainer.low,
    },
    icon: {
      default: sysLight.color.onSurface,
    },
    outline: {
      default: sysLight.color.outline.default,
    },
  },
  dark: {
    background: {
      default: sysDark.color.surfaceContainer.low,
    },
    icon: {
      default: sysDark.color.onSurface,
    },
    outline: {
      default: sysDark.color.outline.low,
    },
  },
};
