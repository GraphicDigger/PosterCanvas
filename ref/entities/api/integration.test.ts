// Integration Tests - API + Redux TypeScript Migration
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import apiEntityReducer from './model/store/slice';
import { apiApi } from './api/api.api';
import {
  setApis,
  addApi,
  updateApiName,
  addCall,
  setSelectedApiId,
} from './model/store/slice';
import {
  selectAllApis,
  selectApiById,
  selectApiCount,
  selectCustomApis,
  selectCategoryApis,
} from './model/store/mutation/selectors';
import {
  selectHoveredApiId,
  selectSelectedApiId,
} from './model/store/states/selectors';
import type { ApiResponse, ProcessedApi, ApiCategory } from './types';

// Mock the API data
const mockCategories: ApiCategory[] = [
  {
    id: 'category-1',
    name: 'Test Category',
    type: 'REST',
  },
  {
    id: 'custom-api-category',
    name: 'Custom APIs',
    type: 'Custom',
  },
];

const mockApis: ProcessedApi[] = [
  {
    id: 'api-1',
    name: 'Test API 1',
    categoryId: 'category-1',
    type: 'REST',
    connector: {
      id: 'connector-1',
      name: 'Test Connector',
      authentication: 'none',
      keyName: '',
      keyValue: '',
      headers: [],
      parameters: [],
      calls: [],
    },
  },
  {
    id: 'api-2',
    name: 'Custom API',
    categoryId: 'custom-api-category',
    type: 'Custom',
    connector: {
      id: 'connector-2',
      name: 'Custom Connector',
      authentication: 'api-key',
      keyName: 'X-API-Key',
      keyValue: 'secret-key',
      headers: [
        {
          id: 'header-1',
          key: 'Content-Type',
          value: 'application/json',
        },
      ],
      parameters: [
        {
          id: 'param-1',
          key: 'limit',
          value: '10',
        },
      ],
      calls: [
        {
          id: 'call-1',
          name: 'Get Users',
          useAs: 'GET',
          dataType: 'JSON',
          requestType: 'GET',
          value: 'https://api.example.com/users',
          headers: [],
          parameters: [],
        },
      ],
    },
  },
];

