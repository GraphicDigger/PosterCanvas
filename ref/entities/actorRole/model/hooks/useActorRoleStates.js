import { useDispatch, useSelector } from 'react-redux';
import {
  setHoveredActorRoleId,
  setFocusedActorRoleId,
  setSelectedActorRoleId,
  selectActorRoleCheckStates,
} from '../store';

export const useActorRoleStates = (ActorRoleId) => {
  const dispatch = useDispatch();
  const { isSelected, isFocused, isHovered } = useSelector(state => selectActorRoleCheckStates(state, ActorRoleId));

  const handleHover = (id) => {
    dispatch(setHoveredActorRoleId(id));
  };

  const handleFocus = (id) => {
    dispatch(setFocusedActorRoleId(id));
  };

  const handleSelect = (id) => {
    dispatch(setSelectedActorRoleId(id));
    console.log('[hook] selectedActorRoleId', id);
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
