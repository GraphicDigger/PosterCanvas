/** @jsxImportSource @emotion/react */
import React from 'react';
import { useTheme } from '@emotion/react';
import { PlusIcon } from '@/shared/assets/icons';
import { EFont } from '@/entities/font';
import { SectionPanel, SectionPanelHeader, SectionPanelBody, SectionPanelName } from '@/shared/uiKit/SectionPanel';

export const MasterFontControl = () => {

  return (
    <SectionPanel dividerBottom>
      <SectionPanelHeader>
        <SectionPanelName>Font</SectionPanelName>
      </SectionPanelHeader>
      <SectionPanelBody>
        <EFont name='Primary' value='16/24' />
        <EFont name='Secondary' value='14/20' />
        <EFont name='Caption' value='12/16' />
        <EFont name='Inter' value='14/20' />
      </SectionPanelBody>
    </SectionPanel>
  );
};

