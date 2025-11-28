import React, { useEffect } from 'react';
import { List, ListItem, ListItemText, ListItemButton, ListItemStartSlot } from '../../../../shared/uiKit/List';
import { AvatarIcon, SettingsIcon, PlusIcon, ComponentIcon } from '../../../../shared/assets/icons';
import { Divider } from '../../../../shared/uiKit/Divider';
import { lineColors } from '../../../../shared/styles';
import { SectionPanel, SectionPanelHeader, SectionPanelName, SectionPanelBody } from '../../../../shared/uiKit/SectionPanel';
import { ButtonTool } from '../../../../shared/uiKit/ButtonTool';
import { Stack } from '../../../../shared/uiKit/Stack';
import { Text } from '../../../../shared/uiKit/Text';
import { ProjectListItem, useProjects } from '../../../../entities/project';
import { useUserspaceMode } from '../../../../entities/mode/spaceMode';
import { SpaceMenuItem } from '../../../../entities/mode/spaceMode';
import { useMembers } from '../../../../entities/actorMember';
import { useUser } from '../../../../entities/actorUser';

export const UserspaceNav = () => {

  const { allProjects } = useProjects();
  const { compositeSelectedUser } = useUser();
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
            <SpaceMenuItem onClick={setUSProfileMode} isSelected={isUSProfileMode}>
              Profile
            </SpaceMenuItem>
            <SpaceMenuItem onClick={setUSWorkspacesMode} isSelected={isUSWorkspacesMode}>
              Workspaces
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
            {compositeSelectedUser.projects.map((project) => (
              <ProjectListItem key={project.id} project={project} />
            ))}
          </List>
        </SectionPanelBody>
      </SectionPanel>

    </Stack>
  );
};

