/** @jsxImportSource @emotion/react */
import React from 'react';
import { useTheme } from '@emotion/react';

import { ScreensPreviewIcon, PlusIcon } from '../../../../shared/assets/icons';
import { ButtonToolGroup, ButtonTool } from '../../../../shared/uiKit/ButtonTool';
import { SectionPanel, SectionPanelHeader, SectionPanelBody, SectionPanelName } from '../../../../shared/uiKit/SectionPanel';
import { List } from '../../../../shared/uiKit/List';
import { Divider } from '../../../../shared/uiKit/Divider';
import { ComponentListItem, useComponents } from '../../../../entities/uiComponent';
import { useCodeStates } from '../../../../entities/code';
import { useCodebase } from '../../../codebase';


export const ComponentPanel = ({
  uiComponentImporterSlot,
  setComponentGrid,
}) => {

  const { allComponents } = useComponents();
  const { allCodes } = useCodeStates();

  const onSetComponentGrid = () => {
    setComponentGrid();
  };

  return (
    <SectionPanel dividerBottom>
      <SectionPanelHeader>
        <SectionPanelName>Components</SectionPanelName>
        <ButtonToolGroup fill={false}>
          {/* <ButtonTool onClick={onSetComponentGrid}>
            <ScreensPreviewIcon />
          </ButtonTool> */}
          {uiComponentImporterSlot}
        </ButtonToolGroup>
      </SectionPanelHeader>
      <SectionPanelBody>
        <List gap='0'>
          {allComponents.map(component => (
            <ComponentListItem
              key={component.id}
              component={component}
            />
          ))}
        </List>
      </SectionPanelBody>
    </SectionPanel>
  );
};
