import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  setSelectedComponentId,
  setHoveredComponentId,
  setFocusedComponentId,
} from '../store/slice';
import { selectComponentCheckStates } from '../store/selectors';


export const useComponentStates = (id) => {

  const dispatch = useDispatch();

  const {
    isSelected,
    isFocused,
    isHovered,
  } = useSelector(state => selectComponentCheckStates(state, id));

  const handleHover = (id) => {
    dispatch(setHoveredComponentId(id));
  };
  const handleFocus = (id) => {
    dispatch(setFocusedComponentId(id));
  };
  const handleSelect = (id) => {
    dispatch(setSelectedComponentId(id));
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
