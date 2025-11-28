// API Entity Types
export interface ProcessedApi {
  id: string;
  name: string;
  categoryId: string;
  type: string;
  connector: {
    id: string;
    name: string;
    authentication: string;
    keyName: string;
    keyValue: string;
    headers: Array<{
      id: string;
      key: string;
      value: string;
    }>;
    parameters: Array<{
      id: string;
      key: string;
      value: string;
    }>;
    calls: Array<{
      id: string;
      name: string;
      useAs: string;
      dataType: string;
      requestType: string;
      value: string;
      headers: Array<{
        id: string;
        key: string;
        value: string;
      }>;
      parameters: Array<{
        id: string;
        key: string;
        value: string;
      }>;
    }>;
  };
}

export interface ApiCategory {
  id: string;
  name: string;
  type: string;
}

export interface ApiResponse {
  apis: ProcessedApi[];
  categories: ApiCategory[];
}

export interface ProcessedConnector {
  id: string;
  name: string;
  authentication: string;
  keyName: string;
  keyValue: string;
  headers: Array<{
    id: string;
    key: string;
    value: string;
  }>;
  parameters: Array<{
    id: string;
    key: string;
    value: string;
  }>;
  calls: ProcessedApiCall[];
}

export interface ProcessedApiCall {
  id: string;
  name: string;
  useAs: string;
  dataType: string;
  requestType: string;
  value: string;
  headers: Array<{
    id: string;
    key: string;
    value: string;
  }>;
  parameters: Array<{
    id: string;
    key: string;
    value: string;
  }>;
}

export interface Api {
  id: string;
  name: string;
  categoryId: string;
  type: string;
}

export interface ApiApi {
  getApis: () => Promise<ApiResponse>;
  getApiById: (id: string) => Promise<ProcessedApi | null>;
  createApi: (api: Partial<ProcessedApi>) => Promise<ProcessedApi>;
  updateApi: (id: string, api: Partial<ProcessedApi>) => Promise<ProcessedApi>;
  deleteApi: (id: string) => Promise<boolean>;
}
