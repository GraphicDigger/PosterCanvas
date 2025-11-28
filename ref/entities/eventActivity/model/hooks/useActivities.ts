import { useSelector } from 'react-redux';
import {
  selectAllActivities,
  selectSelectedActivity,
  makeSelectCompositeActivityById,
  selectSelectedActivityId,
  selectAllCompositeActivities,
  makeSelectActivityById,
  makeSelectActivitiesByIds,
} from '../store';

interface Props {
    id?: string;
    ids?: string[];
}

export const useActivities = ({ id, ids }: Props = {}) => {

  const allActivities = useSelector(selectAllActivities);
  const selectedActivity = useSelector(selectSelectedActivity);
  const activityIsSelected = useSelector(selectSelectedActivityId);
  const allCompositeActivities = useSelector(selectAllCompositeActivities);

  // Всегда вызываем хуки, но возвращаем undefined если параметры не переданы
  const compositeActivityById = useSelector(makeSelectCompositeActivityById(id || ''));
  const compositeSelectedActivity = useSelector(makeSelectCompositeActivityById(selectedActivity?.id || ''));
  const activityById = useSelector(makeSelectActivityById(id || ''));
  const activitiesByIds = useSelector(makeSelectActivitiesByIds(ids ?? []));

  return {
    allActivities,
    selectedActivity,
    activityIsSelected,
    allCompositeActivities,

    // Возвращаем undefined если параметры не переданы
    compositeActivityById: id ? compositeActivityById : undefined,
    compositeSelectedActivity: selectedActivity ? compositeSelectedActivity : undefined,
    activityById: id ? activityById : undefined,
    activitiesByIds: ids ? activitiesByIds : undefined,
  };
};
