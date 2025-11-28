// ===================================================================
// USE VARIABLES MODES HOOK - COMPREHENSIVE TESTS
// ===================================================================
// Entity: varMode
// Hooks: useVariableModes, useVariableMode, useVariableModesByIds
// Purpose: Provides access to variable modes from Redux store
// Coverage: All modes, selected mode, modes by ID, modes by type/group
// ===================================================================

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useSelector } from 'react-redux';
import { useVariableModes, useVariableMode, useVariableModesByIds } from './useVariablesModes';
import * as varModeSelectors from '../store';

// Mock dependencies
vi.mock('react-redux', () => ({
  useSelector: vi.fn(),
}));

vi.mock('../store', () => ({
  selectAllVariableModes: vi.fn(),
  selectSelectedVariableMode: vi.fn(),
  selectVariableModesByIds: vi.fn(),
  selectVariableModesByType: vi.fn(),
  selectDefaultVariableModeByIds: vi.fn(),
  selectVariableModeById: vi.fn(),
  selectVariableModesByVariableModeGroupId: vi.fn(),
  selectVariableModesByModeGroupType: vi.fn(),
  selectDefaultVariableModeByCollectionId: vi.fn(),
  selectVariableModesByCollectionId: vi.fn(),
  selectSelectedCollectionModes: vi.fn(),
}));

describe('useVariableModes', () => {
  // Mock data
  const mockModes = [
    { id: 'mode-1', name: 'Light', type: 'color' },
    { id: 'mode-2', name: 'Dark', type: 'color' },
    { id: 'mode-3', name: 'Mobile', type: 'responsive' },
  ];

  const mockSelectedMode = mockModes[0];
  const mockSelectedCollectionModes = [mockModes[0], mockModes[1]];

  beforeEach(() => {
    vi.clearAllMocks();

    useSelector.mockImplementation((selector) => {
      if (selector === varModeSelectors.selectAllVariableModes) {
        return mockModes;
      }
      if (selector === varModeSelectors.selectSelectedVariableMode) {
        return mockSelectedMode;
      }
      if (selector === varModeSelectors.selectSelectedCollectionModes) {
        return mockSelectedCollectionModes;
      }
      if (typeof selector === 'function') {
        // Return mock functions for all factory selectors
        return vi.fn();
      }
      return undefined;
    });
  });

  // ===================================================================
  // BASIC FUNCTIONALITY TESTS
  // ===================================================================

  describe('Basic Functionality', () => {
    it('should return all variable modes', () => {
      const { result } = renderHook(() => useVariableModes());

      expect(result.current.allVariableModes).toEqual(mockModes);
      expect(result.current.allVariableModes).toHaveLength(3);
    });

    it('should return selected variable mode', () => {
      const { result } = renderHook(() => useVariableModes());

      expect(result.current.selectedVariableMode).toEqual(mockSelectedMode);
      expect(result.current.selectedVariableMode.id).toBe('mode-1');
    });

    it('should return selected collection modes', () => {
      const { result } = renderHook(() => useVariableModes());

      expect(result.current.selectedCollectionModes).toEqual(mockSelectedCollectionModes);
      expect(result.current.selectedCollectionModes).toHaveLength(2);
    });

    it('should return variableModesByType function', () => {
      const { result } = renderHook(() => useVariableModes());

      expect(result.current.variableModesByType).toBeDefined();
      expect(typeof result.current.variableModesByType).toBe('function');
    });

    it('should return variableModesByVariableModeGroupId function', () => {
      const { result } = renderHook(() => useVariableModes());

      expect(result.current.variableModesByVariableModeGroupId).toBeDefined();
      expect(typeof result.current.variableModesByVariableModeGroupId).toBe('function');
    });

    it('should return variableModesByModeGroupType function', () => {
      const { result } = renderHook(() => useVariableModes());

      expect(result.current.variableModesByModeGroupType).toBeDefined();
      expect(typeof result.current.variableModesByModeGroupType).toBe('function');
    });

    it('should return defaultVariableModeByIds function', () => {
      const { result } = renderHook(() => useVariableModes());

      expect(result.current.defaultVariableModeByIds).toBeDefined();
      expect(typeof result.current.defaultVariableModeByIds).toBe('function');
    });

    it('should return defaultVariableModeByCollectionId function', () => {
      const { result } = renderHook(() => useVariableModes());

      expect(result.current.defaultVariableModeByCollectionId).toBeDefined();
      expect(typeof result.current.defaultVariableModeByCollectionId).toBe('function');
    });

    it('should return variableModesByCollectionId function', () => {
      const { result } = renderHook(() => useVariableModes());

      expect(result.current.variableModesByCollectionId).toBeDefined();
      expect(typeof result.current.variableModesByCollectionId).toBe('function');
    });

    it('should return all nine properties', () => {
      const { result } = renderHook(() => useVariableModes());

      expect(Object.keys(result.current)).toHaveLength(9);
      expect(result.current).toHaveProperty('allVariableModes');
      expect(result.current).toHaveProperty('selectedVariableMode');
      expect(result.current).toHaveProperty('selectedCollectionModes');
    });
  });

  // ===================================================================
  // EMPTY STATE TESTS
  // ===================================================================

  describe('Empty States', () => {
    it('should handle empty mode list', () => {
      useSelector.mockImplementation((selector) => {
        if (selector === varModeSelectors.selectAllVariableModes) {
          return [];
        }
        if (selector === varModeSelectors.selectSelectedVariableMode) {
          return null;
        }
        if (selector === varModeSelectors.selectSelectedCollectionModes) {
          return [];
        }
        if (typeof selector === 'function') {
          return vi.fn();
        }
        return undefined;
      });

      const { result } = renderHook(() => useVariableModes());

      expect(result.current.allVariableModes).toEqual([]);
      expect(result.current.selectedVariableMode).toBeNull();
      expect(result.current.selectedCollectionModes).toEqual([]);
    });

    it('should handle no selected mode', () => {
      useSelector.mockImplementation((selector) => {
        if (selector === varModeSelectors.selectAllVariableModes) {
          return mockModes;
        }
        if (selector === varModeSelectors.selectSelectedVariableMode) {
          return null;
        }
        return undefined;
      });

      const { result } = renderHook(() => useVariableModes());

      expect(result.current.selectedVariableMode).toBeNull();
      expect(result.current.allVariableModes).toEqual(mockModes);
    });
  });
});

