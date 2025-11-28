import { ENTITY_KINDS } from '@/shared/constants';
import authFormPrew from '@/shared/assets/dummy/widget_auth.webp';

export const wAuthForm = [
  {
    id: 'id-01-widget-auth-form-background',
    name: 'Auth Form ',
    preview: authFormPrew,
    kind: ENTITY_KINDS.ELEMENT,
    ownership: null,
    tag: 'div',
    properties: {
      style: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        backgroundColor: '#f9f9f9',
        justifyContent: 'center',
        alignItems: 'center',
      },
    },
  },
  {
    id: 'id-01-widget-auth-form',
    name: 'Auth Form',
    kind: ENTITY_KINDS.ELEMENT,
    ownership: {
      type: ENTITY_KINDS.ELEMENT,
      id: 'id-01-widget-auth-form-background',
    },
    tag: 'form',
    properties: {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        width: '500px',
        height: 'max-content',
        padding: '40px',
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '16px',
        border: '1px solid #C1C1C1',
        boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  {
    id: 'element-01-input-email',
    name: 'InputEmail',
    kind: ENTITY_KINDS.ELEMENT,
    ownership: {
      type: ENTITY_KINDS.ELEMENT,
      id: 'id-01-widget-auth-form',
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
    id: 'element-01-input-password',
    name: 'InputPassword',
    kind: ENTITY_KINDS.ELEMENT,
    ownership: {
      type: ENTITY_KINDS.ELEMENT,
      id: 'id-01-widget-auth-form',
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
];
