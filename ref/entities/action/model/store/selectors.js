import { ENTITY_KINDS } from '../../../../shared/constants';
import { createSelector } from '@reduxjs/toolkit';
import { ACTION_TYPES } from '../constants/actionTypes';
// Base selectors
export const selectActionState = (state) => state.actionEntity;
export const selectActionEntities = (state) => selectActionState(state).entities;
export const selectActionIds = (state) => selectActionState(state).ids;
export const selectActionUI = (state) => selectActionState(state).ui;
export const selectActionRelations = (state) => selectActionState(state).relations;

// UI selectors
export const selectHoveredActionId = (state) => selectActionUI(state).hoveredActionId;
export const selectFocusedActionId = (state) => selectActionUI(state).focusedActionId;
export const selectSelectedActionId = (state) => selectActionUI(state).selectedActionId;

// Relations selectors
export const selectActionsByEntityId = createSelector(
  [
    selectActionEntities,
    selectActionRelations,
    (_, entityId) => entityId,
    (_, __, entityKind) => entityKind,
  ],
  (entities, relations, entityId, entityKind) => {
    let actionIds = [];

    switch (entityKind) {
    case ENTITY_KINDS.COMPONENT:
      actionIds = relations.byComponent[entityId] || [];
      break;
    case ENTITY_KINDS.SCREEN:
      actionIds = relations.byScreen[entityId] || [];
      break;
    case ENTITY_KINDS.ELEMENT:
      actionIds = relations.byElement[entityId] || [];
      break;
    default:
      return [];
    }
    return actionIds.map(id => entities[id]).filter(Boolean);
  },
);

// Entity selectors
export const selectAllActions = (state) => selectActionIds(state).map(id => selectActionById(state, id));
export const selectActionById = (state, id) => selectActionEntities(state)[id];

// check states
export const selectActionCheckStates = createSelector(
  [selectSelectedActionId, selectFocusedActionId, selectHoveredActionId, (_, id) => id],
  (selectedId, focusedId, hoveredId, ActionId) => ({
    isSelected: selectedId === ActionId,
    isFocused: focusedId === ActionId,
    isHovered: hoveredId === ActionId,
  }),
);

// selected Action
export const selectSelectedAction = createSelector(
  [selectSelectedActionId, selectActionEntities],
  (selectedId, entities) => {
    if (!selectedId || !entities) {return null;}
    return entities[selectedId] || null;
  },
);

// get entities by ids
export const selectActionsByIds = createSelector(
  [selectActionEntities, (_, ids) => ids],
  (entities, ids) => {
    if (!ids || !entities) {return [];}
    return ids.map(id => entities[id]).filter(Boolean);
  },
);

// Селектор для получения кастомных экшенов
export const selectCustomActions = createSelector(
  [(state) => state.actionEntity.entities],
  (entities) => Object.values(entities).filter(action =>
    action?.kind === ENTITY_KINDS.ACTION && action?.type === ACTION_TYPES.CUSTOM_ACTION,
  ),
);
