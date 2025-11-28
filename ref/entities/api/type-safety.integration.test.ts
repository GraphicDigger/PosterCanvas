// Type Safety Integration Tests - API + Redux TypeScript Migration
import { configureStore } from '@reduxjs/toolkit';
import apiEntityReducer from './model/store/slice';
import { apiApi } from './api/api.api';
import {
  setApis,
  addApi,
  updateApiName,
  updateApiAuthentication,
  addApiHeader,
  updateApiHeader,
  addCall,
  updateCallValue,
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
import type {
  ApiResponse,
  ProcessedApi,
  ApiCategory,
  ApiEntity,
  SetApisPayload,
  AddApiPayload,
  UpdateApiNamePayload,
  UpdateApiAuthenticationPayload,
  AddApiHeaderPayload,
  UpdateApiHeaderPayload,
  AddCallPayload,
  UpdateCallPayload,
} from './types';

// Type safety test data
const mockCategories: ApiCategory[] = [
  {
    id: 'category-1',
    name: 'REST APIs',
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
    name: 'Test API',
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
];

describe('Type Safety Integration Tests', () => {
  let store: ReturnType<typeof configureStore>;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        apiEntity: apiEntityReducer,
      },
    });
  });

  describe('API Function Type Safety', () => {
    it('should enforce type safety in API functions', async () => {
      // Mock API response with proper typing
      const mockApiResponse: ApiResponse = {
        apis: mockApis,
        categories: mockCategories,
      };

      // Mock the API function
      const originalGetApis = apiApi.getApis;
      apiApi.getApis = vi.fn().mockResolvedValue(mockApiResponse);

      // Type-safe API call
      const response: ApiResponse = await apiApi.getApis();

      // Type assertions
      expect(Array.isArray(response.apis)).toBe(true);
      expect(Array.isArray(response.categories)).toBe(true);

      if (response.apis.length > 0) {
        const api: ProcessedApi = response.apis[0];
        expect(typeof api.id).toBe('string');
        expect(typeof api.name).toBe('string');
        expect(typeof api.categoryId).toBe('string');
        expect(typeof api.connector).toBe('object');
      }

      // Restore original function
      apiApi.getApis = originalGetApis;
    });

    it('should handle API function errors with proper typing', async () => {
      // Mock API error
      const originalGetApis = apiApi.getApis;
      apiApi.getApis = vi.fn().mockRejectedValue(new Error('API Error'));

      try {
        await apiApi.getApis();
        fail('Should have thrown an error');
      } catch (error) {
        // Type-safe error handling
        expect(error).toBeInstanceOf(Error);
        if (error instanceof Error) {
          expect(error.message).toBe('API Error');
        }
      }

      // Restore original function
      apiApi.getApis = originalGetApis;
    });
  });

  describe('Redux Action Type Safety', () => {
    it('should enforce type safety in Redux actions', () => {
      // Type-safe action payloads
      const setApisPayload: SetApisPayload = {
        apis: mockApis,
        categories: mockCategories,
      };

      const addApiPayload: AddApiPayload = {
        name: 'New API',
        categoryId: 'custom-api-category',
      };

      const updateApiNamePayload: UpdateApiNamePayload = {
        id: 'api-1',
        name: 'Updated API Name',
      };

      // Dispatch actions with type safety
      store.dispatch(setApis(setApisPayload));
      store.dispatch(addApi(addApiPayload));
      store.dispatch(updateApiName(updateApiNamePayload));

      // Verify state changes
      const state = store.getState();
      const allApis = selectAllApis(state);
      expect(allApis).toHaveLength(2);
    });

    it('should handle complex nested object updates with type safety', () => {
      // Set up initial state
      store.dispatch(setApis({
        apis: mockApis,
        categories: mockCategories,
      }));

      // Type-safe header addition
      const addHeaderPayload: AddApiHeaderPayload = {
        id: 'api-1',
        header: {
          id: 'header-1',
          key: 'Content-Type',
          value: 'application/json',
        },
      };

      store.dispatch(addApiHeader(addHeaderPayload));

      // Type-safe header update
      const updateHeaderPayload: UpdateApiHeaderPayload = {
        id: 'api-1',
        headerId: 'header-1',
        key: 'Authorization',
        value: 'Bearer token',
      };

      store.dispatch(updateApiHeader(updateHeaderPayload));

      // Type-safe call addition
      const addCallPayload: AddCallPayload = {
        id: 'api-1',
        call: {
          id: 'call-1',
          name: 'Test Call',
          useAs: 'GET',
          dataType: 'JSON',
          requestType: 'GET',
          value: 'https://api.example.com/test',
          headers: [],
          parameters: [],
        },
      };

      store.dispatch(addCall(addCallPayload));

      // Verify type-safe state access
      const state = store.getState();
      const api = selectApiById(state, 'api-1');

      if (api) {
        expect(api.connector.headers).toHaveLength(1);
        expect(api.connector.headers[0].key).toBe('Authorization');
        expect(api.connector.calls).toHaveLength(1);
        expect(api.connector.calls[0].name).toBe('Test Call');
      }
    });
  });

  describe('Selector Type Safety', () => {
    beforeEach(() => {
      store.dispatch(setApis({
        apis: mockApis,
        categories: mockCategories,
      }));
    });

    it('should return properly typed values from selectors', () => {
      const state = store.getState();

      // Type-safe selector calls
      const allApis: ProcessedApi[] = selectAllApis(state);
      const apiCount: number = selectApiCount(state);
      const customApis: ProcessedApi[] = selectCustomApis(state);
      const categoryApis: ProcessedApi[] = selectCategoryApis(state);
      const hoveredApiId: string | null = selectHoveredApiId(state);
      const selectedApiId: string | null = selectSelectedApiId(state);

      // Type assertions
      expect(Array.isArray(allApis)).toBe(true);
      expect(typeof apiCount).toBe('number');
      expect(Array.isArray(customApis)).toBe(true);
      expect(Array.isArray(categoryApis)).toBe(true);
      expect(typeof hoveredApiId === 'string' || hoveredApiId === null).toBe(true);
      expect(typeof selectedApiId === 'string' || selectedApiId === null).toBe(true);
    });

    it('should handle optional API selection with type safety', () => {
      const state = store.getState();

      // Type-safe optional API selection
      const existingApi: ProcessedApi | undefined = selectApiById(state, 'api-1');
      const nonExistentApi: ProcessedApi | undefined = selectApiById(state, 'non-existent');

      if (existingApi) {
        // Type-safe property access
        expect(typeof existingApi.name).toBe('string');
        expect(typeof existingApi.connector).toBe('object');
      }

      expect(nonExistentApi).toBeUndefined();
    });
  });

  describe('State Type Safety', () => {
    it('should maintain type safety throughout state updates', () => {
      // Initial state type safety
      let state = store.getState();
      expect(typeof state.apiEntity.entities).toBe('object');
      expect(Array.isArray(state.apiEntity.ids)).toBe(true);
      expect(Array.isArray(state.apiEntity.categories)).toBe(true);

      // State update type safety
      store.dispatch(setApis({
        apis: mockApis,
        categories: mockCategories,
      }));

      state = store.getState();
      const allApis = selectAllApis(state);

      // Type-safe iteration
      allApis.forEach((api: ProcessedApi) => {
        expect(typeof api.id).toBe('string');
        expect(typeof api.name).toBe('string');
        expect(typeof api.connector).toBe('object');

        // Type-safe nested object access
        api.connector.headers.forEach(header => {
          expect(typeof header.id).toBe('string');
          expect(typeof header.key).toBe('string');
          expect(typeof header.value).toBe('string');
        });
      });
    });

    it('should handle complex nested object type safety', () => {
      const complexApi: ProcessedApi = {
        id: 'complex-api',
        name: 'Complex API',
        categoryId: 'category-1',
        type: 'REST',
        connector: {
          id: 'complex-connector',
          name: 'Complex Connector',
          authentication: 'api-key',
          keyName: 'X-API-Key',
          keyValue: 'secret-key',
          headers: [
            { id: 'h1', key: 'Content-Type', value: 'application/json' },
            { id: 'h2', key: 'Authorization', value: 'Bearer token' },
          ],
          parameters: [
            { id: 'p1', key: 'limit', value: '10' },
            { id: 'p2', key: 'offset', value: '0' },
          ],
          calls: [
            {
              id: 'c1',
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
      };

      store.dispatch(setApis({
        apis: [complexApi],
        categories: mockCategories,
      }));

      const state = store.getState();
      const api = selectApiById(state, 'complex-api');

      if (api) {
        // Type-safe complex object access
        expect(api.connector.headers).toHaveLength(2);
        expect(api.connector.parameters).toHaveLength(2);
        expect(api.connector.calls).toHaveLength(1);

        // Type-safe array operations
        const headerKeys = api.connector.headers.map(h => h.key);
        expect(headerKeys).toContain('Content-Type');
        expect(headerKeys).toContain('Authorization');
      }
    });
  });

  describe('Error Handling Type Safety', () => {
    it('should handle type-safe error scenarios', () => {
      // Type-safe error handling for malformed data
      const malformedApis = [
        {
          id: 'malformed',
          name: 'Malformed API',
          categoryId: 'category-1',
          // Missing required fields
        },
      ] as any;

      // Should not crash due to type safety
      expect(() => {
        store.dispatch(setApis({
          apis: malformedApis,
          categories: mockCategories,
        }));
      }).not.toThrow();
    });

    it('should handle type-safe null/undefined scenarios', () => {
      // Type-safe null handling
      const state = store.getState();
      const nonExistentApi = selectApiById(state, 'non-existent');

      // Type-safe null check
      if (nonExistentApi) {
        // This block should not execute
        fail('Should not have found non-existent API');
      } else {
        // Type-safe handling of undefined
        expect(nonExistentApi).toBeUndefined();
      }
    });
  });
});
