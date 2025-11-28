import React, { useCallback } from 'react';
import { Divider } from '@/shared/uiKit/Divider';
import { Stack } from '@/shared/uiKit/Stack';
import { SpaceListItem } from '@/entities/mode/spaceMode';
import { useWSSettingsMode } from '@/entities/mode/spaceMode';
import { SectionPanel, SectionPanelHeader, SectionPanelName, SectionPanelBody } from '@/shared/uiKit/SectionPanel';
import avatarWorkspace from '@/shared/assets/dummy/shifaaz-shamoon-sLAk1guBG90-unsplash.jpg';
import { Avatar } from '@/shared/uiKit/Avatar';
import { List } from '@/shared/uiKit/List';
import { SlotBar, LeftSlot, CenterSlot, RightSlot } from '@/shared/uiKit/SlotBar';
import { PlusIcon, ArrowWithLegLeftIcon } from '@/shared/assets/icons';
import { ButtonTool } from '@/shared/uiKit/ButtonTool';
import { Typography } from '@/shared/uiKit/Typography';
import { useActorRoles, ActorRoleListItem, useActorRoleMutations } from '@/entities/actorRole';
import { Scrollbar } from '@/shared/uiKit/Scrollbar';
import { AddRoleButton } from './components/AddRoleButton';


export const RoleList = () => {

  const {
    isWSSettingsGeneralMode,
    isWSSettingsPositionMode,
    isWSSettingsRolesMode,
    setWSSettingsGeneralMode,
    setWSSettingsPositionMode,
    setWSSettingsRolesMode,
    toggleWSSettingsDetailMode,
  } = useWSSettingsMode();

  const {
    agentsRoles,
    membersRoles,
  } = useActorRoles();

  const { addActorRole } = useActorRoleMutations();

  const handleToggleWSSettingsDetailMode = useCallback(() => {
    toggleWSSettingsDetailMode();
  }, [toggleWSSettingsDetailMode]);

  const handleAddActorRole = useCallback(() => {
    addActorRole();
  }, [addActorRole]);

  return (
    <Stack width={240} align='start'>

      <SlotBar divider>
        <LeftSlot>
          <ButtonTool con onClick={handleToggleWSSettingsDetailMode}>
            <ArrowWithLegLeftIcon />
          </ButtonTool>
        </LeftSlot>
        <CenterSlot>
          <Typography variant='heading.xsmall'>Roles</Typography>
        </CenterSlot>
        <RightSlot>
          <AddRoleButton />
        </RightSlot>
      </SlotBar>
      <Scrollbar>
        <SectionPanel>
          <SectionPanelHeader>
            <SectionPanelName>
              Members
            </SectionPanelName>
          </SectionPanelHeader>
          <SectionPanelBody>
            <List gap={0} size='medium'>
              {membersRoles.map(role => (
                <ActorRoleListItem
                  key={role.id}
                  uiView='listItem'
                  actorRole={role}
                />
              ))}
            </List>
          </SectionPanelBody>
        </SectionPanel>
        <SectionPanel dividerTop>
          <SectionPanelHeader>
            <SectionPanelName>
              Agents
            </SectionPanelName>
          </SectionPanelHeader>
          <SectionPanelBody>
            <List gap={0} size='medium'>
              {agentsRoles.map(role => (
                <ActorRoleListItem
                  key={role.id}
                  uiView='listItem'
                  actorRole={role}
                />
              ))}
            </List>
          </SectionPanelBody>
        </SectionPanel>
      </Scrollbar>
      <Divider orientation='vertical' top right />
    </Stack>
  );
};
