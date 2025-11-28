// ===================================================================
// Unit Tests for BaseRepository - Repository Pattern
// Coverage Target: 95%+
// Infrastructure Phase (Testing Core APIs - CROSSING 2,500!)
// ===================================================================

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import type { DataSource } from './types';
import type { IAdapter } from './adapters';

// Mock adapter registry - must be defined before imports
vi.mock('./adapters', () => ({
  adapterRegistry: {
    createAdapter: vi.fn(),
    getRegisteredTypes: vi.fn(() => ['mock', 'rest', 'sql']),
    getAdapterCount: vi.fn(() => 3),
  },
  IAdapter: {},
}));

// Mock adapter register
vi.mock('./registry/AdapterRegister', () => ({}));

// Import after mocks
import { BaseRepository } from './baseRepository';
import { adapterRegistry } from './adapters';

// Test entity
interface TestEntity {
  id: string;
  name: string;
  value: number;
}

// Mock adapter implementation
class MockAdapterImpl implements IAdapter<TestEntity> {
  async getAll(): Promise<TestEntity[]> {
    return [
      { id: '1', name: 'Entity 1', value: 100 },
      { id: '2', name: 'Entity 2', value: 200 },
    ];
  }

  async getById(id: string): Promise<TestEntity | null> {
    if (id === '1') {return { id: '1', name: 'Entity 1', value: 100 };}
    return null;
  }

  async create(entity: Partial<TestEntity>): Promise<TestEntity> {
    return {
      id: 'new-id',
      name: entity.name || 'unnamed',
      value: entity.value || 0,
    };
  }

  async update(id: string, updates: Partial<TestEntity>): Promise<TestEntity> {
    return {
      id,
      name: updates.name || 'updated',
      value: updates.value || 0,
    };
  }

  async delete(id: string): Promise<void> {
    // No-op for mock
  }
}

// Concrete test repository
class TestRepository extends BaseRepository<TestEntity> {
  constructor(dataSource: DataSource, entityName: string) {
    super(dataSource, entityName);
  }

  // Expose protected methods for testing
  public testHandleError(error: unknown, operation: string) {
    return this.handleError(error, operation);
  }

  public testLog(operation: string, data?: any) {
    return this.log(operation, data);
  }
}

