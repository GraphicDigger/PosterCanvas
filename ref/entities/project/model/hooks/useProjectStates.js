import { useDispatch, useSelector } from 'react-redux';
import {
  setHoveredProjectId,
  setFocusedProjectId,
  setSelectedProjectId,
  selectProjectCheckStates,
} from '../store';

export const useProjectStates = (ProjectId) => {

  const dispatch = useDispatch();
  const { isSelected, isFocused, isHovered } = useSelector(state => selectProjectCheckStates(state, ProjectId));

  const handleHover = (id) => {
    dispatch(setHoveredProjectId(id));
  };

  const handleFocus = (id) => {
    dispatch(setFocusedProjectId(id));
  };

  const handleSelect = (id) => {
    dispatch(setSelectedProjectId(id));
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
