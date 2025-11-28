import React, { useMemo } from 'react';
import { Dialog, DialogTrigger, DialogWindow } from '@/shared/uiKit/Dialog';
import { useWSSettingsMode, SpaceMenuItem } from '@/entities/mode/spaceMode';
import { Stack } from '@/shared/uiKit/Stack';
import { Divider } from '@/shared/uiKit/Divider';
import { Avatar } from '@/shared/uiKit/Avatar';
import { List } from '@/shared/uiKit/List';
import { SlotBar, LeftSlot } from '@/shared/uiKit/SlotBar';
import { Typography } from '@/shared/uiKit/Typography';
import avatarWorkspace from '@/shared/assets/dummy/shifaaz-shamoon-sLAk1guBG90-unsplash.jpg';
import { RoleTable, RoleList, RoleSettings, PositionTable } from '../../../features/settings/memberAndAgentRoleSettings';
import { MemberPositionSettings } from '@/features/settings/memberPositionSettings';


export const WorkspaceSettingsDialog = ({ children }) => {

  const {
    isWSSettingsGeneralMode,
    isWSSettingsPositionMode,
    isWSSettingsRolesMode,
    isWSSettingsDetailMode,
    setWSSettingsGeneralMode,
    setWSSettingsPositionMode,
    setWSSettingsRolesMode,
  } = useWSSettingsMode();

  const sidebar = useMemo(() => (
    <Stack width={240} align='start'>
      <SlotBar divider>
        <LeftSlot padding={1}>
          <Avatar src={avatarWorkspace} />
          <Typography
            variant='heading.xsmall'
            color='primary'
          >
            Workspace Settings
          </Typography>
        </LeftSlot>
      </SlotBar>

      <List padding={3} gap={0} size='medium'>
        <SpaceMenuItem
          onClick={setWSSettingsGeneralMode}
          isSelected={isWSSettingsGeneralMode}
        >
          General
        </SpaceMenuItem>

        <SpaceMenuItem
          onClick={setWSSettingsPositionMode}
          isSelected={isWSSettingsPositionMode}
        >
          Position
        </SpaceMenuItem>

        <SpaceMenuItem
          onClick={setWSSettingsRolesMode}
          isSelected={isWSSettingsRolesMode}
        >
          Roles
        </SpaceMenuItem>
      </List>

      <Divider orientation='vertical' top right />
    </Stack>
  ), [
    isWSSettingsGeneralMode,
    isWSSettingsPositionMode,
    isWSSettingsRolesMode,
    setWSSettingsGeneralMode,
    setWSSettingsPositionMode,
    setWSSettingsRolesMode,
  ]);

  const content = useMemo(() => {
    if (isWSSettingsGeneralMode) {
      return (
        <>
          {sidebar}
          <Stack justify='center' align='center'>
            General
          </Stack>
        </>
      );
    }

    if (isWSSettingsPositionMode) {
      return (
        <>
          {sidebar}
          <MemberPositionSettings />
        </>
      );
    }

    if (isWSSettingsRolesMode) {
      if (isWSSettingsDetailMode) {
        return (
          <>
            <RoleList />
            <RoleSettings />
          </>
        );
      }
      return (
        <>
          {sidebar}
          <RoleTable />
        </>
      );
    }

    return null;
  }, [
    isWSSettingsGeneralMode,
    isWSSettingsPositionMode,
    isWSSettingsRolesMode,
    isWSSettingsDetailMode,
    sidebar,
  ]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogWindow width='50%' height='67%'>
        <Stack direction='row'>
          {content}
        </Stack>
      </DialogWindow>
    </Dialog>
  );
};
