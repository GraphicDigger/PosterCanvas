
import { createSelector } from '@reduxjs/toolkit';
import { selectSelectedTokenValueId } from './selectorsStates';

export const selectTokenValueState = (state) => state.tokenValueEntity;
export const selectTokenValueEntities = (state) => selectTokenValueState(state).entities;
export const selectTokenValueIds = (state) => selectTokenValueState(state).ids;
export const selectTokenValueUI = (state) => selectTokenValueState(state).ui;

// export const selectTokenValueById = (state, id) => selectTokenValueEntities(state)[id];

export const selectAllTokenValues = createSelector(
  [selectTokenValueIds, selectTokenValueEntities],
  (ids, entities) => {
    return ids.map(id => entities[id]).filter(Boolean);
  },
);

// selected TokenValue
export const selectSelectedTokenValue = createSelector(
  [selectSelectedTokenValueId, selectTokenValueEntities],
  (selectedId, entities) => {
    if (!selectedId || !entities) {return null;}
    return entities[selectedId] || null;
  },
);

export const selectTokenValueById = createSelector(
  [selectTokenValueEntities, (_, id) => id],
  (entities, id) => {
    if (!id || !entities) {return null;}
    return entities[id] || null;
  },
);

export const selectTokenValueByTokenId = createSelector(
  [selectAllTokenValues, (_, tokenId) => tokenId],
  (entities, tokenId) => {
    if (!tokenId || !entities) {return null;}
    return entities.find(tv => tv.tokenId === tokenId) || null;
  },
);

// get entities by ids
export const selectTokenValuesByIds = createSelector(
  [selectTokenValueEntities, (_, ids) => ids],
  (entities, ids) => {
    if (!ids || !entities) {return [];}
    return ids.map(id => entities[id]).filter(Boolean);
  },
);

export const selectTokenValuesByVariableModeIdAndTokenIds = createSelector(
  [selectAllTokenValues, (_, variableModeId) => variableModeId, (_, __, tokenIds) => tokenIds],
  (allTokenValues, variableModeId, tokenIds) => {
    if (!allTokenValues || !variableModeId || !tokenIds) {return [];}
    return allTokenValues.filter(tv => tv.variableModeId === variableModeId && tokenIds.includes(tv.tokenId));
  },
);

export const selectTokenValuesByTokenIds = createSelector(
  [selectAllTokenValues, (_, tokenIds) => tokenIds],
  (allTokenValues, tokenIds) => {
    if (!allTokenValues || !tokenIds) {return [];}
    return allTokenValues.filter(tv => tokenIds.includes(tv.tokenId));
  },
);

export const selectTokenValueByTokenIdAndVariableModeId = createSelector(
  [selectAllTokenValues, (_, tokenId) => (tokenId), (_, __, variableModeId) => (variableModeId)],
  (allTokenValues, tokenId, variableModeId) => {
    if (!allTokenValues || !tokenId || !variableModeId) {return null;}
    return allTokenValues.find(tv => tv.tokenId === tokenId && tv.variableModeId === variableModeId);
  },
);

// export const selectDefaultTokenValue = createSelector(
//     [selectAllTokenValues, (_, tokenId) => (tokenId)],
//     (allTokenValues, tokenId) => {
//         if (!allTokenValues || !tokenId) return null;
//         return allTokenValues.find(tv => tv.tokenId === tokenId && tv.variableModeId === DEFAULT_VARIABLE_MODE_ID);
//     }
// );
