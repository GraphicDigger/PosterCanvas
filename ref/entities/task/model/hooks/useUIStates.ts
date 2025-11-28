import { useDispatch, useSelector } from 'react-redux';
import {
  setHoveredTaskId,
  setFocusedTaskId,
  setSelectedTaskId,
  selectTaskCheckStates,
} from '../store';

export const useUIStates = (taskId: string) => {
  const dispatch = useDispatch();

  const {
    isSelected: isTaskSelected,
    isFocused: isTaskFocused,
    isHovered: isTaskHovered,
  } = useSelector(state => selectTaskCheckStates(state, taskId));

  const handleTaskHover = (id: string) => {
    dispatch(setHoveredTaskId({ id }));
  };

  const handleTaskFocus = (id: string) => {
    dispatch(setFocusedTaskId({ id }));
  };

  const handleTaskSelect = (id: string) => {
    dispatch(setSelectedTaskId({ id }));
  };

  return {
    isTaskSelected,
    isTaskFocused,
    isTaskHovered,
    handleTaskHover,
    handleTaskFocus,
    handleTaskSelect,
  };
};
