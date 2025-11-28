import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from 'react-redux';
import { addPreset, updatePreset, removePreset, removePresetsFromCollection } from '../store';
import { ENTITY_KINDS } from '../../../../shared/constants';
import { addPresetModeValue } from '../../@x/presetModeValue';
import { usePresetCollections } from '../../@x/presetCollection';
import { PRESET_TYPES } from '../constants/presetTypes';
import { useVariableModes } from '../../../varMode';


export const usePresetMutation = () => {
  const dispatch = useDispatch();

  const handleAddPreset = (preset) => {
    if (!preset) {return null;}
    const newPreset = {
      ...preset,
      id: preset.id || uuidv4(),
      kind: preset.kind || ENTITY_KINDS.PRESET,
      name: preset.name || 'New Preset',
      type: preset.type || PRESET_TYPES.TYPOGRAPHY,
    };
    dispatch(addPreset(newPreset));
  };

  const handleUpdatePreset = (preset) => {
    if (!preset) {return null;}
    dispatch(updatePreset(preset));
  };

  const handleRemovePreset = (presetId) => {
    dispatch(removePreset(presetId));
  };

  const handleRemovePresetsFromCollection = (collectionId) => {
    dispatch(removePresetsFromCollection(collectionId));
  };

  return {
    addPreset: handleAddPreset,
    updatePreset: handleUpdatePreset,
    removePreset: handleRemovePreset,
    removePresetsFromCollection: handleRemovePresetsFromCollection,
  };
};
