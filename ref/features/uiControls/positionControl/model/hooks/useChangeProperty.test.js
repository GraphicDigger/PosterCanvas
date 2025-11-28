// ===================================================================
// Unit Tests for useChangeProperty Hook
// CRITICAL BUSINESS LOGIC - Position Mode Control System
// Phase 5, Week 1, Day 1 - Canvas Rendering (Part 1: 25 tests)
// ===================================================================

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useChangeProperty } from './useChangeProperty';
import { POSITION_MODES } from '../constants/positionMode';
import { STYLE_PROPERTIES, POSITION } from '../../../../../entities/uiElement';

// Mock dependencies
vi.mock('../../../../../entities/uiElement', async () => {
  const actual = await vi.importActual('../../../../../entities/uiElement');
  return {
    ...actual,
    useElement: vi.fn(),
    useElementMutations: vi.fn(),
  };
});

vi.mock('../../../../../entities/binding', () => ({
  useBoundVariableValue: vi.fn(),
}));

import { useElement, useElementMutations } from '../../../../../entities/uiElement';
import { useBoundVariableValue } from '../../../../../entities/binding';

describe('useChangeProperty - Position Mode Control', () => {
  let mockUpdateStyle;
  let mockRemoveStyle;
  let mockFocusedElement;

  beforeEach(() => {
    // Reset mocks
    mockUpdateStyle = vi.fn();
    mockRemoveStyle = vi.fn();
    mockFocusedElement = { id: 'element-123' };

    useElement.mockReturnValue({
      focusedElement: mockFocusedElement,
    });

    useElementMutations.mockReturnValue({
      updateStyle: mockUpdateStyle,
      removeStyle: mockRemoveStyle,
    });

    useBoundVariableValue.mockReturnValue({
      positionValue: { value: POSITION.static },
    });
  });

  // ===================================================================
  // PART 1: currentMode Calculation (5 tests)
  // ===================================================================

  describe('currentMode Calculation', () => {
    it('should return STATIC mode when position is static', () => {
      useBoundVariableValue.mockReturnValue({
        positionValue: { value: POSITION.static },
      });

      const { result } = renderHook(() => useChangeProperty());

      expect(result.current.currentMode).toBe(POSITION_MODES.STATIC);
    });

    it('should return AUTO mode when position is relative', () => {
      useBoundVariableValue.mockReturnValue({
        positionValue: { value: POSITION.relative },
      });

      const { result } = renderHook(() => useChangeProperty());

      expect(result.current.currentMode).toBe(POSITION_MODES.AUTO);
    });

    it('should return FREE mode when position is absolute', () => {
      useBoundVariableValue.mockReturnValue({
        positionValue: { value: POSITION.absolute },
      });

      const { result } = renderHook(() => useChangeProperty());

      expect(result.current.currentMode).toBe(POSITION_MODES.FREE);
    });

    it('should return FIXED mode when position is fixed', () => {
      useBoundVariableValue.mockReturnValue({
        positionValue: { value: POSITION.fixed },
      });

      const { result } = renderHook(() => useChangeProperty());

      expect(result.current.currentMode).toBe(POSITION_MODES.FIXED);
    });

    it('should return STICKY mode when position is sticky', () => {
      useBoundVariableValue.mockReturnValue({
        positionValue: { value: POSITION.sticky },
      });

      const { result } = renderHook(() => useChangeProperty());

      expect(result.current.currentMode).toBe(POSITION_MODES.STICKY);
    });
  });

  // ===================================================================
  // PART 2: changePositionMode - Basic Modes (5 tests)
  // ===================================================================

  describe('changePositionMode - Basic Modes', () => {
    it('should change to STATIC mode', () => {
      const { result } = renderHook(() => useChangeProperty());

      act(() => {
        result.current.changePositionMode(POSITION_MODES.STATIC);
      });

      expect(mockUpdateStyle).toHaveBeenCalledWith('element-123', {
        [STYLE_PROPERTIES.position]: POSITION.static,
      });
    });

    it('should change to AUTO (relative) mode', () => {
      const { result } = renderHook(() => useChangeProperty());

      act(() => {
        result.current.changePositionMode(POSITION_MODES.AUTO);
      });

      expect(mockUpdateStyle).toHaveBeenCalledWith('element-123', {
        [STYLE_PROPERTIES.position]: POSITION.relative,
      });
    });

    it('should change to FREE (absolute) mode', () => {
      const { result } = renderHook(() => useChangeProperty());

      act(() => {
        result.current.changePositionMode(POSITION_MODES.FREE);
      });

      expect(mockUpdateStyle).toHaveBeenCalledWith('element-123', {
        [STYLE_PROPERTIES.position]: POSITION.absolute,
      });
    });

    it('should change to FIXED mode', () => {
      const { result } = renderHook(() => useChangeProperty());

      act(() => {
        result.current.changePositionMode(POSITION_MODES.FIXED);
      });

      expect(mockUpdateStyle).toHaveBeenCalledWith('element-123', {
        [STYLE_PROPERTIES.position]: POSITION.fixed,
      });
    });

    it('should change to STICKY mode', () => {
      const { result } = renderHook(() => useChangeProperty());

      act(() => {
        result.current.changePositionMode(POSITION_MODES.STICKY);
      });

      expect(mockUpdateStyle).toHaveBeenCalledWith('element-123', {
        [STYLE_PROPERTIES.position]: POSITION.sticky,
      });
    });
  });

  // ===================================================================
  // PART 3: Edge Cases - No Focused Element (3 tests)
  // ===================================================================

  describe('Edge Cases - No Focused Element', () => {
    it('should not call updateStyle when focusedElement is null', () => {
      useElement.mockReturnValue({
        focusedElement: null,
      });

      const { result } = renderHook(() => useChangeProperty());

      act(() => {
        result.current.changePositionMode(POSITION_MODES.FREE);
      });

      expect(mockUpdateStyle).not.toHaveBeenCalled();
    });

    it('should not call updateStyle when focusedElement has no id', () => {
      useElement.mockReturnValue({
        focusedElement: {},
      });

      const { result } = renderHook(() => useChangeProperty());

      act(() => {
        result.current.changePositionMode(POSITION_MODES.FREE);
      });

      expect(mockUpdateStyle).not.toHaveBeenCalled();
    });

    it('should return STATIC mode when positionValue is undefined', () => {
      useBoundVariableValue.mockReturnValue({
        positionValue: undefined,
      });

      const { result } = renderHook(() => useChangeProperty());

      expect(result.current.currentMode).toBe(POSITION_MODES.STATIC);
    });
  });

  // ===================================================================
  // PART 4: Mode Transitions (6 tests)
  // ===================================================================

  describe('Mode Transitions', () => {
    it('should transition from STATIC to FREE', () => {
      useBoundVariableValue.mockReturnValue({
        positionValue: { value: POSITION.static },
      });

      const { result, rerender } = renderHook(() => useChangeProperty());

      expect(result.current.currentMode).toBe(POSITION_MODES.STATIC);

      act(() => {
        result.current.changePositionMode(POSITION_MODES.FREE);
      });

      // Simulate Redux update
      useBoundVariableValue.mockReturnValue({
        positionValue: { value: POSITION.absolute },
      });

      rerender();

      expect(result.current.currentMode).toBe(POSITION_MODES.FREE);
    });

    it('should transition from AUTO to FIXED', () => {
      useBoundVariableValue.mockReturnValue({
        positionValue: { value: POSITION.relative },
      });

      const { result, rerender } = renderHook(() => useChangeProperty());

      expect(result.current.currentMode).toBe(POSITION_MODES.AUTO);

      act(() => {
        result.current.changePositionMode(POSITION_MODES.FIXED);
      });

      useBoundVariableValue.mockReturnValue({
        positionValue: { value: POSITION.fixed },
      });

      rerender();

      expect(result.current.currentMode).toBe(POSITION_MODES.FIXED);
    });

    it('should transition from FREE to STICKY', () => {
      useBoundVariableValue.mockReturnValue({
        positionValue: { value: POSITION.absolute },
      });

      const { result, rerender } = renderHook(() => useChangeProperty());

      expect(result.current.currentMode).toBe(POSITION_MODES.FREE);

      act(() => {
        result.current.changePositionMode(POSITION_MODES.STICKY);
      });

      useBoundVariableValue.mockReturnValue({
        positionValue: { value: POSITION.sticky },
      });

      rerender();

      expect(result.current.currentMode).toBe(POSITION_MODES.STICKY);
    });

    it('should handle multiple rapid mode changes', () => {
      const { result } = renderHook(() => useChangeProperty());

      act(() => {
        result.current.changePositionMode(POSITION_MODES.FREE);
        result.current.changePositionMode(POSITION_MODES.FIXED);
        result.current.changePositionMode(POSITION_MODES.STICKY);
      });

      expect(mockUpdateStyle).toHaveBeenCalledTimes(3);
      expect(mockUpdateStyle).toHaveBeenLastCalledWith('element-123', {
        [STYLE_PROPERTIES.position]: POSITION.sticky,
      });
    });

    it('should handle same mode change (idempotent)', () => {
      useBoundVariableValue.mockReturnValue({
        positionValue: { value: POSITION.absolute },
      });

      const { result } = renderHook(() => useChangeProperty());

      act(() => {
        result.current.changePositionMode(POSITION_MODES.FREE);
      });

      expect(mockUpdateStyle).toHaveBeenCalledTimes(1);

      // Change to same mode again
      act(() => {
        result.current.changePositionMode(POSITION_MODES.FREE);
      });

      expect(mockUpdateStyle).toHaveBeenCalledTimes(2);
      expect(mockUpdateStyle).toHaveBeenLastCalledWith('element-123', {
        [STYLE_PROPERTIES.position]: POSITION.absolute,
      });
    });

    it('should handle invalid mode gracefully', () => {
      const { result } = renderHook(() => useChangeProperty());

      act(() => {
        result.current.changePositionMode('INVALID_MODE');
      });

      // Should not throw, just do nothing (default case)
      expect(mockUpdateStyle).not.toHaveBeenCalled();
    });
  });

  // ===================================================================
  // PART 5: Return Value Structure (3 tests)
  // ===================================================================

  describe('Return Value Structure', () => {
    it('should return all required properties', () => {
      const { result } = renderHook(() => useChangeProperty());

      expect(result.current).toHaveProperty('currentMode');
      expect(result.current).toHaveProperty('changePositionMode');
      expect(result.current).toHaveProperty('POSITION_MODES');
    });

    it('should return POSITION_MODES constants', () => {
      const { result } = renderHook(() => useChangeProperty());

      expect(result.current.POSITION_MODES).toEqual(POSITION_MODES);
    });

    it('should return stable changePositionMode function', () => {
      const { result, rerender } = renderHook(() => useChangeProperty());

      const firstFunction = result.current.changePositionMode;

      rerender();

      const secondFunction = result.current.changePositionMode;

      // Function should be stable (same reference) due to useCallback
      expect(firstFunction).toBe(secondFunction);
    });
  });

  // ===================================================================
  // PART 6: Integration with Redux (3 tests)
  // ===================================================================

  describe('Integration with Redux', () => {
    it('should use correct element ID from Redux', () => {
      const customElement = { id: 'custom-element-456' };
      useElement.mockReturnValue({
        focusedElement: customElement,
      });

      const { result } = renderHook(() => useChangeProperty());

      act(() => {
        result.current.changePositionMode(POSITION_MODES.FREE);
      });

      expect(mockUpdateStyle).toHaveBeenCalledWith('custom-element-456', expect.any(Object));
    });

    it('should react to positionValue changes from Redux', () => {
      const { result, rerender } = renderHook(() => useChangeProperty());

      expect(result.current.currentMode).toBe(POSITION_MODES.STATIC);

      // Simulate Redux state change
      useBoundVariableValue.mockReturnValue({
        positionValue: { value: POSITION.absolute },
      });

      rerender();

      expect(result.current.currentMode).toBe(POSITION_MODES.FREE);
    });

    it('should handle positionValue with null value', () => {
      useBoundVariableValue.mockReturnValue({
        positionValue: { value: null },
      });

      const { result } = renderHook(() => useChangeProperty());

      expect(result.current.currentMode).toBe(POSITION_MODES.STATIC);
    });
  });
});

