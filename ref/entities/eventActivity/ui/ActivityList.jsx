import { useActivityManager } from '../../../features/eventActivityManager/model';
import { ActivityCard } from '@/entities/eventActivity';
import { ACTIVITY_CONFIG } from '../../../features/eventActivityManager/config';
import { CardList } from '@/shared/uiKit/ItemCard';

export const ActivityList = ({
  size = 'medium',
  compact = false,
  onRead,
}) => {

  const { activities } = useActivityManager();

  return (
    <CardList
      size={size}
      compact={compact}
    >
      {activities.map((activity) => (
        <ActivityCard
          key={activity.id}
          activity={activity}
          config={activity.event?.type ? ACTIVITY_CONFIG[activity.event.type] : null}
          onRead={onRead}
        />
      ))}
    </CardList>
  );
};
