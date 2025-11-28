import { PlusIcon } from '../../../../shared/assets/icons';


export const TRIGGER_TYPES = {
  ON_CLICK: 'onClick',
  ON_MOUSE_ENTER: 'onMouseEnter',
  ON_MOUSE_LEAVE: 'onMouseLeave',

};

export const TRIGGER_CONFIG = {
  ON_CLICK: {
    type: TRIGGER_TYPES.ON_CLICK,
    icon: <PlusIcon />,
    label: 'onClick',
  },
  ON_MOUSE_ENTER: {
    type: TRIGGER_TYPES.ON_MOUSE_ENTER,
    icon: <PlusIcon />,
    label: 'onMouseEnter',
  },
  ON_MOUSE_LEAVE: {
    type: TRIGGER_TYPES.ON_MOUSE_LEAVE,
    icon: <PlusIcon />,
    label: 'onMouseLeave',
  },
};
