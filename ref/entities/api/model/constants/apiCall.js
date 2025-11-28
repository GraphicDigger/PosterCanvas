export const USE_AS = [
  {
    id: 'dataId-1',
    label: 'Data',
    value: 'data',
    description: 'Data',
  }, {
    id: 'actionId-2',
    label: 'Action',
    value: 'action',
    description: 'Action',
  }, {
    id: 'resourceId-3',
    label: 'Resource',
    value: 'resource',
    description: 'Resource',
  }, {
    id: 'authenticationId-4',
    label: 'Authentication',
    value: 'authentication',
    description: 'Authentication',
  },
];

export const API_CALL = [
  {
    id: '1',
    useAsId: 'dataId-1',
    dataType: 'JSON',
    requestType: 'GET',
    value: '/api/users',
  },
  {
    id: '2',
    useAsId: 'actionId-2',
    dataType: 'JSON',
    requestType: 'POST',
    value: '/api/users',
  },
  {
    id: '3',
    useAsId: 'resourceId-3',
    dataType: 'JSON',
    requestType: 'GET',
    value: '/api/users',
  },
  {
    id: '4',
    useAsId: 'authenticationId-4',
    dataType: 'JSON',
    requestType: 'GET',
    value: '/api/users',
  },
];
