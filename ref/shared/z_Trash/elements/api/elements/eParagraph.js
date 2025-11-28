import { ELEMENT_TAGS } from '@/entities/uiElement';
import { ENTITY_KINDS } from '@/shared/constants';

export const eParagraph = {
  id: 'id-01-default-paragraph',
  name: 'Text',
  kind: ENTITY_KINDS.ELEMENT,
  tag: ELEMENT_TAGS.PARAGRAPH,
  ownership: null,
  properties: {
    style: {
      fontSize: '14px',
      color: '#000',
    },
    content: {
      text: 'Text',
    },
  },
};
