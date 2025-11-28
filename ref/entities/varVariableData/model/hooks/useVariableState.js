import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setHoveredVariableId,
  setFocusedVariableId,
  setSelectedVariableId,
  selectVariableCheckStates,
} from '../store';


export const useVariableState = (variableId) => {
  const dispatch = useDispatch();

  const {
    isSelected,
    isFocused,
    isHovered,
  } = useSelector(state => selectVariableCheckStates(state, variableId));

  const handleHover = (id) => {
    dispatch(setHoveredVariableId(id));
  };
  const handleSelect = (id) => {
    dispatch(setSelectedVariableId(id));
  };
  const handleFocus = (id) => {
    dispatch(setFocusedVariableId(id));
  };

  return {
    handleSelect,
    handleHover,
    handleFocus,
  };
};
