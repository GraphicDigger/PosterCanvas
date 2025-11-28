import React, { useEffect } from 'react';
import { List, ListItem, ListItemText, ListItemButton, ListItemStartSlot } from '@/shared/uiKit/List';
import { AvatarIcon, SettingsIcon, PlusIcon, ComponentIcon } from '@/shared/assets/icons';
import { SectionPanel, SectionPanelHeader, SectionPanelName, SectionPanelBody } from '@/shared/uiKit/SectionPanel';
import { ButtonTool } from '@/shared/uiKit/ButtonTool';
import { Stack } from '@/shared/uiKit/Stack';
import { ProjectListItem, useProjects } from '@/entities/project';
import { useUserspaceMode } from '@/entities/mode/spaceMode';
import { SpaceMenuItem } from '@/entities/mode/spaceMode/ui/SpaceMenuItem';


export const UserspaceSidebar = () => {

  const { allProjects } = useProjects();
  const {
    setUSProfileMode,
    setUSWorkspacesMode,
    isUSProfileMode,
    isUSWorkspacesMode,
  } = useUserspaceMode();

  return (
    <Stack align='start'>
      <SectionPanel>
        <SectionPanelBody>
          <List gap={0} size='medium'>

            <SpaceMenuItem
              onClick={setUSProfileMode}
              isSelected={isUSProfileMode}
            > Profile
            </SpaceMenuItem>

            <SpaceMenuItem
              onClick={setUSWorkspacesMode}
              isSelected={isUSWorkspacesMode}
            > Workspaces
            </SpaceMenuItem>

          </List>
        </SectionPanelBody>
      </SectionPanel>
      <SectionPanel dividerTop >
        <SectionPanelHeader>
          <SectionPanelName size='medium'>Projects</SectionPanelName>
          <ButtonTool>
            <PlusIcon />
          </ButtonTool>
        </SectionPanelHeader>
        <SectionPanelBody>
          <List uiView='listItem' gap={0} size='medium'>
            {allProjects.map((project) => (
              <ProjectListItem key={project.id} project={project} />
            ))}
          </List>
        </SectionPanelBody>
      </SectionPanel>

    </Stack>
  );
};

