// ===================================================================
// Unit Tests for Action State Management
// CRITICAL BUSINESS LOGIC - Action UI States (Hover, Focus, Select)
// Phase 5, Week 1, Day 5 - Action System (Part 3: 50 tests)
// ===================================================================

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useActionStates } from './useActionStates';

// Mock Redux
vi.mock('react-redux', () => ({
  useDispatch: vi.fn(),
  useSelector: vi.fn(),
}));

vi.mock('../store/slice', () => ({
  setHoveredActionId: vi.fn((id) => ({ type: 'actionEntity/setHoveredActionId', payload: id })),
  setFocusedActionId: vi.fn((id) => ({ type: 'actionEntity/setFocusedActionId', payload: id })),
  setSelectedActionId: vi.fn((id) => ({ type: 'actionEntity/setSelectedActionId', payload: id })),
}));

vi.mock('../store/selectors', () => ({
  selectActionCheckStates: vi.fn((state, actionId) => ({
    isSelected: state.actionEntity.ui.selectedActionId === actionId,
    isFocused: state.actionEntity.ui.focusedActionId === actionId,
    isHovered: state.actionEntity.ui.hoveredActionId === actionId,
  })),
}));

import { useDispatch, useSelector } from 'react-redux';
import { setHoveredActionId, setFocusedActionId, setSelectedActionId } from '../store/slice';

