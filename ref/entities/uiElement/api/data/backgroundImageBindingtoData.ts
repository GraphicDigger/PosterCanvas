import { ENTITY_KINDS } from '@/shared/constants';
import img from '@/shared/assets/dummy/shifaaz-shamoon-sLAk1guBG90-unsplash.jpg';
import { Element } from '../../types';

export const backgroundImageBindingToData: Element[] = [

  {
    id: 'element-02-container',
    name: 'Container',
    kind: ENTITY_KINDS.ELEMENT,
    ownership: {
      type: ENTITY_KINDS.SCREEN,
      id: 'screen-03',
    },
    tag: 'div',
    properties: {
      style: {
        width: '100%',
        height: 'max-content',
        display: 'flex',
        padding: '40px',
        gap: '20px',
      },
      content: {},
    },
    attributes: {
      id: 'element-02-container',
    },
    events: {},
  },

  {
    id: 'element-02-card',
    name: 'Card',
    kind: ENTITY_KINDS.ELEMENT,
    ownership: {
      type: ENTITY_KINDS.ELEMENT,
      id: 'element-02-container',
    },
    tag: 'div',
    properties: {
      style: {
        width: '300px',
        // height: 'max-content',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '16px',
        border: '1px solid #E0E0E0',
        overflow: 'hidden',
      },
      content: {},
    },
    attributes: {
      id: 'element-02-card',
    },
    events: {},
  },

  {
    id: 'element-02-image',
    name: 'Image',
    kind: ENTITY_KINDS.ELEMENT,
    ownership: {
      type: ENTITY_KINDS.ELEMENT,
      id: 'element-02-card',
    },
    tag: 'div',
    properties: {
      style: {
        width: '100%',
        height: '200px',
        objectFit: 'cover',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: `url(${img})`,
      },
      content: {},
    },
    attributes: {
      id: 'element-02-image',
    },
    events: {},
  },

  {
    id: 'element-02-title',
    name: 'Name',
    kind: ENTITY_KINDS.ELEMENT,
    ownership: {
      type: ENTITY_KINDS.ELEMENT,
      id: 'element-02-card',
    },
    tag: 'p',
    properties: {
      style: {
        padding: '16px',
        fontSize: '14px',
        color: '#000000',
        backgroundColor: '#FFFFFF',
      },
      content: {
        text: 'Trust the process ...',
      },
    },
    attributes: {
      id: 'element-02-title',
    },
    events: {},
  },
];
