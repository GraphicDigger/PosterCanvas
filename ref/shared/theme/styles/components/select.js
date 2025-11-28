import { ref } from '../_ref';

export const select = {
  light: {
    default:{
      background: ref.color.grey90,
      border: ref.color.grey90,
    },
    hover:{
      background: ref.color.grey80,
      border: ref.color.grey80,
    },
    focus:{
      background: ref.color.grey90,
      border: ref.palette.primary60,
    },
    error:{
      background: ref.color.red50,
      border: ref.color.red50,
    },
  },
  dark: {
    default: {
      background: ref.color.white5,
      border: ref.color.white5,
    },
    hover: {
      background: ref.color.white10,
      border: ref.color.white10,
    },
    focus: {
      background: ref.color.white5,
      border: ref.palette.primary60,
    },
    error: {
      background: ref.color.red50,
      border: ref.color.red50,
    },
  },
};
