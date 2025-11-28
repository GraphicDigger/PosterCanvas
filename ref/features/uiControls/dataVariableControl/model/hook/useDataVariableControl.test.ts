/**
 * Unit Tests for useDataVariableControl Hook
 *
 * Phase 5 - Week 2 Day 4: Remaining High-Risk Areas
 *
 * Purpose: Test data variable control operations
 * Coverage Target: 90%+ for useDataVariableControl hook
 * Mode: 🔒 Assessment Only - Zero Functional Code Changes
 *
 * Test Categories:
 * 1. Variable Selection (12 tests)
 *
 * Total: 12 tests
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useDataVariableControl } from './useDataVariableControl';

// Mock dependencies
vi.mock('../../../../../entities/mode/editorMode', () => ({
  useDesignMode: vi.fn(),
}));

vi.mock('../../../../../entities/varVariableData', () => ({
  useVariables: vi.fn(),
}));

import { useDesignMode } from '../../../../../entities/mode/editorMode';
import { useVariables } from '../../../../../entities/varVariableData';

describe('useDataVariableControl Hook', () => {
  let mockIsScreenCanvasInDesignMode: boolean;
  let mockScreenVariables: any;
  let mockComponentVariables: any;

  beforeEach(() => {
    mockIsScreenCanvasInDesignMode = true;
    mockScreenVariables = {
      allVariables: [
        { id: 'var-1', name: 'screenVar1', value: 'value1' },
        { id: 'var-2', name: 'screenVar2', value: 'value2' },
      ],
    };
    mockComponentVariables = {
      allVariables: [
        { id: 'var-3', name: 'componentVar1', value: 'value3' },
        { id: 'var-4', name: 'componentVar2', value: 'value4' },
      ],
    };

    (useDesignMode as ReturnType<typeof vi.fn>).mockReturnValue({
      isScreenCanvasInDesignMode: mockIsScreenCanvasInDesignMode,
    });

    (useVariables as ReturnType<typeof vi.fn>).mockReturnValue({
      selectedScreenVariables: mockScreenVariables,
      selectedComponentVariables: mockComponentVariables,
    });
  });

  // ═══════════════════════════════════════════════════════════════
  // CATEGORY 1: VARIABLE SELECTION (12 tests)
  // ═══════════════════════════════════════════════════════════════

  describe('Variable Selection', () => {
    it('should return screen variables when in screen canvas design mode', () => {
      const { result } = renderHook(() => useDataVariableControl());

      expect(result.current.variables).toEqual(mockScreenVariables.allVariables);
    });

    it('should return component variables when not in screen canvas design mode', () => {
      (useDesignMode as ReturnType<typeof vi.fn>).mockReturnValue({
        isScreenCanvasInDesignMode: false,
      });

      const { result } = renderHook(() => useDataVariableControl());

      expect(result.current.variables).toEqual(mockComponentVariables.allVariables);
    });

    it('should switch variables when mode changes', () => {
      const { result, rerender } = renderHook(() => useDataVariableControl());

      expect(result.current.variables).toEqual(mockScreenVariables.allVariables);

      (useDesignMode as ReturnType<typeof vi.fn>).mockReturnValue({
        isScreenCanvasInDesignMode: false,
      });
      rerender();

      expect(result.current.variables).toEqual(mockComponentVariables.allVariables);
    });

    it('should handle empty screen variables', () => {
      (useVariables as ReturnType<typeof vi.fn>).mockReturnValue({
        selectedScreenVariables: { allVariables: [] },
        selectedComponentVariables: mockComponentVariables,
      });

      const { result } = renderHook(() => useDataVariableControl());

      expect(result.current.variables).toEqual([]);
    });

    it('should handle empty component variables', () => {
      (useDesignMode as ReturnType<typeof vi.fn>).mockReturnValue({
        isScreenCanvasInDesignMode: false,
      });

      (useVariables as ReturnType<typeof vi.fn>).mockReturnValue({
        selectedScreenVariables: mockScreenVariables,
        selectedComponentVariables: { allVariables: [] },
      });

      const { result } = renderHook(() => useDataVariableControl());

      expect(result.current.variables).toEqual([]);
    });

    it('should handle null screen variables', () => {
      (useVariables as ReturnType<typeof vi.fn>).mockReturnValue({
        selectedScreenVariables: { allVariables: null },
        selectedComponentVariables: mockComponentVariables,
      });

      const { result } = renderHook(() => useDataVariableControl());

      expect(result.current.variables).toBeNull();
    });

    it('should handle undefined component variables', () => {
      (useDesignMode as ReturnType<typeof vi.fn>).mockReturnValue({
        isScreenCanvasInDesignMode: false,
      });

      (useVariables as ReturnType<typeof vi.fn>).mockReturnValue({
        selectedScreenVariables: mockScreenVariables,
        selectedComponentVariables: { allVariables: undefined },
      });

      const { result } = renderHook(() => useDataVariableControl());

      expect(result.current.variables).toBeUndefined();
    });

    it('should handle large number of screen variables', () => {
      const largeVariables = Array.from({ length: 1000 }, (_, i) => ({
        id: `var-${i}`,
        name: `var${i}`,
        value: `value${i}`,
      }));

      (useVariables as ReturnType<typeof vi.fn>).mockReturnValue({
        selectedScreenVariables: { allVariables: largeVariables },
        selectedComponentVariables: mockComponentVariables,
      });

      const { result } = renderHook(() => useDataVariableControl());

      expect(result.current.variables).toHaveLength(1000);
    });

    it('should handle variables with complex values', () => {
      const complexVariables = [
        { id: 'var-1', name: 'objectVar', value: { nested: { key: 'value' } } },
        { id: 'var-2', name: 'arrayVar', value: [1, 2, 3, 4, 5] },
        { id: 'var-3', name: 'functionVar', value: () => 'test' },
      ];

      (useVariables as ReturnType<typeof vi.fn>).mockReturnValue({
        selectedScreenVariables: { allVariables: complexVariables },
        selectedComponentVariables: mockComponentVariables,
      });

      const { result } = renderHook(() => useDataVariableControl());

      expect(result.current.variables).toEqual(complexVariables);
    });

    it('should memoize variables based on mode and variable changes', () => {
      const { result, rerender } = renderHook(() => useDataVariableControl());

      const firstVariables = result.current.variables;
      rerender();
      const secondVariables = result.current.variables;

      expect(firstVariables).toBe(secondVariables);
    });

    it('should update variables when selectedScreenVariables changes', () => {
      const { result, rerender } = renderHook(() => useDataVariableControl());

      expect(result.current.variables).toHaveLength(2);

      const newScreenVariables = {
        allVariables: [
          { id: 'var-5', name: 'newVar1', value: 'newValue1' },
          { id: 'var-6', name: 'newVar2', value: 'newValue2' },
          { id: 'var-7', name: 'newVar3', value: 'newValue3' },
        ],
      };

      (useVariables as ReturnType<typeof vi.fn>).mockReturnValue({
        selectedScreenVariables: newScreenVariables,
        selectedComponentVariables: mockComponentVariables,
      });

      rerender();

      expect(result.current.variables).toHaveLength(3);
    });

    it('should update variables when selectedComponentVariables changes', () => {
      (useDesignMode as ReturnType<typeof vi.fn>).mockReturnValue({
        isScreenCanvasInDesignMode: false,
      });

      const { result, rerender } = renderHook(() => useDataVariableControl());

      expect(result.current.variables).toHaveLength(2);

      const newComponentVariables = {
        allVariables: [
          { id: 'var-8', name: 'newCompVar1', value: 'newValue1' },
        ],
      };

      (useVariables as ReturnType<typeof vi.fn>).mockReturnValue({
        selectedScreenVariables: mockScreenVariables,
        selectedComponentVariables: newComponentVariables,
      });

      rerender();

      expect(result.current.variables).toHaveLength(1);
    });
  });
});

