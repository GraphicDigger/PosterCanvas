// ===================================================================
// Unit Tests for API Entity Redux Slice
// Coverage Target: 95%+
// Week 3 - Day 5 (Unblocked by varProp Fix)
// ===================================================================

import { describe, it, expect, vi, beforeEach } from 'vitest';
import apiReducer, {
  setApis,
  addApi,
  removeApi,
  updateApiName,
  updateApiAuthentication,
  updateApiKeyName,
  updateApiKeyValue,
  addApiHeader,
  updateApiHeader,
  removeApiHeader,
  addApiParameter,
  updateApiParameter,
  removeApiParameter,
  setHoveredApiId,
  resetHoveredApiId,
  setSelectedApiId,
  resetSelectedApiId,
  addCall,
  removeCall,
  updateCallValue,
} from './slice';

// Mock uuid
vi.mock('uuid', () => ({
  v4: vi.fn(() => 'mocked-uuid-1234'),
}));

// Mock console.log
const consoleLogSpy = vi.spyOn(console, 'log');

describe('API Entity Slice', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Initial State', () => {
    it('should have correct initial state structure', () => {
      const state = apiReducer(undefined, { type: '@@INIT' });

      expect(state).toBeDefined();
      expect(state.ids).toBeDefined();
      expect(state.entities).toBeDefined();
      expect(state.categories).toBeDefined();
    });

    it('should initialize with empty entities and categories', () => {
      const state = apiReducer(undefined, { type: '@@INIT' });

      expect(state.ids).toEqual([]);
      expect(state.entities).toEqual({});
      expect(state.categories).toEqual([]);
    });

    it('should initialize UI state with null values', () => {
      const state = apiReducer(undefined, { type: '@@INIT' });

      expect(state.hoveredApiId).toBeNull();
      expect(state.focusedApiId).toBeNull();
      expect(state.selectedCallId).toBeNull();
    });
  });

  describe('UI State Actions', () => {
    it('should set hovered api id', () => {
      const initialState = apiReducer(undefined, { type: '@@INIT' });
      const state = apiReducer(initialState, setHoveredApiId('api-123'));

      expect(state.hoveredApiId).toBe('api-123');
    });

    it('should reset hovered api id', () => {
      let state = apiReducer(undefined, { type: '@@INIT' });
      state = apiReducer(state, setHoveredApiId('api-123'));
      state = apiReducer(state, resetHoveredApiId());

      expect(state.hoveredApiId).toBeNull();
    });

    it('should set selected api id', () => {
      const state = apiReducer(undefined, { type: '@@INIT' });

      const newState = apiReducer(state, setSelectedApiId('api-456'));

      expect(newState.selectedApiId).toBe('api-456');
    });

    it('should reset selected api id', () => {
      let state = apiReducer(undefined, { type: '@@INIT' });
      state = apiReducer(state, setSelectedApiId('api-456'));
      state = apiReducer(state, resetSelectedApiId());

      expect(state.selectedApiId).toBeNull();
    });
  });

  describe('Query Actions - setApis', () => {
    it('should set apis and categories', () => {
      const initialState = apiReducer(undefined, { type: '@@INIT' });
      const apis = [
        { id: 'api-1', name: 'REST API', connector: {} },
        { id: 'api-2', name: 'GraphQL API', connector: {} },
      ];
      const categories = ['cat-1', 'cat-2'];

      const state = apiReducer(
        initialState,
        setApis({ apis, categories }),
      );

      expect(state.ids).toEqual(['api-1', 'api-2']);
      expect(state.entities['api-1'].name).toBe('REST API');
      expect(state.categories).toEqual(categories);
    });

    it('should add default connector if not provided', () => {
      const state = apiReducer(undefined, { type: '@@INIT' });
      const apis = [{ id: 'api-1', name: 'API without connector' }];

      const newState = apiReducer(state, setApis({ apis }));

      expect(newState.entities['api-1'].connector).toEqual({});
    });

    it('should handle empty categories array', () => {
      const state = apiReducer(undefined, { type: '@@INIT' });
      const apis = [{ id: 'api-1', name: 'API' }];

      const newState = apiReducer(state, setApis({ apis }));

      expect(newState.categories).toEqual([]);
    });
  });

  describe('Mutation Actions - API CRUD', () => {
    it('should add a new api with defaults', () => {
      const state = apiReducer(undefined, { type: '@@INIT' });

      const newState = apiReducer(
        state,
        addApi({ name: 'Test API', categoryId: 'custom' }),
      );

      expect(newState.ids).toContain('mocked-uuid-1234');
      expect(newState.entities['mocked-uuid-1234']).toMatchObject({
        id: 'mocked-uuid-1234',
        name: 'Test API',
        categoryId: 'custom',
      });
      expect(newState.entities['mocked-uuid-1234'].connector).toBeDefined();
    });

    it('should add api with default name if not provided', () => {
      const state = apiReducer(undefined, { type: '@@INIT' });

      const newState = apiReducer(state, addApi({}));

      expect(newState.entities['mocked-uuid-1234'].name).toBe('New API');
      expect(newState.entities['mocked-uuid-1234'].categoryId).toBe('custom-api-category');
    });

    it('should remove an api', () => {
      let state = apiReducer(undefined, { type: '@@INIT' });

      state = apiReducer(
        state,
        setApis({
          apis: [
            { id: 'api-1', name: 'API 1' },
            { id: 'api-2', name: 'API 2' },
          ],
        }),
      );

      state = apiReducer(state, removeApi({ apiId: 'api-1' }));

      expect(state.ids).not.toContain('api-1');
      expect(state.entities['api-1']).toBeUndefined();
      expect(state.ids).toContain('api-2');
    });

    it('should update api name', () => {
      let state = apiReducer(undefined, { type: '@@INIT' });

      state = apiReducer(
        state,
        setApis({ apis: [{ id: 'api-1', name: 'Old Name', connector: {} }] }),
      );

      state = apiReducer(
        state,
        updateApiName({ apiId: 'api-1', name: 'New Name' }),
      );

      expect(state.entities['api-1'].name).toBe('New Name');
    });

    it('should update api authentication', () => {
      let state = apiReducer(undefined, { type: '@@INIT' });

      state = apiReducer(
        state,
        setApis({
          apis: [{ id: 'api-1', connector: { authentication: 'none' } }],
        }),
      );

      state = apiReducer(
        state,
        updateApiAuthentication({ apiId: 'api-1', authentication: 'bearer' }),
      );

      expect(state.entities['api-1'].connector.authentication).toBe('bearer');
    });

    it('should update api key name and value', () => {
      let state = apiReducer(undefined, { type: '@@INIT' });

      state = apiReducer(
        state,
        setApis({ apis: [{ id: 'api-1', connector: {} }] }),
      );

      state = apiReducer(
        state,
        updateApiKeyName({ apiId: 'api-1', keyName: 'x-api-key' }),
      );

      state = apiReducer(
        state,
        updateApiKeyValue({ apiId: 'api-1', keyValue: 'secret123' }),
      );

      expect(state.entities['api-1'].connector.keyName).toBe('x-api-key');
      expect(state.entities['api-1'].connector.keyValue).toBe('secret123');
    });
  });

  describe('Header Operations', () => {
    it('should add api header', () => {
      let state = apiReducer(undefined, { type: '@@INIT' });

      state = apiReducer(
        state,
        setApis({ apis: [{ id: 'api-1', connector: { headers: [] } }] }),
      );

      state = apiReducer(state, addApiHeader({ apiId: 'api-1' }));

      expect(state.entities['api-1'].connector.headers).toHaveLength(1);
      expect(state.entities['api-1'].connector.headers[0]).toMatchObject({
        id: 'mocked-uuid-1234',
        key: '',
        value: '',
      });
    });

    it('should update api header', () => {
      let state = apiReducer(undefined, { type: '@@INIT' });

      state = apiReducer(
        state,
        setApis({
          apis: [
            {
              id: 'api-1',
              connector: {
                headers: [{ id: 'header-1', key: 'old', value: 'old' }],
              },
            },
          ],
        }),
      );

      state = apiReducer(
        state,
        updateApiHeader({
          apiId: 'api-1',
          headerId: 'header-1',
          field: 'key',
          value: 'Content-Type',
        }),
      );

      expect(state.entities['api-1'].connector.headers[0].key).toBe('Content-Type');
    });

    it('should remove api header', () => {
      let state = apiReducer(undefined, { type: '@@INIT' });

      state = apiReducer(
        state,
        setApis({
          apis: [
            {
              id: 'api-1',
              connector: {
                headers: [
                  { id: 'header-1', key: 'key1' },
                  { id: 'header-2', key: 'key2' },
                ],
              },
            },
          ],
        }),
      );

      state = apiReducer(
        state,
        removeApiHeader({ apiId: 'api-1', headerId: 'header-1' }),
      );

      expect(state.entities['api-1'].connector.headers).toHaveLength(1);
      expect(state.entities['api-1'].connector.headers[0].id).toBe('header-2');
    });
  });

  describe('Parameter Operations', () => {
    it('should add api parameter', () => {
      let state = apiReducer(undefined, { type: '@@INIT' });

      state = apiReducer(
        state,
        setApis({ apis: [{ id: 'api-1', connector: { parameters: [] } }] }),
      );

      state = apiReducer(state, addApiParameter({ apiId: 'api-1' }));

      expect(state.entities['api-1'].connector.parameters).toHaveLength(1);
      expect(state.entities['api-1'].connector.parameters[0]).toMatchObject({
        id: 'mocked-uuid-1234',
        key: '',
        value: '',
      });
    });

    it('should update api parameter', () => {
      let state = apiReducer(undefined, { type: '@@INIT' });

      state = apiReducer(
        state,
        setApis({
          apis: [
            {
              id: 'api-1',
              connector: {
                parameters: [{ id: 'param-1', key: 'old', value: 'old' }],
              },
            },
          ],
        }),
      );

      state = apiReducer(
        state,
        updateApiParameter({
          apiId: 'api-1',
          parameterId: 'param-1',
          field: 'value',
          value: 'updated',
        }),
      );

      expect(state.entities['api-1'].connector.parameters[0].value).toBe('updated');
    });

    it('should remove api parameter', () => {
      let state = apiReducer(undefined, { type: '@@INIT' });

      state = apiReducer(
        state,
        setApis({
          apis: [
            {
              id: 'api-1',
              connector: {
                parameters: [
                  { id: 'param-1', key: 'key1' },
                  { id: 'param-2', key: 'key2' },
                ],
              },
            },
          ],
        }),
      );

      state = apiReducer(
        state,
        removeApiParameter({ apiId: 'api-1', parameterId: 'param-1' }),
      );

      expect(state.entities['api-1'].connector.parameters).toHaveLength(1);
      expect(state.entities['api-1'].connector.parameters[0].id).toBe('param-2');
    });
  });

  describe('Call Operations', () => {
    it('should add a call to api', () => {
      let state = apiReducer(undefined, { type: '@@INIT' });

      state = apiReducer(
        state,
        setApis({ apis: [{ id: 'api-1', connector: { calls: [] } }] }),
      );

      state = apiReducer(state, addCall({ apiId: 'api-1' }));

      expect(state.entities['api-1'].connector.calls).toHaveLength(1);
      expect(state.entities['api-1'].connector.calls[0]).toMatchObject({
        id: 'mocked-uuid-1234',
        name: 'New Call',
        useAs: '',
        dataType: '',
        requestType: '',
        value: '',
      });
    });

    it('should remove a call from api', () => {
      let state = apiReducer(undefined, { type: '@@INIT' });

      state = apiReducer(
        state,
        setApis({
          apis: [
            {
              id: 'api-1',
              connector: {
                calls: [
                  { id: 'call-1', name: 'Call 1' },
                  { id: 'call-2', name: 'Call 2' },
                ],
              },
            },
          ],
        }),
      );

      state = apiReducer(
        state,
        removeCall({ apiId: 'api-1', callId: 'call-1' }),
      );

      expect(state.entities['api-1'].connector.calls).toHaveLength(1);
      expect(state.entities['api-1'].connector.calls[0].id).toBe('call-2');
    });

    it('should update call value', () => {
      let state = apiReducer(undefined, { type: '@@INIT' });

      state = apiReducer(
        state,
        setApis({
          apis: [
            {
              id: 'api-1',
              connector: {
                calls: [{ id: 'call-1', value: 'old' }],
              },
            },
          ],
        }),
      );

      state = apiReducer(
        state,
        updateCallValue({ apiId: 'api-1', callId: 'call-1', value: 'new value' }),
      );

      expect(state.entities['api-1'].connector.calls[0].value).toBe('new value');
    });
  });

  describe('Edge Cases', () => {
    it('should handle updating non-existent api gracefully', () => {
      const state = apiReducer(undefined, { type: '@@INIT' });

      const newState = apiReducer(
        state,
        updateApiName({ apiId: 'non-existent', name: 'Test' }),
      );

      expect(newState).toBeDefined();
      expect(newState.entities['non-existent']).toBeUndefined();
    });

    it('should handle removing non-existent api gracefully', () => {
      const state = apiReducer(undefined, { type: '@@INIT' });

      const newState = apiReducer(
        state,
        removeApi({ apiId: 'non-existent' }),
      );

      expect(newState).toBeDefined();
      expect(newState.ids).toEqual([]);
    });

    it('should initialize calls array if not exists when adding call', () => {
      let state = apiReducer(undefined, { type: '@@INIT' });

      state = apiReducer(
        state,
        setApis({ apis: [{ id: 'api-1', connector: {} }] }),
      );

      state = apiReducer(state, addCall({ apiId: 'api-1' }));

      expect(state.entities['api-1'].connector.calls).toHaveLength(1);
    });
  });
});

