import React, { useCallback } from 'react';
import { Stack } from '../../../../shared/uiKit/Stack';
import { Avatar } from '../../../../shared/uiKit/Avatar';
import { Divider } from '../../../../shared/uiKit/Divider';
import { useSpaceMode } from '../../../../entities/mode/spaceMode';
import { useWorkspaces } from '@/entities/workspace';
import { useUserspaces } from '@/entities/userspace';
import { UserspacePicker } from './UserspacePicker';
import { WorkspacePicker } from './WorkspacePicker';


export const SpaceSwitcher = () => {

  const { selectedUserspace } = useUserspaces();
  const { selectedWorkspace } = useWorkspaces();

  const {
    isUserspaceMode,
    isWorkspaceMode,
    setUserspaceMode,
    setWorkspaceMode,
  } = useSpaceMode();

  const handleClick = useCallback(() => {
    if (isWorkspaceMode) {
      setUserspaceMode();
    } else if (isUserspaceMode) {
      setWorkspaceMode();
    }
  }, [isWorkspaceMode, isUserspaceMode, setUserspaceMode, setWorkspaceMode]);


  return (
    <Stack
      justifyContent="space-between"
      direction="row"
      paddingTop={1}
      paddingBottom={1}
      paddingLeft={2}
      paddingRight={4}
      height="max-content"
    >
      {isUserspaceMode && (
        <>
          <UserspacePicker />
          <Avatar size="small" src={selectedWorkspace?.avatar} onClick={handleClick} />
        </>
      )}
      {isWorkspaceMode && (
        <>
          <WorkspacePicker />
          <Avatar size="small" src={selectedUserspace?.avatar} onClick={handleClick} />
        </>
      )}
      <Divider bottom left />
    </Stack>
  );
};

