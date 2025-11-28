import type { RootState } from '@/app/store';
import { createSelector } from '@reduxjs/toolkit';
import { selectAllUsers } from '@/entities/actorUser';
import { selectAllMembers } from '@/entities/actorMember';
import { selectAllWorkspaces } from '@/entities/workspace';


export const selectSessionState = (state: RootState) => state.authSession;
export const selectCurrentUserId = (state: RootState) => state.authSession.currentUserId;
export const selectCurrentMemberId = (state: RootState) => state.authSession.currentMemberId;
export const selectCurrentWorkspaceId = (state: RootState) => state.authSession.currentWorkspaceId;
export const selectIsAuthenticated = (state: RootState) => state.authSession.isAuthenticated;

export const isGuest = (state: RootState) => !state.authSession.isAuthenticated;
export const hasActiveMember = (state: RootState) => Boolean(state.authSession.currentMemberId);
export const hasActiveWorkspace = (state: RootState) => Boolean(state.authSession.currentWorkspaceId);

export const selectSessionInfo = createSelector(selectSessionState, (session) => ({
  userId: session.currentUserId,
  memberId: session.currentMemberId,
  workspaceId: session.currentWorkspaceId,
  isAuthenticated: session.isAuthenticated,
}),
);

// Селектор для получения полного объекта User
export const selectCurrentUser = createSelector(
  [selectCurrentUserId, selectAllUsers],
  (userId, users) => (userId && users ? users.find((u) => u?.id === userId) : null),
);

// Селектор для получения полного объекта Member
export const selectCurrentMember = createSelector(
  [selectCurrentMemberId, selectAllMembers],
  (memberId, members) => (memberId && members ? members.find((m) => m?.id === memberId) : null),
);

// Селектор для получения полного объекта Project (Workspace)
export const selectCurrentWorkspace = createSelector(
  [selectCurrentWorkspaceId, selectAllWorkspaces],
  (workspaceId, workspaces) => (workspaceId && workspaces ? workspaces.find((w) => w?.id === workspaceId) : null),
);

// Селектор для получения всех workspace'ов текущего пользователя
// Через связь с members (как в makeSelectWorkspacesByUserId)
export const selectCurrentUserWorkspaces = createSelector(
  [selectCurrentUserId, selectAllMembers, selectAllWorkspaces],
  (userId, members, workspaces) => {
    if (!userId || !members || !workspaces) {return [];}

    // Находим все members для текущего пользователя
    const userMembers = members.filter((m) => m?.userId === userId);

    // Получаем workspaceIds из members
    const workspaceIds = userMembers.map((m) => m?.workspaceId).filter(Boolean);

    // Возвращаем workspace объекты
    return workspaceIds.map((id) => workspaces.find((w) => w?.id === id)).filter(Boolean);
  },
);
