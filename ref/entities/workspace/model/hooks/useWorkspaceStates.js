import { useDispatch, useSelector } from 'react-redux';
import {
  setHoveredWorkspaceId,
  setFocusedWorkspaceId,
  setSelectedWorkspaceId,
  selectWorkspaceCheckStates,
} from '../store';

export const useWorkspaceStates = (workspaceId) => {
  const dispatch = useDispatch();
  const { isSelected, isFocused, isHovered } = useSelector(state => selectWorkspaceCheckStates(state, workspaceId));

  const handleHover = (id) => {
    dispatch(setHoveredWorkspaceId(id));
  };

  const handleFocus = (id) => {
    dispatch(setFocusedWorkspaceId(id));
  };

  const handleSelect = (id) => {
    console.log('[useWorkspaceStates] handleSelect', id);
    dispatch(setSelectedWorkspaceId(id));
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
