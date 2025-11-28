import { ref } from '../_ref';

export const listItem = {
  light: {
    default: {
      filled: {
        background: ref.color.grey90,
      },
      blank: {
        background: ref.color.white0,
      },
    },
    hovered: {
      filled: {
        background: ref.color.grey80,
      },
      blank: {
        background: ref.color.grey90,
      },
    },
    selected: {
      filled: {
        background: ref.color.grey70,
      },
      blank: {
        background: ref.color.grey80,
      },
    },
    disabled: {
      filled: {
        background: ref.color.grey90,
      },
      blank: {
        background: ref.color.white0,
      },
    },
  },
  dark: {
    default: {
      filled: {
        background: ref.color.white5,
      },
      blank: {
        background: ref.color.white0,
      },
    },
    hovered: {
      filled: {
        background: ref.color.white15,
      },
      blank: {
        background: ref.color.white10,
      },
    },
    selected: {
      filled: {
        background: ref.color.white20,
      },
      blank: {
        background: ref.color.white10,
      },
    },
    disabled: {
      filled: {
        background: ref.color.white5,
      },
      blank: {
        background: ref.color.white0,
      },
    },
  },
};
