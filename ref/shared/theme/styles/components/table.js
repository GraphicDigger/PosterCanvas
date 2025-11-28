import { ref } from '../_ref';

export const table = {
  light: {
    row: {
      default: {
        background: ref.color.white0,
        border: null,
      },
      hovered: {
        background: ref.color.grey90,
        border: null,
      },
      focused: {
        background: ref.color.blue95,
        border: ref.palette.primary60,
      },
      selected: {
        background: ref.color.blue90,
        border: ref.palette.primary60,
      },
      disabled: {
        background: ref.color.white0,
        border: null,
      },
    },
    cell: {
      default: {
        background: ref.color.white0,
        border: null,
      },
      hovered: {
        background: ref.color.grey90,
        border: null,
      },
      focused: {
        background: ref.color.blue95,
        border: ref.palette.primary60,
      },
      selected: {
        background: ref.color.blue90,
        border: ref.palette.primary60,
      },
      disabled: {
        background: ref.color.white0,
        border: null,
      },
    },
    headCell: {
      default: {
        background: ref.color.grey95,
        border: null,
        text: ref.color.grey20,
      },
      hovered: {
        background: ref.color.grey90,
        border: null,
        text: ref.color.grey10,
      },
      focused: {
        background: ref.color.blue95,
        border: ref.palette.primary60,
        text: ref.color.grey0,
      },
      selected: {
        background: ref.color.blue90,
        border: ref.palette.primary60,
        text: ref.color.grey0,
      },
      disabled: {
        background: ref.color.white0,
        border: null,
        text: ref.color.grey50,
      },
    },
    sortable: {
      default: {
        background: ref.color.grey95,
        border: null,
        text: ref.color.grey20,
      },
      hovered: {
        background: ref.color.blue95,
        border: null,
        text: ref.color.grey20,
      },
      focused: {
        background: ref.color.blue95,
        border: ref.palette.primary60,
        text: ref.color.grey20,
      },
      active: {
        background: ref.color.blue90,
        border: ref.palette.primary60,
        text: ref.color.grey20,
      },
      disabled: {
        background: ref.color.white0,
        border: null,
        text: ref.color.grey50,
      },
    },
  },
  dark: {

  },
};
