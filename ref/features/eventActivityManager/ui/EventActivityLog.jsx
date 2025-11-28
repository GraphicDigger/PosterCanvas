import { useTheme } from '@emotion/react';
import { Scrollbar } from '@/shared/uiKit/Scrollbar';
import { Stack } from '@/shared/uiKit/Stack';
import { Surface } from '@/shared/uiKit/Surface';
import { ActivityCard } from '@/entities/eventActivity';
import { useActivityManager } from '../model';
import { ACTIVITY_CONFIG } from '../config';
import { ActivityList } from '../../../entities/eventActivity';
import { useNotificationServiceActions } from '@/shared/services/eventNotification';
// import { useActivities } from '@/entities/eventActivity/model/hooks/useActivities';
// import { useNotifications } from '@/entities/eventNotification';

export const EventActivityLog = () => {
  const theme = useTheme();
  const { activities } = useActivityManager();
  const { read } = useNotificationServiceActions();

  console.log('activities', activities);

  return (
    <Scrollbar >
      <Stack justify='center' padding={20}>
        <Stack
          direction='column'
          justify='center'
          align='flex-start'
          width={500}
        >
          <ActivityList size='medium' onRead={read}  />
        </Stack>
        <Surface
          backgroundColor={theme.sys.color.surfaceContainer.default}
          position='fixed'
        />
      </Stack>
    </Scrollbar>
  );
};
