import { createSelector } from '@reduxjs/toolkit';
import { ENTITY_KINDS } from '../../../../shared/constants';
import { makeSelectAllInstancesFromTree } from '../../../uiTree';
import { selectCompositeComponentById } from '../../@x/component';

// Base selectors
export const selectInstanceState = (state) => state.instanceEntity;
export const selectInstanceEntities = (state) => selectInstanceState(state).entities;
export const selectInstanceIds = (state) => selectInstanceState(state).ids;
export const selectInstanceUI = (state) => selectInstanceState(state).ui;
export const selectInstanceOwnership = (state) => selectInstanceState(state).ownership;

// UI selectors
export const selectHoveredInstanceId = (state) => selectInstanceUI(state).hoveredInstanceId;
export const selectFocusedInstanceId = (state) => selectInstanceUI(state).focusedInstanceId;
export const selectSelectedInstanceId = (state) => selectInstanceUI(state).selectedInstanceId;

// Check states
export const selectInstanceCheckStates = createSelector(
  [selectSelectedInstanceId, selectFocusedInstanceId, selectHoveredInstanceId, (_, id) => id],
  (selectedId, focusedId, hoveredId, instanceId) => ({
    isSelected: selectedId === instanceId,
    isFocused: focusedId === instanceId,
    isHovered: hoveredId === instanceId,
  }),
);

// Selected instance
export const selectSelectedInstance = createSelector(
  [selectSelectedInstanceId, selectInstanceEntities],
  (selectedId, entities) => {
    if (!selectedId || !entities) {return null;}
    return entities[selectedId] || null;
  },
);

// Entity selectors
export const selectAllInstances = createSelector(
  [selectInstanceIds, selectInstanceEntities],
  (ids, entities) => ids.map(id => entities[id]),
);

export const selectInstanceById = createSelector(
  [selectInstanceEntities, (_, id) => id],
  (entities, id) => entities[id],
);

// Ownership selectors
export const selectInstancesByOwnership = createSelector(
  [selectInstanceEntities, selectInstanceOwnership, (_, type, ownerId) => ({ type, ownerId })],
  (entities, ownership, { type, ownerId }) => {
    const instanceIds = ownership[type]?.[ownerId] || [];
    return instanceIds.map(id => entities[id]).filter(Boolean);
  },
);

export const selectInstancesByScreenId = createSelector(
  [selectInstanceEntities, selectInstanceOwnership, (_, screenId) => screenId],
  (entities, ownership, screenId) => {
    const instanceIds = ownership[ENTITY_KINDS.SCREEN]?.[screenId] || [];
    return instanceIds.map(id => entities[id]).filter(Boolean);
  },
);

export const selectInstanceIdsByScreenId = createSelector(
  [selectInstanceEntities, selectInstanceOwnership, (_, screenId) => screenId],
  (entities, ownership, screenId) => {
    const instanceIds = ownership[ENTITY_KINDS.SCREEN]?.[screenId] || [];
    return instanceIds.map(id => entities[id]).filter(Boolean);
  },
);

export const selectInstancesByComponentId = createSelector(
  [selectInstanceEntities, (_, componentId) => componentId],
  (entities, componentId) => {
    return Object.values(entities)
      .filter(instance => instance.componentId === componentId)
      .filter(Boolean);
  },
);


export const selectNestedInstancesByComponentId = createSelector(
  [selectInstanceEntities, (_, componentId) => componentId],
  (entities, componentId) => {
    return Object.values(entities)
      .filter(instance => instance.ownership?.type === ENTITY_KINDS.COMPONENT && instance.ownership?.id === componentId)
      .filter(Boolean);
  },
);

// Get entities by ids
export const selectInstancesByIds = createSelector(
  [selectInstanceEntities, (_, ids) => ids],
  (entities, ids) => {
    if (!ids || !entities) {return [];}
    return ids.map(id => entities[id]).filter(Boolean);
  },
);

//  all composite instances
export const selectAllCompositeInstances = createSelector(
  [selectInstanceIds, selectInstanceEntities, (state) => state],
  (ids, entities, state) => ids.map(id => {
    cons;
    const instance = entities[id];
    const component = selectCompositeComponentById(state, instance.componentId);
    return {
      ...instance,
      component,
    };
  }),
);

// composite instance
export const selectCompositeInstanceById = createSelector(
  [selectInstanceById, (state, _instanceId) => state],
  (instance, state) => {
    if (!instance) {
      return null;
    }
    const component = selectCompositeComponentById(state, instance.componentId);
    return {
      ...instance,
      component,
    };
  },
);

