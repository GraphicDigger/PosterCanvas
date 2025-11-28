import { ENTITY_KINDS } from '@/shared/constants';
import { ElementTemplate } from '../types';

export const formElements: ElementTemplate[] = [
  {
    type: 'std.button',
    label: 'Button',
    category: 'forms',
    defaults: {
      tag: 'button',
      name: 'Button',
      kind: ENTITY_KINDS.ELEMENT,
      properties: {
        style: {
          padding: '8px 16px',
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        },
        content: { text: 'Click me' }
      }
    }
  },
  {
    type: 'std.input',
    label: 'Input Field',
    category: 'forms',
    defaults: {
      tag: 'input',
      name: 'Input',
      kind: ENTITY_KINDS.ELEMENT,
      properties: {
        style: {
          padding: '8px',
          border: '1px solid #ccc',
          borderRadius: '4px'
        },
        content: {}
      },
      attributes: {
        type: 'text',
        placeholder: 'Enter text...'
      }
    }
  },
  {
    type: 'std.label',
    label: 'Label',
    category: 'forms',
    defaults: {
      tag: 'label',
      name: 'Label',
      kind: ENTITY_KINDS.ELEMENT,
      properties: {
        style: {
          display: 'block',
          marginBottom: '5px',
          fontWeight: 'bold'
        },
        content: { text: 'Label Text' }
      }
    }
  },
  {
    type: 'std.form-group', // Комбинированный элемент
    label: 'Form Group',
    category: 'forms',
    defaults: {
      tag: 'div',
      name: 'Form Group',
      kind: ENTITY_KINDS.ELEMENT,
      properties: {
        style: {
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          padding: '10px',
          border: '1px dashed #ccc'
        },
        content: {}
      },
      children: [
        {
          tag: 'label',
          name: 'Label',
          kind: ENTITY_KINDS.ELEMENT,
          properties: {
            style: { fontWeight: 'bold' },
            content: { text: 'Email' }
          }
        },
        {
          tag: 'input',
          name: 'Input',
          kind: ENTITY_KINDS.ELEMENT,
          properties: {
            style: { padding: '8px', border: '1px solid #ddd', borderRadius: '4px' },
            content: {}
          },
          attributes: { type: 'email', placeholder: 'example@mail.com' }
        },
        {
          tag: 'button',
          name: 'Submit',
          kind: ENTITY_KINDS.ELEMENT,
          properties: {
            style: { 
              padding: '8px 16px', 
              backgroundColor: '#007bff', 
              color: 'white', 
              border: 'none', 
              borderRadius: '4px',
              marginTop: '8px'
            },
            content: { text: 'Send' }
          }
        }
      ]
    }
  }
];
