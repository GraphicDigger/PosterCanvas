import { createSelector } from '@reduxjs/toolkit';
import { selectSelectedActorRoleId } from './uiStates/selectors';
import { ACTOR_TYPE } from '../../model';

export const selectActorRoleState = (state) => state.actorRoleEntity;
export const selectActorRoleEntities = (state) => selectActorRoleState(state).entities;
export const selectActorRoleIds = (state) => selectActorRoleState(state).ids;
export const selectActorRoleUI = (state) => selectActorRoleState(state).ui;


// Entity selectors
export const selectActorRoleById = (state, id) => selectActorRoleEntities(state)[id];
export const selectAllActorRoles = (state) => selectActorRoleIds(state).map(id => selectActorRoleById(state, id));

export const selectActorRoleByActorType = (state, actorType) => selectAllActorRoles(state).filter(role => role.actorType === actorType);


// selected ActorRole
export const selectSelectedActorRole = createSelector(
  [selectSelectedActorRoleId, selectActorRoleEntities],
  (selectedId, entities) => {
    if (!selectedId || !entities) {return null;}
    return entities[selectedId] || null;
  },
);

// selected ActorRole is agent
export const selectSelectedActorRoleIsAgent = createSelector(
  [selectSelectedActorRole],
  (selectedActorRole) => selectedActorRole?.actorType === ACTOR_TYPE.AGENT,
);

// selected ActorRole is member
export const selectSelectedActorRoleIsMember = createSelector(
  [selectSelectedActorRole],
  (selectedActorRole) => selectedActorRole?.actorType === ACTOR_TYPE.MEMBER,
);


// get entities by ids
export const selectActorRolesByIds = createSelector(
  [selectActorRoleEntities, (_, ids) => ids],
  (entities, ids) => {
    if (!ids || !entities) {return [];}
    return ids.map(id => entities[id]).filter(Boolean);
  },
);

// agents roles
export const selectAgentsRoles = createSelector(
  [selectAllActorRoles],
  (roles) => roles.filter(role => role.actorType === ACTOR_TYPE.AGENT),
);

// members roles
export const selectMembersRoles = createSelector(
  [selectAllActorRoles],
  (roles) => roles.filter(role => role.actorType === ACTOR_TYPE.MEMBER),
);

