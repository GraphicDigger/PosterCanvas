// ===================================================================
// Unit Tests for API Mutation Actions
// CRITICAL BUSINESS LOGIC - Must have 95% coverage before TypeScript
// Week 1, Day 4 - API State Mutations (40 tests)
// ===================================================================

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { actionsApiEditor, initialApiEditor } from './actions';

// Mock uuid
vi.mock('uuid', () => ({
  v4: vi.fn(() => 'mock-uuid-' + Date.now() + '-' + Math.random()),
}));

import { v4 as uuidv4 } from 'uuid';

describe('API Mutation Actions - CRITICAL BUSINESS LOGIC', () => {
  let state;

  beforeEach(() => {
    vi.clearAllMocks();
    // Reset state before each test
    state = {
      entities: {},
      ids: [],
      categories: [],
    };

    // Setup predictable UUID mocking
    let counter = 0;
    vi.mocked(uuidv4).mockImplementation(() => `mock-uuid-${++counter}`);
  });

  // ===================================================================
  // PART 1: setApis & Initial State (5 tests)
  // ===================================================================

  describe('setApis & initialApiEditor', () => {
    it('should have correct initial state', () => {
      expect(initialApiEditor).toEqual({
        entities: {},
        ids: [],
        categories: [],
      });
    });

    it('should set APIs from payload', () => {
      const apis = [
        { id: 'api-1', name: 'Users API', connector: { id: 'conn-1' } },
        { id: 'api-2', name: 'Products API', connector: { id: 'conn-2' } },
      ];
      const categories = [{ id: 'cat-1', name: 'REST' }];

      actionsApiEditor.setApis(state, { payload: { apis, categories } });

      expect(state.entities['api-1']).toEqual(apis[0]);
      expect(state.entities['api-2']).toEqual(apis[1]);
      expect(state.ids).toEqual(['api-1', 'api-2']);
      expect(state.categories).toEqual(categories);
    });

    it('should add empty connector if missing', () => {
      const apis = [{ id: 'api-1', name: 'API' }];

      actionsApiEditor.setApis(state, { payload: { apis, categories: [] } });

      expect(state.entities['api-1'].connector).toEqual({});
    });

    it('should handle empty APIs array', () => {
      actionsApiEditor.setApis(state, { payload: { apis: [], categories: [] } });

      expect(state.entities).toEqual({});
      expect(state.ids).toEqual([]);
    });

    it('should handle missing categories', () => {
      const apis = [{ id: 'api-1', name: 'API', connector: {} }];

      actionsApiEditor.setApis(state, { payload: { apis } });

      expect(state.categories).toEqual([]);
    });
  });

  // ===================================================================
  // PART 2: addApi & removeApi (5 tests)
  // ===================================================================

  describe('addApi & removeApi', () => {
    it('should add new API with default structure', () => {
      actionsApiEditor.addApi(state, { payload: { name: 'New API', categoryId: 'cat-1' } });

      const apiId = state.ids[0];
      expect(state.entities[apiId]).toMatchObject({
        id: apiId,
        name: 'New API',
        categoryId: 'cat-1',
      });
      expect(state.entities[apiId].connector).toBeDefined();
    });

    it('should use default values when not provided', () => {
      actionsApiEditor.addApi(state, { payload: {} });

      const apiId = state.ids[0];
      expect(state.entities[apiId].name).toBe('New API');
      expect(state.entities[apiId].categoryId).toBe('custom-api-category');
    });

    it('should create connector with default structure', () => {
      actionsApiEditor.addApi(state, { payload: { name: 'API' } });

      const apiId = state.ids[0];
      expect(state.entities[apiId].connector).toMatchObject({
        id: expect.any(String),
        name: '',
        authentication: 'none',
        keyName: '',
        keyValue: '',
        headers: [],
        parameters: [],
        calls: [],
      });
    });

    it('should remove API by ID', () => {
      state.entities = { 'api-1': { id: 'api-1', name: 'API' } };
      state.ids = ['api-1'];

      actionsApiEditor.removeApi(state, { payload: { apiId: 'api-1' } });

      expect(state.entities['api-1']).toBeUndefined();
      expect(state.ids).toEqual([]);
    });

    it('should handle removing non-existent API', () => {
      state.entities = { 'api-1': { id: 'api-1', name: 'API' } };
      state.ids = ['api-1'];

      actionsApiEditor.removeApi(state, { payload: { apiId: 'non-existent' } });

      expect(state.entities['api-1']).toBeDefined();
      expect(state.ids).toEqual(['api-1']);
    });
  });

  // ===================================================================
  // PART 3: Update API Properties (5 tests)
  // ===================================================================

  describe('Update API Properties', () => {
    beforeEach(() => {
      state.entities = {
        'api-1': {
          id: 'api-1',
          name: 'Original Name',
          connector: {
            authentication: 'none',
            keyName: '',
            keyValue: '',
          },
        },
      };
    });

    it('should update API name', () => {
      actionsApiEditor.updateApiName(state, { payload: { apiId: 'api-1', name: 'Updated Name' } });
      expect(state.entities['api-1'].name).toBe('Updated Name');
    });

    it('should update API authentication', () => {
      actionsApiEditor.updateApiAuthentication(state, { payload: { apiId: 'api-1', authentication: 'bearer' } });
      expect(state.entities['api-1'].connector.authentication).toBe('bearer');
    });

    it('should update API keyName', () => {
      actionsApiEditor.updateApiKeyName(state, { payload: { apiId: 'api-1', keyName: 'Authorization' } });
      expect(state.entities['api-1'].connector.keyName).toBe('Authorization');
    });

    it('should update API keyValue', () => {
      actionsApiEditor.updateApiKeyValue(state, { payload: { apiId: 'api-1', keyValue: 'token123' } });
      expect(state.entities['api-1'].connector.keyValue).toBe('token123');
    });

    it('should handle updating non-existent API', () => {
      actionsApiEditor.updateApiName(state, { payload: { apiId: 'non-existent', name: 'Name' } });
      expect(state.entities['non-existent']).toBeUndefined();
    });
  });

  // ===================================================================
  // PART 4: Header CRUD Operations (5 tests)
  // ===================================================================

  describe('Header CRUD Operations', () => {
    beforeEach(() => {
      state.entities = {
        'api-1': {
          id: 'api-1',
          connector: {
            headers: [],
          },
        },
      };
    });

    it('should add header to API', () => {
      actionsApiEditor.addApiHeader(state, { payload: { apiId: 'api-1' } });

      expect(state.entities['api-1'].connector.headers).toHaveLength(1);
      expect(state.entities['api-1'].connector.headers[0]).toMatchObject({
        id: expect.any(String),
        key: '',
        value: '',
      });
    });

    it('should update header field', () => {
      state.entities['api-1'].connector.headers = [
        { id: 'header-1', key: '', value: '' },
      ];

      actionsApiEditor.updateApiHeader(state, {
        payload: { apiId: 'api-1', headerId: 'header-1', field: 'key', value: 'Content-Type' },
      });

      expect(state.entities['api-1'].connector.headers[0].key).toBe('Content-Type');
    });

    it('should update header value', () => {
      state.entities['api-1'].connector.headers = [
        { id: 'header-1', key: 'Content-Type', value: '' },
      ];

      actionsApiEditor.updateApiHeader(state, {
        payload: { apiId: 'api-1', headerId: 'header-1', field: 'value', value: 'application/json' },
      });

      expect(state.entities['api-1'].connector.headers[0].value).toBe('application/json');
    });

    it('should remove header from API', () => {
      state.entities['api-1'].connector.headers = [
        { id: 'header-1', key: 'Content-Type', value: 'application/json' },
        { id: 'header-2', key: 'Accept', value: 'application/json' },
      ];

      actionsApiEditor.removeApiHeader(state, { payload: { apiId: 'api-1', headerId: 'header-1' } });

      expect(state.entities['api-1'].connector.headers).toHaveLength(1);
      expect(state.entities['api-1'].connector.headers[0].id).toBe('header-2');
    });

    it('should handle updating non-existent header', () => {
      state.entities['api-1'].connector.headers = [{ id: 'header-1', key: '', value: '' }];

      actionsApiEditor.updateApiHeader(state, {
        payload: { apiId: 'api-1', headerId: 'non-existent', field: 'key', value: 'Test' },
      });

      expect(state.entities['api-1'].connector.headers[0].key).toBe('');
    });
  });

  // ===================================================================
  // PART 5: Parameter CRUD Operations (5 tests)
  // ===================================================================

  describe('Parameter CRUD Operations', () => {
    beforeEach(() => {
      state.entities = {
        'api-1': {
          id: 'api-1',
          connector: {
            parameters: [],
          },
        },
      };
    });

    it('should add parameter to API', () => {
      actionsApiEditor.addApiParameter(state, { payload: { apiId: 'api-1' } });

      expect(state.entities['api-1'].connector.parameters).toHaveLength(1);
      expect(state.entities['api-1'].connector.parameters[0]).toMatchObject({
        id: expect.any(String),
        key: '',
        value: '',
      });
    });

    it('should update parameter field', () => {
      state.entities['api-1'].connector.parameters = [
        { id: 'param-1', key: '', value: '' },
      ];

      actionsApiEditor.updateApiParameter(state, {
        payload: { apiId: 'api-1', parameterId: 'param-1', field: 'key', value: 'version' },
      });

      expect(state.entities['api-1'].connector.parameters[0].key).toBe('version');
    });

    it('should update parameter value', () => {
      state.entities['api-1'].connector.parameters = [
        { id: 'param-1', key: 'version', value: '' },
      ];

      actionsApiEditor.updateApiParameter(state, {
        payload: { apiId: 'api-1', parameterId: 'param-1', field: 'value', value: 'v1' },
      });

      expect(state.entities['api-1'].connector.parameters[0].value).toBe('v1');
    });

    it('should remove parameter from API', () => {
      state.entities['api-1'].connector.parameters = [
        { id: 'param-1', key: 'version', value: 'v1' },
        { id: 'param-2', key: 'limit', value: '10' },
      ];

      actionsApiEditor.removeApiParameter(state, { payload: { apiId: 'api-1', parameterId: 'param-1' } });

      expect(state.entities['api-1'].connector.parameters).toHaveLength(1);
      expect(state.entities['api-1'].connector.parameters[0].id).toBe('param-2');
    });

    it('should handle updating non-existent parameter', () => {
      state.entities['api-1'].connector.parameters = [{ id: 'param-1', key: '', value: '' }];

      actionsApiEditor.updateApiParameter(state, {
        payload: { apiId: 'api-1', parameterId: 'non-existent', field: 'key', value: 'Test' },
      });

      expect(state.entities['api-1'].connector.parameters[0].key).toBe('');
    });
  });

  // ===================================================================
  // PART 6: Call CRUD Operations (5 tests)
  // ===================================================================

  describe('Call CRUD Operations', () => {
    beforeEach(() => {
      state.entities = {
        'api-1': {
          id: 'api-1',
          connector: {
            calls: [],
          },
        },
      };
    });

    it('should add call to API', () => {
      actionsApiEditor.addCall(state, { payload: { apiId: 'api-1' } });

      expect(state.entities['api-1'].connector.calls).toHaveLength(1);
      expect(state.entities['api-1'].connector.calls[0]).toMatchObject({
        id: expect.any(String),
        name: 'New Call',
        useAs: '',
        dataType: '',
        requestType: '',
        value: '',
        headers: [{ key: '', value: '' }],
        parameters: [{ key: '', value: '' }],
      });
    });

    it('should initialize calls array if missing', () => {
      delete state.entities['api-1'].connector.calls;

      actionsApiEditor.addCall(state, { payload: { apiId: 'api-1' } });

      expect(state.entities['api-1'].connector.calls).toHaveLength(1);
    });

    it('should remove call from API', () => {
      state.entities['api-1'].connector.calls = [
        { id: 'call-1', name: 'Get Users' },
        { id: 'call-2', name: 'Create User' },
      ];

      actionsApiEditor.removeCall(state, { payload: { apiId: 'api-1', callId: 'call-1' } });

      expect(state.entities['api-1'].connector.calls).toHaveLength(1);
      expect(state.entities['api-1'].connector.calls[0].id).toBe('call-2');
    });

    it('should handle removing call when calls not array', () => {
      state.entities['api-1'].connector.calls = null;

      actionsApiEditor.removeCall(state, { payload: { apiId: 'api-1', callId: 'call-1' } });

      // Should not throw error
      expect(state.entities['api-1'].connector.calls).toBeNull();
    });

    it('should handle adding call to non-existent API', () => {
      actionsApiEditor.addCall(state, { payload: { apiId: 'non-existent' } });

      expect(state.entities['non-existent']).toBeUndefined();
    });
  });

  // ===================================================================
  // PART 7: Call Property Updates (5 tests)
  // ===================================================================

  describe('Call Property Updates', () => {
    beforeEach(() => {
      state.entities = {
        'api-1': {
          connector: {
            calls: [
              { id: 'call-1', value: '', useAs: '', dataType: '', requestType: '' },
            ],
          },
        },
      };
    });

    it('should update call value', () => {
      actionsApiEditor.updateCallValue(state, {
        payload: { apiId: 'api-1', callId: 'call-1', value: '/api/users' },
      });

      expect(state.entities['api-1'].connector.calls[0].value).toBe('/api/users');
    });

    it('should update call useAs', () => {
      actionsApiEditor.updateCallUseAs(state, {
        payload: { apiId: 'api-1', callId: 'call-1', useAs: 'query' },
      });

      expect(state.entities['api-1'].connector.calls[0].useAs).toBe('query');
    });

    it('should update call dataType', () => {
      actionsApiEditor.updateCallDataType(state, {
        payload: { apiId: 'api-1', callId: 'call-1', dataType: 'array' },
      });

      expect(state.entities['api-1'].connector.calls[0].dataType).toBe('array');
    });

    it('should update call requestType', () => {
      actionsApiEditor.updateCallRequestType(state, {
        payload: { apiId: 'api-1', callId: 'call-1', requestType: 'GET' },
      });

      expect(state.entities['api-1'].connector.calls[0].requestType).toBe('GET');
    });

    it('should handle updating non-existent call', () => {
      actionsApiEditor.updateCallValue(state, {
        payload: { apiId: 'api-1', callId: 'non-existent', value: '/test' },
      });

      expect(state.entities['api-1'].connector.calls[0].value).toBe('');
    });
  });

  // ===================================================================
  // PART 8: Call Header Operations (3 tests)
  // ===================================================================

  describe('Call Header Operations', () => {
    beforeEach(() => {
      state.entities = {
        'api-1': {
          connector: {
            calls: [
              { id: 'call-1', headers: [] },
            ],
          },
        },
      };
    });

    it('should add header to call', () => {
      actionsApiEditor.addCallHeader(state, {
        payload: { apiId: 'api-1', callId: 'call-1' },
      });

      expect(state.entities['api-1'].connector.calls[0].headers).toHaveLength(1);
      expect(state.entities['api-1'].connector.calls[0].headers[0]).toMatchObject({
        id: expect.any(String),
        key: '',
        value: '',
      });
    });

    it('should update call header', () => {
      state.entities['api-1'].connector.calls[0].headers = [
        { id: 'header-1', key: '', value: '' },
      ];

      actionsApiEditor.updateCallHeader(state, {
        payload: { apiId: 'api-1', callId: 'call-1', headerId: 'header-1', field: 'key', value: 'Authorization' },
      });

      expect(state.entities['api-1'].connector.calls[0].headers[0].key).toBe('Authorization');
    });

    it('should remove header from call', () => {
      state.entities['api-1'].connector.calls[0].headers = [
        { id: 'header-1', key: 'Authorization', value: 'Bearer token' },
        { id: 'header-2', key: 'Content-Type', value: 'application/json' },
      ];

      actionsApiEditor.removeCallHeader(state, {
        payload: { apiId: 'api-1', callId: 'call-1', headerId: 'header-1' },
      });

      expect(state.entities['api-1'].connector.calls[0].headers).toHaveLength(1);
      expect(state.entities['api-1'].connector.calls[0].headers[0].id).toBe('header-2');
    });
  });

  // ===================================================================
  // PART 9: Call Parameter Operations (2 tests)
  // ===================================================================

  describe('Call Parameter Operations', () => {
    beforeEach(() => {
      state.entities = {
        'api-1': {
          connector: {
            calls: [
              { id: 'call-1', parameters: [] },
            ],
          },
        },
      };
    });

    it('should add parameter to call', () => {
      actionsApiEditor.addCallParameter(state, {
        payload: { apiId: 'api-1', callId: 'call-1' },
      });

      expect(state.entities['api-1'].connector.calls[0].parameters).toHaveLength(1);
      expect(state.entities['api-1'].connector.calls[0].parameters[0]).toMatchObject({
        id: expect.any(String),
        key: '',
        value: '',
      });
    });

    it('should update call parameter', () => {
      state.entities['api-1'].connector.calls[0].parameters = [
        { id: 'param-1', key: '', value: '' },
      ];

      actionsApiEditor.updateCallParameter(state, {
        payload: { apiId: 'api-1', callId: 'call-1', parameterId: 'param-1', field: 'key', value: 'limit' },
      });

      expect(state.entities['api-1'].connector.calls[0].parameters[0].key).toBe('limit');
    });

    it('should remove parameter from call', () => {
      state.entities['api-1'].connector.calls[0].parameters = [
        { id: 'param-1', key: 'limit', value: '10' },
        { id: 'param-2', key: 'offset', value: '0' },
      ];

      actionsApiEditor.removeCallParameter(state, {
        payload: { apiId: 'api-1', callId: 'call-1', parameterId: 'param-1' },
      });

      expect(state.entities['api-1'].connector.calls[0].parameters).toHaveLength(1);
      expect(state.entities['api-1'].connector.calls[0].parameters[0].id).toBe('param-2');
    });
  });
});

