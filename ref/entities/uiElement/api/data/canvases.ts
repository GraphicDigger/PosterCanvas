import { ENTITY_KINDS } from '@/shared/constants';
import { Element } from '../../types';

export const canvases: Element[] = [
  {
    id: 'root-screen-01',
    name: 'Canvas',
    kind: ENTITY_KINDS.ELEMENT,
    ownership: {
      type: ENTITY_KINDS.SCREEN,
      id: 'screen-01',
    },
    tag: 'div',
    properties: {
      style: {
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      },
      content: {},
    },
    attributes: {
      id: 'canvas',
    },
    events: {},
  },
  {
    id: 'root-screen-02',
    name: 'Canvas',
    kind: ENTITY_KINDS.ELEMENT,
    ownership: {
      type: ENTITY_KINDS.SCREEN,
      id: 'screen-02',
    },
    tag: 'div',
    properties: {
      style: {
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
      },
      content: {},
    },
    attributes: {
      id: 'canvas',
    },
  },
  {
    id: 'root-screen-03',
    name: 'Canvas',
    kind: ENTITY_KINDS.ELEMENT,
    ownership: {
      type: ENTITY_KINDS.SCREEN,
      id: 'screen-03',
    },
    tag: 'div',
    properties: {
      style: {
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
      },
      content: {},
    },
    attributes: {
      id: 'canvas',
    },
  },
  {
    id: 'root-screen-04',
    name: 'Canvas',
    kind: ENTITY_KINDS.ELEMENT,
    ownership: {
      type: ENTITY_KINDS.SCREEN,
      id: 'screen-04',
    },
    tag: 'div',
    properties: {
      style: {
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      },
      content: {},
    },
    attributes: {
      id: 'canvas',
    },
  },
  {
    id: 'root-screen-05',
    name: 'Canvas',
    kind: ENTITY_KINDS.ELEMENT,
    ownership: {
      type: ENTITY_KINDS.SCREEN,
      id: 'screen-05',
    },
    tag: 'div',
    properties: {
      style: {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
      },
      content: {},
    },
    attributes: {
      id: 'canvas',
    },
  },
  {
    id: 'root-screen-06',
    name: 'Canvas',
    kind: ENTITY_KINDS.ELEMENT,
    ownership: {
      type: ENTITY_KINDS.SCREEN,
      id: 'screen-06',
    },
    tag: 'div',
    properties: {
      style: {
        width: '100vw',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
      },
      content: {},
    },
    attributes: {
      id: 'canvas',
    },
  },
  {
    id: 'root-screen-07',
    name: 'Canvas',
    kind: ENTITY_KINDS.ELEMENT,
    ownership: {
      type: ENTITY_KINDS.SCREEN,
      id: 'screen-07',
    },
    tag: 'div',
    properties: {
      style: {
        width: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
      },
      content: {},
    },
    attributes: {
      id: 'canvas',
    },
  },

  {
    id: 'root-screen-08',
    name: 'Canvas',
    kind: ENTITY_KINDS.ELEMENT,
    ownership: {
      type: ENTITY_KINDS.SCREEN,
      id: 'screen-08',
    },
    tag: 'div',
    properties: {
      style: {
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        flexDirection: 'column',
      },
      content: {},
    },
    attributes: {
      id: 'canvas',
    },
  },

];
