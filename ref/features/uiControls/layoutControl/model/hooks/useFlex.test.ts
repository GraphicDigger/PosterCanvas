// ===================================================================
// Unit Tests for Flex Layout Control
// CRITICAL BUSINESS LOGIC - Flexbox Layout Property Updates
// Phase 5, Week 1, Day 3-4 - Property Panel Logic (Part 2: 30 tests)
// ===================================================================

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';

// Mock dependencies
vi.mock('@/entities/binding', () => ({
  useBoundVariableValue: vi.fn(),
}));

vi.mock('@/entities/uiElement', () => ({
  useElement: vi.fn(),
  useElementMutations: vi.fn(),
  DISPLAY_PROPERTIES: {
    block: 'block',
    flex: 'flex',
    grid: 'grid',
    inline: 'inline',
  },
  DIRECTION: {
    row: 'row',
    column: 'column',
  },
  WRAP: {
    wrap: 'wrap',
    nowrap: 'nowrap',
  },
  STYLE_PROPERTIES: {
    display: 'display',
    flexDirection: 'flexDirection',
    flexWrap: 'flexWrap',
    gapRow: 'rowGap',
    gapColumn: 'columnGap',
  },
}));

// Import after mocks
import { useFlex } from './useFlex';
import { useElement, useElementMutations } from '@/entities/uiElement';
import { useBoundVariableValue } from '@/entities/binding';

