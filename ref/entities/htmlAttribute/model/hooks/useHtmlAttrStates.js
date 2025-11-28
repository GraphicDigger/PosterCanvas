import { useDispatch, useSelector } from 'react-redux';
import {
  setHoveredHtmlAttrId,
  setFocusedHtmlAttrId,
  setSelectedHtmlAttrId,
  selectHtmlAttrCheckStates,
} from '../store';

export const useHtmlAttrStates = (htmlAttrId) => {
  const dispatch = useDispatch();
  const { isSelected, isFocused, isHovered } = useSelector(state => selectHtmlAttrCheckStates(state, htmlAttrId));

  const handleHover = (id) => {
    dispatch(setHoveredHtmlAttrId(id));
  };

  const handleFocus = (id) => {
    dispatch(setFocusedHtmlAttrId(id));
  };

  const handleSelect = (id) => {
    dispatch(setSelectedHtmlAttrId(id));
  };

  return {
    isSelected,
    isFocused,
    isHovered,
    handleHover,
    handleFocus,
    handleSelect,
  };
};
