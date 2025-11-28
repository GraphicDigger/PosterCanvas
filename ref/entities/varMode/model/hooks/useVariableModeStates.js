import { useDispatch, useSelector } from 'react-redux';
import {
  setHoveredVariableModeId,
  setFocusedVariableModeId,
  setSelectedVariableModeId,
  selectVariableModeCheckStates,
} from '../store';

export const useVariableModeStates = (variableModeId) => {
  const dispatch = useDispatch();
  const { isSelected, isFocused, isHovered } = useSelector(state => selectVariableModeCheckStates(state, variableModeId));

  const handleHover = (id) => {
    dispatch(setHoveredVariableModeId(id));
  };

  const handleFocus = (id) => {
    dispatch(setFocusedVariableModeId(id));
  };

  const handleSelect = (id) => {
    dispatch(setSelectedVariableModeId(id));
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
