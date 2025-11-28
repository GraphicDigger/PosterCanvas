// ===================================================================
// MODE MANAGEMENT TESTS: Global Modes Hook
// 🔴 CRITICAL-FIRST STRATEGY - Phase 6 Part 1 🔴
// Mode Transitions, State Management, Callbacks
// ===================================================================

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useGlobalModes } from './useGlobalModes';
import { useDispatch, useSelector } from 'react-redux';

// Mock Redux hooks
vi.mock('react-redux', () => ({
  useDispatch: vi.fn(),
  useSelector: vi.fn(),
}));

// Mock constants
vi.mock('../..', () => ({
  GLOBAL_MODES: {
    DESIGN: 'design',
    PREVIEW: 'preview',
    CODEBASE: 'codebase',
    DATABASE: 'database',
    GLOBAL_SEARCH: 'global_search',
    WIREFRAME: 'wireframe',
  },
}));

// Mock slice actions
vi.mock('../store/slice', () => ({
  setGlobalMode: vi.fn((mode) => ({ type: 'setGlobalMode', payload: mode })),
  toggleDesignCodebase: vi.fn(() => ({ type: 'toggleDesignCodebase' })),
  resetGlobalMode: vi.fn(() => ({ type: 'resetGlobalMode' })),
}));

// Mock selectors
vi.mock('../store/selectors', () => ({
  selectIsDesignMode: vi.fn(),
  selectIsPreviewMode: vi.fn(),
  selectIsCodebaseMode: vi.fn(),
  selectIsDatabaseMode: vi.fn(),
  selectIsGlobalSearchMode: vi.fn(),
  selectIsWireframeMode: vi.fn(),
}));

import {
  selectIsDesignMode,
  selectIsPreviewMode,
  selectIsCodebaseMode,
  selectIsDatabaseMode,
  selectIsGlobalSearchMode,
  selectIsWireframeMode,
} from '../store/selectors';

