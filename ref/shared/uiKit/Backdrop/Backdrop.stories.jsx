import React from 'react';
import styled from '@emotion/styled';
import { ThemeProvider } from '../../../app/providers';
import { Backdrop } from './Backdrop';

const ThemeWrapper = (story) => (
  <ThemeProvider>
    {story()}
  </ThemeProvider>
);

export default {
  title: 'uiKit/Backdrop',
  component: Backdrop,
  decorators: [ThemeWrapper],
};

const Template = (args) => {
  return (
    <StyledContainer>
      <Backdrop {...args} />
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
    width: 400px;
    height: 400px;
    
`;

export const Default = Template.bind({});
Default.args = {

};

