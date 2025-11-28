/** @jsxImportSource @emotion/react */
import React from 'react';
import { SectionPanel, SectionPanelHeader, SectionPanelName, SectionPanelBody } from '@/shared/uiKit/SectionPanel';
import {
  PositionControl,
  useChangeProperty,
  POSITION_MODES,
  ChangePositionProperty,
} from '@/features/uiControls';


export const PositionPanel = () => {

  return (
    <SectionPanel dividerBottom>
      <SectionPanelHeader>
        <SectionPanelName>Position</SectionPanelName>
        <ChangePositionProperty />
      </SectionPanelHeader>
      <SectionPanelBody>
        <PositionControl />
      </SectionPanelBody>
    </SectionPanel>
  );
};
