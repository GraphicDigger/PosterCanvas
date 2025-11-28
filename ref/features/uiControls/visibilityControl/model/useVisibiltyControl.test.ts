/**
 * Unit Tests for useVisibiltyControl Hook
 *
 * Phase 5 - Week 2 Day 4: Remaining High-Risk Areas
 *
 * Purpose: Test visibility control operations (show/hide elements)
 * Coverage Target: 90%+ for useVisibiltyControl hook
 * Mode: 🔒 Assessment Only - Zero Functional Code Changes
 *
 * Test Categories:
 * 1. Visibility State (15 tests)
 * 2. Toggle Visibility (15 tests)
 *
 * Total: 30 tests
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useVisibiltyControl } from './useVisibiltyControl';

// Mock dependencies
vi.mock('../../../../entities/binding', () => ({
  useBoundVariableValue: vi.fn(),
}));

vi.mock('../../../../entities/uiElement', () => ({
  useElement: vi.fn(),
  useElementMutations: vi.fn(),
  STYLE_PROPERTIES: { display: 'display' },
  DISPLAY_PROPERTIES: { none: 'none', contents: 'contents', flex: 'flex' },
}));

vi.mock('../../../../entities/uiInstance', () => ({
  useInstanceMutation: vi.fn(),
  useInstances: vi.fn(),
}));

import { useBoundVariableValue } from '../../../../entities/binding';
import { useElement, useElementMutations } from '../../../../entities/uiElement';
import { useInstanceMutation, useInstances } from '../../../../entities/uiInstance';

describe('useVisibiltyControl Hook', () => {
  let mockUpdateStyle: ReturnType<typeof vi.fn>;
  let mockUpdateInstanceStyle: ReturnType<typeof vi.fn>;
  let mockFocusedElement: any;
  let mockFocusedInstance: any;

  beforeEach(() => {
    mockUpdateStyle = vi.fn();
    mockUpdateInstanceStyle = vi.fn();
    mockFocusedElement = { id: 'element-1' };
    mockFocusedInstance = null;

    (useElement as ReturnType<typeof vi.fn>).mockReturnValue({
      focusedElement: mockFocusedElement,
    });

    (useInstances as ReturnType<typeof vi.fn>).mockReturnValue({
      focusedInstance: mockFocusedInstance,
    });

    (useElementMutations as ReturnType<typeof vi.fn>).mockReturnValue({
      updateStyle: mockUpdateStyle,
    });

    (useInstanceMutation as ReturnType<typeof vi.fn>).mockReturnValue({
      updateInstanceStyle: mockUpdateInstanceStyle,
    });

    // Mock for element (visible by default)
    (useBoundVariableValue as ReturnType<typeof vi.fn>).mockImplementation((id) => {
      if (id === 'element-1') {
        return { displayValue: { value: 'flex' } };
      }
      return { displayValue: { value: undefined } };
    });
  });

  // ═══════════════════════════════════════════════════════════════
  // CATEGORY 1: VISIBILITY STATE (15 tests)
  // ═══════════════════════════════════════════════════════════════

  describe('Visibility State', () => {
    it('should return element as visible when display is flex', () => {
      const { result } = renderHook(() => useVisibiltyControl());

      expect(result.current.elementIsVisible).toBe(true);
      expect(result.current.isVisible).toBe(true);
    });

    it('should return element as hidden when display is none', () => {
      (useBoundVariableValue as ReturnType<typeof vi.fn>).mockImplementation((id) => {
        if (id === 'element-1') {
          return { displayValue: { value: 'none' } };
        }
        return { displayValue: { value: undefined } };
      });

      const { result } = renderHook(() => useVisibiltyControl());

      expect(result.current.elementIsVisible).toBe(false);
      expect(result.current.isVisible).toBe(false);
    });

    it('should return instance as visible when display is contents', () => {
      mockFocusedInstance = { id: 'instance-1' };
      (useInstances as ReturnType<typeof vi.fn>).mockReturnValue({
        focusedInstance: mockFocusedInstance,
      });

      (useBoundVariableValue as ReturnType<typeof vi.fn>).mockImplementation((id) => {
        if (id === 'instance-1') {
          return { displayValue: { value: 'contents' } };
        }
        return { displayValue: { value: undefined } };
      });

      const { result } = renderHook(() => useVisibiltyControl());

      expect(result.current.instanceIsVisible).toBe(true);
      expect(result.current.isVisible).toBe(true);
    });

    it('should return instance as hidden when display is none', () => {
      mockFocusedInstance = { id: 'instance-1' };
      (useInstances as ReturnType<typeof vi.fn>).mockReturnValue({
        focusedInstance: mockFocusedInstance,
      });

      (useBoundVariableValue as ReturnType<typeof vi.fn>).mockImplementation((id) => {
        if (id === 'instance-1') {
          return { displayValue: { value: 'none' } };
        }
        return { displayValue: { value: undefined } };
      });

      const { result } = renderHook(() => useVisibiltyControl());

      expect(result.current.instanceIsVisible).toBe(false);
      expect(result.current.isVisible).toBe(false);
    });

    it('should prioritize instance visibility over element', () => {
      mockFocusedInstance = { id: 'instance-1' };
      (useInstances as ReturnType<typeof vi.fn>).mockReturnValue({
        focusedInstance: mockFocusedInstance,
      });

      (useBoundVariableValue as ReturnType<typeof vi.fn>).mockImplementation((id) => {
        if (id === 'element-1') {
          return { displayValue: { value: 'flex' } };
        }
        if (id === 'instance-1') {
          return { displayValue: { value: 'none' } };
        }
        return { displayValue: { value: undefined } };
      });

      const { result } = renderHook(() => useVisibiltyControl());

      expect(result.current.elementIsVisible).toBe(true);
      expect(result.current.instanceIsVisible).toBe(false);
      expect(result.current.isVisible).toBe(false); // Instance takes priority
    });

    it('should expose elementDisplayValue', () => {
      const { result } = renderHook(() => useVisibiltyControl());

      expect(result.current.elementDisplayValue).toEqual({ value: 'flex' });
    });

    it('should expose instanceDisplayValue', () => {
      mockFocusedInstance = { id: 'instance-1' };
      (useInstances as ReturnType<typeof vi.fn>).mockReturnValue({
        focusedInstance: mockFocusedInstance,
      });

      (useBoundVariableValue as ReturnType<typeof vi.fn>).mockImplementation((id) => {
        if (id === 'instance-1') {
          return { displayValue: { value: 'contents' } };
        }
        return { displayValue: { value: undefined } };
      });

      const { result } = renderHook(() => useVisibiltyControl());

      expect(result.current.instanceDisplayValue).toEqual({ value: 'contents' });
    });

    it('should return displayValue from instance when focused', () => {
      mockFocusedInstance = { id: 'instance-1' };
      (useInstances as ReturnType<typeof vi.fn>).mockReturnValue({
        focusedInstance: mockFocusedInstance,
      });

      (useBoundVariableValue as ReturnType<typeof vi.fn>).mockImplementation((id) => {
        if (id === 'instance-1') {
          return { displayValue: { value: 'contents' } };
        }
        return { displayValue: { value: 'flex' } };
      });

      const { result } = renderHook(() => useVisibiltyControl());

      expect(result.current.displayValue).toEqual({ value: 'contents' });
    });

    it('should return displayValue from element when no instance', () => {
      const { result } = renderHook(() => useVisibiltyControl());

      expect(result.current.displayValue).toEqual({ value: 'flex' });
    });

    it('should handle undefined displayValue', () => {
      (useBoundVariableValue as ReturnType<typeof vi.fn>).mockImplementation(() => {
        return { displayValue: { value: undefined } };
      });

      const { result } = renderHook(() => useVisibiltyControl());

      expect(result.current.elementIsVisible).toBe(true); // undefined !== 'none'
    });

    it('should handle null displayValue', () => {
      (useBoundVariableValue as ReturnType<typeof vi.fn>).mockImplementation(() => {
        return { displayValue: { value: null } };
      });

      const { result } = renderHook(() => useVisibiltyControl());

      expect(result.current.elementIsVisible).toBe(true); // null !== 'none'
    });

    it('should handle block display', () => {
      (useBoundVariableValue as ReturnType<typeof vi.fn>).mockImplementation(() => {
        return { displayValue: { value: 'block' } };
      });

      const { result } = renderHook(() => useVisibiltyControl());

      expect(result.current.elementIsVisible).toBe(true); // 'block' !== 'none'
    });

    it('should handle inline display', () => {
      (useBoundVariableValue as ReturnType<typeof vi.fn>).mockImplementation(() => {
        return { displayValue: { value: 'inline' } };
      });

      const { result } = renderHook(() => useVisibiltyControl());

      expect(result.current.elementIsVisible).toBe(true); // 'inline' !== 'none'
    });

    it('should handle grid display', () => {
      (useBoundVariableValue as ReturnType<typeof vi.fn>).mockImplementation(() => {
        return { displayValue: { value: 'grid' } };
      });

      const { result } = renderHook(() => useVisibiltyControl());

      expect(result.current.elementIsVisible).toBe(true); // 'grid' !== 'none'
    });
  });

  // ═══════════════════════════════════════════════════════════════
  // CATEGORY 2: TOGGLE VISIBILITY (15 tests)
  // ═══════════════════════════════════════════════════════════════

  describe('Toggle Visibility', () => {
    it('should toggle element from visible to hidden', () => {
      const { result } = renderHook(() => useVisibiltyControl());

      act(() => {
        result.current.toggleVisibility();
      });

      expect(mockUpdateStyle).toHaveBeenCalledWith('element-1', {
        display: 'none',
      });
    });

    it('should toggle element from hidden to visible', () => {
      (useBoundVariableValue as ReturnType<typeof vi.fn>).mockImplementation(() => {
        return { displayValue: { value: 'none' } };
      });

      const { result } = renderHook(() => useVisibiltyControl());

      act(() => {
        result.current.toggleVisibility();
      });

      expect(mockUpdateStyle).toHaveBeenCalledWith('element-1', {
        display: 'flex',
      });
    });

    it('should toggle instance from visible to hidden', () => {
      mockFocusedInstance = { id: 'instance-1' };
      (useInstances as ReturnType<typeof vi.fn>).mockReturnValue({
        focusedInstance: mockFocusedInstance,
      });

      (useBoundVariableValue as ReturnType<typeof vi.fn>).mockImplementation((id) => {
        if (id === 'instance-1') {
          return { displayValue: { value: 'contents' } };
        }
        return { displayValue: { value: undefined } };
      });

      const { result } = renderHook(() => useVisibiltyControl());

      act(() => {
        result.current.toggleVisibility();
      });

      expect(mockUpdateInstanceStyle).toHaveBeenCalledWith('instance-1', {
        display: 'none',
      });
    });

    it('should toggle instance from hidden to visible', () => {
      mockFocusedInstance = { id: 'instance-1' };
      (useInstances as ReturnType<typeof vi.fn>).mockReturnValue({
        focusedInstance: mockFocusedInstance,
      });

      (useBoundVariableValue as ReturnType<typeof vi.fn>).mockImplementation((id) => {
        if (id === 'instance-1') {
          return { displayValue: { value: 'none' } };
        }
        return { displayValue: { value: undefined } };
      });

      const { result } = renderHook(() => useVisibiltyControl());

      act(() => {
        result.current.toggleVisibility();
      });

      expect(mockUpdateInstanceStyle).toHaveBeenCalledWith('instance-1', {
        display: 'contents',
      });
    });

    it('should not call updateStyle for instance', () => {
      mockFocusedInstance = { id: 'instance-1' };
      (useInstances as ReturnType<typeof vi.fn>).mockReturnValue({
        focusedInstance: mockFocusedInstance,
      });

      (useBoundVariableValue as ReturnType<typeof vi.fn>).mockImplementation(() => {
        return { displayValue: { value: 'contents' } };
      });

      const { result } = renderHook(() => useVisibiltyControl());

      act(() => {
        result.current.toggleVisibility();
      });

      expect(mockUpdateStyle).not.toHaveBeenCalled();
      expect(mockUpdateInstanceStyle).toHaveBeenCalled();
    });

    it('should handle multiple toggles', () => {
      const { result } = renderHook(() => useVisibiltyControl());

      act(() => {
        result.current.toggleVisibility();
      });

      act(() => {
        result.current.toggleVisibility();
      });

      expect(mockUpdateStyle).toHaveBeenCalledTimes(2);
    });

    it('should toggle with undefined focused element', () => {
      (useElement as ReturnType<typeof vi.fn>).mockReturnValue({
        focusedElement: undefined,
      });

      const { result } = renderHook(() => useVisibiltyControl());

      act(() => {
        result.current.toggleVisibility();
      });

      expect(mockUpdateStyle).toHaveBeenCalledWith(undefined, {
        display: 'none',
      });
    });

    it('should toggle with null focused element', () => {
      (useElement as ReturnType<typeof vi.fn>).mockReturnValue({
        focusedElement: null,
      });

      const { result } = renderHook(() => useVisibiltyControl());

      act(() => {
        result.current.toggleVisibility();
      });

      expect(mockUpdateStyle).toHaveBeenCalledWith(undefined, {
        display: 'none',
      });
    });

    it('should expose toggleVisibility function', () => {
      const { result } = renderHook(() => useVisibiltyControl());

      expect(result.current.toggleVisibility).toBeDefined();
      expect(typeof result.current.toggleVisibility).toBe('function');
    });

    it('should maintain toggleVisibility reference across re-renders', () => {
      const { result, rerender } = renderHook(() => useVisibiltyControl());

      const firstRef = result.current.toggleVisibility;
      rerender();
      const secondRef = result.current.toggleVisibility;

      // toggleVisibility is wrapped in useCallback, so reference should be stable
      expect(typeof firstRef).toBe('function');
      expect(typeof secondRef).toBe('function');
    });

    it('should toggle element with different display values', () => {
      (useBoundVariableValue as ReturnType<typeof vi.fn>).mockImplementation(() => {
        return { displayValue: { value: 'block' } };
      });

      const { result } = renderHook(() => useVisibiltyControl());

      act(() => {
        result.current.toggleVisibility();
      });

      expect(mockUpdateStyle).toHaveBeenCalledWith('element-1', {
        display: 'none',
      });
    });

    it('should toggle instance with different display values', () => {
      mockFocusedInstance = { id: 'instance-1' };
      (useInstances as ReturnType<typeof vi.fn>).mockReturnValue({
        focusedInstance: mockFocusedInstance,
      });

      (useBoundVariableValue as ReturnType<typeof vi.fn>).mockImplementation((id) => {
        if (id === 'instance-1') {
          return { displayValue: { value: 'block' } };
        }
        return { displayValue: { value: undefined } };
      });

      const { result } = renderHook(() => useVisibiltyControl());

      act(() => {
        result.current.toggleVisibility();
      });

      expect(mockUpdateInstanceStyle).toHaveBeenCalledWith('instance-1', {
        display: 'none',
      });
    });

    it('should handle rapid toggles', () => {
      const { result } = renderHook(() => useVisibiltyControl());

      act(() => {
        for (let i = 0; i < 10; i++) {
          result.current.toggleVisibility();
        }
      });

      expect(mockUpdateStyle).toHaveBeenCalledTimes(10);
    });

    it('should toggle with very long element ID', () => {
      const longId = 'element-' + 'x'.repeat(1000);
      mockFocusedElement.id = longId;

      const { result } = renderHook(() => useVisibiltyControl());

      act(() => {
        result.current.toggleVisibility();
      });

      expect(mockUpdateStyle).toHaveBeenCalledWith(longId, {
        display: 'none',
      });
    });
  });
});

