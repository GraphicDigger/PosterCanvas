import { useTokenCollectionMutation } from './useTokenCollectionMutation';
import { useCollection, useCollections } from './useTokenCollections';
import { useTokenCollectionStates } from './useTokenCollectionStates';

export const useTokenCollection = (collectionId) => {
  const {
    addTokenCollection,
    removeTokenCollection,
    updateTokenCollection,
  } = useTokenCollectionMutation();

  const {
    allTokenCollections,
  } = useCollections();

  const {
    selectedTokenCollection,
    selectedTokenCollectionId,
    collectionTokensAndModes,
    getCollectionTokensAndModesByCollectionId,
    getTokenCollectionById,
  } = useCollection();

  const {
    isSelected,
    isFocused,
    isHovered,
    handleSelect,
    handleFocus,
    handleHover,
  } = useTokenCollectionStates(collectionId);

  return {
    addTokenCollection,
    removeTokenCollection,
    updateTokenCollection,

    allTokenCollections,

    selectedTokenCollection,
    selectedTokenCollectionId,
    collectionTokensAndModes,
    getCollectionTokensAndModesByCollectionId,
    getTokenCollectionById,

    isSelected,
    isFocused,
    isHovered,
    handleSelect,
    handleFocus,
    handleHover,
  };
};
