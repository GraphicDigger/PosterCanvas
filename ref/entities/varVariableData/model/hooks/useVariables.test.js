// ===================================================================
// USE VARIABLES HOOK - COMPREHENSIVE TESTS
// ===================================================================
// Entity: varVariableData
// Hooks: useVariables, useVariable
// Purpose: Provides access to data variables from Redux store
// Coverage: All variables, screen variables, component variables, by ID
// ===================================================================

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useSelector } from 'react-redux';
import { useVariables, useVariable } from './useVariables';
import * as variableStore from '../store';

// Mock dependencies
vi.mock('react-redux', () => ({
  useSelector: vi.fn(),
}));

vi.mock('../store', () => ({
  selectAllVariables: vi.fn(),
  selectVariablesBySelectedScreen: vi.fn(),
  selectVariablesBySelectedComponent: vi.fn(),
  selectVariableById: vi.fn(),
  makeSelectVariableById: vi.fn(() => vi.fn()),
  makeSelectVariableByIds: vi.fn(() => vi.fn()),
  selectScreenVariables: vi.fn(),
  selectComponentVariables: vi.fn(),
  selectVariablesByScreenId: vi.fn(),
  selectVariablesByComponentId: vi.fn(),
}));

describe('useVariables', () => {
  // Mock data
  const mockVariables = [
    { id: 'var-1', name: 'username', type: 'string', screenId: 'screen-1' },
    { id: 'var-2', name: 'count', type: 'number', screenId: 'screen-1' },
    { id: 'var-3', name: 'isActive', type: 'boolean', componentId: 'comp-1' },
  ];

  const mockScreenVariables = [mockVariables[0], mockVariables[1]];
  const mockComponentVariables = [mockVariables[2]];

  beforeEach(() => {
    vi.clearAllMocks();

    useSelector.mockImplementation((selector) => {
      if (selector === variableStore.selectAllVariables) {
        return mockVariables;
      }
      if (selector === variableStore.selectVariablesBySelectedScreen) {
        return mockScreenVariables;
      }
      if (selector === variableStore.selectVariablesBySelectedComponent) {
        return mockComponentVariables;
      }
      return undefined;
    });
  });

  // ===================================================================
  // BASIC FUNCTIONALITY TESTS
  // ===================================================================

  describe('Basic Functionality', () => {
    it('should return all variables', () => {
      const { result } = renderHook(() => useVariables());

      expect(result.current.allVariables).toEqual(mockVariables);
      expect(result.current.allVariables).toHaveLength(3);
    });

    it('should return selected screen variables', () => {
      const { result } = renderHook(() => useVariables());

      expect(result.current.selectedScreenVariables).toEqual(mockScreenVariables);
      expect(result.current.selectedScreenVariables).toHaveLength(2);
    });

    it('should return selected component variables', () => {
      const { result } = renderHook(() => useVariables());

      expect(result.current.selectedComponentVariables).toEqual(mockComponentVariables);
      expect(result.current.selectedComponentVariables).toHaveLength(1);
    });

    it('should return all three properties', () => {
      const { result } = renderHook(() => useVariables());

      expect(result.current).toHaveProperty('allVariables');
      expect(result.current).toHaveProperty('selectedScreenVariables');
      expect(result.current).toHaveProperty('selectedComponentVariables');
    });

    it('should have correct variable types', () => {
      const { result } = renderHook(() => useVariables());

      expect(result.current.allVariables[0].type).toBe('string');
      expect(result.current.allVariables[1].type).toBe('number');
      expect(result.current.allVariables[2].type).toBe('boolean');
    });
  });

  // ===================================================================
  // EMPTY STATE TESTS
  // ===================================================================

  describe('Empty States', () => {
    it('should handle empty variables list', () => {
      useSelector.mockImplementation((selector) => {
        if (selector === variableStore.selectAllVariables) {
          return [];
        }
        if (selector === variableStore.selectVariablesBySelectedScreen) {
          return [];
        }
        if (selector === variableStore.selectVariablesBySelectedComponent) {
          return [];
        }
        return undefined;
      });

      const { result } = renderHook(() => useVariables());

      expect(result.current.allVariables).toEqual([]);
      expect(result.current.selectedScreenVariables).toEqual([]);
      expect(result.current.selectedComponentVariables).toEqual([]);
    });

    it('should handle no selected screen variables', () => {
      useSelector.mockImplementation((selector) => {
        if (selector === variableStore.selectAllVariables) {
          return mockVariables;
        }
        if (selector === variableStore.selectVariablesBySelectedScreen) {
          return [];
        }
        if (selector === variableStore.selectVariablesBySelectedComponent) {
          return mockComponentVariables;
        }
        return undefined;
      });

      const { result } = renderHook(() => useVariables());

      expect(result.current.allVariables).toEqual(mockVariables);
      expect(result.current.selectedScreenVariables).toEqual([]);
      expect(result.current.selectedComponentVariables).toEqual(mockComponentVariables);
    });

    it('should handle no selected component variables', () => {
      useSelector.mockImplementation((selector) => {
        if (selector === variableStore.selectAllVariables) {
          return mockVariables;
        }
        if (selector === variableStore.selectVariablesBySelectedScreen) {
          return mockScreenVariables;
        }
        if (selector === variableStore.selectVariablesBySelectedComponent) {
          return [];
        }
        return undefined;
      });

      const { result } = renderHook(() => useVariables());

      expect(result.current.selectedComponentVariables).toEqual([]);
      expect(result.current.allVariables).toEqual(mockVariables);
      expect(result.current.selectedScreenVariables).toEqual(mockScreenVariables);
    });
  });
});

