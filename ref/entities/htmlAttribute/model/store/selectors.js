import { createSelector } from '@reduxjs/toolkit';
import { selectSelectedHtmlAttrId } from './uiStates/selectors';

export const selectHtmlAttrState = (state) => state.htmlAttrEntity;
export const selectHtmlAttrEntities = (state) => selectHtmlAttrState(state).entities;
export const selectHtmlAttrIds = (state) => selectHtmlAttrState(state).ids;
export const selectHtmlAttrUI = (state) => selectHtmlAttrState(state).ui;


// Entity selectors
export const selectAllHtmlAttrs = createSelector(
  [selectHtmlAttrIds, selectHtmlAttrEntities],
  (ids, entities) => {
    if (!ids || !entities) {return [];}
    return ids.map(id => entities[id]).filter(Boolean);
  },
);
export const selectHtmlAttrById = (state, id) => selectHtmlAttrEntities(state)[id];


// selected HtmlAttr
export const selectSelectedHtmlAttr = createSelector(
  [selectSelectedHtmlAttrId, selectHtmlAttrEntities],
  (selectedId, entities) => {
    if (!selectedId || !entities) {return null;}
    return entities[selectedId] || null;
  },
);

// get entities by ids
export const selectHtmlAttrsByIds = createSelector(
  [selectHtmlAttrEntities, (_, ids) => ids],
  (entities, ids) => {
    if (!ids || !entities) {return [];}
    return ids.map(id => entities[id]).filter(Boolean);
  },
);
