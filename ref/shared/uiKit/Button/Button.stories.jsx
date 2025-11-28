import React from 'react';
import { Button } from './Button';
import { ThemeProvider } from '../../../app/providers';
import { PlusIcon } from '../../../shared/assets/icons';


export default {
  title: 'uiKit/Button',
  component: Button,
  argTypes: {
    variant: {
      description: 'Variant of the button',
    },
    color: {
      description: 'Color of the button',
    },
    size: {
      description: 'Size of the button',
    },
    disabled: {
      control: 'boolean',
      defaultValue: false,
      description: 'Disabled of the button',
    },
    label: {
      description: 'Label of the button',
    },
    leftIcon: {
      description: 'Left icon of the button',
    },
    rightIcon: {
      description: 'Right icon of the button',
    },
  },
};

const Template = (args) => {
  return (
    <Button {...args}>
      Button
    </Button>
  );
};

export const Primary = Template.bind({});
Primary.args = {
  variant: 'filled',
  color: 'primary',
  size: 'small',
};

export const PrimaryWithIcon = Template.bind({});
PrimaryWithIcon.args = {
  variant: 'filled',
  color: 'primary',
  size: 'small',
  startIcon: <PlusIcon />,
  endIcon: <PlusIcon />,
};

export const Default = Template.bind({});
Default.args = {
  variant: 'filled',
  color: 'default',
  size: 'small',
};

