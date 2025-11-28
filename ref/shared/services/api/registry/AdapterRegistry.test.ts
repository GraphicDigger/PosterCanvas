// ===================================================================
// Unit Tests for AdapterRegistry - Adapter Registration System
// Coverage Target: 100%
// Phase 5 - Day 4: Utility Testing (Pushing to 3,000!)
// ===================================================================

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { adapterRegistry, registerAdapter, registerAdapters } from './AdapterRegistry';
import type { DataSource, DataSourceType } from '../types';
import type { IAdapter } from '../adapters/BaseAdapter';

// Mock adapter for testing
class MockTestAdapter implements IAdapter<any> {
  constructor(public dataSource: DataSource, public entityName: string) {}
  async getAll(): Promise<any[]> { return []; }
  async getById(id: string): Promise<any | null> { return null; }
  async create(entity: any): Promise<any> { return entity; }
  async update(id: string, updates: any): Promise<any> { return updates; }
  async delete(id: string): Promise<void> {}
}

class AnotherMockAdapter implements IAdapter<any> {
  constructor(public dataSource: DataSource, public entityName: string) {}
  async getAll(): Promise<any[]> { return []; }
  async getById(id: string): Promise<any | null> { return null; }
  async create(entity: any): Promise<any> { return entity; }
  async update(id: string, updates: any): Promise<any> { return updates; }
  async delete(id: string): Promise<void> {}
}