describe('useGlobalModes Hook - CRITICAL BUSINESS LOGIC', () => {
  let mockDispatch;

  beforeEach(() => {
    vi.clearAllMocks();
    mockDispatch = vi.fn();
    useDispatch.mockReturnValue(mockDispatch);

    // Mock useSelector to call the selector and return its result
    useSelector.mockImplementation((selector) => selector());

    // Default selector values
    selectIsDesignMode.mockReturnValue(true);
    selectIsPreviewMode.mockReturnValue(false);
    selectIsCodebaseMode.mockReturnValue(false);
    selectIsDatabaseMode.mockReturnValue(false);
    selectIsGlobalSearchMode.mockReturnValue(false);
    selectIsWireframeMode.mockReturnValue(false);
  });

  // ===================================================================
  // Section 1: Mode Selection State (6 tests)
  // ===================================================================

  describe('Mode Selection State', () => {
    it('should return isDesignModeGlobal from selector', () => {
      selectIsDesignMode.mockReturnValue(true);

      const { result } = renderHook(() => useGlobalModes());

      expect(result.current.isDesignModeGlobal).toBe(true);
      expect(selectIsDesignMode).toHaveBeenCalled();
    });

    it('should return isPreviewModeGlobal from selector', () => {
      selectIsPreviewMode.mockReturnValue(true);

      const { result } = renderHook(() => useGlobalModes());

      expect(result.current.isPreviewModeGlobal).toBe(true);
      expect(selectIsPreviewMode).toHaveBeenCalled();
    });

    it('should return isCodebaseModeGlobal from selector', () => {
      selectIsCodebaseMode.mockReturnValue(true);

      const { result } = renderHook(() => useGlobalModes());

      expect(result.current.isCodebaseModeGlobal).toBe(true);
      expect(selectIsCodebaseMode).toHaveBeenCalled();
    });

    it('should return isDatabaseModeGlobal from selector', () => {
      selectIsDatabaseMode.mockReturnValue(true);

      const { result } = renderHook(() => useGlobalModes());

      expect(result.current.isDatabaseModeGlobal).toBe(true);
      expect(selectIsDatabaseMode).toHaveBeenCalled();
    });

    it('should return isGlobalSearchMode from selector', () => {
      selectIsGlobalSearchMode.mockReturnValue(true);

      const { result } = renderHook(() => useGlobalModes());

      expect(result.current.isGlobalSearchMode).toBe(true);
      expect(selectIsGlobalSearchMode).toHaveBeenCalled();
    });

    it('should return isWireframeModeGlobal from selector', () => {
      selectIsWireframeMode.mockReturnValue(true);

      const { result } = renderHook(() => useGlobalModes());

      expect(result.current.isWireframeModeGlobal).toBe(true);
      expect(selectIsWireframeMode).toHaveBeenCalled();
    });
  });

  // ===================================================================
  // Section 2: Mode Setting Actions (6 tests)
  // ===================================================================

  describe('Mode Setting Actions', () => {
    it('should dispatch setGlobalDesignMode', () => {
      const { result } = renderHook(() => useGlobalModes());

      act(() => {
        result.current.setGlobalDesignMode();
      });

      expect(mockDispatch).toHaveBeenCalledWith(
        expect.objectContaining({ type: 'setGlobalMode', payload: 'design' }),
      );
    });

    it('should dispatch setGlobalPreviewMode', () => {
      const { result } = renderHook(() => useGlobalModes());

      act(() => {
        result.current.setGlobalPreviewMode();
      });

      expect(mockDispatch).toHaveBeenCalledWith(
        expect.objectContaining({ type: 'setGlobalMode', payload: 'preview' }),
      );
    });

    it('should dispatch setGlobalCodebaseMode', () => {
      const { result } = renderHook(() => useGlobalModes());

      act(() => {
        result.current.setGlobalCodebaseMode();
      });

      expect(mockDispatch).toHaveBeenCalledWith(
        expect.objectContaining({ type: 'setGlobalMode', payload: 'codebase' }),
      );
    });

    it('should dispatch setGlobalDatabaseMode', () => {
      const { result } = renderHook(() => useGlobalModes());

      act(() => {
        result.current.setGlobalDatabaseMode();
      });

      expect(mockDispatch).toHaveBeenCalledWith(
        expect.objectContaining({ type: 'setGlobalMode', payload: 'database' }),
      );
    });

    it('should dispatch setGlobalSearchMode', () => {
      const { result } = renderHook(() => useGlobalModes());

      act(() => {
        result.current.setGlobalSearchMode();
      });

      expect(mockDispatch).toHaveBeenCalledWith(
        expect.objectContaining({ type: 'setGlobalMode', payload: 'global_search' }),
      );
    });

    it('should dispatch setGlobalWireframeMode', () => {
      const { result } = renderHook(() => useGlobalModes());

      act(() => {
        result.current.setGlobalWireframeMode();
      });

      expect(mockDispatch).toHaveBeenCalledWith(
        expect.objectContaining({ type: 'setGlobalMode', payload: 'wireframe' }),
      );
    });
  });

  // ===================================================================
  // Section 3: Toggle & Reset Actions (3 tests)
  // ===================================================================

  describe('Toggle & Reset Actions', () => {
    it('should dispatch toggleModesDesignCodebase', () => {
      const { result } = renderHook(() => useGlobalModes());

      act(() => {
        result.current.toggleModesDesignCodebase();
      });

      expect(mockDispatch).toHaveBeenCalledWith(
        expect.objectContaining({ type: 'toggleDesignCodebase' }),
      );
    });

    it('should dispatch resetGlobalMode', () => {
      const { result } = renderHook(() => useGlobalModes());

      act(() => {
        result.current.resetGlobalMode();
      });

      expect(mockDispatch).toHaveBeenCalledWith(
        expect.objectContaining({ type: 'resetGlobalMode' }),
      );
    });

    it('should have stable callback references', () => {
      const { result, rerender } = renderHook(() => useGlobalModes());

      const initialSetDesign = result.current.setGlobalDesignMode;
      const initialToggle = result.current.toggleModesDesignCodebase;
      const initialReset = result.current.resetGlobalMode;

      rerender();

      // Callbacks should maintain same reference (useCallback optimization)
      expect(result.current.setGlobalDesignMode).toBe(initialSetDesign);
      expect(result.current.toggleModesDesignCodebase).toBe(initialToggle);
      expect(result.current.resetGlobalMode).toBe(initialReset);
    });
  });
});

