import { useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ENTITY_KINDS } from '../../../../shared/constants';
import { useVariableModeMutation, VARIABLE_MODE_TYPE } from '../../../../entities/varMode';
// Token
import { useToken } from '../../../../entities/varToken';
import { useTokenCollection } from '../../../../entities/varTokenCollection';
// Preset
import { usePresetCollections, usePresetCollectionMutation, usePresetCollectionStates } from '../../../../entities/varPresetCollection';
import { usePresetMutation } from '../../../../entities/varPreset';


export const useCollections = () => {

  const { addVariableMode } = useVariableModeMutation();

  // Token
  const { removeTokensFromCollection } = useToken();
  const {
    allTokenCollections,
    handleSelect: handleSelectTokenCollection,
    removeTokenCollection,
    addTokenCollection,
  } = useTokenCollection();
  // Preset
  const { allPresetCollections } = usePresetCollections();
  const { handleSelect: handleSelectPresetCollection } = usePresetCollectionStates();
  const { removePresetsFromCollection } = usePresetMutation();
  const { removePresetCollection, addPresetCollection } = usePresetCollectionMutation();

  const handleAddCollection = useCallback((type) => {
    const variableModeId = 'variable-mode-' + uuidv4();
    const collectionId = 'collection-' + uuidv4();
    if (type === ENTITY_KINDS.TOKEN_COLLECTION) {
      addTokenCollection({ id: collectionId, variableModeIds: [variableModeId] });
      addVariableMode({
        id: variableModeId,
        type: VARIABLE_MODE_TYPE.TOKEN_MODE,
        isDefault: true,
      });
      handleSelectTokenCollection(collectionId);
    } else if (type === ENTITY_KINDS.PRESET_COLLECTION) {
      addPresetCollection({ id: collectionId, variableModeIds: [variableModeId] });
      addVariableMode({
        id: variableModeId,
        type: VARIABLE_MODE_TYPE.PRESET_MODE,
        isDefault: true,
      });
      handleSelectPresetCollection(collectionId);
    }
  }, [addTokenCollection, addPresetCollection]);

  const handleRemoveCollection = (collectionId, type) => {
    if (type === ENTITY_KINDS.TOKEN_COLLECTION) {
      removeTokenCollection(collectionId);
      removeTokensFromCollection(collectionId);
      handleSelectTokenCollection(allTokenCollections[0]?.id);
    } else if (type === ENTITY_KINDS.PRESET_COLLECTION) {
      removePresetCollection(collectionId);
      removePresetsFromCollection(collectionId);
      handleSelectPresetCollection(allPresetCollections[0]?.id);
    }
  };

  return {
    addCollection: handleAddCollection,
    removeCollection: handleRemoveCollection,
  };
};
