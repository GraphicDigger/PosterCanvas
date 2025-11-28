import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setSelectedScreenId,
  setFocusedScreenId,
  setHoveredScreenId,
} from '../store/slice';
import { selectScreenCheckStates } from '../store/selector';

export const useScreenStates = (screenId) => {
  const dispatch = useDispatch();

  const {
    isSelected,
    isFocused,
    isHovered,
  } = useSelector(state => selectScreenCheckStates(state, screenId));

  const handleSelect = useCallback((id) => {
    dispatch(setSelectedScreenId(id));
  }, [dispatch]);

  const handleFocus = useCallback((id) => {
    dispatch(setFocusedScreenId(id));
  }, [dispatch]);

  const handleHover = useCallback((id) => {
    dispatch(setHoveredScreenId(id));
  }, [dispatch]);

  const handleDeselect = useCallback(() => {
    dispatch(setSelectedScreenId(null));
  }, [dispatch]);

  return {
    handleSelect,
    handleFocus,
    handleHover,
    handleDeselect,
    isSelected,
    isFocused,
    isHovered,
  };
};
