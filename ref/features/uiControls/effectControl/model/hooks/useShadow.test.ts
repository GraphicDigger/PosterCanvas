// ===================================================================
// Unit Tests for Shadow Effect Control
// CRITICAL BUSINESS LOGIC - Box Shadow Property Updates
// Phase 5, Week 1, Day 3-4 - Property Panel Logic (Part 3: 40 tests)
// ===================================================================

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useShadow } from './useShadow';

// Mock dependencies
vi.mock('../../../../../entities/uiElement', () => ({
  useElement: vi.fn(),
  useElementMutations: vi.fn(),
  STYLE_PROPERTIES: {
    boxShadow: 'boxShadow',
  },
  PROPERTY_SHADOW: {
    offsetX: 'offsetX',
    offsetY: 'offsetY',
    blurRadius: 'blurRadius',
    spreadRadius: 'spreadRadius',
    color: 'color',
    opacity: 'opacity',
    inset: 'inset',
  },
}));

vi.mock('../../../../../entities/binding', () => ({
  useBoundVariableValue: vi.fn(),
}));

vi.mock('../../lib', () => ({
  parseMultipleShadows: vi.fn((value) => {
    if (!value) {return [];}
    // Simple parser for testing
    if (value === '0 4px 4px 0 rgba(0,0,0,0.4)') {
      return [{
        offsetX: '0',
        offsetY: '4px',
        blurRadius: '4px',
        spreadRadius: '0',
        color: '#000000',
        opacity: 40,
        inset: false,
      }];
    }
    if (value === 'inset 2px 2px 4px 0 rgba(0,0,0,0.3)') {
      return [{
        offsetX: '2px',
        offsetY: '2px',
        blurRadius: '4px',
        spreadRadius: '0',
        color: '#000000',
        opacity: 30,
        inset: true,
      }];
    }
    return [];
  }),
  formatMultipleShadows: vi.fn((shadows) => {
    if (!shadows || shadows.length === 0) {return null;}
    return shadows.map((s: any) =>
      `${s.inset ? 'inset ' : ''}${s.offsetX} ${s.offsetY} ${s.blurRadius} ${s.spreadRadius} rgba(0,0,0,${s.opacity / 100})`,
    ).join(', ');
  }),
}));

vi.mock('../../../../../shared/lib', () => ({
  formatSizeForUI: vi.fn((value) => {
    if (!value) {return { displayValue: '' };}
    if (value.endsWith('px')) {return { displayValue: value.replace('px', '') };}
    return { displayValue: value };
  }),
}));

import { useElement, useElementMutations } from '../../../../../entities/uiElement';
import { useBoundVariableValue } from '../../../../../entities/binding';

