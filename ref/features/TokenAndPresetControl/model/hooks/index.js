import { useBindCollectionToVariableModeGroup } from './useBindCollectionToVariableModeGroup';
import { useVariableMode } from './useVariableMode';
import { usePresets } from './usePresets';
import { useTokens } from './useTokens';
import { useCollections } from './useCollections';
import { useBindPresetToTypography } from './useBindPresetToTypography';

export const useTokenAndPresetControl = (
  {
    type,
    collectionId,
    element,
  } = {},
) => {

  const {
    bindCollectionToVariableModeGroup,
    unbindCollectionFromVariableModeGroup,
  } = useBindCollectionToVariableModeGroup({ type, collectionId });

  const {
    bindPresetToTypography,
    removePresetBindingFromTypography,
  } = useBindPresetToTypography(element);

  const { addVariableMode, removeVariableMode } = useVariableMode({ type, collectionId });

  const { removeCollection, addCollection } = useCollections();

  const { addToken } = useTokens();

  const { addTypographyPreset } = usePresets();

  return {
    addVariableMode,
    removeVariableMode,

    bindCollectionToVariableModeGroup,
    unbindCollectionFromVariableModeGroup,
    removeCollection,
    addCollection,

    bindPresetToTypography,
    removePresetBindingFromTypography,

    addToken,
    addTypographyPreset,
  };
};
