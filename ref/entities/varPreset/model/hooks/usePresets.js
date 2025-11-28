import { useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import {
  selectAllPresets,
  selectSelectedPreset,
  selectTypographyCollectionPresets,
  selectPresetsByCollectionId,
  selectPresetById,
  selectCollectionPresetsAndModes,
} from '../store/selectors';
import { selectSelectedPresetCollectionId } from '../../@x/presetCollection';


export const usePresets = () => {

  const allPresets = useSelector(selectAllPresets);
  const selectedPresetCollectionId = useSelector(selectSelectedPresetCollectionId);
  const selectedPreset = useSelector(selectSelectedPreset);
  const typographyCollectionPresets = useSelector(selectTypographyCollectionPresets);
  const getCollectionPresetsAndModes = useSelector(selectCollectionPresetsAndModesFn);
  const collectionPresetsAndModes = getCollectionPresetsAndModes(selectedPresetCollectionId);

  return {
    allPresets,
    selectedPreset,
    typographyCollectionPresets,
    getCollectionPresetsAndModes,
    collectionPresetsAndModes,
  };
};

export const usePreset = (id) => {

  const preset = useSelector(state => selectPresetById(state, id));
  const presetById = useSelector(selectPresetByIdFn);

  return {
    preset,
    presetById,
  };
};

export const useSelectedPreset = () => {
  const selectedPreset = useSelector(selectSelectedPreset);
  return { selectedPreset };
};


const selectPresetByIdFn = createSelector(
  [(state) => state],
  (state) => (id) => selectPresetById(state, id),
);

const selectCollectionPresetsAndModesFn = createSelector(
  [(state) => state],
  (state) => (collectionId) => selectCollectionPresetsAndModes(state, collectionId),
);
