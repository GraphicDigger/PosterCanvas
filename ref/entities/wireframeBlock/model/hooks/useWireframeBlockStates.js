import { useDispatch, useSelector } from 'react-redux';
import {
  setHoveredWireframeBlockId,
  setFocusedWireframeBlockId,
  setSelectedWireframeBlockId,
} from '../store/slice';
import { selectWireframeBlockCheckStates } from '../store/selectors';

export const useWireframeBlockStates = (WireframeBlockId) => {
  const dispatch = useDispatch();

  const { isSelected, isFocused, isHovered } = useSelector(state => selectWireframeBlockCheckStates(state, WireframeBlockId));

  const handleHover = (id) => {
    dispatch(setHoveredWireframeBlockId(id));
  };

  const handleFocus = (id) => {
    dispatch(setFocusedWireframeBlockId(id));
  };

  const handleSelect = (id) => {
    dispatch(setSelectedWireframeBlockId(id));
  };

  const handleDeselectWireframeBlock = () => {
    dispatch(setSelectedWireframeBlockId(null));
  };

  return {
    isSelected,
    isFocused,
    isHovered,
    handleHover,
    handleFocus,
    handleSelect,
    handleDeselectWireframeBlock,
  };
};
