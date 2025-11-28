import React from 'react';
import { ThemeProvider } from '../../../app/providers';
import { SlotBar } from './SlotBar';
import { LeftSlot } from './LeftSlot';
import { RightSlot } from './RightSlot';
import { CenterSlot } from './CenterSlot';
import { Text } from '../Text';


const ThemeWrapper = (story) => (
  <ThemeProvider>
    {story()}
  </ThemeProvider>
);

export default {
  title: 'uiKit/SlotBar',
  component: SlotBar,
  decorators: [ThemeWrapper],
};

const Template = (args) => {
  return (
    <>
      <SlotBar {...args} />
    </>
  );
};

export const Default = Template.bind({});
Default.args = {

};

export const WithSlots = () => {
  return (
    <div style={{ width: '500px', height: '100%' }}>
      <SlotBar divider={false}>
        <LeftSlot>
          <Text>
                        Left Slot
          </Text>
        </LeftSlot>
        <CenterSlot>
                    Center Slot
        </CenterSlot>
        <RightSlot>
                    Right Slot
        </RightSlot>
      </SlotBar>
    </div>
  );
};

export const WithCenterAndRightSlots = () => {
  return (
    <div style={{ width: '500px', height: '100%' }}>
      <SlotBar divider={false}>
        <CenterSlot>
                    Center Slot
        </CenterSlot>
        <RightSlot>
                    Right Slot
        </RightSlot>
      </SlotBar>
    </div>
  );
};

