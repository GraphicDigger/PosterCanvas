// ===================================================================
// Unit Tests for MockAdapter - Mock Data Infrastructure
// Coverage Target: 95%+
// Infrastructure Phase (Testing Core APIs - Toward 2,500!)
// ===================================================================

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { MockAdapter } from './MockAdapter';
import type { MockDataSource } from '../types';

// Mock the registry and decorator
vi.mock('../registry/AdapterRegistry', () => ({
  registerAdapter: () => (target: any) => target,
}));

vi.mock('../registry/mockDataRegistry', () => ({
  mockDataRegistry: {
    getData: vi.fn((entityName: string) => {
      if (entityName === 'testEntity') {
        return [
          { id: 'mock-1', name: 'Mock Entity 1', value: 100 },
          { id: 'mock-2', name: 'Mock Entity 2', value: 200 },
        ];
      }
      if (entityName === 'emptyEntity') {
        return [];
      }
      return null;
    }),
  },
}));

// Mock withLogging helper
vi.mock('./helpers/withLogging', () => ({
  wrapAdapterMethods: vi.fn(),
}));

interface TestEntity {
  id: string;
  name: string;
  value: number;
  createdAt?: string;
  updatedAt?: string;
}

describe('MockAdapter', () => {
  let adapter: MockAdapter<TestEntity>;
  let dataSource: MockDataSource;
  let consoleLogSpy: any;

  beforeEach(() => {
    dataSource = {
      type: 'mock',
      config: { delay: 0 },
    };
    consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
    vi.clearAllTimers();
  });

  describe('Initialization', () => {
    it('should initialize with empty storage when no mock data', () => {
      adapter = new MockAdapter<TestEntity>(dataSource, 'nonExistentEntity');

      expect(adapter).toBeDefined();
      expect(adapter).toBeInstanceOf(MockAdapter);
    });

    it('should load mock data from registry on initialization', async () => {
      adapter = new MockAdapter<TestEntity>(dataSource, 'testEntity');

      const all = await adapter.getAll();
      expect(all).toHaveLength(2);
      expect(all[0].id).toBe('mock-1');
      expect(all[1].id).toBe('mock-2');
    });

    it('should handle empty mock data', () => {
      adapter = new MockAdapter<TestEntity>(dataSource, 'emptyEntity');

      expect(adapter).toBeDefined();
    });

    it('should log initialization in development mode', () => {
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'development';

      adapter = new MockAdapter<TestEntity>(dataSource, 'testEntity');

      expect(consoleLogSpy).toHaveBeenCalled();

      process.env.NODE_ENV = originalEnv;
    });
  });

  describe('CRUD Operations', () => {
    beforeEach(() => {
      adapter = new MockAdapter<TestEntity>(dataSource, 'nonExistentEntity');
    });

    describe('getAll', () => {
      it('should return all entities', async () => {
        await adapter.create({ name: 'Entity 1', value: 100 } as Partial<TestEntity>);
        await adapter.create({ name: 'Entity 2', value: 200 } as Partial<TestEntity>);

        const entities = await adapter.getAll();
        expect(entities).toHaveLength(2);
      });

      it('should return empty array initially', async () => {
        const entities = await adapter.getAll();
        expect(entities).toEqual([]);
      });

      it('should return pre-loaded mock data', async () => {
        const adapterWithMocks = new MockAdapter<TestEntity>(dataSource, 'testEntity');
        const entities = await adapterWithMocks.getAll();

        expect(entities).toHaveLength(2);
        expect(entities[0].name).toBe('Mock Entity 1');
      });
    });

    describe('getById', () => {
      it('should return entity by id', async () => {
        const created = await adapter.create({ name: 'Test', value: 42 } as Partial<TestEntity>);

        const found = await adapter.getById(created.id);
        expect(found).toBeDefined();
        expect(found?.name).toBe('Test');
      });

      it('should return null for non-existent id', async () => {
        const result = await adapter.getById('non-existent');
        expect(result).toBeNull();
      });

      it('should retrieve pre-loaded mock entity', async () => {
        const adapterWithMocks = new MockAdapter<TestEntity>(dataSource, 'testEntity');
        const entity = await adapterWithMocks.getById('mock-1');

        expect(entity).toBeDefined();
        expect(entity?.name).toBe('Mock Entity 1');
      });
    });

    describe('create', () => {
      it('should create new entity with generated id', async () => {
        const entity = await adapter.create({ name: 'New', value: 123 } as Partial<TestEntity>);

        expect(entity.id).toBeDefined();
        expect(entity.name).toBe('New');
        expect(entity.value).toBe(123);
      });

      it('should add timestamps to created entity', async () => {
        const entity = await adapter.create({ name: 'Timestamped', value: 100 } as Partial<TestEntity>);

        expect(entity.createdAt).toBeDefined();
        expect(entity.updatedAt).toBeDefined();
      });

      it('should store created entity', async () => {
        const created = await adapter.create({ name: 'Stored', value: 999 } as Partial<TestEntity>);
        const found = await adapter.getById(created.id);

        expect(found).toEqual(created);
      });

      it('should generate unique ids for multiple creates', async () => {
        const entity1 = await adapter.create({ name: 'Entity 1', value: 1 } as Partial<TestEntity>);
        const entity2 = await adapter.create({ name: 'Entity 2', value: 2 } as Partial<TestEntity>);

        expect(entity1.id).not.toBe(entity2.id);
      });
    });

    describe('update', () => {
      it('should update existing entity', async () => {
        const created = await adapter.create({ name: 'Original', value: 100 } as Partial<TestEntity>);
        const updated = await adapter.update(created.id, { name: 'Updated', value: 200 });

        expect(updated.name).toBe('Updated');
        expect(updated.value).toBe(200);
      });

      it('should update timestamp on update', async () => {
        const created = await adapter.create({ name: 'Test', value: 100 } as Partial<TestEntity>);
        const originalTimestamp = created.updatedAt;

        // Small delay to ensure timestamp differs
        await new Promise(resolve => setTimeout(resolve, 10));

        const updated = await adapter.update(created.id, { value: 200 });

        expect(updated.updatedAt).toBeDefined();
        expect(updated.updatedAt).not.toBe(originalTimestamp);
      });

      it('should throw error for non-existent entity', async () => {
        await expect(
          adapter.update('non-existent', { name: 'Updated' }),
        ).rejects.toThrow('Entity with id non-existent not found');
      });

      it('should update pre-loaded mock entity', async () => {
        const adapterWithMocks = new MockAdapter<TestEntity>(dataSource, 'testEntity');
        const updated = await adapterWithMocks.update('mock-1', { value: 999 });

        expect(updated.value).toBe(999);
        expect(updated.name).toBe('Mock Entity 1'); // Unchanged
      });
    });

    describe('delete', () => {
      it('should delete existing entity', async () => {
        const created = await adapter.create({ name: 'To Delete', value: 100 } as Partial<TestEntity>);

        await adapter.delete(created.id);

        const found = await adapter.getById(created.id);
        expect(found).toBeNull();
      });

      it('should throw error for non-existent entity', async () => {
        await expect(
          adapter.delete('non-existent'),
        ).rejects.toThrow('Entity with id non-existent not found');
      });

      it('should remove entity from getAll results', async () => {
        const entity1 = await adapter.create({ name: 'Entity 1', value: 1 } as Partial<TestEntity>);
        const entity2 = await adapter.create({ name: 'Entity 2', value: 2 } as Partial<TestEntity>);

        await adapter.delete(entity1.id);

        const all = await adapter.getAll();
        expect(all).toHaveLength(1);
        expect(all[0].id).toBe(entity2.id);
      });

      it('should delete pre-loaded mock entity', async () => {
        const adapterWithMocks = new MockAdapter<TestEntity>(dataSource, 'testEntity');

        await adapterWithMocks.delete('mock-1');

        const entity = await adapterWithMocks.getById('mock-1');
        expect(entity).toBeNull();
      });
    });
  });

  describe('Delay Simulation', () => {
    it('should respect configured delay', async () => {
      const adapterWithDelay = new MockAdapter<TestEntity>(
        { type: 'mock', config: { delay: 50 } },
        'testEntity',
      );

      const start = Date.now();
      await adapterWithDelay.getAll();
      const elapsed = Date.now() - start;

      expect(elapsed).toBeGreaterThanOrEqual(45);
    });

    it('should apply delay to all operations', async () => {
      const adapterWithDelay = new MockAdapter<TestEntity>(
        { type: 'mock', config: { delay: 30 } },
        'nonExistentEntity',
      );

      const testDelay = async (operation: () => Promise<any>) => {
        const start = Date.now();
        await operation();
        return Date.now() - start;
      };

      expect(await testDelay(() => adapterWithDelay.getAll())).toBeGreaterThanOrEqual(25);
      expect(await testDelay(() => adapterWithDelay.getById('any'))).toBeGreaterThanOrEqual(25);
      expect(await testDelay(() => adapterWithDelay.create({ name: 'Test', value: 1 } as Partial<TestEntity>))).toBeGreaterThanOrEqual(25);
    });
  });

  describe('Error Forcing', () => {
    it('should throw error when shouldError is configured', async () => {
      const errorAdapter = new MockAdapter<TestEntity>(
        { type: 'mock', config: { shouldError: true, delay: 0 } },
        'testEntity',
      );

      await expect(errorAdapter.getAll()).rejects.toThrow();
      await expect(errorAdapter.getById('any')).rejects.toThrow();
      await expect(errorAdapter.create({ name: 'Test', value: 1 } as Partial<TestEntity>)).rejects.toThrow();
    });
  });

  describe('Integration with Registry', () => {
    it('should load multiple entities from registry', async () => {
      const adapterWithMocks = new MockAdapter<TestEntity>(dataSource, 'testEntity');

      const all = await adapterWithMocks.getAll();
      expect(all).toHaveLength(2);
      expect(all[0].id).toBe('mock-1');
      expect(all[1].id).toBe('mock-2');
    });

    it('should allow operations on registry-loaded entities', async () => {
      const adapterWithMocks = new MockAdapter<TestEntity>(dataSource, 'testEntity');

      // Update registry entity
      await adapterWithMocks.update('mock-1', { value: 999 });

      // Create new entity
      const newEntity = await adapterWithMocks.create({ name: 'New', value: 111 } as Partial<TestEntity>);

      // Verify
      const all = await adapterWithMocks.getAll();
      expect(all).toHaveLength(3);
      expect(all.find(e => e.id === 'mock-1')?.value).toBe(999);
      expect(all.find(e => e.id === newEntity.id)).toBeDefined();
    });
  });

  describe('Edge Cases', () => {
    beforeEach(() => {
      adapter = new MockAdapter<TestEntity>(dataSource, 'nonExistentEntity');
    });

    it('should handle rapid consecutive creates', async () => {
      const promises = Array.from({ length: 20 }, (_, i) =>
        adapter.create({ name: `Entity ${i}`, value: i } as Partial<TestEntity>),
      );

      const entities = await Promise.all(promises);

      expect(entities).toHaveLength(20);
      const ids = new Set(entities.map(e => e.id));
      expect(ids.size).toBe(20);
    });

    it('should handle complex workflow', async () => {
      const entity1 = await adapter.create({ name: 'Entity 1', value: 1 } as Partial<TestEntity>);
      const entity2 = await adapter.create({ name: 'Entity 2', value: 2 } as Partial<TestEntity>);

      await adapter.update(entity1.id, { value: 10 });
      await adapter.delete(entity2.id);
      const entity3 = await adapter.create({ name: 'Entity 3', value: 3 } as Partial<TestEntity>);

      const all = await adapter.getAll();
      expect(all).toHaveLength(2);
      expect(all.find(e => e.id === entity1.id)?.value).toBe(10);
      expect(all.find(e => e.id === entity3.id)).toBeDefined();
    });

    it('should maintain data isolation between instances', async () => {
      const adapter1 = new MockAdapter<TestEntity>(dataSource, 'nonExistentEntity');
      const adapter2 = new MockAdapter<TestEntity>(dataSource, 'nonExistentEntity');

      await adapter1.create({ name: 'Adapter 1 Entity', value: 1 } as Partial<TestEntity>);
      await adapter2.create({ name: 'Adapter 2 Entity', value: 2 } as Partial<TestEntity>);

      const all1 = await adapter1.getAll();
      const all2 = await adapter2.getAll();

      expect(all1).toHaveLength(1);
      expect(all2).toHaveLength(1);
      expect(all1[0].name).toBe('Adapter 1 Entity');
      expect(all2[0].name).toBe('Adapter 2 Entity');
    });
  });
});

