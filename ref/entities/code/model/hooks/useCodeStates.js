import { useDispatch, useSelector } from 'react-redux';
import {
  setHoveredCodeId,
  setFocusedCodeId,
  setSelectedCodeId,
} from '../store/slice';
import { selectCodeCheckStates, selectAllCodes, selectSelectedCode } from '../store/selectors';

export const useCodeStates = (codeId) => {
  const dispatch = useDispatch();
  const { isSelected, isFocused, isHovered } = useSelector(state => selectCodeCheckStates(state, codeId));

  const handleHover = (id) => {
    dispatch(setHoveredCodeId(id));
  };
  const handleFocus = (id) => {
    dispatch(setFocusedCodeId(id));
  };
  const handleSelect = (id) => {
    dispatch(setSelectedCodeId(id));
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
