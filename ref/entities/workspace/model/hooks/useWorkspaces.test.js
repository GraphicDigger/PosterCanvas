// ===================================================================
// USE WORKSPACES HOOK - COMPREHENSIVE TESTS
// ===================================================================
// Entity: workspace
// Hook: useWorkspaces, useWorkspacesByIds
// Purpose: Provides access to workspaces from Redux store
// Coverage: All workspaces, selected workspace, user workspaces, by IDs
// ===================================================================

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useSelector } from 'react-redux';
import { useWorkspaces, useWorkspacesByIds } from './useWorkspaces';
import * as workspaceStore from '../store';
import { selectSelectedUserId } from '../../../actorUser';

// Mock dependencies
vi.mock('react-redux', () => ({
  useSelector: vi.fn(),
}));

vi.mock('../store', () => ({
  selectAllWorkspaces: vi.fn(),
  selectSelectedWorkspace: vi.fn(),
  selectWorkspacesByIds: vi.fn(),
  makeSelectWorkspacesByUserId: vi.fn(() => vi.fn()),
}));

vi.mock('../../../actorUser', () => ({
  selectSelectedUserId: vi.fn(),
}));

vi.mock('../../../userspace', () => ({
  useUserspaces: vi.fn(() => ({})),
}));

describe('useWorkspaces', () => {
  // Mock data
  const mockWorkspaces = [
    { id: 'workspace-1', name: 'Workspace 1', userId: 'user-1' },
    { id: 'workspace-2', name: 'Workspace 2', userId: 'user-1' },
    { id: 'workspace-3', name: 'Workspace 3', userId: 'user-2' },
  ];

  const mockSelectedWorkspace = mockWorkspaces[0];
  const mockSelectedUserId = 'user-1';
  const mockSelectedUserWorkspaces = [mockWorkspaces[0], mockWorkspaces[1]];

  beforeEach(() => {
    vi.clearAllMocks();

    // Setup useSelector to call the selector function
    useSelector.mockImplementation((selector) => {
      if (selector === workspaceStore.selectAllWorkspaces) {
        return mockWorkspaces;
      }
      if (selector === workspaceStore.selectSelectedWorkspace) {
        return mockSelectedWorkspace;
      }
      if (selector === selectSelectedUserId) {
        return mockSelectedUserId;
      }
      // For makeSelectWorkspacesByUserId result
      if (typeof selector === 'function') {
        return mockSelectedUserWorkspaces;
      }
      return undefined;
    });
  });

  // ===================================================================
  // BASIC FUNCTIONALITY TESTS
  // ===================================================================

  describe('Basic Functionality', () => {
    it('should return all workspaces', () => {
      const { result } = renderHook(() => useWorkspaces());

      expect(result.current.allWorkspaces).toEqual(mockWorkspaces);
      expect(result.current.allWorkspaces).toHaveLength(3);
    });

    it('should return selected workspace', () => {
      const { result } = renderHook(() => useWorkspaces());

      expect(result.current.selectedWorkspace).toEqual(mockSelectedWorkspace);
      expect(result.current.selectedWorkspace.id).toBe('workspace-1');
    });

    it('should return selected user workspaces', () => {
      const { result } = renderHook(() => useWorkspaces());

      expect(result.current.selectedUserWorkspaces).toEqual(mockSelectedUserWorkspaces);
      expect(result.current.selectedUserWorkspaces).toHaveLength(2);
    });

    it('should return all three properties', () => {
      const { result } = renderHook(() => useWorkspaces());

      expect(result.current).toHaveProperty('allWorkspaces');
      expect(result.current).toHaveProperty('selectedWorkspace');
      expect(result.current).toHaveProperty('selectedUserWorkspaces');
    });
  });

  // ===================================================================
  // EMPTY STATE TESTS
  // ===================================================================

  describe('Empty States', () => {
    it('should handle empty workspace list', () => {
      useSelector.mockImplementation((selector) => {
        if (selector === workspaceStore.selectAllWorkspaces) {
          return [];
        }
        if (selector === workspaceStore.selectSelectedWorkspace) {
          return null;
        }
        if (selector === selectSelectedUserId) {
          return null;
        }
        if (typeof selector === 'function') {
          return [];
        }
        return undefined;
      });

      const { result } = renderHook(() => useWorkspaces());

      expect(result.current.allWorkspaces).toEqual([]);
      expect(result.current.selectedWorkspace).toBeNull();
      expect(result.current.selectedUserWorkspaces).toEqual([]);
    });

    it('should handle no selected workspace', () => {
      useSelector.mockImplementation((selector) => {
        if (selector === workspaceStore.selectAllWorkspaces) {
          return mockWorkspaces;
        }
        if (selector === workspaceStore.selectSelectedWorkspace) {
          return null;
        }
        if (selector === selectSelectedUserId) {
          return mockSelectedUserId;
        }
        if (typeof selector === 'function') {
          return mockSelectedUserWorkspaces;
        }
        return undefined;
      });

      const { result } = renderHook(() => useWorkspaces());

      expect(result.current.selectedWorkspace).toBeNull();
      expect(result.current.allWorkspaces).toEqual(mockWorkspaces);
    });

    it('should handle no selected user', () => {
      useSelector.mockImplementation((selector) => {
        if (selector === workspaceStore.selectAllWorkspaces) {
          return mockWorkspaces;
        }
        if (selector === workspaceStore.selectSelectedWorkspace) {
          return mockSelectedWorkspace;
        }
        if (selector === selectSelectedUserId) {
          return null;
        }
        if (typeof selector === 'function') {
          return [];
        }
        return undefined;
      });

      const { result } = renderHook(() => useWorkspaces());

      expect(result.current.selectedUserWorkspaces).toEqual([]);
    });
  });

  // ===================================================================
  // SINGLE WORKSPACE TESTS
  // ===================================================================

  describe('Single Workspace', () => {
    it('should handle single workspace in all workspaces', () => {
      useSelector.mockImplementation((selector) => {
        if (selector === workspaceStore.selectAllWorkspaces) {
          return [mockWorkspaces[0]];
        }
        if (selector === workspaceStore.selectSelectedWorkspace) {
          return mockWorkspaces[0];
        }
        if (selector === selectSelectedUserId) {
          return mockSelectedUserId;
        }
        if (typeof selector === 'function') {
          return [mockWorkspaces[0]];
        }
        return undefined;
      });

      const { result } = renderHook(() => useWorkspaces());

      expect(result.current.allWorkspaces).toHaveLength(1);
      expect(result.current.selectedWorkspace.id).toBe('workspace-1');
      expect(result.current.selectedUserWorkspaces).toHaveLength(1);
    });
  });
});