describe('useVariable', () => {
  const mockVariable = {
    id: 'var-5',
    name: 'email',
    type: 'string',
    value: 'test@example.com',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  // ===================================================================
  // BASIC FUNCTIONALITY TESTS
  // ===================================================================

  describe('Basic Functionality', () => {
    it('should return variable by provided ID', () => {
      useSelector.mockImplementation((selector) => {
        return mockVariable;
      });

      const { result } = renderHook(() => useVariable('var-5'));

      expect(result.current.variable).toEqual(mockVariable);
      expect(result.current.variable.id).toBe('var-5');
    });

    it('should return variableById function', () => {
      useSelector.mockImplementation((selector) => {
        return mockVariable;
      });

      const { result } = renderHook(() => useVariable('var-5'));

      expect(result.current).toHaveProperty('variableById');
    });

    it('should handle null for non-existent ID', () => {
      useSelector.mockImplementation((selector) => {
        return null;
      });

      const { result } = renderHook(() => useVariable('non-existent'));

      expect(result.current.variable).toBeNull();
    });

    it('should handle null ID parameter', () => {
      useSelector.mockImplementation((selector) => {
        return null;
      });

      const { result } = renderHook(() => useVariable(null));

      expect(result.current.variable).toBeNull();
    });

    it('should handle undefined ID parameter', () => {
      useSelector.mockImplementation((selector) => {
        return null;
      });

      const { result } = renderHook(() => useVariable(undefined));

      expect(result.current.variable).toBeNull();
    });

    it('should return both variable properties', () => {
      useSelector.mockImplementation((selector) => {
        return mockVariable;
      });

      const { result } = renderHook(() => useVariable('var-5'));

      expect(Object.keys(result.current)).toEqual(['variable', 'variableById']);
    });

    it('should handle variable with all properties', () => {
      useSelector.mockImplementation((selector) => {
        return mockVariable;
      });

      const { result } = renderHook(() => useVariable('var-5'));

      expect(result.current.variable).toHaveProperty('id');
      expect(result.current.variable).toHaveProperty('name');
      expect(result.current.variable).toHaveProperty('type');
      expect(result.current.variable).toHaveProperty('value');
    });
  });

  // ===================================================================
  // INTEGRATION TESTS
  // ===================================================================

  describe('Integration', () => {
    it('should work with string type variable', () => {
      const stringVar = { id: 'v1', name: 'title', type: 'string', value: 'Hello' };
      useSelector.mockImplementation((selector) => stringVar);

      const { result } = renderHook(() => useVariable('v1'));

      expect(result.current.variable.type).toBe('string');
      expect(result.current.variable.value).toBe('Hello');
    });

    it('should work with number type variable', () => {
      const numberVar = { id: 'v2', name: 'age', type: 'number', value: 42 };
      useSelector.mockImplementation((selector) => numberVar);

      const { result } = renderHook(() => useVariable('v2'));

      expect(result.current.variable.type).toBe('number');
      expect(result.current.variable.value).toBe(42);
    });

    it('should work with boolean type variable', () => {
      const boolVar = { id: 'v3', name: 'isVisible', type: 'boolean', value: true };
      useSelector.mockImplementation((selector) => boolVar);

      const { result } = renderHook(() => useVariable('v3'));

      expect(result.current.variable.type).toBe('boolean');
      expect(result.current.variable.value).toBe(true);
    });
  });
});

