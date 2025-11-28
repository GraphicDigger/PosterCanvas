// ===================================================================
// Unit Tests for mockDataRegistry - Mock Data Management
// Coverage Target: 100%
// Phase 5 - Day 4: Utility Testing (Pushing to 3,000!)
// ===================================================================

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { mockDataRegistry } from './mockDataRegistry';

interface TestEntity {
  id: string;
  name: string;
  value: number;
}

describe('mockDataRegistry', () => {
  let consoleErrorSpy: any;

  beforeEach(() => {
    // Clear registry between tests by creating a fresh instance
    // Note: We can't directly clear the singleton, so we test in isolation
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  describe('register', () => {
    it('should register a mock data loader', () => {
      const loader = () => [
        { id: '1', name: 'Test 1', value: 100 },
        { id: '2', name: 'Test 2', value: 200 },
      ];

      expect(() => {
        mockDataRegistry.register<TestEntity>('testEntity', loader);
      }).not.toThrow();
    });

    it('should register multiple loaders for different entities', () => {
      const loader1 = () => [{ id: '1', name: 'Entity 1', value: 1 }];
      const loader2 = () => [{ id: '2', name: 'Entity 2', value: 2 }];

      mockDataRegistry.register<TestEntity>('entity1', loader1);
      mockDataRegistry.register<TestEntity>('entity2', loader2);

      const data1 = mockDataRegistry.getData<TestEntity>('entity1');
      const data2 = mockDataRegistry.getData<TestEntity>('entity2');

      expect(data1).toHaveLength(1);
      expect(data2).toHaveLength(1);
      expect(data1[0].name).toBe('Entity 1');
      expect(data2[0].name).toBe('Entity 2');
    });

    it('should allow overwriting existing loader', () => {
      const loader1 = () => [{ id: '1', name: 'First', value: 1 }];
      const loader2 = () => [{ id: '2', name: 'Second', value: 2 }];

      mockDataRegistry.register<TestEntity>('overwriteTest', loader1);
      mockDataRegistry.register<TestEntity>('overwriteTest', loader2);

      const data = mockDataRegistry.getData<TestEntity>('overwriteTest');
      expect(data).toHaveLength(1);
      expect(data[0].name).toBe('Second'); // Latest loader wins
    });

    it('should handle empty loader', () => {
      const emptyLoader = () => [];

      mockDataRegistry.register<TestEntity>('emptyEntity', emptyLoader);
      const data = mockDataRegistry.getData<TestEntity>('emptyEntity');

      expect(data).toEqual([]);
    });

    it('should handle loader with many items', () => {
      const manyItems = Array.from({ length: 100 }, (_, i) => ({
        id: `id-${i}`,
        name: `Name ${i}`,
        value: i,
      }));
      const loader = () => manyItems;

      mockDataRegistry.register<TestEntity>('manyItems', loader);
      const data = mockDataRegistry.getData<TestEntity>('manyItems');

      expect(data).toHaveLength(100);
      expect(data[0].id).toBe('id-0');
      expect(data[99].id).toBe('id-99');
    });
  });

  describe('getData', () => {
    it('should return registered mock data', () => {
      const mockData = [
        { id: '1', name: 'Item 1', value: 10 },
        { id: '2', name: 'Item 2', value: 20 },
      ];
      const loader = () => mockData;

      mockDataRegistry.register<TestEntity>('getDataTest', loader);
      const result = mockDataRegistry.getData<TestEntity>('getDataTest');

      expect(result).toEqual(mockData);
      expect(result).toHaveLength(2);
    });

    it('should return empty array for unregistered entity', () => {
      const result = mockDataRegistry.getData<TestEntity>('nonExistentEntity');
      expect(result).toEqual([]);
    });

    it('should return empty array for null entity name', () => {
      const result = mockDataRegistry.getData<TestEntity>(null as any);
      expect(result).toEqual([]);
    });

    it('should return empty array for undefined entity name', () => {
      const result = mockDataRegistry.getData<TestEntity>(undefined as any);
      expect(result).toEqual([]);
    });

    it('should call loader function each time', () => {
      let callCount = 0;
      const loader = () => {
        callCount++;
        return [{ id: `${callCount}`, name: 'Test', value: callCount }];
      };

      mockDataRegistry.register<TestEntity>('callCountTest', loader);

      mockDataRegistry.getData<TestEntity>('callCountTest');
      expect(callCount).toBe(1);

      mockDataRegistry.getData<TestEntity>('callCountTest');
      expect(callCount).toBe(2);
    });

    it('should handle loader that throws error', () => {
      const errorLoader = () => {
        throw new Error('Loader failed!');
      };

      mockDataRegistry.register<TestEntity>('errorEntity', errorLoader);
      const result = mockDataRegistry.getData<TestEntity>('errorEntity');

      expect(result).toEqual([]);
      expect(consoleErrorSpy).toHaveBeenCalled();
    });

    it('should return fresh data on each call', () => {
      const loader = () => [{ id: '1', name: 'Test', value: 1 }];

      mockDataRegistry.register<TestEntity>('freshDataTest', loader);

      const data1 = mockDataRegistry.getData<TestEntity>('freshDataTest');
      const data2 = mockDataRegistry.getData<TestEntity>('freshDataTest');

      expect(data1).toEqual(data2);
      expect(data1).not.toBe(data2); // Different references
    });
  });

  describe('Edge Cases', () => {
    it('should handle entity names with special characters', () => {
      const loader = () => [{ id: '1', name: 'Special', value: 1 }];

      mockDataRegistry.register<TestEntity>('entity-with-dashes', loader);
      mockDataRegistry.register<TestEntity>('entity_with_underscores', loader);
      mockDataRegistry.register<TestEntity>('entity.with.dots', loader);

      expect(mockDataRegistry.getData<TestEntity>('entity-with-dashes')).toHaveLength(1);
      expect(mockDataRegistry.getData<TestEntity>('entity_with_underscores')).toHaveLength(1);
      expect(mockDataRegistry.getData<TestEntity>('entity.with.dots')).toHaveLength(1);
    });

    it('should handle entity names with numbers', () => {
      const loader = () => [{ id: '1', name: 'Numeric', value: 1 }];

      mockDataRegistry.register<TestEntity>('entity123', loader);
      expect(mockDataRegistry.getData<TestEntity>('entity123')).toHaveLength(1);
    });

    it('should handle empty string entity name', () => {
      const loader = () => [{ id: '1', name: 'Empty', value: 1 }];

      mockDataRegistry.register<TestEntity>('', loader);
      const result = mockDataRegistry.getData<TestEntity>('');

      expect(result).toHaveLength(1);
    });

    it('should handle case-sensitive entity names', () => {
      const loader1 = () => [{ id: '1', name: 'Lower', value: 1 }];
      const loader2 = () => [{ id: '2', name: 'Upper', value: 2 }];

      mockDataRegistry.register<TestEntity>('myentity', loader1);
      mockDataRegistry.register<TestEntity>('MyEntity', loader2);

      const lower = mockDataRegistry.getData<TestEntity>('myentity');
      const upper = mockDataRegistry.getData<TestEntity>('MyEntity');

      expect(lower[0].name).toBe('Lower');
      expect(upper[0].name).toBe('Upper');
    });

    it('should handle loader returning complex objects', () => {
      const complexLoader = () => [
        {
          id: '1',
          name: 'Complex',
          value: 1,
          nested: { deep: { value: 'nested' } },
          array: [1, 2, 3],
        } as any,
      ];

      mockDataRegistry.register('complexEntity', complexLoader);
      const result = mockDataRegistry.getData('complexEntity');

      expect(result[0]).toHaveProperty('nested.deep.value', 'nested');
      expect(result[0]).toHaveProperty('array');
      expect(result[0].array).toEqual([1, 2, 3]);
    });

    it('should handle concurrent registrations', () => {
      const loaders = Array.from({ length: 10 }, (_, i) => ({
        name: `entity${i}`,
        loader: () => [{ id: `${i}`, name: `Entity ${i}`, value: i }],
      }));

      loaders.forEach(({ name, loader }) => {
        mockDataRegistry.register<TestEntity>(name, loader);
      });

      loaders.forEach(({ name }, i) => {
        const data = mockDataRegistry.getData<TestEntity>(name);
        expect(data).toHaveLength(1);
        expect(data[0].value).toBe(i);
      });
    });
  });

  describe('Type Safety', () => {
    it('should work with different entity types', () => {
      interface User {
        id: string;
        email: string;
      }

      interface Product {
        id: string;
        price: number;
      }

      const userLoader = () => [{ id: '1', email: 'test@example.com' }];
      const productLoader = () => [{ id: '1', price: 99.99 }];

      mockDataRegistry.register<User>('users', userLoader);
      mockDataRegistry.register<Product>('products', productLoader);

      const users = mockDataRegistry.getData<User>('users');
      const products = mockDataRegistry.getData<Product>('products');

      expect(users[0]).toHaveProperty('email');
      expect(products[0]).toHaveProperty('price');
    });
  });

  describe('Performance', () => {
    it('should handle rapid successive getData calls', () => {
      const loader = () => [{ id: '1', name: 'Performance', value: 1 }];
      mockDataRegistry.register<TestEntity>('perfTest', loader);

      const results = [];
      for (let i = 0; i < 1000; i++) {
        results.push(mockDataRegistry.getData<TestEntity>('perfTest'));
      }

      expect(results).toHaveLength(1000);
      results.forEach((result) => {
        expect(result).toHaveLength(1);
      });
    });
  });
});

