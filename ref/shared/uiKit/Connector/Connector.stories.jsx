import React from 'react';
import { Connector } from './Connector';


export default {
  title: 'uiKit/Connector',
  component: Connector,
};

const Template = (args) => {
  return (
    <>
      <Connector {...args} />
    </>
  );
};

export const Default = Template.bind({});
Default.args = {

};

