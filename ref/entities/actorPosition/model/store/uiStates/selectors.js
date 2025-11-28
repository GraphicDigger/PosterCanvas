import { selectActorPositionUI } from '../selectors';
import { createSelector } from '@reduxjs/toolkit';

export const selectHoveredActorPositionId = (state) => selectActorPositionUI(state).hoveredActorPositionId;
export const selectFocusedActorPositionId = (state) => selectActorPositionUI(state).focusedActorPositionId;
export const selectSelectedActorPositionId = (state) => selectActorPositionUI(state).selectedActorPositionId;

export const selectActorPositionCheckStates = createSelector(
  [selectSelectedActorPositionId, selectFocusedActorPositionId, selectHoveredActorPositionId, (_, id) => id],
  (selectedId, focusedId, hoveredId, ActorPositionId) => ({
    isSelected: selectedId === ActorPositionId,
    isFocused: focusedId === ActorPositionId,
    isHovered: hoveredId === ActorPositionId,
  }),
);
