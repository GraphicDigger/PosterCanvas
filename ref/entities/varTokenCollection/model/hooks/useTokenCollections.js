import { useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import {
  selectAllTokenCollections,
  selectSelectedTokenCollection,
  selectCollectionTokensAndModes,
  selectTokenCollectionById,
} from '../store';


export const useCollections = () => {

  const allTokenCollections = useSelector(selectAllTokenCollections);

  return {
    allTokenCollections,
  };
};


export const useCollection = () => {

  const selectedTokenCollection = useSelector(selectSelectedTokenCollection);
  const selectedTokenCollectionId = selectedTokenCollection?.id;
  const getCollectionTokensAndModesByCollectionId = useSelector(selectCollectionTokensAndModesFn);
  const getTokenCollectionById = useSelector(selectTokenCollectionByIdFn);
  const collectionTokensAndModes = getCollectionTokensAndModesByCollectionId(selectedTokenCollection?.id);

  return {
    selectedTokenCollection,
    selectedTokenCollectionId,
    collectionTokensAndModes,
    getCollectionTokensAndModesByCollectionId,
    getTokenCollectionById,
  };
};

const selectCollectionTokensAndModesFn = createSelector(
  [(state) => state],
  (state) => (collectionId) => selectCollectionTokensAndModes(state, collectionId),
);

const selectTokenCollectionByIdFn = createSelector(
  [(state) => state],
  (state) => (collectionId) => selectTokenCollectionById(state, collectionId),
);

