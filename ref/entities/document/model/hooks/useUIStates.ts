import { useDispatch, useSelector } from 'react-redux';
import {
  setHoveredDocumentId,
  setFocusedDocumentId,
  setSelectedDocumentId,
  selectDocumentCheckStates,
} from '../store';

export const useUIStates = (documentId: string) => {
  const dispatch = useDispatch();

  const {
    isSelected: isDocumentSelected,
    isFocused: isDocumentFocused,
    isHovered: isDocumentHovered,
  } = useSelector(state => selectDocumentCheckStates(state, documentId));

  const handleDocumentHover = (id: string) => {
    dispatch(setHoveredDocumentId({ id }));
  };

  const handleDocumentFocus = (id: string) => {
    dispatch(setFocusedDocumentId({ id }));
  };

  const handleDocumentSelect = (id: string) => {
    dispatch(setSelectedDocumentId({ id }));
  };

  return {
    isDocumentSelected,
    isDocumentFocused,
    isDocumentHovered,
    handleDocumentHover,
    handleDocumentFocus,
    handleDocumentSelect,
  };
};
