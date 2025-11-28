import { createAsyncThunk } from '@reduxjs/toolkit';
import { sessionStarted, setCurrentMember } from './slice';
import type { RootState } from '@/app/store';
import { AUTH_STORAGE_KEYS } from '@/shared/constants';
import { selectAllMembers } from '@/entities/actorMember';
import { selectAllWorkspaces } from '@/entities/workspace';
import { selectCurrentUserId } from './selectors';

/**
 * Thunk для переключения на другого пользователя.
 * Имитирует полный выход и вход.
 */
export const switchUserSession = createAsyncThunk<void, string, { state: RootState }>(
  'authSession/switchUser',
  async (userId, { dispatch, getState }) => {
    const state = getState();
    const allMembers = selectAllMembers(state);
    const allWorkspaces = selectAllWorkspaces(state);

    const userMembers = allMembers.filter((m: any) => m?.userId === userId);

    if (userMembers.length > 0) {
      const firstMember = userMembers[0] as any;
      const workspaceId = firstMember?.workspaceId;
      const workspace = allWorkspaces.find((ws: any) => ws?.id === workspaceId) as any;

      if (firstMember && workspace) {
        const payload = {
          currentUserId: userId,
          currentMemberId: firstMember.id,
          currentWorkspaceId: workspace.id,
        };

        // 1. Сохраняем в localStorage
        localStorage.setItem(AUTH_STORAGE_KEYS.USER_ID, payload.currentUserId);
        localStorage.setItem(AUTH_STORAGE_KEYS.MEMBER_ID, payload.currentMemberId);
        localStorage.setItem(AUTH_STORAGE_KEYS.WORKSPACE_ID, payload.currentWorkspaceId);

        // 2. Диспатчим в Redux
        dispatch(sessionStarted(payload));

        console.log('[switchUserSession] Switched to user:', userId, 'workspace:', workspace.id);
      }
    }
  },
);

/**
 * Thunk для переключения проекта (workspace) для текущего пользователя.
 */
export const switchWorkspaceSession = createAsyncThunk<void, string, { state: RootState }>(
  'authSession/switchWorkspace',
  async (workspaceId, { dispatch, getState }) => {
    const state = getState();
    const currentUserId = selectCurrentUserId(state);

    if (currentUserId) {
      const allMembers = selectAllMembers(state);
      const member = allMembers.find((m: any) => m?.userId === currentUserId && m?.workspaceId === workspaceId);

      if (member) {
        const payload = {
          memberId: (member as any).id,
          workspaceId: workspaceId,
        };

        // 1. Обновляем localStorage
        localStorage.setItem(AUTH_STORAGE_KEYS.MEMBER_ID, payload.memberId);
        localStorage.setItem(AUTH_STORAGE_KEYS.WORKSPACE_ID, payload.workspaceId);

        // 2. Диспатчим в Redux
        dispatch(setCurrentMember(payload));
      }
    }
  },
);
