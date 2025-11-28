import { useDispatch } from 'react-redux';
import { addTokenValue, updateTokenValue, removeTokenValue, removeTokenValues, removeTokenValuesByVariableModeId } from '../store';
import { useTokenValues } from './useTokenValues';

export const useTokenValueMutation = () => {
  const dispatch = useDispatch();
  const { getTokenValueByTokenIdAndVariableModeId } = useTokenValues();

  const handleAddTokenValue = (tokenValue) => {
    dispatch(addTokenValue(tokenValue));
  };
  const handleUpdateTokenValue = (tokenId, modeId, value) => {
    const tokenValue = getTokenValueByTokenIdAndVariableModeId(tokenId, modeId);
    if (!tokenValue) {return;}
    dispatch(updateTokenValue({ id: tokenValue.id, updates: { value } }));
  };
  const handleRemoveTokenValue = (id) => {
    dispatch(removeTokenValue(id));
  };
  const handleRemoveTokenValues = (ids) => {
    dispatch(removeTokenValues(ids));
  };

  const handleRemoveTokenValuesByVariableModeId = (variableModeId) => {
    dispatch(removeTokenValuesByVariableModeId({ variableModeId }));
  };

  return {
    addTokenValue: handleAddTokenValue,
    updateTokenValue: handleUpdateTokenValue,
    removeTokenValue: handleRemoveTokenValue,
    removeTokenValues: handleRemoveTokenValues,
    removeTokenValuesByVariableModeId: handleRemoveTokenValuesByVariableModeId,
  };
};
