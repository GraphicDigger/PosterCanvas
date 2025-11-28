import { useDispatch, useSelector } from 'react-redux';
import {
  setHoveredEventId,
  setFocusedEventId,
  setSelectedEventId,
  selectEventCheckStates,
} from '../store';

export const useEventStates = (EventId) => {
  const dispatch = useDispatch();
  const { isSelected, isFocused, isHovered } = useSelector(state => selectEventCheckStates(state, EventId));

  const handleHover = (id) => {
    dispatch(setHoveredEventId(id));
  };

  const handleFocus = (id) => {
    dispatch(setFocusedEventId(id));
  };

  const handleSelect = (id) => {
    dispatch(setSelectedEventId(id));
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
