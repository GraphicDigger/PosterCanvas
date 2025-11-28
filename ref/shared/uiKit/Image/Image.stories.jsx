import React from 'react';
import { Image } from './Image';


export default {
  title: 'uiKit/Image',
  component: Image,
};

const Template = (args) => {
  return (
    <>
      <Image {...args} />
    </>
  );
};

export const Default = Template.bind({});
Default.args = {

};

