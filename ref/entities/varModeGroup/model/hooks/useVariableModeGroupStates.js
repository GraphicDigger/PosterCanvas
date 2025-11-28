import { useDispatch, useSelector } from 'react-redux';
import {
  setHoveredVariableModeGroupId,
  setFocusedVariableModeGroupId,
  setSelectedVariableModeGroupId,
  selectVariableModeGroupCheckStates,
} from '../store';

export const useVariableModeGroupStates = (variableModeGroupId) => {
  const dispatch = useDispatch();
  const { isSelected, isFocused, isHovered } = useSelector(state => selectVariableModeGroupCheckStates(state, variableModeGroupId));

  const handleHover = (id) => {
    dispatch(setHoveredVariableModeGroupId(id));
  };

  const handleFocus = (id) => {
    dispatch(setFocusedVariableModeGroupId(id));
  };

  const handleSelect = (id) => {
    dispatch(setSelectedVariableModeGroupId(id));
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
