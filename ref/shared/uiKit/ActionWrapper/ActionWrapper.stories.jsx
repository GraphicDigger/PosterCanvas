import React from 'react';
import { ThemeProvider } from '../../../app/providers';
import { ActionWrapper } from './ActionWrapper';
import { PlusIcon } from '../../../shared/assets/icons';

const ThemeWrapper = (story) => (
  <ThemeProvider>
    {story()}
  </ThemeProvider>
);

export default {
  title: 'uiKit/ActionWrapper',
  component: ActionWrapper,
  decorators: [ThemeWrapper],
  argTypes: {
    beforeButtonIcon: { control: 'text', description: 'Icon name for the button before the content' },
    afterButtonIcon: { control: 'text', description: 'Icon name for the button after the content' },
  },
};

const Template = (args) => (
  <ActionWrapper {...args}>
    <div style={{ padding: '8px', backgroundColor: '#f0f0f0' }}>
            Content goes here
    </div>
  </ActionWrapper>
);

export const Default = Template.bind({});
Default.args = {
  beforeButtonIcon: <PlusIcon/>,
  afterButtonIcon: <PlusIcon/>,
};

// export const WithoutIcons = Template.bind({});
// WithoutIcons.args = {
//     beforeButtonIcon: '',
//     afterButtonIcon: '',
// };

// export const OnlyBeforeIcon = Template.bind({});
// OnlyBeforeIcon.args = {
//     beforeButtonIcon: 'arrowLeft',
//     afterButtonIcon: '',
// };

// export const OnlyAfterIcon = Template.bind({});
// OnlyAfterIcon.args = {
//     beforeButtonIcon: '',
//     afterButtonIcon: 'arrowRight',
// };
