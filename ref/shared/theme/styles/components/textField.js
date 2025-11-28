import { ref } from '../_ref';

export const textField = {
  light: {
    default: ref.color.grey90,
    hover: ref.color.grey80,
    focus: ref.color.grey90,
    error: ref.color.red50,
  },
  dark: {
    default: ref.color.white5,
    hover: ref.color.white10,
    focus: ref.color.white5,
    error: ref.color.red50,
  },
};
