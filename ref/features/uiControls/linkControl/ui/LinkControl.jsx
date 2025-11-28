/** @jsxImportSource @emotion/react */
import React from 'react';
import { SectionPanel, SectionPanelHeader, SectionPanelBody, SectionPanelName } from '@/shared/uiKit/SectionPanel';
import { Field, Label, TextField } from '@/shared/uiKit/Fields';


export const LinkControl = () => {

  return (
    <SectionPanel dividerBottom>
      <SectionPanelHeader>
        <SectionPanelName>Link</SectionPanelName>
      </SectionPanelHeader>
      <SectionPanelBody>
        <Field>
          <Label>Link to</Label>
          <TextField placeholder='Page or URL' width={150} />
        </Field>
      </SectionPanelBody>
    </SectionPanel>
  );
};

