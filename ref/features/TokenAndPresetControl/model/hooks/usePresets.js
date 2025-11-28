import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { ENTITY_KINDS } from '../../../../shared/constants';
import { usePresetCollections } from '../../../../entities/varPresetCollection';
import { PRESET_TYPES } from '../../../../entities/varPreset';
import { addPreset } from '../../../../entities/varPreset';
import { addPresetModeValue } from '../../../../entities/varPresetModeValue';
import { useVariableModes } from '../../../../entities/varMode';

export const usePresets = () => {

  const dispatch = useDispatch();
  const { typographyPresetCollection } = usePresetCollections();
  const { variableModesByCollectionId } = useVariableModes();

  const handleAddTypographyPreset = (properties) => {
    if (!properties || !typographyPresetCollection) {return null;}

    const collectionId = typographyPresetCollection?.id;
    const modes = variableModesByCollectionId(collectionId);

    const preset = {
      id: 'preset-' + uuidv4(),
      kind: ENTITY_KINDS.PRESET,
      type: PRESET_TYPES.TYPOGRAPHY,
      name: 'Preset',
      collectionId,
    };
    dispatch(addPreset(preset));

    modes.forEach(mode => {
      const presetValue = {
        id: 'preset-mode-value-' + uuidv4(),
        kind: ENTITY_KINDS.PRESET_MODE_VALUE,
        presetId: preset.id,
        variableModeId: mode.id,
        value: mode.isDefault ? properties : {},
      };
      dispatch(addPresetModeValue(presetValue));
    });
  };

  return {
    addTypographyPreset: handleAddTypographyPreset,
  };
};
