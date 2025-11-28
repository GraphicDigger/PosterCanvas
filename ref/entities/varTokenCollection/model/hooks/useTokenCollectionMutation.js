import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { addTokenCollection, removeTokenCollection, updateTokenCollection } from '../store';

export const useTokenCollectionMutation = () => {
  const dispatch = useDispatch();

  const handleAddTokenCollection = useCallback((collection) => {
    dispatch(addTokenCollection(collection));
  }, [dispatch]);

  const handleRemoveTokenCollection = useCallback((collectionId) => {
    dispatch(removeTokenCollection(collectionId));
  }, [dispatch]);

  const handleUpdateTokenCollection = useCallback((collectionId, updates) => {
    dispatch(updateTokenCollection({ id: collectionId, updates }));
  }, [dispatch]);

  return {
    addTokenCollection: handleAddTokenCollection,
    removeTokenCollection: handleRemoveTokenCollection,
    updateTokenCollection: handleUpdateTokenCollection,
  };
};
