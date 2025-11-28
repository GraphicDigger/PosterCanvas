import { useDispatch, useSelector } from 'react-redux';
import {
  setHoveredDefaultWidgetId,
  setFocusedDefaultWidgetId,
  setSelectedDefaultWidgetId,
  selectDefaultWidgetCheckStates,
} from '../store';

export const useUIStates = (defaultWidgetId: string) => {
  const dispatch = useDispatch();

  const {
    isSelected: isDefaultWidgetSelected,
    isFocused: isDefaultWidgetFocused,
    isHovered: isDefaultWidgetHovered,
  } = useSelector(state => selectDefaultWidgetCheckStates(state, defaultWidgetId));

  const handleDefaultWidgetHover = (id: string) => {
    dispatch(setHoveredDefaultWidgetId({ id }));
  };

  const handleDefaultWidgetFocus = (id: string) => {
    dispatch(setFocusedDefaultWidgetId({ id }));
  };

  const handleDefaultWidgetSelect = (id: string) => {
    dispatch(setSelectedDefaultWidgetId({ id }));
  };

  return {
    isDefaultWidgetSelected,
    isDefaultWidgetFocused,
    isDefaultWidgetHovered,
    handleDefaultWidgetHover,
    handleDefaultWidgetFocus,
    handleDefaultWidgetSelect,
  };
};
