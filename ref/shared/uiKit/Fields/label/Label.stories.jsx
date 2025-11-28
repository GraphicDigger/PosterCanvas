import React from 'react';
import { Label } from './Label';

export default {
  title: 'uiKit/Label',
  component: Label,
};

const Template = (args) => <Label {...args} />;

export const Default = Template.bind({});
Default.args = {
  text: 'Label Text',
  htmlFor: 'inputId',
};
