// DataModel Entity Types
export interface DataModel {
  id: string;
  name: string;
  description?: string;
  fields: DataModelField[];
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
  isActive: boolean;
  version: number;
  tags?: string[];
  metadata?: Record<string, any>;
}

export interface DataModelField {
  id: string;
  name: string;
  type: FieldType;
  required: boolean;
  defaultValue?: any;
  validation?: FieldValidation;
  metadata?: Record<string, any>;
}

export type FieldType =
  | 'string'
  | 'number'
  | 'boolean'
  | 'date'
  | 'object'
  | 'array'
  | 'reference';

export interface FieldValidation {
  min?: number;
  max?: number;
  pattern?: string;
  custom?: (value: any) => boolean | string;
}

export interface DataModelState {
  entities: Record<string, DataModel>;
  ids: string[];
  ui: {
    selectedModelId: string | null;
    focusedModelId: string | null;
    hoveredModelId: string | null;
    isLoading: boolean;
    error: string | null;
  };
  queries: {
    searchTerm: string;
    filterBy: string[];
    sortBy: string;
    sortOrder: 'asc' | 'desc';
  };
  draft: DataModel | null;
}

export interface CreateDataModelRequest {
  name: string;
  description?: string;
  fields: Omit<DataModelField, 'id'>[];
  tags?: string[];
  metadata?: Record<string, any>;
}

export interface UpdateDataModelRequest {
  id: string;
  name?: string;
  description?: string;
  fields?: DataModelField[];
  tags?: string[];
  metadata?: Record<string, any>;
}

export interface DataModelQuery {
  search?: string;
  filterBy?: string[];
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  limit?: number;
  offset?: number;
}
