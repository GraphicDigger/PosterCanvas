import { useDispatch, useSelector } from 'react-redux';
import {
  setHoveredInstanceId,
  setFocusedInstanceId,
  setSelectedInstanceId,
} from '../store/slice';
import { selectInstanceCheckStates } from '../store/selectors';

export const useInstanceStates = (InstanceId) => {
  const dispatch = useDispatch();

  const { isSelected, isFocused, isHovered } = useSelector(state => selectInstanceCheckStates(state, InstanceId));

  const handleHover = (id) => {
    dispatch(setHoveredInstanceId(id));
  };

  const handleFocus = (id) => {
    dispatch(setFocusedInstanceId(id));
  };

  const handleSelect = (id) => {
    dispatch(setSelectedInstanceId(id));
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
