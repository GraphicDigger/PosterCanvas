import { createSelector } from '@reduxjs/toolkit';
import { selectSelectedActorAgentId } from './uiStates/selectors';

export const selectActorAgentState = (state) => state.actorAgentEntity;
export const selectActorAgentEntities = (state) => selectActorAgentState(state).entities;
export const selectActorAgentIds = (state) => selectActorAgentState(state).ids;
export const selectActorAgentUI = (state) => selectActorAgentState(state).ui;


// Entity selectors
export const selectAllActorAgents = (state) => selectActorAgentIds(state).map(id => selectActorAgentById(state, id));
export const selectActorAgentById = (state, id) => selectActorAgentEntities(state)[id];


// selected ActorAgent
export const selectSelectedActorAgent = createSelector(
  [selectSelectedActorAgentId, selectActorAgentEntities],
  (selectedId, entities) => {
    if (!selectedId || !entities) {return null;}
    return entities[selectedId] || null;
  },
);

// get entities by ids
export const selectActorAgentsByIds = createSelector(
  [selectActorAgentEntities, (_, ids) => ids],
  (entities, ids) => {
    if (!ids || !entities) {return [];}
    return ids.map(id => entities[id]).filter(Boolean);
  },
);
