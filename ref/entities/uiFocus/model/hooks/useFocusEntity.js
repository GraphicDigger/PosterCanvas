import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectFocusSystemStates } from '../store/selectors';
import {
  setFocusEntity,
  resetFocusEntity,
  selectFocusedEntityWithData,
  selectFocusedEntity,
  selectFocusEntityOwnership,
} from '../store';


export const useFocusEntity = () => {

  const dispatch = useDispatch();

  const {
    focusEntity,
    isCanvasFocused,
    isElementFocused,
    isInstanceFocused
  } = useSelector(selectFocusSystemStates);

  const focusEntityWithData = useSelector(selectFocusedEntityWithData);

  const focusEntityOwnership = useSelector(selectFocusEntityOwnership);

  const setFocused = (data) => dispatch(setFocusEntity(data));

  const resetFocused = () => dispatch(resetFocusEntity());

  return {
    focusEntity,
    focusEntityWithData,
    focusEntityOwnership,
    isCanvasFocused,
    isElementFocused,
    isInstanceFocused,
    setFocused,
    resetFocused,
  };
};
