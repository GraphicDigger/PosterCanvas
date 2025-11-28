import { useDispatch, useSelector } from 'react-redux';
import {
  setHoveredCommentId,
  setFocusedCommentId,
  setSelectedCommentId,
  selectCommentCheckStates,
} from '../store';


export const useCommentStates = (commentId) => {
  const dispatch = useDispatch();
  const { isSelected, isFocused, isHovered } = useSelector(state => selectCommentCheckStates(state, commentId));

  const handleHover = (id) => {
    dispatch(setHoveredCommentId(id));
  };

  const handleFocus = (id) => {
    dispatch(setFocusedCommentId(id));
  };

  const handleSelect = (id) => {
    dispatch(setSelectedCommentId(id));
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
