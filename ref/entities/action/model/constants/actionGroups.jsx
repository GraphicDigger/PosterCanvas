import { ACTION_TYPES } from './actionTypes';
import { PlusIcon } from '../../../../shared/assets/icons';


export const ACTION_GROUPS = {
  navigation: {
    label: 'Navigation',
    icon: <PlusIcon />,
    actions: [
      ACTION_TYPES.LINK_TO,
      ACTION_TYPES.GO_BACK,
    ],
  },
  database: {
    label: 'Database',
    icon: <PlusIcon />,
    actions: [
      ACTION_TYPES.DB_CREATE,
      ACTION_TYPES.DB_READ,
      ACTION_TYPES.DB_UPDATE,
      ACTION_TYPES.DB_DELETE,
    ],
  },
  api: {
    label: 'External API',
    icon: <PlusIcon />,
    actions: [
      ACTION_TYPES.API_GET,
      ACTION_TYPES.API_POST,
      ACTION_TYPES.API_PUT,
      ACTION_TYPES.API_DELETE,
    ],
  },
};
