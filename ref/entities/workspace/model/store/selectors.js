import { createSelector } from '@reduxjs/toolkit';
import { selectSelectedWorkspaceId } from './uiStates/selectors';
import { makeSelectUserMembersByUserId } from '../../../actorMember';

export const selectWorkspaceState = (state) => state.workspaceEntity;
export const selectWorkspaceEntities = (state) => selectWorkspaceState(state).entities;
export const selectWorkspaceIds = (state) => selectWorkspaceState(state).ids;
export const selectWorkspaceUI = (state) => selectWorkspaceState(state).ui;


// Entity selectors
export const selectAllWorkspaces = createSelector(
  [selectWorkspaceIds, selectWorkspaceEntities],
  (ids, entities) => {
    if (!ids || !entities) {return [];}
    return ids.map(id => entities[id]).filter(Boolean);
  },
);
export const selectWorkspaceById = (state, id) => selectWorkspaceEntities(state)[id];


// selected Workspace
export const selectSelectedWorkspace = createSelector(
  [selectSelectedWorkspaceId, selectWorkspaceEntities],
  (selectedId, entities) => {
    if (!selectedId || !entities) {return null;}
    return entities[selectedId] || null;
  },
);

// get entities by ids
export const selectWorkspacesByIds = createSelector(
  [selectWorkspaceEntities, (_, ids) => ids],
  (entities, ids) => {
    if (!ids || !entities) {return [];}
    return ids.map(id => entities[id]).filter(Boolean);
  },
);

export const makeSelectWorkspacesByUserId = (userId) => createSelector(
  [state => state],
  (state) => {
    if (!state || !userId ) {return [];}
    const userMembers = makeSelectUserMembersByUserId(userId)(state);
    const workspaceIds = userMembers.map(member => member.workspaceId);
    const workspaces = selectWorkspacesByIds(state, workspaceIds);

    return workspaces;
  },
);
