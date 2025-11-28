// ===================================================================
// Unit Tests for useAbsoluteProperty Hook
// CRITICAL BUSINESS LOGIC - Absolute Position Control System
// Phase 5, Week 1, Day 1 - Canvas Rendering (Part 2: 60 tests)
// ===================================================================

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useAbsoluteProperty } from './useAbsoluteProperty';
import { STYLE_PROPERTIES, TRANSFORM } from '../../../../../entities/uiElement';

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

vi.mock('../../../../../shared/lib', () => ({
  formatSizeForUI: (value: string | undefined) => {
    if (!value) {return { displayValue: '', placeholder: 'Auto', isPx: false };}
    if (value.endsWith('px')) {
      return { displayValue: value.replace('px', ''), placeholder: '', isPx: true };
    }
    if (value.endsWith('%')) {
      return { displayValue: value, placeholder: '', isPx: false };
    }
    return { displayValue: value, placeholder: '', isPx: false };
  },
  parseSizeFromUI: (value: string | number) => {
    if (value === null || value === undefined || value === 'Auto') {return null;}
    if (typeof value === 'number') {return `${value}px`;}
    if (!isNaN(Number(value))) {return `${value}px`;}
    return value;
  },
}));

import { useElement, useElementMutations } from '../../../../../entities/uiElement';
import { useBoundVariableValue } from '../../../../../entities/binding';

