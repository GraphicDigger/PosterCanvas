import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setSelectedPropId,
  setHoveredPropId,
  setFocusedPropId,
  selectPropCheckStates,
} from '../store';


export const usePropStates = (propId) => {

  const {
    isSelected,
    isFocused,
    isHovered,
  } = useSelector(state => selectPropCheckStates(state, propId));

  const dispatch = useDispatch();

  const handleHover = (id) => {
    dispatch(setHoveredPropId(id));
  };
  const handleFocus = (id) => {
    dispatch(setFocusedPropId(id));
  };
  const handleSelect = (id) => {
    dispatch(setSelectedPropId(id));
  };

  return {
    handleSelect,
    handleHover,
    handleFocus,
    isSelected,
    isFocused,
    isHovered,
  };
};
