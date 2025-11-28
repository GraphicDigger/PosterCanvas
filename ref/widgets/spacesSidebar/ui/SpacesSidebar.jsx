import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useTheme } from '@emotion/react';

import { ResizableWrapper } from '@/shared/uiKit/ResizableWrapper';
import { Surface } from '@/shared/uiKit/Surface';
import { useSpaceMode } from '@/entities/mode/spaceMode';
import { Avatar } from '@/shared/uiKit/Avatar';
import { Divider } from '@/shared/uiKit/Divider';
import { Stack } from '@/shared/uiKit/Stack';
import { WorkspaceNav } from './components/WorkspaceNav';
import { UserspaceNav } from './components/UserspaceNav';
import { UserspacePicker } from './components/UserspacePicker';
import { WorkspacePicker } from './components/WorkspacePicker';
import { selectCurrentWorkspace, selectCurrentUser } from '@/app/sessions/auth';


export const SpacesSidebar = ({ children }) => {
  const theme = useTheme();
  const {
    isUserspaceMode,
    isWorkspaceMode,
    setUserspaceMode,
    setWorkspaceMode,
  } = useSpaceMode();

  const selectedWorkspace = useSelector(selectCurrentWorkspace);
  const currentUser = useSelector(selectCurrentUser);

  // console.log('[SpacesSidebar] selectedWorkspace', selectedWorkspace);
  // console.log('[SpacesSidebar] currentUser', currentUser);

  const toggleMode = useCallback(() => {
    if (isUserspaceMode) {
      setWorkspaceMode();
    } else {
      setUserspaceMode();
    }
  }, [isUserspaceMode, setWorkspaceMode, setUserspaceMode]);

  return (
    <ResizableWrapper >
      <Surface>
        <Stack
          justifyContent="space-between"
          direction="row"
          paddingTop={1}
          paddingBottom={1}
          paddingLeft={2}
          paddingRight={4}
          height="max-content"
        >

          {isUserspaceMode
            ? <UserspacePicker />
            : <WorkspacePicker />
          }

          <Avatar
            size="small"
            src={isUserspaceMode ? selectedWorkspace?.avatar : currentUser?.avatar}
            onClick={toggleMode}
          />

          <Divider orientation='horizontal' bottom left zIndex={theme.ref.zIndex.layers.baseUI} />
        </Stack>

        {isWorkspaceMode && <WorkspaceNav />}
        {isUserspaceMode && <UserspaceNav />}

        <Divider orientation='vertical' top right zIndex={theme.ref.zIndex.layers.baseUI} />
      </Surface>
    </ResizableWrapper>

  );
};
