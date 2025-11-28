import { useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { usePresetModeValues } from './usePresetModeValues';
import {
  updatePresetModeValue,
  removePresetModeValue,
  addPresetModeValue,
  removePresetModeValues,
  removePresetModeValuesByVariableModeId,
} from '../store';


export const usePresetModeValueMutation = () => {
  const dispatch = useDispatch();
  const { presetModeValueByPresetIdAndVariableModeId } = usePresetModeValues();

  const handleAddPresetModeValue = (presetModeValue) => {
    dispatch(addPresetModeValue(presetModeValue));
  };

  const handleUpdatePresetModeValue = (presetId, modeId, style) => { // style = { key: value }
    const presetModeValue = presetModeValueByPresetIdAndVariableModeId(presetId, modeId);
    if (!presetModeValue) {return;}
    dispatch(updatePresetModeValue({ id: presetModeValue.id, updates: style }));
  };

  const handleRemovePresetModeValue = (presetModeValueId) => {
    dispatch(removePresetModeValue(presetModeValueId));
  };

  const handleRemovePresetModeValues = (ids) => {
    dispatch(removePresetModeValues( ids ));
  };

  const handleRemovePresetModeValuesByVariableModeId = (variableModeId) => {
    dispatch(removePresetModeValuesByVariableModeId({ variableModeId }));
  };

  return {
    addPresetModeValue: handleAddPresetModeValue,
    updatePresetModeValue: handleUpdatePresetModeValue,
    removePresetModeValue: handleRemovePresetModeValue,
    removePresetModeValues: handleRemovePresetModeValues,
    removePresetModeValuesByVariableModeId: handleRemovePresetModeValuesByVariableModeId,
  };
};