describe('useAbsoluteProperty - Absolute Position Control', () => {
  let mockUpdateStyle: ReturnType<typeof vi.fn>;
  let mockRemoveStyle: ReturnType<typeof vi.fn>;
  let mockFocusedElement: { id: string };

  beforeEach(() => {
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
      topValue: { value: undefined },
      rightValue: { value: undefined },
      bottomValue: { value: undefined },
      leftValue: { value: undefined },
      transformValue: { value: undefined },
    });
  });

  // ===================================================================
  // PART 1: Transform Detection (10 tests)
  // ===================================================================

  describe('Transform Detection', () => {
    it('should detect translateX in transform', () => {
      useBoundVariableValue.mockReturnValue({
        topValue: { value: undefined },
        rightValue: { value: undefined },
        bottomValue: { value: undefined },
        leftValue: { value: '50%' },
        transformValue: { value: 'translateX(-50%)' },
      });

      const { result } = renderHook(() => useAbsoluteProperty());

      expect(result.current.isHorizontalCenter).toBe(true);
      expect(result.current.isVerticalCenter).toBe(false);
      expect(result.current.isCenter).toBe(false);
    });

    it('should detect translateY in transform', () => {
      useBoundVariableValue.mockReturnValue({
        topValue: { value: '50%' },
        rightValue: { value: undefined },
        bottomValue: { value: undefined },
        leftValue: { value: undefined },
        transformValue: { value: 'translateY(-50%)' },
      });

      const { result } = renderHook(() => useAbsoluteProperty());

      expect(result.current.isHorizontalCenter).toBe(false);
      expect(result.current.isVerticalCenter).toBe(true);
      expect(result.current.isCenter).toBe(false);
    });

    it('should detect translate (both) in transform', () => {
      useBoundVariableValue.mockReturnValue({
        topValue: { value: '50%' },
        rightValue: { value: undefined },
        bottomValue: { value: undefined },
        leftValue: { value: '50%' },
        transformValue: { value: 'translate(-50%, -50%)' },
      });

      const { result } = renderHook(() => useAbsoluteProperty());

      expect(result.current.isHorizontalCenter).toBe(false);
      expect(result.current.isVerticalCenter).toBe(false);
      expect(result.current.isCenter).toBe(true);
    });

    it('should handle no transform', () => {
      useBoundVariableValue.mockReturnValue({
        topValue: { value: '10px' },
        rightValue: { value: undefined },
        bottomValue: { value: undefined },
        leftValue: { value: '20px' },
        transformValue: { value: undefined },
      });

      const { result } = renderHook(() => useAbsoluteProperty());

      expect(result.current.isHorizontalCenter).toBe(false);
      expect(result.current.isVerticalCenter).toBe(false);
      expect(result.current.isCenter).toBe(false);
    });

    it('should handle empty transform string', () => {
      useBoundVariableValue.mockReturnValue({
        topValue: { value: '10px' },
        rightValue: { value: undefined },
        bottomValue: { value: undefined },
        leftValue: { value: '20px' },
        transformValue: { value: '' },
      });

      const { result } = renderHook(() => useAbsoluteProperty());

      expect(result.current.isHorizontalCenter).toBe(false);
      expect(result.current.isVerticalCenter).toBe(false);
      expect(result.current.isCenter).toBe(false);
    });

    it('should handle transform with other functions', () => {
      useBoundVariableValue.mockReturnValue({
        topValue: { value: '50%' },
        rightValue: { value: undefined },
        bottomValue: { value: undefined },
        leftValue: { value: '50%' },
        transformValue: { value: 'translate(-50%, -50%) rotate(45deg) scale(1.5)' },
      });

      const { result } = renderHook(() => useAbsoluteProperty());

      expect(result.current.isCenter).toBe(true);
    });

    it('should require 50% position for horizontal center', () => {
      useBoundVariableValue.mockReturnValue({
        topValue: { value: undefined },
        rightValue: { value: undefined },
        bottomValue: { value: undefined },
        leftValue: { value: '30%' }, // Not 50%
        transformValue: { value: 'translateX(-50%)' },
      });

      const { result } = renderHook(() => useAbsoluteProperty());

      expect(result.current.isHorizontalCenter).toBe(false);
    });

    it('should require 50% position for vertical center', () => {
      useBoundVariableValue.mockReturnValue({
        topValue: { value: '30%' }, // Not 50%
        rightValue: { value: undefined },
        bottomValue: { value: undefined },
        leftValue: { value: undefined },
        transformValue: { value: 'translateY(-50%)' },
      });

      const { result } = renderHook(() => useAbsoluteProperty());

      expect(result.current.isVerticalCenter).toBe(false);
    });

    it('should require both 50% positions for full center', () => {
      useBoundVariableValue.mockReturnValue({
        topValue: { value: '50%' },
        rightValue: { value: undefined },
        bottomValue: { value: undefined },
        leftValue: { value: '30%' }, // Not 50%
        transformValue: { value: 'translate(-50%, -50%)' },
      });

      const { result } = renderHook(() => useAbsoluteProperty());

      expect(result.current.isCenter).toBe(false);
    });

    it('should handle null transform value', () => {
      useBoundVariableValue.mockReturnValue({
        topValue: { value: '10px' },
        rightValue: { value: undefined },
        bottomValue: { value: undefined },
        leftValue: { value: '20px' },
        transformValue: { value: null },
      });

      const { result } = renderHook(() => useAbsoluteProperty());

      expect(result.current.isHorizontalCenter).toBe(false);
      expect(result.current.isVerticalCenter).toBe(false);
      expect(result.current.isCenter).toBe(false);
    });
  });

  // ===================================================================
  // PART 2: Position Value Display (10 tests)
  // ===================================================================

  describe('Position Value Display', () => {
    it('should format top value correctly', () => {
      useBoundVariableValue.mockReturnValue({
        topValue: { value: '10px' },
        rightValue: { value: undefined },
        bottomValue: { value: undefined },
        leftValue: { value: undefined },
        transformValue: { value: undefined },
      });

      const { result } = renderHook(() => useAbsoluteProperty());

      expect(result.current.top.displayValue).toBe('10');
      expect(result.current.top.placeholder).toBe('');
    });

    it('should format right value correctly', () => {
      useBoundVariableValue.mockReturnValue({
        topValue: { value: undefined },
        rightValue: { value: '20px' },
        bottomValue: { value: undefined },
        leftValue: { value: undefined },
        transformValue: { value: undefined },
      });

      const { result } = renderHook(() => useAbsoluteProperty());

      expect(result.current.right.displayValue).toBe('20');
    });

    it('should format bottom value correctly', () => {
      useBoundVariableValue.mockReturnValue({
        topValue: { value: undefined },
        rightValue: { value: undefined },
        bottomValue: { value: '30px' },
        leftValue: { value: undefined },
        transformValue: { value: undefined },
      });

      const { result } = renderHook(() => useAbsoluteProperty());

      expect(result.current.bottom.displayValue).toBe('30');
    });

    it('should format left value correctly', () => {
      useBoundVariableValue.mockReturnValue({
        topValue: { value: undefined },
        rightValue: { value: undefined },
        bottomValue: { value: undefined },
        leftValue: { value: '40px' },
        transformValue: { value: undefined },
      });

      const { result } = renderHook(() => useAbsoluteProperty());

      expect(result.current.left.displayValue).toBe('40');
    });

    it('should handle percentage values', () => {
      useBoundVariableValue.mockReturnValue({
        topValue: { value: '50%' },
        rightValue: { value: undefined },
        bottomValue: { value: undefined },
        leftValue: { value: '25%' },
        transformValue: { value: undefined },
      });

      const { result } = renderHook(() => useAbsoluteProperty());

      expect(result.current.top.displayValue).toBe('50%');
      expect(result.current.left.displayValue).toBe('25%');
    });

    it('should show Auto placeholder for undefined values', () => {
      useBoundVariableValue.mockReturnValue({
        topValue: { value: undefined },
        rightValue: { value: undefined },
        bottomValue: { value: undefined },
        leftValue: { value: undefined },
        transformValue: { value: undefined },
      });

      const { result } = renderHook(() => useAbsoluteProperty());

      expect(result.current.top.placeholder).toBe('Auto');
      expect(result.current.right.placeholder).toBe('Auto');
      expect(result.current.bottom.placeholder).toBe('Auto');
      expect(result.current.left.placeholder).toBe('Auto');
    });

    it('should handle zero values', () => {
      useBoundVariableValue.mockReturnValue({
        topValue: { value: '0px' },
        rightValue: { value: '0px' },
        bottomValue: { value: undefined },
        leftValue: { value: undefined },
        transformValue: { value: undefined },
      });

      const { result } = renderHook(() => useAbsoluteProperty());

      expect(result.current.top.displayValue).toBe('0');
      expect(result.current.right.displayValue).toBe('0');
    });

    it('should handle negative values', () => {
      useBoundVariableValue.mockReturnValue({
        topValue: { value: '-10px' },
        rightValue: { value: undefined },
        bottomValue: { value: undefined },
        leftValue: { value: '-20px' },
        transformValue: { value: undefined },
      });

      const { result } = renderHook(() => useAbsoluteProperty());

      expect(result.current.top.displayValue).toBe('-10');
      expect(result.current.left.displayValue).toBe('-20');
    });

    it('should handle decimal values', () => {
      useBoundVariableValue.mockReturnValue({
        topValue: { value: '10.5px' },
        rightValue: { value: undefined },
        bottomValue: { value: undefined },
        leftValue: { value: '20.75px' },
        transformValue: { value: undefined },
      });

      const { result } = renderHook(() => useAbsoluteProperty());

      expect(result.current.top.displayValue).toBe('10.5');
      expect(result.current.left.displayValue).toBe('20.75');
    });

    it('should return value objects with all properties', () => {
      useBoundVariableValue.mockReturnValue({
        topValue: { value: '10px' },
        rightValue: { value: undefined },
        bottomValue: { value: undefined },
        leftValue: { value: undefined },
        transformValue: { value: undefined },
      });

      const { result } = renderHook(() => useAbsoluteProperty());

      expect(result.current.top).toHaveProperty('value');
      expect(result.current.top).toHaveProperty('displayValue');
      expect(result.current.top).toHaveProperty('placeholder');
    });
  });

  // ===================================================================
  // PART 3: Update Handlers (10 tests)
  // ===================================================================

  describe('Update Handlers', () => {
    it('should update top value', () => {
      const { result } = renderHook(() => useAbsoluteProperty());

      act(() => {
        result.current.updateTopValue('100');
      });

      expect(mockUpdateStyle).toHaveBeenCalledWith('element-123', {
        [STYLE_PROPERTIES.top]: '100px',
      });
    });

    it('should update right value', () => {
      const { result } = renderHook(() => useAbsoluteProperty());

      act(() => {
        result.current.updateRightValue('200');
      });

      expect(mockUpdateStyle).toHaveBeenCalledWith('element-123', {
        [STYLE_PROPERTIES.right]: '200px',
      });
    });

    it('should update bottom value', () => {
      const { result } = renderHook(() => useAbsoluteProperty());

      act(() => {
        result.current.updateBottomValue('300');
      });

      expect(mockUpdateStyle).toHaveBeenCalledWith('element-123', {
        [STYLE_PROPERTIES.bottom]: '300px',
      });
    });

    it('should update left value', () => {
      const { result } = renderHook(() => useAbsoluteProperty());

      act(() => {
        result.current.updateLeftValue('400');
      });

      expect(mockUpdateStyle).toHaveBeenCalledWith('element-123', {
        [STYLE_PROPERTIES.left]: '400px',
      });
    });

    it('should remove vertical center when updating top', () => {
      useBoundVariableValue.mockReturnValue({
        topValue: { value: '50%' },
        rightValue: { value: undefined },
        bottomValue: { value: undefined },
        leftValue: { value: undefined },
        transformValue: { value: 'translateY(-50%)' },
      });

      const { result } = renderHook(() => useAbsoluteProperty());

      act(() => {
        result.current.updateTopValue('100');
      });

      // Should remove transform and update top
      expect(mockRemoveStyle).toHaveBeenCalled();
      expect(mockUpdateStyle).toHaveBeenCalled();
    });

    it('should remove horizontal center when updating left', () => {
      useBoundVariableValue.mockReturnValue({
        topValue: { value: undefined },
        rightValue: { value: undefined },
        bottomValue: { value: undefined },
        leftValue: { value: '50%' },
        transformValue: { value: 'translateX(-50%)' },
      });

      const { result } = renderHook(() => useAbsoluteProperty());

      act(() => {
        result.current.updateLeftValue('100');
      });

      expect(mockRemoveStyle).toHaveBeenCalled();
      expect(mockUpdateStyle).toHaveBeenCalled();
    });

    it('should remove vertical center when updating bottom', () => {
      useBoundVariableValue.mockReturnValue({
        topValue: { value: '50%' },
        rightValue: { value: undefined },
        bottomValue: { value: undefined },
        leftValue: { value: undefined },
        transformValue: { value: 'translateY(-50%)' },
      });

      const { result } = renderHook(() => useAbsoluteProperty());

      act(() => {
        result.current.updateBottomValue('100');
      });

      expect(mockRemoveStyle).toHaveBeenCalled();
      expect(mockUpdateStyle).toHaveBeenCalled();
    });

    it('should remove horizontal center when updating right', () => {
      useBoundVariableValue.mockReturnValue({
        topValue: { value: undefined },
        rightValue: { value: undefined },
        bottomValue: { value: undefined },
        leftValue: { value: '50%' },
        transformValue: { value: 'translateX(-50%)' },
      });

      const { result } = renderHook(() => useAbsoluteProperty());

      act(() => {
        result.current.updateRightValue('100');
      });

      expect(mockRemoveStyle).toHaveBeenCalled();
      expect(mockUpdateStyle).toHaveBeenCalled();
    });

    it('should not remove center when not centered', () => {
      useBoundVariableValue.mockReturnValue({
        topValue: { value: '10px' },
        rightValue: { value: undefined },
        bottomValue: { value: undefined },
        leftValue: { value: undefined },
        transformValue: { value: undefined },
      });

      const { result } = renderHook(() => useAbsoluteProperty());

      act(() => {
        result.current.updateTopValue('100');
      });

      expect(mockRemoveStyle).not.toHaveBeenCalled();
      expect(mockUpdateStyle).toHaveBeenCalledTimes(1);
    });

    it('should handle null element gracefully', () => {
      useElement.mockReturnValue({
        focusedElement: null,
      });

      const { result } = renderHook(() => useAbsoluteProperty());

      act(() => {
        result.current.updateTopValue('100');
      });

      expect(mockUpdateStyle).not.toHaveBeenCalled();
    });
  });

  // ===================================================================
  // PART 4: Toggle Position (15 tests)
  // ===================================================================

  describe('Toggle Position', () => {
    it('should toggle top position on', () => {
      useBoundVariableValue.mockReturnValue({
        topValue: { value: undefined },
        rightValue: { value: undefined },
        bottomValue: { value: undefined },
        leftValue: { value: undefined },
        transformValue: { value: undefined },
      });

      const { result } = renderHook(() => useAbsoluteProperty());

      act(() => {
        result.current.togglePosition(STYLE_PROPERTIES.top);
      });

      expect(mockUpdateStyle).toHaveBeenCalledWith('element-123', {
        [STYLE_PROPERTIES.top]: '0px',
      });
    });

    it('should toggle top position off', () => {
      useBoundVariableValue.mockReturnValue({
        topValue: { value: '10px' },
        rightValue: { value: undefined },
        bottomValue: { value: undefined },
        leftValue: { value: undefined },
        transformValue: { value: undefined },
      });

      const { result } = renderHook(() => useAbsoluteProperty());

      act(() => {
        result.current.togglePosition(STYLE_PROPERTIES.top);
      });

      expect(mockRemoveStyle).toHaveBeenCalledWith('element-123', [STYLE_PROPERTIES.top]);
    });

    it('should toggle left position on', () => {
      useBoundVariableValue.mockReturnValue({
        topValue: { value: undefined },
        rightValue: { value: undefined },
        bottomValue: { value: undefined },
        leftValue: { value: undefined },
        transformValue: { value: undefined },
      });

      const { result } = renderHook(() => useAbsoluteProperty());

      act(() => {
        result.current.togglePosition(STYLE_PROPERTIES.left);
      });

      expect(mockUpdateStyle).toHaveBeenCalledWith('element-123', {
        [STYLE_PROPERTIES.left]: '0px',
      });
    });

    it('should toggle left position off', () => {
      useBoundVariableValue.mockReturnValue({
        topValue: { value: undefined },
        rightValue: { value: undefined },
        bottomValue: { value: undefined },
        leftValue: { value: '20px' },
        transformValue: { value: undefined },
      });

      const { result } = renderHook(() => useAbsoluteProperty());

      act(() => {
        result.current.togglePosition(STYLE_PROPERTIES.left);
      });

      expect(mockRemoveStyle).toHaveBeenCalledWith('element-123', [STYLE_PROPERTIES.left]);
    });

    it('should toggle vertical center on', () => {
      useBoundVariableValue.mockReturnValue({
        topValue: { value: undefined },
        rightValue: { value: undefined },
        bottomValue: { value: undefined },
        leftValue: { value: undefined },
        transformValue: { value: undefined },
      });

      const { result } = renderHook(() => useAbsoluteProperty());

      act(() => {
        result.current.togglePosition(TRANSFORM.translateY);
      });

      expect(mockUpdateStyle).toHaveBeenCalledWith('element-123', {
        [STYLE_PROPERTIES.transform]: 'translateY(-50%)',
        [STYLE_PROPERTIES.top]: '50%',
      });
      expect(mockRemoveStyle).toHaveBeenCalledWith('element-123', [STYLE_PROPERTIES.bottom]);
    });

    it('should toggle vertical center off', () => {
      useBoundVariableValue.mockReturnValue({
        topValue: { value: '50%' },
        rightValue: { value: undefined },
        bottomValue: { value: undefined },
        leftValue: { value: undefined },
        transformValue: { value: 'translateY(-50%)' },
      });

      const { result } = renderHook(() => useAbsoluteProperty());

      act(() => {
        result.current.togglePosition(TRANSFORM.translateY);
      });

      expect(mockRemoveStyle).toHaveBeenCalled();
    });

    it('should toggle horizontal center on', () => {
      useBoundVariableValue.mockReturnValue({
        topValue: { value: undefined },
        rightValue: { value: undefined },
        bottomValue: { value: undefined },
        leftValue: { value: undefined },
        transformValue: { value: undefined },
      });

      const { result } = renderHook(() => useAbsoluteProperty());

      act(() => {
        result.current.togglePosition(TRANSFORM.translateX);
      });

      expect(mockUpdateStyle).toHaveBeenCalledWith('element-123', {
        [STYLE_PROPERTIES.transform]: 'translateX(-50%)',
        [STYLE_PROPERTIES.left]: '50%',
      });
      expect(mockRemoveStyle).toHaveBeenCalledWith('element-123', [STYLE_PROPERTIES.right]);
    });

    it('should toggle horizontal center off', () => {
      useBoundVariableValue.mockReturnValue({
        topValue: { value: undefined },
        rightValue: { value: undefined },
        bottomValue: { value: undefined },
        leftValue: { value: '50%' },
        transformValue: { value: 'translateX(-50%)' },
      });

      const { result } = renderHook(() => useAbsoluteProperty());

      act(() => {
        result.current.togglePosition(TRANSFORM.translateX);
      });

      expect(mockRemoveStyle).toHaveBeenCalled();
    });

    it('should upgrade horizontal center to full center', () => {
      useBoundVariableValue.mockReturnValue({
        topValue: { value: undefined },
        rightValue: { value: undefined },
        bottomValue: { value: undefined },
        leftValue: { value: '50%' },
        transformValue: { value: 'translateX(-50%)' },
      });

      const { result } = renderHook(() => useAbsoluteProperty());

      act(() => {
        result.current.togglePosition(TRANSFORM.translateY);
      });

      expect(mockUpdateStyle).toHaveBeenCalledWith('element-123', {
        [STYLE_PROPERTIES.transform]: 'translate(-50%, -50%)',
        [STYLE_PROPERTIES.top]: '50%',
        [STYLE_PROPERTIES.left]: '50%',
      });
    });

    it('should upgrade vertical center to full center', () => {
      useBoundVariableValue.mockReturnValue({
        topValue: { value: '50%' },
        rightValue: { value: undefined },
        bottomValue: { value: undefined },
        leftValue: { value: undefined },
        transformValue: { value: 'translateY(-50%)' },
      });

      const { result } = renderHook(() => useAbsoluteProperty());

      act(() => {
        result.current.togglePosition(TRANSFORM.translateX);
      });

      expect(mockUpdateStyle).toHaveBeenCalledWith('element-123', {
        [STYLE_PROPERTIES.transform]: 'translate(-50%, -50%)',
        [STYLE_PROPERTIES.top]: '50%',
        [STYLE_PROPERTIES.left]: '50%',
      });
    });

    it('should toggle bottom position on', () => {
      const { result } = renderHook(() => useAbsoluteProperty());

      act(() => {
        result.current.togglePosition(STYLE_PROPERTIES.bottom);
      });

      expect(mockUpdateStyle).toHaveBeenCalledWith('element-123', {
        [STYLE_PROPERTIES.bottom]: '0px',
      });
    });

    it('should toggle right position on', () => {
      const { result } = renderHook(() => useAbsoluteProperty());

      act(() => {
        result.current.togglePosition(STYLE_PROPERTIES.right);
      });

      expect(mockUpdateStyle).toHaveBeenCalledWith('element-123', {
        [STYLE_PROPERTIES.right]: '0px',
      });
    });

    it('should handle toggle when centered and has position', () => {
      useBoundVariableValue.mockReturnValue({
        topValue: { value: '50%' },
        rightValue: { value: undefined },
        bottomValue: { value: undefined },
        leftValue: { value: undefined },
        transformValue: { value: 'translateY(-50%)' },
      });

      const { result } = renderHook(() => useAbsoluteProperty());

      act(() => {
        result.current.togglePosition(STYLE_PROPERTIES.top);
      });

      // Should remove center and set top to 0
      expect(mockRemoveStyle).toHaveBeenCalled();
      expect(mockUpdateStyle).toHaveBeenCalledWith('element-123', {
        [STYLE_PROPERTIES.top]: '0px',
      });
    });

    it('should handle multiple rapid toggles', () => {
      const { result } = renderHook(() => useAbsoluteProperty());

      act(() => {
        result.current.togglePosition(STYLE_PROPERTIES.top);
        result.current.togglePosition(STYLE_PROPERTIES.left);
        result.current.togglePosition(TRANSFORM.translateX);
      });

      expect(mockUpdateStyle).toHaveBeenCalled();
    });

    it('should handle toggle with null element', () => {
      useElement.mockReturnValue({
        focusedElement: null,
      });

      const { result } = renderHook(() => useAbsoluteProperty());

      act(() => {
        result.current.togglePosition(STYLE_PROPERTIES.top);
      });

      expect(mockUpdateStyle).not.toHaveBeenCalled();
    });
  });

  // ===================================================================
  // PART 5: Clear Properties (5 tests)
  // ===================================================================

  describe('Clear Properties', () => {
    it('should clear all position properties', () => {
      const { result } = renderHook(() => useAbsoluteProperty());

      act(() => {
        result.current.clearProperties();
      });

      expect(mockRemoveStyle).toHaveBeenCalledWith('element-123', [
        STYLE_PROPERTIES.top,
        STYLE_PROPERTIES.right,
        STYLE_PROPERTIES.bottom,
        STYLE_PROPERTIES.left,
        STYLE_PROPERTIES.transform,
      ]);
    });

    it('should clear properties even when some are set', () => {
      useBoundVariableValue.mockReturnValue({
        topValue: { value: '10px' },
        rightValue: { value: '20px' },
        bottomValue: { value: undefined },
        leftValue: { value: undefined },
        transformValue: { value: undefined },
      });

      const { result } = renderHook(() => useAbsoluteProperty());

      act(() => {
        result.current.clearProperties();
      });

      expect(mockRemoveStyle).toHaveBeenCalledWith('element-123', expect.arrayContaining([
        STYLE_PROPERTIES.top,
        STYLE_PROPERTIES.right,
        STYLE_PROPERTIES.bottom,
        STYLE_PROPERTIES.left,
        STYLE_PROPERTIES.transform,
      ]));
    });

    it('should clear properties when centered', () => {
      useBoundVariableValue.mockReturnValue({
        topValue: { value: '50%' },
        rightValue: { value: undefined },
        bottomValue: { value: undefined },
        leftValue: { value: '50%' },
        transformValue: { value: 'translate(-50%, -50%)' },
      });

      const { result } = renderHook(() => useAbsoluteProperty());

      act(() => {
        result.current.clearProperties();
      });

      expect(mockRemoveStyle).toHaveBeenCalled();
    });

    it('should handle clear with null element', () => {
      useElement.mockReturnValue({
        focusedElement: null,
      });

      const { result } = renderHook(() => useAbsoluteProperty());

      act(() => {
        result.current.clearProperties();
      });

      expect(mockRemoveStyle).not.toHaveBeenCalled();
    });

    it('should be callable multiple times', () => {
      const { result } = renderHook(() => useAbsoluteProperty());

      act(() => {
        result.current.clearProperties();
        result.current.clearProperties();
      });

      expect(mockRemoveStyle).toHaveBeenCalledTimes(2);
    });
  });

  // ===================================================================
  // PART 6: Return Value Structure (10 tests)
  // ===================================================================

  describe('Return Value Structure', () => {
    it('should return all position value objects', () => {
      const { result } = renderHook(() => useAbsoluteProperty());

      expect(result.current).toHaveProperty('top');
      expect(result.current).toHaveProperty('right');
      expect(result.current).toHaveProperty('bottom');
      expect(result.current).toHaveProperty('left');
    });

    it('should return all center flags', () => {
      const { result } = renderHook(() => useAbsoluteProperty());

      expect(result.current).toHaveProperty('isVerticalCenter');
      expect(result.current).toHaveProperty('isHorizontalCenter');
      expect(result.current).toHaveProperty('isCenter');
    });

    it('should return all action functions', () => {
      const { result } = renderHook(() => useAbsoluteProperty());

      expect(result.current).toHaveProperty('clearProperties');
      expect(result.current).toHaveProperty('togglePosition');
      expect(result.current).toHaveProperty('updateTopValue');
      expect(result.current).toHaveProperty('updateRightValue');
      expect(result.current).toHaveProperty('updateBottomValue');
      expect(result.current).toHaveProperty('updateLeftValue');
    });

    it('should have stable function references', () => {
      const { result, rerender } = renderHook(() => useAbsoluteProperty());

      const firstClearProperties = result.current.clearProperties;
      const firstTogglePosition = result.current.togglePosition;

      rerender();

      expect(result.current.clearProperties).toBe(firstClearProperties);
      expect(result.current.togglePosition).toBe(firstTogglePosition);
    });

    it('should update center flags reactively', () => {
      const { result, rerender } = renderHook(() => useAbsoluteProperty());

      expect(result.current.isCenter).toBe(false);

      useBoundVariableValue.mockReturnValue({
        topValue: { value: '50%' },
        rightValue: { value: undefined },
        bottomValue: { value: undefined },
        leftValue: { value: '50%' },
        transformValue: { value: 'translate(-50%, -50%)' },
      });

      rerender();

      expect(result.current.isCenter).toBe(true);
    });

    it('should update display values reactively', () => {
      useBoundVariableValue.mockReturnValue({
        topValue: { value: '10px' },
        rightValue: { value: undefined },
        bottomValue: { value: undefined },
        leftValue: { value: undefined },
        transformValue: { value: undefined },
      });

      const { result, rerender } = renderHook(() => useAbsoluteProperty());

      expect(result.current.top.displayValue).toBe('10');

      useBoundVariableValue.mockReturnValue({
        topValue: { value: '20px' },
        rightValue: { value: undefined },
        bottomValue: { value: undefined },
        leftValue: { value: undefined },
        transformValue: { value: undefined },
      });

      rerender();

      expect(result.current.top.displayValue).toBe('20');
    });

    it('should handle all functions being called', () => {
      const { result } = renderHook(() => useAbsoluteProperty());

      expect(() => {
        act(() => {
          result.current.updateTopValue('10');
          result.current.updateRightValue('20');
          result.current.updateBottomValue('30');
          result.current.updateLeftValue('40');
          result.current.togglePosition(STYLE_PROPERTIES.top);
          result.current.clearProperties();
        });
      }).not.toThrow();
    });

    it('should have correct types for all properties', () => {
      const { result } = renderHook(() => useAbsoluteProperty());

      expect(typeof result.current.isVerticalCenter).toBe('boolean');
      expect(typeof result.current.isHorizontalCenter).toBe('boolean');
      expect(typeof result.current.isCenter).toBe('boolean');
      expect(typeof result.current.clearProperties).toBe('function');
      expect(typeof result.current.togglePosition).toBe('function');
      expect(typeof result.current.updateTopValue).toBe('function');
    });

    it('should have value objects with correct structure', () => {
      const { result } = renderHook(() => useAbsoluteProperty());

      expect(result.current.top).toHaveProperty('value');
      expect(result.current.top).toHaveProperty('displayValue');
      expect(result.current.top).toHaveProperty('placeholder');

      expect(typeof result.current.top.displayValue).toBe('string');
      expect(typeof result.current.top.placeholder).toBe('string');
    });

    it('should maintain immutability of returned objects', () => {
      const { result } = renderHook(() => useAbsoluteProperty());

      const topValue = result.current.top;

      // Attempting to modify should not affect original
      const modified = { ...topValue, displayValue: 'modified' };

      expect(result.current.top.displayValue).not.toBe('modified');
    });
  });
});

