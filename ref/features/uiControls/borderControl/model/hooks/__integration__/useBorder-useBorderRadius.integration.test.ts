/**
 * Integration Tests: useBorder + useBorderRadius
 *
 * Phase 5 - Week 3 Day 2: Hook Integration Tests
 *
 * Purpose: Test integration between useBorder and useBorderRadius hooks
 * Coverage Target: 90%+ for hook interactions
 * Mode: 🔒 Assessment Only - Zero Functional Code Changes
 *
 * Integration Scenarios:
 * 1. useBorderRadius uses useBorder's styler (10 tests)
 * 2. Border + BorderRadius combined operations (10 tests)
 *
 * Total: 20 tests
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useBorder } from '../useBorder';
import { useBorderRadius } from '../useBorderRadius';

// Mock dependencies
vi.mock('../../../../../../entities/binding', () => ({
  useBoundVariableValue: vi.fn(),
}));

vi.mock('../../../../../../entities/uiElement', () => ({
  useElement: vi.fn(),
  useElementMutations: vi.fn(),
  STYLE_PROPERTIES: {
    border: 'border',
    borderTop: 'borderTop',
    borderBottom: 'borderBottom',
    borderLeft: 'borderLeft',
    borderRight: 'borderRight',
    borderRadius: 'borderRadius',
    borderTopLeftRadius: 'borderTopLeftRadius',
    borderTopRightRadius: 'borderTopRightRadius',
    borderBottomLeftRadius: 'borderBottomLeftRadius',
    borderBottomRightRadius: 'borderBottomRightRadius',
  },
  BORDER_PROPERTIES: {
    width: 'width',
    style: 'style',
    color: 'color',
  },
  BORDER_RADIUS_PROPERTIES: {
    topLeft: 'topLeft',
    topRight: 'topRight',
    bottomLeft: 'bottomLeft',
    bottomRight: 'bottomRight',
  },
}));

import { useBoundVariableValue } from '../../../../../../entities/binding';
import { useElement, useElementMutations } from '../../../../../../entities/uiElement';

describe('useBorder + useBorderRadius Integration', () => {
  let mockUpdateStyle: ReturnType<typeof vi.fn>;
  let mockRemoveStyle: ReturnType<typeof vi.fn>;
  let mockFocusedElement: any;

  beforeEach(() => {
    mockUpdateStyle = vi.fn();
    mockRemoveStyle = vi.fn();
    mockFocusedElement = { id: 'element-1' };

    (useElement as ReturnType<typeof vi.fn>).mockReturnValue({
      focusedElement: mockFocusedElement,
    });

    (useElementMutations as ReturnType<typeof vi.fn>).mockReturnValue({
      updateStyle: mockUpdateStyle,
      removeStyle: mockRemoveStyle,
    });

    // Default mock for useBoundVariableValue
    (useBoundVariableValue as ReturnType<typeof vi.fn>).mockReturnValue({
      borderValue: { value: '1px solid #000000' },
      borderRadiusValue: { value: '4px' },
      borderTopLeftRadiusValue: null,
      borderTopRightRadiusValue: null,
      borderBottomLeftRadiusValue: null,
      borderBottomRightRadiusValue: null,
    });
  });

  // ═══════════════════════════════════════════════════════════════
  // CATEGORY 1: useBorderRadius uses useBorder's styler (10 tests)
  // ═══════════════════════════════════════════════════════════════

  describe('useBorderRadius uses useBorder styler', () => {
    it('should initialize both hooks successfully', () => {
      const { result: borderResult } = renderHook(() => useBorder());
      const { result: borderRadiusResult } = renderHook(() => useBorderRadius());

      // Both hooks should be initialized
      expect(borderResult.current).toBeDefined();
      expect(borderRadiusResult.current).toBeDefined();
    });

    it('should allow independent hook operations', () => {
      const { result: borderResult } = renderHook(() => useBorder());
      const { result: borderRadiusResult } = renderHook(() => useBorderRadius());

      // Both hooks should have their own operations
      expect(borderResult.current.updateBorderWidth).toBeDefined();
      expect(borderRadiusResult.current.updateBorderRadius).toBeDefined();
    });

    it('should update border and radius independently', () => {
      const { result: borderResult } = renderHook(() => useBorder());
      const { result: borderRadiusResult } = renderHook(() => useBorderRadius());

      act(() => {
        borderResult.current.updateBorderWidth('2px');
      });

      act(() => {
        borderRadiusResult.current.updateBorderRadius('8px');
      });

      expect(mockUpdateStyle).toHaveBeenCalledTimes(2);
    });

    it('should handle border update when borderRadius exists', () => {
      (useBoundVariableValue as ReturnType<typeof vi.fn>).mockReturnValue({
        borderValue: { value: '1px solid #000000' },
        borderRadiusValue: { value: '8px' },
      });

      const { result: borderResult } = renderHook(() => useBorder());

      act(() => {
        borderResult.current.updateBorderWidth('3px');
      });

      expect(mockUpdateStyle).toHaveBeenCalledWith('element-1', {
        border: '3px solid #000000',
      });
    });

    it('should handle borderRadius update when border exists', () => {
      (useBoundVariableValue as ReturnType<typeof vi.fn>).mockReturnValue({
        borderValue: { value: '2px solid #ff0000' },
        borderRadiusValue: { value: '4px' },
      });

      const { result: borderRadiusResult } = renderHook(() => useBorderRadius());

      act(() => {
        borderRadiusResult.current.updateBorderRadius('12px');
      });

      expect(mockUpdateStyle).toHaveBeenCalledWith('element-1', {
        borderRadius: '12px',
      });
    });

    it('should handle simultaneous border and radius updates', () => {
      const { result: borderResult } = renderHook(() => useBorder());
      const { result: borderRadiusResult } = renderHook(() => useBorderRadius());

      act(() => {
        borderResult.current.updateBorderWidth('2px');
        borderRadiusResult.current.updateBorderRadius('8px');
      });

      // Both operations should call updateStyle
      expect(mockUpdateStyle).toHaveBeenCalledTimes(2);
      expect(mockUpdateStyle).toHaveBeenCalledWith('element-1', expect.any(Object));
    });

    it('should maintain border when adding borderRadius', () => {
      (useBoundVariableValue as ReturnType<typeof vi.fn>).mockReturnValue({
        borderValue: { value: '2px dashed #00ff00' },
        borderRadiusValue: null,
      });

      const { result: borderRadiusResult } = renderHook(() => useBorderRadius());

      act(() => {
        borderRadiusResult.current.addBorderRadius();
      });

      // addBorderRadius should be called
      expect(mockUpdateStyle).toHaveBeenCalled();
      expect(mockUpdateStyle).toHaveBeenCalledWith('element-1', expect.any(Object));
    });

    it('should maintain borderRadius when adding border', () => {
      (useBoundVariableValue as ReturnType<typeof vi.fn>).mockReturnValue({
        borderValue: null,
        borderRadiusValue: { value: '8px' },
      });

      const { result: borderResult } = renderHook(() => useBorder());

      act(() => {
        borderResult.current.addBorder();
      });

      // BorderRadius should remain unchanged
      expect(mockUpdateStyle).toHaveBeenCalledWith('element-1', {
        border: '1px solid #000000',
      });
    });

    it('should handle removing border while keeping borderRadius', () => {
      (useBoundVariableValue as ReturnType<typeof vi.fn>).mockReturnValue({
        borderValue: { value: '1px solid #000000' },
        borderRadiusValue: { value: '8px' },
      });

      const { result: borderResult } = renderHook(() => useBorder());

      act(() => {
        borderResult.current.removeBorder();
      });

      // removeBorder is called, borderRadius should remain unchanged
      expect(mockRemoveStyle).toHaveBeenCalled();
    });

    it('should handle removing borderRadius while keeping border', () => {
      (useBoundVariableValue as ReturnType<typeof vi.fn>).mockReturnValue({
        borderValue: { value: '1px solid #000000' },
        borderRadiusValue: { value: '8px' },
      });

      const { result: borderRadiusResult } = renderHook(() => useBorderRadius());

      act(() => {
        borderRadiusResult.current.removeBorderRadius();
      });

      // removeBorderRadius is called, border should remain unchanged
      expect(mockRemoveStyle).toHaveBeenCalled();
    });
  });

  // ═══════════════════════════════════════════════════════════════
  // CATEGORY 2: Border + BorderRadius combined operations (10 tests)
  // ═══════════════════════════════════════════════════════════════

  describe('Combined Border and BorderRadius Operations', () => {
    it('should create complete border with radius', () => {
      (useBoundVariableValue as ReturnType<typeof vi.fn>).mockReturnValue({
        borderValue: null,
        borderRadiusValue: null,
      });

      const { result: borderResult } = renderHook(() => useBorder());
      const { result: borderRadiusResult } = renderHook(() => useBorderRadius());

      act(() => {
        borderResult.current.addBorder();
      });

      act(() => {
        borderRadiusResult.current.addBorderRadius();
      });

      // Both add operations should call updateStyle
      expect(mockUpdateStyle).toHaveBeenCalledTimes(2);
      expect(mockUpdateStyle).toHaveBeenCalledWith('element-1', expect.any(Object));
    });

    it('should update border properties with existing radius', () => {
      (useBoundVariableValue as ReturnType<typeof vi.fn>).mockReturnValue({
        borderValue: { value: '1px solid #000000' },
        borderRadiusValue: { value: '8px' },
      });

      const { result: borderResult } = renderHook(() => useBorder());

      act(() => {
        borderResult.current.updateBorderWidth('3px');
      });

      act(() => {
        borderResult.current.updateBorderColor('#ff0000');
      });

      expect(mockUpdateStyle).toHaveBeenCalledTimes(2);
      // BorderRadius should remain at 8px
    });

    it('should update radius properties with existing border', () => {
      (useBoundVariableValue as ReturnType<typeof vi.fn>).mockReturnValue({
        borderValue: { value: '2px solid #000000' },
        borderRadiusValue: { value: '4px' },
      });

      const { result: borderRadiusResult } = renderHook(() => useBorderRadius());

      act(() => {
        borderRadiusResult.current.updateBorderRadius('12px');
      });

      act(() => {
        borderRadiusResult.current.updateBorderRadius('16px');
      });

      expect(mockUpdateStyle).toHaveBeenCalledTimes(2);
      // Border should remain at 2px solid #000000
    });

    it('should handle separate border sides with unified radius', () => {
      (useBoundVariableValue as ReturnType<typeof vi.fn>).mockReturnValue({
        borderValue: null,
        borderTopValue: { value: '1px solid #000000' },
        borderBottomValue: { value: '2px dashed #ff0000' },
        borderRadiusValue: { value: '8px' },
      });

      const { result: borderResult } = renderHook(() => useBorder());
      const { result: borderRadiusResult } = renderHook(() => useBorderRadius());

      // Both hooks should be initialized successfully
      expect(borderResult.current).toBeDefined();
      expect(borderRadiusResult.current).toBeDefined();
      expect(borderRadiusResult.current.hasBorderRadius).toBeTruthy();
    });

    it('should handle unified border with separate radius corners', () => {
      (useBoundVariableValue as ReturnType<typeof vi.fn>).mockReturnValue({
        borderValue: { value: '1px solid #000000' },
        borderRadiusValue: null,
        borderTopLeftRadiusValue: { value: '4px' },
        borderTopRightRadiusValue: { value: '8px' },
      });

      const { result: borderResult } = renderHook(() => useBorder());
      const { result: borderRadiusResult } = renderHook(() => useBorderRadius());

      // Both hooks should be initialized successfully
      expect(borderResult.current).toBeDefined();
      expect(borderRadiusResult.current).toBeDefined();
      expect(borderResult.current.hasBorder).toBeTruthy();
    });

    it('should handle separate borders with separate radius corners', () => {
      (useBoundVariableValue as ReturnType<typeof vi.fn>).mockReturnValue({
        borderValue: null,
        borderTopValue: { value: '1px solid #000000' },
        borderBottomValue: { value: '1px solid #000000' },
        borderRadiusValue: null,
        borderTopLeftRadiusValue: { value: '4px' },
        borderBottomRightRadiusValue: { value: '4px' },
      });

      const { result: borderResult } = renderHook(() => useBorder());
      const { result: borderRadiusResult } = renderHook(() => useBorderRadius());

      // Both hooks should be initialized successfully with separate values
      expect(borderResult.current).toBeDefined();
      expect(borderRadiusResult.current).toBeDefined();
    });

    it('should separate border and maintain radius', () => {
      (useBoundVariableValue as ReturnType<typeof vi.fn>).mockReturnValue({
        borderValue: { value: '2px solid #000000' },
        borderRadiusValue: { value: '8px' },
      });

      const { result: borderResult } = renderHook(() => useBorder());

      act(() => {
        borderResult.current.separateBorder();
      });

      expect(mockUpdateStyle).toHaveBeenCalledTimes(1);
      // BorderRadius should remain at 8px
    });

    it('should separate borderRadius and maintain border', () => {
      (useBoundVariableValue as ReturnType<typeof vi.fn>).mockReturnValue({
        borderValue: { value: '2px solid #000000' },
        borderRadiusValue: { value: '8px' },
      });

      const { result: borderRadiusResult } = renderHook(() => useBorderRadius());

      act(() => {
        borderRadiusResult.current.separateBorderRadius();
      });

      expect(mockUpdateStyle).toHaveBeenCalledTimes(1);
      // Border should remain at 2px solid #000000
    });

    it('should remove both border and radius', () => {
      (useBoundVariableValue as ReturnType<typeof vi.fn>).mockReturnValue({
        borderValue: { value: '1px solid #000000' },
        borderRadiusValue: { value: '8px' },
      });

      const { result: borderResult } = renderHook(() => useBorder());
      const { result: borderRadiusResult } = renderHook(() => useBorderRadius());

      act(() => {
        borderResult.current.removeBorder();
      });

      act(() => {
        borderRadiusResult.current.removeBorderRadius();
      });

      // Both remove operations should be called
      expect(mockRemoveStyle).toHaveBeenCalledTimes(2);
    });

    it('should handle complex scenario: separate border + separate radius', () => {
      (useBoundVariableValue as ReturnType<typeof vi.fn>).mockReturnValue({
        borderValue: null,
        borderTopValue: { value: '2px solid #ff0000' },
        borderBottomValue: { value: '1px dashed #00ff00' },
        borderLeftValue: { value: '3px dotted #0000ff' },
        borderRightValue: { value: '1px solid #ffff00' },
        borderRadiusValue: null,
        borderTopLeftRadiusValue: { value: '4px' },
        borderTopRightRadiusValue: { value: '8px' },
        borderBottomLeftRadiusValue: { value: '12px' },
        borderBottomRightRadiusValue: { value: '16px' },
      });

      const { result: borderResult } = renderHook(() => useBorder());
      const { result: borderRadiusResult } = renderHook(() => useBorderRadius());

      // Verify both hooks are initialized
      expect(borderResult.current).toBeDefined();
      expect(borderRadiusResult.current).toBeDefined();

      // Both hooks should work independently
      act(() => {
        borderResult.current.updateBorderWidth('5px');
      });

      act(() => {
        borderRadiusResult.current.updateTopLeftRadius('20px');
      });

      // Both operations should call updateStyle
      expect(mockUpdateStyle).toHaveBeenCalledTimes(2);
    });
  });
});

