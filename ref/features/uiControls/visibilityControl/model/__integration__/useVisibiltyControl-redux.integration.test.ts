/**
 * Integration Tests: useVisibiltyControl + Redux
 *
 * Phase 5 - Week 3 Day 2: Hook-to-Redux Integration Tests
 *
 * Purpose: Test integration between useVisibiltyControl hook and Redux state
 * Coverage Target: 90%+ for Redux integration
 * Mode: 🔒 Assessment Only - Zero Functional Code Changes
 *
 * Integration Scenarios:
 * 1. Redux State Reading (10 tests)
 * 2. Redux State Updates (10 tests)
 *
 * Total: 20 tests
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useVisibiltyControl } from '../useVisibiltyControl';

// Mock dependencies
vi.mock('../../../../../entities/binding', () => ({
  useBoundVariableValue: vi.fn(),
}));

vi.mock('../../../../../entities/uiElement', () => ({
  useElement: vi.fn(),
  useElementMutations: vi.fn(),
  STYLE_PROPERTIES: {
    display: 'display',
  },
  DISPLAY_PROPERTIES: {
    none: 'none',
    contents: 'contents',
    flex: 'flex',
  },
}));

vi.mock('../../../../../entities/uiInstance', () => ({
  useInstanceMutation: vi.fn(),
  useInstances: vi.fn(),
}));

import { useBoundVariableValue } from '../../../../../entities/binding';
import { useElement, useElementMutations } from '../../../../../entities/uiElement';
import { useInstanceMutation, useInstances } from '../../../../../entities/uiInstance';

describe('useVisibiltyControl + Redux Integration', () => {
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

    // Default mock for useBoundVariableValue
    (useBoundVariableValue as ReturnType<typeof vi.fn>).mockReturnValue({
      displayValue: { value: 'flex' },
    });
  });

  // ═══════════════════════════════════════════════════════════════
  // CATEGORY 1: REDUX STATE READING (10 tests)
  // ═══════════════════════════════════════════════════════════════

  describe('Redux State Reading', () => {
    it('should read focused element from Redux', () => {
      const { result } = renderHook(() => useVisibiltyControl());

      // Hook should access Redux state via useElement
      expect(useElement).toHaveBeenCalled();
      expect(result.current).toBeDefined();
    });

    it('should read display value from Redux for element', () => {
      (useBoundVariableValue as ReturnType<typeof vi.fn>).mockReturnValue({
        displayValue: { value: 'flex' },
      });

      const { result } = renderHook(() => useVisibiltyControl());

      expect(result.current.elementIsVisible).toBe(true);
      expect(result.current.elementDisplayValue).toEqual({ value: 'flex' });
    });

    it('should read display value from Redux for instance', () => {
      mockFocusedInstance = { id: 'instance-1' };
      (useInstances as ReturnType<typeof vi.fn>).mockReturnValue({
        focusedInstance: mockFocusedInstance,
      });

      (useBoundVariableValue as ReturnType<typeof vi.fn>).mockReturnValue({
        displayValue: { value: 'contents' },
      });

      const { result } = renderHook(() => useVisibiltyControl());

      expect(result.current.instanceIsVisible).toBe(true);
      expect(result.current.instanceDisplayValue).toEqual({ value: 'contents' });
    });

    it('should react to Redux state changes for focused element', () => {
      const { result, rerender } = renderHook(() => useVisibiltyControl());

      expect(result.current.elementIsVisible).toBe(true);

      // Simulate Redux state change
      (useBoundVariableValue as ReturnType<typeof vi.fn>).mockReturnValue({
        displayValue: { value: 'none' },
      });

      rerender();

      expect(result.current.elementIsVisible).toBe(false);
    });

    it('should react to Redux state changes for display value', () => {
      const { result, rerender } = renderHook(() => useVisibiltyControl());

      expect(result.current.displayValue).toEqual({ value: 'flex' });

      // Simulate Redux state change
      (useBoundVariableValue as ReturnType<typeof vi.fn>).mockReturnValue({
        displayValue: { value: 'block' },
      });

      rerender();

      expect(result.current.displayValue).toEqual({ value: 'block' });
    });

    it('should handle Redux state with null focused element', () => {
      (useElement as ReturnType<typeof vi.fn>).mockReturnValue({
        focusedElement: null,
      });

      const { result } = renderHook(() => useVisibiltyControl());

      expect(result.current).toBeDefined();
      // Hook should handle null gracefully
    });

    it('should handle Redux state with undefined display value', () => {
      (useBoundVariableValue as ReturnType<typeof vi.fn>).mockReturnValue({
        displayValue: { value: undefined },
      });

      const { result } = renderHook(() => useVisibiltyControl());

      expect(result.current.elementIsVisible).toBe(true); // undefined !== 'none'
    });

    it('should read correct element ID from Redux', () => {
      mockFocusedElement = { id: 'custom-element-123' };
      (useElement as ReturnType<typeof vi.fn>).mockReturnValue({
        focusedElement: mockFocusedElement,
      });

      const { result } = renderHook(() => useVisibiltyControl());

      act(() => {
        result.current.toggleVisibility();
      });

      expect(mockUpdateStyle).toHaveBeenCalledWith('custom-element-123', expect.any(Object));
    });

    it('should prioritize instance over element from Redux', () => {
      mockFocusedInstance = { id: 'instance-1' };
      (useInstances as ReturnType<typeof vi.fn>).mockReturnValue({
        focusedInstance: mockFocusedInstance,
      });

      (useBoundVariableValue as ReturnType<typeof vi.fn>).mockImplementation((id) => {
        if (id === 'instance-1') {
          return { displayValue: { value: 'none' } };
        }
        return { displayValue: { value: 'flex' } };
      });

      const { result } = renderHook(() => useVisibiltyControl());

      // Should use instance visibility, not element
      expect(result.current.isVisible).toBe(false);
    });

    it('should handle multiple Redux state reads', () => {
      const { result, rerender } = renderHook(() => useVisibiltyControl());

      // First read
      expect(result.current.elementIsVisible).toBe(true);

      // Second read after rerender
      rerender();
      expect(result.current.elementIsVisible).toBe(true);

      // Third read with state change
      (useBoundVariableValue as ReturnType<typeof vi.fn>).mockReturnValue({
        displayValue: { value: 'none' },
      });
      rerender();
      expect(result.current.elementIsVisible).toBe(false);
    });
  });

  // ═══════════════════════════════════════════════════════════════
  // CATEGORY 2: REDUX STATE UPDATES (10 tests)
  // ═══════════════════════════════════════════════════════════════

  describe('Redux State Updates', () => {
    it('should dispatch Redux action to update element visibility', () => {
      const { result } = renderHook(() => useVisibiltyControl());

      act(() => {
        result.current.toggleVisibility();
      });

      // Should call Redux mutation
      expect(mockUpdateStyle).toHaveBeenCalledTimes(1);
      expect(mockUpdateStyle).toHaveBeenCalledWith('element-1', {
        display: 'none',
      });
    });

    it('should dispatch Redux action to update instance visibility', () => {
      mockFocusedInstance = { id: 'instance-1' };
      (useInstances as ReturnType<typeof vi.fn>).mockReturnValue({
        focusedInstance: mockFocusedInstance,
      });

      (useBoundVariableValue as ReturnType<typeof vi.fn>).mockReturnValue({
        displayValue: { value: 'contents' },
      });

      const { result } = renderHook(() => useVisibiltyControl());

      act(() => {
        result.current.toggleVisibility();
      });

      // Should call Redux mutation for instance
      expect(mockUpdateInstanceStyle).toHaveBeenCalledTimes(1);
      expect(mockUpdateInstanceStyle).toHaveBeenCalledWith('instance-1', {
        display: 'none',
      });
    });

    it('should dispatch correct Redux action for show operation', () => {
      (useBoundVariableValue as ReturnType<typeof vi.fn>).mockReturnValue({
        displayValue: { value: 'none' },
      });

      const { result } = renderHook(() => useVisibiltyControl());

      act(() => {
        result.current.toggleVisibility();
      });

      expect(mockUpdateStyle).toHaveBeenCalledWith('element-1', {
        display: 'flex',
      });
    });

    it('should dispatch correct Redux action for hide operation', () => {
      (useBoundVariableValue as ReturnType<typeof vi.fn>).mockReturnValue({
        displayValue: { value: 'flex' },
      });

      const { result } = renderHook(() => useVisibiltyControl());

      act(() => {
        result.current.toggleVisibility();
      });

      expect(mockUpdateStyle).toHaveBeenCalledWith('element-1', {
        display: 'none',
      });
    });

    it('should dispatch multiple Redux actions for multiple toggles', () => {
      const { result } = renderHook(() => useVisibiltyControl());

      act(() => {
        result.current.toggleVisibility();
      });

      act(() => {
        result.current.toggleVisibility();
      });

      act(() => {
        result.current.toggleVisibility();
      });

      expect(mockUpdateStyle).toHaveBeenCalledTimes(3);
    });

    it('should use correct Redux mutation for element vs instance', () => {
      const { result: elementResult } = renderHook(() => useVisibiltyControl());

      act(() => {
        elementResult.current.toggleVisibility();
      });

      expect(mockUpdateStyle).toHaveBeenCalled();
      expect(mockUpdateInstanceStyle).not.toHaveBeenCalled();

      // Reset mocks
      mockUpdateStyle.mockClear();
      mockUpdateInstanceStyle.mockClear();

      // Now test with instance
      mockFocusedInstance = { id: 'instance-1' };
      (useInstances as ReturnType<typeof vi.fn>).mockReturnValue({
        focusedInstance: mockFocusedInstance,
      });

      const { result: instanceResult } = renderHook(() => useVisibiltyControl());

      act(() => {
        instanceResult.current.toggleVisibility();
      });

      expect(mockUpdateInstanceStyle).toHaveBeenCalled();
      expect(mockUpdateStyle).not.toHaveBeenCalled();
    });

    it('should handle Redux update with different element IDs', () => {
      const { result: result1 } = renderHook(() => useVisibiltyControl());

      act(() => {
        result1.current.toggleVisibility();
      });

      expect(mockUpdateStyle).toHaveBeenCalledWith('element-1', expect.any(Object));

      // Change focused element in Redux
      mockFocusedElement = { id: 'element-2' };
      (useElement as ReturnType<typeof vi.fn>).mockReturnValue({
        focusedElement: mockFocusedElement,
      });

      const { result: result2 } = renderHook(() => useVisibiltyControl());

      act(() => {
        result2.current.toggleVisibility();
      });

      expect(mockUpdateStyle).toHaveBeenCalledWith('element-2', expect.any(Object));
    });

    it('should handle Redux update when element ID is null', () => {
      (useElement as ReturnType<typeof vi.fn>).mockReturnValue({
        focusedElement: null,
      });

      const { result } = renderHook(() => useVisibiltyControl());

      act(() => {
        result.current.toggleVisibility();
      });

      // Should still call updateStyle (implementation may handle null)
      expect(mockUpdateStyle).toHaveBeenCalled();
    });

    it('should dispatch Redux action with correct display property', () => {
      const { result } = renderHook(() => useVisibiltyControl());

      act(() => {
        result.current.toggleVisibility();
      });

      const callArgs = mockUpdateStyle.mock.calls[0];
      expect(callArgs[1]).toHaveProperty('display');
      expect(['none', 'flex', 'contents']).toContain(callArgs[1].display);
    });

    it('should maintain Redux state consistency across multiple operations', () => {
      const { result, rerender } = renderHook(() => useVisibiltyControl());

      // Initial state: visible
      expect(result.current.elementIsVisible).toBe(true);

      // Toggle to hidden
      act(() => {
        result.current.toggleVisibility();
      });

      // Simulate Redux state update
      (useBoundVariableValue as ReturnType<typeof vi.fn>).mockReturnValue({
        displayValue: { value: 'none' },
      });
      rerender();

      expect(result.current.elementIsVisible).toBe(false);

      // Toggle back to visible
      act(() => {
        result.current.toggleVisibility();
      });

      // Simulate Redux state update
      (useBoundVariableValue as ReturnType<typeof vi.fn>).mockReturnValue({
        displayValue: { value: 'flex' },
      });
      rerender();

      expect(result.current.elementIsVisible).toBe(true);
    });
  });
});

