import { ENTITY_KINDS } from '@/shared/constants';
import { ElementTemplate } from '../types';

export const layoutElements: ElementTemplate[] = [
  {
    type: 'std.div',
    label: 'Div Block',
    category: 'layout',
    defaults: {
      tag: 'div',
      name: 'Div',
      kind: ENTITY_KINDS.ELEMENT,
      properties: {
        style: {
          display: 'block',
          minHeight: '50px',
          padding: '10px',
          border: '1px dashed #ccc'
        },
        content: {}
      }
    }
  },
  {
    type: 'std.section',
    label: 'Section',
    category: 'layout',
    defaults: {
      tag: 'section',
      name: 'Section',
      kind: ENTITY_KINDS.ELEMENT,
      properties: {
        style: {
          display: 'block',
          padding: '20px',
          margin: '10px 0'
        },
        content: {}
      }
    }
  },
  {
    type: 'std.container',
    label: 'Container',
    category: 'layout',
    defaults: {
      tag: 'div',
      name: 'Container',
      kind: ENTITY_KINDS.ELEMENT,
      properties: {
        style: {
          display: 'block',
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 15px'
        },
        content: {}
      },
      attributes: {
        class: 'container'
      }
    }
  },
  {
    type: 'std.flex',
    label: 'Flex Box',
    category: 'layout',
    defaults: {
      tag: 'div',
      name: 'Flex',
      kind: ENTITY_KINDS.ELEMENT,
      properties: {
        style: {
          display: 'flex',
          gap: '10px',
          padding: '10px',
          border: '1px dashed #ccc'
        },
        content: {}
      }
    }
  }
];

