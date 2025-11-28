import React from 'react';
import { ThemeProvider } from '../../../app/providers';
import { Tabs } from './Tabs';
import { Tab } from './Tab';

const ThemeWrapper = (story) => (
  <ThemeProvider>
    {story()}
  </ThemeProvider>
);

export default {
  title: 'uiKit/Tabs',
  component: Tabs,
  decorators: [ThemeWrapper],
  argTypes: {
    variant: {
      control: 'select',
      options: ['underlined', 'filled'],
    },
    direction: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
    gap: {
      control: 'text',
    },
    defaultSelected: {
      control: 'number',
    },
  },
};

const Template = (args) => (
  <Tabs {...args}>
    <Tab label="Tab 1" />
    <Tab label="Tab 2" />
    <Tab label="Tab 3" />
  </Tabs>
);

export const UnderlinedHorizontal = Template.bind({});
UnderlinedHorizontal.args = {
  variant: 'underlined',
  direction: 'horizontal',
  gap: '8px',
  defaultSelected: 0,
  onChange: (index) => console.log(`Selected tab: ${index}`),
};

export const FilledHorizontal = Template.bind({});
FilledHorizontal.args = {
  variant: 'filled',
  direction: 'horizontal',
  gap: '8px',
  defaultSelected: 0,
};

