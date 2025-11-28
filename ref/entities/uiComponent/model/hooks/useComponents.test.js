// ===================================================================
// USE COMPONENTS HOOK - COMPREHENSIVE TESTS
// ===================================================================
// Entity: uiComponent
// Hooks: useComponents, useComponentCodes
// Purpose: Provides access to components and their codes from Redux store
// Coverage: All components, selected component, component codes, JSX code
// ===================================================================

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useSelector } from 'react-redux';
import { useComponents, useComponentCodes } from './useComponents';
import * as componentStore from '../store';
import { selectCodesByComponentId, CODE_LANG } from '../../../code';

// Mock dependencies
vi.mock('react-redux', () => ({
  useSelector: vi.fn(),
}));

vi.mock('../store', () => ({
  selectAllComponents: vi.fn(),
  selectSelectedComponent: vi.fn(),
  selectSelectedComponentId: vi.fn(),
  selectCompositeComponentById: vi.fn(),
}));

vi.mock('../../../code', () => ({
  selectCodesByComponentId: vi.fn(),
  CODE_LANG: {
    JSX: 'jsx',
    CSS: 'css',
    JS: 'js',
  },
}));

describe('useComponents', () => {
  // Mock data
  const mockComponents = [
    { id: 'comp-1', name: 'Button', type: 'component' },
    { id: 'comp-2', name: 'Input', type: 'component' },
    { id: 'comp-3', name: 'Card', type: 'component' },
  ];

  const mockSelectedComponentId = 'comp-1';
  const mockSelectedComponent = mockComponents[0];

  const mockCodes = [
    { id: 'code-1', componentId: 'comp-1', lang: CODE_LANG.JSX, content: '<Button />' },
    { id: 'code-2', componentId: 'comp-1', lang: CODE_LANG.CSS, content: '.button {}' },
  ];

  const mockJsxCode = mockCodes[0];

  beforeEach(() => {
    vi.clearAllMocks();

    // Setup useSelector to call the selector function
    let selectorCallCount = 0;
    useSelector.mockImplementation((selector) => {
      if (selector === componentStore.selectAllComponents) {
        return mockComponents;
      }
      if (selector === componentStore.selectSelectedComponentId) {
        return mockSelectedComponentId;
      }
      if (typeof selector === 'function') {
        selectorCallCount++;
        // First call is for selectCompositeComponentById (returns component)
        if (selectorCallCount === 1) {
          return mockSelectedComponent;
        }
        // Second call is for selectCodesByComponentId (returns codes)
        return mockCodes;
      }
      return undefined;
    });
  });

  // ===================================================================
  // BASIC FUNCTIONALITY TESTS
  // ===================================================================

  describe('Basic Functionality', () => {
    it('should return all components', () => {
      const { result } = renderHook(() => useComponents());

      expect(result.current.allComponents).toEqual(mockComponents);
      expect(result.current.allComponents).toHaveLength(3);
    });

    it('should return selected component ID', () => {
      const { result } = renderHook(() => useComponents());

      expect(result.current.selectedComponentId).toBe('comp-1');
    });

    it('should return selected component', () => {
      const { result } = renderHook(() => useComponents());

      expect(result.current.selectedComponent).toEqual(mockSelectedComponent);
    });

    it('should return selected component codes', () => {
      const { result } = renderHook(() => useComponents());

      expect(result.current.selectedComponentCodes).toEqual(mockCodes);
      expect(result.current.selectedComponentCodes).toHaveLength(2);
    });

    it('should return JSX code from selected component codes', () => {
      const { result } = renderHook(() => useComponents());

      expect(result.current.jsxCode).toEqual(mockJsxCode);
      expect(result.current.jsxCode.lang).toBe(CODE_LANG.JSX);
    });

    it('should return all five properties', () => {
      const { result } = renderHook(() => useComponents());

      expect(result.current).toHaveProperty('allComponents');
      expect(result.current).toHaveProperty('selectedComponent');
      expect(result.current).toHaveProperty('selectedComponentId');
      expect(result.current).toHaveProperty('selectedComponentCodes');
      expect(result.current).toHaveProperty('jsxCode');
    });
  });

  // ===================================================================
  // EMPTY STATE TESTS
  // ===================================================================

  describe('Empty States', () => {
    it('should handle empty component list', () => {
      let callCount = 0;
      useSelector.mockImplementation((selector) => {
        if (selector === componentStore.selectAllComponents) {
          return [];
        }
        if (selector === componentStore.selectSelectedComponentId) {
          return null;
        }
        if (typeof selector === 'function') {
          callCount++;
          // First call: selectCompositeComponentById returns null
          if (callCount === 1) {return null;}
          // Second call: selectCodesByComponentId returns []
          return [];
        }
        return undefined;
      });

      const { result } = renderHook(() => useComponents());

      expect(result.current.allComponents).toEqual([]);
      expect(result.current.selectedComponentId).toBeNull();
      expect(result.current.selectedComponent).toBeNull();
    });

    it('should handle no selected component', () => {
      let callCount = 0;
      useSelector.mockImplementation((selector) => {
        if (selector === componentStore.selectAllComponents) {
          return mockComponents;
        }
        if (selector === componentStore.selectSelectedComponentId) {
          return null;
        }
        if (typeof selector === 'function') {
          callCount++;
          // First call: selectCompositeComponentById returns null
          if (callCount === 1) {return null;}
          // Second call: selectCodesByComponentId returns []
          return [];
        }
        return undefined;
      });

      const { result } = renderHook(() => useComponents());

      expect(result.current.selectedComponentId).toBeNull();
      expect(result.current.selectedComponent).toBeNull();
    });

    it('should handle no codes for selected component', () => {
      useSelector.mockImplementation((selector) => {
        if (selector === componentStore.selectAllComponents) {
          return mockComponents;
        }
        if (selector === componentStore.selectSelectedComponentId) {
          return mockSelectedComponentId;
        }
        if (typeof selector === 'function') {
          const result = selector({});
          if (result && result.id) {
            return mockSelectedComponent;
          }
          return [];
        }
        return undefined;
      });

      const { result } = renderHook(() => useComponents());

      expect(result.current.selectedComponentCodes).toEqual([]);
      expect(result.current.jsxCode).toBeUndefined();
    });

    it('should handle no JSX code in component codes', () => {
      const codesWithoutJsx = [
        { id: 'code-2', componentId: 'comp-1', lang: CODE_LANG.CSS, content: '.button {}' },
      ];

      useSelector.mockImplementation((selector) => {
        if (selector === componentStore.selectAllComponents) {
          return mockComponents;
        }
        if (selector === componentStore.selectSelectedComponentId) {
          return mockSelectedComponentId;
        }
        if (typeof selector === 'function') {
          const result = selector({});
          if (result && result.id) {
            return mockSelectedComponent;
          }
          return codesWithoutJsx;
        }
        return undefined;
      });

      const { result } = renderHook(() => useComponents());

      expect(result.current.jsxCode).toBeUndefined();
    });
  });
});

