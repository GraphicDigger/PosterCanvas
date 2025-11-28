import { createSelector } from '@reduxjs/toolkit';
import { selectSelectedVariableModeGroupId } from './uiStates/selectors';

export const selectVariableModeGroupState = (state) => state.variableModeGroupEntity;
export const selectVariableModeGroupEntities = (state) => selectVariableModeGroupState(state).entities;
export const selectVariableModeGroupIds = (state) => selectVariableModeGroupState(state).ids;
export const selectVariableModeGroupUI = (state) => selectVariableModeGroupState(state).ui;


// Entity selectors
export const selectAllVariableModeGroups = createSelector(
  [selectVariableModeGroupIds, selectVariableModeGroupEntities],
  (ids, entities) => {
    if (!ids || !entities) {return [];}
    const result = [];
    for (const id of ids) {
      const entity = entities[id];
      result.push(entity || null);
    }
    return result;
  },
);

// selected VariableModeGroup
export const selectSelectedVariableModeGroup = createSelector(
  [selectSelectedVariableModeGroupId, selectVariableModeGroupEntities],
  (selectedId, entities) => {
    if (!selectedId || !entities) {return null;}
    return entities[selectedId] || null;
  },
);

// get entities by ids
export const selectVariableModeGroupsByIds = createSelector(
  [selectVariableModeGroupEntities, (_, ids) => ids],
  (entities, ids) => {
    if (!ids || !entities) {return [];}
    return ids.map(id => entities[id]).filter(Boolean);
  },
);

export const selectVariableModeGroupById = createSelector(
  [selectVariableModeGroupEntities, (_, id) => id],
  (entities, id) => {
    if (!id || !entities) {return null;}
    return entities[id] || null;
  },
);
