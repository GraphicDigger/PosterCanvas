import React from 'react';
import { ThemeProvider } from '../../../app/providers';
import { ResizableWrapper } from './ResizableWrapper';


export default {
  title: 'uiKit/ResizableWrapper',
  component: ResizableWrapper,
  argTypes: {
    initialWidth: {
      control: {
        type: 'number',
      },
      description: 'Initial width of the sidebar frame',
    },
    fixedWidth: {
      control: {
        type: 'boolean',
      },
      description: 'Determines if the width is fixed',
    },
  },
};

const Template = (args) => (
  <ResizableWrapper {...args}>
    <div style={{ padding: '20px' }}>
      <p>This is the content inside the sidebar frame.</p>
      <p>You can resize the sidebar by dragging the edges.</p>
    </div>
  </ResizableWrapper>
);

export const Default = Template.bind({});
Default.args = {
  initialWidth: 300,
  fixedWidth: false,
};

export const FixedWidth = Template.bind({});
FixedWidth.args = {
  initialWidth: 400,
  fixedWidth: true,
};
