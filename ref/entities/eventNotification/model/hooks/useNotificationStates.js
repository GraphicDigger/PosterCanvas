import { useDispatch, useSelector } from 'react-redux';
import {
  setHoveredNotificationId,
  setFocusedNotificationId,
  setSelectedNotificationId,
  selectNotificationCheckStates,
} from '../store';

export const useNotificationStates = (notificationId) => {
  const dispatch = useDispatch();
  const { isSelected, isFocused, isHovered } = useSelector(state => selectNotificationCheckStates(state, notificationId));

  const handleHover = (id) => {
    dispatch(setHoveredNotificationId(id));
  };

  const handleFocus = (id) => {
    dispatch(setFocusedNotificationId(id));
  };

  const handleSelect = (id) => {
    dispatch(setSelectedNotificationId(id));
  };

  return {
    isSelected,
    isFocused,
    isHovered,
    handleHover,
    handleFocus,
    handleSelect,
  };
};
