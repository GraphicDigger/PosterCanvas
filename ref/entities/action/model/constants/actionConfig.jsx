import { ACTION_TYPES } from './actionTypes';
import { ACTION_GROUPS } from './actionGroups';
import { PlusIcon } from '../../../../shared/assets/icons';

export const ACTION_CONFIG = {
  // Navigation group
  [ACTION_TYPES.LINK_TO]: {
    type: ACTION_TYPES.LINK_TO,
    icon: <PlusIcon />,
    label: 'Link To',
    group: ACTION_GROUPS.navigation,
    config: {
      url: '',
      target: '_self', // '_blank', '_self'
    },
  },
  [ACTION_TYPES.GO_BACK]: {
    type: ACTION_TYPES.GO_BACK,
    icon: <PlusIcon />,
    label: 'Go Back',
    group: ACTION_GROUPS.navigation,
    config: {
      steps: 1, // количество шагов назад
    },
  },

  // Database group
  [ACTION_TYPES.DB_CREATE]: {
    type: ACTION_TYPES.DB_CREATE,
    icon: <PlusIcon />,
    label: 'Create Record',
    group: ACTION_GROUPS.database,
    config: {
      collectionId: null,
      data: {}, // данные для создания
      afterSuccess: null, // действие после успешного создания
    },
  },
  [ACTION_TYPES.DB_READ]: {
    type: ACTION_TYPES.DB_READ,
    icon: <PlusIcon />,
    label: 'Read Records',
    group: ACTION_GROUPS.database,
    config: {
      collectionId: null,
      query: {}, // фильтры, сортировка, пагинация
      saveToState: null, // куда сохранить результат
    },
  },
  [ACTION_TYPES.DB_UPDATE]: {
    type: ACTION_TYPES.DB_UPDATE,
    icon: <PlusIcon />,
    label: 'Update Record',
    group: ACTION_GROUPS.database,
    config: {
      collectionId: null,
      recordId: null,
      data: {}, // данные для обновления
      afterSuccess: null,
    },
  },
  [ACTION_TYPES.DB_DELETE]: {
    type: ACTION_TYPES.DB_DELETE,
    icon: <PlusIcon />,
    label: 'Delete Record',
    group: ACTION_GROUPS.database,
    config: {
      collectionId: null,
      recordId: null,
      afterSuccess: null,
    },
  },

  // API group
  [ACTION_TYPES.API_GET]: {
    type: ACTION_TYPES.API_GET,
    icon: <PlusIcon />,
    label: 'GET Request',
    group: ACTION_GROUPS.api,
    config: {
      url: '',
      headers: {
        'Content-Type': 'application/json',
      },
      params: {}, // query параметры
      saveToState: null, // куда сохранить результат
      errorHandler: null, // обработка ошибок
    },
  },
  [ACTION_TYPES.API_POST]: {
    type: ACTION_TYPES.API_POST,
    icon: <PlusIcon />,
    label: 'POST Request',
    group: ACTION_GROUPS.api,
    config: {
      url: '',
      headers: {
        'Content-Type': 'application/json',
      },
      body: {}, // тело запроса
      afterSuccess: null,
      errorHandler: null,
    },
  },
  [ACTION_TYPES.API_PUT]: {
    type: ACTION_TYPES.API_PUT,
    icon: <PlusIcon />,
    label: 'PUT Request',
    group: ACTION_GROUPS.api,
    config: {
      url: '',
      headers: {
        'Content-Type': 'application/json',
      },
      body: {},
      afterSuccess: null,
      errorHandler: null,
    },
  },
  [ACTION_TYPES.API_DELETE]: {
    type: ACTION_TYPES.API_DELETE,
    icon: <PlusIcon />,
    label: 'DELETE Request',
    group: ACTION_GROUPS.api,
    config: {
      url: '',
      headers: {
        'Content-Type': 'application/json',
      },
      params: {},
      afterSuccess: null,
      errorHandler: null,
    },
  },
  [ACTION_TYPES.CUSTOM_ACTION]: {
    type: ACTION_TYPES.CUSTOM_ACTION,
    icon: <PlusIcon />,
    label: 'CustomAction',
    group: ACTION_GROUPS.custom,
    config: {},
  },
};
