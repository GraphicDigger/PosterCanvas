import React from 'react';
import { FullScreenWrapper } from './FullScreenWrapper';

export default {
  title: 'uiKit/Layout/FullScreenWrapper',
  component: FullScreenWrapper,
  parameters: {
    layout: 'fullscreen',
  },
};

const Template = (args) => (
  <FullScreenWrapper {...args}>
    <div style={{
      width: '100%',
      height: '100%',
      background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontSize: '24px',
      fontWeight: 'bold',
    }}>
            Полноэкранный контент
    </div>
  </FullScreenWrapper>
);

export const Default = Template.bind({});
Default.args = {};

