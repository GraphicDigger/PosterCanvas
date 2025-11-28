import {
  apis,
  connectors,
  connectorHeaders,
  connectorParameters,
  apiCalls,
  callHeaders,
  callParameters,
} from './api.data';
// Импортируем категории явно
import { apiCategories } from './api.data/categories';

export const apiApi = {

  getApis: async () => {
    // Имитируем асинхронный запрос к API
    return new Promise(resolve => {
      setTimeout(() => {
        // Возвращаем объект с двумя полями: apis и categories
        resolve({
          apis: buildFullApisData(),
          categories: apiCategories,
        });
      }, 300);
    });
  },
};

const buildFullApisData = () => {
  // Находим категорию один раз для оптимизации, если нужно
  // const categoryMap = new Map(apiCategories.map(cat => [cat.id, cat]));

  return apis.map(api => {
    // Используем импортированные apiCategories
    const category = apiCategories.find(cat => cat.id === api.categoryId);
    const connector = connectors.find(conn => conn.id === api.connectorId);

    if (!connector) {return {
      id: api.id,
      name: api.name,
      categoryId: api.categoryId,
      type: category?.type,
      connector: {},
    };}

    // Собираем headers для connector
    const headers = connector.headersIds?.map(headerId => {
      const header = connectorHeaders.find(h => h.id === headerId);
      return header ? { id: header.id, key: header.key, value: header.value } : null;
    }).filter(Boolean) || [];

    // Собираем parameters для connector
    const parameters = connector.parametersIds?.map(paramId => {
      const param = connectorParameters.find(p => p.id === paramId);
      return param ? { id: param.id, key: param.key, value: param.value } : null;
    }).filter(Boolean) || [];

    // Собираем calls для connector
    const calls = connector.callsIds?.map(callId => {
      const call = apiCalls.find(c => c.id === callId);
      if (!call) {return null;}

      const callHeadersList = call.headersIds?.map(headerId => {
        const header = callHeaders.find(h => h.id === headerId);
        return header ? { id: header.id, key: header.key, value: header.value } : null;
      }).filter(Boolean) || [];

      const callParametersList = call.parametersIds?.map(paramId => {
        const param = callParameters.find(p => p.id === paramId);
        return param ? { id: param.id, key: param.key, value: param.value } : null;
      }).filter(Boolean) || [];

      return {
        id: call.id,
        name: call.name,
        useAs: call.useAs,
        dataType: call.dataType,
        requestType: call.requestType,
        value: call.value,
        headers: callHeadersList,
        parameters: callParametersList,
      };
    }).filter(Boolean) || [];

    return {
      id: api.id,
      name: api.name,
      categoryId: api.categoryId,
      type: category?.type, // Убеждаемся, что тип добавляется
      connector: {
        id: connector.id,
        name: connector.name,
        authentication: connector.authentication,
        keyName: connector.keyName,
        keyValue: connector.keyValue,
        headers,
        parameters,
        calls,
      },
    };
  });
};

