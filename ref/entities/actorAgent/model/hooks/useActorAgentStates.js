import { useDispatch, useSelector } from 'react-redux';
import {
  setHoveredActorAgentId,
  setFocusedActorAgentId,
  setSelectedActorAgentId,
  selectActorAgentCheckStates,
} from '../store';

export const useActorAgentStates = (ActorAgentId) => {
  const dispatch = useDispatch();
  const { isSelected, isFocused, isHovered } = useSelector(state => selectActorAgentCheckStates(state, ActorAgentId));

  const handleHover = (id) => {
    dispatch(setHoveredActorAgentId(id));
  };

  const handleFocus = (id) => {
    dispatch(setFocusedActorAgentId(id));
  };

  const handleSelect = (id) => {
    dispatch(setSelectedActorAgentId(id));
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
