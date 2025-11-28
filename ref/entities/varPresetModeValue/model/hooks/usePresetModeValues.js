import { useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import {
  selectAllPresetModeValues,
  selectSelectedPresetModeValue,
  selectPresetModeValuesByIds,
  selectPresetModeValueById,
  selectPresetModeValuesByVariableModeId,
  selectPresetModeValuesByVariableModeIdAndPresetIds,
  selectPresetModeValuesByPresetIds,
  selectPresetModeValueByPresetIdAndVariableModeId,
} from '../store';

export const usePresetModeValues = () => {
  const allPresetModeValues = useSelector(selectAllPresetModeValues);
  const selectedPresetModeValue = useSelector(selectSelectedPresetModeValue);
  const presetModeValuesByVariableModeId = useSelector(selectPresetModeValuesByVariableModeIdFn);
  const presetModeValuesByVariableModeIdAndPresetIds = useSelector(selectPresetModeValuesByVariableModeIdAndPresetIdsFn);
  const presetModeValuesByPresetIds = useSelector(selectPresetModeValuesByPresetIdsFn);
  const presetModeValueByPresetIdAndVariableModeId = useSelector(selectPresetModeValueByPresetIdAndVariableModeIdFn);
  return {
    allPresetModeValues,
    selectedPresetModeValue,
    presetModeValuesByVariableModeId,
    presetModeValuesByPresetIds,
    presetModeValuesByVariableModeIdAndPresetIds,
    presetModeValueByPresetIdAndVariableModeId,
  };
};

export const usePresetModeValuesByIds = (ids) => {
  const presetModeValues = useSelector(state => selectPresetModeValuesByIds(state, ids));
  const presetModeValuesByIds = useSelector(selectPresetModeValuesByIdsFn);
  return {
    presetModeValues,
    presetModeValuesByIds,
  };
};

export const usePresetModeValue = (id) => {
  const presetModeValue = useSelector(state => selectPresetModeValueById(state, id));
  const presetModeValueById = useSelector(selectPresetModeValueByIdFn);
  return {
    presetModeValue,
    presetModeValueById,
  };
};

const selectPresetModeValueByIdFn = createSelector(
  [(state) => state],
  (state) => (id) => selectPresetModeValueById(state, id),
);

const selectPresetModeValuesByVariableModeIdFn = createSelector(
  [(state) => state],
  (state) => (id) => selectPresetModeValuesByVariableModeId(state, id),
);

const selectPresetModeValuesByIdsFn = createSelector(
  [(state) => state],
  (state) => (ids) => selectPresetModeValuesByIds(state, ids),
);

const selectPresetModeValuesByVariableModeIdAndPresetIdsFn = createSelector(
  [(state) => state],
  (state) => (variableModeId, collectionPresetIds) => selectPresetModeValuesByVariableModeIdAndPresetIds(state, variableModeId, collectionPresetIds),
);

const selectPresetModeValuesByPresetIdsFn = createSelector(
  [(state) => state],
  (state) => (presetIds) => selectPresetModeValuesByPresetIds(state, presetIds),
);

const selectPresetModeValueByPresetIdAndVariableModeIdFn = createSelector(
  [(state) => state],
  (state) => (presetId, variableModeId) => selectPresetModeValueByPresetIdAndVariableModeId(state, presetId, variableModeId),
);
