import React, { useMemo } from 'react';
import { Stack } from '@/shared/uiKit/Stack';
import { SpacesSidebar } from '@/widgets/spacesSidebar';
import { useSpaceMode, useWorkspaceMode, useUserspaceMode } from '@/entities/mode/spaceMode';
import { FullScreenWrapper } from '@/shared/uiKit/FullScreenWrapper';
import { EventActivity } from '@/widgets/eventActivity';
import { TasksWidget } from '@/widgets/tasksWidget';

export const Dashboard = () => {

  const {
    isWSMembers,
    isWSTeams,
    isWSProjects,
    isWSTasks,
    isWSGoals,
    isWSReports,
    isWSResources,
    isWSSettings,
    isWSActivity,
  } = useWorkspaceMode();

  const {
    isUSProfileMode,
    isUSWorkspacesMode,
  } = useUserspaceMode();

  const {
    isUserspaceMode,
    isWorkspaceMode,
  } = useSpaceMode();

  const content = useMemo(() => {

    if (isWorkspaceMode) {

      if (isWSTasks) {return <TasksWidget />;}

      if (isWSMembers) {return <Stack justify='center'> Members </Stack>;}

      if (isWSTeams) {
        return (

          <Stack justify='center'>
            Teams
          </Stack>

        );
      }
      if (isWSSettings) {
        return (
          <>
            <Stack justify='center'>
              Settings
            </Stack>
          </>
        );
      }
      if (isWSActivity) {
        return <EventActivity />;
      }

    } else if (isUserspaceMode) {

      if (isUSProfileMode) {
        return (
          <>
            <Stack justify='center'>
              Profile
            </Stack>
          </>
        );
      }

      if (isUSWorkspacesMode) {
        return (
          <>
            <Stack justify='center'>
              Workspaces
            </Stack>
          </>
        );
      }

    }

  }, [isWSMembers, isWSTeams, isWSSettings, isWSActivity, isUSProfileMode, isUserspaceMode, isWorkspaceMode, isWSTasks]);

  return (
    <FullScreenWrapper>
      <SpacesSidebar />
      {content}
    </FullScreenWrapper>
  );
};
