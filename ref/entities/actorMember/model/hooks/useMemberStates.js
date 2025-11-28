import { useDispatch, useSelector } from 'react-redux';
import {
  setHoveredMemberId,
  setFocusedMemberId,
  setSelectedMemberId,
} from '../store/slice';
import { selectMemberCheckStates } from '../store/selectors';

export const useMemberStates = (MemberId) => {
  const dispatch = useDispatch();
  const { isSelected, isFocused, isHovered } = useSelector(state => selectMemberCheckStates(state, MemberId));

  const handleHover = (id) => {
    dispatch(setHoveredMemberId(id));
  };

  const handleFocus = (id) => {
    dispatch(setFocusedMemberId(id));
  };

  const handleSelect = (id) => {
    dispatch(setSelectedMemberId(id));
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
