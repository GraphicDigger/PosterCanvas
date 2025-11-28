import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { ENTITY_KINDS } from '../../../../shared/constants';
import { useVariableModeMutation, VARIABLE_MODE_TYPE, useVariableModes } from '../../../../entities/varMode';
import { useVariableModeGroup, VARIABLE_MODE_GROUP_TYPE } from '../../../../entities/varModeGroup';
// Tokens
import { useTokenCollection } from '../../../../entities/varTokenCollection';
import { useTokenValues, useTokenValueMutation } from '../../../../entities/varTokenValue';
// Presets
import { usePresetCollectionMutation, usePresetCollections, selectPresetCollectionById } from '../../../../entities/varPresetCollection';
import { usePresetModeValueMutation, usePresetModeValues } from '../../../../entities/varPresetModeValue';
import { usePresets } from '../../../../entities/varPreset';


export const useBindCollectionToVariableModeGroup = ({ type, collectionId }) => {

  const { addVariableMode } = useVariableModeMutation();
  const { defaultVariableModeByIds, variableModesByModeGroupType } = useVariableModes();
  const { variableModeGroupById } = useVariableModeGroup();
  // Tokens
  const { getTokenCollectionById, updateTokenCollection, collectionTokensAndModes } = useTokenCollection();
  const { tokenValuesByVariableModeIdAndTokenIds, tokenValuesByTokenIds } = useTokenValues();
  const tokenCollection = getTokenCollectionById(collectionId);
  const { addTokenValue, removeTokenValues } = useTokenValueMutation();
  // Presets
  const { updatePresetCollection } = usePresetCollectionMutation();
  const { presetCollectionById, selectedPresetCollection, selectedPresetCollectionId } = usePresetCollections();
  const { addPresetModeValue, removePresetModeValues } = usePresetModeValueMutation();
  const { presetModeValuesByVariableModeIdAndPresetIds, presetModeValuesByPresetIds } = usePresetModeValues();
  const { collectionPresetsAndModes } = usePresets();

  const { presets: collectionPresets } = collectionPresetsAndModes;

  let currentCollection;
  let defaultModeValues;

  if (type === VARIABLE_MODE_TYPE.TOKEN_MODE) {
    currentCollection = tokenCollection;
    const defaultVariableMode = defaultVariableModeByIds(currentCollection?.variableModeIds);
    defaultModeValues = tokenValuesByVariableModeIdAndTokenIds(defaultVariableMode?.id, collectionTokensAndModes?.tokens?.map(token => token.id));

  } else {
    currentCollection = selectedPresetCollection;
    const defaultVariableMode = defaultVariableModeByIds(currentCollection?.variableModeIds);
    defaultModeValues = presetModeValuesByVariableModeIdAndPresetIds(defaultVariableMode?.id, collectionPresets.map(preset => preset?.id));
  }

  const handleBindToVariableModeGroup = (modeGroupType) => {
    if (!currentCollection) {return;}

    const modes = variableModesByModeGroupType(modeGroupType);
    const modesIds = modes.map(m => m.id);

    if (type === VARIABLE_MODE_TYPE.TOKEN_MODE) {
      const tokenValues = tokenValuesByTokenIds(collectionTokensAndModes?.tokens?.map(token => token.id));
      removeTokenValues(tokenValues.map(value => value?.id));
    } else {
      const presetValues = presetModeValuesByPresetIds(collectionPresets.map(preset => preset?.id));
      removePresetModeValues(presetValues.map(value => value?.id));
    }

    defaultModeValues.forEach(value => {
      modes.forEach(mode => {
        if (type === VARIABLE_MODE_TYPE.TOKEN_MODE) {
          const modeValue = {
            ...value,
            id: 'token-mode-value-' + uuidv4(),
            variableModeId: mode.id,
            tokenId: value.tokenId,
            value: mode.isDefault ? value.value : undefined,
            kind: ENTITY_KINDS.TOKEN_MODE_VALUE,
          };
          addTokenValue(modeValue);
        } else {
          const modeValue = {
            ...value,
            id: 'preset-mode-value-' + uuidv4(),
            variableModeId: mode.id,
            value: mode.isDefault ? value.value : {},
            presetId: value.presetId,
            kind: ENTITY_KINDS.PRESET_MODE_VALUE,
          };
          addPresetModeValue(modeValue);
        }
      });
    });

    if (type === VARIABLE_MODE_TYPE.TOKEN_MODE) {
      updateTokenCollection(currentCollection.id, { variableModeIds: modesIds });
    } else {
      updatePresetCollection(currentCollection.id, { variableModeIds: modesIds });
    }
  };

  const handleUnbindFromVariableModeGroup = () => {
    if (!currentCollection) {return;}

    const modeId = `${type}-mode-${uuidv4()}`;
    const mode = {
      id: modeId,
      type: type,
      isDefault: true,
    };

    if (type === VARIABLE_MODE_TYPE.TOKEN_MODE) {
      const tokenValues = tokenValuesByTokenIds(collectionTokensAndModes?.tokens?.map(token => token.id));
      removeTokenValues(tokenValues.map(value => value?.id));
    } else {
      const presetValues = presetModeValuesByPresetIds(collectionPresets.map(preset => preset?.id));
      removePresetModeValues(presetValues.map(value => value?.id));
    }

    defaultModeValues.forEach(value => {
      if (type === VARIABLE_MODE_TYPE.TOKEN_MODE) {
        const modeValue = {
          ...value,
          variableModeId: modeId,
          tokenId: value.tokenId,
          kind: ENTITY_KINDS.TOKEN_MODE_VALUE,
        };
        addTokenValue(modeValue);
      } else {
        const modeValue = {
          ...value,
          variableModeId: modeId,
          presetId: value.presetId,
          kind: ENTITY_KINDS.PRESET_MODE_VALUE,
        };
        addPresetModeValue(modeValue);
      }
    });

    addVariableMode(mode);

    if (type === VARIABLE_MODE_TYPE.TOKEN_MODE) {
      updateTokenCollection(currentCollection.id, { variableModeIds: [modeId] });
    } else {
      updatePresetCollection(currentCollection.id, { variableModeIds: [modeId] });
    }
  };

  return {
    bindCollectionToVariableModeGroup: handleBindToVariableModeGroup,
    unbindCollectionFromVariableModeGroup: handleUnbindFromVariableModeGroup,
  };
};
