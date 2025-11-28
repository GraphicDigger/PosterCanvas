// ===================================================================
// USE PROPS HOOK - COMPREHENSIVE TESTS
// ===================================================================
// Entity: varProp
// Hooks: useProps, useProp
// Purpose: Provides access to component props from Redux store
// Coverage: All props, selected component props, prop by ID
// ===================================================================

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useSelector } from 'react-redux';
import { useProps, useProp } from './useProps';
import * as propSelectors from '../store/selectors';
import { useComponents } from '../../../uiComponent';

// Mock dependencies
vi.mock('react-redux', () => ({
  useSelector: vi.fn(),
}));

vi.mock('../store/selectors', () => ({
  selectAllProps: vi.fn(),
  selectPropsByComponentId: vi.fn(),
  selectPropById: vi.fn(),
}));

vi.mock('../../../uiComponent', () => ({
  useComponents: vi.fn(),
}));

describe('useProps', () => {
  // Mock data
  const mockProps = [
    { id: 'prop-1', name: 'title', type: 'string', componentId: 'comp-1' },
    { id: 'prop-2', name: 'visible', type: 'boolean', componentId: 'comp-1' },
    { id: 'prop-3', name: 'count', type: 'number', componentId: 'comp-2' },
  ];

  const mockSelectedComponentId = 'comp-1';
  const mockSelectedComponentProps = [mockProps[0], mockProps[1]];

  beforeEach(() => {
    vi.clearAllMocks();

    useComponents.mockReturnValue({
      selectedComponentId: mockSelectedComponentId,
    });

    useSelector.mockImplementation((selector) => {
      if (selector === propSelectors.selectAllProps) {
        return mockProps;
      }
      if (typeof selector === 'function') {
        return mockSelectedComponentProps;
      }
      return undefined;
    });
  });

  // ===================================================================
  // BASIC FUNCTIONALITY TESTS
  // ===================================================================

  describe('Basic Functionality', () => {
    it('should return all props', () => {
      const { result } = renderHook(() => useProps());

      expect(result.current.allProps).toEqual(mockProps);
      expect(result.current.allProps).toHaveLength(3);
    });

    it('should return selected component props', () => {
      const { result } = renderHook(() => useProps());

      expect(result.current.selectedComponentProps).toEqual(mockSelectedComponentProps);
      expect(result.current.selectedComponentProps).toHaveLength(2);
    });

    it('should return both properties', () => {
      const { result } = renderHook(() => useProps());

      expect(result.current).toHaveProperty('allProps');
      expect(result.current).toHaveProperty('selectedComponentProps');
    });
  });

  // ===================================================================
  // EMPTY STATE TESTS
  // ===================================================================

  describe('Empty States', () => {
    it('should handle empty props list', () => {
      useSelector.mockImplementation((selector) => {
        if (selector === propSelectors.selectAllProps) {
          return [];
        }
        if (typeof selector === 'function') {
          return [];
        }
        return undefined;
      });

      const { result } = renderHook(() => useProps());

      expect(result.current.allProps).toEqual([]);
      expect(result.current.selectedComponentProps).toEqual([]);
    });

    it('should handle no selected component', () => {
      useComponents.mockReturnValue({
        selectedComponentId: null,
      });

      useSelector.mockImplementation((selector) => {
        if (selector === propSelectors.selectAllProps) {
          return mockProps;
        }
        if (typeof selector === 'function') {
          return [];
        }
        return undefined;
      });

      const { result } = renderHook(() => useProps());

      expect(result.current.selectedComponentProps).toEqual([]);
      expect(result.current.allProps).toEqual(mockProps);
    });

    it('should handle component with no props', () => {
      useSelector.mockImplementation((selector) => {
        if (selector === propSelectors.selectAllProps) {
          return mockProps;
        }
        if (typeof selector === 'function') {
          return [];
        }
        return undefined;
      });

      const { result } = renderHook(() => useProps());

      expect(result.current.selectedComponentProps).toEqual([]);
    });
  });

  // ===================================================================
  // INTEGRATION TESTS
  // ===================================================================

  describe('Integration', () => {
    it('should integrate with useComponents hook', () => {
      const { result } = renderHook(() => useProps());

      expect(useComponents).toHaveBeenCalled();
      expect(result.current.selectedComponentProps).toBeDefined();
    });

    it('should filter props by selected component ID', () => {
      const { result } = renderHook(() => useProps());

      // All returned props should belong to the selected component
      const allBelongToComponent = result.current.selectedComponentProps.every(
        prop => prop.componentId === mockSelectedComponentId,
      );
      expect(allBelongToComponent).toBe(true);
    });

    it('should handle dynamic component ID changes', () => {
      useComponents.mockReturnValue({
        selectedComponentId: 'comp-2',
      });

      useSelector.mockImplementation((selector) => {
        if (selector === propSelectors.selectAllProps) {
          return mockProps;
        }
        if (typeof selector === 'function') {
          return [mockProps[2]];
        }
        return undefined;
      });

      const { result } = renderHook(() => useProps());

      expect(result.current.selectedComponentProps).toHaveLength(1);
      expect(result.current.selectedComponentProps[0].id).toBe('prop-3');
    });

    it('should maintain allProps regardless of selected component', () => {
      useComponents.mockReturnValue({
        selectedComponentId: 'comp-999',
      });

      useSelector.mockImplementation((selector) => {
        if (selector === propSelectors.selectAllProps) {
          return mockProps;
        }
        if (typeof selector === 'function') {
          return [];
        }
        return undefined;
      });

      const { result } = renderHook(() => useProps());

      expect(result.current.allProps).toEqual(mockProps);
      expect(result.current.selectedComponentProps).toEqual([]);
    });
  });
});

describe('useProp', () => {
  const mockProp = { id: 'prop-5', name: 'disabled', type: 'boolean' };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  // ===================================================================
  // BASIC FUNCTIONALITY TESTS
  // ===================================================================

  describe('Basic Functionality', () => {
    it('should return prop by provided ID', () => {
      useSelector.mockImplementation((selector) => {
        if (typeof selector === 'function') {
          return mockProp;
        }
        return mockProp;
      });

      const { result } = renderHook(() => useProp('prop-5'));

      expect(result.current.prop).toEqual(mockProp);
      expect(result.current.prop.id).toBe('prop-5');
    });

    it('should return propById function', () => {
      useSelector.mockImplementation((selector) => {
        return mockProp;
      });

      const { result } = renderHook(() => useProp('prop-5'));

      expect(result.current).toHaveProperty('propById');
    });

    it('should handle null for non-existent ID', () => {
      useSelector.mockImplementation((selector) => {
        return null;
      });

      const { result } = renderHook(() => useProp('non-existent'));

      expect(result.current.prop).toBeNull();
    });

    it('should handle null ID parameter', () => {
      useSelector.mockImplementation((selector) => {
        return null;
      });

      const { result } = renderHook(() => useProp(null));

      expect(result.current.prop).toBeNull();
    });

    it('should handle undefined ID parameter', () => {
      useSelector.mockImplementation((selector) => {
        return null;
      });

      const { result } = renderHook(() => useProp(undefined));

      expect(result.current.prop).toBeNull();
    });

    it('should return both prop properties', () => {
      useSelector.mockImplementation((selector) => {
        return mockProp;
      });

      const { result } = renderHook(() => useProp('prop-5'));

      expect(Object.keys(result.current)).toEqual(['prop', 'propById']);
    });
  });
});

