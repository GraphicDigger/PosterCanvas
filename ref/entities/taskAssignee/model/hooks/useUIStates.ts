import { useDispatch, useSelector } from 'react-redux';
import {
  setHoveredTaskAssigneeId,
  setFocusedTaskAssigneeId,
  setSelectedTaskAssigneeId,
  selectTaskAssigneeCheckStates,
} from '../store';

export const useUIStates = (taskAssigneeId: string) => {
  const dispatch = useDispatch();

  const {
    isSelected: isTaskAssigneeSelected,
    isFocused: isTaskAssigneeFocused,
    isHovered: isTaskAssigneeHovered,
  } = useSelector(state => selectTaskAssigneeCheckStates(state, taskAssigneeId));

  const handleTaskAssigneeHover = (id: string) => {
    dispatch(setHoveredTaskAssigneeId({ id }));
  };

  const handleTaskAssigneeFocus = (id: string) => {
    dispatch(setFocusedTaskAssigneeId({ id }));
  };

  const handleTaskAssigneeSelect = (id: string) => {
    dispatch(setSelectedTaskAssigneeId({ id }));
  };

  return {
    isTaskAssigneeSelected,
    isTaskAssigneeFocused,
    isTaskAssigneeHovered,
    handleTaskAssigneeHover,
    handleTaskAssigneeFocus,
    handleTaskAssigneeSelect,
  };
};
