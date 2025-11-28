import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectTokenCheckStates } from '../store/selectors';

import {
  setSelectedTokenId,
  setHoveredTokenId,
  setFocusedTokenId,
} from '../store/slice';

export const useTokenStates = () => {

  const {
    isHovered,
    isFocused,
    isSelected,
  } = useSelector(selectTokenCheckStates);

  const dispatch = useDispatch();

  const handleHover = (id) => {
    dispatch(setHoveredTokenId(id));
  };
  const handleFocus = (id) => {
    dispatch(setFocusedTokenId(id));
  };
  const handleSelect = (id) => {
    dispatch(setSelectedTokenId(id));
  };


  return {
    handleSelect,
    handleHover,
    handleFocus,
    isHovered,
    isFocused,
    isSelected,
  };
};
