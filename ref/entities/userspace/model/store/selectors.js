import { createSelector } from '@reduxjs/toolkit';
import { selectSelectedUserspaceId } from './uiStates/selectors';

export const selectUserspaceState = (state) => state.userspaceEntity;
export const selectUserspaceEntities = (state) => selectUserspaceState(state).entities;
export const selectUserspaceIds = (state) => selectUserspaceState(state).ids;
export const selectUserspaceUI = (state) => selectUserspaceState(state).ui;


// Entity selectors
export const selectUserspaceById = (state, id) => selectUserspaceEntities(state)[id];
export const selectAllUserspaces = createSelector(
  [selectUserspaceIds, selectUserspaceEntities],
  (ids, entities) => {
    if (!ids || !entities) {return [];}
    const result = [];
    for (const id of ids) {
      const entity = entities[id];
      result.push(entity || undefined);
    }
    return result;
  },
);


// selected Userspace
export const selectSelectedUserspace = createSelector(
  [selectSelectedUserspaceId, selectUserspaceEntities],
  (selectedId, entities) => {
    if (!selectedId || !entities) {return null;}
    return entities[selectedId] || null;
  },
);

// get entities by ids
export const selectUserspacesByIds = createSelector(
  [selectUserspaceEntities, (_, ids) => ids],
  (entities, ids) => {
    if (!ids || !entities) {return [];}
    return ids.map(id => entities[id]).filter(Boolean);
  },
);
