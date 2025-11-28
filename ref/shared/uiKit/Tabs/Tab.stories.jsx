import React from 'react';
import { ThemeProvider } from '../../../app/providers';
import { Tab } from './Tab';


const ThemeWrapper = (story) => (
  <ThemeProvider>
    {story()}
  </ThemeProvider>
);

export default {
  title: 'uiKit/Tab',
  component: Tab,
  decorators: [ThemeWrapper],
};

export const SingleTab = {
  args: {
    label: 'Tab Label',
    variant: 'underlined',
    selected: false,
  },
};
