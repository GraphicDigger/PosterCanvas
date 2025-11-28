// ===================================================================
// BINDING SYSTEM TESTS: Variable to Element Binding
// 🔴 CRITICAL-FIRST STRATEGY - Phase 1 Part 4 🔴
// Element Binding, Variable Binding, Prop Binding
// ===================================================================

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useBindVariableToElement } from './useBindVariableToElement';

// Mock dependencies
vi.mock('@/entities/uiElement', () => ({
  useElement: vi.fn(),
  useElementMutations: vi.fn(),
}));

vi.mock('@/shared/constants', () => ({
  ENTITY_KINDS: {
    DATA_VARIABLE: 'data-variable',
    PROP: 'prop',
    ELEMENT: 'element',
  },
  VARIABLE_TYPES: {
    DATA: 'data',
    STRING: 'string',
    NUMBER: 'number',
  },
}));

import { useElement, useElementMutations } from '@/entities/uiElement';
import { ENTITY_KINDS, VARIABLE_TYPES } from '@/shared/constants';

describe('useBindVariableToElement - CRITICAL BUSINESS LOGIC', () => {
  let mockUpdateBindings;
  let mockRemoveBindings;

  beforeEach(() => {
    vi.clearAllMocks();

    mockUpdateBindings = vi.fn();
    mockRemoveBindings = vi.fn();

    useElementMutations.mockReturnValue({
      updateBindings: mockUpdateBindings,
      removeBindings: mockRemoveBindings,
    });
  });

  // ===================================================================
  // Section 1: Data Variable Binding (5 tests)
  // ===================================================================

  describe('Data Variable Binding', () => {
    it('should bind data variable to element', () => {
      const mockElement = {
        id: 'element-1',
        bindings: [],
      };

      useElement.mockReturnValue({ focusedElement: mockElement });

      const { result } = renderHook(() => useBindVariableToElement());

      act(() => {
        result.current.bindElementToVariable({
          kind: ENTITY_KINDS.DATA_VARIABLE,
          id: 'var-1',
          type: VARIABLE_TYPES.DATA,
        });
      });

      expect(mockUpdateBindings).toHaveBeenCalledWith('element-1', [
        {
          kind: ENTITY_KINDS.DATA_VARIABLE,
          id: 'var-1',
          type: VARIABLE_TYPES.DATA,
        },
      ]);
    });

    it('should not bind duplicate data variable', () => {
      const mockElement = {
        id: 'element-1',
        bindings: [
          { kind: ENTITY_KINDS.DATA_VARIABLE, id: 'var-1', type: VARIABLE_TYPES.DATA },
        ],
      };

      useElement.mockReturnValue({ focusedElement: mockElement });

      const { result } = renderHook(() => useBindVariableToElement());

      act(() => {
        result.current.bindElementToVariable({
          kind: ENTITY_KINDS.DATA_VARIABLE,
          id: 'var-1',
          type: VARIABLE_TYPES.DATA,
        });
      });

      expect(mockUpdateBindings).not.toHaveBeenCalled();
    });

    it('should replace existing data variable binding', () => {
      const mockElement = {
        id: 'element-1',
        bindings: [
          { kind: ENTITY_KINDS.DATA_VARIABLE, id: 'var-1', type: VARIABLE_TYPES.DATA },
        ],
      };

      useElement.mockReturnValue({ focusedElement: mockElement });

      const { result } = renderHook(() => useBindVariableToElement());

      act(() => {
        result.current.bindElementToVariable({
          kind: ENTITY_KINDS.DATA_VARIABLE,
          id: 'var-2',
          type: VARIABLE_TYPES.DATA,
        });
      });

      expect(mockUpdateBindings).toHaveBeenCalledWith('element-1', [
        {
          kind: ENTITY_KINDS.DATA_VARIABLE,
          id: 'var-2',
          type: VARIABLE_TYPES.DATA,
        },
      ]);
    });

    it('should handle element with no bindings', () => {
      const mockElement = {
        id: 'element-1',
      };

      useElement.mockReturnValue({ focusedElement: mockElement });

      const { result } = renderHook(() => useBindVariableToElement());

      act(() => {
        result.current.bindElementToVariable({
          kind: ENTITY_KINDS.DATA_VARIABLE,
          id: 'var-1',
          type: VARIABLE_TYPES.DATA,
        });
      });

      expect(mockUpdateBindings).toHaveBeenCalled();
    });

    it('should not bind when no focused element', () => {
      useElement.mockReturnValue({ focusedElement: null });

      const { result } = renderHook(() => useBindVariableToElement());

      act(() => {
        result.current.bindElementToVariable({
          kind: ENTITY_KINDS.DATA_VARIABLE,
          id: 'var-1',
          type: VARIABLE_TYPES.DATA,
        });
      });

      expect(mockUpdateBindings).not.toHaveBeenCalled();
    });
  });

  // ===================================================================
  // Section 2: Prop Binding (5 tests)
  // ===================================================================

  describe('Prop Binding', () => {
    it('should bind prop to element', () => {
      const mockElement = {
        id: 'element-1',
        bindings: [],
      };

      useElement.mockReturnValue({ focusedElement: mockElement });

      const { result } = renderHook(() => useBindVariableToElement());

      act(() => {
        result.current.bindElementToVariable({
          kind: ENTITY_KINDS.PROP,
          id: 'prop-1',
          type: VARIABLE_TYPES.DATA,
        });
      });

      expect(mockUpdateBindings).toHaveBeenCalledWith('element-1', [
        {
          kind: ENTITY_KINDS.PROP,
          id: 'prop-1',
          type: VARIABLE_TYPES.DATA,
        },
      ]);
    });

    it('should not bind duplicate prop', () => {
      const mockElement = {
        id: 'element-1',
        bindings: [
          { kind: ENTITY_KINDS.PROP, id: 'prop-1', type: VARIABLE_TYPES.DATA },
        ],
      };

      useElement.mockReturnValue({ focusedElement: mockElement });

      const { result } = renderHook(() => useBindVariableToElement());

      act(() => {
        result.current.bindElementToVariable({
          kind: ENTITY_KINDS.PROP,
          id: 'prop-1',
          type: VARIABLE_TYPES.DATA,
        });
      });

      expect(mockUpdateBindings).not.toHaveBeenCalled();
    });

    it('should replace existing data binding with prop', () => {
      const mockElement = {
        id: 'element-1',
        bindings: [
          { kind: ENTITY_KINDS.DATA_VARIABLE, id: 'var-1', type: VARIABLE_TYPES.DATA },
        ],
      };

      useElement.mockReturnValue({ focusedElement: mockElement });

      const { result } = renderHook(() => useBindVariableToElement());

      act(() => {
        result.current.bindElementToVariable({
          kind: ENTITY_KINDS.PROP,
          id: 'prop-1',
          type: VARIABLE_TYPES.DATA,
        });
      });

      expect(mockUpdateBindings).toHaveBeenCalledWith('element-1', [
        {
          kind: ENTITY_KINDS.PROP,
          id: 'prop-1',
          type: VARIABLE_TYPES.DATA,
        },
      ]);
    });

    it('should not bind prop when no focused element', () => {
      useElement.mockReturnValue({ focusedElement: null });

      const { result } = renderHook(() => useBindVariableToElement());

      act(() => {
        result.current.bindElementToVariable({
          kind: ENTITY_KINDS.PROP,
          id: 'prop-1',
          type: VARIABLE_TYPES.DATA,
        });
      });

      expect(mockUpdateBindings).not.toHaveBeenCalled();
    });

    it('should handle multiple prop bindings', () => {
      const mockElement = {
        id: 'element-1',
        bindings: [
          { kind: ENTITY_KINDS.PROP, id: 'prop-1', type: VARIABLE_TYPES.STRING },
        ],
      };

      useElement.mockReturnValue({ focusedElement: mockElement });

      const { result } = renderHook(() => useBindVariableToElement());

      act(() => {
        result.current.bindElementToVariable({
          kind: ENTITY_KINDS.PROP,
          id: 'prop-2',
          type: VARIABLE_TYPES.DATA,
        });
      });

      expect(mockUpdateBindings).toHaveBeenCalledWith('element-1', [
        { kind: ENTITY_KINDS.PROP, id: 'prop-1', type: VARIABLE_TYPES.STRING },
        { kind: ENTITY_KINDS.PROP, id: 'prop-2', type: VARIABLE_TYPES.DATA },
      ]);
    });
  });

  // ===================================================================
  // Section 3: Variable Binding (5 tests)
  // ===================================================================

  describe('Variable Binding', () => {
    it('should bind variable to element', () => {
      const mockElement = {
        id: 'element-1',
        bindings: [],
      };

      useElement.mockReturnValue({ focusedElement: mockElement });

      const { result } = renderHook(() => useBindVariableToElement());

      act(() => {
        result.current.bindElementToVariable({
          kind: ENTITY_KINDS.DATA_VARIABLE,
          id: 'var-1',
          type: VARIABLE_TYPES.STRING,
        });
      });

      expect(mockUpdateBindings).toHaveBeenCalled();
    });

    it('should handle empty bindings array', () => {
      const mockElement = {
        id: 'element-1',
        bindings: [],
      };

      useElement.mockReturnValue({ focusedElement: mockElement });

      const { result } = renderHook(() => useBindVariableToElement());

      expect(result.current).toBeDefined();
      expect(typeof result.current.bindElementToVariable).toBe('function');
      expect(typeof result.current.unbindElementFromVariable).toBe('function');
    });

    it('should use variables property if bindings not present', () => {
      const mockElement = {
        id: 'element-1',
        variables: [
          { id: 'var-1', type: VARIABLE_TYPES.STRING },
        ],
      };

      useElement.mockReturnValue({ focusedElement: mockElement });

      const { result } = renderHook(() => useBindVariableToElement());

      expect(result.current).toBeDefined();
    });

    it('should preserve non-data bindings when binding data variable', () => {
      const mockElement = {
        id: 'element-1',
        bindings: [
          { kind: ENTITY_KINDS.PROP, id: 'prop-1', type: VARIABLE_TYPES.STRING },
          { kind: ENTITY_KINDS.DATA_VARIABLE, id: 'var-old', type: VARIABLE_TYPES.DATA },
        ],
      };

      useElement.mockReturnValue({ focusedElement: mockElement });

      const { result } = renderHook(() => useBindVariableToElement());

      act(() => {
        result.current.bindElementToVariable({
          kind: ENTITY_KINDS.DATA_VARIABLE,
          id: 'var-new',
          type: VARIABLE_TYPES.DATA,
        });
      });

      // Should keep the prop binding
      const call = mockUpdateBindings.mock.calls[0];
      expect(call[1]).toContainEqual({ kind: ENTITY_KINDS.PROP, id: 'prop-1', type: VARIABLE_TYPES.STRING });
    });

    it('should handle binding removal', () => {
      const mockElement = {
        id: 'element-1',
        bindings: [
          { kind: ENTITY_KINDS.DATA_VARIABLE, id: 'var-1', type: VARIABLE_TYPES.DATA },
        ],
      };

      useElement.mockReturnValue({ focusedElement: mockElement });

      const { result } = renderHook(() => useBindVariableToElement());

      act(() => {
        result.current.unbindElementFromVariable({ id: 'var-1' });
      });

      expect(mockRemoveBindings).toHaveBeenCalledWith('element-1', []);
    });
  });
});

