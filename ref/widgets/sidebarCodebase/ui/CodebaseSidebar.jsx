/** @jsxImportSource @emotion/react */
import React from 'react';
import { useSelector } from 'react-redux';
import { useTheme } from '../../../app/providers';
import { SectionPanel, SectionPanelHeader, SectionPanelBody } from '../../../shared/uiKit/SectionPanel';
import { ButtonToolGroup, ButtonTool } from '../../../shared/uiKit/ButtonTool';
import { List } from '../../../shared/uiKit/List';
import { SectionPanelName } from '../../../shared/uiKit/SectionPanel';
import { PlusIcon } from '../../../shared/assets/icons';
import { CODE_TYPES } from '../../../entities/code';
import { selectCodesByType } from '../../../entities/code';
import { CodeListItem } from '../../../entities/code';
import { SetAccessToCode } from '../../../features/setAccessToСode';
import { FeatureNavigation } from '../../../features/featureNavigation';

export const CodebaseSidebar = () => {

  const codes = useSelector(state => selectCodesByType(state, CODE_TYPES.CODEBASE));


  return (
    <FeatureNavigation>
      <SectionPanel>
        <SectionPanelHeader>
          <SectionPanelName>Codebase</SectionPanelName>
          <ButtonToolGroup fill={false}>
            <ButtonTool>
              <PlusIcon />
            </ButtonTool>
          </ButtonToolGroup>
        </SectionPanelHeader>
        <SectionPanelBody>
          <List gap={0}>
            {codes.map(code => (
              <CodeListItem
                key={code.id}
                id={code.id}
                name={code.name}
                actionSlot={<SetAccessToCode />}
              />
            ))}
          </List>
        </SectionPanelBody>
      </SectionPanel>
    </FeatureNavigation>
  );
};
