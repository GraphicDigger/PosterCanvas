import React from 'react';
import { useSelector } from 'react-redux';
import { selectElementsByScreenId } from '../store';
import { useScreens } from '../../../uiScreen';
import { useComponents } from '../../../uiComponent';

export const useElements = () => {

  const { selectedScreen } = useScreens();
  const { selectedComponent } = useComponents();
  const elementsByScreenId = useSelector(state => {
    return (screenId) => selectElementsByScreenId(state, screenId);
  });

  return {
    elementsByScreenId,
  };
};
