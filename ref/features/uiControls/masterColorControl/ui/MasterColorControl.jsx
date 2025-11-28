/** @jsxImportSource @emotion/react */
import React from 'react';
import { SectionPanel, SectionPanelHeader, SectionPanelBody, SectionPanelName } from '@/shared/uiKit/SectionPanel';


export const MasterColorControl = () => {

  return (
    <SectionPanel dividerBottom>
      <SectionPanelHeader>
        <SectionPanelName>Color</SectionPanelName>
      </SectionPanelHeader>
      <SectionPanelBody>
        {/* <EColor name='Primary' value='#00b7ff' />
                <EColor name='Secondary' value='#FFFFFF' />
                <EColor name='Tertiary' value='#6c757d' />
                <EColor name='#FFFFFF' value='#FFFFFF' /> */}
      </SectionPanelBody>
    </SectionPanel>
  );
};

