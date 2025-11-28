import { createSelector } from '@reduxjs/toolkit';
import { makeSelectProjectIdsByMemberId } from '@/entities/projectMember';
import { selectProjectsByIds } from '@/entities/project';
import { makeSelectUserById } from '@/entities/actorUser';
// Base selectors
export const selectMemberState = (state) => state.memberEntity;
export const selectMemberEntities = (state) => selectMemberState(state).entities;
export const selectMemberIds = (state) => selectMemberState(state).ids;
export const selectMemberUI = (state) => selectMemberState(state).ui;

// UI selectors
export const selectHoveredMemberId = (state) => selectMemberUI(state).hoveredMemberId;
export const selectFocusedMemberId = (state) => selectMemberUI(state).focusedMemberId;
export const selectSelectedMemberId = (state) => selectMemberUI(state).selectedMemberId;

export const selectMemberById = (state, id) => selectMemberEntities(state)[id];

export const selectAllMembers = createSelector(
  [selectMemberEntities, selectMemberIds],
  (entities, ids) => ids.map(id => entities[id]),
);

// check states
export const selectMemberCheckStates = createSelector(
  [selectSelectedMemberId, selectFocusedMemberId, selectHoveredMemberId, (_, id) => id],
  (selectedId, focusedId, hoveredId, MemberId) => ({
    isSelected: selectedId === MemberId,
    isFocused: focusedId === MemberId,
    isHovered: hoveredId === MemberId,
  }),
);

// selected Member
export const selectSelectedMember = createSelector(
  [selectSelectedMemberId, selectMemberEntities],
  (selectedId, entities) => {
    if (!selectedId || !entities) {return null;}
    return entities[selectedId] || null;
  },
);

export const selectMembersById = createSelector(
  [selectMemberEntities, (_, id) => id],
  (entities, id) => {
    if (!id || !entities) {return [];}
    return entities[id] || null;
  },
);

export const makeSelectMemberById = (id) => createSelector(
  [selectMemberEntities],
  (entities) => {
    if (!id || !entities) {return [];}
    return entities[id] || null;
  },
);

export const selectMembersByIds = createSelector(
  [selectMemberEntities, (_, ids) => ids],
  (entities, ids) => {
    if (!ids || !entities) {return [];}
    return ids.map(id => entities[id]).filter(Boolean);
  },
);

export const makeSelectMembersByIds = (ids) => createSelector(
  [selectMemberEntities],
  (entities) => {
    if (!ids || !entities) {return [];}
    return ids.map(id => entities[id]).filter(Boolean);
  },
);

export const makeSelectCompositeMemberById = (id) => createSelector(
  [
    selectMemberEntities,
    (state) => makeSelectProjectIdsByMemberId(id)(state),
    (state) => state,
  ],
  (entities, projectIds, state) => {
    if (!id || !entities) {return [];}
    const projects = selectProjectsByIds(state, projectIds);
    return {
      ...entities[id],
      projects,
    };
  },
);

export const makeSelectCompositeMembersByIds = (ids) => createSelector(
  [makeSelectMembersByIds(ids), (state) => state],
  (members, state) => {
    return members.map(member => {
      const user = makeSelectUserById(member.userId)(state);
      return {
        ...member,
        user: user,
      };
    });
  },
);

export const makeSelectUserMembersByUserId = (id) => createSelector(
  [selectMemberEntities],
  (entities) => {
    if (!id || !entities) {return [];}
    const members = Object.values(entities).filter(entity => entity.userId === id) || null;
    return members;
  },
);

export const makeSelectMemberByUserIdWorkspaceId = (id, workspaceId) => createSelector(
  [selectMemberEntities],
  (entities) => {
    if (!id || !entities) {return null;}
    const member = Object.values(entities).find(entity => entity.userId === id && entity.workspaceId === workspaceId) || null;
    return member;
  },
);

