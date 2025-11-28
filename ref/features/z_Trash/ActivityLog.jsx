import React from 'react';
import { useTheme } from '@emotion/react';
import { ActivityCard } from '../../../../entities/eventActivity';
import { Stack } from '../../../../shared/uiKit/Stack';
import { Scrollbar } from '../../../../shared/uiKit/Scrollbar';
import { Surface } from '../../../../shared/uiKit/Surface';
import { ActivitySidebar } from './filters/ActivitySidebar';
import { useActivityLog } from '../../model/hooks/useActivityLog';


export const ActivityLog = () => {

  const theme = useTheme();
  const { activities } = useActivityLog();

  return (
    <>
      <ActivitySidebar />
      <Scrollbar >
        <Stack justify='center' padding={20}>
          <Stack
            direction='column'
            gap={4}
            justify='center'
            align='flex-start'
            width={500}
          >
            {activities.map((activity) => (
              <ActivityCard
                key={activity.id}
                activity={activity}
                size='small'
                border
              />
            ))}
          </Stack>
          <Surface
            backgroundColor={theme.sys.color.surfaceContainer.default}
            position='fixed'
          />
        </Stack>
      </Scrollbar>
    </>
  );
};