describe('BaseRepository', () => {
  let repository: TestRepository;
  let dataSource: DataSource;
  let mockAdapter: MockAdapterImpl;
  let consoleErrorSpy: any;
  let consoleLogSpy: any;

  beforeEach(() => {
    dataSource = {
      type: 'mock',
      config: {},
    };
    mockAdapter = new MockAdapterImpl();
    vi.mocked(adapterRegistry.createAdapter).mockReturnValue(mockAdapter);

    repository = new TestRepository(dataSource, 'testEntity');

    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
    consoleLogSpy.mockRestore();
    vi.clearAllMocks();
  });

  describe('Initialization', () => {
    it('should create repository with data source', () => {
      expect(repository).toBeInstanceOf(BaseRepository);
      expect(repository['dataSource']).toEqual(dataSource);
    });

    it('should create repository with entity name', () => {
      expect(repository['entityName']).toBe('testEntity');
    });

    it('should create adapter via registry', () => {
      expect(adapterRegistry.createAdapter).toHaveBeenCalledWith(dataSource, 'testEntity');
    });

    it('should create adapter once during construction', () => {
      vi.mocked(adapterRegistry.createAdapter).mockClear();

      new TestRepository(dataSource, 'anotherEntity');

      expect(adapterRegistry.createAdapter).toHaveBeenCalledTimes(1);
    });
  });

  describe('CRUD Operations - Delegation', () => {
    describe('getAll', () => {
      it('should delegate to adapter.getAll', async () => {
        const spy = vi.spyOn(mockAdapter, 'getAll');

        const result = await repository.getAll();

        expect(spy).toHaveBeenCalled();
        expect(result).toHaveLength(2);
      });

      it('should return data from adapter', async () => {
        const result = await repository.getAll();

        expect(result[0]).toEqual({ id: '1', name: 'Entity 1', value: 100 });
        expect(result[1]).toEqual({ id: '2', name: 'Entity 2', value: 200 });
      });
    });

    describe('getById', () => {
      it('should delegate to adapter.getById', async () => {
        const spy = vi.spyOn(mockAdapter, 'getById');

        await repository.getById('1');

        expect(spy).toHaveBeenCalledWith('1');
      });

      it('should return entity when found', async () => {
        const result = await repository.getById('1');

        expect(result).toEqual({ id: '1', name: 'Entity 1', value: 100 });
      });

      it('should return null when not found', async () => {
        const result = await repository.getById('non-existent');

        expect(result).toBeNull();
      });
    });

    describe('create', () => {
      it('should delegate to adapter.create', async () => {
        const spy = vi.spyOn(mockAdapter, 'create');
        const entity = { name: 'New Entity', value: 999 };

        await repository.create(entity);

        expect(spy).toHaveBeenCalledWith(entity);
      });

      it('should return created entity', async () => {
        const result = await repository.create({ name: 'Test', value: 42 });

        expect(result.id).toBe('new-id');
        expect(result.name).toBe('Test');
        expect(result.value).toBe(42);
      });
    });

    describe('update', () => {
      it('should delegate to adapter.update', async () => {
        const spy = vi.spyOn(mockAdapter, 'update');
        const updates = { name: 'Updated', value: 888 };

        await repository.update('1', updates);

        expect(spy).toHaveBeenCalledWith('1', updates);
      });

      it('should return updated entity', async () => {
        const result = await repository.update('1', { name: 'Updated', value: 888 });

        expect(result.id).toBe('1');
        expect(result.name).toBe('Updated');
        expect(result.value).toBe(888);
      });
    });

    describe('delete', () => {
      it('should delegate to adapter.delete', async () => {
        const spy = vi.spyOn(mockAdapter, 'delete');

        await repository.delete('1');

        expect(spy).toHaveBeenCalledWith('1');
      });

      it('should complete without error', async () => {
        await expect(repository.delete('1')).resolves.toBeUndefined();
      });
    });
  });

  describe('Adapter Creation Error Handling', () => {
    it('should log error details when adapter creation fails', () => {
      vi.mocked(adapterRegistry.createAdapter).mockImplementationOnce(() => {
        throw new Error('Adapter not found');
      });

      expect(() => new TestRepository(dataSource, 'testEntity')).toThrow('Adapter not found');

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        '❌ Failed to create adapter:',
        expect.objectContaining({
          requestedType: 'mock',
          entityName: 'testEntity',
          availableTypes: ['mock', 'rest', 'sql'],
          adapterCount: 3,
        }),
      );
    });

    it('should include error message in log', () => {
      vi.mocked(adapterRegistry.createAdapter).mockImplementationOnce(() => {
        throw new Error('Custom error message');
      });

      expect(() => new TestRepository(dataSource, 'testEntity')).toThrow();

      const logCall = consoleErrorSpy.mock.calls[0][1];
      expect(logCall.error).toBe('Custom error message');
    });

    it('should handle non-Error objects', () => {
      vi.mocked(adapterRegistry.createAdapter).mockImplementationOnce(() => {
        throw 'String error';
      });

      expect(() => new TestRepository(dataSource, 'testEntity')).toThrow();

      expect(consoleErrorSpy).toHaveBeenCalled();
    });

    it('should include available adapter types in error', () => {
      vi.mocked(adapterRegistry.getRegisteredTypes).mockReturnValueOnce(['mock', 'rest', 'sql', 'postgres']);
      vi.mocked(adapterRegistry.createAdapter).mockImplementationOnce(() => {
        throw new Error('Not found');
      });

      expect(() => new TestRepository(dataSource, 'testEntity')).toThrow();

      const logCall = consoleErrorSpy.mock.calls[0][1];
      expect(logCall.availableTypes).toEqual(['mock', 'rest', 'sql', 'postgres']);
    });

    it('should include adapter count in error', () => {
      vi.mocked(adapterRegistry.getAdapterCount).mockReturnValueOnce(5);
      vi.mocked(adapterRegistry.createAdapter).mockImplementationOnce(() => {
        throw new Error('Not found');
      });

      expect(() => new TestRepository(dataSource, 'testEntity')).toThrow();

      const logCall = consoleErrorSpy.mock.calls[0][1];
      expect(logCall.adapterCount).toBe(5);
    });
  });

  describe('Protected Helper Methods', () => {
    describe('handleError', () => {
      it('should log error and re-throw', () => {
        const error = new Error('Test error');

        expect(() => repository.testHandleError(error, 'testOperation')).toThrow('Test error');

        expect(consoleErrorSpy).toHaveBeenCalledWith(
          '[TestRepository] Error in testOperation:',
          error,
        );
      });

      it('should handle non-Error objects', () => {
        const error = 'String error';

        expect(() => repository.testHandleError(error, 'testOperation')).toThrow();
        expect(consoleErrorSpy).toHaveBeenCalled();
      });

      it('should include operation name in log', () => {
        const error = new Error('Test');

        expect(() => repository.testHandleError(error, 'customOperation')).toThrow();

        expect(consoleErrorSpy).toHaveBeenCalledWith(
          expect.stringContaining('customOperation'),
          error,
        );
      });
    });

    describe('log', () => {
      it('should log in development mode', () => {
        const originalEnv = process.env.NODE_ENV;
        process.env.NODE_ENV = 'development';

        repository.testLog('Test operation', { data: 'test' });

        expect(consoleLogSpy).toHaveBeenCalledWith(
          '[TestRepository] Test operation',
          { data: 'test' },
        );

        process.env.NODE_ENV = originalEnv;
      });

      it('should not log in production mode', () => {
        const originalEnv = process.env.NODE_ENV;
        process.env.NODE_ENV = 'production';

        repository.testLog('Test operation', { data: 'test' });

        expect(consoleLogSpy).not.toHaveBeenCalled();

        process.env.NODE_ENV = originalEnv;
      });

      it('should log without data parameter', () => {
        const originalEnv = process.env.NODE_ENV;
        process.env.NODE_ENV = 'development';

        repository.testLog('Simple operation');

        expect(consoleLogSpy).toHaveBeenCalledWith(
          '[TestRepository] Simple operation',
          undefined,
        );

        process.env.NODE_ENV = originalEnv;
      });
    });
  });

  describe('Different Data Sources', () => {
    it('should work with mock data source', () => {
      const repo = new TestRepository({ type: 'mock', config: {} }, 'test');
      expect(repo).toBeInstanceOf(BaseRepository);
    });

    it('should work with REST data source', () => {
      const repo = new TestRepository(
        { type: 'rest', config: { baseUrl: 'http://api.com' } },
        'test',
      );
      expect(repo).toBeInstanceOf(BaseRepository);
    });

    it('should work with SQL data source', () => {
      const repo = new TestRepository(
        { type: 'sql', config: { connectionString: 'test' } },
        'test',
      );
      expect(repo).toBeInstanceOf(BaseRepository);
    });

    it('should pass correct data source to adapter', () => {
      const customDataSource = { type: 'custom' as any, config: { key: 'value' } };
      new TestRepository(customDataSource, 'test');

      expect(adapterRegistry.createAdapter).toHaveBeenCalledWith(customDataSource, 'test');
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty entity name', () => {
      const repo = new TestRepository(dataSource, '');
      expect(repo['entityName']).toBe('');
    });

    it('should handle special characters in entity name', () => {
      const repo = new TestRepository(dataSource, 'entity-with_special.chars');
      expect(repo['entityName']).toBe('entity-with_special.chars');
    });

    it('should create multiple repositories independently', () => {
      vi.mocked(adapterRegistry.createAdapter).mockClear();

      new TestRepository(dataSource, 'entity1');
      new TestRepository(dataSource, 'entity2');
      new TestRepository(dataSource, 'entity3');

      expect(adapterRegistry.createAdapter).toHaveBeenCalledTimes(3);
    });

    it('should maintain separate adapters per instance', () => {
      // Mock returns new adapter instance each time
      vi.mocked(adapterRegistry.createAdapter).mockImplementation(() => new MockAdapterImpl());

      const repo1 = new TestRepository(dataSource, 'entity1');
      const repo2 = new TestRepository(dataSource, 'entity2');

      expect(repo1['adapter']).not.toBe(repo2['adapter']);
    });
  });
});

