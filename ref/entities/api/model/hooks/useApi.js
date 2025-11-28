// src/entities/api/model/hooks/useApi.js
import { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectSelectedApiId,
  selectSelectedCategoryId,
} from '../store/states/selectors';
import {
  selectAllApis,
  selectApiById,
  selectApiConnector,
  selectCustomApis,
  selectCategoryApis,
  selectCategories,
  selectApisByCategoryId,
  selectCategoryById,
} from '../store/mutation/selectors';
import {
  updateApiName,
  updateApiAuthentication,
  updateApiKeyName,
  updateApiKeyValue,
  addApiHeader,
  updateApiHeader,
  removeApiHeader,
  addApiParameter,
  removeApiParameter,
  updateApiParameter,
  addApi,
  removeApi,
} from '../store/slice';

export const useApi = () => {

  const allApis = useSelector(selectAllApis);

  const apiCategoriesWithCustom = useSelector(selectCategories);
  const apiCategories = apiCategoriesWithCustom.filter(category => category.id !== 'custom-api-category');

  const selectedCategoryId = useSelector(selectSelectedCategoryId);
  const selectedCategory = useSelector(state => selectCategoryById(state, selectedCategoryId),
  );
  const customApis = useSelector(selectCustomApis);
  const categoryApis = useSelector(state => selectApisByCategoryId(state, selectedCategoryId));

  const selectedApiId = useSelector(selectSelectedApiId);
  const selectedApi = useSelector(state => selectApiById(state, selectedApiId),
  );
  const connector = useSelector(state => selectApiConnector(state, selectedApiId),
  );

  return {
    apiCategories,
    selectedCategoryId,
    selectedCategory,
    categoryApis,

    allApis,
    customApis,
    selectedApiId,
    selectedApi,
    connector,

  };
};

export const useApiMutations = () => {
  const dispatch = useDispatch();

  const selectedApiId = useSelector(selectSelectedApiId);

  const handleAddApi = (name, categoryId) => {
    dispatch(addApi({ name, categoryId }));
  };

  const handleRemoveApi = (apiId) => {
    dispatch(removeApi({ apiId: apiId || selectedApiId }));
  };

  const handleUpdateApiName = (name) => {
    dispatch(updateApiName({ apiId: selectedApiId, name }));
  };

  const handleUpdateApiAuthentication = (authentication) => {
    dispatch(updateApiAuthentication({ apiId: selectedApiId, authentication }));
  };

  const handleUpdateApiKeyName = (keyName) => {
    dispatch(updateApiKeyName({ apiId: selectedApiId, keyName }));
  };

  const handleUpdateApiKeyValue = (keyValue) => {
    dispatch(updateApiKeyValue({ apiId: selectedApiId, keyValue }));
  };

  const handleAddHeader = () => {
    dispatch(addApiHeader({ apiId: selectedApiId }));
  };

  const handleRemoveApiHeader = (headerId) => {
    dispatch(removeApiHeader({ apiId: selectedApiId, headerId }));
  };

  const handleUpdateApiHeaderKey = (headerId, value) => {
    dispatch(updateApiHeader({ apiId: selectedApiId, headerId, field: 'key', value }));
  };

  const handleUpdateApiHeaderValue = (headerId, value ) => {
    dispatch(updateApiHeader({ apiId: selectedApiId, headerId, field: 'value', value }));
  };

  const handleAddParameter = () => {
    dispatch(addApiParameter({ apiId: selectedApiId }));
  };

  const handleRemoveApiParameter = (parameterId) => {
    dispatch(removeApiParameter({ apiId: selectedApiId, parameterId }));
  };

  const handleUpdateApiParameterKey = (parameterId, value) => {
    dispatch(updateApiParameter({ apiId: selectedApiId, parameterId, field: 'key', value }));
  };

  const handleUpdateApiParameterValue = (parameterId, value) => {
    dispatch(updateApiParameter({ apiId: selectedApiId, parameterId, field: 'value', value }));
  };

  return {

    addApi: handleAddApi,
    removeApi: handleRemoveApi,

    updateApiName: handleUpdateApiName,
    updateApiAuthentication: handleUpdateApiAuthentication,
    updateApiKeyName: handleUpdateApiKeyName,
    updateApiKeyValue: handleUpdateApiKeyValue,

    addApiHeader: handleAddHeader,
    removeApiHeader: handleRemoveApiHeader,
    updateApiHeaderKey: handleUpdateApiHeaderKey,
    updateApiHeaderValue: handleUpdateApiHeaderValue,

    addApiParameter: handleAddParameter,
    updateApiParameterKey: handleUpdateApiParameterKey,
    updateApiParameterValue: handleUpdateApiParameterValue,
    removeApiParameter: handleRemoveApiParameter,
  };
};

