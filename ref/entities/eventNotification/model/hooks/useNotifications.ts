import { useSelector } from 'react-redux';
import {
  selectAllNotifications,
  selectSelectedNotification,
  makeSelectNotificationById,
  makeSelectNotificationsByIds,
  selectAllCompositeNotifications,
} from '../store';

interface Props {
  id?: string;
  ids?: string[];
}

export const useNotifications = ({ id, ids }: Props = {}) => {

  const allNotifications = useSelector(selectAllNotifications);
  const allCompositeNotifications = useSelector(selectAllCompositeNotifications);
  const selectedNotification = useSelector(selectSelectedNotification);
  const notificationById = useSelector(makeSelectNotificationById(id || ''));
  const notificationsByIds = useSelector(makeSelectNotificationsByIds(ids ?? []));

  return {
    allNotifications,
    allCompositeNotifications,
    selectedNotification,
    notificationById,
    notificationsByIds,
  };
};
