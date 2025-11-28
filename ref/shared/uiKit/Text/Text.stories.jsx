import React, { useState } from 'react';
import { ThemeProvider } from '../../../app/providers';
import { Text } from './Text';

const ThemeWrapper = (story) => (
  <ThemeProvider>
    {story()}
  </ThemeProvider>
);

export default {
  title: 'uiKit/Text',
  component: Text,
  decorators: [ThemeWrapper],
  argTypes: {
    editable: {
      control: 'boolean',
      defaultValue: false,
    },
    singleClickEdit: {
      control: 'boolean',
      defaultValue: false,
    },
    multiline: {
      control: 'boolean',
      defaultValue: false,
    },
    children: {
      control: 'text',
    },
    placeholder: {
      control: 'text',
    },
  },
};

const Template = (args) => {
  const [value, setValue] = useState(args.children);

  const handleChange = (newValue) => {
    setValue(newValue);
    if (args.onChange) {
      args.onChange(newValue);
    }
  };

  return (
    <div style={{ maxWidth: '500px', padding: '20px' }}>
      <Text {...args} onChange={handleChange}>
        {value}
      </Text>
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  children: 'This is a single-line text component. Double-click to edit.',
  editable: true,
  singleClickEdit: false,
  multiline: false,
  placeholder: 'Enter text here...',
};

export const SingleClickEdit = Template.bind({});
SingleClickEdit.args = {
  children: 'Click once to edit this text.',
  editable: true,
  singleClickEdit: true,
  multiline: false,
  placeholder: 'Enter text here...',
};

export const Multiline = Template.bind({});
Multiline.args = {
  children: 'This is a multiline text component.\nIt supports line breaks and can be edited by double-clicking on it.',
  editable: true,
  singleClickEdit: false,
  multiline: true,
  placeholder: 'Enter text here...',
};

export const MultilineSingleClick = Template.bind({});
MultilineSingleClick.args = {
  children: 'This is a multiline text component.\nIt supports line breaks and can be edited with a single click.',
  editable: true,
  singleClickEdit: true,
  multiline: true,
  placeholder: 'Enter text here...',
};

export const ReadOnly = Template.bind({});
ReadOnly.args = {
  children: 'This is a read-only text. It cannot be edited by the user.',
  editable: false,
  multiline: false,
};

export const Empty = Template.bind({});
Empty.args = {
  children: '',
  editable: true,
  multiline: false,
  placeholder: 'This is a placeholder text...',
};

export const LongText = Template.bind({});
LongText.args = {
  children: 'This is a very long text that will be truncated with an ellipsis because it exceeds the available width of the container and is not set to multiline mode.',
  editable: true,
  multiline: false,
};

export const LongTextMultiline = Template.bind({});
LongTextMultiline.args = {
  children: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.

This is a paragraph with multiple lines.
Each line break is preserved in the display.

You can also have empty lines between paragraphs.`,
  editable: true,
  multiline: true,
};

