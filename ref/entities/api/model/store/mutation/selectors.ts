// Redux Selectors - TypeScript version
import { createSelector } from '@reduxjs/toolkit';
import type { ProcessedApi, ApiCategory } from '../../../types';

// Debug export
export const debugExport = 'test';

// Local types
interface ApiEntity {
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

interface ApiState {
  entities: Record<string, ApiEntity>;
  ids: string[];
  categories: ApiCategory[];
  selectedApiId: string | null;
  focusedApiId: string | null;
  hoveredApiId: string | null;
  selectedCallId: string | null;
  focusedCallId: string | null;
  hoveredCallId: string | null;
  selectedCategoryId: string | null;
  focusedCategoryId: string | null;
  hoveredCategoryId: string | null;
}

// Root state type (assuming it has apiEntity property)
interface RootState {
  apiEntity: ApiState;
}

// Base selectors
export const selectApiEntities = (state: RootState): Record<string, ApiEntity> =>
  state.apiEntity?.entities || {};

export const selectApiIds = (state: RootState): string[] =>
  state.apiEntity?.ids || [];

export const selectCategories = (state: RootState): ApiCategory[] =>
  state.apiEntity?.categories || [];

// All APIs
export const selectAllApis = (state: RootState): ProcessedApi[] => {
  const ids = state.apiEntity?.ids || [];
  const entities = state.apiEntity?.entities || {};
  return ids.map(id => entities[id]).filter(Boolean);
};

// Custom APIs (кастомные API)
export const selectCustomApis = (state: RootState): ProcessedApi[] => {
  const allApis = selectAllApis(state);
  return allApis.filter(api => api.categoryId === 'custom-api-category');
};

// Category APIs (API из категорий)
export const selectCategoryApis = (state: RootState): ProcessedApi[] => {
  const allApis = selectAllApis(state);
  return allApis.filter(api => api.categoryId !== 'custom-api-category');
};

// API by id
export const selectApiById = (state: RootState, apiId: string): ProcessedApi | undefined =>
  (state.apiEntity?.entities || {})[apiId];

// API connector
export const selectApiConnector = (state: RootState, apiId: string) => {
  const api = selectApiById(state, apiId);
  return api?.connector;
};


// Memoized selectors for performance
export const selectApiCount = createSelector(
  [selectAllApis],
  (apis) => apis.length,
);

export const selectCustomApiCount = createSelector(
  [selectCustomApis],
  (apis) => apis.length,
);

export const selectCategoryApiCount = createSelector(
  [selectCategoryApis],
  (apis) => apis.length,
);

export const selectApisByCategory = createSelector(
  [selectAllApis],
  (apis) => {
    return apis.reduce((acc, api) => {
      const categoryId = api.categoryId;
      if (!acc[categoryId]) {
        acc[categoryId] = [];
      }
      acc[categoryId].push(api);
      return acc;
    }, {} as Record<string, ProcessedApi[]>);
  },
);

export const selectApiNames = createSelector(
  [selectAllApis],
  (apis) => apis.map(api => api.name),
);

export const selectApiConnectors = createSelector(
  [selectAllApis],
  (apis) => apis.map(api => api.connector),
);

// UI State selectors
export const selectSelectedApiId = (state: RootState): string | null =>
  state.apiEntity?.selectedApiId || null;

export const selectFocusedApiId = (state: RootState): string | null =>
  state.apiEntity?.focusedApiId || null;

export const selectHoveredApiId = (state: RootState): string | null =>
  state.apiEntity?.hoveredApiId || null;

export const selectSelectedCallId = (state: RootState): string | null =>
  state.apiEntity?.selectedCallId || null;

export const selectFocusedCallId = (state: RootState): string | null =>
  state.apiEntity?.focusedCallId || null;

export const selectHoveredCallId = (state: RootState): string | null =>
  state.apiEntity?.hoveredCallId || null;

export const selectSelectedCategoryId = (state: RootState): string | null =>
  state.apiEntity?.selectedCategoryId || null;

export const selectFocusedCategoryId = (state: RootState): string | null =>
  state.apiEntity?.focusedCategoryId || null;

export const selectHoveredCategoryId = (state: RootState): string | null =>
  state.apiEntity?.hoveredCategoryId || null;

// Check states selectors
export const selectApiCheckStates = createSelector(
  [selectSelectedApiId, selectFocusedApiId, selectHoveredApiId, (_, id: string) => id],
  (selectedId, focusedId, hoveredId, apiId) => ({
    isSelected: selectedId === apiId,
    isFocused: focusedId === apiId,
    isHovered: hoveredId === apiId,
  }),
);

export const selectCallCheckStates = createSelector(
  [selectSelectedCallId, selectFocusedCallId, selectHoveredCallId, (_, id: string) => id],
  (selectedId, focusedId, hoveredId, callId) => ({
    isSelected: selectedId === callId,
    isFocused: focusedId === callId,
    isHovered: hoveredId === callId,
  }),
);

export const selectCategoryCheckStates = createSelector(
  [selectSelectedCategoryId, selectFocusedCategoryId, selectHoveredCategoryId, (_, id: string) => id],
  (selectedId, focusedId, hoveredId, categoryId) => ({
    isSelected: selectedId === categoryId,
    isFocused: focusedId === categoryId,
    isHovered: hoveredId === categoryId,
  }),
);
