import { useDispatch, useSelector } from 'react-redux';
import { setSelectedPresetCollectionId, setFocusedPresetCollectionId, setHoveredPresetCollectionId } from '../store/slice';
import { selectPresetCollectionCheckStates, selectSelectedPresetCollection } from '../store/selectors';

export const usePresetCollectionStates = (collection) => {
  const dispatch = useDispatch();

  // UI states
  const { isSelected, isFocused, isHovered } = useSelector(state => selectPresetCollectionCheckStates(state, collection?.id));

  const handleSelect = (id) => {
    dispatch(setSelectedPresetCollectionId(id));
  };

  const handleFocus = (id) => {
    dispatch(setFocusedPresetCollectionId(id));
  };

  const handleHover = (id) => {
    dispatch(setHoveredPresetCollectionId(id));
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
