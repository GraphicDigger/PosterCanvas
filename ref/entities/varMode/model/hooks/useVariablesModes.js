import { useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import {
  selectAllVariableModes,
  selectSelectedVariableMode,
  selectVariableModesByIds,
  selectVariableModesByType,
  selectDefaultVariableModeByIds,
  selectVariableModeById,
  selectVariableModesByVariableModeGroupId,
  selectVariableModesByModeGroupType,
  selectDefaultVariableModeByCollectionId,
  selectVariableModesByCollectionId,
  selectSelectedCollectionModes,
} from '../store';
import { VARIABLE_MODE_TYPE } from '../constants/variableModeTypes';


export const useVariableModes = () => {

  const allVariableModes = useSelector(selectAllVariableModes);
  const selectedVariableMode = useSelector(selectSelectedVariableMode);
  const variableModesByType = useSelector(selectVariableModesByTypeFn);
  const variableModesByVariableModeGroupId = useSelector(selectVariableModesByVariableModeGroupIdFn);
  const variableModesByModeGroupType = useSelector(selectVariableModesByModeGroupTypeFn);
  const defaultVariableModeByIds = useSelector(selectDefaultVariableModeByIdsFn);
  const defaultVariableModeByCollectionId = useSelector(selectDefaultVariableModeByCollectionIdFn);
  const variableModesByCollectionId = useSelector(selectVariableModesByCollectionIdFn);
  const selectedCollectionModes = useSelector(selectSelectedCollectionModes);

  return {
    allVariableModes,
    selectedVariableMode,
    variableModesByType,
    variableModesByVariableModeGroupId,
    variableModesByModeGroupType,
    defaultVariableModeByIds,
    defaultVariableModeByCollectionId,
    variableModesByCollectionId,
    selectedCollectionModes,
  };
};

export const useVariableMode = () => {
  const variableModeById = useSelector(selectVariableModeByIdFn);
  return {
    variableModeById,
  };
};

export const useVariableModesByIds = (ids) => {
  const variableModes = useSelector(state => selectVariableModesByIds(state, ids));

  return {
    variableModes,
  };
};

export const selectDefaultVariableModeByIdsFn = createSelector(
  [(state) => state],
  (state) => (ids) => selectDefaultVariableModeByIds(state, ids),
);

export const selectVariableModeByIdFn = createSelector(
  [(state) => state],
  (state) => (id) => selectVariableModeById(state, id),
);

export const selectVariableModesByTypeFn = createSelector(
  [(state) => state],
  (state) => (type) => selectVariableModesByType(state, type),

);

export const selectVariableModesByVariableModeGroupIdFn = createSelector(
  [(state) => state],
  (state) => (modeGroupId) => selectVariableModesByVariableModeGroupId(state, modeGroupId),
);

export const selectVariableModesByModeGroupTypeFn = createSelector(
  [(state) => state],
  (state) => (modeGroupType) => selectVariableModesByModeGroupType(state, modeGroupType),
);

export const selectDefaultVariableModeByCollectionIdFn = createSelector(
  [(state) => state],
  (state) => (collectionId) => selectDefaultVariableModeByCollectionId(state, collectionId),
);

const selectVariableModesByCollectionIdFn = createSelector(
  [(state) => state],
  (state) => (collectionId) => selectVariableModesByCollectionId(state, collectionId),
);
