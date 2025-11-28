import { ENTITY_KINDS } from '../../../shared/constants';

export const instances = [
  // Инстансы компонента кнопки
  {
    id: 'button-instance-01',
    name: 'Button Instance 01',
    kind: ENTITY_KINDS.INSTANCE,
    componentId: 'button-component-new',
    ownership: {
      type: ENTITY_KINDS.ELEMENT,
      id: 'element-01-form',
    },
    override: {},
    properties: {},
  },
  {
    id: 'icon-instance-01',
    name: '🔥',
    kind: ENTITY_KINDS.INSTANCE,
    componentId: 'icon-component',
    ownership: {
      type: ENTITY_KINDS.ELEMENT,
      id: 'element-00-button',
    },
    override: {},
    properties: {
      style: {
        width: '16px',
        height: '16px',
        display: 'inline-block',
        verticalAlign: 'middle',
      },
    },
  },
  {
    id: 'cards-layout-instance-01',
    name: '🔥',
    kind: ENTITY_KINDS.INSTANCE,
    componentId: 'component-with-array-prop',
    ownership: {
      type: ENTITY_KINDS.ELEMENT,
      id: 'body-screen-06',
    },
    override: {},
    properties: {
      style: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
      },
    },
  },
  {
    id: 'card-instance-02',
    name: '🔥',
    kind: ENTITY_KINDS.INSTANCE,
    componentId: 'component-with-collection-model-field-prop',
    ownership: {
      type: ENTITY_KINDS.ELEMENT,
      id: 'box-container-for-cards-layout-instance-02',
    },
    override: {},
    properties: {
      style: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
      },
    },
  },
  // {
  //     id: 'button-instance-02',
  //     name: 'Secondary Button',
  //     kind: ENTITY_KINDS.INSTANCE,
  //     componentId: 'button-component',
  //     ownership: {
  //         type: ENTITY_KINDS.SCREEN,
  //         screenId: 'screen-03',
  //     },
  //     properties: {}
  // },
  // {
  //     id: 'button-instance-03',
  //     name: 'Footer Button',
  //     kind: ENTITY_KINDS.INSTANCE,
  //     componentId: 'button-component',
  //     ownership: {
  //         type: ENTITY_KINDS.SCREEN,
  //         screenId: 'screen-03',
  //     },
  //     properties: {}
  // },
  // {
  //     id: 'header-instance-01',
  //     name: 'Main Header',
  //     kind: ENTITY_KINDS.INSTANCE,
  //     componentId: 'component-01',
  //     ownership: {
  //         type: ENTITY_KINDS.SCREEN,
  //         screenId: 'screen-05',
  //     },
  //     properties: {
  //         // style: {
  //         //     height: '80px',
  //         // },
  //         // content: {
  //         //     text: 'Welcome to Our Site'
  //         // }
  //     }
  // },
  // // Добавляем инстанс иконки

];
