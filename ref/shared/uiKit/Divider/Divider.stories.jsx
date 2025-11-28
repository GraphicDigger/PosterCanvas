import React from 'react';
import { ThemeProvider } from '../../../app/providers';
import { Divider } from './Divider';


const ThemeWrapper = (story) => (
  <ThemeProvider>
    {story()}
  </ThemeProvider>
);

export default {
  title: 'uiKit/Divider',
  component: Divider,
  decorators: [ThemeWrapper],
};

const Template = (args) => {
  return (
    <div style={{ display: 'flex', width: '100px', height: '100px' }}>
      <Divider {...args} />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  orientation: 'horizontal',
};

