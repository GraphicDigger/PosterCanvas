import { selectActorAgentUI } from '../selectors';
import { createSelector } from '@reduxjs/toolkit';

export const selectHoveredActorAgentId = (state) => selectActorAgentUI(state).hoveredActorAgentId;
export const selectFocusedActorAgentId = (state) => selectActorAgentUI(state).focusedActorAgentId;
export const selectSelectedActorAgentId = (state) => selectActorAgentUI(state).selectedActorAgentId;

export const selectActorAgentCheckStates = createSelector(
  [selectSelectedActorAgentId, selectFocusedActorAgentId, selectHoveredActorAgentId, (_, id) => id],
  (selectedId, focusedId, hoveredId, ActorAgentId) => ({
    isSelected: selectedId === ActorAgentId,
    isFocused: focusedId === ActorAgentId,
    isHovered: hoveredId === ActorAgentId,
  }),
);
