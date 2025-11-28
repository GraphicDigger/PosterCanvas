import { ENTITY_KINDS } from '@/shared/constants';
import { ELEMENT_TYPES } from '../../model';
import { Element } from '../../types';

export const textStyle: Element[] = [
  {
    id: 'text-screen-01',
    name: 'text',
    kind: ENTITY_KINDS.ELEMENT,
    type: ELEMENT_TYPES.TEXT,
    ownership: {
      type: ENTITY_KINDS.SCREEN,
      id: 'screen-04',
    },
    tag: 'p',
    properties: {
      style: {
        fontSize: '14px',
        lineHeight: '20px',
        letterSpacing: '0px',
        color: '#000000',
        fontFamily: 'Inter',
        fontWeight: '500',
        textAlign: 'left',
      },
      content: {
        text: 'Your focus determines your reality',
      },
    },
    attributes:
    {
      id: 'id-text-screen-01',
    },
    events: {},
  },
];
