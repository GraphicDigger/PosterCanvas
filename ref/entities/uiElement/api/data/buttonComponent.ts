import { ENTITY_KINDS } from '@/shared/constants';
import AiIconWhite from '@/shared/assets/icons/AiIconWhite.svg';
import { Element } from '../../types';


export const buttonComponent: Element[] = [

  {
    id: 'element-00-button',
    name: 'Button',
    kind: ENTITY_KINDS.ELEMENT,
    ownership: {
      type: ENTITY_KINDS.COMPONENT,
      id: 'button-component-new',
    },
    tag: 'div',
    properties: {
      style: {
        position: 'relative',
        display: 'flex',
        gap: '16px',
        alignItems: 'center',
        justifyContent: 'center',
        width: 'max-content',
        height: '40px',
        backgroundColor: '#007AFF',
        borderRadius: '8px',
        padding: '0 16px',
        color: '#FFFFFF',
        fontSize: '14px',
        lineHeight: '1',
      },
      content: {
        text: 'Login',
      },
    },
    attributes: {
      id: 'element-00-button',
    },
    events: {
      onClick: 'onClick',
    },
  },

  // Simple ELEMENT
  {
    id: 'element-01-simple',
    name: 'Simple',
    kind: ENTITY_KINDS.ELEMENT,
    ownership: {
      type: ENTITY_KINDS.ELEMENT,
      id: 'element-00-button',
    },
    tag: 'img',
    properties: {
      style: {
        width: '16px',
        height: '16px',
        borderRadius: '50%',
        backgroundColor: '#FFFFFF',
      },
      content: {},
    },
    attributes: {
      id: 'element-01-simple',
    },
    events: {},
  },

  // ICON ELEMENT
  {
    id: 'element-01-icon',
    name: 'Icon',
    kind: ENTITY_KINDS.ELEMENT,
    ownership: {
      type: ENTITY_KINDS.COMPONENT,
      id: 'icon-component',
    },
    tag: 'img',
    properties: {
      style: {
        width: '16px',
        height: '16px',
      },
      content: {
        src: AiIconWhite,
      },
    },
    attributes: {
      id: 'element-01-icon',
    },
    events: {},
  },
];
