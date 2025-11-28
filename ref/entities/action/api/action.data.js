import { ACTION_TYPES } from '../model/constants/actionTypes';
import { TRIGGER_TYPES } from '../model/constants/triggers';
import { ENTITY_KINDS } from '../../../shared/constants';

export const actions = [
  // Navigation actions
  {
    id: 'action-01',
    kind: ENTITY_KINDS.ACTION,
    type: ACTION_TYPES.LINK_TO,
    trigger: TRIGGER_TYPES.ON_CLICK,
    name: 'Link To',
    componentId: 'component-01', // связь с Component 01
    config: {
      targetScreenId: 'screen-01',
    },
  },
  {
    id: 'action-05',
    kind: ENTITY_KINDS.ACTION,
    type: ACTION_TYPES.DB_CREATE,
    trigger: TRIGGER_TYPES.ON_CLICK,
    name: 'Create Record',
    componentId: 'component-01',
    config: {
      collectionId: 'users',
      data: {
        name: '',
        email: '',
      },
    },
  },
  {
    id: 'action-02',
    kind: ENTITY_KINDS.ACTION,
    type: ACTION_TYPES.LINK_TO,
    trigger: TRIGGER_TYPES.ON_MOUSE_ENTER,
    name: 'Link To',
    componentId: 'component-02', // тот же компонент может иметь несколько действий
    config: {
      targetScreenId: 'screen-02',
    },
  },
  {
    id: 'action-03',
    kind: ENTITY_KINDS.ACTION,
    type: ACTION_TYPES.LINK_TO,
    trigger: TRIGGER_TYPES.ON_CLICK,
    name: 'Link To',
    componentId: 'component-02',
    config: {
      targetScreenId: 'screen-03',
    },
  },
  {
    id: 'action-04',
    kind: ENTITY_KINDS.ACTION,
    type: ACTION_TYPES.LINK_TO,
    trigger: TRIGGER_TYPES.ON_CLICK,
    name: 'Link To',
    componentId: 'component-03',
    config: {
      targetScreenId: 'screen-04',
    },
  },
  {
    id: 'action-06',
    kind: ENTITY_KINDS.ACTION,
    type: ACTION_TYPES.API_GET,
    trigger: TRIGGER_TYPES.ON_MOUNT,
    name: 'GET Request',
    componentId: 'component-03',
    config: {
      url: '/api/users',
      headers: {
        'Content-Type': 'application/json',
      },
      params: {
        userId: '{{userId}}',
      },
    },
  },
];
