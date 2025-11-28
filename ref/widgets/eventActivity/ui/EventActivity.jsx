import React from 'react';
import { useTheme } from '@emotion/react';
import { useActivities, ActivityCard } from '@/entities/eventActivity';
import { Stack } from '@/shared/uiKit/Stack';
import { MultiEntityManagePanel } from '@/features/multiEntityManagePanel';
import { EventActivitySidebar, EventActivityLog } from '@/features/eventActivityManager';

export const EventActivity = () => {

  const { compositeSelectedActivity: activity } = useActivities();

  return (
    <Stack direction='row'>
      <EventActivitySidebar activity={activity} />
      {activity ?
        <MultiEntityManagePanel
          entityKind={activity.source.entityKind}
          entityId={activity.source.entityId}
          config={{ width: '100%', anchor: 'none' }}
        />
        : <EventActivityLog />
      }
    </Stack>
  );
};