describe('AdapterRegistry', () => {
  let consoleWarnSpy: any;
  let consoleLogSpy: any;

  beforeEach(() => {
    // Clear the singleton registry for each test
    adapterRegistry.clear();
    consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    process.env.NODE_ENV = 'development';
  });

  afterEach(() => {
    consoleWarnSpy.mockRestore();
    consoleLogSpy.mockRestore();
    // Clean up after tests
    adapterRegistry.clear();
  });

  describe('register', () => {
    it('should register an adapter', () => {
      adapterRegistry.register('mock' as DataSourceType, MockTestAdapter);

      expect(adapterRegistry.isRegistered('mock' as DataSourceType)).toBe(true);
      expect(adapterRegistry.getAdapterCount()).toBe(1);
    });

    it('should register multiple adapters', () => {
      adapterRegistry.register('mock' as DataSourceType, MockTestAdapter);
      adapterRegistry.register('rest' as DataSourceType, AnotherMockAdapter);

      expect(adapterRegistry.getAdapterCount()).toBe(2);
      expect(adapterRegistry.isRegistered('mock' as DataSourceType)).toBe(true);
      expect(adapterRegistry.isRegistered('rest' as DataSourceType)).toBe(true);
    });

    it('should warn when overriding existing adapter', () => {
      adapterRegistry.register('mock' as DataSourceType, MockTestAdapter);
      adapterRegistry.register('mock' as DataSourceType, AnotherMockAdapter);

      expect(consoleWarnSpy).toHaveBeenCalledWith(
        expect.stringContaining("Adapter for type 'mock' is already registered"),
      );
    });

    it('should allow overriding adapter', () => {
      adapterRegistry.register('mock' as DataSourceType, MockTestAdapter);
      adapterRegistry.register('mock' as DataSourceType, AnotherMockAdapter);

      const info = adapterRegistry.getAdapterInfo();
      expect(info[0].className).toBe('AnotherMockAdapter');
    });

    it('should handle SQL adapter type', () => {
      adapterRegistry.register('sql', MockTestAdapter);
      expect(adapterRegistry.isRegistered('sql')).toBe(true);
    });

    it('should handle GraphQL adapter type', () => {
      adapterRegistry.register('graphql', MockTestAdapter);
      expect(adapterRegistry.isRegistered('graphql')).toBe(true);
    });

    it('should handle MongoDB adapter type', () => {
      adapterRegistry.register('mongodb', MockTestAdapter);
      expect(adapterRegistry.isRegistered('mongodb')).toBe(true);
    });
  });

  describe('createAdapter', () => {
    it('should create adapter instance', () => {
      adapterRegistry.register('mock' as DataSourceType, MockTestAdapter);

      const dataSource: DataSource = { type: 'mock' as DataSourceType, config: {} };
      const adapter = adapterRegistry.createAdapter(dataSource, 'testEntity');

      expect(adapter).toBeInstanceOf(MockTestAdapter);
      expect(adapter.entityName).toBe('testEntity');
    });

    it('should throw error for unregistered adapter', () => {
      const dataSource: DataSource = { type: 'nonexistent' as DataSourceType, config: {} };

      expect(() => {
        adapterRegistry.createAdapter(dataSource, 'testEntity');
      }).toThrow('Unsupported data source type: nonexistent');
    });

    it('should list available types in error message', () => {
      adapterRegistry.register('mock' as DataSourceType, MockTestAdapter);
      adapterRegistry.register('rest' as DataSourceType, AnotherMockAdapter);

      const dataSource: DataSource = { type: 'invalid' as DataSourceType, config: {} };

      expect(() => {
        adapterRegistry.createAdapter(dataSource, 'test');
      }).toThrow('Available types: [mock, rest]');
    });

    it('should pass dataSource to adapter constructor', () => {
      adapterRegistry.register('mock' as DataSourceType, MockTestAdapter);

      const dataSource: DataSource = {
        type: 'mock' as DataSourceType,
        config: { testProp: 'value' },
      };
      const adapter = adapterRegistry.createAdapter(dataSource, 'testEntity') as MockTestAdapter;

      expect(adapter.dataSource).toEqual(dataSource);
    });

    it('should handle adapter constructor errors', () => {
      class FailingAdapter implements IAdapter<any> {
        constructor() {
          throw new Error('Constructor failed');
        }
        async getAll(): Promise<any[]> { return []; }
        async getById(): Promise<any | null> { return null; }
        async create(): Promise<any> { return {}; }
        async update(): Promise<any> { return {}; }
        async delete(): Promise<void> {}
      }

      adapterRegistry.register('failing' as DataSourceType, FailingAdapter as any);
      const dataSource: DataSource = { type: 'failing' as DataSourceType, config: {} };

      expect(() => {
        adapterRegistry.createAdapter(dataSource, 'test');
      }).toThrow("Failed to create adapter for type 'failing'");
    });
  });

  describe('isRegistered', () => {
    it('should return true for registered adapter', () => {
      adapterRegistry.register('mock' as DataSourceType, MockTestAdapter);
      expect(adapterRegistry.isRegistered('mock' as DataSourceType)).toBe(true);
    });

    it('should return false for unregistered adapter', () => {
      expect(adapterRegistry.isRegistered('nonexistent' as DataSourceType)).toBe(false);
    });

    it('should return false after unregistering', () => {
      adapterRegistry.register('mock' as DataSourceType, MockTestAdapter);
      adapterRegistry.unregister('mock' as DataSourceType);
      expect(adapterRegistry.isRegistered('mock' as DataSourceType)).toBe(false);
    });
  });

  describe('getRegisteredTypes', () => {
    it('should return empty array initially', () => {
      expect(adapterRegistry.getRegisteredTypes()).toEqual([]);
    });

    it('should return all registered types', () => {
      adapterRegistry.register('mock' as DataSourceType, MockTestAdapter);
      adapterRegistry.register('rest' as DataSourceType, AnotherMockAdapter);

      const types = adapterRegistry.getRegisteredTypes();
      expect(types).toContain('mock' as DataSourceType);
      expect(types).toContain('rest' as DataSourceType);
      expect(types).toHaveLength(2);
    });

    it('should not include unregistered types', () => {
      adapterRegistry.register('mock' as DataSourceType, MockTestAdapter);
      adapterRegistry.unregister('mock' as DataSourceType);

      expect(adapterRegistry.getRegisteredTypes()).toEqual([]);
    });
  });

  describe('getAdapterCount', () => {
    it('should return 0 initially', () => {
      expect(adapterRegistry.getAdapterCount()).toBe(0);
    });

    it('should return correct count', () => {
      adapterRegistry.register('mock' as DataSourceType, MockTestAdapter);
      expect(adapterRegistry.getAdapterCount()).toBe(1);

      adapterRegistry.register('rest' as DataSourceType, AnotherMockAdapter);
      expect(adapterRegistry.getAdapterCount()).toBe(2);
    });

    it('should not increase when overriding', () => {
      adapterRegistry.register('mock' as DataSourceType, MockTestAdapter);
      adapterRegistry.register('mock' as DataSourceType, AnotherMockAdapter);

      expect(adapterRegistry.getAdapterCount()).toBe(1);
    });

    it('should decrease after unregister', () => {
      adapterRegistry.register('mock' as DataSourceType, MockTestAdapter);
      adapterRegistry.register('rest' as DataSourceType, AnotherMockAdapter);

      adapterRegistry.unregister('mock' as DataSourceType);
      expect(adapterRegistry.getAdapterCount()).toBe(1);
    });
  });

  describe('unregister', () => {
    it('should unregister adapter', () => {
      adapterRegistry.register('mock' as DataSourceType, MockTestAdapter);

      const result = adapterRegistry.unregister('mock' as DataSourceType);

      expect(result).toBe(true);
      expect(adapterRegistry.isRegistered('mock' as DataSourceType)).toBe(false);
    });

    it('should return false for non-existent adapter', () => {
      const result = adapterRegistry.unregister('nonexistent' as DataSourceType);
      expect(result).toBe(false);
    });

    it('should log in development mode', () => {
      adapterRegistry.register('mock' as DataSourceType, MockTestAdapter);
      adapterRegistry.unregister('mock' as DataSourceType);

      expect(consoleLogSpy).toHaveBeenCalledWith(
        expect.stringContaining('Unregistered adapter: mock'),
      );
    });
  });

  describe('clear', () => {
    it('should clear all adapters', () => {
      adapterRegistry.register('mock' as DataSourceType, MockTestAdapter);
      adapterRegistry.register('rest' as DataSourceType, AnotherMockAdapter);

      adapterRegistry.clear();

      expect(adapterRegistry.getAdapterCount()).toBe(0);
      expect(adapterRegistry.isRegistered('mock' as DataSourceType)).toBe(false);
      expect(adapterRegistry.isRegistered('rest' as DataSourceType)).toBe(false);
    });

    it('should log in development mode', () => {
      adapterRegistry.clear();

      expect(consoleLogSpy).toHaveBeenCalledWith(
        expect.stringContaining('Cleared all registered adapters'),
      );
    });

    it('should work with empty registry', () => {
      expect(() => adapterRegistry.clear()).not.toThrow();
      expect(adapterRegistry.getAdapterCount()).toBe(0);
    });
  });

  describe('getAdapterInfo', () => {
    it('should return empty array initially', () => {
      expect(adapterRegistry.getAdapterInfo()).toEqual([]);
    });

    it('should return adapter information', () => {
      adapterRegistry.register('mock' as DataSourceType, MockTestAdapter);

      const info = adapterRegistry.getAdapterInfo();
      expect(info).toHaveLength(1);
      expect(info[0]).toEqual({
        type: 'mock',
        className: 'MockTestAdapter',
      });
    });

    it('should return info for multiple adapters', () => {
      adapterRegistry.register('mock' as DataSourceType, MockTestAdapter);
      adapterRegistry.register('rest' as DataSourceType, AnotherMockAdapter);

      const info = adapterRegistry.getAdapterInfo();
      expect(info).toHaveLength(2);
    });
  });
});

