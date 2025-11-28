import { v4 as uuidv4 } from 'uuid';

export const initialApiEditor = {
  entities: {},
  ids: [],
  categories: [],
};

export const actionsApiEditor = {

  setApis: (state, action) => {
    const { apis, categories } = action.payload;
    state.entities = apis.reduce((acc, api) => {
      acc[api.id] = {
        ...api,
        connector: api.connector || {},
      };
      return acc;
    }, {});
    state.ids = apis.map(api => api.id);
    state.categories = categories || [];
  },

  addApi: (state, action) => {
    const { name, categoryId } = action.payload;
    const newId = uuidv4();

    // Создаем новый API объект с базовой структурой
    const newApi = {
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

  removeApi: (state, action) => {
    const apiId = action.payload.apiId || action.payload;
    if (state.entities[apiId]) {
      delete state.entities[apiId];
      state.ids = state.ids.filter(id => id !== apiId);
    }
  },

  updateApiName: (state, action) => {
    const { apiId, id, name } = action.payload;
    const targetApiId = apiId || id;
    if (state.entities[targetApiId]) {
      state.entities[targetApiId].name = name;
    }
  },

  updateApiAuthentication: (state, action) => {
    const { apiId, authentication } = action.payload;
    if (state.entities[apiId]) {
      state.entities[apiId].connector.authentication = authentication;
    }
  },

  updateApiKeyName: (state, action) => {
    const { apiId, keyName } = action.payload;
    if (state.entities[apiId]) {
      state.entities[apiId].connector.keyName = keyName;
    }
  },

  updateApiKeyValue: (state, action) => {
    const { apiId, keyValue } = action.payload;
    if (state.entities[apiId]) {
      state.entities[apiId].connector.keyValue = keyValue;
    }
  },


  addApiHeader: (state, action) => {
    const { apiId, id, header } = action.payload;
    const targetApiId = apiId || id;
    if (state.entities[targetApiId]) {
      const newHeader = header ? {
        id: header.id || uuidv4(),
        key: header.key || '',
        value: header.value || '',
      } : { id: uuidv4(), key: '', value: '' };
      state.entities[targetApiId].connector.headers.push(newHeader);
    }
  },

  updateApiHeader: (state, action) => {
    const { apiId, id, headerId, key, value, field } = action.payload;
    const targetApiId = apiId || id;
    if (state.entities[targetApiId] && state.entities[targetApiId].connector.headers) {
      const header = state.entities[targetApiId].connector.headers.find(h => h.id === headerId);
      if (header) {
        if (field && value !== undefined) {
          // Legacy format: { field: 'key', value: 'Content-Type' }
          header[field] = value;
        } else {
          // New format: { key: 'Content-Type', value: 'application/json' }
          if (key !== undefined) {header.key = key;}
          if (value !== undefined) {header.value = value;}
        }
      }
    }
  },

  removeApiHeader: (state, action) => {
    const { apiId, headerId } = action.payload;
    if (state.entities[apiId] && state.entities[apiId].connector.headers) {
      state.entities[apiId].connector.headers = state.entities[apiId].connector.headers.filter(h => h.id !== headerId);
    }
  },

  addApiParameter: (state, action) => {
    const { apiId } = action.payload;
    if (state.entities[apiId]) {
      state.entities[apiId].connector.parameters.push({ id: uuidv4(), key: '', value: '' });
    }
  },

  updateApiParameter: (state, action) => {
    const { apiId, parameterId, field, value } = action.payload;
    if (state.entities[apiId] && state.entities[apiId].connector.parameters) {
      const parameter = state.entities[apiId].connector.parameters.find(p => p.id === parameterId);
      if (parameter) {
        parameter[field] = value; // field: key-or-value
      }
    }
  },

  removeApiParameter: (state, action) => {
    const { apiId, parameterId } = action.payload;
    if (state.entities[apiId] && state.entities[apiId].connector.parameters) {
      state.entities[apiId].connector.parameters = state.entities[apiId].connector.parameters.filter(p => p.id !== parameterId);
    }
  },

  // Calls

  addCall: (state, action) => {
    const { apiId, id, callData, call } = action.payload;
    const targetApiId = apiId || id;
    const callInfo = callData || call;

    if (state.entities[targetApiId]) {
      if (!state.entities[targetApiId].connector.calls) {
        state.entities[targetApiId].connector.calls = [];
      }

      const newCallId = callInfo?.id || uuidv4();
      const newCall = {
        id: newCallId,
        name: callInfo?.name || 'New Call',
        useAs: callInfo?.useAs || '',
        dataType: callInfo?.dataType || '',
        requestType: callInfo?.requestType || '',
        value: callInfo?.value || '',
        headers: callInfo?.headers || [{ key: '', value: '' }],
        parameters: callInfo?.parameters || [{ key: '', value: '' }],
      };

      state.entities[targetApiId].connector.calls.push(newCall);
    }
  },

  removeCall: (state, action) => {
    const { apiId, id, callId } = action.payload;
    const targetApiId = apiId || id;

    if (state.entities[targetApiId]) {
      if (Array.isArray(state.entities[targetApiId].connector.calls)) {
        state.entities[targetApiId].connector.calls = state.entities[targetApiId].connector.calls.filter(call => call.id !== callId);
      }
    }
  },

  updateCallValue: (state, action) => {
    const { apiId, callId, value } = action.payload;
    const call = state.entities[apiId]?.connector.calls?.find(call => call.id === callId);
    if (call) {call.value = value;}
  },

  updateCallUseAs: (state, action) => {
    const { apiId, callId, useAs } = action.payload;
    const call = state.entities[apiId]?.connector.calls?.find(call => call.id === callId);
    if (call) {call.useAs = useAs;}
  },

  updateCallDataType: (state, action) => {
    const { apiId, callId, dataType } = action.payload;
    const call = state.entities[apiId]?.connector.calls?.find(call => call.id === callId);
    if (call) {call.dataType = dataType;}
  },

  updateCallRequestType: (state, action) => {
    const { apiId, callId, requestType } = action.payload;
    const call = state.entities[apiId]?.connector.calls?.find(call => call.id === callId);
    if (call) {call.requestType = requestType;}
  },


  addCallHeader: (state, action) => {
    const { apiId, callId } = action.payload;
    if (state.entities[apiId]) {
      const call = state.entities[apiId].connector.calls.find(call => call.id === callId);
      if (call) {
        call.headers.push({ id: uuidv4(), key: '', value: '' });
      }
    }
  },

  removeCallHeader: (state, action) => {
    const { apiId, callId, headerId } = action.payload;
    if (state.entities[apiId]) {
      const call = state.entities[apiId].connector.calls.find(call => call.id === callId);
      if (call) {
        call.headers = call.headers.filter(header => header.id !== headerId);
      }
    }
  },

  updateCallHeader: (state, action) => {
    const { apiId, callId, headerId, field, value } = action.payload;
    if (state.entities[apiId] && state.entities[apiId].connector.calls) {
      const call = state.entities[apiId].connector.calls.find(call => call.id === callId);
      if (call) {
        const header = call.headers.find(header => header.id === headerId);
        if (header) {
          header[field] = value; // field: key-or-value
        }
      }
    }
  },


  addCallParameter: (state, action) => {
    const { apiId, callId } = action.payload;
    if (state.entities[apiId]) {
      const call = state.entities[apiId].connector.calls.find(call => call.id === callId);
      if (call) {
        call.parameters.push({ id: uuidv4(), key: '', value: '' });
      }
    }
  },

  removeCallParameter: (state, action) => {
    const { apiId, callId, parameterId } = action.payload;
    if (state.entities[apiId]) {
      const call = state.entities[apiId].connector.calls.find(call => call.id === callId);
      if (call) {
        call.parameters = call.parameters.filter(parameter => parameter.id !== parameterId);
      }
    }
  },

  updateCallParameter: (state, action) => {
    const { apiId, callId, parameterId, field, value } = action.payload;
    if (state.entities[apiId] && state.entities[apiId].connector.calls) {
      const call = state.entities[apiId].connector.calls.find(call => call.id === callId);
      if (call) {
        const parameter = call.parameters.find(parameter => parameter.id === parameterId);
        if (parameter) {
          parameter[field] = value; // field: key-or-value
        }
      }
    }
  },


  updateCall: (state, action) => {
    const { apiId, callId, callData } = action.payload;
    if (state.entities[apiId]?.connector.calls[callId]) {
      state.entities[apiId].connector.calls[callId] = {
        ...state.entities[apiId].connector.calls[callId],
        ...callData,
      };
    }
  },


};
