import React, { useEffect } from 'react';
import { List, ListItem, ListItemText, ListItemButton, ListItemStartSlot } from '@/shared/uiKit/List';
import { AvatarIcon, SettingsIcon, PlusIcon, ComponentIcon } from '@/shared/assets/icons';
import { Divider } from '@/shared/uiKit/Divider';
import { lineColors } from '@/shared/styles';
import { SectionPanel, SectionPanelHeader, SectionPanelName, SectionPanelBody } from '@/shared/uiKit/SectionPanel';
import { ButtonTool } from '@/shared/uiKit/ButtonTool';
import { Stack } from '@/shared/uiKit/Stack';
import { Text } from '@/shared/uiKit/Text';
import { ProjectListItem, useProjects } from '@/entities/project';
import { useWorkspaceMode, SpaceMenuItem } from '@/entities/mode/spaceMode';
import { WorkspaceSettings } from '@/widgets/workspaceSettings';


export const WorkspaceSidebar = () => {

  const { allProjects } = useProjects();
  const {
    setWSMembers,
    setWSProjects,
    setWSTasks,
    setWSGoals,
    setWSTeams,
    setWSReports,
    setWSResources,
    setWSSettings,
    setWSActivity,
    isWSMembers,
    isWSProjects,
    isWSTasks,
    isWSGoals,
    isWSTeams,
    isWSReports,
    isWSResources,
    isWSSettings,
    isWSActivity,
  } = useWorkspaceMode();

  return (
    <Stack align='start'>
      <SectionPanel>
        <SectionPanelBody>
          <List gap={0} size='medium'>
            <SpaceMenuItem onClick={setWSMembers} isSelected={isWSMembers}>
              Members
            </SpaceMenuItem>
            <SpaceMenuItem onClick={setWSTeams} isSelected={isWSTeams}>
              Teams
            </SpaceMenuItem>
            <WorkspaceSettings />
            <SpaceMenuItem onClick={setWSActivity} isSelected={isWSActivity}>
              Activity
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

