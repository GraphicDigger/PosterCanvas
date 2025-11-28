/** @jsxImportSource @emotion/react */
import React from 'react';
import { SectionPanel, SectionPanelBody, SectionPanelHeader, SectionPanelName } from '../../../../shared/uiKit/SectionPanel';
import { lineColors } from '../../../../../shared/styles';
import { useTheme } from '../../../../app/providers';
import { Divider } from '../../../../shared/uiKit/Divider';
import { List, ListItem, ListItemButton } from '../../../../shared/uiKit/List';
import { useProjectSettingsSwitch } from '../../../../../features/projectSettingsSwitch';
import { Box } from '../../../../shared/uiKit/Box';
import { ViewerTrigger, useViewer } from '@/shared/uiKit/Viewer';
import { PROJECT_SETTINGS } from '@/shared/constants';
import { useSidebarExplorer } from '../../model';

export const ProjectSettingsMenu = () => {

  const { data } = useViewer();
  const { subMode, setSubMode } = useSidebarExplorer();

  const handleSubModeChange = (key) => {
    setSubMode(key);
  };

  return (
    <SectionPanel dividerBottom>
      <SectionPanelHeader>
        <SectionPanelName>Project Settings</SectionPanelName>
        <Box height={14} />
      </SectionPanelHeader>
      <SectionPanelBody>
        <List gap="0">
          {PROJECT_SETTINGS.map(({ key, label }) => (
            <ViewerTrigger key={key} step={1} groupId={`${key}ProjectSettings`}>
              <ListItem>
                <ListItemButton
                  filled={false}
                  isSelected={subMode === key}
                  onClick={() => handleSubModeChange(key)}
                >{label}
                </ListItemButton>
              </ListItem>
            </ViewerTrigger>
          ))}
        </List>
      </SectionPanelBody>
    </SectionPanel>

  );
};
