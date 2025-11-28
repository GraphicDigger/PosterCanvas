import { useDispatch, useSelector } from 'react-redux';
import {
  setHoveredPresetModeValueId,
  setFocusedPresetModeValueId,
  setSelectedPresetModeValueId,
  selectPresetModeValueCheckStates,
} from '../store';

export const usePresetModeValueStates = (presetModeValueId) => {
  const dispatch = useDispatch();
  const { isSelected, isFocused, isHovered } = useSelector(state => selectPresetModeValueCheckStates(state, presetModeValueId));

  const handleHover = (id) => {
    dispatch(setHoveredPresetModeValueId(id));
  };

  const handleFocus = (id) => {
    dispatch(setFocusedPresetModeValueId(id));
  };

  const handleSelect = (id) => {
    dispatch(setSelectedPresetModeValueId(id));
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
