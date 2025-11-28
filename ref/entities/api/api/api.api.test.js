// ===================================================================
// Unit Tests for API Builder System
// CRITICAL BUSINESS LOGIC - Must have 95% coverage before TypeScript
// Week 1, Day 3 - API Data Aggregation Logic (40 tests)
// ===================================================================

import { describe, it, expect, beforeEach, vi } from 'vitest';

// Mock data imports
vi.mock('./api.data', () => ({
  apis: [],
  connectors: [],
  connectorHeaders: [],
  connectorParameters: [],
  apiCalls: [],
  callHeaders: [],
  callParameters: [],
}));

vi.mock('./api.data/categories', () => ({
  apiCategories: [],
}));

// Import after mocks
import { apiApi } from './api.api';
import * as apiData from './api.data';
import * as categories from './api.data/categories';

describe('API Builder System - CRITICAL BUSINESS LOGIC', () => {
  let mockApis;
  let mockConnectors;
  let mockConnectorHeaders;
  let mockConnectorParameters;
  let mockApiCalls;
  let mockCallHeaders;
  let mockCallParameters;
  let mockApiCategories;

  beforeEach(() => {
    vi.clearAllMocks();

    // Setup default mock data
    mockApiCategories = [
      { id: 'cat-1', name: 'REST APIs', type: 'rest' },
      { id: 'cat-2', name: 'GraphQL APIs', type: 'graphql' },
    ];

    mockApis = [
      { id: 'api-1', name: 'Users API', categoryId: 'cat-1', connectorId: 'conn-1' },
      { id: 'api-2', name: 'Products API', categoryId: 'cat-2', connectorId: 'conn-2' },
    ];

    mockConnectors = [
      {
        id: 'conn-1',
        name: 'Users Connector',
        authentication: 'bearer',
        keyName: 'Authorization',
        keyValue: 'token123',
        headersIds: ['header-1', 'header-2'],
        parametersIds: ['param-1'],
        callsIds: ['call-1'],
      },
      {
        id: 'conn-2',
        name: 'Products Connector',
        authentication: 'apikey',
        keyName: 'X-API-Key',
        keyValue: 'key456',
        headersIds: [],
        parametersIds: [],
        callsIds: [],
      },
    ];

    mockConnectorHeaders = [
      { id: 'header-1', key: 'Content-Type', value: 'application/json' },
      { id: 'header-2', key: 'Accept', value: 'application/json' },
    ];

    mockConnectorParameters = [
      { id: 'param-1', key: 'version', value: 'v1' },
    ];

    mockApiCalls = [
      {
        id: 'call-1',
        name: 'Get Users',
        useAs: 'query',
        dataType: 'array',
        requestType: 'GET',
        value: '/users',
        headersIds: ['call-header-1'],
        parametersIds: ['call-param-1'],
      },
    ];

    mockCallHeaders = [
      { id: 'call-header-1', key: 'Cache-Control', value: 'no-cache' },
    ];

    mockCallParameters = [
      { id: 'call-param-1', key: 'limit', value: '10' },
    ];

    // Apply mocks
    apiData.apis = mockApis;
    apiData.connectors = mockConnectors;
    apiData.connectorHeaders = mockConnectorHeaders;
    apiData.connectorParameters = mockConnectorParameters;
    apiData.apiCalls = mockApiCalls;
    apiData.callHeaders = mockCallHeaders;
    apiData.callParameters = mockCallParameters;
    categories.apiCategories = mockApiCategories;
  });

  // ===================================================================
  // PART 1: Basic API Structure (10 tests)
  // ===================================================================

  describe('buildFullApisData - Basic Structure', () => {
    it('should return array of APIs', async () => {
      const result = await apiApi.getApis();
      expect(Array.isArray(result.apis)).toBe(true);
    });

    it('should return correct number of APIs', async () => {
      const result = await apiApi.getApis();
      expect(result.apis).toHaveLength(2);
    });

    it('should include API id and name', async () => {
      const result = await apiApi.getApis();
      expect(result.apis[0]).toHaveProperty('id', 'api-1');
      expect(result.apis[0]).toHaveProperty('name', 'Users API');
    });

    it('should include categoryId', async () => {
      const result = await apiApi.getApis();
      expect(result.apis[0]).toHaveProperty('categoryId', 'cat-1');
    });

    it('should include type from category', async () => {
      const result = await apiApi.getApis();
      expect(result.apis[0]).toHaveProperty('type', 'rest');
      expect(result.apis[1]).toHaveProperty('type', 'graphql');
    });

    it('should include connector object', async () => {
      const result = await apiApi.getApis();
      expect(result.apis[0]).toHaveProperty('connector');
      expect(typeof result.apis[0].connector).toBe('object');
    });

    it('should return categories', async () => {
      const result = await apiApi.getApis();
      expect(result).toHaveProperty('categories');
      expect(result.categories).toEqual(mockApiCategories);
    });

    it('should handle empty apis array', async () => {
      apiData.apis = [];
      const result = await apiApi.getApis();
      expect(result.apis).toEqual([]);
    });

    it('should be async', async () => {
      const promise = apiApi.getApis();
      expect(promise).toBeInstanceOf(Promise);
      await promise;
    });

    it('should have delay simulation', async () => {
      const start = Date.now();
      await apiApi.getApis();
      const duration = Date.now() - start;
      expect(duration).toBeGreaterThanOrEqual(200); // ~300ms delay
    });
  });

  // ===================================================================
  // PART 2: Category Lookup (5 tests)
  // ===================================================================

  describe('buildFullApisData - Category Lookup', () => {
    it('should find category by categoryId', async () => {
      const result = await apiApi.getApis();
      expect(result.apis[0].type).toBe('rest');
    });

    it('should handle missing category', async () => {
      apiData.apis = [
        { id: 'api-1', name: 'API', categoryId: 'non-existent', connectorId: 'conn-1' },
      ];
      const result = await apiApi.getApis();
      expect(result.apis[0].type).toBeUndefined();
    });

    it('should handle null categoryId', async () => {
      apiData.apis = [
        { id: 'api-1', name: 'API', categoryId: null, connectorId: 'conn-1' },
      ];
      const result = await apiApi.getApis();
      expect(result.apis[0].type).toBeUndefined();
    });

    it('should handle undefined categoryId', async () => {
      apiData.apis = [
        { id: 'api-1', name: 'API', connectorId: 'conn-1' },
      ];
      const result = await apiApi.getApis();
      expect(result.apis[0].type).toBeUndefined();
    });

    it('should map multiple APIs to correct categories', async () => {
      const result = await apiApi.getApis();
      expect(result.apis[0].categoryId).toBe('cat-1');
      expect(result.apis[0].type).toBe('rest');
      expect(result.apis[1].categoryId).toBe('cat-2');
      expect(result.apis[1].type).toBe('graphql');
    });
  });

  // ===================================================================
  // PART 3: Connector Handling (8 tests)
  // ===================================================================

  describe('buildFullApisData - Connector Handling', () => {
    it('should find connector by connectorId', async () => {
      const result = await apiApi.getApis();
      expect(result.apis[0].connector.id).toBe('conn-1');
      expect(result.apis[0].connector.name).toBe('Users Connector');
    });

    it('should return empty connector if not found', async () => {
      apiData.apis = [
        { id: 'api-1', name: 'API', categoryId: 'cat-1', connectorId: 'non-existent' },
      ];
      const result = await apiApi.getApis();
      expect(result.apis[0].connector).toEqual({});
    });

    it('should include connector authentication', async () => {
      const result = await apiApi.getApis();
      expect(result.apis[0].connector.authentication).toBe('bearer');
    });

    it('should include connector keyName and keyValue', async () => {
      const result = await apiApi.getApis();
      expect(result.apis[0].connector.keyName).toBe('Authorization');
      expect(result.apis[0].connector.keyValue).toBe('token123');
    });

    it('should return minimal structure without connector data', async () => {
      apiData.apis = [
        { id: 'api-1', name: 'API', categoryId: 'cat-1', connectorId: 'missing' },
      ];
      const result = await apiApi.getApis();
      expect(result.apis[0]).toEqual({
        id: 'api-1',
        name: 'API',
        categoryId: 'cat-1',
        type: 'rest',
        connector: {},
      });
    });

    it('should handle null connectorId', async () => {
      apiData.apis = [
        { id: 'api-1', name: 'API', categoryId: 'cat-1', connectorId: null },
      ];
      const result = await apiApi.getApis();
      expect(result.apis[0].connector).toEqual({});
    });

    it('should handle undefined connectorId', async () => {
      apiData.apis = [
        { id: 'api-1', name: 'API', categoryId: 'cat-1' },
      ];
      const result = await apiApi.getApis();
      expect(result.apis[0].connector).toEqual({});
    });

    it('should include type even when connector is missing', async () => {
      apiData.apis = [
        { id: 'api-1', name: 'API', categoryId: 'cat-1', connectorId: 'missing' },
      ];
      const result = await apiApi.getApis();
      expect(result.apis[0].type).toBe('rest');
    });
  });

  // ===================================================================
  // PART 4: Headers Aggregation (6 tests)
  // ===================================================================

  describe('buildFullApisData - Headers Aggregation', () => {
    it('should aggregate connector headers', async () => {
      const result = await apiApi.getApis();
      expect(result.apis[0].connector.headers).toHaveLength(2);
    });

    it('should include header id, key, value', async () => {
      const result = await apiApi.getApis();
      const header = result.apis[0].connector.headers[0];
      expect(header).toEqual({
        id: 'header-1',
        key: 'Content-Type',
        value: 'application/json',
      });
    });

    it('should filter out missing headers', async () => {
      apiData.connectors[0].headersIds = ['header-1', 'missing-header', 'header-2'];
      const result = await apiApi.getApis();
      expect(result.apis[0].connector.headers).toHaveLength(2);
    });

    it('should handle empty headersIds', async () => {
      apiData.connectors[0].headersIds = [];
      const result = await apiApi.getApis();
      expect(result.apis[0].connector.headers).toEqual([]);
    });

    it('should handle null headersIds', async () => {
      apiData.connectors[0].headersIds = null;
      const result = await apiApi.getApis();
      expect(result.apis[0].connector.headers).toEqual([]);
    });

    it('should handle undefined headersIds', async () => {
      delete apiData.connectors[0].headersIds;
      const result = await apiApi.getApis();
      expect(result.apis[0].connector.headers).toEqual([]);
    });
  });

  // ===================================================================
  // PART 5: Parameters Aggregation (6 tests)
  // ===================================================================

  describe('buildFullApisData - Parameters Aggregation', () => {
    it('should aggregate connector parameters', async () => {
      const result = await apiApi.getApis();
      expect(result.apis[0].connector.parameters).toHaveLength(1);
    });

    it('should include parameter id, key, value', async () => {
      const result = await apiApi.getApis();
      const param = result.apis[0].connector.parameters[0];
      expect(param).toEqual({
        id: 'param-1',
        key: 'version',
        value: 'v1',
      });
    });

    it('should filter out missing parameters', async () => {
      apiData.connectors[0].parametersIds = ['param-1', 'missing-param'];
      const result = await apiApi.getApis();
      expect(result.apis[0].connector.parameters).toHaveLength(1);
    });

    it('should handle empty parametersIds', async () => {
      apiData.connectors[0].parametersIds = [];
      const result = await apiApi.getApis();
      expect(result.apis[0].connector.parameters).toEqual([]);
    });

    it('should handle null parametersIds', async () => {
      apiData.connectors[0].parametersIds = null;
      const result = await apiApi.getApis();
      expect(result.apis[0].connector.parameters).toEqual([]);
    });

    it('should handle undefined parametersIds', async () => {
      delete apiData.connectors[0].parametersIds;
      const result = await apiApi.getApis();
      expect(result.apis[0].connector.parameters).toEqual([]);
    });
  });

  // ===================================================================
  // PART 6: Calls Aggregation (5 tests)
  // ===================================================================

  describe('buildFullApisData - Calls Aggregation', () => {
    it('should aggregate connector calls', async () => {
      const result = await apiApi.getApis();
      expect(result.apis[0].connector.calls).toHaveLength(1);
    });

    it('should include call properties', async () => {
      const result = await apiApi.getApis();
      const call = result.apis[0].connector.calls[0];
      expect(call).toMatchObject({
        id: 'call-1',
        name: 'Get Users',
        useAs: 'query',
        dataType: 'array',
        requestType: 'GET',
        value: '/users',
      });
    });

    it('should include call headers', async () => {
      const result = await apiApi.getApis();
      const call = result.apis[0].connector.calls[0];
      expect(call.headers).toHaveLength(1);
      expect(call.headers[0]).toEqual({
        id: 'call-header-1',
        key: 'Cache-Control',
        value: 'no-cache',
      });
    });

    it('should include call parameters', async () => {
      const result = await apiApi.getApis();
      const call = result.apis[0].connector.calls[0];
      expect(call.parameters).toHaveLength(1);
      expect(call.parameters[0]).toEqual({
        id: 'call-param-1',
        key: 'limit',
        value: '10',
      });
    });

    it('should filter out missing calls', async () => {
      apiData.connectors[0].callsIds = ['call-1', 'missing-call'];
      const result = await apiApi.getApis();
      expect(result.apis[0].connector.calls).toHaveLength(1);
    });
  });
});

