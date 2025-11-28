import { ENTITY_KINDS } from '@/shared/constants';

export const eForm = [
  {
    id: 'default-element-01-form',
    name: 'Form',
    kind: ENTITY_KINDS.ELEMENT,
    ownership: null,
    tag: 'form',
    properties: {
      style: {
        width: '500px',
        height: 'max-content',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
      },
    },
  },
  {
    id: 'default-element-01-input-email',
    name: 'InputEmail',
    kind: ENTITY_KINDS.ELEMENT,
    ownership: {
      type: ENTITY_KINDS.ELEMENT,
      id: 'default-element-01-form',
    },
    tag: 'input',
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
        id: 'email',
        type: 'email',
        placeholder: 'Email',
      },
      content: {
        // value: 'Enter your name',
      },
    },
  },
  {
    id: 'default-element-01-input-password',
    name: 'InputPassword',
    kind: ENTITY_KINDS.ELEMENT,
    ownership: {
      type: ENTITY_KINDS.ELEMENT,
      id: 'default-element-01-form',
    },
    tag: 'input',
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
        id: 'password',
        type: 'password',
        placeholder: 'Password',
      },
      content: {
        // value: 'Enter your name',
      },
    },
  },
  {
    id: 'default-element-01-button-login',
    name: 'Button',
    kind: ENTITY_KINDS.ELEMENT,
    ownership: {
      type: ENTITY_KINDS.ELEMENT,
      id: 'default-element-01-form',
    },
    tag: 'button',
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
  },

];
