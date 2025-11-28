import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { ENTITY_KINDS } from '../../../../shared/constants';
import { useVariableModeMutation, VARIABLE_MODE_TYPE, useVariableModes } from '../../../../entities/varMode';
import { useVariableModeGroup, VARIABLE_MODE_GROUP_TYPE } from '../../../../entities/varModeGroup';
import { useTokenCollection } from '../../../../entities/varTokenCollection';
import { usePresetCollectionMutation, selectPresetCollectionById, usePresetCollections } from '../../../../entities/varPresetCollection';
import { usePresetModeValueMutation } from '../../../../entities/varPresetModeValue';
import { usePresets } from '../../../../entities/varPreset';
import { useTokenValueMutation } from '../../../../entities/varTokenValue';


export const useVariableMode = ({ type, collectionId }) => {
  const { addVariableMode } = useVariableModeMutation();
  const { defaultVariableModeByIds } = useVariableModes();
  const { variableModeGroupById } = useVariableModeGroup();
  const { getTokenCollectionById, updateTokenCollection, collectionTokensAndModes } = useTokenCollection();
  const { presetCollectionById } = usePresetCollections();
  const { updatePresetCollection } = usePresetCollectionMutation();
  const { collectionPresetsAndModes } = usePresets();
  const { addPresetModeValue, removePresetModeValue, removePresetModeValuesByVariableModeId } = usePresetModeValueMutation();
  const { addTokenValue, removeTokenValuesByVariableModeId } = useTokenValueMutation();
  const { removeVariableMode } = useVariableModeMutation();

  const { presets: collectionPresets } = collectionPresetsAndModes;

  const handleAddVariableMode = () => {
    const modeId = `${type}-mode-${uuidv4()}`;
    let collection;

    if (type === VARIABLE_MODE_TYPE.TOKEN_MODE) {
      collection = getTokenCollectionById(collectionId);
    } else {
      collection = presetCollectionById(collectionId);
    }

    if (!collection) {return;}

    const currentDefaultMode = defaultVariableModeByIds(collection.variableModeIds);
    const modeGroup = currentDefaultMode?.modeGroup;

    let mode = {};

    if (modeGroup?.type === VARIABLE_MODE_GROUP_TYPE.BREAKPOINT) {
      mode = {
        id: modeId,
        modeGroupId: modeGroup.id,
        meta: { maxWidth: '', minWidth: '' },
        isDefault: false,
        isGlobal: true,
        isProtected: false,
      };
    } else if (modeGroup?.type === VARIABLE_MODE_GROUP_TYPE.THEME) {
      mode = {
        id: modeId,
        modeGroupId: modeGroup.id,
        meta: { value: '' },
        isDefault: false,
        isGlobal: true,
        isProtected: false,
      };
    } else {
      mode = {
        id: modeId,
        isDefault: false,
        type: type,
      };
    }

    if (type === VARIABLE_MODE_TYPE.TOKEN_MODE) {
      const tokenValue = collectionTokensAndModes.tokens.forEach(token => {
        addTokenValue({
          variableModeId: modeId,
          tokenId: token.id,
        });
      });
      updateTokenCollection(collectionId, { variableModeIds: [...collection.variableModeIds, modeId] });
    } else {
      const presetModeValue = collectionPresets.forEach(preset => {
        addPresetModeValue({
          variableModeId: modeId,
          presetId: preset.id,
        });
      });
      addPresetModeValue(presetModeValue);
      updatePresetCollection(collectionId, { variableModeIds: [...collection.variableModeIds, modeId] });
    }
    addVariableMode(mode);
  };

  const handleRemoveVariableMode = (variableModeId) => {
    if (type === VARIABLE_MODE_TYPE.TOKEN_MODE) {
      const collection = getTokenCollectionById(collectionId);
      removeVariableMode(variableModeId);
      removeTokenValuesByVariableModeId(variableModeId);
      updateTokenCollection(collectionId, { variableModeIds: collection.variableModeIds.filter(id => id !== variableModeId) });
    } else {
      const collection = presetCollectionById(collectionId);
      removeVariableMode(variableModeId);
      removePresetModeValuesByVariableModeId(variableModeId);
      updatePresetCollection(collectionId, { variableModeIds: collection.variableModeIds.filter(id => id !== variableModeId) });
    }
  };

  return {
    addVariableMode: handleAddVariableMode,
    removeVariableMode: handleRemoveVariableMode,
  };
};
