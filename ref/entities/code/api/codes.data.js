import { ENTITY_KINDS } from '../../../shared/constants';
import { CODE_TYPES } from '../model/constants/codeTypes';
import { CODE_LANG } from '../model/constants/codeLang';

export const codes = [
  // Кастомные коды

  {
    id: 'custom-01',
    kind: ENTITY_KINDS.CODE,
    type: CODE_TYPES.CUSTOM,
    name: 'Authentication Utils',
    content: `export const authUtils = {
  isAuthenticated: () => true,
  getUser: () => ({
    id: 'mock-user-id',
    name: 'Mock User',
    email: 'mock@example.com',
    role: 'admin',
  }),


  login: async (username, password) => {
    console.log('Mock login: username/password');
    return { success: true, token: 'mock-token' };
  },
  logout: () => {
    console.log('Mock logout');
  }
};`,
    isLocked: false,
    lang: CODE_LANG.JS,
    filePath: null,
  },
  {
    id: 'custom-02',
    kind: ENTITY_KINDS.CODE,
    type: CODE_TYPES.CUSTOM,
    name: 'Form Validation',
    content: 'const validate = (form) => { /* ... */ }',
    isLocked: false,
    lang: CODE_LANG.JS,
    ownership: {},
    filePath: null,
  },
  {
    id: 'custom-03',
    kind: ENTITY_KINDS.CODE,
    type: CODE_TYPES.CUSTOM,
    name: 'API Client',
    content: 'export const api = { /* ... */ }',
    isLocked: false,
    lang: CODE_LANG.JS,
    ownership: {},
    filePath: null,
  },

  // Коды компонентов
  {
    id: 'button-component-code',
    kind: ENTITY_KINDS.CODE,
    type: CODE_TYPES.COMPONENT,
    name: 'ButtonComponent',
    componentId: 'button-component-new',
    content: `import React from 'react';

  export const ButtonComponent = () => {
    return (
      <button> React Button </button>
    );
  }`,
    isLocked: true,
    lang: CODE_LANG.JSX,
    ownership: {},
    filePath: null,
  },
  {
    id: 'button-component-style',
    kind: ENTITY_KINDS.CODE,
    type: CODE_TYPES.COMPONENT_STYLE,
    name: 'Button Styles',
    content: '.button { /* ... */ }',
    isLocked: true,
    lang: CODE_LANG.CSS,
    ownership: {
      type: ENTITY_KINDS.COMPONENT,
      componentId: 'button-component',
    },
    filePath: null,
  },
  {
    id: 'component-code-01',
    kind: ENTITY_KINDS.CODE,
    type: CODE_TYPES.COMPONENT,
    name: 'Component 01',
    content: 'export const Button = () => { /* ... */ }',
    isLocked: true,
    lang: CODE_LANG.JSX,
    ownership: {
      type: ENTITY_KINDS.COMPONENT,
      componentId: 'component-01',
    },
    filePath: null,
  },
  {
    id: 'component-style-01',
    kind: ENTITY_KINDS.CODE,
    type: CODE_TYPES.COMPONENT,
    name: 'Component 01 Styles',
    content: '.button { /* ... */ }',
    isLocked: true,
    lang: CODE_LANG.CSS,
    ownership: {
      type: ENTITY_KINDS.COMPONENT,
      componentId: 'component-01',
    },
    filePath: null,
  },
  {
    id: 'component-code-02',
    kind: ENTITY_KINDS.CODE,
    type: CODE_TYPES.COMPONENT,
    name: 'Component 02',
    content: 'export const Modal = () => { /* ... */ }',
    isLocked: true,
    lang: CODE_LANG.JSX,
    ownership: {
      type: ENTITY_KINDS.COMPONENT,
      componentId: 'component-02',
    },
    filePath: null,
  },
  {
    id: 'component-style-02',
    kind: ENTITY_KINDS.CODE,
    type: CODE_TYPES.COMPONENT,
    name: 'Component 02 Styles',
    content: '.modal { /* ... */ }',
    isLocked: true,
    lang: CODE_LANG.CSS,
    ownership: {
      type: ENTITY_KINDS.COMPONENT,
      componentId: 'component-02',
    },
    filePath: null,
  },
  {
    id: 'component-code-03',
    kind: ENTITY_KINDS.CODE,
    type: CODE_TYPES.COMPONENT,
    name: 'Form Component',
    content: 'export const Form = () => { /* ... */ }',
    isLocked: true,
    lang: CODE_LANG.JSX,
    ownership: {
      type: ENTITY_KINDS.COMPONENT,
      componentId: 'component-03',
    },
    filePath: null,
  },
  {
    id: 'component-style-03',
    kind: ENTITY_KINDS.CODE,
    type: CODE_TYPES.COMPONENT,
    name: 'Form Styles',
    content: '.form { /* ... */ }',
    isLocked: true,
    lang: CODE_LANG.CSS,
    ownership: {
      type: ENTITY_KINDS.COMPONENT,
      componentId: 'component-03',
    },
    filePath: null,
  },
  {
    id: 'component-code-04',
    kind: ENTITY_KINDS.CODE,
    type: CODE_TYPES.COMPONENT,
    name: 'Header Component',
    content: 'export const Header = () => { /* ... */ }',
    isLocked: true,
    lang: CODE_LANG.JSX,
    ownership: {
      type: ENTITY_KINDS.COMPONENT,
      componentId: 'component-04',
    },
    filePath: null,
  },
  {
    id: 'component-style-04',
    kind: ENTITY_KINDS.CODE,
    type: CODE_TYPES.COMPONENT,
    name: 'Header Styles',
    content: '.header { /* ... */ }',
    isLocked: true,
    lang: CODE_LANG.CSS,
    ownership: {
      type: ENTITY_KINDS.COMPONENT,
      componentId: 'component-04',
    },
    filePath: null,
  },
  {
    id: 'component-code-05',
    kind: ENTITY_KINDS.CODE,
    type: CODE_TYPES.COMPONENT,
    lang: CODE_LANG.JSX,
    name: 'Footer Component',
    content: 'export const Footer = () => { /* ... */ }',
    isLocked: true,
    ownership: {
      type: ENTITY_KINDS.COMPONENT,
      componentId: 'component-05',
    },
    filePath: null,
  },
  {
    id: 'component-style-05',
    kind: ENTITY_KINDS.CODE,
    type: CODE_TYPES.COMPONENT,
    name: 'Footer Styles',
    content: '.footer { /* ... */ }',
    isLocked: true,
    lang: CODE_LANG.CSS,
    ownership: {
      type: ENTITY_KINDS.COMPONENT,
      componentId: 'component-05',
    },
    filePath: null,
  },


  // Коды экранов
  {
    id: 'screen-code-01',
    kind: ENTITY_KINDS.CODE,
    type: CODE_TYPES.SCREEN,
    name: 'Login Screen',
    content: 'export const LoginScreen = () => { /* ... */ }',
    isLocked: true,
    lang: CODE_LANG.JSX,
    ownership: {
      type: ENTITY_KINDS.SCREEN,
      screenId: 'screen-01',
    },
    filePath: null,
  },
  {
    id: 'screen-style-01',
    kind: ENTITY_KINDS.CODE,
    type: CODE_TYPES.SCREEN,
    name: 'Login Screen Styles',
    content: '.login-screen { /* ... */ }',
    isLocked: true,
    lang: CODE_LANG.CSS,
    ownership: {
      type: ENTITY_KINDS.SCREEN,
      screenId: 'screen-01',
    },
    filePath: null,
  },
  {
    id: 'screen-code-02',
    kind: ENTITY_KINDS.CODE,
    type: CODE_TYPES.SCREEN,
    name: 'Dashboard Screen',
    content: 'export const DashboardScreen = () => { /* ... */ }',
    isLocked: true,
    lang: CODE_LANG.JSX,
    ownership: {
      type: ENTITY_KINDS.SCREEN,
      screenId: 'screen-02',
    },
    filePath: null,
  },
  {
    id: 'screen-style-02',
    kind: ENTITY_KINDS.CODE,
    type: CODE_TYPES.SCREEN,
    name: 'Dashboard Screen Styles',
    content: '.dashboard-screen { /* ... */ }',
    isLocked: true,
    lang: CODE_LANG.CSS,
    ownership: {
      type: ENTITY_KINDS.SCREEN,
      screenId: 'screen-02',
    },
    filePath: null,
  },
  {
    id: 'screen-code-03',
    kind: ENTITY_KINDS.CODE,
    type: CODE_TYPES.SCREEN,
    name: 'Profile Screen',
    content: 'export const ProfileScreen = () => { /* ... */ }',
    isLocked: true,
    lang: CODE_LANG.JSX,
    ownership: {
      type: ENTITY_KINDS.SCREEN,
      screenId: 'screen-03',
    },
  },
  {
    id: 'screen-style-03',
    kind: ENTITY_KINDS.CODE,
    type: CODE_TYPES.SCREEN,
    name: 'Profile Screen Styles',
    content: '.profile-screen { /* ... */ }',
    isLocked: true,
    lang: CODE_LANG.CSS,
    ownership: {
      type: ENTITY_KINDS.SCREEN,
      screenId: 'screen-03',
    },
    filePath: null,
  },
  {
    id: 'codebase-code-02',
    kind: ENTITY_KINDS.CODE,
    type: CODE_TYPES.CODEBASE,
    name: 'package.json',
    content: ` {
  "name": "test-vite",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {
    "@eslint/js": "^9.21.0",
    "@types/react": "^19.0.10",
    "@types/react-dom": "^19.0.4",
    "@vitejs/plugin-react": "^4.3.4",
    "eslint": "^9.21.0",
    "eslint-plugin-react-hooks": "^5.1.0",
    "eslint-plugin-react-refresh": "^0.4.19",
    "globals": "^15.15.0",
    "typescript": "~5.7.2",
    "typescript-eslint": "^8.24.1",
    "vite": "^6.2.0"
  }
}
        `,
    isLocked: true,
    lang: CODE_LANG.CSS,
    ownership: {
      type: ENTITY_KINDS.SCREEN,
      screenId: 'screen-03',
    },
    filePath: null,
  },

  {
    id: 'codebase-code-03',
    kind: ENTITY_KINDS.CODE,
    type: CODE_TYPES.CODEBASE,
    name: 'index.html',
    content: ` <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h1>Hello World</h1>
</body>
</html>
        `,
    isLocked: true,
    lang: CODE_LANG.HTML,
    ownership: {
      type: ENTITY_KINDS.SCREEN,
      screenId: 'screen-03',
    },
    filePath: null,
  },
  {
    id: 'codebase-code-04',
    kind: ENTITY_KINDS.CODE,
    type: CODE_TYPES.CODEBASE,
    name: 'eslint.config.js',
    content: 'console.log(\'Hello World\');',
    isLocked: true,
    lang: CODE_LANG.JS,
    ownership: {
      type: ENTITY_KINDS.SCREEN,
      screenId: 'screen-03',
    },
    filePath: null,
  },
  {
    id: 'codebase-code-05',
    kind: ENTITY_KINDS.CODE,
    type: CODE_TYPES.CODEBASE,
    name: 'tsconfig.json',
    content: 'console.log(\'Hello World\');',
    isLocked: true,
    lang: CODE_LANG.JS,
    ownership: {
      type: ENTITY_KINDS.SCREEN,
      screenId: 'screen-03',
    },
    filePath: null,
  },
  {
    id: 'codebase-code-06',
    kind: ENTITY_KINDS.CODE,
    type: CODE_TYPES.CODEBASE,
    name: 'README.md',
    content: 'console.log(\'Hello World\');',
    isLocked: true,
    lang: CODE_LANG.MD,
    ownership: {
      type: ENTITY_KINDS.SCREEN,
      screenId: 'screen-03',
    },
    filePath: null,
  },
  {
    id: 'codebase-code-07',
    kind: ENTITY_KINDS.CODE,
    type: CODE_TYPES.CODEBASE,
    name: 'tsconfig.app.json',
    content: 'console.log(\'Hello World\');',
  },
  {
    id: 'codebase-code-08',
    kind: ENTITY_KINDS.CODE,
    type: CODE_TYPES.CODEBASE,
    name: 'tsconfig.node.json',
    content: 'console.log(\'Hello World\');',
  },
  {
    id: 'codebase-code-09',
    kind: ENTITY_KINDS.CODE,
    type: CODE_TYPES.CODEBASE,
    name: 'vite.config.ts',
    content: 'console.log(\'Hello World\');',
  },
];
