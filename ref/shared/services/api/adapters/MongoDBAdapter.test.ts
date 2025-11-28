// ===================================================================
// Unit Tests for MongoDBAdapter - MongoDB Infrastructure
// Coverage Target: 95%+
// Phase 5 - Day 3: Adapter Testing (Pushing to 3,000!)
// ===================================================================

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { MongoDBAdapter } from './MongoDBAdapter';
import type { MongoDBDataSource } from '../types';

// Mock adapter registry
vi.mock('../registry/AdapterRegistry', () => ({
  registerAdapter: () => (target: any) => target,
}));

// Mock withLogging helper
vi.mock('./helpers/withLogging', () => ({
  wrapAdapterMethods: vi.fn(),
}));

interface TestEntity {
  id: string;
  name: string;
  value: number;
}

describe('MongoDBAdapter', () => {
  let adapter: MongoDBAdapter<TestEntity>;
  let dataSource: MongoDBDataSource;
  let consoleLogSpy: any;

  beforeEach(() => {
    // Set NODE_ENV to development for mocking
    process.env.NODE_ENV = 'development';

    dataSource = {
      type: 'mongodb',
      config: {
        uri: 'mongodb://localhost:27017',
        database: 'testdb',
        collection: 'test_collection',
      },
    };
    adapter = new MongoDBAdapter<TestEntity>(dataSource, 'users');
    consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
    vi.restoreAllMocks();
  });

  describe('Initialization', () => {
    it('should initialize with correct config', () => {
      expect(adapter).toBeInstanceOf(MongoDBAdapter);
      expect(adapter['database']).toBe('testdb');
      expect(adapter['entityName']).toBe('users');
    });

    it('should generate correct collection name', () => {
      expect(adapter['collectionName']).toBe('client_users');
    });

    it('should generate system collection when uiCreated', () => {
      const systemDS: MongoDBDataSource = {
        ...dataSource,
        config: {
          ...dataSource.config,
          uiCreated: true,
        },
      };
      const systemAdapter = new MongoDBAdapter<TestEntity>(systemDS, 'screens');
      expect(systemAdapter['collectionName']).toBe('system_screens');
    });
  });

  describe('CRUD Operations', () => {
    describe('getAll', () => {
      it('should fetch all entities', async () => {
        const result = await adapter.getAll();

        expect(result).toEqual([]);
        expect(consoleLogSpy).toHaveBeenCalledWith(
          '🍃 MongoDB Operation:',
          expect.objectContaining({
            database: 'testdb',
            collection: 'client_users',
            operation: 'find',
          }),
        );
      });

      it('should sort by createdAt descending', async () => {
        await adapter.getAll();

        const logCall = consoleLogSpy.mock.calls.find((call: any) =>
          call[0] === '🍃 MongoDB Operation:',
        );
        expect(logCall[1].args[1]).toMatchObject({ sort: { createdAt: -1 } });
      });

      it('should exclude MongoDB _id field', async () => {
        await adapter.getAll();

        const logCall = consoleLogSpy.mock.calls.find((call: any) =>
          call[0] === '🍃 MongoDB Operation:',
        );
        expect(logCall[1].args[1]).toMatchObject({ projection: { _id: 0 } });
      });
    });

    describe('getById', () => {
      it('should fetch entity by ID', async () => {
        const result = await adapter.getById('123');
        // Mock returns a result in development
        expect(result).toBeDefined();
      });

      it('should use correct filter', async () => {
        await adapter.getById('123');

        const logCall = consoleLogSpy.mock.calls.find((call: any) =>
          call[0] === '🍃 MongoDB Operation:',
        );
        expect(logCall[1].args[0]).toEqual({ id: '123' });
      });

      it('should use findOne operation', async () => {
        await adapter.getById('123');

        const logCall = consoleLogSpy.mock.calls.find((call: any) =>
          call[0] === '🍃 MongoDB Operation:',
        );
        expect(logCall[1].operation).toBe('findOne');
      });
    });

    describe('create', () => {
      it('should create new entity', async () => {
        const newEntity = { name: 'Test User', value: 100 };
        const result = await adapter.create(newEntity);

        expect(result).toBeDefined();
        expect(result.id).toBeDefined();
        expect(result.id.length).toBeGreaterThan(0); // Has valid ID
      });

      it('should add timestamps', async () => {
        const result = await adapter.create({ name: 'Test', value: 1 });

        expect(result).toHaveProperty('createdAt');
        expect(result).toHaveProperty('updatedAt');
        expect(result.createdAt).toBeInstanceOf(Date);
      });

      it('should add UI metadata when uiCreated', async () => {
        const uiDS: MongoDBDataSource = {
          ...dataSource,
          config: {
            ...dataSource.config,
            uiCreated: true,
          },
        };
        const uiAdapter = new MongoDBAdapter<TestEntity>(uiDS, 'screens');
        const result = await uiAdapter.create({ name: 'Test', value: 1 });

        expect(result).toHaveProperty('createdViaUI', true);
        expect(result).toHaveProperty('uiVersion', '1.0.0');
        expect(result).toHaveProperty('createdBy', 'ui-system');
      });

      it('should use insertOne operation', async () => {
        await adapter.create({ name: 'Test', value: 1 });

        const logCall = consoleLogSpy.mock.calls.find((call: any) =>
          call[0] === '🍃 MongoDB Operation:',
        );
        expect(logCall[1].operation).toBe('insertOne');
      });
    });

    describe('update', () => {
      it('should update entity', async () => {
        const result = await adapter.update('123', { name: 'Updated', value: 999 });

        expect(result).toBeDefined();
      });

      it('should use $set operator', async () => {
        await adapter.update('123', { name: 'Updated' });

        const logCall = consoleLogSpy.mock.calls.find((call: any) =>
          call[0] === '🍃 MongoDB Operation:',
        );
        expect(logCall[1].args[1]).toHaveProperty('$set');
      });

      it('should increment version', async () => {
        await adapter.update('123', { name: 'Updated' });

        const logCall = consoleLogSpy.mock.calls.find((call: any) =>
          call[0] === '🍃 MongoDB Operation:',
        );
        expect(logCall[1].args[1]).toHaveProperty('$inc');
        expect(logCall[1].args[1].$inc).toEqual({ version: 1 });
      });

      it('should use findOneAndUpdate', async () => {
        await adapter.update('123', { name: 'Updated' });

        const logCall = consoleLogSpy.mock.calls.find((call: any) =>
          call[0] === '🍃 MongoDB Operation:',
        );
        expect(logCall[1].operation).toBe('findOneAndUpdate');
      });
    });

    describe('delete', () => {
      it('should delete entity', async () => {
        await adapter.delete('123');

        const logCall = consoleLogSpy.mock.calls.find((call: any) =>
          call[0] === '🍃 MongoDB Operation:',
        );
        expect(logCall[1].operation).toBe('deleteOne');
        expect(logCall[1].args[0]).toEqual({ id: '123' });
      });
    });
  });

  describe('MongoDB-Specific Features', () => {
    describe('findByNestedField', () => {
      it('should query nested field', async () => {
        const result = await adapter.findByNestedField('metadata.status', 'active');

        expect(result).toBeDefined();
        const logCall = consoleLogSpy.mock.calls.find((call: any) =>
          call[0] === '🍃 MongoDB Operation:',
        );
        expect(logCall[1].args[0]).toEqual({ 'metadata.status': 'active' });
      });

      it('should sort by createdAt', async () => {
        await adapter.findByNestedField('data.type', 'user');

        const logCall = consoleLogSpy.mock.calls.find((call: any) =>
          call[0] === '🍃 MongoDB Operation:',
        );
        expect(logCall[1].args[1]).toMatchObject({ sort: { createdAt: -1 } });
      });
    });

    describe('textSearch', () => {
      it('should perform text search', async () => {
        const result = await adapter.textSearch('test query');

        expect(result).toBeDefined();
        const logCall = consoleLogSpy.mock.calls.find((call: any) =>
          call[0] === '🍃 MongoDB Operation:',
        );
        expect(logCall[1].args[0]).toHaveProperty('$text');
      });

      it('should use Russian language by default', async () => {
        await adapter.textSearch('тест');

        const logCall = consoleLogSpy.mock.calls.find((call: any) =>
          call[0] === '🍃 MongoDB Operation:',
        );
        expect(logCall[1].args[0].$text.$language).toBe('russian');
      });

      it('should support custom language', async () => {
        await adapter.textSearch('test', { language: 'english' });

        const logCall = consoleLogSpy.mock.calls.find((call: any) =>
          call[0] === '🍃 MongoDB Operation:',
        );
        expect(logCall[1].args[0].$text.$language).toBe('english');
      });

      it('should support case-sensitive search', async () => {
        await adapter.textSearch('Test', { caseSensitive: true });

        const logCall = consoleLogSpy.mock.calls.find((call: any) =>
          call[0] === '🍃 MongoDB Operation:',
        );
        expect(logCall[1].args[0].$text.$caseSensitive).toBe(true);
      });

      it('should include text score in projection', async () => {
        await adapter.textSearch('query');

        const logCall = consoleLogSpy.mock.calls.find((call: any) =>
          call[0] === '🍃 MongoDB Operation:',
        );
        expect(logCall[1].args[1].projection).toHaveProperty('score');
      });
    });

    describe('aggregate', () => {
      it('should run aggregation pipeline', async () => {
        const pipeline = [
          { $match: { status: 'active' } },
          { $group: { _id: '$type', count: { $sum: 1 } } },
        ];
        const result = await adapter.aggregate(pipeline);

        expect(result).toBeDefined();
        const logCall = consoleLogSpy.mock.calls.find((call: any) =>
          call[0] === '🍃 MongoDB Operation:',
        );
        expect(logCall[1].operation).toBe('aggregate');
        expect(logCall[1].args[0]).toEqual(pipeline);
      });

      it('should allow disk use', async () => {
        await adapter.aggregate([]);

        const logCall = consoleLogSpy.mock.calls.find((call: any) =>
          call[0] === '🍃 MongoDB Operation:',
        );
        expect(logCall[1].args[1]).toMatchObject({ allowDiskUse: true });
      });
    });

    describe('groupBy', () => {
      it('should group by field', async () => {
        const result = await adapter.groupBy('category');

        expect(result).toBeDefined();
        const logCall = consoleLogSpy.mock.calls.find((call: any) =>
          call[0] === '🍃 MongoDB Operation:',
        );
        expect(logCall[1].operation).toBe('aggregate');
      });

      it('should include count', async () => {
        await adapter.groupBy('type', 'name');

        // groupBy calls aggregate internally
        const logCall = consoleLogSpy.mock.calls.find((call: any) =>
          call[0] === '🍃 MongoDB Operation:' &&
          call[1].operation === 'aggregate',
        );
        expect(logCall).toBeDefined();
      });
    });

    describe('findByArrayElement', () => {
      it('should find by array element', async () => {
        const result = await adapter.findByArrayElement('tags', 'important');

        expect(result).toBeDefined();
        const logCall = consoleLogSpy.mock.calls.find((call: any) =>
          call[0] === '🍃 MongoDB Operation:',
        );
        expect(logCall[1].args[0]).toHaveProperty('tags');
        expect(logCall[1].args[0].tags).toHaveProperty('$in');
      });

      it('should handle array values', async () => {
        await adapter.findByArrayElement('categories', ['tech', 'news']);

        const logCall = consoleLogSpy.mock.calls.find((call: any) =>
          call[0] === '🍃 MongoDB Operation:',
        );
        expect(logCall[1].args[0].categories.$in).toEqual(['tech', 'news']);
      });

      it('should wrap single value in array', async () => {
        await adapter.findByArrayElement('tags', 'single');

        const logCall = consoleLogSpy.mock.calls.find((call: any) =>
          call[0] === '🍃 MongoDB Operation:',
        );
        expect(logCall[1].args[0].tags.$in).toEqual(['single']);
      });
    });

    describe('getPage', () => {
      it('should return paginated results', async () => {
        const result = await adapter.getPage(1, 20);

        expect(result).toHaveProperty('data');
        expect(result).toHaveProperty('total');
        expect(result).toHaveProperty('hasMore');
        expect(result).toHaveProperty('page', 1);
        expect(result).toHaveProperty('pageSize', 20);
      });

      it('should use skip and limit', async () => {
        await adapter.getPage(2, 10);

        const logCalls = consoleLogSpy.mock.calls.filter((call: any) =>
          call[0] === '🍃 MongoDB Operation:',
        );

        const findCall = logCalls.find((call: any) =>
          call[1].operation === 'find' && call[1].args[1]?.skip !== undefined,
        );

        expect(findCall[1].args[1]).toMatchObject({ skip: 10, limit: 10 });
      });

      it('should count total documents', async () => {
        await adapter.getPage(1, 20);

        const countCall = consoleLogSpy.mock.calls.find((call: any) =>
          call[0] === '🍃 MongoDB Operation:' &&
          call[1].operation === 'countDocuments',
        );

        expect(countCall).toBeDefined();
      });

      it('should sort by custom field', async () => {
        await adapter.getPage(1, 20, 'name');

        const logCalls = consoleLogSpy.mock.calls.filter((call: any) =>
          call[0] === '🍃 MongoDB Operation:',
        );

        const findCall = logCalls.find((call: any) =>
          call[1].operation === 'find' && call[1].args[1]?.sort,
        );

        expect(findCall[1].args[1].sort).toHaveProperty('name', -1);
      });

      it('should calculate hasMore correctly', async () => {
        const result = await adapter.getPage(1, 20);

        // Mock returns count of 42
        expect(result.hasMore).toBe(true); // 20 < 42
      });
    });

    describe('findByRange', () => {
      it('should find by range', async () => {
        const result = await adapter.findByRange('value', 10, 100);

        expect(result).toBeDefined();
        const logCall = consoleLogSpy.mock.calls.find((call: any) =>
          call[0] === '🍃 MongoDB Operation:',
        );
        expect(logCall[1].args[0]).toEqual({
          value: { $gte: 10, $lte: 100 },
        });
      });

      it('should sort by range field', async () => {
        await adapter.findByRange('price', 0, 1000);

        const logCall = consoleLogSpy.mock.calls.find((call: any) =>
          call[0] === '🍃 MongoDB Operation:',
        );
        expect(logCall[1].args[1].sort).toHaveProperty('price', 1);
      });

      it('should handle date ranges', async () => {
        const start = new Date('2024-01-01');
        const end = new Date('2024-12-31');

        await adapter.findByRange('createdAt', start, end);

        const logCall = consoleLogSpy.mock.calls.find((call: any) =>
          call[0] === '🍃 MongoDB Operation:',
        );
        // Dates might be serialized to strings in mock
        const filter = logCall[1].args[0].createdAt;
        expect(filter).toHaveProperty('$gte');
        expect(filter).toHaveProperty('$lte');
      });
    });

    describe('createIndex', () => {
      it('should create index in development', async () => {
        const indexSpec = { name: 1 };
        const result = await adapter.createIndex(indexSpec);

        expect(result).toContain('mock_index_');
        expect(consoleLogSpy).toHaveBeenCalledWith(
          expect.stringContaining('Would create MongoDB index'),
          expect.objectContaining({ indexSpec }),
        );
      });

      it('should include options in log', async () => {
        const indexSpec = { email: 1 };
        const options = { unique: true };
        await adapter.createIndex(indexSpec, options);

        expect(consoleLogSpy).toHaveBeenCalledWith(
          expect.any(String),
          expect.objectContaining({ options }),
        );
      });
    });
  });

  describe('Collection Name Generation', () => {
    it('should generate client collection by default', () => {
      const adapter1 = new MongoDBAdapter<TestEntity>(dataSource, 'products');
      expect(adapter1['collectionName']).toBe('client_products');
    });

    it('should generate system collection when uiCreated', () => {
      const systemDS: MongoDBDataSource = {
        ...dataSource,
        config: { ...dataSource.config, uiCreated: true },
      };
      const adapter2 = new MongoDBAdapter<TestEntity>(systemDS, 'components');
      expect(adapter2['collectionName']).toBe('system_components');
    });

    it('should handle plural entity names', () => {
      const adapter3 = new MongoDBAdapter<TestEntity>(dataSource, 'screens');
      expect(adapter3['collectionName']).toBe('client_screens');
    });
  });

  describe('MongoDB ID Generation', () => {
    it('should generate MongoDB-style IDs', async () => {
      const result = await adapter.create({ name: 'Test', value: 1 });

      // Mock generates ObjectId-style IDs
      expect(result.id).toBeTruthy();
      expect(result.id.length).toBeGreaterThan(0);
    });

    it('should generate unique IDs', async () => {
      const result1 = await adapter.create({ name: 'Test1', value: 1 });
      const result2 = await adapter.create({ name: 'Test2', value: 2 });

      expect(result1.id).not.toBe(result2.id);
    });
  });

  describe('Edge Cases', () => {
    it('should handle getPage with page 0', async () => {
      const result = await adapter.getPage(0, 10);
      expect(result).toBeDefined();
    });

    it('should handle getPage with default params', async () => {
      const result = await adapter.getPage();
      expect(result.page).toBe(1);
      expect(result.pageSize).toBe(20);
    });

    it('should handle empty aggregation pipeline', async () => {
      const result = await adapter.aggregate([]);
      expect(result).toBeDefined();
    });

    it('should handle nested field with dots', async () => {
      await adapter.findByNestedField('data.user.profile.name', 'John');

      const logCall = consoleLogSpy.mock.calls.find((call: any) =>
        call[0] === '🍃 MongoDB Operation:',
      );
      expect(logCall[1].args[0]).toHaveProperty('data.user.profile.name', 'John');
    });
  });
});

