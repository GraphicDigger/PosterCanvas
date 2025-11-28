import React, { useState } from 'react';
import { MessageInput } from './MessageInput';

export default {
  title: 'uiKit/MessageInput',
  component: MessageInput,
};

const Template = (args) => {
  const [value, setValue] = useState('');

  return (
    <div style={{ width: 300 }}>
      <MessageInput
        {...args}
        value={value}
        onChange={(value) => setValue(value)}
        onSubmit={(text) => {
          console.log('Submitted:', text);
          setValue('');
        }}
        onPaste={(files) => console.log('Pasted files:', files)}
        onPlusClick={() => console.log('Plus clicked')}
        onFileClick={() => console.log('File clicked')}
      />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  placeholder: 'Type your message...',
  buttonsVisible: false,
};

export const WithVisibleButtons = Template.bind({});
WithVisibleButtons.args = {
  placeholder: 'Buttons are always visible',
  buttonsVisible: true,
};

export const DisabledWithButtons = Template.bind({});
DisabledWithButtons.args = {
  placeholder: 'Disabled input (buttons hidden)',
  disabled: true,
  buttonsVisible: true,
};

export const WithMaxHeight = Template.bind({});
WithMaxHeight.args = {
  placeholder: 'Type your message...',
  maxHeight: 100,
  buttonsVisible: false,
};

export const AutoFocus = Template.bind({});
AutoFocus.args = {
  placeholder: 'This input is auto-focused',
  autoFocus: true,
  buttonsVisible: false,
};

