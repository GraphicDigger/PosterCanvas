import { useDispatch, useSelector } from 'react-redux';
import { selectPresetCheckStates } from '../store/selectors';

import {
  setSelectedPresetId,
  setHoveredPresetId,
  setFocusedPresetId,
} from '../store/slice';

export const usePresetStates = () => {

  const {
    isHovered,
    isFocused,
    isSelected,
  } = useSelector(selectPresetCheckStates);

  const dispatch = useDispatch();

  const handleHover = (id) => {
    dispatch(setHoveredPresetId(id));
  };
  const handleFocus = (id) => {
    dispatch(setFocusedPresetId(id));
  };
  const handleSelect = (id) => {
    dispatch(setSelectedPresetId(id));
  };

  const removeSelectedPreset = () => {
    dispatch(setSelectedPresetId(null));
  };


  return {
    handleSelect,
    handleHover,
    handleFocus,
    removeSelectedPreset,
    isHovered,
    isFocused,
    isSelected,
  };
};
