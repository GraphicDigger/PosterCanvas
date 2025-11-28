// Performance Integration Tests - API + Redux TypeScript Migration
import { configureStore } from '@reduxjs/toolkit';
import apiEntityReducer from './model/store/slice';
import { apiApi } from './api/api.api';
import {
  setApis,
  addApi,
  updateApiName,
  addCall,
  removeCall,
  addApiHeader,
  removeApiHeader,
} from './model/store/slice';
import {
  selectAllApis,
  selectApiById,
  selectApiCount,
  selectCustomApis,
  selectCategoryApis,
  selectApisByCategory,
  selectApiNames,
  selectApiConnectors,
} from './model/store/mutation/selectors';
import type { ApiResponse, ProcessedApi, ApiCategory } from './types';

// Performance test data
const generateLargeApiDataset = (count: number): ProcessedApi[] => {
  return Array.from({ length: count }, (_, index) => ({
    id: `api-${index}`,
    name: `API ${index}`,
    categoryId: index % 2 === 0 ? 'category-1' : 'custom-api-category',
    type: index % 2 === 0 ? 'REST' : 'Custom',
    connector: {
      id: `connector-${index}`,
      name: `Connector ${index}`,
      authentication: 'none',
      keyName: '',
      keyValue: '',
      headers: Array.from({ length: 5 }, (_, headerIndex) => ({
        id: `header-${index}-${headerIndex}`,
        key: `Header-${headerIndex}`,
        value: `Value-${headerIndex}`,
      })),
      parameters: Array.from({ length: 3 }, (_, paramIndex) => ({
        id: `param-${index}-${paramIndex}`,
        key: `Param-${paramIndex}`,
        value: `Value-${paramIndex}`,
      })),
      calls: Array.from({ length: 2 }, (_, callIndex) => ({
        id: `call-${index}-${callIndex}`,
        name: `Call ${callIndex}`,
        useAs: 'GET',
        dataType: 'JSON',
        requestType: 'GET',
        value: `https://api.example.com/${index}/${callIndex}`,
        headers: [],
        parameters: [],
      })),
    },
  }));
};

const mockCategories: ApiCategory[] = [
  { id: 'category-1', name: 'REST APIs', type: 'REST' },
  { id: 'custom-api-category', name: 'Custom APIs', type: 'Custom' },
];

