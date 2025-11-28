import { useDispatch, useSelector } from 'react-redux';
import {
  setHoveredActivityId,
  setFocusedActivityId,
  setSelectedActivityId,
  selectActivityCheckStates,
  resetSelectedActivityId,
} from '../store';

export const useActivityStates = (ActivityId) => {
  const dispatch = useDispatch();
  const { isSelected, isFocused, isHovered } = useSelector(state => selectActivityCheckStates(state, ActivityId));

  const handleHover = (id) => {
    dispatch(setHoveredActivityId(id));
  };

  const handleFocus = (id) => {
    dispatch(setFocusedActivityId(id));
  };

  const handleSelect = (id) => {
    dispatch(setSelectedActivityId(id));
  };

  const handleReset = () => {
    dispatch(resetSelectedActivityId());
  };

  return {
    isSelected,
    isFocused,
    isHovered,
    handleHover,
    handleFocus,
    handleSelect,
    handleReset,
  };
};
