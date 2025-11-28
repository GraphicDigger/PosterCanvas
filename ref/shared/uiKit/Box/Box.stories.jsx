import React from 'react';
import { ThemeProvider } from '../../../app/providers';
import { Box } from './Box';


const ThemeWrapper = (story) => (
  <ThemeProvider>
    {story()}
  </ThemeProvider>
);

export default {
  title: 'uiKit/Layout/Box',
  component: Box,
  decorators: [ThemeWrapper],
};

const Template = (args) => {
  return (
    <>
      <Box {...args} />
    </>
  );
};

export const Default = Template.bind({});
Default.args = {

};

