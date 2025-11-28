import { useDispatch, useSelector } from 'react-redux';
import {
  setHoveredUserspaceId,
  setFocusedUserspaceId,
  setSelectedUserspaceId,
  selectUserspaceCheckStates,
} from '../store';

export const useUserspaceStates = (UserspaceId) => {
  const dispatch = useDispatch();
  const { isSelected, isFocused, isHovered } = useSelector(state => selectUserspaceCheckStates(state, UserspaceId));

  const handleHover = (id) => {
    dispatch(setHoveredUserspaceId(id));
  };

  const handleFocus = (id) => {
    dispatch(setFocusedUserspaceId(id));
  };

  const handleSelect = (id) => {
    dispatch(setSelectedUserspaceId(id));
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
