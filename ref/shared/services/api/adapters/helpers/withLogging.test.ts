// ===================================================================
// Unit Tests for withLogging & wrapAdapterMethods
// CRITICAL BUSINESS LOGIC - Method Logging & Error Handling
// Week 2, Day 4 - Part 3 (20 tests)
// ===================================================================

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { withLogging, wrapAdapterMethods } from './withLogging';

describe('withLogging & wrapAdapterMethods', () => {
  let originalEnv: string | undefined;
  let consoleLogSpy: any;
  let consoleErrorSpy: any;

  beforeEach(() => {
    originalEnv = process.env.NODE_ENV;
    consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.useFakeTimers();
  });

  afterEach(() => {
    process.env.NODE_ENV = originalEnv;
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  // ===================================================================
  // PART 1: withLogging - Basic Functionality (5 tests)
  // ===================================================================

  describe('withLogging - Basic Functionality', () => {
    it('should execute wrapped method successfully', async () => {
      const mockMethod = vi.fn().mockResolvedValue({ id: '1', name: 'Test' });
      const wrapped = withLogging(mockMethod, 'getById', 'TestAdapter');

      const result = await wrapped('1');

      expect(result).toEqual({ id: '1', name: 'Test' });
      expect(mockMethod).toHaveBeenCalledWith('1');
    });

    it('should preserve method arguments', async () => {
      const mockMethod = vi.fn().mockResolvedValue(true);
      const wrapped = withLogging(mockMethod, 'update', 'TestAdapter');

      await wrapped('123', { name: 'Updated' });

      expect(mockMethod).toHaveBeenCalledWith('123', { name: 'Updated' });
    });

    it('should handle methods with no arguments', async () => {
      const mockMethod = vi.fn().mockResolvedValue([]);
      const wrapped = withLogging(mockMethod, 'getAll', 'TestAdapter');

      const result = await wrapped();

      expect(result).toEqual([]);
      expect(mockMethod).toHaveBeenCalledWith();
    });

    it('should handle methods returning arrays', async () => {
      const mockData = [{ id: '1' }, { id: '2' }];
      const mockMethod = vi.fn().mockResolvedValue(mockData);
      const wrapped = withLogging(mockMethod, 'getAll', 'TestAdapter');

      const result = await wrapped();

      expect(result).toEqual(mockData);
      expect(result).toHaveLength(2);
    });

    it('should handle methods returning primitives', async () => {
      const mockMethod = vi.fn().mockResolvedValue(42);
      const wrapped = withLogging(mockMethod, 'count', 'TestAdapter');

      const result = await wrapped();

      expect(result).toBe(42);
    });
  });

  // ===================================================================
  // PART 2: withLogging - Development Logging (4 tests)
  // ===================================================================

  describe('withLogging - Development Logging', () => {
    beforeEach(() => {
      process.env.NODE_ENV = 'development';
    });

    it('should log method start in development mode', async () => {
      const mockMethod = vi.fn().mockResolvedValue({});
      const wrapped = withLogging(mockMethod, 'create', 'UserAdapter');

      await wrapped({ name: 'John' });

      expect(consoleLogSpy).toHaveBeenCalledWith(
        '[UserAdapter] create',
        expect.objectContaining({
          args: [{ name: 'John' }],
          timestamp: expect.any(String),
        }),
      );
    });

    it('should log successful execution in development mode', async () => {
      const mockMethod = vi.fn().mockResolvedValue({ id: '1' });
      const wrapped = withLogging(mockMethod, 'getById', 'UserAdapter');

      vi.setSystemTime(new Date('2024-01-01T00:00:00.000Z'));
      await wrapped('1');
      vi.advanceTimersByTime(50);

      expect(consoleLogSpy).toHaveBeenCalledWith(
        '[UserAdapter] getById ✅',
        expect.objectContaining({
          duration: expect.stringContaining('ms'),
          resultType: 'object',
        }),
      );
    });

    it('should not log arguments when method has no args in development', async () => {
      const mockMethod = vi.fn().mockResolvedValue([]);
      const wrapped = withLogging(mockMethod, 'getAll', 'UserAdapter');

      await wrapped();

      expect(consoleLogSpy).toHaveBeenCalledWith(
        '[UserAdapter] getAll',
        expect.objectContaining({
          args: undefined,
        }),
      );
    });

    it('should log array result type with length in development', async () => {
      const mockMethod = vi.fn().mockResolvedValue([1, 2, 3]);
      const wrapped = withLogging(mockMethod, 'getAll', 'UserAdapter');

      await wrapped();

      expect(consoleLogSpy).toHaveBeenCalledWith(
        '[UserAdapter] getAll ✅',
        expect.objectContaining({
          resultType: 'array[3]',
        }),
      );
    });
  });

  // ===================================================================
  // PART 3: withLogging - Error Handling (4 tests)
  // ===================================================================

  describe('withLogging - Error Handling', () => {
    it('should catch and log errors', async () => {
      const error = new Error('Database connection failed');
      const mockMethod = vi.fn().mockRejectedValue(error);
      const wrapped = withLogging(mockMethod, 'getById', 'UserAdapter');

      await expect(wrapped('1')).rejects.toThrow('Database connection failed');

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        '[UserAdapter] getById ❌',
        expect.objectContaining({
          error: 'Database connection failed',
          duration: expect.stringContaining('ms'),
          stack: expect.any(String),
          args: ['1'],
        }),
      );
    });

    it('should handle non-Error rejections', async () => {
      const mockMethod = vi.fn().mockRejectedValue('String error');
      const wrapped = withLogging(mockMethod, 'delete', 'UserAdapter');

      await expect(wrapped('1')).rejects.toBe('String error');

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        '[UserAdapter] delete ❌',
        expect.objectContaining({
          error: 'String error',
        }),
      );
    });

    it('should log error with no args', async () => {
      const error = new Error('Fetch failed');
      const mockMethod = vi.fn().mockRejectedValue(error);
      const wrapped = withLogging(mockMethod, 'getAll', 'UserAdapter');

      await expect(wrapped()).rejects.toThrow('Fetch failed');

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        '[UserAdapter] getAll ❌',
        expect.objectContaining({
          error: 'Fetch failed',
          args: undefined,
        }),
      );
    });

    it('should rethrow error after logging', async () => {
      const error = new Error('Test error');
      const mockMethod = vi.fn().mockRejectedValue(error);
      const wrapped = withLogging(mockMethod, 'update', 'UserAdapter');

      let caughtError: Error | null = null;
      try {
        await wrapped('1', { name: 'Updated' });
      } catch (e) {
        caughtError = e as Error;
      }

      expect(caughtError).toBe(error);
      expect(caughtError?.message).toBe('Test error');
    });
  });

  // ===================================================================
  // PART 4: withLogging - Production Mode (2 tests)
  // ===================================================================

  describe('withLogging - Production Mode', () => {
    beforeEach(() => {
      process.env.NODE_ENV = 'production';
    });

    it('should not log in production mode for success', async () => {
      const mockMethod = vi.fn().mockResolvedValue({ id: '1' });
      const wrapped = withLogging(mockMethod, 'getById', 'UserAdapter');

      await wrapped('1');

      expect(consoleLogSpy).not.toHaveBeenCalled();
    });

    it('should still log errors in production mode', async () => {
      const error = new Error('Critical error');
      const mockMethod = vi.fn().mockRejectedValue(error);
      const wrapped = withLogging(mockMethod, 'create', 'UserAdapter');

      await expect(wrapped({ name: 'Test' })).rejects.toThrow('Critical error');

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        '[UserAdapter] create ❌',
        expect.objectContaining({
          error: 'Critical error',
        }),
      );
    });
  });

  // ===================================================================
  // PART 5: wrapAdapterMethods (5 tests)
  // ===================================================================

  describe('wrapAdapterMethods', () => {
    it('should wrap specified CRUD methods', () => {
      const adapter = {
        getAll: vi.fn().mockResolvedValue([]),
        getById: vi.fn().mockResolvedValue({}),
        create: vi.fn().mockResolvedValue({}),
        update: vi.fn().mockResolvedValue({}),
        delete: vi.fn().mockResolvedValue(undefined),
      };

      wrapAdapterMethods(adapter, 'TestAdapter');

      expect(typeof adapter.getAll).toBe('function');
      expect(typeof adapter.getById).toBe('function');
      expect(typeof adapter.create).toBe('function');
      expect(typeof adapter.update).toBe('function');
      expect(typeof adapter.delete).toBe('function');
    });

    it('should wrap custom method names', () => {
      const adapter = {
        findAll: vi.fn().mockResolvedValue([]),
        findById: vi.fn().mockResolvedValue({}),
      };

      wrapAdapterMethods(adapter, 'CustomAdapter', ['findAll', 'findById']);

      expect(typeof adapter.findAll).toBe('function');
      expect(typeof adapter.findById).toBe('function');
    });

    it('should preserve method functionality after wrapping', async () => {
      const adapter = {
        getById: vi.fn().mockResolvedValue({ id: '1', name: 'Test' }),
      };

      wrapAdapterMethods(adapter, 'TestAdapter', ['getById']);

      const result = await adapter.getById('1');

      expect(result).toEqual({ id: '1', name: 'Test' });
      expect(adapter.getById).toHaveProperty('name');
    });

    it('should skip non-function properties', () => {
      const adapter = {
        getAll: vi.fn().mockResolvedValue([]),
        config: { baseUrl: 'http://api.example.com' },
        metadata: 'test',
      };

      wrapAdapterMethods(adapter, 'TestAdapter', ['getAll', 'config', 'metadata'] as any);

      expect(typeof adapter.getAll).toBe('function');
      expect(adapter.config).toEqual({ baseUrl: 'http://api.example.com' });
      expect(adapter.metadata).toBe('test');
    });

    it('should handle adapter with missing methods', () => {
      const adapter = {
        getAll: vi.fn().mockResolvedValue([]),
      };

      expect(() => {
        wrapAdapterMethods(adapter, 'TestAdapter', ['getAll', 'getMissing'] as any);
      }).not.toThrow();

      expect(typeof adapter.getAll).toBe('function');
    });
  });
});

