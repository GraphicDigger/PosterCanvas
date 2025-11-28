import { ENTITY_KINDS } from '@/shared/constants';
import headerPrew from '@/shared/assets/dummy/widget_header.png';

export const wHeader = [

  {
    id: 'id-01-widget-header',
    name: 'Header',
    preview: headerPrew,
    kind: ENTITY_KINDS.ELEMENT,
    ownership: null,
    tag: 'header',
    properties: {
      style: {
        display: 'flex',
        flexDirection: 'row',
        gap: '16px',
        width: '100%',
        height: '50px',
        padding: '0px 20px',
        backgroundColor: '#111',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#111',

      },
    },
  },
  {
    id: 'widget-element-01-logo',
    name: 'Logo',
    kind: ENTITY_KINDS.ELEMENT,
    ownership: {
      type: ENTITY_KINDS.ELEMENT,
      id: 'id-01-widget-header',
    },
    tag: 'p',
    properties: {
      style: {
        fontSize: '14px',
        fontWeight: '400',
        lineHeight: '14px',
        color: '#FFF',
      },
      attributes: {},
      content: {
        text: 'Logo',
      },
    },
  },
  {
    id: 'widget-element-01-header-menu-container',
    name: 'container',
    kind: ENTITY_KINDS.ELEMENT,
    ownership: {
      type: ENTITY_KINDS.ELEMENT,
      id: 'id-01-widget-header',
    },
    tag: 'div',
    properties: {
      style: {
        display: 'flex',
        flexDirection: 'row',
        gap: '24px',
        padding: '0px 20px',
        alignItems: 'center',

      },
    },
  },
  {
    id: 'widget-element-01-header-menu-item-1',
    name: 'Teams',
    kind: ENTITY_KINDS.ELEMENT,
    ownership: {
      type: ENTITY_KINDS.ELEMENT,
      id: 'widget-element-01-header-menu-container',
    },
    tag: 'p',
    properties: {
      style: {
        fontSize: '14px',
        lineHeight: '14px',
        fontWeight: '500',
        color: '#FFFFFF',
      },
      attributes: {},
      content: {
        text: 'Teams',
      },
    },
  },
  {
    id: 'widget-element-01-header-menu-item-2',
    name: 'Projects',
    kind: ENTITY_KINDS.ELEMENT,
    ownership: {
      type: ENTITY_KINDS.ELEMENT,
      id: 'widget-element-01-header-menu-container',
    },
    tag: 'p',
    properties: {
      style: {
        fontSize: '14px',
        lineHeight: '14px',
        fontWeight: '500',
        color: '#FFFFFF',
      },
      attributes: {},
      content: {
        text: 'Projects',
      },
    },
  },
  {
    id: 'widget-element-01-header-menu-item-3',
    name: 'Documents',
    kind: ENTITY_KINDS.ELEMENT,
    ownership: {
      type: ENTITY_KINDS.ELEMENT,
      id: 'widget-element-01-header-menu-container',
    },
    tag: 'p',
    properties: {
      style: {
        fontSize: '14px',
        lineHeight: '14px',
        fontWeight: '500',
        color: '#FFFFFF',
      },
      attributes: {},
      content: {
        text: 'Documents',
      },
    },
  },
];