describe('useWorkspacesByIds', () => {
  const mockWorkspaces = [
    { id: 'workspace-1', name: 'Workspace 1' },
    { id: 'workspace-2', name: 'Workspace 2' },
    { id: 'workspace-3', name: 'Workspace 3' },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  // ===================================================================
  // BASIC FUNCTIONALITY TESTS
  // ===================================================================

  describe('Basic Functionality', () => {
    it('should return workspaces by provided IDs', () => {
      const targetIds = ['workspace-1', 'workspace-2'];

      useSelector.mockImplementation((selector) => {
        if (typeof selector === 'function') {
          return [mockWorkspaces[0], mockWorkspaces[1]];
        }
        return undefined;
      });

      const { result } = renderHook(() => useWorkspacesByIds(targetIds));

      expect(result.current.Workspaces).toHaveLength(2);
      expect(result.current.Workspaces[0].id).toBe('workspace-1');
      expect(result.current.Workspaces[1].id).toBe('workspace-2');
    });

    it('should return single workspace for single ID', () => {
      const targetIds = ['workspace-3'];

      useSelector.mockImplementation((selector) => {
        if (typeof selector === 'function') {
          return [mockWorkspaces[2]];
        }
        return undefined;
      });

      const { result } = renderHook(() => useWorkspacesByIds(targetIds));

      expect(result.current.Workspaces).toHaveLength(1);
      expect(result.current.Workspaces[0].id).toBe('workspace-3');
    });

    it('should return empty array for empty IDs', () => {
      useSelector.mockImplementation((selector) => {
        if (typeof selector === 'function') {
          return [];
        }
        return undefined;
      });

      const { result } = renderHook(() => useWorkspacesByIds([]));

      expect(result.current.Workspaces).toEqual([]);
    });

    it('should return empty array for non-existent IDs', () => {
      useSelector.mockImplementation((selector) => {
        if (typeof selector === 'function') {
          return [];
        }
        return undefined;
      });

      const { result } = renderHook(() => useWorkspacesByIds(['non-existent-1', 'non-existent-2']));

      expect(result.current.Workspaces).toEqual([]);
    });

    it('should handle null IDs parameter', () => {
      useSelector.mockImplementation((selector) => {
        if (typeof selector === 'function') {
          return [];
        }
        return undefined;
      });

      const { result } = renderHook(() => useWorkspacesByIds(null));

      expect(result.current.Workspaces).toEqual([]);
    });

    it('should handle undefined IDs parameter', () => {
      useSelector.mockImplementation((selector) => {
        if (typeof selector === 'function') {
          return [];
        }
        return undefined;
      });

      const { result } = renderHook(() => useWorkspacesByIds(undefined));

      expect(result.current.Workspaces).toEqual([]);
    });
  });
});

