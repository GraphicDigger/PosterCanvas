import React from 'react';
import { Divider } from '@/shared/uiKit/Divider';
import { Stack } from '@/shared/uiKit/Stack';
import { SpaceMenuItem } from '@/entities/mode/spaceMode';
import { useWSSettingsMode } from '@/entities/mode/spaceMode';
import avatarWorkspace from '@/shared/assets/dummy/shifaaz-shamoon-sLAk1guBG90-unsplash.jpg';
import { Avatar } from '@/shared/uiKit/Avatar';
import { List } from '@/shared/uiKit/List';
import { SlotBar, LeftSlot } from '@/shared/uiKit/SlotBar';
import { Typography } from '@/shared/uiKit/Typography';

export const SettingsMenu = () => {

  const {
    isWSSettingsGeneralMode,
    isWSSettingsPositionMode,
    isWSSettingsRolesMode,
    setWSSettingsGeneralMode,
    setWSSettingsPositionMode,
    setWSSettingsRolesMode,
  } = useWSSettingsMode();

  return (
    <Stack width={240} align='start'>

      <SlotBar divider>
        <LeftSlot padding={1}>
          <Avatar src={avatarWorkspace} />
          <Typography
            variant='heading.xsmall'
            color='primary'
          > Workspace Settings
          </Typography>
        </LeftSlot>
      </SlotBar>

      <List padding={3} gap={0} size='medium'>

        <SpaceMenuItem
          onClick={setWSSettingsGeneralMode}
          isSelected={isWSSettingsGeneralMode}
        >General
        </SpaceMenuItem>

        <SpaceMenuItem
          onClick={setWSSettingsPositionMode}
          isSelected={isWSSettingsPositionMode}
        >Position
        </SpaceMenuItem>

        <SpaceMenuItem
          onClick={setWSSettingsRolesMode}
          isSelected={isWSSettingsRolesMode}
        >Roles
        </SpaceMenuItem>

      </List>

      <Divider orientation='vertical' top right />
    </Stack>
  );
};
