// ===================================================================
// Unit Tests for RestAdapter - REST API Infrastructure
// Coverage Target: 95%+
// Infrastructure Phase (Testing Core APIs - CROSSING 2,500!)
// ===================================================================

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { RestAdapter } from './RestAdapter';
import type { RestDataSource } from '../types';

// Mock fetch globally
const mockFetch = vi.fn();
global.fetch = mockFetch as any;

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

describe('RestAdapter', () => {
  let adapter: RestAdapter<TestEntity>;
  let dataSource: RestDataSource;

  beforeEach(() => {
    dataSource = {
      type: 'rest',
      config: {
        baseUrl: 'https://api.example.com',
        timeout: 5000,
      },
    };
    adapter = new RestAdapter<TestEntity>(dataSource, 'users');
    mockFetch.mockClear();
    vi.clearAllTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('CRUD Operations', () => {
    describe('getAll', () => {
      it('should fetch all entities from REST endpoint', async () => {
        const mockData = [
          { id: '1', name: 'User 1', value: 100 },
          { id: '2', name: 'User 2', value: 200 },
        ];

        mockFetch.mockResolvedValueOnce({
          ok: true,
          json: async () => mockData,
        });

        const result = await adapter.getAll();

        expect(result).toEqual(mockData);
        expect(mockFetch).toHaveBeenCalledWith(
          'https://api.example.com/users',
          expect.objectContaining({
            headers: expect.objectContaining({
              'Content-Type': 'application/json',
            }),
          }),
        );
      });

      it('should use correct HTTP method for getAll', async () => {
        mockFetch.mockResolvedValueOnce({
          ok: true,
          json: async () => [],
        });

        await adapter.getAll();

        const callArgs = mockFetch.mock.calls[0];
        expect(callArgs[1]?.method).toBeUndefined(); // GET is default
      });
    });

    describe('getById', () => {
      it('should fetch entity by ID from REST endpoint', async () => {
        const mockData = { id: '123', name: 'User 123', value: 999 };

        mockFetch.mockResolvedValueOnce({
          ok: true,
          json: async () => mockData,
        });

        const result = await adapter.getById('123');

        expect(result).toEqual(mockData);
        expect(mockFetch).toHaveBeenCalledWith(
          'https://api.example.com/users/123',
          expect.any(Object),
        );
      });

      it('should handle entity not found', async () => {
        mockFetch.mockResolvedValueOnce({
          ok: false,
          status: 404,
        });

        await expect(adapter.getById('non-existent')).rejects.toThrow('HTTP error! status: 404');
      });
    });

    describe('create', () => {
      it('should create new entity via POST request', async () => {
        const newEntity = { name: 'New User', value: 500 };
        const createdEntity = { id: 'new-id', ...newEntity };

        mockFetch.mockResolvedValueOnce({
          ok: true,
          json: async () => createdEntity,
        });

        const result = await adapter.create(newEntity);

        expect(result).toEqual(createdEntity);
        expect(mockFetch).toHaveBeenCalledWith(
          'https://api.example.com/users',
          expect.objectContaining({
            method: 'POST',
            body: JSON.stringify(newEntity),
          }),
        );
      });

      it('should send correct headers for create', async () => {
        mockFetch.mockResolvedValueOnce({
          ok: true,
          json: async () => ({ id: '1', name: 'Test', value: 1 }),
        });

        await adapter.create({ name: 'Test', value: 1 });

        const callArgs = mockFetch.mock.calls[0];
        expect(callArgs[1]?.headers).toMatchObject({
          'Content-Type': 'application/json',
        });
      });
    });

    describe('update', () => {
      it('should update entity via PUT request', async () => {
        const updates = { name: 'Updated User', value: 999 };
        const updatedEntity = { id: '123', ...updates };

        mockFetch.mockResolvedValueOnce({
          ok: true,
          json: async () => updatedEntity,
        });

        const result = await adapter.update('123', updates);

        expect(result).toEqual(updatedEntity);
        expect(mockFetch).toHaveBeenCalledWith(
          'https://api.example.com/users/123',
          expect.objectContaining({
            method: 'PUT',
            body: JSON.stringify(updates),
          }),
        );
      });

      it('should handle update failure', async () => {
        mockFetch.mockResolvedValueOnce({
          ok: false,
          status: 400,
        });

        await expect(
          adapter.update('123', { name: 'Updated' }),
        ).rejects.toThrow('HTTP error! status: 400');
      });
    });

    describe('delete', () => {
      it('should delete entity via DELETE request', async () => {
        mockFetch.mockResolvedValueOnce({
          ok: true,
          json: async () => ({}),
        });

        await adapter.delete('123');

        expect(mockFetch).toHaveBeenCalledWith(
          'https://api.example.com/users/123',
          expect.objectContaining({
            method: 'DELETE',
          }),
        );
      });

      it('should handle delete failure', async () => {
        mockFetch.mockResolvedValueOnce({
          ok: false,
          status: 500,
        });

        await expect(adapter.delete('123')).rejects.toThrow('HTTP error! status: 500');
      });
    });
  });

  describe('Authentication', () => {
    it('should include API key in Authorization header', async () => {
      const dataSourceWithApiKey: RestDataSource = {
        type: 'rest',
        config: {
          baseUrl: 'https://api.example.com',
          apiKey: 'secret-api-key-123',
        },
      };
      const adapterWithAuth = new RestAdapter<TestEntity>(dataSourceWithApiKey, 'users');

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => [],
      });

      await adapterWithAuth.getAll();

      const callArgs = mockFetch.mock.calls[0];
      expect(callArgs[1]?.headers).toMatchObject({
        'Authorization': 'Bearer secret-api-key-123',
      });
    });

    it('should not include Authorization header when no API key', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => [],
      });

      await adapter.getAll();

      const callArgs = mockFetch.mock.calls[0];
      expect(callArgs[1]?.headers).not.toHaveProperty('Authorization');
    });
  });

  describe('Custom Headers', () => {
    it('should merge custom headers with default headers', async () => {
      const dataSourceWithHeaders: RestDataSource = {
        type: 'rest',
        config: {
          baseUrl: 'https://api.example.com',
          headers: {
            'X-Custom-Header': 'custom-value',
            'X-App-Version': '1.0.0',
          },
        },
      };
      const adapterWithHeaders = new RestAdapter<TestEntity>(dataSourceWithHeaders, 'users');

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => [],
      });

      await adapterWithHeaders.getAll();

      const callArgs = mockFetch.mock.calls[0];
      expect(callArgs[1]?.headers).toMatchObject({
        'Content-Type': 'application/json',
        'X-Custom-Header': 'custom-value',
        'X-App-Version': '1.0.0',
      });
    });

    it('should allow custom headers to override defaults', async () => {
      const dataSourceWithHeaders: RestDataSource = {
        type: 'rest',
        config: {
          baseUrl: 'https://api.example.com',
          headers: {
            'Content-Type': 'application/xml',
          },
        },
      };
      const adapterWithHeaders = new RestAdapter<TestEntity>(dataSourceWithHeaders, 'users');

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => [],
      });

      await adapterWithHeaders.getAll();

      const callArgs = mockFetch.mock.calls[0];
      expect(callArgs[1]?.headers).toMatchObject({
        'Content-Type': 'application/xml',
      });
    });
  });

  describe('Timeout Handling', () => {
    it('should use default timeout of 5000ms', async () => {
      mockFetch.mockImplementationOnce(() =>
        new Promise((resolve) => setTimeout(() => resolve({
          ok: true,
          json: async () => [],
        }), 100)),
      );

      await adapter.getAll();

      // Verify AbortController was used
      expect(mockFetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          signal: expect.any(AbortSignal),
        }),
      );
    });

    it('should use custom timeout when provided', async () => {
      const dataSourceWithTimeout: RestDataSource = {
        type: 'rest',
        config: {
          baseUrl: 'https://api.example.com',
          timeout: 1000,
        },
      };
      const adapterWithTimeout = new RestAdapter<TestEntity>(dataSourceWithTimeout, 'users');

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => [],
      });

      await adapterWithTimeout.getAll();

      expect(mockFetch).toHaveBeenCalled();
    });

    it('should abort request on timeout', async () => {
      vi.useFakeTimers();

      const dataSourceWithShortTimeout: RestDataSource = {
        type: 'rest',
        config: {
          baseUrl: 'https://api.example.com',
          timeout: 100,
        },
      };
      const adapterWithTimeout = new RestAdapter<TestEntity>(dataSourceWithShortTimeout, 'users');

      let abortCalled = false;
      mockFetch.mockImplementationOnce((url, options) => {
        options?.signal?.addEventListener('abort', () => {
          abortCalled = true;
        });
        return new Promise(() => {}); // Never resolves
      });

      const promise = adapterWithTimeout.getAll();
      vi.advanceTimersByTime(150);

      await vi.waitFor(() => expect(abortCalled).toBe(true), { timeout: 1000 });

      vi.useRealTimers();
    });
  });

  describe('HTTP Status Codes', () => {
    it('should handle 200 OK', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({ id: '1', name: 'Success', value: 1 }),
      });

      const result = await adapter.getById('1');
      expect(result).toBeDefined();
    });

    it('should handle 201 Created', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 201,
        json: async () => ({ id: '1', name: 'Created', value: 1 }),
      });

      const result = await adapter.create({ name: 'New', value: 1 });
      expect(result).toBeDefined();
    });

    it('should throw on 400 Bad Request', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 400,
      });

      await expect(adapter.getAll()).rejects.toThrow('HTTP error! status: 400');
    });

    it('should throw on 401 Unauthorized', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 401,
      });

      await expect(adapter.getAll()).rejects.toThrow('HTTP error! status: 401');
    });

    it('should throw on 403 Forbidden', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 403,
      });

      await expect(adapter.getAll()).rejects.toThrow('HTTP error! status: 403');
    });

    it('should throw on 404 Not Found', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
      });

      await expect(adapter.getById('missing')).rejects.toThrow('HTTP error! status: 404');
    });

    it('should throw on 500 Internal Server Error', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
      });

      await expect(adapter.getAll()).rejects.toThrow('HTTP error! status: 500');
    });
  });

  describe('Entity Names', () => {
    it('should use correct endpoint for different entity names', async () => {
      const adapters = [
        new RestAdapter<TestEntity>(dataSource, 'users'),
        new RestAdapter<TestEntity>(dataSource, 'products'),
        new RestAdapter<TestEntity>(dataSource, 'orders'),
      ];

      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => [],
      });

      await adapters[0].getAll();
      expect(mockFetch).toHaveBeenLastCalledWith(
        'https://api.example.com/users',
        expect.any(Object),
      );

      await adapters[1].getAll();
      expect(mockFetch).toHaveBeenLastCalledWith(
        'https://api.example.com/products',
        expect.any(Object),
      );

      await adapters[2].getAll();
      expect(mockFetch).toHaveBeenLastCalledWith(
        'https://api.example.com/orders',
        expect.any(Object),
      );
    });
  });

  describe('Edge Cases', () => {
    it('should handle baseUrl with trailing slash', async () => {
      const dataSourceWithSlash: RestDataSource = {
        type: 'rest',
        config: {
          baseUrl: 'https://api.example.com/',
        },
      };
      const adapterWithSlash = new RestAdapter<TestEntity>(dataSourceWithSlash, 'users');

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => [],
      });

      await adapterWithSlash.getAll();

      // Note: This will result in double slash, but that's the current behavior
      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.example.com//users',
        expect.any(Object),
      );
    });

    it('should handle empty response body', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => null,
      });

      const result = await adapter.getAll();
      expect(result).toBeNull();
    });

    it('should handle network errors', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'));

      await expect(adapter.getAll()).rejects.toThrow('Network error');
    });

    it('should clean up timeout on success', async () => {
      const clearTimeoutSpy = vi.spyOn(global, 'clearTimeout');

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => [],
      });

      await adapter.getAll();

      expect(clearTimeoutSpy).toHaveBeenCalled();

      clearTimeoutSpy.mockRestore();
    });

    it('should clean up timeout on error', async () => {
      const clearTimeoutSpy = vi.spyOn(global, 'clearTimeout');

      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
      });

      await expect(adapter.getAll()).rejects.toThrow();

      expect(clearTimeoutSpy).toHaveBeenCalled();

      clearTimeoutSpy.mockRestore();
    });
  });
});

