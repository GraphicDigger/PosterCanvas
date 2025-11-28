// src/component/WindowWrapper/WindowWrapper.stories.jsx
import React from 'react';
import { ThemeProvider } from '../../../app/providers';
import { SlotBar, LeftSlot, RightSlot, CenterSlot } from '../SlotBar';
import { WindowPopover } from './WindowPopover';
import { WindowTrigger } from './WindowTrigger';
import { Window } from './Window';
import { WindowHead } from './WindowHead';
import { WindowBody } from './WindowBody';
import { WindowTitle } from './WindowTitle';
import { ButtonTool } from '../ButtonTool/ButtonTool';

export default {
  title: 'uiKit/Window',
  component: Window,
};

export const Default = () => (
  <>
    <Window>
      <WindowHead />
      <WindowBody />
    </Window>
  </>
);

export const withSlotBar = () => (
  <>
    <Window>
      <WindowHead padding={0}>
        <SlotBar>
          <LeftSlot>
            <WindowTitle>
              Left Slot
            </WindowTitle>
          </LeftSlot>
          <CenterSlot>
            <WindowTitle>
              Center Slot
            </WindowTitle>
          </CenterSlot>
          <RightSlot>
            <WindowTitle>
              Right Slot
            </WindowTitle>
          </RightSlot>
        </SlotBar>
      </WindowHead>
      <WindowBody>
      </WindowBody>
    </Window>
  </>
);

export const withTrigger = () => (
  <WindowPopover placement='left-start'>
    <WindowTrigger>
      <ButtonTool icon='plus' />
    </WindowTrigger>
    <Window>
      <WindowHead />
      <WindowBody />
    </Window>
  </WindowPopover>
);
