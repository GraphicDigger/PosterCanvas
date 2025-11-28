/** @jsxImportSource @emotion/react */
import React from 'react';
import { PlusIcon } from '../../../../shared/assets/icons';
import { SectionPanel, SectionPanelHeader, SectionPanelBody, SectionPanelName } from '../../../../shared/uiKit/SectionPanel';
import { ClassControl, AddClassButton } from '../../../../features/uiControls';
import { useElement } from '../../../../entities/uiElement';


export const CssClassPanel = () => {

  const { elementCssClasses } = useElement();

  return (
    <SectionPanel dividerBottom>
      <SectionPanelHeader>
        <SectionPanelName>Class</SectionPanelName>
        <AddClassButton />
      </SectionPanelHeader>
      {elementCssClasses.length > 0 && (
        <SectionPanelBody>
          <ClassControl />
        </SectionPanelBody>
      )}
    </SectionPanel>
  );
};

