// ===================================================================
// USE USERSPACES HOOK - COMPREHENSIVE TESTS
// ===================================================================
// Entity: userspace
// Hook: useUserspaces, useUserspacesByIds
// Purpose: Provides access to userspaces from Redux store
// Coverage: All userspaces, selected userspace, by IDs
// ===================================================================

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useSelector } from 'react-redux';
import { useUserspaces, useUserspacesByIds } from './useUserspaces';
import * as userspaceStore from '../store';

// Mock dependencies
vi.mock('react-redux', () => ({
  useSelector: vi.fn(),
}));

vi.mock('../store', () => ({
  selectAllUserspaces: vi.fn(),
  selectSelectedUserspace: vi.fn(),
  selectUserspacesByIds: vi.fn(),
}));

describe('useUserspaces', () => {
  // Mock data
  const mockUserspaces = [
    { id: 'userspace-1', name: 'Userspace 1', userId: 'user-1' },
    { id: 'userspace-2', name: 'Userspace 2', userId: 'user-2' },
    { id: 'userspace-3', name: 'Userspace 3', userId: 'user-1' },
  ];

  const mockSelectedUserspace = mockUserspaces[0];

  beforeEach(() => {
    vi.clearAllMocks();

    // Setup useSelector to call the selector function
    useSelector.mockImplementation((selector) => {
      if (selector === userspaceStore.selectAllUserspaces) {
        return mockUserspaces;
      }
      if (selector === userspaceStore.selectSelectedUserspace) {
        return mockSelectedUserspace;
      }
      return undefined;
    });
  });

  // ===================================================================
  // BASIC FUNCTIONALITY TESTS
  // ===================================================================

  describe('Basic Functionality', () => {
    it('should return all userspaces', () => {
      const { result } = renderHook(() => useUserspaces());

      expect(result.current.allUserspaces).toEqual(mockUserspaces);
      expect(result.current.allUserspaces).toHaveLength(3);
    });

    it('should return selected userspace', () => {
      const { result } = renderHook(() => useUserspaces());

      expect(result.current.selectedUserspace).toEqual(mockSelectedUserspace);
      expect(result.current.selectedUserspace.id).toBe('userspace-1');
    });

    it('should return both properties', () => {
      const { result } = renderHook(() => useUserspaces());

      expect(result.current).toHaveProperty('allUserspaces');
      expect(result.current).toHaveProperty('selectedUserspace');
    });
  });

  // ===================================================================
  // EMPTY STATE TESTS
  // ===================================================================

  describe('Empty States', () => {
    it('should handle empty userspace list', () => {
      useSelector.mockImplementation((selector) => {
        if (selector === userspaceStore.selectAllUserspaces) {
          return [];
        }
        if (selector === userspaceStore.selectSelectedUserspace) {
          return null;
        }
        return undefined;
      });

      const { result } = renderHook(() => useUserspaces());

      expect(result.current.allUserspaces).toEqual([]);
      expect(result.current.selectedUserspace).toBeNull();
    });

    it('should handle no selected userspace', () => {
      useSelector.mockImplementation((selector) => {
        if (selector === userspaceStore.selectAllUserspaces) {
          return mockUserspaces;
        }
        if (selector === userspaceStore.selectSelectedUserspace) {
          return null;
        }
        return undefined;
      });

      const { result } = renderHook(() => useUserspaces());

      expect(result.current.selectedUserspace).toBeNull();
      expect(result.current.allUserspaces).toEqual(mockUserspaces);
    });
  });

  // ===================================================================
  // SINGLE USERSPACE TESTS
  // ===================================================================

  describe('Single Userspace', () => {
    it('should handle single userspace in list', () => {
      useSelector.mockImplementation((selector) => {
        if (selector === userspaceStore.selectAllUserspaces) {
          return [mockUserspaces[0]];
        }
        if (selector === userspaceStore.selectSelectedUserspace) {
          return mockUserspaces[0];
        }
        return undefined;
      });

      const { result } = renderHook(() => useUserspaces());

      expect(result.current.allUserspaces).toHaveLength(1);
      expect(result.current.selectedUserspace.id).toBe('userspace-1');
    });
  });
});

describe('useUserspacesByIds', () => {
  const mockUserspaces = [
    { id: 'userspace-1', name: 'Userspace 1' },
    { id: 'userspace-2', name: 'Userspace 2' },
    { id: 'userspace-3', name: 'Userspace 3' },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  // ===================================================================
  // BASIC FUNCTIONALITY TESTS
  // ===================================================================

  describe('Basic Functionality', () => {
    it('should return userspaces by provided IDs', () => {
      const targetIds = ['userspace-1', 'userspace-2'];

      useSelector.mockImplementation((selector) => {
        if (typeof selector === 'function') {
          return [mockUserspaces[0], mockUserspaces[1]];
        }
        return undefined;
      });

      const { result } = renderHook(() => useUserspacesByIds(targetIds));

      expect(result.current.Userspaces).toHaveLength(2);
      expect(result.current.Userspaces[0].id).toBe('userspace-1');
      expect(result.current.Userspaces[1].id).toBe('userspace-2');
    });

    it('should return single userspace for single ID', () => {
      const targetIds = ['userspace-3'];

      useSelector.mockImplementation((selector) => {
        if (typeof selector === 'function') {
          return [mockUserspaces[2]];
        }
        return undefined;
      });

      const { result } = renderHook(() => useUserspacesByIds(targetIds));

      expect(result.current.Userspaces).toHaveLength(1);
      expect(result.current.Userspaces[0].id).toBe('userspace-3');
    });

    it('should return empty array for empty IDs', () => {
      useSelector.mockImplementation((selector) => {
        if (typeof selector === 'function') {
          return [];
        }
        return undefined;
      });

      const { result } = renderHook(() => useUserspacesByIds([]));

      expect(result.current.Userspaces).toEqual([]);
    });

    it('should return empty array for non-existent IDs', () => {
      useSelector.mockImplementation((selector) => {
        if (typeof selector === 'function') {
          return [];
        }
        return undefined;
      });

      const { result } = renderHook(() => useUserspacesByIds(['non-existent-1']));

      expect(result.current.Userspaces).toEqual([]);
    });
  });
});

