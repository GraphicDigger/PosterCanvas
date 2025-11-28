import { createSelector } from '@reduxjs/toolkit';
import { selectSelectedActorPositionId } from './uiStates/selectors';

export const selectActorPositionState = (state) => state.actorPositionEntity;
export const selectActorPositionEntities = (state) => selectActorPositionState(state).entities;
export const selectActorPositionIds = (state) => selectActorPositionState(state).ids;
export const selectActorPositionUI = (state) => selectActorPositionState(state).ui;


// Entity selectors
export const selectAllActorPositions = (state) => selectActorPositionIds(state).map(id => selectActorPositionById(state, id));
export const selectActorPositionById = (state, id) => selectActorPositionEntities(state)[id];


// selected ActorPosition
export const selectSelectedActorPosition = createSelector(
  [selectSelectedActorPositionId, selectActorPositionEntities],
  (selectedId, entities) => {
    if (!selectedId || !entities) {return null;}
    return entities[selectedId] || null;
  },
);

// get entities by ids
export const selectActorPositionsByIds = createSelector(
  [selectActorPositionEntities, (_, ids) => ids],
  (entities, ids) => {
    if (!ids || !entities) {return [];}
    return ids.map(id => entities[id]).filter(Boolean);
  },
);
