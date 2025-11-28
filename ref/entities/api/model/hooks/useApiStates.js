import { useDispatch, useSelector } from 'react-redux';
import {
  setHoveredApiId,
  setFocusedApiId,
  setSelectedApiId,
  resetSelectedApiId,

  setHoveredCallId,
  setFocusedCallId,
  setSelectedCallId,
  resetSelectedCallId,

  setHoveredCategoryId,
  setFocusedCategoryId,
  setSelectedCategoryId,
  resetSelectedCategoryId,
} from '../store/slice';
import {
  selectApiCheckStates,
  selectSelectedApiId,
  selectHoveredApiId,
  selectFocusedApiId,

  selectCallCheckStates,
  selectSelectedCallId,
  selectHoveredCallId,
  selectFocusedCallId,

  selectCategoryCheckStates,
  selectHoveredCategoryId,
  selectFocusedCategoryId,
  selectSelectedCategoryId,

} from '../store/states/selectors';

export const useApiStates = (apiId) => {
  const dispatch = useDispatch();

  const { isSelected, isFocused, isHovered } = useSelector(state => selectApiCheckStates(state, apiId));

  const handleHover = (id) => {
    dispatch(setHoveredApiId(id));
  };

  const handleFocus = (id) => {
    dispatch(setFocusedApiId(id));
  };

  const handleSelect = (id) => {
    dispatch(setSelectedApiId(id));
  };

  const resetSelect = () => {
    dispatch(resetSelectedApiId());
  };

  return {
    isSelected,
    isFocused,
    isHovered,
    handleHover,
    handleFocus,
    handleSelect,
    resetSelect,
  };
};

export const useCallStates = (callId) => {
  const dispatch = useDispatch();

  const { isSelected, isFocused, isHovered } = useSelector(state => selectCallCheckStates(state, callId));

  const handleHover = (callId) => {
    dispatch(setHoveredCallId(callId));
  };

  const handleFocus = (callId) => {
    dispatch(setFocusedCallId(callId));
  };

  const handleSelect = (callId) => {
    dispatch(setSelectedCallId(callId));
  };

  const resetSelect = () => {
    dispatch(resetSelectedCallId());
  };

  return {
    isSelected,
    isFocused,
    isHovered,
    handleHover,
    handleFocus,
    handleSelect,
    resetSelect,
  };
};

export const useApiCategoryStates = (categoryId) => {
  const dispatch = useDispatch();

  const { isSelected, isFocused, isHovered } = useSelector(state => selectCategoryCheckStates(state, categoryId));

  const handleHover = (categoryId) => {
    dispatch(setHoveredCategoryId(categoryId));
  };

  const handleFocus = (categoryId) => {
    dispatch(setFocusedCategoryId(categoryId));
  };

  const handleSelect = (categoryId) => {
    dispatch(setSelectedCategoryId(categoryId));
  };

  const resetSelect = () => {
    dispatch(resetSelectedCategoryId());
  };

  return {
    isSelected,
    isFocused,
    isHovered,
    handleHover,
    handleFocus,
    handleSelect,
    resetSelect,
  };
};

// Дополнительный хук для получения текущих состояний без привязки к конкретному API/Call
export const useCurrentApiStates = () => {
  const selectedApiId = useSelector(selectSelectedApiId);
  const hoveredApiId = useSelector(selectHoveredApiId);
  const focusedApiId = useSelector(selectFocusedApiId);
  const selectedCallId = useSelector(selectSelectedCallId);
  const hoveredCallId = useSelector(selectHoveredCallId);
  const focusedCallId = useSelector(selectFocusedCallId);

  return {
    selectedApiId,
    hoveredApiId,
    focusedApiId,
    selectedCallId,
    hoveredCallId,
    focusedCallId,
  };
};
