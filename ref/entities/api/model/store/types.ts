// Redux State Types for API Entity
import type { ProcessedApi, ApiCategory } from '../../types';

// Base API entity in Redux store
export interface ApiEntity {
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

// UI State interface
export interface ApiUIState {
  hoveredApiId: string | null;
  focusedApiId: string | null;
  selectedApiId: string | null;

  hoveredCallId: string | null;
  focusedCallId: string | null;
  selectedCallId: string | null;

  hoveredCategoryId: string | null;
  focusedCategoryId: string | null;
  selectedCategoryId: string | null;
}

// API Editor state interface
export interface ApiEditorState {
  entities: Record<string, ApiEntity>;
  ids: string[];
  categories: ApiCategory[];
}

// Combined state interface
export interface ApiState extends ApiEditorState, ApiUIState {}

// Action payload types
export interface SetApisPayload {
  apis: ProcessedApi[];
  categories: ApiCategory[];
}

export interface AddApiPayload {
  name: string;
  categoryId: string;
}

export interface UpdateApiNamePayload {
  apiId: string;
  name: string;
}

export interface UpdateApiAuthenticationPayload {
  apiId: string;
  authentication: string;
}

export interface UpdateApiKeyPayload {
  apiId: string;
  keyName: string;
  keyValue: string;
}

export interface AddApiHeaderPayload {
  apiId: string;
  header: {
    id: string;
    key: string;
    value: string;
  };
}

export interface UpdateApiHeaderPayload {
  id: string;
  headerId: string;
  key: string;
  value: string;
}

export interface RemoveApiHeaderPayload {
  id: string;
  headerId: string;
}

export interface AddApiParameterPayload {
  id: string;
  parameter: {
    id: string;
    key: string;
    value: string;
  };
}

export interface UpdateApiParameterPayload {
  id: string;
  parameterId: string;
  key: string;
  value: string;
}

export interface RemoveApiParameterPayload {
  id: string;
  parameterId: string;
}

export interface AddCallPayload {
  id: string;
  call: {
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
  };
}

export interface UpdateCallPayload {
  id: string;
  callId: string;
  field: string;
  value: string;
}

export interface RemoveCallPayload {
  id: string;
  callId: string;
}

export interface AddCallHeaderPayload {
  id: string;
  callId: string;
  header: {
    id: string;
    key: string;
    value: string;
  };
}

export interface UpdateCallHeaderPayload {
  id: string;
  callId: string;
  headerId: string;
  key: string;
  value: string;
}

export interface RemoveCallHeaderPayload {
  id: string;
  callId: string;
  headerId: string;
}

export interface AddCallParameterPayload {
  id: string;
  callId: string;
  parameter: {
    id: string;
    key: string;
    value: string;
  };
}

export interface UpdateCallParameterPayload {
  id: string;
  callId: string;
  parameterId: string;
  key: string;
  value: string;
}

export interface RemoveCallParameterPayload {
  id: string;
  callId: string;
  parameterId: string;
}

export interface SetIdPayload {
  id: string;
}
