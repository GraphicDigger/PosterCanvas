import { sysLight, sysDark } from '../_sys';

export const surface = {
  light: {
    default: sysLight.color.surface,
    lowest: sysLight.color.surfaceContainer.lowest,
    low: sysLight.color.surfaceContainer.low,
    high: sysLight.color.surfaceContainer.high,
    highest: sysLight.color.surfaceContainer.highest,
  },
  dark: {
    default: sysDark.color.surface,
    lowest: sysDark.color.surfaceContainer.lowest,
    low: sysDark.color.surfaceContainer.low,
    high: sysDark.color.surfaceContainer.high,
    highest: sysDark.color.surfaceContainer.highest,
  },
};
