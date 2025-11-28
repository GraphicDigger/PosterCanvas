import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import {
  setFocusedElementId,
  setHoveredElementId,
  setSelectedElementId,
} from '../store/slice';


export const useElementStates = (id) => {
  const dispatch = useDispatch();


  const handleHover = (id) => {
    dispatch(setHoveredElementId(id));
  };
  const handleSelect = (id) => {
    dispatch(setSelectedElementId(id));
  };
  const handleFocus = (id) => {
    dispatch(setFocusedElementId(id));
  };

  return {
    handleSelect,
    handleHover,
    handleFocus,
  };
};
