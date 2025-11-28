/**
 * Integration Tests: useDataVariableControl + Context (Design Mode)
 *
 * Phase 5 - Week 3 Day 2: Hook-to-Context Integration Tests
 *
 * Purpose: Test integration between useDataVariableControl hook and Design Mode Context
 * Coverage Target: 90%+ for Context integration
 * Mode: 🔒 Assessment Only - Zero Functional Code Changes
 *
 * Integration Scenarios:
 * 1. Design Mode Context Reading (5 tests)
 * 2. Context-Driven Variable Selection (5 tests)
 *
 * Total: 10 tests
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useDataVariableControl } from '../useDataVariableControl';

// Mock dependencies
vi.mock('../../../../../../entities/mode/editorMode', () => ({
  useDesignMode: vi.fn(),
}));

vi.mock('../../../../../../entities/varVariableData', () => ({
  useVariables: vi.fn(),
}));

import { useDesignMode } from '../../../../../../entities/mode/editorMode';
import { useVariables } from '../../../../../../entities/varVariableData';

describe('useDataVariableControl + Design Mode Context Integration', () => {
  let mockIsScreenCanvasInDesignMode: boolean;
  let mockScreenVariables: any;
  let mockComponentVariables: any;

  beforeEach(() => {
    mockIsScreenCanvasInDesignMode = true;
    mockScreenVariables = {
      allVariables: [
        { id: 'screen-var-1', name: 'screenVar1', value: 'value1' },
        { id: 'screen-var-2', name: 'screenVar2', value: 'value2' },
      ],
    };
    mockComponentVariables = {
      allVariables: [
        { id: 'comp-var-1', name: 'componentVar1', value: 'value1' },
        { id: 'comp-var-2', name: 'componentVar2', value: 'value2' },
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
  // CATEGORY 1: DESIGN MODE CONTEXT READING (5 tests)
  // ═══════════════════════════════════════════════════════════════

  describe('Design Mode Context Reading', () => {
    it('should read design mode state from context', () => {
      const { result } = renderHook(() => useDataVariableControl());

      // Hook should access design mode context
      expect(useDesignMode).toHaveBeenCalled();
      expect(result.current.variables).toBeDefined();
    });

    it('should return screen variables when in screen canvas design mode', () => {
      (useDesignMode as ReturnType<typeof vi.fn>).mockReturnValue({
        isScreenCanvasInDesignMode: true,
      });

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

    it('should react to design mode context changes', () => {
      const { result, rerender } = renderHook(() => useDataVariableControl());

      // Initially in screen canvas design mode
      expect(result.current.variables).toEqual(mockScreenVariables.allVariables);

      // Change context to component design mode
      (useDesignMode as ReturnType<typeof vi.fn>).mockReturnValue({
        isScreenCanvasInDesignMode: false,
      });

      rerender();

      // Should now return component variables
      expect(result.current.variables).toEqual(mockComponentVariables.allVariables);
    });

    it('should handle multiple context reads', () => {
      const { result, rerender } = renderHook(() => useDataVariableControl());

      // First read
      expect(result.current.variables).toEqual(mockScreenVariables.allVariables);

      // Second read (same context)
      rerender();
      expect(result.current.variables).toEqual(mockScreenVariables.allVariables);

      // Third read (different context)
      (useDesignMode as ReturnType<typeof vi.fn>).mockReturnValue({
        isScreenCanvasInDesignMode: false,
      });
      rerender();
      expect(result.current.variables).toEqual(mockComponentVariables.allVariables);
    });
  });

  // ═══════════════════════════════════════════════════════════════
  // CATEGORY 2: CONTEXT-DRIVEN VARIABLE SELECTION (5 tests)
  // ═══════════════════════════════════════════════════════════════

  describe('Context-Driven Variable Selection', () => {
    it('should select correct variables based on context state', () => {
      // Test screen canvas mode
      (useDesignMode as ReturnType<typeof vi.fn>).mockReturnValue({
        isScreenCanvasInDesignMode: true,
      });

      const { result: screenResult } = renderHook(() => useDataVariableControl());
      expect(screenResult.current.variables).toHaveLength(2);
      expect(screenResult.current.variables[0].id).toBe('screen-var-1');

      // Test component mode
      (useDesignMode as ReturnType<typeof vi.fn>).mockReturnValue({
        isScreenCanvasInDesignMode: false,
      });

      const { result: compResult } = renderHook(() => useDataVariableControl());
      expect(compResult.current.variables).toHaveLength(2);
      expect(compResult.current.variables[0].id).toBe('comp-var-1');
    });

    it('should handle context changes with different variable counts', () => {
      // Screen mode with 2 variables
      (useDesignMode as ReturnType<typeof vi.fn>).mockReturnValue({
        isScreenCanvasInDesignMode: true,
      });

      const { result, rerender } = renderHook(() => useDataVariableControl());
      expect(result.current.variables).toHaveLength(2);

      // Component mode with 3 variables
      (useDesignMode as ReturnType<typeof vi.fn>).mockReturnValue({
        isScreenCanvasInDesignMode: false,
      });

      (useVariables as ReturnType<typeof vi.fn>).mockReturnValue({
        selectedScreenVariables: mockScreenVariables,
        selectedComponentVariables: {
          allVariables: [
            { id: 'comp-var-1', name: 'var1', value: 'v1' },
            { id: 'comp-var-2', name: 'var2', value: 'v2' },
            { id: 'comp-var-3', name: 'var3', value: 'v3' },
          ],
        },
      });

      rerender();
      expect(result.current.variables).toHaveLength(3);
    });

    it('should handle context with empty variables', () => {
      (useDesignMode as ReturnType<typeof vi.fn>).mockReturnValue({
        isScreenCanvasInDesignMode: true,
      });

      (useVariables as ReturnType<typeof vi.fn>).mockReturnValue({
        selectedScreenVariables: { allVariables: [] },
        selectedComponentVariables: mockComponentVariables,
      });

      const { result } = renderHook(() => useDataVariableControl());

      expect(result.current.variables).toEqual([]);
    });

    it('should handle rapid context mode switches', () => {
      const { result, rerender } = renderHook(() => useDataVariableControl());

      // Switch between modes multiple times
      for (let i = 0; i < 5; i++) {
        (useDesignMode as ReturnType<typeof vi.fn>).mockReturnValue({
          isScreenCanvasInDesignMode: i % 2 === 0,
        });

        rerender();

        if (i % 2 === 0) {
          expect(result.current.variables).toEqual(mockScreenVariables.allVariables);
        } else {
          expect(result.current.variables).toEqual(mockComponentVariables.allVariables);
        }
      }
    });

    it('should maintain variable selection consistency with context', () => {
      const { result, rerender } = renderHook(() => useDataVariableControl());

      // Screen mode
      expect(result.current.variables).toEqual(mockScreenVariables.allVariables);

      // Update screen variables
      const newScreenVariables = {
        allVariables: [
          { id: 'new-screen-var-1', name: 'newVar1', value: 'newValue1' },
        ],
      };

      (useVariables as ReturnType<typeof vi.fn>).mockReturnValue({
        selectedScreenVariables: newScreenVariables,
        selectedComponentVariables: mockComponentVariables,
      });

      rerender();

      // Should reflect new screen variables (still in screen mode)
      expect(result.current.variables).toEqual(newScreenVariables.allVariables);

      // Switch to component mode
      (useDesignMode as ReturnType<typeof vi.fn>).mockReturnValue({
        isScreenCanvasInDesignMode: false,
      });

      rerender();

      // Should now show component variables
      expect(result.current.variables).toEqual(mockComponentVariables.allVariables);
    });
  });
});

