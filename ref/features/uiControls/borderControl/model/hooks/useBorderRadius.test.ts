/**
 * Unit Tests for useBorderRadius Hook
 *
 * Phase 5 - Week 2 Day 4: Border Control Testing
 *
 * Purpose: Test border radius updates and separate corner logic
 * Coverage Target: 90%+ for useBorderRadius hook
 * Mode: 🔒 Assessment Only - Zero Functional Code Changes
 *
 * Test Categories:
 * 1. Unified Border Radius (10 tests)
 * 2. Separate Corner Radius (10 tests)
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useBorderRadius } from './useBorderRadius';

// Mock dependencies
vi.mock('../../../../../entities/uiElement', () => ({
  useElement: vi.fn(),
  useElementMutations: vi.fn(),
  STYLE_PROPERTIES: {
    borderRadius: 'borderRadius',
    borderTopLeftRadius: 'borderTopLeftRadius',
    borderTopRightRadius: 'borderTopRightRadius',
    borderBottomLeftRadius: 'borderBottomLeftRadius',
    borderBottomRightRadius: 'borderBottomRightRadius',
  },
  BORDER_RADIUS_PROPERTIES: [
    'borderRadius',
    'borderTopLeftRadius',
    'borderTopRightRadius',
    'borderBottomLeftRadius',
    'borderBottomRightRadius',
  ],
}));

vi.mock('../../../../../entities/binding', () => ({
  useBoundVariableValue: vi.fn(),
}));

vi.mock('../../../../../shared/lib', () => ({
  parseSizeFromUI: vi.fn((value) => value), // Simple passthrough for testing
  formatSizeForUI: vi.fn((value) => ({
    displayValue: value,
    placeholder: '',
    isPx: true,
  })),
}));

vi.mock('./useBorder', () => ({
  useBorder: vi.fn(() => ({
    styler: vi.fn(),
  })),
}));

import { useElement, useElementMutations } from '../../../../../entities/uiElement';
import { useBoundVariableValue } from '../../../../../entities/binding';
import { useBorder } from './useBorder';

describe('useBorderRadius Hook', () => {
  let mockUpdateStyle: ReturnType<typeof vi.fn>;
  let mockRemoveStyle: ReturnType<typeof vi.fn>;
  let mockStyler: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockUpdateStyle = vi.fn();
    mockRemoveStyle = vi.fn();
    mockStyler = vi.fn();

    (useElement as ReturnType<typeof vi.fn>).mockReturnValue({
      focusedElement: { id: 'element-1', kind: 'element', type: 'div' },
    });

    (useElementMutations as ReturnType<typeof vi.fn>).mockReturnValue({
      updateStyle: mockUpdateStyle,
      removeStyle: mockRemoveStyle,
    });

    (useBorder as ReturnType<typeof vi.fn>).mockReturnValue({
      styler: mockStyler,
    });

    (useBoundVariableValue as ReturnType<typeof vi.fn>).mockReturnValue({
      borderRadiusValue: { value: '4px' },
      borderTopLeftRadiusValue: null,
      borderTopRightRadiusValue: null,
      borderBottomLeftRadiusValue: null,
      borderBottomRightRadiusValue: null,
    });
  });

  // ═══════════════════════════════════════════════════════════════
  // CATEGORY 1: UNIFIED BORDER RADIUS (10 tests)
  // ═══════════════════════════════════════════════════════════════

  describe('Unified Border Radius', () => {
    it('should add border radius with default value (4px)', () => {
      const { result } = renderHook(() => useBorderRadius());

      act(() => {
        result.current.addBorderRadius();
      });

      expect(mockStyler).toHaveBeenCalledWith({
        borderRadius: '4px',
      });
    });

    it('should update border radius to 8px', () => {
      const { result } = renderHook(() => useBorderRadius());

      act(() => {
        result.current.updateBorderRadius('8px');
      });

      expect(mockStyler).toHaveBeenCalledWith({
        borderRadius: '8px',
      });
    });

    it('should update border radius to 0px (remove radius)', () => {
      const { result } = renderHook(() => useBorderRadius());

      act(() => {
        result.current.updateBorderRadius('0px');
      });

      expect(mockStyler).toHaveBeenCalledWith({
        borderRadius: '0px',
      });
    });

    it('should update border radius to 16px', () => {
      const { result } = renderHook(() => useBorderRadius());

      act(() => {
        result.current.updateBorderRadius('16px');
      });

      expect(mockStyler).toHaveBeenCalledWith({
        borderRadius: '16px',
      });
    });

    it('should update border radius with percentage', () => {
      const { result } = renderHook(() => useBorderRadius());

      act(() => {
        result.current.updateBorderRadius('50%');
      });

      expect(mockStyler).toHaveBeenCalledWith({
        borderRadius: '50%',
      });
    });

    it('should update border radius with em units', () => {
      const { result } = renderHook(() => useBorderRadius());

      act(() => {
        result.current.updateBorderRadius('1.5em');
      });

      expect(mockStyler).toHaveBeenCalledWith({
        borderRadius: '1.5em',
      });
    });

    it('should remove border radius completely', () => {
      const { result } = renderHook(() => useBorderRadius());

      act(() => {
        result.current.removeBorderRadius();
      });

      expect(mockRemoveStyle).toHaveBeenCalledWith('element-1', [
        'borderRadius',
        'borderTopLeftRadius',
        'borderTopRightRadius',
        'borderBottomLeftRadius',
        'borderBottomRightRadius',
      ]);
    });

    it('should detect border radius exists', () => {
      const { result } = renderHook(() => useBorderRadius());

      // hasBorderRadius returns the value itself, not a boolean
      expect(result.current.hasBorderRadius).toBeTruthy();
    });

    it('should detect no border radius', () => {
      (useBoundVariableValue as ReturnType<typeof vi.fn>).mockReturnValue({
        borderRadiusValue: null,
        borderTopLeftRadiusValue: null,
        borderTopRightRadiusValue: null,
        borderBottomLeftRadiusValue: null,
        borderBottomRightRadiusValue: null,
      });

      const { result } = renderHook(() => useBorderRadius());

      // hasBorderRadius returns undefined when no border radius
      expect(result.current.hasBorderRadius).toBeFalsy();
    });

    it('should return display value for border radius', () => {
      const { result } = renderHook(() => useBorderRadius());

      expect(result.current.borderRadius).toBe('4px');
    });
  });

  // ═══════════════════════════════════════════════════════════════
  // CATEGORY 2: SEPARATE CORNER RADIUS (10 tests)
  // ═══════════════════════════════════════════════════════════════

  describe('Separate Corner Radius', () => {
    it('should update top-left corner radius', () => {
      const { result } = renderHook(() => useBorderRadius());

      act(() => {
        result.current.updateTopLeftRadius('8px');
      });

      expect(mockStyler).toHaveBeenCalledWith({
        borderTopLeftRadius: '8px',
      });
    });

    it('should update top-right corner radius', () => {
      const { result } = renderHook(() => useBorderRadius());

      act(() => {
        result.current.updateTopRightRadius('10px');
      });

      expect(mockStyler).toHaveBeenCalledWith({
        borderTopRightRadius: '10px',
      });
    });

    it('should update bottom-left corner radius', () => {
      const { result } = renderHook(() => useBorderRadius());

      act(() => {
        result.current.updateBottomLeftRadius('12px');
      });

      expect(mockStyler).toHaveBeenCalledWith({
        borderBottomLeftRadius: '12px',
      });
    });

    it('should update bottom-right corner radius', () => {
      const { result } = renderHook(() => useBorderRadius());

      act(() => {
        result.current.updateBorderBottomRightRadius('14px');
      });

      expect(mockStyler).toHaveBeenCalledWith({
        borderBottomRightRadius: '14px',
      });
    });

    it('should detect separate border radius exists', () => {
      (useBoundVariableValue as ReturnType<typeof vi.fn>).mockReturnValue({
        borderRadiusValue: { value: '4px' },
        borderTopLeftRadiusValue: { value: '8px' },
        borderTopRightRadiusValue: null,
        borderBottomLeftRadiusValue: null,
        borderBottomRightRadiusValue: null,
      });

      const { result } = renderHook(() => useBorderRadius());

      // hasSeparateBorderRadius returns the value itself, not a boolean
      expect(result.current.hasSeparateBorderRadius).toBeTruthy();
    });

    it('should separate border radius from unified to individual corners', () => {
      (useBoundVariableValue as ReturnType<typeof vi.fn>).mockReturnValue({
        borderRadiusValue: { value: '8px' },
        borderTopLeftRadiusValue: null,
        borderTopRightRadiusValue: null,
        borderBottomLeftRadiusValue: null,
        borderBottomRightRadiusValue: null,
      });

      const { result } = renderHook(() => useBorderRadius());

      act(() => {
        result.current.separateBorderRadius();
      });

      expect(mockUpdateStyle).toHaveBeenCalledWith('element-1', {
        borderTopLeftRadius: '8px',
        borderTopRightRadius: '8px',
        borderBottomLeftRadius: '8px',
        borderBottomRightRadius: '8px',
      });
    });

    it('should unify separate border radius back to single value', () => {
      (useBoundVariableValue as ReturnType<typeof vi.fn>).mockReturnValue({
        borderRadiusValue: { value: '4px' },
        borderTopLeftRadiusValue: { value: '8px' },
        borderTopRightRadiusValue: { value: '10px' },
        borderBottomLeftRadiusValue: { value: '12px' },
        borderBottomRightRadiusValue: { value: '14px' },
      });

      const { result } = renderHook(() => useBorderRadius());

      act(() => {
        result.current.separateBorderRadius();
      });

      expect(mockRemoveStyle).toHaveBeenCalledWith('element-1', [
        'borderTopLeftRadius',
        'borderTopRightRadius',
        'borderBottomLeftRadius',
        'borderBottomRightRadius',
      ]);
    });

    it('should return display values for all corners', () => {
      (useBoundVariableValue as ReturnType<typeof vi.fn>).mockReturnValue({
        borderRadiusValue: { value: '4px' },
        borderTopLeftRadiusValue: { value: '8px' },
        borderTopRightRadiusValue: { value: '10px' },
        borderBottomLeftRadiusValue: { value: '12px' },
        borderBottomRightRadiusValue: { value: '14px' },
      });

      const { result } = renderHook(() => useBorderRadius());

      expect(result.current.borderTopLeftRadius).toBe('8px');
      expect(result.current.borderTopRightRadius).toBe('10px');
      expect(result.current.borderBottomLeftRadius).toBe('12px');
      expect(result.current.borderBottomRightRadius).toBe('14px');
    });

    it('should handle null corner radius values', () => {
      (useBoundVariableValue as ReturnType<typeof vi.fn>).mockReturnValue({
        borderRadiusValue: { value: '4px' },
        borderTopLeftRadiusValue: null,
        borderTopRightRadiusValue: null,
        borderBottomLeftRadiusValue: null,
        borderBottomRightRadiusValue: null,
      });

      const { result } = renderHook(() => useBorderRadius());

      expect(result.current.borderTopLeftRadius).toBeUndefined();
      expect(result.current.borderTopRightRadius).toBeUndefined();
      expect(result.current.borderBottomLeftRadius).toBeUndefined();
      expect(result.current.borderBottomRightRadius).toBeUndefined();
    });

    it('should update corner radius with 0px (sharp corner)', () => {
      const { result } = renderHook(() => useBorderRadius());

      act(() => {
        result.current.updateTopLeftRadius('0px');
      });

      expect(mockStyler).toHaveBeenCalledWith({
        borderTopLeftRadius: '0px',
      });
    });
  });
});

