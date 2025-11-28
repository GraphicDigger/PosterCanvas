import type { RootState } from '@/app/store';
import { FC, ReactNode, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { sessionStarted } from '@/app/sessions/auth';
import { useAuth } from '@/app/sessions/auth/model/hooks/useAuth';
import { useWorkspaces } from '@/entities/workspace';
import { useMembers } from '@/entities/actorMember';
import { useUser } from '@/entities/actorUser';
import { AUTH_STORAGE_KEYS } from '@/shared/constants';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {

  const dispatch = useDispatch();
  const { isAuthenticated } = useAuth();
  const { allWorkspaces } = useWorkspaces();
  const { allMembers } = useMembers();
  const { allUsers } = useUser();

  useEffect(() => {
    // Этот эффект выполнится только один раз при монтировании компонента
    const currentUserId = localStorage.getItem(AUTH_STORAGE_KEYS.USER_ID);
    const currentMemberId = localStorage.getItem(AUTH_STORAGE_KEYS.MEMBER_ID);
    const currentWorkspaceId = localStorage.getItem(AUTH_STORAGE_KEYS.WORKSPACE_ID);

    // Если у нас есть все необходимые данные для восстановления сессии
    if (currentUserId && currentMemberId && currentWorkspaceId) {
      dispatch(
        sessionStarted({
          currentUserId,
          currentMemberId,
          currentWorkspaceId,
        }),
      );
      // console.log('[AuthProvider] Session restored from localStorage');
    }
  }, [dispatch]);

  // НЕ выполняется, если данные уже есть в localStorage (они будут восстановлены первым useEffect)
  useEffect(() => {
    const hasStoredSession =
      localStorage.getItem(AUTH_STORAGE_KEYS.USER_ID) &&
      localStorage.getItem(AUTH_STORAGE_KEYS.MEMBER_ID) &&
      localStorage.getItem(AUTH_STORAGE_KEYS.WORKSPACE_ID);

    // Если в localStorage есть данные, не инициализируем автоматически, первый useEffect восстановит сессию из localStorage
    if (hasStoredSession) {
      // console.log('[AuthProvider] Session data found in localStorage, skipping auto-init');
      return;
    }

    // Автоматическая инициализация только если:
    // 1. Пользователь не аутентифицирован
    // 2. В localStorage нет данных
    // 3. Данные загружены в Redux
    if (!isAuthenticated && allUsers.length > 0 && allWorkspaces.length > 0 && allMembers.length > 0) {
      const firstUser = allUsers[0] as any;
      const firstWorkspace = allWorkspaces[0] as any;
      const firstMember = allMembers.find(
        (m: any) => m?.userId === firstUser?.id && m?.workspaceId === firstWorkspace?.id,
      ) as any;

      if (firstUser && firstWorkspace && firstMember) {
        const payload = {
          currentUserId: firstUser.id,
          currentMemberId: firstMember.id,
          currentWorkspaceId: firstWorkspace.id,
        };

        localStorage.setItem(AUTH_STORAGE_KEYS.USER_ID, payload.currentUserId);
        localStorage.setItem(AUTH_STORAGE_KEYS.MEMBER_ID, payload.currentMemberId);
        localStorage.setItem(AUTH_STORAGE_KEYS.WORKSPACE_ID, payload.currentWorkspaceId);

        dispatch(sessionStarted(payload));
        // console.log('[AuthProvider] Default session initialized with first user');
      }
    }
  }, [isAuthenticated, allUsers, allWorkspaces, allMembers, dispatch]);

  return <>{children}</>;
};