describe('useVariableMode', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // ===================================================================
  // BASIC FUNCTIONALITY TESTS
  // ===================================================================

  describe('Basic Functionality', () => {
    it('should return variableModeById function', () => {
      useSelector.mockImplementation((selector) => {
        if (typeof selector === 'function') {
          return vi.fn();
        }
        return undefined;
      });

      const { result } = renderHook(() => useVariableMode());

      expect(result.current.variableModeById).toBeDefined();
      expect(typeof result.current.variableModeById).toBe('function');
    });

    it('should return only variableModeById property', () => {
      useSelector.mockImplementation((selector) => {
        return vi.fn();
      });

      const { result } = renderHook(() => useVariableMode());

      expect(Object.keys(result.current)).toEqual(['variableModeById']);
    });
  });
});

describe('useVariableModesByIds', () => {
  const mockModes = [
    { id: 'mode-1', name: 'Light' },
    { id: 'mode-2', name: 'Dark' },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  // ===================================================================
  // BASIC FUNCTIONALITY TESTS
  // ===================================================================

  describe('Basic Functionality', () => {
    it('should return modes by provided IDs', () => {
      const targetIds = ['mode-1', 'mode-2'];

      useSelector.mockImplementation((selector) => {
        if (typeof selector === 'function') {
          return mockModes;
        }
        return undefined;
      });

      const { result } = renderHook(() => useVariableModesByIds(targetIds));

      expect(result.current.variableModes).toEqual(mockModes);
      expect(result.current.variableModes).toHaveLength(2);
    });

    it('should return single mode for single ID', () => {
      const targetIds = ['mode-1'];

      useSelector.mockImplementation((selector) => {
        if (typeof selector === 'function') {
          return [mockModes[0]];
        }
        return undefined;
      });

      const { result } = renderHook(() => useVariableModesByIds(targetIds));

      expect(result.current.variableModes).toHaveLength(1);
      expect(result.current.variableModes[0].id).toBe('mode-1');
    });

    it('should return empty array for empty IDs', () => {
      useSelector.mockImplementation((selector) => {
        if (typeof selector === 'function') {
          return [];
        }
        return undefined;
      });

      const { result } = renderHook(() => useVariableModesByIds([]));

      expect(result.current.variableModes).toEqual([]);
    });

    it('should return empty array for non-existent IDs', () => {
      useSelector.mockImplementation((selector) => {
        if (typeof selector === 'function') {
          return [];
        }
        return undefined;
      });

      const { result } = renderHook(() => useVariableModesByIds(['non-existent']));

      expect(result.current.variableModes).toEqual([]);
    });

    it('should handle null IDs parameter', () => {
      useSelector.mockImplementation((selector) => {
        if (typeof selector === 'function') {
          return [];
        }
        return undefined;
      });

      const { result } = renderHook(() => useVariableModesByIds(null));

      expect(result.current.variableModes).toEqual([]);
    });

    it('should handle undefined IDs parameter', () => {
      useSelector.mockImplementation((selector) => {
        if (typeof selector === 'function') {
          return [];
        }
        return undefined;
      });

      const { result } = renderHook(() => useVariableModesByIds(undefined));

      expect(result.current.variableModes).toEqual([]);
    });
  });
});

