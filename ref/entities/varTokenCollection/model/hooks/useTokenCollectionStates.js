import { useDispatch, useSelector } from 'react-redux';
import { setSelectedTokenCollectionId, setFocusedTokenCollectionId, setHoveredTokenCollectionId } from '../store/slice';
import { selectTokenCollectionCheckStates, selectSelectedTokenCollection } from '../store/selectors';

export const useTokenCollectionStates = (collectionId) => {
  const dispatch = useDispatch();

  // UI states
  const {
    isSelected,
    isFocused,
    isHovered,
  } = useSelector(state => selectTokenCollectionCheckStates(state, collectionId || null));

  const handleSelect = (id) => {
    dispatch(setSelectedTokenCollectionId(id));
  };

  const handleFocus = (id) => {
    dispatch(setFocusedTokenCollectionId(id));
  };

  const handleHover = (id) => {
    dispatch(setHoveredTokenCollectionId(id));
  };


  return {
    isSelected,
    isFocused,
    isHovered,
    handleSelect,
    handleFocus,
    handleHover,
  };
};
