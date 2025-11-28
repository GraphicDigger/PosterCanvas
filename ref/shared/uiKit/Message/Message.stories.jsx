import React from 'react';
import { Message } from './Message';


export default {
  title: 'uiKit/Message',
  component: Message,
};

const Template = (args) => {
  return (
    <>
      <Message {...args} />
    </>
  );
};

export const Default = Template.bind({});
Default.args = {

};

export const Filled = () => (
  <Message fill>

        This is a filled message

  </Message>
);

