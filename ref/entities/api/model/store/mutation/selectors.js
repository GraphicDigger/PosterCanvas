import { createSelector } from '@reduxjs/toolkit';

// Base selectors
export const selectApiEntities = (state) => state.apiEntity?.entities || {};
export const selectApiIds = (state) => state.apiEntity?.ids || [];
export const selectCategories = (state) => state.apiEntity?.categories || [];
// All APIs
export const selectAllApis = (state) => {
  const ids = state.apiEntity?.ids || [];
  const entities = state.apiEntity?.entities || {};
  return ids.map(id => entities[id]);
};

// Custom APIs (кастомные API)
export const selectCustomApis = (state) => {
  const ids = state.apiEntity?.ids || [];
  const entities = state.apiEntity?.entities || {};
  return ids
    .map(id => entities[id])
    .filter(api => api.categoryId === 'custom-api-category');
};

// Category APIs (предустановленные API)
export const selectCategoryApis = (state) => {
  const ids = state.apiEntity?.ids || [];
  const entities = state.apiEntity?.entities || {};
  return ids
    .map(id => entities[id])
    .filter(api => api.categoryId !== 'custom-api-category');
};

// API by id
export const selectApiById = (state, apiId) =>
  (state.apiEntity?.entities || {})[apiId];

// API count
export const selectApiCount = (state) => {
  const ids = state.apiEntity?.ids || [];
  return ids.length;
};

// APIs by category
export const selectApisByCategory = (state) => {
  const ids = state.apiEntity?.ids || [];
  const entities = state.apiEntity?.entities || {};
  const result = {};

  ids.forEach(id => {
    const api = entities[id];
    if (api) {
      if (!result[api.categoryId]) {
        result[api.categoryId] = [];
      }
      result[api.categoryId].push(api);
    }
  });

  return result;
};

// API names
export const selectApiNames = (state) => {
  const ids = state.apiEntity?.ids || [];
  const entities = state.apiEntity?.entities || {};
  return ids.map(id => entities[id]?.name).filter(Boolean);
};

// API connectors
export const selectApiConnectors = (state) => {
  const ids = state.apiEntity?.ids || [];
  const entities = state.apiEntity?.entities || {};
  return ids.map(id => entities[id]?.connector).filter(Boolean);
};

// API connector
export const selectApiConnector = (state, apiId) =>
  (state.apiEntity?.entities || {})[apiId]?.connector;

// calls
export const selectApiCalls = (state, apiId) =>
  (state.apiEntity?.entities || {})[apiId]?.connector?.calls?.entities || {};

export const selectApiCallById = (state, apiId, callId) => {
  const calls = state.apiEntity?.entities[apiId]?.connector?.calls;
  const call = calls.find(call => call.id === callId);
  return call;
};

export const selectApisByCategoryId = createSelector(
  [selectApiIds, selectApiEntities, (_, categoryId) => categoryId],
  (ids, entities, categoryId) => {
    if (!categoryId) {
      return [];
    }
    return ids
      .map(id => entities[id])
      .filter(api => api && api.categoryId === categoryId);
  },
);

// Category by id
export const selectCategoryById = (state, categoryId) =>
  (state.apiEntity?.categories || []).find(category => category.id === categoryId);
