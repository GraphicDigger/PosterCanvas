// ===================================================================
// USE API HOOK - COMPREHENSIVE TESTS
// ===================================================================
// Entity: api
// Hook: useApi
// Purpose: Provides access to API entities from Redux store
// Coverage: APIs, categories, selected api, custom apis, connectors
// ===================================================================

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useSelector } from 'react-redux';
import { useApi } from './useApi';
import * as stateSelectors from '../store/states/selectors';
import * as mutationSelectors from '../store/mutation/selectors';

// Mock dependencies
vi.mock('react-redux', () => ({
  useSelector: vi.fn(),
  useDispatch: vi.fn(),
}));

vi.mock('../store/states/selectors', () => ({
  selectSelectedApiId: vi.fn(),
  selectSelectedCategoryId: vi.fn(),
}));

vi.mock('../store/mutation/selectors', () => ({
  selectAllApis: vi.fn(),
  selectApiById: vi.fn(),
  selectApiConnector: vi.fn(),
  selectCustomApis: vi.fn(),
  selectCategoryApis: vi.fn(),
  selectCategories: vi.fn(),
  selectApisByCategoryId: vi.fn(),
  selectCategoryById: vi.fn(),
}));

describe('useApi', () => {
  // Mock data
  const mockApis = [
    { id: 'api-1', name: 'REST API', categoryId: 'cat-1', type: 'rest' },
    { id: 'api-2', name: 'GraphQL API', categoryId: 'cat-1', type: 'graphql' },
    { id: 'api-3', name: 'Custom API', categoryId: 'custom-api-category', type: 'custom' },
  ];

  const mockCategories = [
    { id: 'cat-1', name: 'Category 1' },
    { id: 'cat-2', name: 'Category 2' },
    { id: 'custom-api-category', name: 'Custom' },
  ];

  const mockCustomApis = [mockApis[2]];
  const mockCategoryApis = [mockApis[0], mockApis[1]];
  const mockSelectedApi = mockApis[0];
  const mockConnector = { id: 'conn-1', apiId: 'api-1', url: 'https://api.example.com' };

  beforeEach(() => {
    vi.clearAllMocks();

    let callCount = 0;
    useSelector.mockImplementation((selector) => {
      if (selector === mutationSelectors.selectAllApis) {
        return mockApis;
      }
      if (selector === mutationSelectors.selectCategories) {
        return mockCategories;
      }
      if (selector === stateSelectors.selectSelectedCategoryId) {
        return 'cat-1';
      }
      if (selector === mutationSelectors.selectCustomApis) {
        return mockCustomApis;
      }
      if (selector === stateSelectors.selectSelectedApiId) {
        return 'api-1';
      }
      if (typeof selector === 'function') {
        callCount++;
        // Pattern: factory selectors for by-id lookups
        if (callCount === 1) {return mockCategories[0];} // selectedCategory
        if (callCount === 2) {return mockCategoryApis;} // categoryApis
        if (callCount === 3) {return mockSelectedApi;} // selectedApi
        return mockConnector; // connector
      }
      return undefined;
    });
  });

  // ===================================================================
  // BASIC FUNCTIONALITY TESTS
  // ===================================================================

  describe('Basic Functionality', () => {
    it('should return all APIs', () => {
      const { result } = renderHook(() => useApi());

      expect(result.current.allApis).toEqual(mockApis);
      expect(result.current.allApis).toHaveLength(3);
    });

    it('should return API categories excluding custom', () => {
      const { result } = renderHook(() => useApi());

      expect(result.current.apiCategories).toHaveLength(2);
      expect(result.current.apiCategories.find(c => c.id === 'custom-api-category')).toBeUndefined();
    });

    it('should return selected category ID', () => {
      const { result } = renderHook(() => useApi());

      expect(result.current.selectedCategoryId).toBe('cat-1');
    });

    it('should return selected category', () => {
      const { result } = renderHook(() => useApi());

      expect(result.current.selectedCategory).toEqual(mockCategories[0]);
    });

    it('should return custom APIs', () => {
      const { result } = renderHook(() => useApi());

      expect(result.current.customApis).toEqual(mockCustomApis);
      expect(result.current.customApis).toHaveLength(1);
    });

    it('should return category APIs', () => {
      const { result } = renderHook(() => useApi());

      expect(result.current.categoryApis).toEqual(mockCategoryApis);
      expect(result.current.categoryApis).toHaveLength(2);
    });

    it('should return selected API ID', () => {
      const { result } = renderHook(() => useApi());

      expect(result.current.selectedApiId).toBe('api-1');
    });

    it('should return selected API', () => {
      const { result } = renderHook(() => useApi());

      expect(result.current.selectedApi).toEqual(mockSelectedApi);
    });

    it('should return connector', () => {
      const { result } = renderHook(() => useApi());

      expect(result.current.connector).toEqual(mockConnector);
    });

    it('should return all expected properties', () => {
      const { result } = renderHook(() => useApi());

      expect(result.current).toHaveProperty('apiCategories');
      expect(result.current).toHaveProperty('selectedCategoryId');
      expect(result.current).toHaveProperty('selectedCategory');
      expect(result.current).toHaveProperty('categoryApis');
      expect(result.current).toHaveProperty('allApis');
      expect(result.current).toHaveProperty('customApis');
      expect(result.current).toHaveProperty('selectedApiId');
      expect(result.current).toHaveProperty('selectedApi');
      expect(result.current).toHaveProperty('connector');
    });
  });

  // ===================================================================
  // CATEGORY FILTERING TESTS
  // ===================================================================

  describe('Category Filtering', () => {
    it('should filter out custom-api-category from categories', () => {
      const { result } = renderHook(() => useApi());

      const categoryIds = result.current.apiCategories.map(c => c.id);
      expect(categoryIds).not.toContain('custom-api-category');
    });

    it('should include non-custom categories', () => {
      const { result } = renderHook(() => useApi());

      const categoryIds = result.current.apiCategories.map(c => c.id);
      expect(categoryIds).toContain('cat-1');
      expect(categoryIds).toContain('cat-2');
    });
  });

  // ===================================================================
  // EMPTY STATE TESTS
  // ===================================================================

  describe('Empty States', () => {
    it('should handle empty APIs list', () => {
      let callCount = 0;
      useSelector.mockImplementation((selector) => {
        if (selector === mutationSelectors.selectAllApis) {
          return [];
        }
        if (selector === mutationSelectors.selectCategories) {
          return [];
        }
        if (selector === stateSelectors.selectSelectedCategoryId) {
          return null;
        }
        if (selector === mutationSelectors.selectCustomApis) {
          return [];
        }
        if (selector === stateSelectors.selectSelectedApiId) {
          return null;
        }
        if (typeof selector === 'function') {
          callCount++;
          if (callCount === 1) {return null;} // selectedCategory
          if (callCount === 2) {return [];} // categoryApis
          if (callCount === 3) {return null;} // selectedApi
          return null; // connector
        }
        return undefined;
      });

      const { result } = renderHook(() => useApi());

      expect(result.current.allApis).toEqual([]);
      expect(result.current.apiCategories).toEqual([]);
      expect(result.current.customApis).toEqual([]);
    });

    it('should handle no selected category', () => {
      let callCount = 0;
      useSelector.mockImplementation((selector) => {
        if (selector === mutationSelectors.selectAllApis) {
          return mockApis;
        }
        if (selector === mutationSelectors.selectCategories) {
          return mockCategories;
        }
        if (selector === stateSelectors.selectSelectedCategoryId) {
          return null;
        }
        if (selector === mutationSelectors.selectCustomApis) {
          return mockCustomApis;
        }
        if (selector === stateSelectors.selectSelectedApiId) {
          return 'api-1';
        }
        if (typeof selector === 'function') {
          callCount++;
          if (callCount === 1) {return null;} // selectedCategory (no selection)
          if (callCount === 2) {return [];} // categoryApis (empty for null category)
          if (callCount === 3) {return mockSelectedApi;}
          return mockConnector;
        }
        return undefined;
      });

      const { result } = renderHook(() => useApi());

      expect(result.current.selectedCategoryId).toBeNull();
      expect(result.current.selectedCategory).toBeNull();
      expect(result.current.allApis).toEqual(mockApis);
    });

    it('should handle no selected API', () => {
      let callCount = 0;
      useSelector.mockImplementation((selector) => {
        if (selector === mutationSelectors.selectAllApis) {
          return mockApis;
        }
        if (selector === mutationSelectors.selectCategories) {
          return mockCategories;
        }
        if (selector === stateSelectors.selectSelectedCategoryId) {
          return 'cat-1';
        }
        if (selector === mutationSelectors.selectCustomApis) {
          return mockCustomApis;
        }
        if (selector === stateSelectors.selectSelectedApiId) {
          return null;
        }
        if (typeof selector === 'function') {
          callCount++;
          if (callCount === 1) {return mockCategories[0];}
          if (callCount === 2) {return mockCategoryApis;}
          if (callCount === 3) {return null;} // selectedApi (no selection)
          return null; // connector (no selection)
        }
        return undefined;
      });

      const { result } = renderHook(() => useApi());

      expect(result.current.selectedApiId).toBeNull();
      expect(result.current.selectedApi).toBeNull();
      expect(result.current.connector).toBeNull();
    });

    it('should handle no custom APIs', () => {
      let callCount = 0;
      useSelector.mockImplementation((selector) => {
        if (selector === mutationSelectors.selectAllApis) {
          return mockApis;
        }
        if (selector === mutationSelectors.selectCategories) {
          return mockCategories;
        }
        if (selector === stateSelectors.selectSelectedCategoryId) {
          return 'cat-1';
        }
        if (selector === mutationSelectors.selectCustomApis) {
          return [];
        }
        if (selector === stateSelectors.selectSelectedApiId) {
          return 'api-1';
        }
        if (typeof selector === 'function') {
          callCount++;
          if (callCount === 1) {return mockCategories[0];}
          if (callCount === 2) {return mockCategoryApis;}
          if (callCount === 3) {return mockSelectedApi;}
          return mockConnector;
        }
        return undefined;
      });

      const { result } = renderHook(() => useApi());

      expect(result.current.customApis).toEqual([]);
    });
  });

  // ===================================================================
  // INTEGRATION TESTS
  // ===================================================================

  describe('Integration', () => {
    it('should work with REST API type', () => {
      const { result } = renderHook(() => useApi());

      const restApi = result.current.allApis.find(a => a.type === 'rest');
      expect(restApi).toBeDefined();
      expect(restApi.name).toBe('REST API');
    });

    it('should work with GraphQL API type', () => {
      const { result } = renderHook(() => useApi());

      const graphqlApi = result.current.allApis.find(a => a.type === 'graphql');
      expect(graphqlApi).toBeDefined();
      expect(graphqlApi.name).toBe('GraphQL API');
    });

    it('should correctly categorize APIs', () => {
      const { result } = renderHook(() => useApi());

      expect(result.current.categoryApis).toHaveLength(2);
      expect(result.current.customApis).toHaveLength(1);
    });
  });
});

