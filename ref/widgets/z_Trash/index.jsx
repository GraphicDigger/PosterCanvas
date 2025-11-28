/** @jsxImportSource @emotion/react */
import React from 'react';
import { Stack } from '@/shared/uiKit/Stack';
import { CommandMenu } from './CommandMenu';
import { ScreenSettingsList } from './ScreenSettingsList';
import { ProjectSettingsList } from './ProjectSettingsList';

export const ProjectSettings = () => {

  return (
    <Stack direction='column' align='flex-start'>
      <CommandMenu />
      <ProjectSettingsList />
      <ScreenSettingsList />
    </Stack>
  );
};
