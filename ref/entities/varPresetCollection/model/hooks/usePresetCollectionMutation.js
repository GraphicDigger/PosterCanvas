import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { addPresetCollection, removePresetCollection, updatePresetCollection } from '../store';
import { usePresetMutation, usePresets } from '../../@x/preset';
import { useVariableModes } from '../../@x/variableMode';
import { usePresetModeValues } from '../../@x/presetModeValue';
import { usePresetCollectionStates } from './usePresetCollectionStates';
import { usePresetCollections } from './usePresetCollections';


export const usePresetCollectionMutation = () => {

  const dispatch = useDispatch();

  const handleAddPresetCollection = useCallback((collection) => {
    dispatch(addPresetCollection(collection));
  }, [dispatch]);

  const handleRemovePresetCollection = (collectionId) => {
    dispatch(removePresetCollection(collectionId));
  };

  const handleUpdatePresetCollection = (collectionId, updates) => {
    dispatch(updatePresetCollection({ id: collectionId, updates }));
  };

  return {
    addPresetCollection: handleAddPresetCollection,
    removePresetCollection: handleRemovePresetCollection,
    updatePresetCollection: handleUpdatePresetCollection,
  };
};
