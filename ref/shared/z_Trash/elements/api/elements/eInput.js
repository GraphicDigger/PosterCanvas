import { ELEMENT_TAGS } from '@/entities/uiElement';
import { ENTITY_KINDS } from '@/shared/constants';

export const eInput = {
  id: 'id-01-default-input',
  name: 'Input',
  kind: ENTITY_KINDS.ELEMENT,
  tag: ELEMENT_TAGS.INPUT,
  ownership: null,
  properties: {
    style: {
      fontSize: '14px',
      fontWeight: '400',
      color: '#000000',
      backgroundColor: '#FFFFFF',
      border: '1px solid #E8E8E8',
      borderRadius: '8px',
      padding: '4px 12px',
      paddingBottom: '6px',
      height: '36px',
      width: '100%',
    },
    attributes: {
      type: 'text',
      placeholder: 'Enter your name',
    },
    content: {
      // value: 'Enter your name',
    },
  },
};
