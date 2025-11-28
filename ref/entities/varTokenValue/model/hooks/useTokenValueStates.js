import { useDispatch, useSelector } from 'react-redux';
import {
  setHoveredTokenValueId,
  setFocusedTokenValueId,
  setSelectedTokenValueId,
  selectTokenValueCheckStates,
} from '../store';

export const useTokenValueStates = (tokenValueId) => {
  const dispatch = useDispatch();
  const { isSelected, isFocused, isHovered } = useSelector(state => selectTokenValueCheckStates(state, tokenValueId));

  const handleHover = (id) => {
    dispatch(setHoveredTokenValueId(id));
  };

  const handleFocus = (id) => {
    dispatch(setFocusedTokenValueId(id));
  };

  const handleSelect = (id) => {
    dispatch(setSelectedTokenValueId(id));
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
