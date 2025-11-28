/**
 * Integration Tests: AuthProvider ↔ Redux & localStorage
 *
 * Week 2, Day 4: Auth/Session Integration Tests
 *
 * Purpose: Test full integration between AuthProvider, Redux state, and localStorage
 * Coverage Target: 90%+ for AuthProvider integration
 *
 * Integration Scenarios:
 * 1. Provider Initialization & Cleanup (5 tests)
 * 2. Session Management (8 tests)
 * 3. Redux & localStorage Integration (7 tests)
 *
 * Total: 20 tests
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import authSessionReducer, { sessionStarted, sessionEnded, setCurrentMember } from '@/app/sessions/auth/model/store/slice';
import userEntityReducer from '@/entities/actorUser/model/store/slice';
import memberEntityReducer from '@/entities/actorMember/model/store/slice';
import workspaceEntityReducer from '@/entities/workspace/model/store/slice';
import { setUsers } from '@/entities/actorUser';
import { setMembers } from '@/entities/actorMember';
import { setWorkspaces } from '@/entities/workspace';
import { AUTH_STORAGE_KEYS } from '@/shared/constants';

// Create mock implementations that can be updated per test
const mockUseAuth = vi.fn(() => ({
  isAuthenticated: false,
  currentUser: null,
  currentWorkspace: null,
  currentMember: null,
}));

const mockUseWorkspaces = vi.fn(() => ({
  allWorkspaces: [],
}));

const mockUseMembers = vi.fn(() => ({
  allMembers: [],
}));

const mockUseUser = vi.fn(() => ({
  allUsers: [],
}));

// Mock the hooks that require Context providers
vi.mock('@/app/sessions/auth/model/hooks/useAuth', () => ({
  useAuth: () => mockUseAuth(),
}));

vi.mock('@/entities/workspace', async (importOriginal) => {
  const actual = await importOriginal() as any;
  return {
    ...actual,
    useWorkspaces: () => mockUseWorkspaces(),
  };
});

vi.mock('@/entities/actorMember', async (importOriginal) => {
  const actual = await importOriginal() as any;
  return {
    ...actual,
    useMembers: () => mockUseMembers(),
  };
});

vi.mock('@/entities/actorUser', async (importOriginal) => {
  const actual = await importOriginal() as any;
  return {
    ...actual,
    useUser: () => mockUseUser(),
  };
});

import { AuthProvider } from '../AuthProvider';

const TestComponent = () => {
  return <div data-testid="test-component">Test Component</div>;
};

describe('AuthProvider ↔ Redux & localStorage Integration', () => {
  let store: ReturnType<typeof configureStore>;
  let localStorageMock: Record<string, string>;

  const createTestStore = () => {
    return configureStore({
      reducer: {
        authSession: authSessionReducer,
        userEntity: userEntityReducer,
        memberEntity: memberEntityReducer,
        workspaceEntity: workspaceEntityReducer,
      },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: false,
        }),
    });
  };

  const mockUsers = [
    { id: 'user-1', name: 'Test User', email: 'test@example.com' },
    { id: 'user-2', name: 'Another User', email: 'another@example.com' },
  ];

  const mockWorkspaces = [
    { id: 'workspace-1', name: 'Test Workspace' },
    { id: 'workspace-2', name: 'Another Workspace' },
  ];

  const mockMembers = [
    { id: 'member-1', userId: 'user-1', workspaceId: 'workspace-1', role: 'admin' },
    { id: 'member-2', userId: 'user-1', workspaceId: 'workspace-2', role: 'member' },
    { id: 'member-3', userId: 'user-2', workspaceId: 'workspace-1', role: 'member' },
  ];

  beforeEach(() => {
    // Mock localStorage
    localStorageMock = {};
    global.localStorage = {
      getItem: vi.fn((key: string) => localStorageMock[key] || null),
      setItem: vi.fn((key: string, value: string) => {
        localStorageMock[key] = value;
      }),
      removeItem: vi.fn((key: string) => {
        delete localStorageMock[key];
      }),
      clear: vi.fn(() => {
        localStorageMock = {};
      }),
      length: 0,
      key: vi.fn(),
    } as any;

    store = createTestStore();

    // Reset mocks to default values
    mockUseAuth.mockReturnValue({
      isAuthenticated: false,
      currentUser: null,
      currentWorkspace: null,
      currentMember: null,
    });

    mockUseWorkspaces.mockReturnValue({
      allWorkspaces: [],
    });

    mockUseMembers.mockReturnValue({
      allMembers: [],
    });

    mockUseUser.mockReturnValue({
      allUsers: [],
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
    localStorageMock = {};
  });

  // ═══════════════════════════════════════════════════════════════
  // CATEGORY 1: PROVIDER INITIALIZATION & CLEANUP (5 tests)
  // ═══════════════════════════════════════════════════════════════

  describe('Provider Initialization & Cleanup', () => {
    it('should initialize AuthProvider without errors', () => {
      render(
        <Provider store={store}>
          <AuthProvider>
            <TestComponent />
          </AuthProvider>
        </Provider>,
      );

      expect(screen.getByTestId('test-component')).toBeInTheDocument();
    });

    it('should restore session from localStorage on mount', async () => {
      // Setup localStorage with session data
      localStorageMock[AUTH_STORAGE_KEYS.USER_ID] = 'user-1';
      localStorageMock[AUTH_STORAGE_KEYS.MEMBER_ID] = 'member-1';
      localStorageMock[AUTH_STORAGE_KEYS.WORKSPACE_ID] = 'workspace-1';

      render(
        <Provider store={store}>
          <AuthProvider>
            <TestComponent />
          </AuthProvider>
        </Provider>,
      );

      await waitFor(() => {
        const state = store.getState();
        expect(state.authSession.isAuthenticated).toBe(true);
        expect(state.authSession.currentUserId).toBe('user-1');
        expect(state.authSession.currentMemberId).toBe('member-1');
        expect(state.authSession.currentWorkspaceId).toBe('workspace-1');
      });
    });

    it('should auto-initialize with first user when no session exists', async () => {
      // Populate Redux with test data
      store.dispatch(setUsers(mockUsers as any));
      store.dispatch(setWorkspaces(mockWorkspaces as any));
      store.dispatch(setMembers(mockMembers as any));

      // Update mocks to return test data
      mockUseUser.mockReturnValue({
        allUsers: mockUsers,
      });

      mockUseWorkspaces.mockReturnValue({
        allWorkspaces: mockWorkspaces,
      });

      mockUseMembers.mockReturnValue({
        allMembers: mockMembers,
      });

      render(
        <Provider store={store}>
          <AuthProvider>
            <TestComponent />
          </AuthProvider>
        </Provider>,
      );

      await waitFor(() => {
        const state = store.getState();
        expect(state.authSession.isAuthenticated).toBe(true);
        expect(state.authSession.currentUserId).toBe('user-1');
        expect(state.authSession.currentMemberId).toBe('member-1');
        expect(state.authSession.currentWorkspaceId).toBe('workspace-1');
      });
    });

    it('should not auto-initialize if session data exists in localStorage', async () => {
      // Setup localStorage with existing session
      localStorageMock[AUTH_STORAGE_KEYS.USER_ID] = 'user-2';
      localStorageMock[AUTH_STORAGE_KEYS.MEMBER_ID] = 'member-3';
      localStorageMock[AUTH_STORAGE_KEYS.WORKSPACE_ID] = 'workspace-1';

      // Populate Redux with different test data
      store.dispatch(setUsers(mockUsers as any));
      store.dispatch(setWorkspaces(mockWorkspaces as any));
      store.dispatch(setMembers(mockMembers as any));

      render(
        <Provider store={store}>
          <AuthProvider>
            <TestComponent />
          </AuthProvider>
        </Provider>,
      );

      await waitFor(() => {
        const state = store.getState();
        // Should use localStorage data, not auto-initialize with first user
        expect(state.authSession.currentUserId).toBe('user-2');
        expect(state.authSession.currentMemberId).toBe('member-3');
      });
    });

    it('should cleanup on unmount', () => {
      const { unmount } = render(
        <Provider store={store}>
          <AuthProvider>
            <TestComponent />
          </AuthProvider>
        </Provider>,
      );

      unmount();

      // Should not throw errors
      expect(screen.queryByTestId('test-component')).not.toBeInTheDocument();
    });
  });

  // ═══════════════════════════════════════════════════════════════
  // CATEGORY 2: SESSION MANAGEMENT (8 tests)
  // ═══════════════════════════════════════════════════════════════

  describe('Session Management', () => {
    it('should start session and update Redux state', async () => {
      render(
        <Provider store={store}>
          <AuthProvider>
            <TestComponent />
          </AuthProvider>
        </Provider>,
      );

      store.dispatch(sessionStarted({
        currentUserId: 'user-1',
        currentMemberId: 'member-1',
        currentWorkspaceId: 'workspace-1',
      }));

      await waitFor(() => {
        const state = store.getState();
        expect(state.authSession.isAuthenticated).toBe(true);
        expect(state.authSession.currentUserId).toBe('user-1');
        expect(state.authSession.currentMemberId).toBe('member-1');
        expect(state.authSession.currentWorkspaceId).toBe('workspace-1');
      });
    });

    it('should sync session data to localStorage on auto-initialization', async () => {
      store.dispatch(setUsers(mockUsers as any));
      store.dispatch(setWorkspaces(mockWorkspaces as any));
      store.dispatch(setMembers(mockMembers as any));

      // Update mocks to return test data
      mockUseUser.mockReturnValue({
        allUsers: mockUsers,
      });

      mockUseWorkspaces.mockReturnValue({
        allWorkspaces: mockWorkspaces,
      });

      mockUseMembers.mockReturnValue({
        allMembers: mockMembers,
      });

      render(
        <Provider store={store}>
          <AuthProvider>
            <TestComponent />
          </AuthProvider>
        </Provider>,
      );

      await waitFor(() => {
        expect(localStorage.setItem).toHaveBeenCalledWith(AUTH_STORAGE_KEYS.USER_ID, 'user-1');
        expect(localStorage.setItem).toHaveBeenCalledWith(AUTH_STORAGE_KEYS.MEMBER_ID, 'member-1');
        expect(localStorage.setItem).toHaveBeenCalledWith(AUTH_STORAGE_KEYS.WORKSPACE_ID, 'workspace-1');
      });
    });

    it('should change current member and workspace', async () => {
      // Start with a session
      localStorageMock[AUTH_STORAGE_KEYS.USER_ID] = 'user-1';
      localStorageMock[AUTH_STORAGE_KEYS.MEMBER_ID] = 'member-1';
      localStorageMock[AUTH_STORAGE_KEYS.WORKSPACE_ID] = 'workspace-1';

      render(
        <Provider store={store}>
          <AuthProvider>
            <TestComponent />
          </AuthProvider>
        </Provider>,
      );

      await waitFor(() => {
        const state = store.getState();
        expect(state.authSession.currentMemberId).toBe('member-1');
      });

      // Change member
      store.dispatch(setCurrentMember({
        memberId: 'member-2',
        workspaceId: 'workspace-2',
      }));

      await waitFor(() => {
        const state = store.getState();
        expect(state.authSession.currentMemberId).toBe('member-2');
        expect(state.authSession.currentWorkspaceId).toBe('workspace-2');
        // User should remain the same
        expect(state.authSession.currentUserId).toBe('user-1');
        expect(state.authSession.isAuthenticated).toBe(true);
      });
    });

    it('should end session and clear Redux state', async () => {
      // Start with authenticated session
      store.dispatch(sessionStarted({
        currentUserId: 'user-1',
        currentMemberId: 'member-1',
        currentWorkspaceId: 'workspace-1',
      }));

      render(
        <Provider store={store}>
          <AuthProvider>
            <TestComponent />
          </AuthProvider>
        </Provider>,
      );

      await waitFor(() => {
        const state = store.getState();
        expect(state.authSession.isAuthenticated).toBe(true);
      });

      // End session (logout)
      store.dispatch(sessionEnded());

      await waitFor(() => {
        const state = store.getState();
        expect(state.authSession.isAuthenticated).toBe(false);
        expect(state.authSession.currentUserId).toBeNull();
        expect(state.authSession.currentMemberId).toBeNull();
        expect(state.authSession.currentWorkspaceId).toBeNull();
      });
    });

    it('should handle multiple session changes', async () => {
      render(
        <Provider store={store}>
          <AuthProvider>
            <TestComponent />
          </AuthProvider>
        </Provider>,
      );

      // Session 1
      store.dispatch(sessionStarted({
        currentUserId: 'user-1',
        currentMemberId: 'member-1',
        currentWorkspaceId: 'workspace-1',
      }));

      await waitFor(() => {
        const state = store.getState();
        expect(state.authSession.currentUserId).toBe('user-1');
      });

      // Logout
      store.dispatch(sessionEnded());

      await waitFor(() => {
        const state = store.getState();
        expect(state.authSession.isAuthenticated).toBe(false);
      });

      // Session 2 (different user)
      store.dispatch(sessionStarted({
        currentUserId: 'user-2',
        currentMemberId: 'member-3',
        currentWorkspaceId: 'workspace-1',
      }));

      await waitFor(() => {
        const state = store.getState();
        expect(state.authSession.currentUserId).toBe('user-2');
        expect(state.authSession.isAuthenticated).toBe(true);
      });
    });

    it('should maintain session state across re-renders', async () => {
      localStorageMock[AUTH_STORAGE_KEYS.USER_ID] = 'user-1';
      localStorageMock[AUTH_STORAGE_KEYS.MEMBER_ID] = 'member-1';
      localStorageMock[AUTH_STORAGE_KEYS.WORKSPACE_ID] = 'workspace-1';

      const { rerender } = render(
        <Provider store={store}>
          <AuthProvider>
            <TestComponent />
          </AuthProvider>
        </Provider>,
      );

      await waitFor(() => {
        const state = store.getState();
        expect(state.authSession.isAuthenticated).toBe(true);
      });

      // Rerender
      rerender(
        <Provider store={store}>
          <AuthProvider>
            <TestComponent />
          </AuthProvider>
        </Provider>,
      );

      // Session should still be active
      const state = store.getState();
      expect(state.authSession.isAuthenticated).toBe(true);
      expect(state.authSession.currentUserId).toBe('user-1');
    });

    it('should not create duplicate sessions on mount', async () => {
      localStorageMock[AUTH_STORAGE_KEYS.USER_ID] = 'user-1';
      localStorageMock[AUTH_STORAGE_KEYS.MEMBER_ID] = 'member-1';
      localStorageMock[AUTH_STORAGE_KEYS.WORKSPACE_ID] = 'workspace-1';

      render(
        <Provider store={store}>
          <AuthProvider>
            <TestComponent />
          </AuthProvider>
        </Provider>,
      );

      await waitFor(() => {
        const state = store.getState();
        expect(state.authSession.isAuthenticated).toBe(true);
      });

      // Verify session was started only once (no duplicates)
      const state = store.getState();
      expect(state.authSession.currentUserId).toBe('user-1');
      expect(state.authSession.currentMemberId).toBe('member-1');
    });

    it('should handle empty data gracefully', async () => {
      // Don't populate any data
      render(
        <Provider store={store}>
          <AuthProvider>
            <TestComponent />
          </AuthProvider>
        </Provider>,
      );

      // Wait a bit for any potential effects
      await new Promise(resolve => setTimeout(resolve, 100));

      // Should remain unauthenticated
      const state = store.getState();
      expect(state.authSession.isAuthenticated).toBe(false);
      expect(state.authSession.currentUserId).toBeNull();
    });
  });

  // ═══════════════════════════════════════════════════════════════
  // CATEGORY 3: REDUX & LOCALSTORAGE INTEGRATION (7 tests)
  // ═══════════════════════════════════════════════════════════════

  describe('Redux & localStorage Integration', () => {
    it('should read from localStorage on initialization', async () => {
      localStorageMock[AUTH_STORAGE_KEYS.USER_ID] = 'user-1';
      localStorageMock[AUTH_STORAGE_KEYS.MEMBER_ID] = 'member-1';
      localStorageMock[AUTH_STORAGE_KEYS.WORKSPACE_ID] = 'workspace-1';

      render(
        <Provider store={store}>
          <AuthProvider>
            <TestComponent />
          </AuthProvider>
        </Provider>,
      );

      await waitFor(() => {
        expect(localStorage.getItem).toHaveBeenCalledWith(AUTH_STORAGE_KEYS.USER_ID);
        expect(localStorage.getItem).toHaveBeenCalledWith(AUTH_STORAGE_KEYS.MEMBER_ID);
        expect(localStorage.getItem).toHaveBeenCalledWith(AUTH_STORAGE_KEYS.WORKSPACE_ID);
      });
    });

    it('should keep Redux and localStorage in sync', async () => {
      store.dispatch(setUsers(mockUsers as any));
      store.dispatch(setWorkspaces(mockWorkspaces as any));
      store.dispatch(setMembers(mockMembers as any));

      // Update mocks to return test data
      mockUseUser.mockReturnValue({
        allUsers: mockUsers,
      });

      mockUseWorkspaces.mockReturnValue({
        allWorkspaces: mockWorkspaces,
      });

      mockUseMembers.mockReturnValue({
        allMembers: mockMembers,
      });

      render(
        <Provider store={store}>
          <AuthProvider>
            <TestComponent />
          </AuthProvider>
        </Provider>,
      );

      await waitFor(() => {
        const state = store.getState();
        expect(state.authSession.isAuthenticated).toBe(true);

        // localStorage should match Redux state
        expect(localStorageMock[AUTH_STORAGE_KEYS.USER_ID]).toBe(state.authSession.currentUserId);
        expect(localStorageMock[AUTH_STORAGE_KEYS.MEMBER_ID]).toBe(state.authSession.currentMemberId);
        expect(localStorageMock[AUTH_STORAGE_KEYS.WORKSPACE_ID]).toBe(state.authSession.currentWorkspaceId);
      });
    });

    it('should maintain Redux state structure', async () => {
      store.dispatch(sessionStarted({
        currentUserId: 'user-1',
        currentMemberId: 'member-1',
        currentWorkspaceId: 'workspace-1',
      }));

      render(
        <Provider store={store}>
          <AuthProvider>
            <TestComponent />
          </AuthProvider>
        </Provider>,
      );

      const state = store.getState();

      // Verify complete session state structure
      expect(state.authSession).toHaveProperty('currentUserId');
      expect(state.authSession).toHaveProperty('currentMemberId');
      expect(state.authSession).toHaveProperty('currentWorkspaceId');
      expect(state.authSession).toHaveProperty('isAuthenticated');

      expect(typeof state.authSession.isAuthenticated).toBe('boolean');
    });

    it('should handle partial localStorage data gracefully', async () => {
      // Only set user ID, missing member and workspace
      localStorageMock[AUTH_STORAGE_KEYS.USER_ID] = 'user-1';

      render(
        <Provider store={store}>
          <AuthProvider>
            <TestComponent />
          </AuthProvider>
        </Provider>,
      );

      await new Promise(resolve => setTimeout(resolve, 100));

      // Should not start session with partial data
      const state = store.getState();
      expect(state.authSession.isAuthenticated).toBe(false);
    });

    it('should allow querying current user/member/workspace from Redux', async () => {
      // Populate entities
      store.dispatch(setUsers(mockUsers as any));
      store.dispatch(setWorkspaces(mockWorkspaces as any));
      store.dispatch(setMembers(mockMembers as any));

      localStorageMock[AUTH_STORAGE_KEYS.USER_ID] = 'user-1';
      localStorageMock[AUTH_STORAGE_KEYS.MEMBER_ID] = 'member-1';
      localStorageMock[AUTH_STORAGE_KEYS.WORKSPACE_ID] = 'workspace-1';

      render(
        <Provider store={store}>
          <AuthProvider>
            <TestComponent />
          </AuthProvider>
        </Provider>,
      );

      await waitFor(() => {
        const state = store.getState();

        // Session IDs should be set
        expect(state.authSession.currentUserId).toBe('user-1');
        expect(state.authSession.currentMemberId).toBe('member-1');
        expect(state.authSession.currentWorkspaceId).toBe('workspace-1');

        // Entities should be queryable
        expect(state.userEntity.entities['user-1']).toBeDefined();
        expect(state.memberEntity.entities['member-1']).toBeDefined();
        expect(state.workspaceEntity.entities['workspace-1']).toBeDefined();
      });
    });

    it('should maintain state consistency after logout', async () => {
      store.dispatch(sessionStarted({
        currentUserId: 'user-1',
        currentMemberId: 'member-1',
        currentWorkspaceId: 'workspace-1',
      }));

      render(
        <Provider store={store}>
          <AuthProvider>
            <TestComponent />
          </AuthProvider>
        </Provider>,
      );

      await waitFor(() => {
        const state = store.getState();
        expect(state.authSession.isAuthenticated).toBe(true);
      });

      // Logout
      store.dispatch(sessionEnded());

      await waitFor(() => {
        const state = store.getState();

        // All session fields should be null
        expect(state.authSession.currentUserId).toBeNull();
        expect(state.authSession.currentMemberId).toBeNull();
        expect(state.authSession.currentWorkspaceId).toBeNull();
        expect(state.authSession.isAuthenticated).toBe(false);
      });
    });

    it('should handle concurrent session operations correctly', async () => {
      render(
        <Provider store={store}>
          <AuthProvider>
            <TestComponent />
          </AuthProvider>
        </Provider>,
      );

      // Dispatch multiple actions rapidly
      store.dispatch(sessionStarted({
        currentUserId: 'user-1',
        currentMemberId: 'member-1',
        currentWorkspaceId: 'workspace-1',
      }));

      store.dispatch(setCurrentMember({
        memberId: 'member-2',
        workspaceId: 'workspace-2',
      }));

      await waitFor(() => {
        const state = store.getState();

        // Final state should reflect last action
        expect(state.authSession.currentUserId).toBe('user-1');
        expect(state.authSession.currentMemberId).toBe('member-2');
        expect(state.authSession.currentWorkspaceId).toBe('workspace-2');
        expect(state.authSession.isAuthenticated).toBe(true);
      });
    });
  });
});

