import { useDispatch, useSelector } from 'react-redux';
import {
  setHoveredActorPositionId,
  setFocusedActorPositionId,
  setSelectedActorPositionId,
  selectActorPositionCheckStates,
} from '../store';

export const useActorPositionStates = (ActorPositionId) => {
  const dispatch = useDispatch();
  const { isSelected, isFocused, isHovered } = useSelector(state => selectActorPositionCheckStates(state, ActorPositionId));

  const handleHover = (id) => {
    dispatch(setHoveredActorPositionId(id));
  };

  const handleFocus = (id) => {
    dispatch(setFocusedActorPositionId(id));
  };

  const handleSelect = (id) => {
    dispatch(setSelectedActorPositionId(id));
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
