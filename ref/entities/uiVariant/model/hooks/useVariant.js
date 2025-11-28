import React from 'react';
import { useDispatch } from 'react-redux';

import {
  setHoveredVariantId,
  setFocusedVariantId,
  setSelectedVariantId,
} from '../store/slice';


export const useVariant = () => {
  const dispatch = useDispatch();

  const handleHover = (id) => {
    dispatch(setHoveredVariantId(id));
  };
  const handleSelect = (id) => {
    dispatch(setSelectedVariantId(id));
  };
  const handleFocus = (id) => {
    dispatch(setFocusedVariantId(id));
  };

  return {
    handleSelect,
    handleHover,
    handleFocus,
  };
};
