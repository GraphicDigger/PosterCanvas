import React from 'react';
import { ThemeProvider } from '../../../app/providers';
import { FeatureNavigation } from '../../../features/featureNavigation';
import { useGlobalModes } from '../../../entities/mode/editorMode';
import { useSidebarExplorer } from '../model';
import { SIDEBAR_CONTENT } from '../model';
import { GlobalSearch } from './globalSearch';
import { UIExplorer } from './uiExplorer';
import { useElement } from '../../../entities/uiElement';
import { useInstances } from '../../../entities/uiInstance';
import { ProjectSettings } from './projectSettings';
import { Stack } from '@/shared/uiKit/Stack';
import { CommandMenu } from './projectSettings/CommandMenu';
import { ProjectSettingsMenu } from './projectSettings/ProjectSettingsMenu';
import { ScreenList } from './projectSettings/ScreenList';
import { TestNotificationButton } from '@/features/eventNotificationManager';
import { useActivities } from '@/entities/eventActivity/model/hooks/useActivities';
import { useEvents } from '@/entities/event/model/hooks/useEvents';
import { useNotifications } from '@/entities/eventNotification';


export const ProjectExplorerSidebar = () => {

  const { mode } = useSidebarExplorer();
  const { isCodebaseModeGlobal } = useGlobalModes();

  const { allCompositeActivities } = useActivities();
  // const { allEvents } = useEvents();
  const { allCompositeNotifications } = useNotifications();
  // console.log('lastEvent', JSON.stringify(allEvents[allEvents.length - 1].id, null, 2));
  // console.log('allActivities',  allCompositeActivities);
  // console.log('🔥 [ProjectExplorerSidebar] allNotifications', allCompositeNotifications);


  return (
    <ThemeProvider forceDark={isCodebaseModeGlobal}>
      <FeatureNavigation data-testid="main-sidebar">
        {/* <TestNotificationButton/> */}

        {mode === SIDEBAR_CONTENT.MAIN &&
          <UIExplorer />
        }

        {mode === SIDEBAR_CONTENT.SETTINGS &&
          <>
            <CommandMenu />
            <ProjectSettingsMenu />
            <ScreenList />
          </>
        }

        {mode === SIDEBAR_CONTENT.GLOBAL_SEARCH &&
          <GlobalSearch />
        }

      </FeatureNavigation>
    </ThemeProvider>

  );
};