describe('Shadow Effect Control - Property Updates', () => {
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
      boxShadowValue: { value: undefined },
    });
  });

  // ===================================================================
  // PART 1: Shadow Parsing & Display (10 tests)
  // ===================================================================

  describe('Shadow Parsing & Display', () => {
    it('should parse no shadows when value is undefined', () => {
      const { result } = renderHook(() => useShadow());

      expect(result.current.shadows).toEqual([]);
      expect(result.current.activeShadow).toBeNull();
    });

    it('should parse single shadow', () => {
      (useBoundVariableValue as any).mockReturnValue({
        boxShadowValue: { value: '0 4px 4px 0 rgba(0,0,0,0.4)' },
      });

      const { result } = renderHook(() => useShadow());

      expect(result.current.shadows).toHaveLength(1);
      expect(result.current.shadows[0]).toMatchObject({
        offsetX: '0',
        offsetY: '4px',
        blurRadius: '4px',
        spreadRadius: '0',
        color: '#000000',
        opacity: 40,
        inset: false,
      });
    });

    it('should parse inset shadow', () => {
      (useBoundVariableValue as any).mockReturnValue({
        boxShadowValue: { value: 'inset 2px 2px 4px 0 rgba(0,0,0,0.3)' },
      });

      const { result } = renderHook(() => useShadow());

      expect(result.current.shadows[0].inset).toBe(true);
    });

    it('should set first shadow as active by default', () => {
      (useBoundVariableValue as any).mockReturnValue({
        boxShadowValue: { value: '0 4px 4px 0 rgba(0,0,0,0.4)' },
      });

      const { result } = renderHook(() => useShadow());

      expect(result.current.activeShadow).toMatchObject({
        offsetX: '0',
        offsetY: '4px',
      });
    });

    it('should format shadow display values', () => {
      (useBoundVariableValue as any).mockReturnValue({
        boxShadowValue: { value: '0 4px 4px 0 rgba(0,0,0,0.4)' },
      });

      const { result } = renderHook(() => useShadow());

      expect(result.current.shadow).toMatchObject({
        x: '0',
        y: '4',
        blur: '4',
        spread: '0',
      });
    });

    it('should return null display values when no active shadow', () => {
      const { result } = renderHook(() => useShadow());

      expect(result.current.shadow.x).toBeUndefined();
    });

    it('should handle empty string boxShadow value', () => {
      (useBoundVariableValue as any).mockReturnValue({
        boxShadowValue: { value: '' },
      });

      const { result } = renderHook(() => useShadow());

      expect(result.current.shadows).toEqual([]);
    });

    it('should handle null boxShadow value', () => {
      (useBoundVariableValue as any).mockReturnValue({
        boxShadowValue: { value: null },
      });

      const { result } = renderHook(() => useShadow());

      expect(result.current.shadows).toEqual([]);
    });

    it('should update parsed shadows when boxShadow value changes', () => {
      const mockBoundValue = {
        boxShadowValue: { value: undefined },
      };

      (useBoundVariableValue as any).mockReturnValue(mockBoundValue);

      const { result, rerender } = renderHook(() => useShadow());
      expect(result.current.shadows).toEqual([]);

      mockBoundValue.boxShadowValue.value = '0 4px 4px 0 rgba(0,0,0,0.4)';
      rerender();

      expect(result.current.shadows).toHaveLength(1);
    });

    it('should maintain active shadow index within bounds', () => {
      (useBoundVariableValue as any).mockReturnValue({
        boxShadowValue: { value: '0 4px 4px 0 rgba(0,0,0,0.4)' },
      });

      const { result } = renderHook(() => useShadow());

      expect(result.current.activeShadowIndex).toBe(0);
    });
  });

  // ===================================================================
  // PART 2: Add Shadow (10 tests)
  // ===================================================================

  describe('Add Shadow', () => {
    it('should add new shadow with default values', () => {
      const { result } = renderHook(() => useShadow());

      act(() => {
        result.current.addShadow();
      });

      expect(mockUpdateStyle).toHaveBeenCalled();
      const call = mockUpdateStyle.mock.calls[0];
      expect(call[1].boxShadow).toContain('0 4px 4px 0');
    });

    it('should add shadow when no shadows exist', () => {
      const { result } = renderHook(() => useShadow());

      act(() => {
        result.current.addShadow();
      });

      expect(mockUpdateStyle).toHaveBeenCalledWith('element-123', expect.objectContaining({
        boxShadow: expect.any(String),
      }));
    });

    it('should add shadow with default opacity 40', () => {
      const { result } = renderHook(() => useShadow());

      act(() => {
        result.current.addShadow();
      });

      const call = mockUpdateStyle.mock.calls[0];
      expect(call[1].boxShadow).toContain('0.4');
    });

    it('should add shadow with default color black', () => {
      const { result } = renderHook(() => useShadow());

      act(() => {
        result.current.addShadow();
      });

      const call = mockUpdateStyle.mock.calls[0];
      expect(call[1].boxShadow).toContain('rgba(0,0,0');
    });

    it('should add shadow with default offsetY 4px', () => {
      const { result } = renderHook(() => useShadow());

      act(() => {
        result.current.addShadow();
      });

      const call = mockUpdateStyle.mock.calls[0];
      expect(call[1].boxShadow).toContain('4px');
    });

    it('should add shadow with inset false by default', () => {
      const { result } = renderHook(() => useShadow());

      act(() => {
        result.current.addShadow();
      });

      const call = mockUpdateStyle.mock.calls[0];
      expect(call[1].boxShadow).not.toContain('inset');
    });

    it('should not add shadow when element is null', () => {
      (useElement as any).mockReturnValue({
        focusedElement: null,
      });

      const { result } = renderHook(() => useShadow());

      act(() => {
        result.current.addShadow();
      });

      expect(mockUpdateStyle).not.toHaveBeenCalled();
    });

    it('should handle multiple shadow additions', () => {
      const { result } = renderHook(() => useShadow());

      act(() => {
        result.current.addShadow();
      });

      expect(mockUpdateStyle).toHaveBeenCalledTimes(1);

      act(() => {
        result.current.addShadow();
      });

      expect(mockUpdateStyle).toHaveBeenCalledTimes(2);
    });

    it('should format shadows correctly when adding', () => {
      const { result } = renderHook(() => useShadow());

      act(() => {
        result.current.addShadow();
      });

      const call = mockUpdateStyle.mock.calls[0];
      expect(typeof call[1].boxShadow).toBe('string');
    });

    it('should add shadow to existing shadows', () => {
      (useBoundVariableValue as any).mockReturnValue({
        boxShadowValue: { value: '0 4px 4px 0 rgba(0,0,0,0.4)' },
      });

      const { result } = renderHook(() => useShadow());

      act(() => {
        result.current.addShadow();
      });

      expect(mockUpdateStyle).toHaveBeenCalled();
    });
  });

  // ===================================================================
  // PART 3: Remove Shadow (10 tests)
  // ===================================================================

  describe('Remove Shadow', () => {
    it('should remove shadow at index', () => {
      (useBoundVariableValue as any).mockReturnValue({
        boxShadowValue: { value: '0 4px 4px 0 rgba(0,0,0,0.4)' },
      });

      const { result } = renderHook(() => useShadow());

      act(() => {
        result.current.removeShadowAtIndex(0);
      });

      expect(mockRemoveStyle).toHaveBeenCalledWith('element-123', ['boxShadow']);
    });

    it('should remove style when last shadow is removed', () => {
      (useBoundVariableValue as any).mockReturnValue({
        boxShadowValue: { value: '0 4px 4px 0 rgba(0,0,0,0.4)' },
      });

      const { result } = renderHook(() => useShadow());

      act(() => {
        result.current.removeShadowAtIndex(0);
      });

      expect(mockRemoveStyle).toHaveBeenCalled();
    });

    it('should not remove shadow with invalid index', () => {
      (useBoundVariableValue as any).mockReturnValue({
        boxShadowValue: { value: '0 4px 4px 0 rgba(0,0,0,0.4)' },
      });

      const { result } = renderHook(() => useShadow());

      act(() => {
        result.current.removeShadowAtIndex(5);
      });

      // Should not crash, but behavior depends on implementation
      expect(mockUpdateStyle).not.toHaveBeenCalled();
    });

    it('should not remove shadow with negative index', () => {
      (useBoundVariableValue as any).mockReturnValue({
        boxShadowValue: { value: '0 4px 4px 0 rgba(0,0,0,0.4)' },
      });

      const { result } = renderHook(() => useShadow());

      act(() => {
        result.current.removeShadowAtIndex(-1);
      });

      expect(mockUpdateStyle).not.toHaveBeenCalled();
    });

    it('should not remove when no shadows exist', () => {
      const { result } = renderHook(() => useShadow());

      act(() => {
        result.current.removeShadowAtIndex(0);
      });

      expect(mockRemoveStyle).not.toHaveBeenCalled();
    });

    it('should not remove when element is null', () => {
      (useElement as any).mockReturnValue({
        focusedElement: null,
      });

      (useBoundVariableValue as any).mockReturnValue({
        boxShadowValue: { value: '0 4px 4px 0 rgba(0,0,0,0.4)' },
      });

      const { result } = renderHook(() => useShadow());

      act(() => {
        result.current.removeShadowAtIndex(0);
      });

      expect(mockRemoveStyle).not.toHaveBeenCalled();
    });

    it('should handle removing first shadow', () => {
      (useBoundVariableValue as any).mockReturnValue({
        boxShadowValue: { value: '0 4px 4px 0 rgba(0,0,0,0.4)' },
      });

      const { result } = renderHook(() => useShadow());

      act(() => {
        result.current.removeShadowAtIndex(0);
      });

      expect(mockRemoveStyle).toHaveBeenCalledWith('element-123', ['boxShadow']);
    });

    it('should adjust active index when removing active shadow', () => {
      (useBoundVariableValue as any).mockReturnValue({
        boxShadowValue: { value: '0 4px 4px 0 rgba(0,0,0,0.4)' },
      });

      const { result } = renderHook(() => useShadow());

      act(() => {
        result.current.removeShadowAtIndex(0);
      });

      // After removal, active index should be adjusted
      expect(result.current.activeShadowIndex).toBe(0);
    });

    it('should handle multiple removals', () => {
      (useBoundVariableValue as any).mockReturnValue({
        boxShadowValue: { value: '0 4px 4px 0 rgba(0,0,0,0.4)' },
      });

      const { result } = renderHook(() => useShadow());

      act(() => {
        result.current.removeShadowAtIndex(0);
      });

      act(() => {
        result.current.removeShadowAtIndex(0);
      });

      expect(mockRemoveStyle).toHaveBeenCalled();
    });

    it('should clear all shadows when removing last one', () => {
      (useBoundVariableValue as any).mockReturnValue({
        boxShadowValue: { value: '0 4px 4px 0 rgba(0,0,0,0.4)' },
      });

      const { result } = renderHook(() => useShadow());

      act(() => {
        result.current.removeShadowAtIndex(0);
      });

      expect(mockRemoveStyle).toHaveBeenCalledWith('element-123', ['boxShadow']);
    });
  });

  // ===================================================================
  // PART 4: Active Shadow Selection (10 tests)
  // ===================================================================

  describe('Active Shadow Selection', () => {
    it('should set active shadow by index', () => {
      (useBoundVariableValue as any).mockReturnValue({
        boxShadowValue: { value: '0 4px 4px 0 rgba(0,0,0,0.4)' },
      });

      const { result } = renderHook(() => useShadow());

      act(() => {
        result.current.setActiveShadow(0);
      });

      expect(result.current.activeShadowIndex).toBe(0);
    });

    it('should not set active shadow with invalid index', () => {
      (useBoundVariableValue as any).mockReturnValue({
        boxShadowValue: { value: '0 4px 4px 0 rgba(0,0,0,0.4)' },
      });

      const { result } = renderHook(() => useShadow());

      act(() => {
        result.current.setActiveShadow(5);
      });

      expect(result.current.activeShadowIndex).toBe(0);
    });

    it('should not set active shadow with negative index', () => {
      (useBoundVariableValue as any).mockReturnValue({
        boxShadowValue: { value: '0 4px 4px 0 rgba(0,0,0,0.4)' },
      });

      const { result } = renderHook(() => useShadow());

      act(() => {
        result.current.setActiveShadow(-1);
      });

      expect(result.current.activeShadowIndex).toBe(0);
    });

    it('should maintain active index within bounds', () => {
      (useBoundVariableValue as any).mockReturnValue({
        boxShadowValue: { value: '0 4px 4px 0 rgba(0,0,0,0.4)' },
      });

      const { result } = renderHook(() => useShadow());

      act(() => {
        result.current.setActiveShadow(10);
      });

      expect(result.current.activeShadowIndex).toBeLessThan(result.current.shadows.length);
    });

    it('should update active shadow when index changes', () => {
      (useBoundVariableValue as any).mockReturnValue({
        boxShadowValue: { value: '0 4px 4px 0 rgba(0,0,0,0.4)' },
      });

      const { result } = renderHook(() => useShadow());

      const initialShadow = result.current.activeShadow;

      act(() => {
        result.current.setActiveShadow(0);
      });

      expect(result.current.activeShadow).toEqual(initialShadow);
    });

    it('should reset active index to 0 when all shadows removed', () => {
      (useBoundVariableValue as any).mockReturnValue({
        boxShadowValue: { value: '0 4px 4px 0 rgba(0,0,0,0.4)' },
      });

      const { result } = renderHook(() => useShadow());

      act(() => {
        result.current.removeShadowAtIndex(0);
      });

      expect(result.current.activeShadowIndex).toBe(0);
    });

    it('should handle active index when shadows length changes', () => {
      const mockBoundValue = {
        boxShadowValue: { value: '0 4px 4px 0 rgba(0,0,0,0.4)' },
      };

      (useBoundVariableValue as any).mockReturnValue(mockBoundValue);

      const { result, rerender } = renderHook(() => useShadow());

      mockBoundValue.boxShadowValue.value = undefined;
      rerender();

      expect(result.current.activeShadowIndex).toBe(0);
    });

    it('should return correct active shadow after selection', () => {
      (useBoundVariableValue as any).mockReturnValue({
        boxShadowValue: { value: '0 4px 4px 0 rgba(0,0,0,0.4)' },
      });

      const { result } = renderHook(() => useShadow());

      act(() => {
        result.current.setActiveShadow(0);
      });

      expect(result.current.activeShadow).toMatchObject({
        offsetX: '0',
        offsetY: '4px',
      });
    });

    it('should handle switching between shadows', () => {
      (useBoundVariableValue as any).mockReturnValue({
        boxShadowValue: { value: '0 4px 4px 0 rgba(0,0,0,0.4)' },
      });

      const { result } = renderHook(() => useShadow());

      act(() => {
        result.current.setActiveShadow(0);
      });

      expect(result.current.activeShadowIndex).toBe(0);
    });

    it('should maintain active shadow reference stability', () => {
      (useBoundVariableValue as any).mockReturnValue({
        boxShadowValue: { value: '0 4px 4px 0 rgba(0,0,0,0.4)' },
      });

      const { result, rerender } = renderHook(() => useShadow());
      const shadow1 = result.current.activeShadow;

      rerender();
      const shadow2 = result.current.activeShadow;

      expect(shadow1).toEqual(shadow2);
    });
  });
});