describe('Flex Layout Control - Property Updates', () => {
  let mockUpdateStyle: ReturnType<typeof vi.fn>;
  let mockRemoveStyle: ReturnType<typeof vi.fn>;
  let mockFocusedElement: { id: string };

  beforeEach(() => {
    mockUpdateStyle = vi.fn();
    mockRemoveStyle = vi.fn();
    mockFocusedElement = { id: 'element-123' };

    (useElement as any).mockReturnValue({
      focusedElement: mockFocusedElement,
    });

    (useElementMutations as any).mockReturnValue({
      updateStyle: mockUpdateStyle,
      removeStyle: mockRemoveStyle,
    });

    (useBoundVariableValue as any).mockReturnValue({
      displayValue: { value: undefined },
      flexDirectionValue: { value: undefined },
      flexWrapValue: { value: undefined },
    });
  });

  // ===================================================================
  // PART 1: Display Mode Detection (10 tests)
  // ===================================================================

  describe('Display Mode Detection', () => {
    it('should detect block display mode', () => {
      (useBoundVariableValue as any).mockReturnValue({
        displayValue: { value: 'block' },
        flexDirectionValue: { value: undefined },
        flexWrapValue: { value: undefined },
      });

      const { result } = renderHook(() => useFlex());

      expect(result.current.currentMode).toBe('block');
      expect(result.current.isDisplayFlex).toBe(false);
    });

    it('should detect flex row mode', () => {
      (useBoundVariableValue as any).mockReturnValue({
        displayValue: { value: 'flex' },
        flexDirectionValue: { value: 'row' },
        flexWrapValue: { value: undefined },
      });

      const { result } = renderHook(() => useFlex());

      expect(result.current.currentMode).toBe('row');
      expect(result.current.isDisplayFlex).toBe(true);
    });

    it('should detect flex column mode', () => {
      (useBoundVariableValue as any).mockReturnValue({
        displayValue: { value: 'flex' },
        flexDirectionValue: { value: 'column' },
        flexWrapValue: { value: undefined },
      });

      const { result } = renderHook(() => useFlex());

      expect(result.current.currentMode).toBe('column');
      expect(result.current.isDisplayFlex).toBe(true);
    });

    it('should detect flex wrap mode', () => {
      (useBoundVariableValue as any).mockReturnValue({
        displayValue: { value: 'flex' },
        flexDirectionValue: { value: 'row' },
        flexWrapValue: { value: 'wrap' },
      });

      const { result } = renderHook(() => useFlex());

      expect(result.current.currentMode).toBe('wrap');
      expect(result.current.isDisplayFlex).toBe(true);
    });

    it('should prioritize flexWrap over flexDirection', () => {
      (useBoundVariableValue as any).mockReturnValue({
        displayValue: { value: 'flex' },
        flexDirectionValue: { value: 'column' },
        flexWrapValue: { value: 'wrap' },
      });

      const { result } = renderHook(() => useFlex());

      expect(result.current.currentMode).toBe('wrap');
    });

    it('should handle undefined display value', () => {
      (useBoundVariableValue as any).mockReturnValue({
        displayValue: { value: undefined },
        flexDirectionValue: { value: 'row' },
        flexWrapValue: { value: undefined },
      });

      const { result } = renderHook(() => useFlex());

      expect(result.current.currentMode).toBe('row');
      expect(result.current.isDisplayFlex).toBe(false);
    });

    it('should handle null display value', () => {
      (useBoundVariableValue as any).mockReturnValue({
        displayValue: { value: null },
        flexDirectionValue: { value: undefined },
        flexWrapValue: { value: undefined },
      });

      const { result } = renderHook(() => useFlex());

      expect(result.current.isDisplayFlex).toBe(false);
    });

    it('should handle grid display mode', () => {
      (useBoundVariableValue as any).mockReturnValue({
        displayValue: { value: 'grid' },
        flexDirectionValue: { value: undefined },
        flexWrapValue: { value: undefined },
      });

      const { result } = renderHook(() => useFlex());

      expect(result.current.isDisplayFlex).toBe(false);
    });

    it('should handle inline display mode', () => {
      (useBoundVariableValue as any).mockReturnValue({
        displayValue: { value: 'inline' },
        flexDirectionValue: { value: undefined },
        flexWrapValue: { value: undefined },
      });

      const { result } = renderHook(() => useFlex());

      expect(result.current.isDisplayFlex).toBe(false);
    });

    it('should update currentMode when values change', () => {
      const mockBoundValue = {
        displayValue: { value: 'block' },
        flexDirectionValue: { value: undefined },
        flexWrapValue: { value: undefined },
      };

      (useBoundVariableValue as any).mockReturnValue(mockBoundValue);

      const { result, rerender } = renderHook(() => useFlex());
      expect(result.current.currentMode).toBe('block');

      mockBoundValue.displayValue.value = 'flex';
      mockBoundValue.flexDirectionValue.value = 'row';
      rerender();

      expect(result.current.currentMode).toBe('row');
    });
  });

  // ===================================================================
  // PART 2: Change to Block Mode (5 tests)
  // ===================================================================

  describe('Change to Block Mode', () => {
    it('should change display to block', () => {
      const { result } = renderHook(() => useFlex());

      act(() => {
        result.current.changeMode('block');
      });

      expect(mockUpdateStyle).toHaveBeenCalledWith('element-123', {
        display: 'block',
      });
    });

    it('should not remove other styles when changing to block', () => {
      const { result } = renderHook(() => useFlex());

      act(() => {
        result.current.changeMode('block');
      });

      expect(mockRemoveStyle).not.toHaveBeenCalled();
    });

    it('should handle multiple calls to block mode', () => {
      const { result } = renderHook(() => useFlex());

      act(() => {
        result.current.changeMode('block');
        result.current.changeMode('block');
      });

      expect(mockUpdateStyle).toHaveBeenCalledTimes(2);
    });

    it('should work when element is focused', () => {
      const { result } = renderHook(() => useFlex());

      act(() => {
        result.current.changeMode('block');
      });

      expect(mockUpdateStyle).toHaveBeenCalledWith('element-123', {
        display: 'block',
      });
    });

    it('should handle transition from flex to block', () => {
      (useBoundVariableValue as any).mockReturnValue({
        displayValue: { value: 'flex' },
        flexDirectionValue: { value: 'row' },
        flexWrapValue: { value: undefined },
      });

      const { result } = renderHook(() => useFlex());

      act(() => {
        result.current.changeMode('block');
      });

      expect(mockUpdateStyle).toHaveBeenCalledWith('element-123', {
        display: 'block',
      });
    });
  });

  // ===================================================================
  // PART 3: Change to Row Mode (5 tests)
  // ===================================================================

  describe('Change to Row Mode', () => {
    it('should change to flex row', () => {
      const { result } = renderHook(() => useFlex());

      act(() => {
        result.current.changeMode('row');
      });

      expect(mockRemoveStyle).toHaveBeenCalledWith('element-123', [
        'flexWrap',
        'rowGap',
        'columnGap',
      ]);

      expect(mockUpdateStyle).toHaveBeenCalledWith('element-123', {
        display: 'flex',
        flexDirection: 'row',
      });
    });

    it('should remove wrap and gap styles when changing to row', () => {
      const { result } = renderHook(() => useFlex());

      act(() => {
        result.current.changeMode('row');
      });

      expect(mockRemoveStyle).toHaveBeenCalledWith('element-123', [
        'flexWrap',
        'rowGap',
        'columnGap',
      ]);
    });

    it('should handle transition from block to row', () => {
      (useBoundVariableValue as any).mockReturnValue({
        displayValue: { value: 'block' },
        flexDirectionValue: { value: undefined },
        flexWrapValue: { value: undefined },
      });

      const { result } = renderHook(() => useFlex());

      act(() => {
        result.current.changeMode('row');
      });

      expect(mockUpdateStyle).toHaveBeenCalledWith('element-123', {
        display: 'flex',
        flexDirection: 'row',
      });
    });

    it('should handle transition from column to row', () => {
      (useBoundVariableValue as any).mockReturnValue({
        displayValue: { value: 'flex' },
        flexDirectionValue: { value: 'column' },
        flexWrapValue: { value: undefined },
      });

      const { result } = renderHook(() => useFlex());

      act(() => {
        result.current.changeMode('row');
      });

      expect(mockUpdateStyle).toHaveBeenCalledWith('element-123', {
        display: 'flex',
        flexDirection: 'row',
      });
    });

    it('should handle transition from wrap to row', () => {
      (useBoundVariableValue as any).mockReturnValue({
        displayValue: { value: 'flex' },
        flexDirectionValue: { value: 'row' },
        flexWrapValue: { value: 'wrap' },
      });

      const { result } = renderHook(() => useFlex());

      act(() => {
        result.current.changeMode('row');
      });

      expect(mockRemoveStyle).toHaveBeenCalledWith('element-123', [
        'flexWrap',
        'rowGap',
        'columnGap',
      ]);
    });
  });

  // ===================================================================
  // PART 4: Change to Column Mode (5 tests)
  // ===================================================================

  describe('Change to Column Mode', () => {
    it('should change to flex column', () => {
      const { result } = renderHook(() => useFlex());

      act(() => {
        result.current.changeMode('column');
      });

      expect(mockRemoveStyle).toHaveBeenCalledWith('element-123', [
        'flexWrap',
        'rowGap',
        'columnGap',
      ]);

      expect(mockUpdateStyle).toHaveBeenCalledWith('element-123', {
        display: 'flex',
        flexDirection: 'column',
      });
    });

    it('should remove wrap and gap styles when changing to column', () => {
      const { result } = renderHook(() => useFlex());

      act(() => {
        result.current.changeMode('column');
      });

      expect(mockRemoveStyle).toHaveBeenCalledWith('element-123', [
        'flexWrap',
        'rowGap',
        'columnGap',
      ]);
    });

    it('should handle transition from block to column', () => {
      (useBoundVariableValue as any).mockReturnValue({
        displayValue: { value: 'block' },
        flexDirectionValue: { value: undefined },
        flexWrapValue: { value: undefined },
      });

      const { result } = renderHook(() => useFlex());

      act(() => {
        result.current.changeMode('column');
      });

      expect(mockUpdateStyle).toHaveBeenCalledWith('element-123', {
        display: 'flex',
        flexDirection: 'column',
      });
    });

    it('should handle transition from row to column', () => {
      (useBoundVariableValue as any).mockReturnValue({
        displayValue: { value: 'flex' },
        flexDirectionValue: { value: 'row' },
        flexWrapValue: { value: undefined },
      });

      const { result } = renderHook(() => useFlex());

      act(() => {
        result.current.changeMode('column');
      });

      expect(mockUpdateStyle).toHaveBeenCalledWith('element-123', {
        display: 'flex',
        flexDirection: 'column',
      });
    });

    it('should handle transition from wrap to column', () => {
      (useBoundVariableValue as any).mockReturnValue({
        displayValue: { value: 'flex' },
        flexDirectionValue: { value: 'row' },
        flexWrapValue: { value: 'wrap' },
      });

      const { result } = renderHook(() => useFlex());

      act(() => {
        result.current.changeMode('column');
      });

      expect(mockRemoveStyle).toHaveBeenCalledWith('element-123', [
        'flexWrap',
        'rowGap',
        'columnGap',
      ]);
    });
  });

  // ===================================================================
  // PART 5: Change to Wrap Mode (5 tests)
  // ===================================================================

  describe('Change to Wrap Mode', () => {
    it('should change to flex wrap with default gap', () => {
      const { result } = renderHook(() => useFlex());

      act(() => {
        result.current.changeMode('wrap');
      });

      expect(mockUpdateStyle).toHaveBeenCalledWith('element-123', {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        rowGap: '4px',
        columnGap: '4px',
      });
    });

    it('should set default gap values to 4px', () => {
      const { result } = renderHook(() => useFlex());

      act(() => {
        result.current.changeMode('wrap');
      });

      const call = mockUpdateStyle.mock.calls[0][1];
      expect(call.rowGap).toBe('4px');
      expect(call.columnGap).toBe('4px');
    });

    it('should handle transition from block to wrap', () => {
      (useBoundVariableValue as any).mockReturnValue({
        displayValue: { value: 'block' },
        flexDirectionValue: { value: undefined },
        flexWrapValue: { value: undefined },
      });

      const { result } = renderHook(() => useFlex());

      act(() => {
        result.current.changeMode('wrap');
      });

      expect(mockUpdateStyle).toHaveBeenCalledWith('element-123', {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        rowGap: '4px',
        columnGap: '4px',
      });
    });

    it('should handle transition from row to wrap', () => {
      (useBoundVariableValue as any).mockReturnValue({
        displayValue: { value: 'flex' },
        flexDirectionValue: { value: 'row' },
        flexWrapValue: { value: undefined },
      });

      const { result } = renderHook(() => useFlex());

      act(() => {
        result.current.changeMode('wrap');
      });

      expect(mockUpdateStyle).toHaveBeenCalledWith('element-123', {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        rowGap: '4px',
        columnGap: '4px',
      });
    });

    it('should handle transition from column to wrap', () => {
      (useBoundVariableValue as any).mockReturnValue({
        displayValue: { value: 'flex' },
        flexDirectionValue: { value: 'column' },
        flexWrapValue: { value: undefined },
      });

      const { result } = renderHook(() => useFlex());

      act(() => {
        result.current.changeMode('wrap');
      });

      expect(mockUpdateStyle).toHaveBeenCalledWith('element-123', {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        rowGap: '4px',
        columnGap: '4px',
      });
    });
  });
});

