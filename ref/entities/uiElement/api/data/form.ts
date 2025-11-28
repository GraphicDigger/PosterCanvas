import { ENTITY_KINDS } from '@/shared/constants';
import { Element } from '../../types';

export const form: Element[] = [

  {
    id: 'element-01-form',
    name: 'Form',
    kind: ENTITY_KINDS.ELEMENT,
    ownership: {
      type: ENTITY_KINDS.ELEMENT,
      id: 'root-screen-01',
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
      content: {
        // value: 'Enter your name',
      },
    },
    attributes: {
      id: 'element-01-form',
    },
  },
  {
    id: 'element-01-input-email',
    name: 'InputEmail',
    kind: ENTITY_KINDS.ELEMENT,
    ownership: {
      type: ENTITY_KINDS.ELEMENT,
      id: 'element-01-form',
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
        height: '36px',
        width: '100%',
      },
      content: {
        // value: 'Enter your name',
      },
    },
    attributes: {
      id: 'element-01-input-email',
      type: 'email',
      placeholder: 'Email',
    },
  },
  {
    id: 'element-01-input-password',
    name: 'InputPassword',
    kind: ENTITY_KINDS.ELEMENT,
    ownership: {
      type: ENTITY_KINDS.ELEMENT,
      id: 'element-01-form',
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
        height: '36px',
        width: '100%',
      },
      content: {
        // value: 'Enter your name',
      },
    },
    attributes: {
      id: 'element-01-input-password',
      type: 'password',
      placeholder: 'Password',
    },
  },
];
