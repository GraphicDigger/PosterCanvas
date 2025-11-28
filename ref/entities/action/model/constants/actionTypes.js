
const NAVIGATION = {
  LINK_TO: 'linkTo',
  GO_BACK: 'goBack',
};

const DATABASE = {
  DB_CREATE: 'dbCreate',
  DB_READ: 'dbRead',
  DB_UPDATE: 'dbUpdate',
  DB_DELETE: 'dbDelete',
};

const API = {
  API_GET: 'apiGet',
  API_POST: 'apiPost',
  API_PUT: 'apiPut',
  API_DELETE: 'apiDelete',
};

const CUSTOM = {
  CUSTOM_ACTION: 'customAction',
};

export const ACTION_TYPES = {
  ...NAVIGATION,
  ...DATABASE,
  ...API,
  ...CUSTOM,
};
