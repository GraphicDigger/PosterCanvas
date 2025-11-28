import { useDispatch, useSelector } from 'react-redux';
import {
  setHoveredUserId,
  setFocusedUserId,
  setSelectedUserId,
  selectUserCheckStates,
} from '../store';

export const useUIStates = (userId: string) => {
  const dispatch = useDispatch();

  const {
    isSelected: isUserSelected,
    isFocused: isUserFocused,
    isHovered: isUserHovered,
  } = useSelector(state => selectUserCheckStates(state, userId));

  const handleUserHover = (id: string) => {
    dispatch(setHoveredUserId({ id }));
  };

  const handleUserFocus = (id: string) => {
    dispatch(setFocusedUserId({ id }));
  };

  const handleUserSelect = (id: string) => {
    dispatch(setSelectedUserId({ id }));
  };

  return {
    isUserSelected,
    isUserFocused,
    isUserHovered,
    handleUserHover,
    handleUserFocus,
    handleUserSelect,
  };
};
