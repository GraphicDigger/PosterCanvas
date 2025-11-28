import { ELEMENT_TAGS } from '@/entities/uiElement';
import { ENTITY_KINDS } from '@/shared/constants';

export const eDiv = {
  id: 'id-01-default-div',
  kind: ENTITY_KINDS.ELEMENT,
  name: 'Box',
  tag: ELEMENT_TAGS.DIV,
  ownership: null,
  properties: {
    style: {
      width: '100px',
      height: '100px',
      backgroundColor: '#D9D9D9',
      color: '#000',
    },
    content: {
      text: '',
    },
  },
};