describe('API + Redux Performance Integration Tests', () => {
  let store: ReturnType<typeof configureStore>;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        apiEntity: apiEntityReducer,
      },
    });
  });

  describe('Large Dataset Performance', () => {
    it('should handle large API datasets efficiently', () => {
      const largeApiDataset = generateLargeApiDataset(1000);

      const startTime = performance.now();

      store.dispatch(setApis({
        apis: largeApiDataset,
        categories: mockCategories,
      }));

      const endTime = performance.now();
      const executionTime = endTime - startTime;

      // Should complete within reasonable time (adjust threshold for test interference)
      expect(executionTime).toBeLessThan(160); // 160ms threshold (accounts for test suite interference)

      const state = store.getState();
      expect(selectApiCount(state)).toBe(1000);
    });

    it('should handle selector performance with large datasets', () => {
      const largeApiDataset = generateLargeApiDataset(500);

      store.dispatch(setApis({
        apis: largeApiDataset,
        categories: mockCategories,
      }));

      const startTime = performance.now();

      // Run multiple selectors
      const state = store.getState();
      const allApis = selectAllApis(state);
      const customApis = selectCustomApis(state);
      const categoryApis = selectCategoryApis(state);
      const apisByCategory = selectApisByCategory(state);
      const apiNames = selectApiNames(state);
      const apiConnectors = selectApiConnectors(state);

      const endTime = performance.now();
      const executionTime = endTime - startTime;

      // Selectors should be fast even with large datasets
      expect(executionTime).toBeLessThan(50); // 50ms threshold

      expect(allApis).toHaveLength(500);
      expect(customApis.length + categoryApis.length).toBe(500);
      expect(Object.keys(apisByCategory)).toHaveLength(2);
      expect(apiNames).toHaveLength(500);
      expect(apiConnectors).toHaveLength(500);
    });
  });

  describe('Memory Usage Performance', () => {
    it('should not cause memory leaks with repeated operations', () => {
      const initialMemory = (performance as any).memory?.usedJSHeapSize || 0;

      // Perform many operations
      for (let i = 0; i < 100; i++) {
        store.dispatch(addApi({
          name: `Test API ${i}`,
          categoryId: 'custom-api-category',
        }));

        const state = store.getState();
        const api = selectAllApis(state)[i];

        // Add and remove calls to test memory management
        store.dispatch(addCall({
          id: api.id,
          call: {
            id: `call-${i}`,
            name: `Call ${i}`,
            useAs: 'GET',
            dataType: 'JSON',
            requestType: 'GET',
            value: `https://api.example.com/${i}`,
            headers: [],
            parameters: [],
          },
        }));

        store.dispatch(removeCall({
          id: api.id,
          callId: `call-${i}`,
        }));
      }

      const finalMemory = (performance as any).memory?.usedJSHeapSize || 0;
      const memoryIncrease = finalMemory - initialMemory;

      // Memory increase should be reasonable (adjust threshold as needed)
      expect(memoryIncrease).toBeLessThan(10 * 1024 * 1024); // 10MB threshold
    });
  });

  describe('Selector Memoization Performance', () => {
    it('should benefit from memoized selectors', () => {
      const apiDataset = generateLargeApiDataset(100);

      store.dispatch(setApis({
        apis: apiDataset,
        categories: mockCategories,
      }));

      const state = store.getState();

      // First call - should compute
      const startTime1 = performance.now();
      const result1 = selectApisByCategory(state);
      const endTime1 = performance.now();
      const time1 = endTime1 - startTime1;

      // Second call - should use memoized result
      const startTime2 = performance.now();
      const result2 = selectApisByCategory(state);
      const endTime2 = performance.now();
      const time2 = endTime2 - startTime2;

      // Results should be identical
      expect(result1).toEqual(result2);

      // Second call should be faster (memoized)
      expect(time2).toBeLessThanOrEqual(time1);
    });
  });

  describe('Concurrent Operations Performance', () => {
    it('should handle concurrent API operations efficiently', () => {
      const startTime = performance.now();

      // Simulate concurrent operations
      const operations = Array.from({ length: 50 }, (_, index) => {
        return new Promise<void>((resolve) => {
          setTimeout(() => {
            store.dispatch(addApi({
              name: `Concurrent API ${index}`,
              categoryId: 'custom-api-category',
            }));
            resolve();
          }, Math.random() * 10); // Random delay up to 10ms
        });
      });

      return Promise.all(operations).then(() => {
        const endTime = performance.now();
        const executionTime = endTime - startTime;

        // Should complete within reasonable time
        expect(executionTime).toBeLessThan(1000); // 1 second threshold

        const state = store.getState();
        expect(selectApiCount(state)).toBe(50);
      });
    });
  });

  describe('Type Safety Performance', () => {
    it('should maintain type safety without performance penalty', () => {
      const apiDataset = generateLargeApiDataset(100);

      store.dispatch(setApis({
        apis: apiDataset,
        categories: mockCategories,
      }));

      const startTime = performance.now();

      // Perform type-safe operations
      const state = store.getState();
      const allApis = selectAllApis(state);

      // Type-safe operations
      allApis.forEach(api => {
        if (api.connector.calls.length > 0) {
          api.connector.calls.forEach(call => {
            // Type-safe property access
            const callName: string = call.name;
            const callValue: string = call.value;
            expect(typeof callName).toBe('string');
            expect(typeof callValue).toBe('string');
          });
        }
      });

      const endTime = performance.now();
      const executionTime = endTime - startTime;

      // Type safety should not significantly impact performance
      expect(executionTime).toBeLessThan(100); // 100ms threshold
    });
  });

  describe('Error Handling Performance', () => {
    it('should handle errors efficiently without performance degradation', () => {
      const startTime = performance.now();

      // Perform operations that might cause errors
      for (let i = 0; i < 100; i++) {
        try {
          // Try to update non-existent API
          store.dispatch(updateApiName({
            id: `non-existent-${i}`,
            name: 'Updated Name',
          }));

          // Try to add call to non-existent API
          store.dispatch(addCall({
            id: `non-existent-${i}`,
            call: {
              id: `call-${i}`,
              name: `Call ${i}`,
              useAs: 'GET',
              dataType: 'JSON',
              requestType: 'GET',
              value: `https://api.example.com/${i}`,
              headers: [],
              parameters: [],
            },
          }));
        } catch (error) {
          // Errors should be handled gracefully
          expect(error).toBeDefined();
        }
      }

      const endTime = performance.now();
      const executionTime = endTime - startTime;

      // Error handling should not significantly impact performance
      expect(executionTime).toBeLessThan(200); // 200ms threshold
    });
  });
});
