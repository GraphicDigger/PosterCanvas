// ===================================================================
// API SYSTEM TESTS: Repository Factory
// 🔴 CRITICAL-FIRST STRATEGY - Phase 5 Part 1 🔴
// Repository Creation, Validation, Error Handling
// ===================================================================

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { createRepository } from './createRepository';
import { BaseRepository } from './baseRepository';
import type { DataSource } from './types';

// Mock validation helper
vi.mock('./adapters/helpers/dataSourceResolver', () => ({
  validateDataSourceConfig: vi.fn(),
}));

// Mock adapter registry
vi.mock('./adapters', () => ({
  adapterRegistry: {
    createAdapter: vi.fn(),
    getRegisteredTypes: vi.fn(() => ['mock', 'rest', 'sql']),
    getAdapterCount: vi.fn(() => 3),
  },
  IAdapter: {},
}));

import { validateDataSourceConfig } from './adapters/helpers/dataSourceResolver';
import { adapterRegistry } from './adapters';

// Test entity type
interface TestEntity {
  id: string;
  name: string;
}

// Mock repository class
class TestRepository extends BaseRepository<TestEntity> {
  constructor(dataSource: DataSource, entityName: string) {
    super(dataSource, entityName);
  }
}

describe('API Repository Factory - CRITICAL BUSINESS LOGIC', () => {

  beforeEach(() => {
    vi.clearAllMocks();
    // Default: validation passes
    (validateDataSourceConfig as any).mockReturnValue({ isValid: true, errors: [] });

    // Mock adapter creation
    const mockAdapter = {
      getAll: vi.fn().mockResolvedValue([]),
      getById: vi.fn().mockResolvedValue(null),
      create: vi.fn().mockResolvedValue({ id: 'test-id', name: 'test' }),
      update: vi.fn().mockResolvedValue({ id: 'test-id', name: 'updated' }),
      delete: vi.fn().mockResolvedValue(undefined),
    };
    (adapterRegistry.createAdapter as any).mockReturnValue(mockAdapter);
  });

  // ===================================================================
  // Section 1: Basic Repository Creation (5 tests)
  // ===================================================================

  describe('Basic Repository Creation', () => {
    it('should create repository with valid data source', () => {
      const dataSource: DataSource = {
        type: 'mock',
        config: {},
      };

      const repository = createRepository(TestRepository, 'testEntity', dataSource);

      expect(repository).toBeInstanceOf(TestRepository);
      expect(repository).toBeInstanceOf(BaseRepository);
    });

    it('should call validateDataSourceConfig', () => {
      const dataSource: DataSource = {
        type: 'rest',
        config: { baseUrl: 'http://api.example.com' },
      };

      createRepository(TestRepository, 'testEntity', dataSource);

      expect(validateDataSourceConfig).toHaveBeenCalledWith(dataSource);
      expect(validateDataSourceConfig).toHaveBeenCalledTimes(1);
    });

    it('should create repository with mock data source', () => {
      const dataSource: DataSource = {
        type: 'mock',
        config: { delay: 100 },
      };

      const repository = createRepository(TestRepository, 'mockEntity', dataSource);

      expect(repository).toBeDefined();
      expect(repository).toBeInstanceOf(TestRepository);
    });

    it('should create repository with rest data source', () => {
      const dataSource: DataSource = {
        type: 'rest',
        config: {
          baseUrl: 'http://api.example.com',
          timeout: 5000,
        },
      };

      const repository = createRepository(TestRepository, 'restEntity', dataSource);

      expect(repository).toBeDefined();
      expect(repository).toBeInstanceOf(TestRepository);
    });

    it('should create repository with sql data source', () => {
      const dataSource: DataSource = {
        type: 'sql',
        config: {
          backend: 'postgresql',
          host: 'localhost',
          port: 5432,
        },
      };

      const repository = createRepository(TestRepository, 'sqlEntity', dataSource);

      expect(repository).toBeDefined();
      expect(repository).toBeInstanceOf(TestRepository);
    });
  });

  // ===================================================================
  // Section 2: Validation Handling (5 tests)
  // ===================================================================

  describe('Validation Handling', () => {
    it('should warn when data source config is invalid', () => {
      const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

      (validateDataSourceConfig as any).mockReturnValue({
        isValid: false,
        errors: ['Missing baseUrl'],
      });

      const dataSource: DataSource = {
        type: 'rest',
        config: {},
      };

      createRepository(TestRepository, 'testEntity', dataSource);

      expect(consoleWarnSpy).toHaveBeenCalledWith(
        expect.stringContaining('Invalid data source config for testEntity'),
        ['Missing baseUrl'],
      );

      consoleWarnSpy.mockRestore();
    });

    it('should still create repository with invalid config', () => {
      (validateDataSourceConfig as any).mockReturnValue({
        isValid: false,
        errors: ['Invalid config'],
      });

      const dataSource: DataSource = {
        type: 'mock',
        config: {},
      };

      const repository = createRepository(TestRepository, 'testEntity', dataSource);

      // Should still create repository despite validation failure
      expect(repository).toBeDefined();
      expect(repository).toBeInstanceOf(TestRepository);
    });

    it('should handle validation with multiple errors', () => {
      const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

      (validateDataSourceConfig as any).mockReturnValue({
        isValid: false,
        errors: ['Missing baseUrl', 'Invalid timeout', 'Missing headers'],
      });

      const dataSource: DataSource = {
        type: 'rest',
        config: {},
      };

      createRepository(TestRepository, 'testEntity', dataSource);

      expect(consoleWarnSpy).toHaveBeenCalled();

      consoleWarnSpy.mockRestore();
    });

    it('should handle validation throwing error', () => {
      (validateDataSourceConfig as any).mockImplementation(() => {
        throw new Error('Validation failed');
      });

      const dataSource: DataSource = {
        type: 'mock',
        config: {},
      };

      // Should fall back to mock data source
      const repository = createRepository(TestRepository, 'testEntity', dataSource);

      expect(repository).toBeDefined();
    });

    it('should not warn when validation passes', () => {
      const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

      (validateDataSourceConfig as any).mockReturnValue({
        isValid: true,
        errors: [],
      });

      const dataSource: DataSource = {
        type: 'mock',
        config: {},
      };

      createRepository(TestRepository, 'testEntity', dataSource);

      expect(consoleWarnSpy).not.toHaveBeenCalled();

      consoleWarnSpy.mockRestore();
    });
  });

  // ===================================================================
  // Section 3: Error Handling & Fallback (5 tests)
  // ===================================================================

  describe('Error Handling & Fallback', () => {
    it('should fall back to mock adapter on repository creation error', () => {
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      // Mock repository that throws in constructor
      class FailingRepository extends BaseRepository<TestEntity> {
        constructor(dataSource: DataSource, entityName: string) {
          if (dataSource.type !== 'mock') {
            throw new Error('Repository creation failed');
          }
          super(dataSource, entityName);
        }
      }

      const dataSource: DataSource = {
        type: 'rest',
        config: {},
      };

      const repository = createRepository(FailingRepository, 'testEntity', dataSource);

      // Should still return a repository (with fallback mock)
      expect(repository).toBeDefined();
      expect(repository).toBeInstanceOf(FailingRepository);
      expect(consoleErrorSpy).toHaveBeenCalled();

      consoleErrorSpy.mockRestore();
    });

    it('should log error when repository creation fails', () => {
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      class FailingRepository extends BaseRepository<TestEntity> {
        constructor(dataSource: DataSource, entityName: string) {
          if (dataSource.type === 'invalid') {
            throw new Error('Invalid data source type');
          }
          super(dataSource, entityName);
        }
      }

      const dataSource: DataSource = {
        type: 'invalid' as any,
        config: {},
      };

      createRepository(FailingRepository, 'testEntity', dataSource);

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        expect.stringContaining('Failed to create repository'),
        expect.any(Error),
      );

      consoleErrorSpy.mockRestore();
    });

    it('should use mock fallback data source', () => {
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      class FailingRepository extends BaseRepository<TestEntity> {
        constructor(dataSource: DataSource, entityName: string) {
          if (dataSource.type !== 'mock') {
            throw new Error('Only mock allowed');
          }
          super(dataSource, entityName);
        }
      }

      const dataSource: DataSource = {
        type: 'rest',
        config: {},
      };

      const repository = createRepository(FailingRepository, 'testEntity', dataSource);

      // Repository should be created with fallback mock
      expect(repository).toBeDefined();

      consoleErrorSpy.mockRestore();
    });

    it('should handle null data source gracefully', () => {
      // Make adapter creation fail for null data source
      (adapterRegistry.createAdapter as any).mockImplementationOnce(() => {
        throw new Error('Cannot create adapter with null data source');
      });

      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      const repository = createRepository(TestRepository, 'testEntity', null as any);

      // Should fall back and create repository with mock
      expect(repository).toBeDefined();
      expect(consoleErrorSpy).toHaveBeenCalled();

      consoleErrorSpy.mockRestore();
    });

    it('should handle undefined data source gracefully', () => {
      // Make adapter creation fail for undefined data source
      (adapterRegistry.createAdapter as any).mockImplementationOnce(() => {
        throw new Error('Cannot create adapter with undefined data source');
      });

      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      const repository = createRepository(TestRepository, 'testEntity', undefined as any);

      // Should fall back and create repository with mock
      expect(repository).toBeDefined();
      expect(consoleErrorSpy).toHaveBeenCalled();

      consoleErrorSpy.mockRestore();
    });
  });
});
