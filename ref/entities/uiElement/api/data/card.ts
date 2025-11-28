import { ENTITY_KINDS } from '@/shared/constants';
import img from '@/shared/assets/dummy/shifaaz-shamoon-sLAk1guBG90-unsplash.jpg';
import { Element } from '../../types';

export const card: Element[] = [

  {
    id: 'card-element-00-container',
    name: 'Container',
    kind: ENTITY_KINDS.ELEMENT,
    ownership: {
      type: ENTITY_KINDS.COMPONENT,
      id: 'component-with-collection-model-field-prop',
    },
    tag: 'div',
    properties: {
      style: {
        width: 'max-content',
        height: 'max-content',
        display: 'flex',
        padding: '10px',
        gap: '16px',
      },
      content: {},
    },
    attributes: {
      id: 'card-element-00-container',
    },
    events: {},
  },

  {
    id: 'card-element-01-card',
    name: 'Card',
    kind: ENTITY_KINDS.ELEMENT,
    ownership: {
      type: ENTITY_KINDS.ELEMENT,
      id: 'card-element-00-container',
    },
    tag: 'div',
    properties: {
      style: {
        width: '300px',
        height: 'max-content',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '16px',
        border: '1px solid #E0E0E0',
        overflow: 'hidden',
      },
      content: {},
    },
    attributes: {
      id: 'card-element-01-card',
    },
    events: {},
  },

  {
    id: 'card-element-01-image',
    name: 'Image',
    kind: ENTITY_KINDS.ELEMENT,
    ownership: {
      type: ENTITY_KINDS.ELEMENT,
      id: 'card-element-01-card',
    },
    tag: 'img',
    properties: {
      style: {
        aspectRatio: '5/4',
        objectFit: 'cover',
      },
      content: {
        src: img,
      },
    },
    attributes: {
      id: 'card-element-01-image',
    },
    events: {},
  },

  {
    id: 'card-element-01-title',
    name: 'Name',
    kind: ENTITY_KINDS.ELEMENT,
    ownership: {
      type: ENTITY_KINDS.ELEMENT,
      id: 'card-element-01-card',
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
      id: 'card-element-01-title',
    },
    events: {},
  },
];
