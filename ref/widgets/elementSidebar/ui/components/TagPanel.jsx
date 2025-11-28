/** @jsxImportSource @emotion/react */
import React from 'react';
import { SectionPanel, SectionPanelHeader, SectionPanelName } from '../../../../shared/uiKit/SectionPanel';
import { TagControl } from '../../../../features/uiControls';

export const TagPanel = () => {

  return (
    <SectionPanel dividerBottom>
      <SectionPanelHeader>
        <SectionPanelName>Tag</SectionPanelName>
        <TagControl />
      </SectionPanelHeader>
    </SectionPanel>
  );
};

