import { ELEMENT_TAGS } from '@/entities/uiElement';
import { ENTITY_KINDS } from '@/shared/constants';

export const eButton = {
  id: 'id-01-default-button',
  kind: ENTITY_KINDS.ELEMENT,
  name: 'Button',
  tag: ELEMENT_TAGS.BUTTON,
  ownership: null,
  properties: {
    style: {
      position: 'relative',
      display: 'flex',
      gap: '16px',
      alignItems: 'center',
      justifyContent: 'center',
      width: 'max-content',
      height: '36px',
      backgroundColor: '#007AFF',
      borderRadius: '8px',
      padding: '10px 20px',
      color: '#FFFFFF',
      fontSize: '14px',
    },
    content: {
      text: 'Button',
    },
  },
};
