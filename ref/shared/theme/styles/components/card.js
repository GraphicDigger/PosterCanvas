import { sysLight, sysDark } from '../_sys';

export const card = {
  light: {
    background:{
      default: sysLight.color.surface,
      hover: sysLight.color.surfaceContainer.lowest,
      focus: sysLight.color.surfaceContainer.lowest,
      selected: sysLight.color.surfaceContainer.lowest,
    },
    outline: {
      default: sysLight.color.outline.default,
    },
  },
  dark: {
    background: {
      default: sysDark.color.surfaceContainer.lowest,
      hover: sysDark.color.surfaceContainer.low,
      focus: sysDark.color.surfaceContainer.low,
      selected: sysDark.color.surfaceContainer.low,
    },
    outline: {
      default: sysDark.color.outline.low,
    },
  },
};
