/** @jsxImportSource @emotion/react */
import React from 'react';
import { SectionPanel, SectionPanelHeader, SectionPanelBody, SectionPanelName } from '@/shared/uiKit/SectionPanel';
import { ComponentPreview } from '@/entities/uiComponent';


export const MasterComponentControl = () => {

  return (
    <SectionPanel dividerBottom>
      <SectionPanelHeader>
        <SectionPanelName>Components</SectionPanelName>
      </SectionPanelHeader>
      <SectionPanelBody>
        <ComponentPreview name='Component 1' />
        <ComponentPreview name='Component 2' />
        <ComponentPreview name='Component 3' />
      </SectionPanelBody>
    </SectionPanel>
  );
};

