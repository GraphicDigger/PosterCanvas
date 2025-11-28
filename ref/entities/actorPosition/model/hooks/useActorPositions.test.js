// ===================================================================
// USE ACTOR POSITIONS HOOK - COMPREHENSIVE TESTS
// ===================================================================
// Entity: actorPosition
// Hooks: useActorPositions, useActorPositionsByIds
// Purpose: Provides access to actor positions from Redux store
// Coverage: All positions, selected position, positions by IDs
// ===================================================================

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useSelector } from 'react-redux';
import { useActorPositions, useActorPositionsByIds } from './useActorPositions';
import * as positionStore from '../store';

// Mock dependencies
vi.mock('react-redux', () => ({
  useSelector: vi.fn(),
}));

vi.mock('../store', () => ({
  selectAllActorPositions: vi.fn(),
  selectSelectedActorPosition: vi.fn(),
  selectActorPositionsByIds: vi.fn(),
}));

describe('useActorPositions', () => {
  // Mock data
  const mockPositions = [
    { id: 'pos-1', name: 'CEO', level: 'executive', department: 'Management' },
    { id: 'pos-2', name: 'CTO', level: 'executive', department: 'Technology' },
    { id: 'pos-3', name: 'Developer', level: 'staff', department: 'Engineering' },
    { id: 'pos-4', name: 'Designer', level: 'staff', department: 'Design' },
  ];

  const mockSelectedPosition = mockPositions[0];

  beforeEach(() => {
    vi.clearAllMocks();

    useSelector.mockImplementation((selector) => {
      if (selector === positionStore.selectAllActorPositions) {
        return mockPositions;
      }
      if (selector === positionStore.selectSelectedActorPosition) {
        return mockSelectedPosition;
      }
      return undefined;
    });
  });

  // ===================================================================
  // BASIC FUNCTIONALITY TESTS
  // ===================================================================

  describe('Basic Functionality', () => {
    it('should return all actor positions', () => {
      const { result } = renderHook(() => useActorPositions());

      expect(result.current.allActorPositions).toEqual(mockPositions);
      expect(result.current.allActorPositions).toHaveLength(4);
    });

    it('should return selected actor position', () => {
      const { result } = renderHook(() => useActorPositions());

      expect(result.current.selectedActorPosition).toEqual(mockSelectedPosition);
      expect(result.current.selectedActorPosition.id).toBe('pos-1');
    });

    it('should return both properties', () => {
      const { result } = renderHook(() => useActorPositions());

      expect(result.current).toHaveProperty('allActorPositions');
      expect(result.current).toHaveProperty('selectedActorPosition');
    });

    it('should have correct position structure', () => {
      const { result } = renderHook(() => useActorPositions());

      const position = result.current.allActorPositions[0];
      expect(position).toHaveProperty('id');
      expect(position).toHaveProperty('name');
      expect(position).toHaveProperty('level');
      expect(position).toHaveProperty('department');
    });
  });

  // ===================================================================
  // POSITION LEVELS TESTS
  // ===================================================================

  describe('Position Levels', () => {
    it('should handle executive level positions', () => {
      const { result } = renderHook(() => useActorPositions());

      const executives = result.current.allActorPositions.filter(p => p.level === 'executive');
      expect(executives).toHaveLength(2);
      expect(executives.map(e => e.name)).toContain('CEO');
      expect(executives.map(e => e.name)).toContain('CTO');
    });

    it('should handle staff level positions', () => {
      const { result } = renderHook(() => useActorPositions());

      const staff = result.current.allActorPositions.filter(p => p.level === 'staff');
      expect(staff).toHaveLength(2);
      expect(staff.map(s => s.name)).toContain('Developer');
      expect(staff.map(s => s.name)).toContain('Designer');
    });

    it('should distinguish between levels', () => {
      const { result } = renderHook(() => useActorPositions());

      const levels = [...new Set(result.current.allActorPositions.map(p => p.level))];
      expect(levels).toContain('executive');
      expect(levels).toContain('staff');
    });
  });

  // ===================================================================
  // DEPARTMENT TESTS
  // ===================================================================

  describe('Departments', () => {
    it('should handle Management department', () => {
      const { result } = renderHook(() => useActorPositions());

      const mgmt = result.current.allActorPositions.find(p => p.department === 'Management');
      expect(mgmt).toBeDefined();
      expect(mgmt.name).toBe('CEO');
    });

    it('should handle Technology department', () => {
      const { result } = renderHook(() => useActorPositions());

      const tech = result.current.allActorPositions.find(p => p.department === 'Technology');
      expect(tech).toBeDefined();
      expect(tech.name).toBe('CTO');
    });

    it('should handle Engineering department', () => {
      const { result } = renderHook(() => useActorPositions());

      const eng = result.current.allActorPositions.find(p => p.department === 'Engineering');
      expect(eng).toBeDefined();
      expect(eng.name).toBe('Developer');
    });

    it('should handle Design department', () => {
      const { result } = renderHook(() => useActorPositions());

      const design = result.current.allActorPositions.find(p => p.department === 'Design');
      expect(design).toBeDefined();
      expect(design.name).toBe('Designer');
    });
  });

  // ===================================================================
  // EMPTY STATE TESTS
  // ===================================================================

  describe('Empty States', () => {
    it('should handle empty positions list', () => {
      useSelector.mockImplementation((selector) => {
        if (selector === positionStore.selectAllActorPositions) {
          return [];
        }
        if (selector === positionStore.selectSelectedActorPosition) {
          return null;
        }
        return undefined;
      });

      const { result } = renderHook(() => useActorPositions());

      expect(result.current.allActorPositions).toEqual([]);
      expect(result.current.selectedActorPosition).toBeNull();
    });

    it('should handle no selected position', () => {
      useSelector.mockImplementation((selector) => {
        if (selector === positionStore.selectAllActorPositions) {
          return mockPositions;
        }
        if (selector === positionStore.selectSelectedActorPosition) {
          return null;
        }
        return undefined;
      });

      const { result } = renderHook(() => useActorPositions());

      expect(result.current.allActorPositions).toEqual(mockPositions);
      expect(result.current.selectedActorPosition).toBeNull();
    });
  });
});

