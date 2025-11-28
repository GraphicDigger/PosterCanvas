// Redux Slice Tests - TypeScript version
import apiEntityReducer, {
  setApis,
  addApi,
  removeApi,
  updateApiName,
  setHoveredApiId,
  setSelectedApiId,
  addCall,
  removeCall,
} from './slice';
import type { ApiState, ProcessedApi, ApiCategory } from './types';

describe('API Entity Redux Slice', () => {
  const initialState: ApiState = apiEntityReducer(undefined, { type: '@@INIT' });

  const mockApi: ProcessedApi = {
    id: 'api-1',
    name: 'Test API',
    categoryId: 'category-1',
    type: 'REST',
    connector: {
      id: 'connector-1',
      name: 'Test Connector',
      authentication: 'none',
      keyName: '',
      keyValue: '',
      headers: [],
      parameters: [],
      calls: [],
    },
  };

  const mockCategory: ApiCategory = {
    id: 'category-1',
    name: 'Test Category',
    type: 'REST',
  };

  it('should handle initial state', () => {
    expect(apiEntityReducer(undefined, { type: '@@INIT' })).toEqual(initialState);
  });

  it('should handle setApis action', () => {
    const action = setApis({
      apis: [mockApi],
      categories: [mockCategory],
    });

    const newState = apiEntityReducer(initialState, action);

    expect(newState.entities).toHaveProperty('api-1');
    expect(newState.ids).toContain('api-1');
    expect(newState.categories).toContain(mockCategory);
  });

  it('should handle addApi action', () => {
    const action = addApi({
      name: 'New API',
      categoryId: 'category-1',
    });

    const newState = apiEntityReducer(initialState, action);

    expect(newState.ids).toHaveLength(1);
    expect(Object.keys(newState.entities)).toHaveLength(1);

    const addedApi = Object.values(newState.entities)[0];
    expect(addedApi.name).toBe('New API');
    expect(addedApi.categoryId).toBe('category-1');
  });

  it('should handle removeApi action', () => {
    const stateWithApi = {
      ...initialState,
      entities: { 'api-1': mockApi },
      ids: ['api-1'],
    };

    const action = removeApi('api-1');
    const newState = apiEntityReducer(stateWithApi, action);

    expect(newState.entities).not.toHaveProperty('api-1');
    expect(newState.ids).not.toContain('api-1');
  });

  it('should handle updateApiName action', () => {
    const stateWithApi = {
      ...initialState,
      entities: { 'api-1': mockApi },
      ids: ['api-1'],
    };

    const action = updateApiName({
      id: 'api-1',
      name: 'Updated API Name',
    });

    const newState = apiEntityReducer(stateWithApi, action);

    expect(newState.entities['api-1'].name).toBe('Updated API Name');
  });

  it('should handle setHoveredApiId action', () => {
    const action = setHoveredApiId('api-1');
    const newState = apiEntityReducer(initialState, action);

    expect(newState.hoveredApiId).toBe('api-1');
  });

  it('should handle setSelectedApiId action', () => {
    const action = setSelectedApiId('api-1');
    const newState = apiEntityReducer(initialState, action);

    expect(newState.selectedApiId).toBe('api-1');
  });

  it('should handle addCall action', () => {
    const stateWithApi = {
      ...initialState,
      entities: { 'api-1': mockApi },
      ids: ['api-1'],
    };

    const callData = {
      id: 'call-1',
      name: 'Test Call',
      useAs: 'GET',
      dataType: 'JSON',
      requestType: 'GET',
      value: 'https://api.example.com',
      headers: [],
      parameters: [],
    };

    const action = addCall({
      id: 'api-1',
      call: callData,
    });

    const newState = apiEntityReducer(stateWithApi, action);

    expect(newState.entities['api-1'].connector.calls).toMatchObject([callData]);
  });

  it('should handle removeCall action', () => {
    const apiWithCall = {
      ...mockApi,
      connector: {
        ...mockApi.connector,
        calls: [{
          id: 'call-1',
          name: 'Test Call',
          useAs: 'GET',
          dataType: 'JSON',
          requestType: 'GET',
          value: 'https://api.example.com',
          headers: [],
          parameters: [],
        }],
      },
    };

    const stateWithApi = {
      ...initialState,
      entities: { 'api-1': apiWithCall },
      ids: ['api-1'],
    };

    const action = removeCall({
      id: 'api-1',
      callId: 'call-1',
    });

    const newState = apiEntityReducer(stateWithApi, action);

    expect(newState.entities['api-1'].connector.calls).toHaveLength(0);
  });

  it('should maintain type safety throughout state updates', () => {
    const action = setApis({
      apis: [mockApi],
      categories: [mockCategory],
    });

    const newState = apiEntityReducer(initialState, action);

    // TypeScript should ensure these properties exist and are correctly typed
    expect(typeof newState.entities).toBe('object');
    expect(Array.isArray(newState.ids)).toBe(true);
    expect(Array.isArray(newState.categories)).toBe(true);
    expect(typeof newState.hoveredApiId === 'string' || newState.hoveredApiId === null).toBe(true);
  });
});
