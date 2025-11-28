import React from 'react';
import { ButtonIcon } from './ButtonIcon';
import { ThemeProvider } from '../../../app/providers';

const ThemeWrapper = (story) => (
  <ThemeProvider>
    {story()}
  </ThemeProvider>
);

export default {
  title: 'uiKit/ButtonIcon',
  component: ButtonIcon,
  decorators: [ThemeWrapper],
  argTypes: {
    variant: { description: 'Variant of the button icon' },
    color: { description: 'Color of the button icon' },
    size: { description: 'Size of the button icon' },
    disable: { description: 'Disable of the button icon' },
    iconName: { description: 'Icon name of the button icon' },
    isFocused: { description: 'Focused of the button icon' },
    lite: { description: 'Lite of the button icon' },
  },
};

const Template = (args) => <ButtonIcon {...args} />;

export const Default = Template.bind({});
Default.args = {
  variant: 'blank',
  color: 'default',
  size: 'small',
  disable: false,
  iconName: 'plus_xs',
  focused: false,
  lite: false,
};
