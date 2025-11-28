import { useDispatch, useSelector } from 'react-redux';
import {
  setHoveredProjectMemberId,
  setFocusedProjectMemberId,
  setSelectedProjectMemberId,
  selectProjectMemberCheckStates,
} from '../store';

export const useUIStates = (projectMemberId: string) => {
  const dispatch = useDispatch();

  const {
    isSelected: isProjectMemberSelected,
    isFocused: isProjectMemberFocused,
    isHovered: isProjectMemberHovered,
  } = useSelector(state => selectProjectMemberCheckStates(state, projectMemberId));

  const handleProjectMemberHover = (id: string) => {
    dispatch(setHoveredProjectMemberId({ id }));
  };

  const handleProjectMemberFocus = (id: string) => {
    dispatch(setFocusedProjectMemberId({ id }));
  };

  const handleProjectMemberSelect = (id: string) => {
    dispatch(setSelectedProjectMemberId({ id }));
  };

  return {
    isProjectMemberSelected,
    isProjectMemberFocused,
    isProjectMemberHovered,
    handleProjectMemberHover,
    handleProjectMemberFocus,
    handleProjectMemberSelect,
  };
};
