import React from 'react';
import { ThemeProvider } from '../../../app/providers';
import { DoorLockIcon } from '../../../shared/assets/icons';
import { SetAccessToCode } from './SetAccessToСode';

const ThemeWrapper = (story) => (
  <ThemeProvider>
    {story()}
  </ThemeProvider>
);

export default {
  title: 'Features/SetAccessToCode',
  component: SetAccessToCode,
  decorators: [ThemeWrapper],

};

// Базовый пример
export const Default = () => <SetAccessToCode />;
