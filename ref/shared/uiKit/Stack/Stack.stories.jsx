import React from 'react';
import { Stack } from './Stack';

export default {
  title: 'uiKit/Layout/Stack',
  component: Stack,
};

const Template = (args) => (
  <div style={{ width: '500px', height: '300px', border: '1px solid #ccc' }}>
    <Stack {...args}>
      <div style={{
        background: 'linear-gradient(45deg, #6b6bff, #4ecdc4)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: '18px',
        height: '100%',
      }}>
                Контент на всю доступную область
      </div>
    </Stack>
  </div>
);

export const Default = Template.bind({});
Default.args = {};