describe('useComponentCodes', () => {
  const mockCodes = [
    { id: 'code-1', componentId: 'comp-2', lang: 'jsx', content: '<Input />' },
    { id: 'code-3', componentId: 'comp-2', lang: 'css', content: '.input {}' },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  // ===================================================================
  // BASIC FUNCTIONALITY TESTS
  // ===================================================================

  describe('Basic Functionality', () => {
    it('should return codes for provided component ID', () => {
      useSelector.mockImplementation((selector) => {
        if (typeof selector === 'function') {
          return mockCodes;
        }
        return undefined;
      });

      const { result } = renderHook(() => useComponentCodes('comp-2'));

      expect(result.current.codesByComponentId).toEqual(mockCodes);
      expect(result.current.codesByComponentId).toHaveLength(2);
    });

    it('should return JSX code from component codes', () => {
      useSelector.mockImplementation((selector) => {
        if (typeof selector === 'function') {
          return mockCodes;
        }
        return undefined;
      });

      const { result } = renderHook(() => useComponentCodes('comp-2'));

      expect(result.current.jsxCode).toEqual(mockCodes[0]);
      expect(result.current.jsxCode.lang).toBe('jsx');
    });

    it('should return empty array for component with no codes', () => {
      useSelector.mockImplementation((selector) => {
        if (typeof selector === 'function') {
          return [];
        }
        return undefined;
      });

      const { result } = renderHook(() => useComponentCodes('comp-no-codes'));

      expect(result.current.codesByComponentId).toEqual([]);
      expect(result.current.jsxCode).toBeUndefined();
    });

    it('should handle null component ID', () => {
      useSelector.mockImplementation((selector) => {
        if (typeof selector === 'function') {
          return [];
        }
        return undefined;
      });

      const { result } = renderHook(() => useComponentCodes(null));

      expect(result.current.codesByComponentId).toEqual([]);
    });

    it('should handle undefined component ID', () => {
      useSelector.mockImplementation((selector) => {
        if (typeof selector === 'function') {
          return [];
        }
        return undefined;
      });

      const { result } = renderHook(() => useComponentCodes(undefined));

      expect(result.current.codesByComponentId).toEqual([]);
    });

    it('should handle codes without JSX', () => {
      const cssOnlyCodes = [
        { id: 'code-3', componentId: 'comp-2', lang: 'css', content: '.input {}' },
      ];

      useSelector.mockImplementation((selector) => {
        if (typeof selector === 'function') {
          return cssOnlyCodes;
        }
        return undefined;
      });

      const { result } = renderHook(() => useComponentCodes('comp-2'));

      expect(result.current.codesByComponentId).toHaveLength(1);
      expect(result.current.jsxCode).toBeUndefined();
    });
  });
});

