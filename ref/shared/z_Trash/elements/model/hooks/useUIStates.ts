import { useDispatch, useSelector } from 'react-redux';
import {
  setHoveredDefaultElementId,
  setFocusedDefaultElementId,
  setSelectedDefaultElementId,
  selectDefaultElementsCheckStates,
} from '../store';

export const useUIStates = (defaultElementId: string) => {
  const dispatch = useDispatch();

  const {
    isSelected: isDefaultElementSelected,
    isFocused: isDefaultElementFocused,
    isHovered: isDefaultElementHovered,
  } = useSelector(state => selectDefaultElementsCheckStates(state, defaultElementId));

  const handleDefaultElementHover = (id: string) => {
    dispatch(setHoveredDefaultElementId({ id }));
  };

  const handleDefaultElementFocus = (id: string) => {
    dispatch(setFocusedDefaultElementId({ id }));
  };

  const handleDefaultElementSelect = (id: string) => {
    dispatch(setSelectedDefaultElementId({ id }));
  };

  return {
    isDefaultElementSelected,
    isDefaultElementFocused,
    isDefaultElementHovered,
    handleDefaultElementHover,
    handleDefaultElementFocus,
    handleDefaultElementSelect,
  };
};