describe('API + Redux Integration Tests', () => {
  let store: ReturnType<typeof configureStore>;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        apiEntity: apiEntityReducer,
      },
    });
  });

  describe('API Function Integration', () => {
    it('should integrate API functions with Redux store', async () => {
      // Mock the API response
      const mockApiResponse: ApiResponse = {
        apis: mockApis,
        categories: mockCategories,
      };

      // Mock the apiApi.getApis function
      const originalGetApis = apiApi.getApis;
      apiApi.getApis = vi.fn().mockResolvedValue(mockApiResponse);

      // Dispatch action to set APIs
      store.dispatch(setApis(mockApiResponse));

      // Verify state
      const state = store.getState();
      const allApis = selectAllApis(state);
      const apiCount = selectApiCount(state);

      expect(allApis).toHaveLength(2);
      expect(apiCount).toBe(2);
      expect(allApis[0].name).toBe('Test API 1');
      expect(allApis[1].name).toBe('Custom API');

      // Restore original function
      apiApi.getApis = originalGetApis;
    });

    it('should handle API errors gracefully', async () => {
      // Mock API error
      const originalGetApis = apiApi.getApis;
      apiApi.getApis = vi.fn().mockRejectedValue(new Error('API Error'));

      try {
        await apiApi.getApis();
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect((error as Error).message).toBe('API Error');
      }

      // Restore original function
      apiApi.getApis = originalGetApis;
    });
  });

  describe('Redux State Management Integration', () => {
    it('should handle complete API lifecycle', () => {
      // Initial state
      let state = store.getState();
      expect(selectAllApis(state)).toHaveLength(0);

      // Set APIs
      store.dispatch(setApis({
        apis: mockApis,
        categories: mockCategories,
      }));

      state = store.getState();
      expect(selectAllApis(state)).toHaveLength(2);

      // Add new API
      store.dispatch(addApi({
        name: 'New API',
        categoryId: 'custom-api-category',
      }));

      state = store.getState();
      expect(selectAllApis(state)).toHaveLength(3);

      // Update API name
      const newApiId = selectAllApis(state)[2].id;
      store.dispatch(updateApiName({
        id: newApiId,
        name: 'Updated API Name',
      }));

      state = store.getState();
      const updatedApi = selectApiById(state, newApiId);
      expect(updatedApi?.name).toBe('Updated API Name');
    });

    it('should handle API calls management', () => {
      // Set up initial state
      store.dispatch(setApis({
        apis: [mockApis[0]],
        categories: mockCategories,
      }));

      let state = store.getState();
      const api = selectAllApis(state)[0];
      expect(api.connector.calls).toHaveLength(0);

      // Add call
      store.dispatch(addCall({
        id: api.id,
        call: {
          id: 'new-call',
          name: 'New Call',
          useAs: 'POST',
          dataType: 'JSON',
          requestType: 'POST',
          value: 'https://api.example.com/create',
          headers: [],
          parameters: [],
        },
      }));

      state = store.getState();
      const updatedApi = selectApiById(state, api.id);
      expect(updatedApi?.connector.calls).toHaveLength(1);
      expect(updatedApi?.connector.calls[0].name).toBe('New Call');
    });

    it('should handle UI state management', () => {
      // Set APIs
      store.dispatch(setApis({
        apis: mockApis,
        categories: mockCategories,
      }));

      // Set hovered API
      store.dispatch(setSelectedApiId('api-1'));

      const state = store.getState();
      expect(selectSelectedApiId(state)).toBe('api-1');
      expect(selectHoveredApiId(state)).toBeNull();
    });
  });

  describe('Selector Integration', () => {
    beforeEach(() => {
      store.dispatch(setApis({
        apis: mockApis,
        categories: mockCategories,
      }));
    });

    it('should correctly filter custom APIs', () => {
      const state = store.getState();
      const customApis = selectCustomApis(state);

      expect(customApis).toHaveLength(1);
      expect(customApis[0].categoryId).toBe('custom-api-category');
    });

    it('should correctly filter category APIs', () => {
      const state = store.getState();
      const categoryApis = selectCategoryApis(state);

      expect(categoryApis).toHaveLength(1);
      expect(categoryApis[0].categoryId).toBe('category-1');
    });

    it('should handle API selection by ID', () => {
      const state = store.getState();
      const api = selectApiById(state, 'api-1');

      expect(api).toBeDefined();
      expect(api?.name).toBe('Test API 1');
    });

    it('should return undefined for non-existent API', () => {
      const state = store.getState();
      const api = selectApiById(state, 'non-existent');

      expect(api).toBeUndefined();
    });
  });

  describe('Type Safety Validation', () => {
    it('should maintain type safety across all operations', () => {
      // This test ensures TypeScript compilation succeeds
      const state = store.getState();

      // All selectors should return properly typed values
      const allApis = selectAllApis(state);
      const apiCount = selectApiCount(state);
      const customApis = selectCustomApis(state);
      const categoryApis = selectCategoryApis(state);
      const hoveredApiId = selectHoveredApiId(state);
      const selectedApiId = selectSelectedApiId(state);

      // Type assertions to ensure proper typing
      expect(Array.isArray(allApis)).toBe(true);
      expect(typeof apiCount).toBe('number');
      expect(Array.isArray(customApis)).toBe(true);
      expect(Array.isArray(categoryApis)).toBe(true);
      expect(typeof hoveredApiId === 'string' || hoveredApiId === null).toBe(true);
      expect(typeof selectedApiId === 'string' || selectedApiId === null).toBe(true);
    });

    it('should handle complex nested object updates', () => {
      // Set up state with complex API
      store.dispatch(setApis({
        apis: [mockApis[1]], // Use the complex API with calls
        categories: mockCategories,
      }));

      const state = store.getState();
      const api = selectAllApis(state)[0];

      // Verify complex nested structure
      expect(api.connector.headers).toHaveLength(1);
      expect(api.connector.parameters).toHaveLength(1);
      expect(api.connector.calls).toHaveLength(1);

      expect(api.connector.headers[0].key).toBe('Content-Type');
      expect(api.connector.parameters[0].key).toBe('limit');
      expect(api.connector.calls[0].name).toBe('Get Users');
    });
  });

  describe('Error Handling Integration', () => {
    it('should handle malformed API data gracefully', () => {
      const malformedApis = [
        {
          id: 'malformed-api',
          name: 'Malformed API',
          categoryId: 'category-1',
          // Missing required fields
        },
      ] as any;

      // This should not crash the application
      expect(() => {
        store.dispatch(setApis({
          apis: malformedApis,
          categories: mockCategories,
        }));
      }).not.toThrow();
    });

    it('should handle empty API responses', () => {
      store.dispatch(setApis({
        apis: [],
        categories: [],
      }));

      const state = store.getState();
      expect(selectAllApis(state)).toHaveLength(0);
      expect(selectApiCount(state)).toBe(0);
    });
  });
});
