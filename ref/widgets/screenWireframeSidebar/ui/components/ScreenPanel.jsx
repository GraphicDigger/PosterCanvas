/** @jsxImportSource @emotion/react */
import React from 'react';
import { SectionPanel, SectionPanelHeader, SectionPanelBody, SectionPanelName } from '../../../../shared/uiKit/SectionPanel';
import { ScreenList } from '../../../../entities/uiScreen';
import { AddScreenButton } from '../../../../features/uiControls/screenControl';
import { useWireframeSidebar } from '../../model';
import { EntityContextConnectorOpenButton } from '../../../../features/entityContextConnector';

export const ScreenPanel = () => {

  const { handleDeselectWireframeBlock, resetBlockDetailMode } = useWireframeSidebar();

  const handleClick = () => {
    handleDeselectWireframeBlock();
    resetBlockDetailMode();
  };

  return (
    <SectionPanel dividerBottom>
      <SectionPanelHeader>
        <SectionPanelName>Screens</SectionPanelName>
        <AddScreenButton />
      </SectionPanelHeader>
      <SectionPanelBody>
        <ScreenList
          endSlot={EntityContextConnectorOpenButton}
          onClick={handleClick}
        />
      </SectionPanelBody>
    </SectionPanel>
  );
};
