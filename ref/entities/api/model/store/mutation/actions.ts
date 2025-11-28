// Redux Actions - TypeScript version
import { v4 as uuidv4 } from 'uuid';
import type {
  ApiEditorState,
  ApiEntity,
  SetApisPayload,
  AddApiPayload,
  UpdateApiNamePayload,
  UpdateApiAuthenticationPayload,
  UpdateApiKeyPayload,
  AddApiHeaderPayload,
  UpdateApiHeaderPayload,
  RemoveApiHeaderPayload,
  AddApiParameterPayload,
  UpdateApiParameterPayload,
  RemoveApiParameterPayload,
  AddCallPayload,
  UpdateCallPayload,
  RemoveCallPayload,
  AddCallHeaderPayload,
  UpdateCallHeaderPayload,
  RemoveCallHeaderPayload,
  AddCallParameterPayload,
  UpdateCallParameterPayload,
  RemoveCallParameterPayload,
} from './types';

export const initialApiEditor: ApiEditorState = {
  entities: {},
  ids: [],
  categories: [],
};

export const actionsApiEditor = {
  setApis: (state: ApiEditorState, action: { payload: SetApisPayload }) => {
    const { apis, categories } = action.payload;
    state.entities = apis.reduce((acc, api) => {
      acc[api.id] = {
        ...api,
        connector: api.connector || {
          id: '',
          name: '',
          authentication: 'none',
          keyName: '',
          keyValue: '',
          headers: [],
          parameters: [],
          calls: [],
        },
      };
      return acc;
    }, {} as Record<string, ApiEntity>);
    state.ids = apis.map(api => api.id);
    state.categories = categories || [];
  },

  addApi: (state: ApiEditorState, action: { payload: AddApiPayload }) => {
    const { name, categoryId } = action.payload;
    const newId = uuidv4();

    // Создаем новый API объект с базовой структурой
    const newApi: ApiEntity = {
      id: newId,
      name: name || 'New API',
      categoryId: categoryId || 'custom-api-category',
      connector: {
        id: uuidv4(),
        name: '',
        authentication: 'none',
        keyName: '',
        keyValue: '',
        headers: [],
        parameters: [],
        calls: [],
      },
    };

    // Добавляем в хранилище
    state.entities[newId] = newApi;
    state.ids.push(newId);
  },

  removeApi: (state: ApiEditorState, action: { payload: string }) => {
    const id = action.payload;
    delete state.entities[id];
    state.ids = state.ids.filter(apiId => apiId !== id);
  },

  updateApiName: (state: ApiEditorState, action: { payload: UpdateApiNamePayload }) => {
    const { apiId, name } = action.payload;
    if (state.entities[apiId]) {
      state.entities[apiId].name = name;
    }
  },

  updateApiAuthentication: (state: ApiEditorState, action: { payload: UpdateApiAuthenticationPayload }) => {
    const { apiId, authentication } = action.payload;
    if (state.entities[apiId]) {
      state.entities[apiId].connector.authentication = authentication;
    }
  },

  updateApiKeyName: (state: ApiEditorState, action: { payload: UpdateApiKeyPayload }) => {
    const { apiId, keyName } = action.payload;
    if (state.entities[apiId]) {
      state.entities[apiId].connector.keyName = keyName;
    }
  },

  updateApiKeyValue: (state: ApiEditorState, action: { payload: UpdateApiKeyPayload }) => {
    const { apiId, keyValue } = action.payload;
    if (state.entities[apiId]) {
      state.entities[apiId].connector.keyValue = keyValue;
    }
  },

  addApiHeader: (state: ApiEditorState, action: { payload: AddApiHeaderPayload }) => {
    const { id, header } = action.payload;
    if (state.entities[id]) {
      state.entities[id].connector.headers.push(header);
    }
  },

  updateApiHeader: (state: ApiEditorState, action: { payload: UpdateApiHeaderPayload }) => {
    const { id, headerId, key, value } = action.payload;
    if (state.entities[id]) {
      const header = state.entities[id].connector.headers.find(h => h.id === headerId);
      if (header) {
        header.key = key;
        header.value = value;
      }
    }
  },

  removeApiHeader: (state: ApiEditorState, action: { payload: RemoveApiHeaderPayload }) => {
    const { id, headerId } = action.payload;
    if (state.entities[id]) {
      state.entities[id].connector.headers = state.entities[id].connector.headers.filter(
        h => h.id !== headerId,
      );
    }
  },

  addApiParameter: (state: ApiEditorState, action: { payload: AddApiParameterPayload }) => {
    const { id, parameter } = action.payload;
    if (state.entities[id]) {
      state.entities[id].connector.parameters.push(parameter);
    }
  },

  updateApiParameter: (state: ApiEditorState, action: { payload: UpdateApiParameterPayload }) => {
    const { id, parameterId, key, value } = action.payload;
    if (state.entities[id]) {
      const parameter = state.entities[id].connector.parameters.find(p => p.id === parameterId);
      if (parameter) {
        parameter.key = key;
        parameter.value = value;
      }
    }
  },

  removeApiParameter: (state: ApiEditorState, action: { payload: RemoveApiParameterPayload }) => {
    const { id, parameterId } = action.payload;
    if (state.entities[id]) {
      state.entities[id].connector.parameters = state.entities[id].connector.parameters.filter(
        p => p.id !== parameterId,
      );
    }
  },

  addCall: (state: ApiEditorState, action: { payload: AddCallPayload }) => {
    const { id, call } = action.payload;
    if (state.entities[id]) {
      state.entities[id].connector.calls.push(call);
    }
  },

  removeCall: (state: ApiEditorState, action: { payload: RemoveCallPayload }) => {
    const { id, callId } = action.payload;
    if (state.entities[id]) {
      state.entities[id].connector.calls = state.entities[id].connector.calls.filter(
        c => c.id !== callId,
      );
    }
  },

  updateCallValue: (state: ApiEditorState, action: { payload: UpdateCallPayload }) => {
    const { id, callId, value } = action.payload;
    if (state.entities[id]) {
      const call = state.entities[id].connector.calls.find(c => c.id === callId);
      if (call) {
        call.value = value;
      }
    }
  },

  updateCallUseAs: (state: ApiEditorState, action: { payload: UpdateCallPayload }) => {
    const { id, callId, value } = action.payload;
    if (state.entities[id]) {
      const call = state.entities[id].connector.calls.find(c => c.id === callId);
      if (call) {
        call.useAs = value;
      }
    }
  },

  updateCallDataType: (state: ApiEditorState, action: { payload: UpdateCallPayload }) => {
    const { id, callId, value } = action.payload;
    if (state.entities[id]) {
      const call = state.entities[id].connector.calls.find(c => c.id === callId);
      if (call) {
        call.dataType = value;
      }
    }
  },

  updateCallRequestType: (state: ApiEditorState, action: { payload: UpdateCallPayload }) => {
    const { id, callId, value } = action.payload;
    if (state.entities[id]) {
      const call = state.entities[id].connector.calls.find(c => c.id === callId);
      if (call) {
        call.requestType = value;
      }
    }
  },

  addCallHeader: (state: ApiEditorState, action: { payload: AddCallHeaderPayload }) => {
    const { id, callId, header } = action.payload;
    if (state.entities[id]) {
      const call = state.entities[id].connector.calls.find(c => c.id === callId);
      if (call) {
        call.headers.push(header);
      }
    }
  },

  removeCallHeader: (state: ApiEditorState, action: { payload: RemoveCallHeaderPayload }) => {
    const { id, callId, headerId } = action.payload;
    if (state.entities[id]) {
      const call = state.entities[id].connector.calls.find(c => c.id === callId);
      if (call) {
        call.headers = call.headers.filter(h => h.id !== headerId);
      }
    }
  },

  updateCallHeader: (state: ApiEditorState, action: { payload: UpdateCallHeaderPayload }) => {
    const { id, callId, headerId, key, value } = action.payload;
    if (state.entities[id]) {
      const call = state.entities[id].connector.calls.find(c => c.id === callId);
      if (call) {
        const header = call.headers.find(h => h.id === headerId);
        if (header) {
          header.key = key;
          header.value = value;
        }
      }
    }
  },

  addCallParameter: (state: ApiEditorState, action: { payload: AddCallParameterPayload }) => {
    const { id, callId, parameter } = action.payload;
    if (state.entities[id]) {
      const call = state.entities[id].connector.calls.find(c => c.id === callId);
      if (call) {
        call.parameters.push(parameter);
      }
    }
  },

  removeCallParameter: (state: ApiEditorState, action: { payload: RemoveCallParameterPayload }) => {
    const { id, callId, parameterId } = action.payload;
    if (state.entities[id]) {
      const call = state.entities[id].connector.calls.find(c => c.id === callId);
      if (call) {
        call.parameters = call.parameters.filter(p => p.id !== parameterId);
      }
    }
  },

  updateCallParameter: (state: ApiEditorState, action: { payload: UpdateCallParameterPayload }) => {
    const { id, callId, parameterId, key, value } = action.payload;
    if (state.entities[id]) {
      const call = state.entities[id].connector.calls.find(c => c.id === callId);
      if (call) {
        const parameter = call.parameters.find(p => p.id === parameterId);
        if (parameter) {
          parameter.key = key;
          parameter.value = value;
        }
      }
    }
  },
};
