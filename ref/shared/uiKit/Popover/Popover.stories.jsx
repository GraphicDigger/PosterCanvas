import React from 'react';
import { Popover } from './Popover';


export default {
  title: 'uiKit/Utils/Popover',
  component: Popover,
};

const Template = (args) => {
  return (
    <>
      <Popover {...args} />
    </>
  );
};

export const Default = Template.bind({});
Default.args = {

};

