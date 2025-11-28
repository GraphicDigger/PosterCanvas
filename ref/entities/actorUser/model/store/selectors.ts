import type { RootState } from '@/app/store';
import type { User } from '../../types';
import { createSelector } from '@reduxjs/toolkit';
import { makeSelectUserMembersByUserId } from '../../../actorMember';
import { selectAllProjectMembers } from '../../../projectMember';
import { selectProjectEntities } from '../../../project';


export const selectUserState = (state: RootState) => state.userEntity;
export const selectUserEntities = (state: RootState) => selectUserState(state).entities;
export const selectUserIds = (state: RootState) => selectUserState(state).ids;

export const selectHoveredUserId = (state: RootState) => selectUserState(state).hoveredId;
export const selectFocusedUserId = (state: RootState) => selectUserState(state).focusedId;
export const selectSelectedUserId = (state: RootState) => selectUserState(state).selectedId;

export const selectUserCheckStates = createSelector(
  [selectSelectedUserId, selectFocusedUserId, selectHoveredUserId, (_, id) => id],
  (selectedId, focusedId, hoveredId, UserId) => ({
    isSelected: selectedId === UserId,
    isFocused: focusedId === UserId,
    isHovered: hoveredId === UserId,
  }),
);

export const selectAllUsers = createSelector(
  [selectUserEntities, selectUserIds],
  (entities, ids) => (ids || []).map((id: string) => entities[id]).filter(Boolean) as User[],
);

export const selectAllUserIds = createSelector(
  [selectUserIds],
  (ids) => ids || [],
);

export const selectSelectedUser = createSelector(
  [selectSelectedUserId, selectUserEntities],
  (selectedId, entities) => {
    if (!selectedId || !entities) {return null;}
    return entities[selectedId] || null;
  },
);

export const makeSelectUserById = (id: string) => createSelector(
  [selectUserEntities],
  (entities) => entities?.[id] ?? null,
);

export const makeSelectUsersByIds = (ids: string[] = []) => createSelector(
  [selectUserEntities],
  (entities) => ids.map((id) => entities?.[id]).filter(Boolean) as User[],
);

export const makeSelectCompositeUserById = (userId: string) => createSelector(
  [
    selectUserEntities,
    makeSelectUserMembersByUserId(userId),
    selectAllProjectMembers,
    selectProjectEntities,
  ],
  (users, userMembers, projectMembers, projects) => {
    const user = users[userId];
    if (!user) {return null;}

    const memberIds = userMembers.map(m => m.id);
    const projectIds = projectMembers
      .filter(pm => memberIds.includes(pm.memberId))
      .map(pm => pm.projectId);

    const filteredProjects = projectIds.map(id => projects[id]).filter(Boolean);

    return {
      ...user,
      members: userMembers,
      projects: filteredProjects,
    };
  },
);
