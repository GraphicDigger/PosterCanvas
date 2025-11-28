/** @jsxImportSource @emotion/react */
import React from 'react';
import { SectionPanel, SectionPanelHeader, SectionPanelBody, SectionPanelName } from '../../../../shared/uiKit/SectionPanel';
import { ScreenList } from '../../../../entities/uiScreen';
import { AddScreenButton } from '../../../../features/uiControls/screenControl';
import { useScreens } from '../../../../entities/uiScreen';
import { ButtonTool, ButtonToolGroup } from '../../../../shared/uiKit/ButtonTool';
import { ScreensPreviewIcon } from '../../../../shared/assets/icons';
import { OpenCodeButton } from '../../../../features/uiControls/screenControl';

export const ScreenPanel = () => {

  return (
    <SectionPanel dividerBottom>
      <SectionPanelHeader>
        <SectionPanelName>Screens</SectionPanelName>
        <ButtonToolGroup fill={false}>
          {/* <ButtonTool>
            <ScreensPreviewIcon />
          </ButtonTool> */}
          <AddScreenButton />
        </ButtonToolGroup>
      </SectionPanelHeader>
      <SectionPanelBody>
        <ScreenList endSlot={(props) => <OpenCodeButton {...props} />} />
      </SectionPanelBody>
    </SectionPanel>
  );
};
