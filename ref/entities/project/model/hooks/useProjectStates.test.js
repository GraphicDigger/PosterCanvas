// ===================================================================
// USE PROJECT STATES HOOK - COMPREHENSIVE TESTS
// ===================================================================
// Entity: project
// Hook: useProjectStates
// Purpose: Manages project UI states (hover, focus, selection)
// Coverage: State checks, actions, dispatch calls
// ===================================================================

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import { useProjectStates } from './useProjectStates';
import * as projectStore from '../store';

// Mock dependencies
vi.mock('react-redux', () => ({
  useDispatch: vi.fn(),
  useSelector: vi.fn(),
}));

vi.mock('../store', () => ({
  setHoveredProjectId: vi.fn((id) => ({ type: 'project/setHoveredProjectId', payload: id })),
  setFocusedProjectId: vi.fn((id) => ({ type: 'project/setFocusedProjectId', payload: id })),
  setSelectedProjectId: vi.fn((id) => ({ type: 'project/setSelectedProjectId', payload: id })),
  selectProjectCheckStates: vi.fn(),
}));

describe('useProjectStates', () => {
  let mockDispatch;

  beforeEach(() => {
    vi.clearAllMocks();
    mockDispatch = vi.fn();
    useDispatch.mockReturnValue(mockDispatch);
  });

  // ===================================================================
  // STATE SELECTION TESTS
  // ===================================================================

  describe('State Selection', () => {
    it('should return project states when all false', () => {
      useSelector.mockImplementation((selector) => {
        if (typeof selector === 'function') {
          return { isSelected: false, isFocused: false, isHovered: false };
        }
        return undefined;
      });

      const { result } = renderHook(() => useProjectStates('project-1'));

      expect(result.current.isSelected).toBe(false);
      expect(result.current.isFocused).toBe(false);
      expect(result.current.isHovered).toBe(false);
    });

    it('should return project states when selected', () => {
      useSelector.mockImplementation((selector) => {
        if (typeof selector === 'function') {
          return { isSelected: true, isFocused: false, isHovered: false };
        }
        return undefined;
      });

      const { result } = renderHook(() => useProjectStates('project-1'));

      expect(result.current.isSelected).toBe(true);
      expect(result.current.isFocused).toBe(false);
      expect(result.current.isHovered).toBe(false);
    });

    it('should return project states when focused', () => {
      useSelector.mockImplementation((selector) => {
        if (typeof selector === 'function') {
          return { isSelected: false, isFocused: true, isHovered: false };
        }
        return undefined;
      });

      const { result } = renderHook(() => useProjectStates('project-1'));

      expect(result.current.isFocused).toBe(true);
    });

    it('should return project states when hovered', () => {
      useSelector.mockImplementation((selector) => {
        if (typeof selector === 'function') {
          return { isSelected: false, isFocused: false, isHovered: true };
        }
        return undefined;
      });

      const { result } = renderHook(() => useProjectStates('project-1'));

      expect(result.current.isHovered).toBe(true);
    });

    it('should return project states when all true', () => {
      useSelector.mockImplementation((selector) => {
        if (typeof selector === 'function') {
          return { isSelected: true, isFocused: true, isHovered: true };
        }
        return undefined;
      });

      const { result } = renderHook(() => useProjectStates('project-1'));

      expect(result.current.isSelected).toBe(true);
      expect(result.current.isFocused).toBe(true);
      expect(result.current.isHovered).toBe(true);
    });
  });

  // ===================================================================
  // ACTION HANDLER TESTS
  // ===================================================================

  describe('Action Handlers', () => {
    beforeEach(() => {
      useSelector.mockImplementation((selector) => {
        if (typeof selector === 'function') {
          return { isSelected: false, isFocused: false, isHovered: false };
        }
        return undefined;
      });
    });

    it('should provide handleHover function', () => {
      const { result } = renderHook(() => useProjectStates('project-1'));

      expect(result.current.handleHover).toBeDefined();
      expect(typeof result.current.handleHover).toBe('function');
    });

    it('should provide handleFocus function', () => {
      const { result } = renderHook(() => useProjectStates('project-1'));

      expect(result.current.handleFocus).toBeDefined();
      expect(typeof result.current.handleFocus).toBe('function');
    });

    it('should provide handleSelect function', () => {
      const { result } = renderHook(() => useProjectStates('project-1'));

      expect(result.current.handleSelect).toBeDefined();
      expect(typeof result.current.handleSelect).toBe('function');
    });

    it('should dispatch setHoveredProjectId when handleHover is called', () => {
      const { result } = renderHook(() => useProjectStates('project-1'));

      act(() => {
        result.current.handleHover('project-2');
      });

      expect(mockDispatch).toHaveBeenCalledTimes(1);
      expect(projectStore.setHoveredProjectId).toHaveBeenCalledWith('project-2');
    });

    it('should dispatch setFocusedProjectId when handleFocus is called', () => {
      const { result } = renderHook(() => useProjectStates('project-1'));

      act(() => {
        result.current.handleFocus('project-3');
      });

      expect(mockDispatch).toHaveBeenCalledTimes(1);
      expect(projectStore.setFocusedProjectId).toHaveBeenCalledWith('project-3');
    });

    it('should dispatch setSelectedProjectId when handleSelect is called', () => {
      const { result } = renderHook(() => useProjectStates('project-1'));

      act(() => {
        result.current.handleSelect('project-4');
      });

      expect(mockDispatch).toHaveBeenCalledTimes(1);
      expect(projectStore.setSelectedProjectId).toHaveBeenCalledWith('project-4');
    });

    it('should handle multiple sequential actions', () => {
      const { result } = renderHook(() => useProjectStates('project-1'));

      act(() => {
        result.current.handleHover('project-2');
        result.current.handleFocus('project-2');
        result.current.handleSelect('project-2');
      });

      expect(mockDispatch).toHaveBeenCalledTimes(3);
    });
  });

  // ===================================================================
  // EDGE CASES
  // ===================================================================

  describe('Edge Cases', () => {
    beforeEach(() => {
      useSelector.mockImplementation((selector) => {
        if (typeof selector === 'function') {
          return { isSelected: false, isFocused: false, isHovered: false };
        }
        return undefined;
      });
    });

    it('should handle null project ID', () => {
      const { result } = renderHook(() => useProjectStates(null));

      expect(result.current).toBeDefined();
      expect(result.current.handleHover).toBeDefined();
    });

    it('should handle undefined project ID', () => {
      const { result } = renderHook(() => useProjectStates(undefined));

      expect(result.current).toBeDefined();
      expect(result.current.handleFocus).toBeDefined();
    });

    it('should handle calling handlers with null', () => {
      const { result } = renderHook(() => useProjectStates('project-1'));

      act(() => {
        result.current.handleHover(null);
      });

      expect(mockDispatch).toHaveBeenCalledTimes(1);
      expect(projectStore.setHoveredProjectId).toHaveBeenCalledWith(null);
    });

    it('should handle calling handlers with undefined', () => {
      const { result } = renderHook(() => useProjectStates('project-1'));

      act(() => {
        result.current.handleSelect(undefined);
      });

      expect(mockDispatch).toHaveBeenCalledTimes(1);
      expect(projectStore.setSelectedProjectId).toHaveBeenCalledWith(undefined);
    });
  });
});

