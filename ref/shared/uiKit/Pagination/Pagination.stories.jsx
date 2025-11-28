import React from 'react';
import { Pagination } from './Pagination';


export default {
  title: 'uiKit/Pagination',
  component: Pagination,
};

const Template = (args) => {
  return (
    <>
      <Pagination {...args} />
    </>
  );
};

export const Default = Template.bind({});
Default.args = {

};

