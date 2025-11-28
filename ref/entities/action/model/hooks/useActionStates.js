import { useDispatch, useSelector } from 'react-redux';
import {
  setHoveredActionId,
  setFocusedActionId,
  setSelectedActionId,
} from '../store/slice';
import { selectActionCheckStates } from '../store/selectors';

export const useActionStates = (ActionId) => {
  const dispatch = useDispatch();
  const { isSelected, isFocused, isHovered } = useSelector(state => selectActionCheckStates(state, ActionId));

  const handleHover = (id) => {
    dispatch(setHoveredActionId(id));
  };

  const handleFocus = (id) => {
    dispatch(setFocusedActionId(id));
  };

  const handleSelect = (id) => {
    dispatch(setSelectedActionId(id));
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
