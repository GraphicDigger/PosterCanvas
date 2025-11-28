// API Connectors Data - TypeScript version
export const connectors = [
  {
    id: 'connector-1',
    name: 'UI Connector',
    authentication: 'api-key',
    keyName: 'X-API-Key',
    keyValue: 'ui-api-key',
    headersIds: ['header-1'],
    parametersIds: ['param-1'],
    callsIds: ['call-1'],
  },
  {
    id: 'connector-2',
    name: 'Data Connector',
    authentication: 'bearer',
    keyName: 'Authorization',
    keyValue: 'Bearer data-token',
    headersIds: ['header-2'],
    parametersIds: ['param-2'],
    callsIds: ['call-2'],
  },
];

export const connectorHeaders = [
  {
    id: 'header-1',
    key: 'Content-Type',
    value: 'application/json',
  },
  {
    id: 'header-2',
    key: 'Authorization',
    value: 'Bearer token',
  },
];

export const connectorParameters = [
  {
    id: 'param-1',
    key: 'version',
    value: 'v1',
  },
  {
    id: 'param-2',
    key: 'limit',
    value: '10',
  },
];

export const apiCalls = [
  {
    id: 'call-1',
    name: 'Get UI Data',
    useAs: 'GET',
    dataType: 'JSON',
    requestType: 'GET',
    value: 'https://api.example.com/ui',
    headersIds: [],
    parametersIds: [],
  },
  {
    id: 'call-2',
    name: 'Get Data',
    useAs: 'POST',
    dataType: 'JSON',
    requestType: 'POST',
    value: 'https://api.example.com/data',
    headersIds: [],
    parametersIds: [],
  },
];

export const callHeaders = [
  {
    id: 'call-header-1',
    key: 'Content-Type',
    value: 'application/json',
  },
];

export const callParameters = [
  {
    id: 'call-param-1',
    key: 'limit',
    value: '10',
  },
];
