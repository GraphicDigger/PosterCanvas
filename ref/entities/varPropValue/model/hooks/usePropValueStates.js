import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  setSelectedPropValueId,
  setHoveredPropValueId,
  setFocusedPropValueId,
  selectPropValueCheckStates,
} from '../store';

export const usePropValueStates = (propValueId) => {
  const { isSelected, isFocused, isHovered } = useSelector(state => selectPropValueCheckStates(state, propValueId));
  const dispatch = useDispatch();

  const handleHover = (id) => {
    dispatch(setHoveredPropValueId(id));
  };
  const handleFocus = (id) => {
    dispatch(setFocusedPropValueId(id));
  };
  const handleSelect = (id) => {
    dispatch(setSelectedPropValueId(id));
  };

  return {
    isSelected,
    isFocused,
    isHovered,
    handleSelect,
    handleHover,
    handleFocus,
  };
};