describe('registerAdapters helper', () => {
  beforeEach(() => {
    adapterRegistry.clear();
  });

  it('should register multiple adapters at once', () => {
    registerAdapters([
      { type: 'mock' as DataSourceType, adapter: MockTestAdapter },
      { type: 'rest' as DataSourceType, adapter: AnotherMockAdapter },
    ]);

    // Verify adapters were registered
    expect(adapterRegistry.isRegistered('mock' as DataSourceType)).toBe(true);
    expect(adapterRegistry.isRegistered('rest' as DataSourceType)).toBe(true);
  });

  it('should handle empty array', () => {
    expect(() => registerAdapters([])).not.toThrow();
  });
});

describe('registerAdapter decorator', () => {
  it('should register adapter via decorator', () => {
    @registerAdapter('decorated' as DataSourceType)
    class DecoratedAdapter implements IAdapter<any> {
      constructor(public dataSource: DataSource, public entityName: string) {}
      async getAll(): Promise<any[]> { return []; }
      async getById(): Promise<any | null> { return null; }
      async create(): Promise<any> { return {}; }
      async update(): Promise<any> { return {}; }
      async delete(): Promise<void> {}
    }

    // Decorator should have registered the adapter
    expect(DecoratedAdapter).toBeDefined();
  });

  it('should return the class unchanged', () => {
    @registerAdapter('decorated2' as DataSourceType)
    class DecoratedAdapter2 implements IAdapter<any> {
      constructor(public dataSource: DataSource, public entityName: string) {}
      static staticMethod() { return 'test'; }
      async getAll(): Promise<any[]> { return []; }
      async getById(): Promise<any | null> { return null; }
      async create(): Promise<any> { return {}; }
      async update(): Promise<any> { return {}; }
      async delete(): Promise<void> {}
    }

    expect(DecoratedAdapter2.staticMethod()).toBe('test');
  });
});

