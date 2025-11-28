import { useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import {
  selectAllPresetCollections,
  selectSelectedPresetCollection,
  selectSelectedPresetCollectionId,
  selectTypographyPresetCollection,
  selectPresetCollectionById,
} from '../store/selectors';
import { COLLECTION_TYPES } from '../constants/collectionTypes';

export const usePresetCollections = () => {

  const selectedPresetCollectionId = useSelector(selectSelectedPresetCollectionId);
  const selectedPresetCollection = useSelector(selectSelectedPresetCollection);
  const allPresetCollections = useSelector(selectAllPresetCollections);
  const typographyPresetCollection = useSelector(selectTypographyPresetCollection);
  const presetCollectionById = useSelector(selectPresetCollectionByIdFn);


  return {
    allPresetCollections,
    selectedPresetCollection,
    selectedPresetCollectionId,
    typographyPresetCollection,
    presetCollectionById,
  };
};


const selectPresetCollectionByIdFn = createSelector(
  [(state) => state],
  (state) => (collectionId) => selectPresetCollectionById(state, collectionId),
);
