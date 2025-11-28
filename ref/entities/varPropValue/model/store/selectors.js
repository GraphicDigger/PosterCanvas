import { createSelector } from '@reduxjs/toolkit';
import { selectSelectedPropValueId } from './uiStates/selectors';

export const selectPropValueState = state => state.propValueEntity;
const selectPropValueEntities = state => state.propValueEntity.entities;
const selectPropValueIds = state => state.propValueEntity.ids;
const selectPropValueByProp = state => state.propValueEntity.byProp;

// selected propvalue
export const selectSelectedPropValue = createSelector(
  [selectSelectedPropValueId, selectPropValueEntities],
  (selectedId, entities) => {
    if (!selectedId) {return null;}
    return entities[selectedId];
  },
);

// all props
export const selectAllPropValues = createSelector(
  [selectPropValueIds, selectPropValueEntities],
  (ids, entities) => ids.map(id => entities[id]),
);

// prop value by id
export const selectPropValueById = createSelector(
  [selectPropValueEntities, (_, id) => id],
  (entities, id) => entities[id],
);

// propValues by propIds
export const selectPropValuesByIds = createSelector(
  [selectPropValueEntities, (_, ids) => ids],
  (entities, ids) => {
    if (!ids) {return [];}
    return ids.map(id => entities[id]).filter(Boolean);
  },
);

//prop values
export const selectPropValuesByPropId = createSelector(
  [selectPropValueByProp, selectPropValueEntities, (_, propId) => propId],
  (byProp, entities, propId) => {
    if (!propId) {return [];}
    const propValueIds = byProp[propId] || [];
    return propValueIds.map(id => entities[id]);
  },
);
