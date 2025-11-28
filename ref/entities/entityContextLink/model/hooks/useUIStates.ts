import { useDispatch, useSelector } from 'react-redux';
import {
  setHoveredContextLinkId,
  setFocusedContextLinkId,
  setSelectedContextLinkId,
  selectContextLinkCheckStates,
} from '../store';

export const useUIStates = (contextLinkId: string) => {
  const dispatch = useDispatch();

  const {
    isSelected: isContextLinkSelected,
    isFocused: isContextLinkFocused,
    isHovered: isContextLinkHovered,
  } = useSelector(state => selectContextLinkCheckStates(state, contextLinkId));

  const handleContextLinkHover = (id: string) => {
    dispatch(setHoveredContextLinkId({ id }));
  };

  const handleContextLinkFocus = (id: string) => {
    dispatch(setFocusedContextLinkId({ id }));
  };

  const handleContextLinkSelect = (id: string) => {
    dispatch(setSelectedContextLinkId({ id }));
  };

  return {
    isContextLinkSelected,
    isContextLinkFocused,
    isContextLinkHovered,
    handleContextLinkHover,
    handleContextLinkFocus,
    handleContextLinkSelect,
  };
};
