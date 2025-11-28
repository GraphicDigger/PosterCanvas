import { selectActorRoleUI } from '../selectors';
import { createSelector } from '@reduxjs/toolkit';

export const selectHoveredActorRoleId = (state) => selectActorRoleUI(state).hoveredActorRoleId;
export const selectFocusedActorRoleId = (state) => selectActorRoleUI(state).focusedActorRoleId;
export const selectSelectedActorRoleId = (state) => selectActorRoleUI(state).selectedActorRoleId;

export const selectActorRoleCheckStates = createSelector(
  [selectSelectedActorRoleId, selectFocusedActorRoleId, selectHoveredActorRoleId, (_, id) => id],
  (selectedId, focusedId, hoveredId, ActorRoleId) => ({
    isSelected: selectedId === ActorRoleId,
    isFocused: focusedId === ActorRoleId,
    isHovered: hoveredId === ActorRoleId,
  }),
);
