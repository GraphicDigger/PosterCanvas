import { ENTITY_KINDS } from '@/shared/constants';
import { ElementTemplate } from '../types';

export const typographyElements: ElementTemplate[] = [
  {
    type: 'std.h1',
    label: 'Heading 1',
    category: 'typography',
    defaults: {
      tag: 'h1',
      name: 'Heading 1',
      kind: ENTITY_KINDS.ELEMENT,
      properties: {
        style: {
          fontSize: '2em',
          margin: '0.67em 0',
          fontWeight: 'bold'
        },
        content: { text: 'Heading 1' }
      }
    }
  },
  {
    type: 'std.h2',
    label: 'Heading 2',
    category: 'typography',
    defaults: {
      tag: 'h2',
      name: 'Heading 2',
      kind: ENTITY_KINDS.ELEMENT,
      properties: {
        style: {
          fontSize: '1.5em',
          margin: '0.83em 0',
          fontWeight: 'bold'
        },
        content: { text: 'Heading 2' }
      }
    }
  },
  {
    type: 'std.p',
    label: 'Paragraph',
    category: 'typography',
    defaults: {
      tag: 'p',
      name: 'Paragraph',
      kind: ENTITY_KINDS.ELEMENT,
      properties: {
        style: {
          margin: '1em 0'
        },
        content: { text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' }
      }
    }
  },
  {
    type: 'std.span',
    label: 'Text Span',
    category: 'typography',
    defaults: {
      tag: 'span',
      name: 'Span',
      kind: ENTITY_KINDS.ELEMENT,
      properties: {
        style: {},
        content: { text: 'Text Span' }
      }
    }
  }
];

