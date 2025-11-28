/** @jsxImportSource @emotion/react */
import React from 'react';
import { SectionPanel, SectionPanelHeader, SectionPanelBody, SectionPanelName } from '../../../../shared/uiKit/SectionPanel';
import { PlusIcon } from '../../../../shared/assets/icons';
import { Field, Label, TextField } from '../../../../shared/uiKit/Fields';
import { AttributeControl, AddAttributeButton } from '../../../../features/uiControls';
import { useElement } from '../../../../entities/uiElement';


export const AttributePanel = () => {

  const { elementAttributes } = useElement();

  return (
    <SectionPanel dividerBottom>
      <SectionPanelHeader>
        <SectionPanelName>HTMLAttribute</SectionPanelName>
        <AddAttributeButton />
      </SectionPanelHeader>
      {elementAttributes.length > 0 && (
        <SectionPanelBody>
          <AttributeControl />
        </SectionPanelBody>
      )}
    </SectionPanel>
  );
};

