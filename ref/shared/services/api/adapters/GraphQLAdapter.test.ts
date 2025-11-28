// ===================================================================
// Unit Tests for GraphQLAdapter - GraphQL Infrastructure
// Coverage Target: 95%+
// Phase 5 - Day 1: Adapter Testing (Pushing to 3,000!)
// ===================================================================

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { GraphQLAdapter } from './GraphQLAdapter';
import type { GraphQLDataSource } from '../types';

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

describe('GraphQLAdapter', () => {
  let adapter: GraphQLAdapter<TestEntity>;
  let dataSource: GraphQLDataSource;

  beforeEach(() => {
    dataSource = {
      type: 'graphql',
      config: {
        endpoint: 'https://api.example.com/graphql',
      },
    };
    adapter = new GraphQLAdapter<TestEntity>(dataSource, 'users');
    mockFetch.mockClear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('CRUD Operations', () => {
    describe('getAll', () => {
      it('should fetch all entities via GraphQL query', async () => {
        const mockData = {
          data: {
            users: [
              { id: '1', name: 'User 1', value: 100 },
              { id: '2', name: 'User 2', value: 200 },
            ],
          },
        };

        mockFetch.mockResolvedValueOnce({
          ok: true,
          json: async () => mockData,
        });

        const result = await adapter.getAll();

        expect(result).toEqual(mockData.data);
        expect(mockFetch).toHaveBeenCalledWith(
          'https://api.example.com/graphql',
          expect.objectContaining({
            method: 'POST',
            headers: expect.objectContaining({
              'Content-Type': 'application/json',
            }),
            body: expect.stringContaining('GetAllUsers'),
          }),
        );
      });

      it('should send correct query structure', async () => {
        mockFetch.mockResolvedValueOnce({
          ok: true,
          json: async () => ({ data: { users: [] } }),
        });

        await adapter.getAll();

        const callBody = JSON.parse(mockFetch.mock.calls[0][1].body);
        expect(callBody).toHaveProperty('query');
        expect(callBody.query).toContain('query GetAllUsers');
      });
    });

    describe('getById', () => {
      it('should fetch entity by ID via GraphQL query', async () => {
        const mockEntity = { id: '123', name: 'User 123', value: 999 };
        const mockData = {
          data: [mockEntity], // executeQuery returns data directly
        };

        mockFetch.mockResolvedValueOnce({
          ok: true,
          json: async () => mockData,
        });

        const result = await adapter.getById('123');

        expect(result).toEqual(mockEntity);
      });

      it('should return null when entity not found', async () => {
        const mockData = { data: [] }; // Empty array - no results

        mockFetch.mockResolvedValueOnce({
          ok: true,
          json: async () => mockData,
        });

        const result = await adapter.getById('non-existent');
        expect(result).toBeNull();
      });

      it('should send correct query with ID parameter', async () => {
        mockFetch.mockResolvedValueOnce({
          ok: true,
          json: async () => ({ data: { user: [] } }),
        });

        await adapter.getById('123');

        const callBody = JSON.parse(mockFetch.mock.calls[0][1].body);
        expect(callBody.query).toContain('GetUser');
        expect(callBody.query).toContain('$id: ID!');
      });
    });

    describe('create', () => {
      it('should create new entity via GraphQL mutation', async () => {
        const newEntity = { name: 'New User', value: 500 };
        const createdEntity = { id: 'new-id', ...newEntity };

        mockFetch.mockResolvedValueOnce({
          ok: true,
          json: async () => ({ data: createdEntity }),
        });

        const result = await adapter.create(newEntity);

        expect(result).toEqual(createdEntity);
      });

      it('should send correct mutation structure', async () => {
        mockFetch.mockResolvedValueOnce({
          ok: true,
          json: async () => ({ data: {} }),
        });

        await adapter.create({ name: 'Test', value: 1 });

        const callBody = JSON.parse(mockFetch.mock.calls[0][1].body);
        expect(callBody.query).toContain('mutation CreateUser');
        expect(callBody.query).toContain('UserInput!');
      });
    });

    describe('update', () => {
      it('should update entity via GraphQL mutation', async () => {
        const updates = { name: 'Updated User', value: 999 };
        const updatedEntity = { id: '123', ...updates };

        mockFetch.mockResolvedValueOnce({
          ok: true,
          json: async () => ({ data: updatedEntity }),
        });

        const result = await adapter.update('123', updates);

        expect(result).toEqual(updatedEntity);
      });

      it('should send correct mutation with ID', async () => {
        mockFetch.mockResolvedValueOnce({
          ok: true,
          json: async () => ({ data: {} }),
        });

        await adapter.update('123', { name: 'Updated' });

        const callBody = JSON.parse(mockFetch.mock.calls[0][1].body);
        expect(callBody.query).toContain('mutation UpdateUser');
        expect(callBody.query).toContain('$id: ID!');
      });
    });

    describe('delete', () => {
      it('should delete entity via GraphQL mutation', async () => {
        mockFetch.mockResolvedValueOnce({
          ok: true,
          json: async () => ({ data: { deleteUser: true } }),
        });

        await adapter.delete('123');

        expect(mockFetch).toHaveBeenCalledWith(
          'https://api.example.com/graphql',
          expect.objectContaining({
            method: 'POST',
          }),
        );
      });

      it('should send correct delete mutation', async () => {
        mockFetch.mockResolvedValueOnce({
          ok: true,
          json: async () => ({ data: {} }),
        });

        await adapter.delete('123');

        const callBody = JSON.parse(mockFetch.mock.calls[0][1].body);
        expect(callBody.query).toContain('mutation DeleteUser');
        expect(callBody.query).toContain('$id: ID!');
      });
    });
  });

  describe('Query Building', () => {
    it('should build getAll query correctly', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ data: { users: [] } }),
      });

      await adapter.getAll();

      const callBody = JSON.parse(mockFetch.mock.calls[0][1].body);
      expect(callBody.query).toContain('query GetAllUsers');
      expect(callBody.query).toContain('users');
      expect(callBody.query).toContain('id');
      expect(callBody.query).toContain('name');
    });

    it('should build getById query correctly', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ data: { user: [] } }),
      });

      await adapter.getById('123');

      const callBody = JSON.parse(mockFetch.mock.calls[0][1].body);
      expect(callBody.query).toContain('query GetUser');
      expect(callBody.query).toContain('user(id: $id)');
    });

    it('should capitalize entity name in queries', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ data: { users: [] } }),
      });

      await adapter.getAll();

      const callBody = JSON.parse(mockFetch.mock.calls[0][1].body);
      expect(callBody.query).toContain('GetAllUsers'); // Capitalized
    });

    it('should handle singular entity names', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ data: {} }),
      });

      await adapter.create({ name: 'Test' });

      const callBody = JSON.parse(mockFetch.mock.calls[0][1].body);
      expect(callBody.query).toContain('CreateUser'); // users -> user
    });
  });

  describe('Mutation Building', () => {
    it('should build create mutation correctly', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ data: {} }),
      });

      await adapter.create({ name: 'New' });

      const callBody = JSON.parse(mockFetch.mock.calls[0][1].body);
      expect(callBody.query).toContain('mutation CreateUser');
      expect(callBody.query).toContain('$input: UserInput!');
      expect(callBody.query).toContain('createUser(input: $input)');
    });

    it('should build update mutation correctly', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ data: {} }),
      });

      await adapter.update('123', { name: 'Updated' });

      const callBody = JSON.parse(mockFetch.mock.calls[0][1].body);
      expect(callBody.query).toContain('mutation UpdateUser');
      expect(callBody.query).toContain('$id: ID!');
      expect(callBody.query).toContain('$input: UserInput!');
    });

    it('should build delete mutation correctly', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ data: {} }),
      });

      await adapter.delete('123');

      const callBody = JSON.parse(mockFetch.mock.calls[0][1].body);
      expect(callBody.query).toContain('mutation DeleteUser');
      expect(callBody.query).toContain('deleteUser(id: $id)');
    });
  });

  describe('Error Handling', () => {
    it('should throw error when endpoint is missing', async () => {
      const badDataSource: GraphQLDataSource = {
        type: 'graphql',
        config: {},
      };
      const badAdapter = new GraphQLAdapter<TestEntity>(badDataSource, 'users');

      await expect(badAdapter.getAll()).rejects.toThrow('GraphQL endpoint is required');
    });

    it('should handle HTTP errors', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
      });

      await expect(adapter.getAll()).rejects.toThrow('GraphQL request failed: 500 Internal Server Error');
    });

    it('should handle GraphQL errors in response', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          errors: [{ message: 'Field not found' }],
        }),
      });

      await expect(adapter.getAll()).rejects.toThrow('GraphQL errors');
    });

    it('should handle network errors', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'));

      await expect(adapter.getAll()).rejects.toThrow('Network error');
    });

    it('should log errors', async () => {
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      mockFetch.mockRejectedValueOnce(new Error('Test error'));

      await expect(adapter.getAll()).rejects.toThrow();
      expect(consoleErrorSpy).toHaveBeenCalledWith('GraphQL execution error:', expect.any(Error));

      consoleErrorSpy.mockRestore();
    });
  });

  describe('Custom Headers', () => {
    it('should include custom headers', async () => {
      const dataSourceWithHeaders: GraphQLDataSource = {
        type: 'graphql',
        config: {
          endpoint: 'https://api.example.com/graphql',
          headers: {
            'Authorization': 'Bearer token123',
            'X-Custom-Header': 'value',
          },
        },
      };
      const adapterWithHeaders = new GraphQLAdapter<TestEntity>(dataSourceWithHeaders, 'users');

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ data: { users: [] } }),
      });

      await adapterWithHeaders.getAll();

      expect(mockFetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer token123',
            'X-Custom-Header': 'value',
          },
        }),
      );
    });

    it('should merge custom headers with default headers', async () => {
      const dataSourceWithHeaders: GraphQLDataSource = {
        type: 'graphql',
        config: {
          endpoint: 'https://api.example.com/graphql',
          headers: {
            'X-App-Version': '1.0.0',
          },
        },
      };
      const adapterWithHeaders = new GraphQLAdapter<TestEntity>(dataSourceWithHeaders, 'users');

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ data: { users: [] } }),
      });

      await adapterWithHeaders.getAll();

      const callHeaders = mockFetch.mock.calls[0][1].headers;
      expect(callHeaders).toMatchObject({
        'Content-Type': 'application/json',
        'X-App-Version': '1.0.0',
      });
    });
  });

  describe('Different Entity Names', () => {
    it('should handle different entity names correctly', async () => {
      const entities = ['products', 'orders', 'customers'];

      for (const entityName of entities) {
        const entityAdapter = new GraphQLAdapter<TestEntity>(dataSource, entityName);

        mockFetch.mockResolvedValueOnce({
          ok: true,
          json: async () => ({ data: { [entityName]: [] } }),
        });

        await entityAdapter.getAll();

        const callBody = JSON.parse(mockFetch.mock.calls[mockFetch.mock.calls.length - 1][1].body);
        const capitalizedName = entityName.charAt(0).toUpperCase() + entityName.slice(1);
        expect(callBody.query).toContain(`GetAll${capitalizedName}`);
      }
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty response data', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ data: null }),
      });

      const result = await adapter.getAll();
      expect(result).toBeNull();
    });

    it('should handle malformed JSON response', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => { throw new Error('Invalid JSON'); },
      });

      await expect(adapter.getAll()).rejects.toThrow('Invalid JSON');
    });

    it('should use POST method for all operations', async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => ({ data: {} }),
      });

      await adapter.getAll();
      await adapter.getById('1');
      await adapter.create({});
      await adapter.update('1', {});
      await adapter.delete('1');

      // All 5 calls should use POST
      expect(mockFetch).toHaveBeenCalledTimes(5);
      mockFetch.mock.calls.forEach(call => {
        expect(call[1].method).toBe('POST');
      });
    });
  });
});