describe('Action State Management', () => {
  let mockDispatch: ReturnType<typeof vi.fn>;
  let mockState: any;

  beforeEach(() => {
    mockDispatch = vi.fn();
    mockState = {
      actionEntity: {
        ui: {
          hoveredActionId: null,
          focusedActionId: null,
          selectedActionId: null,
        },
      },
    };

    (useDispatch as any).mockReturnValue(mockDispatch);
    (useSelector as any).mockImplementation((selector: any) => selector(mockState));
    vi.clearAllMocks();
  });

  // ===================================================================
  // PART 1: Hover State (12 tests)
  // ===================================================================

  describe('Hover State', () => {
    it('should set hovered action ID', () => {
      const { result } = renderHook(() => useActionStates('action-1'));

      act(() => {
        result.current.handleHover('action-1');
      });

      expect(mockDispatch).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'actionEntity/setHoveredActionId',
          payload: 'action-1',
        }),
      );
    });

    it('should detect when action is hovered', () => {
      mockState.actionEntity.ui.hoveredActionId = 'action-1';

      const { result } = renderHook(() => useActionStates('action-1'));

      expect(result.current.isHovered).toBe(true);
    });

    it('should detect when action is not hovered', () => {
      mockState.actionEntity.ui.hoveredActionId = 'action-2';

      const { result } = renderHook(() => useActionStates('action-1'));

      expect(result.current.isHovered).toBe(false);
    });

    it('should handle hover on different action', () => {
      const { result } = renderHook(() => useActionStates('action-1'));

      act(() => {
        result.current.handleHover('action-2');
      });

      expect(mockDispatch).toHaveBeenCalledWith(
        expect.objectContaining({
          payload: 'action-2',
        }),
      );
    });

    it('should handle hover with null ID', () => {
      const { result } = renderHook(() => useActionStates('action-1'));

      act(() => {
        result.current.handleHover(null);
      });

      expect(mockDispatch).toHaveBeenCalledWith(
        expect.objectContaining({
          payload: null,
        }),
      );
    });

    it('should handle hover with undefined ID', () => {
      const { result } = renderHook(() => useActionStates('action-1'));

      act(() => {
        result.current.handleHover(undefined);
      });

      expect(mockDispatch).toHaveBeenCalled();
    });

    it('should handle hover with empty string ID', () => {
      const { result } = renderHook(() => useActionStates('action-1'));

      act(() => {
        result.current.handleHover('');
      });

      expect(mockDispatch).toHaveBeenCalledWith(
        expect.objectContaining({
          payload: '',
        }),
      );
    });

    it('should handle rapid hover changes', () => {
      const { result } = renderHook(() => useActionStates('action-1'));

      act(() => {
        result.current.handleHover('action-1');
        result.current.handleHover('action-2');
        result.current.handleHover('action-3');
      });

      expect(mockDispatch).toHaveBeenCalledTimes(3);
    });

    it('should call setHoveredActionId action creator', () => {
      const { result } = renderHook(() => useActionStates('action-1'));

      act(() => {
        result.current.handleHover('action-1');
      });

      expect(setHoveredActionId).toHaveBeenCalledWith('action-1');
    });

    it('should handle hover on same action multiple times', () => {
      const { result } = renderHook(() => useActionStates('action-1'));

      act(() => {
        result.current.handleHover('action-1');
        result.current.handleHover('action-1');
      });

      expect(mockDispatch).toHaveBeenCalledTimes(2);
    });

    it('should handle numeric action ID for hover', () => {
      const { result } = renderHook(() => useActionStates('action-1'));

      act(() => {
        result.current.handleHover(12345 as any);
      });

      expect(mockDispatch).toHaveBeenCalled();
    });

    it('should detect hover state correctly after update', () => {
      mockState.actionEntity.ui.hoveredActionId = null;

      const { result, rerender } = renderHook(() => useActionStates('action-1'));
      expect(result.current.isHovered).toBe(false);

      mockState.actionEntity.ui.hoveredActionId = 'action-1';
      rerender();

      expect(result.current.isHovered).toBe(true);
    });
  });

  // ===================================================================
  // PART 2: Focus State (13 tests)
  // ===================================================================

  describe('Focus State', () => {
    it('should set focused action ID', () => {
      const { result } = renderHook(() => useActionStates('action-1'));

      act(() => {
        result.current.handleFocus('action-1');
      });

      expect(mockDispatch).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'actionEntity/setFocusedActionId',
          payload: 'action-1',
        }),
      );
    });

    it('should detect when action is focused', () => {
      mockState.actionEntity.ui.focusedActionId = 'action-1';

      const { result } = renderHook(() => useActionStates('action-1'));

      expect(result.current.isFocused).toBe(true);
    });

    it('should detect when action is not focused', () => {
      mockState.actionEntity.ui.focusedActionId = 'action-2';

      const { result } = renderHook(() => useActionStates('action-1'));

      expect(result.current.isFocused).toBe(false);
    });

    it('should handle focus on different action', () => {
      const { result } = renderHook(() => useActionStates('action-1'));

      act(() => {
        result.current.handleFocus('action-2');
      });

      expect(mockDispatch).toHaveBeenCalledWith(
        expect.objectContaining({
          payload: 'action-2',
        }),
      );
    });

    it('should handle focus with null ID', () => {
      const { result } = renderHook(() => useActionStates('action-1'));

      act(() => {
        result.current.handleFocus(null);
      });

      expect(mockDispatch).toHaveBeenCalledWith(
        expect.objectContaining({
          payload: null,
        }),
      );
    });

    it('should handle focus with undefined ID', () => {
      const { result } = renderHook(() => useActionStates('action-1'));

      act(() => {
        result.current.handleFocus(undefined);
      });

      expect(mockDispatch).toHaveBeenCalled();
    });

    it('should handle focus with empty string ID', () => {
      const { result } = renderHook(() => useActionStates('action-1'));

      act(() => {
        result.current.handleFocus('');
      });

      expect(mockDispatch).toHaveBeenCalledWith(
        expect.objectContaining({
          payload: '',
        }),
      );
    });

    it('should handle rapid focus changes', () => {
      const { result } = renderHook(() => useActionStates('action-1'));

      act(() => {
        result.current.handleFocus('action-1');
        result.current.handleFocus('action-2');
        result.current.handleFocus('action-3');
        result.current.handleFocus('action-4');
      });

      expect(mockDispatch).toHaveBeenCalledTimes(4);
    });

    it('should call setFocusedActionId action creator', () => {
      const { result } = renderHook(() => useActionStates('action-1'));

      act(() => {
        result.current.handleFocus('action-1');
      });

      expect(setFocusedActionId).toHaveBeenCalledWith('action-1');
    });

    it('should handle focus on same action multiple times', () => {
      const { result } = renderHook(() => useActionStates('action-1'));

      act(() => {
        result.current.handleFocus('action-1');
        result.current.handleFocus('action-1');
      });

      expect(mockDispatch).toHaveBeenCalledTimes(2);
    });

    it('should handle numeric action ID for focus', () => {
      const { result } = renderHook(() => useActionStates('action-1'));

      act(() => {
        result.current.handleFocus(12345 as any);
      });

      expect(mockDispatch).toHaveBeenCalled();
    });

    it('should detect focus state correctly after update', () => {
      mockState.actionEntity.ui.focusedActionId = null;

      const { result, rerender } = renderHook(() => useActionStates('action-1'));
      expect(result.current.isFocused).toBe(false);

      mockState.actionEntity.ui.focusedActionId = 'action-1';
      rerender();

      expect(result.current.isFocused).toBe(true);
    });

    it('should handle focus transition between actions', () => {
      mockState.actionEntity.ui.focusedActionId = 'action-1';

      const { result, rerender } = renderHook(() => useActionStates('action-1'));
      expect(result.current.isFocused).toBe(true);

      mockState.actionEntity.ui.focusedActionId = 'action-2';
      rerender();

      expect(result.current.isFocused).toBe(false);
    });
  });

  // ===================================================================
  // PART 3: Select State (13 tests)
  // ===================================================================

  describe('Select State', () => {
    it('should set selected action ID', () => {
      const { result } = renderHook(() => useActionStates('action-1'));

      act(() => {
        result.current.handleSelect('action-1');
      });

      expect(mockDispatch).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'actionEntity/setSelectedActionId',
          payload: 'action-1',
        }),
      );
    });

    it('should detect when action is selected', () => {
      mockState.actionEntity.ui.selectedActionId = 'action-1';

      const { result } = renderHook(() => useActionStates('action-1'));

      expect(result.current.isSelected).toBe(true);
    });

    it('should detect when action is not selected', () => {
      mockState.actionEntity.ui.selectedActionId = 'action-2';

      const { result } = renderHook(() => useActionStates('action-1'));

      expect(result.current.isSelected).toBe(false);
    });

    it('should handle select on different action', () => {
      const { result } = renderHook(() => useActionStates('action-1'));

      act(() => {
        result.current.handleSelect('action-2');
      });

      expect(mockDispatch).toHaveBeenCalledWith(
        expect.objectContaining({
          payload: 'action-2',
        }),
      );
    });

    it('should handle select with null ID', () => {
      const { result } = renderHook(() => useActionStates('action-1'));

      act(() => {
        result.current.handleSelect(null);
      });

      expect(mockDispatch).toHaveBeenCalledWith(
        expect.objectContaining({
          payload: null,
        }),
      );
    });

    it('should handle select with undefined ID', () => {
      const { result } = renderHook(() => useActionStates('action-1'));

      act(() => {
        result.current.handleSelect(undefined);
      });

      expect(mockDispatch).toHaveBeenCalled();
    });

    it('should handle select with empty string ID', () => {
      const { result } = renderHook(() => useActionStates('action-1'));

      act(() => {
        result.current.handleSelect('');
      });

      expect(mockDispatch).toHaveBeenCalledWith(
        expect.objectContaining({
          payload: '',
        }),
      );
    });

    it('should handle rapid select changes', () => {
      const { result } = renderHook(() => useActionStates('action-1'));

      act(() => {
        result.current.handleSelect('action-1');
        result.current.handleSelect('action-2');
        result.current.handleSelect('action-3');
      });

      expect(mockDispatch).toHaveBeenCalledTimes(3);
    });

    it('should call setSelectedActionId action creator', () => {
      const { result } = renderHook(() => useActionStates('action-1'));

      act(() => {
        result.current.handleSelect('action-1');
      });

      expect(setSelectedActionId).toHaveBeenCalledWith('action-1');
    });

    it('should handle select on same action multiple times', () => {
      const { result } = renderHook(() => useActionStates('action-1'));

      act(() => {
        result.current.handleSelect('action-1');
        result.current.handleSelect('action-1');
      });

      expect(mockDispatch).toHaveBeenCalledTimes(2);
    });

    it('should handle numeric action ID for select', () => {
      const { result } = renderHook(() => useActionStates('action-1'));

      act(() => {
        result.current.handleSelect(12345 as any);
      });

      expect(mockDispatch).toHaveBeenCalled();
    });

    it('should detect select state correctly after update', () => {
      mockState.actionEntity.ui.selectedActionId = null;

      const { result, rerender } = renderHook(() => useActionStates('action-1'));
      expect(result.current.isSelected).toBe(false);

      mockState.actionEntity.ui.selectedActionId = 'action-1';
      rerender();

      expect(result.current.isSelected).toBe(true);
    });

    it('should handle select transition between actions', () => {
      mockState.actionEntity.ui.selectedActionId = 'action-1';

      const { result, rerender } = renderHook(() => useActionStates('action-1'));
      expect(result.current.isSelected).toBe(true);

      mockState.actionEntity.ui.selectedActionId = 'action-2';
      rerender();

      expect(result.current.isSelected).toBe(false);
    });
  });

  // ===================================================================
  // PART 4: Combined State Operations (12 tests)
  // ===================================================================

  describe('Combined State Operations', () => {
    it('should handle hover, focus, and select on same action', () => {
      const { result } = renderHook(() => useActionStates('action-1'));

      act(() => {
        result.current.handleHover('action-1');
        result.current.handleFocus('action-1');
        result.current.handleSelect('action-1');
      });

      expect(mockDispatch).toHaveBeenCalledTimes(3);
    });

    it('should track all three states independently', () => {
      mockState.actionEntity.ui.hoveredActionId = 'action-1';
      mockState.actionEntity.ui.focusedActionId = 'action-2';
      mockState.actionEntity.ui.selectedActionId = 'action-3';

      const { result: result1 } = renderHook(() => useActionStates('action-1'));
      const { result: result2 } = renderHook(() => useActionStates('action-2'));
      const { result: result3 } = renderHook(() => useActionStates('action-3'));

      expect(result1.current.isHovered).toBe(true);
      expect(result2.current.isFocused).toBe(true);
      expect(result3.current.isSelected).toBe(true);
    });

    it('should handle all states being null', () => {
      const { result } = renderHook(() => useActionStates('action-1'));

      expect(result.current.isHovered).toBe(false);
      expect(result.current.isFocused).toBe(false);
      expect(result.current.isSelected).toBe(false);
    });

    it('should handle all states pointing to same action', () => {
      mockState.actionEntity.ui.hoveredActionId = 'action-1';
      mockState.actionEntity.ui.focusedActionId = 'action-1';
      mockState.actionEntity.ui.selectedActionId = 'action-1';

      const { result } = renderHook(() => useActionStates('action-1'));

      expect(result.current.isHovered).toBe(true);
      expect(result.current.isFocused).toBe(true);
      expect(result.current.isSelected).toBe(true);
    });

    it('should handle sequential state changes', () => {
      const { result } = renderHook(() => useActionStates('action-1'));

      act(() => {
        result.current.handleHover('action-1');
      });

      act(() => {
        result.current.handleFocus('action-1');
      });

      act(() => {
        result.current.handleSelect('action-1');
      });

      expect(mockDispatch).toHaveBeenCalledTimes(3);
    });

    it('should handle state changes on different actions', () => {
      const { result } = renderHook(() => useActionStates('action-1'));

      act(() => {
        result.current.handleHover('action-1');
        result.current.handleFocus('action-2');
        result.current.handleSelect('action-3');
      });

      expect(mockDispatch).toHaveBeenCalledTimes(3);
    });

    it('should return all handler functions', () => {
      const { result } = renderHook(() => useActionStates('action-1'));

      expect(typeof result.current.handleHover).toBe('function');
      expect(typeof result.current.handleFocus).toBe('function');
      expect(typeof result.current.handleSelect).toBe('function');
    });

    it('should return all state flags', () => {
      const { result } = renderHook(() => useActionStates('action-1'));

      expect(typeof result.current.isHovered).toBe('boolean');
      expect(typeof result.current.isFocused).toBe('boolean');
      expect(typeof result.current.isSelected).toBe('boolean');
    });

    it('should handle rapid combined state changes', () => {
      const { result } = renderHook(() => useActionStates('action-1'));

      act(() => {
        for (let i = 0; i < 5; i++) {
          result.current.handleHover(`action-${i}`);
          result.current.handleFocus(`action-${i}`);
          result.current.handleSelect(`action-${i}`);
        }
      });

      expect(mockDispatch).toHaveBeenCalledTimes(15);
    });

    it('should handle state changes with special characters in ID', () => {
      const specialId = 'action-!@#$%';
      const { result } = renderHook(() => useActionStates(specialId));

      act(() => {
        result.current.handleHover(specialId);
        result.current.handleFocus(specialId);
        result.current.handleSelect(specialId);
      });

      expect(mockDispatch).toHaveBeenCalledTimes(3);
    });

    it('should handle state detection for action with special ID', () => {
      const specialId = 'action-!@#$%';
      mockState.actionEntity.ui.hoveredActionId = specialId;
      mockState.actionEntity.ui.focusedActionId = specialId;
      mockState.actionEntity.ui.selectedActionId = specialId;

      const { result } = renderHook(() => useActionStates(specialId));

      expect(result.current.isHovered).toBe(true);
      expect(result.current.isFocused).toBe(true);
      expect(result.current.isSelected).toBe(true);
    });

    it('should handle state changes with numeric IDs', () => {
      const { result } = renderHook(() => useActionStates(12345 as any));

      act(() => {
        result.current.handleHover(12345 as any);
        result.current.handleFocus(12345 as any);
        result.current.handleSelect(12345 as any);
      });

      expect(mockDispatch).toHaveBeenCalledTimes(3);
    });
  });
});