describe('useActorPositionsByIds', () => {
  const mockPositions = [
    { id: 'pos-1', name: 'CEO' },
    { id: 'pos-2', name: 'CTO' },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  // ===================================================================
  // BASIC FUNCTIONALITY TESTS
  // ===================================================================

  describe('Basic Functionality', () => {
    it('should return positions by provided IDs', () => {
      const targetIds = ['pos-1', 'pos-2'];

      useSelector.mockImplementation((selector) => {
        if (typeof selector === 'function') {
          return mockPositions;
        }
        return undefined;
      });

      const { result } = renderHook(() => useActorPositionsByIds(targetIds));

      expect(result.current.ActorPositions).toEqual(mockPositions);
      expect(result.current.ActorPositions).toHaveLength(2);
    });

    it('should return single position for single ID', () => {
      const targetIds = ['pos-1'];

      useSelector.mockImplementation((selector) => {
        if (typeof selector === 'function') {
          return [mockPositions[0]];
        }
        return undefined;
      });

      const { result } = renderHook(() => useActorPositionsByIds(targetIds));

      expect(result.current.ActorPositions).toHaveLength(1);
      expect(result.current.ActorPositions[0].id).toBe('pos-1');
    });

    it('should return empty array for empty IDs', () => {
      useSelector.mockImplementation((selector) => {
        if (typeof selector === 'function') {
          return [];
        }
        return undefined;
      });

      const { result } = renderHook(() => useActorPositionsByIds([]));

      expect(result.current.ActorPositions).toEqual([]);
    });

    it('should return empty array for non-existent IDs', () => {
      useSelector.mockImplementation((selector) => {
        if (typeof selector === 'function') {
          return [];
        }
        return undefined;
      });

      const { result } = renderHook(() => useActorPositionsByIds(['non-existent']));

      expect(result.current.ActorPositions).toEqual([]);
    });

    it('should handle null IDs parameter', () => {
      useSelector.mockImplementation((selector) => {
        if (typeof selector === 'function') {
          return [];
        }
        return undefined;
      });

      const { result } = renderHook(() => useActorPositionsByIds(null));

      expect(result.current.ActorPositions).toEqual([]);
    });
  });
});

