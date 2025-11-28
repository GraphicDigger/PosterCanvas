import { ENTITY_KINDS, VARIABLE_TYPES } from '@/shared/constants';

export const variables = [
  {
    id: 'variable-01',
    name: 'Number',
    kind: ENTITY_KINDS.DATA_VARIABLE,
    type: VARIABLE_TYPES.NUMBER,
    value: 100,
    ownership: {
      id: 'screen-01',
      type: ENTITY_KINDS.SCREEN,
    },
  },
  {
    id: 'variable-02',
    name: 'String',
    kind: ENTITY_KINDS.DATA_VARIABLE,
    type: VARIABLE_TYPES.STRING,
    value: 'Hello World',
    ownership: {
      id: 'screen-01',
      type: ENTITY_KINDS.SCREEN,
    },
  },
  {
    id: 'variable-03',
    name: 'Boolean',
    kind: ENTITY_KINDS.DATA_VARIABLE,
    type: VARIABLE_TYPES.BOOLEAN,
    value: true,
    ownership: {
      id: 'screen-01',
      type: ENTITY_KINDS.SCREEN,
    },
  },
  {
    id: 'variable-04',
    name: 'Color',
    kind: ENTITY_KINDS.DATA_VARIABLE,
    type: VARIABLE_TYPES.COLOR,
    value: '#0079D4',
    ownership: {
      id: 'screen-01',
      type: ENTITY_KINDS.SCREEN,
    },
  },
  {
    id: 'variable-07',
    name: 'Data',
    kind: ENTITY_KINDS.DATA_VARIABLE,
    type: VARIABLE_TYPES.DATA,
    value: {
      type: ENTITY_KINDS.DATA_MODEL,
      id: 'model1',
    },
    ownership: {
      id: 'screen-02',
      type: ENTITY_KINDS.SCREEN,
    },
  },
  {
    id: 'variable-08',
    name: 'String',
    kind: ENTITY_KINDS.DATA_VARIABLE,
    type: VARIABLE_TYPES.STRING,
    value: 'Hello World',
    ownership: {
      id: 'screen-02',
      type: ENTITY_KINDS.SCREEN,
    },
  },
  {
    id: 'variable-09',
    name: 'Data',
    kind: ENTITY_KINDS.DATA_VARIABLE,
    type: VARIABLE_TYPES.DATA,
    value: {
      type: ENTITY_KINDS.DATA_MODEL,
      id: 'model1',
    },
    ownership: {
      id: 'screen-03',
      type: ENTITY_KINDS.SCREEN,
    },
  },
  {
    id: 'variable-10',
    name: 'String',
    kind: ENTITY_KINDS.DATA_VARIABLE,
    type: VARIABLE_TYPES.STRING,
    value: 'Hello World',
    ownership: {
      id: 'screen-03',
      type: ENTITY_KINDS.SCREEN,
    },
  },
  {
    id: 'variable-11',
    name: 'String',
    kind: ENTITY_KINDS.DATA_VARIABLE,
    type: VARIABLE_TYPES.STRING,
    value: 'Hello World',
    ownership: {
      id: 'component-with-array-prop',
      type: ENTITY_KINDS.COMPONENT,
    },
  },
  {
    id: 'variable-12',
    name: 'Data',
    kind: ENTITY_KINDS.DATA_VARIABLE,
    type: VARIABLE_TYPES.DATA,
    value: {
      type: ENTITY_KINDS.DATA_MODEL,
      id: 'model1',
    },
    ownership: {
      id: 'component-with-array-prop',
      type: ENTITY_KINDS.COMPONENT,
    },
  },
  {
    id: 'variable-13',
    name: 'Data',
    kind: ENTITY_KINDS.DATA_VARIABLE,
    type: VARIABLE_TYPES.DATA,
    value: {
      type: ENTITY_KINDS.DATA_MODEL,
      id: 'model1',
    },
    ownership: {
      id: 'screen-07',
      type: ENTITY_KINDS.SCREEN,
    },
  },
  {
    id: 'variable-14-2',
    name: 'Memebers',
    kind: ENTITY_KINDS.DATA_VARIABLE,
    type: VARIABLE_TYPES.DATA,
    value: {
      type: ENTITY_KINDS.DATA_MODEL,
      id: 'model1',
    },
    ownership: {
      id: 'screen-06',
      type: ENTITY_KINDS.SCREEN,
    },
  },
  {
    id: 'variable-14-1',
    name: 'Filtered by role: developers',
    kind: ENTITY_KINDS.DATA_VARIABLE,
    type: VARIABLE_TYPES.DATA,
    value: {
      type: ENTITY_KINDS.DATA_MODEL,
      id: 'model1',
    },
    filters: [
      { field: 'role', operator: 'equals', value: 'developer' },
    ],
    ownership: {
      id: 'screen-06',
      type: ENTITY_KINDS.SCREEN,
    },
  },
  {
    id: 'variable-14-3',
    name: 'Roles',
    kind: ENTITY_KINDS.DATA_VARIABLE,
    type: VARIABLE_TYPES.DATA,
    value: {
      type: ENTITY_KINDS.DATA_MODEL,
      id: 'model2',
    },
    ownership: {
      id: 'screen-06',
      type: ENTITY_KINDS.SCREEN,
    },
  },

];


// 'variable-05': {
//     id: 'variable-05',
//     name: 'Image',
//     kind: ENTITY_KINDS.DATA_VARIABLE,
//     type: VARIABLE_TYPES.IMAGE,
//     value: 'image.png',
//     screenId: 3,
//     componentId: 'component-05',
//     global: false,
// },
// 'variable-06': {
//     id: 'variable-06',
//     name: 'Video',
//     kind: ENTITY_KINDS.DATA_VARIABLE,
//     type: VARIABLE_TYPES.VIDEO,
//     value: 'video.mp4',
//     screenId: 3,
//     componentId: 'component-04',
//     global: false,
// // },
// 'variable-08': {
//     id: 'variable-08',
//     name: 'Date',
//     kind: ENTITY_KINDS.DATA_VARIABLE,
//     type: VARIABLE_TYPES.DATE,
//     value: '2024-01-01',
//     screenId: 4,
//     componentId: 'component-04',
//     global: false,
// },
// 'variable-09': {
//     id: 'variable-09',
//     name: 'JSON',
//     kind: ENTITY_KINDS.DATA_VARIABLE,
//     type: VARIABLE_TYPES.JSON,
//     value: '{"name": "John", "age": 30, "city": "New York"}',
//     screenId: 5,
//     componentId: 'component-09',
//     global: false,
// },
