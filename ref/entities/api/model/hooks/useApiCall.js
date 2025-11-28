import { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  addCall,
  removeCall,
  updateCallValue,
  addCallHeader,
  removeCallHeader,
  addCallParameter,
  removeCallParameter,
  updateCallHeader,
  updateCallParameter,
  updateCallUseAs,
  updateCallDataType,
  updateCallRequestType,
} from '../store/slice';
import {
  selectApiCallById,
  selectApiCalls,
} from '../store/mutation/selectors';
import {
  selectSelectedApiId,
  selectSelectedCallId,
} from '../store/states/selectors';


// Хук для работы с выбранным API-вызовом (call)

export const useApiCall = () => {
  const selectedApiId = useSelector(selectSelectedApiId);
  const selectedCallId = useSelector(selectSelectedCallId);

  const selectedCall = useSelector(state =>
    selectedApiId && selectedCallId ? selectApiCallById(state, selectedApiId, selectedCallId) : null,
  );

  return {
    selectedCallId,
    selectedCall,
  };
};

export const useApiCallMutations = () => {
  const dispatch = useDispatch();

  const selectedApiId = useSelector(selectSelectedApiId);
  const selectedCallId = useSelector(selectSelectedCallId);

  const handleAddCall = () => {
    dispatch(addCall({ apiId: selectedApiId }));
  };

  const handleRemoveCall = (callId) => {
    dispatch(removeCall({ apiId: selectedApiId, callId }));
  };

  const handleUpdateCallValue = (value) => {
    dispatch(updateCallValue({ apiId: selectedApiId, callId: selectedCallId, value }));
  };

  const handleUpdateCallUseAs = (useAs) => {
    dispatch(updateCallUseAs({ apiId: selectedApiId, callId: selectedCallId, useAs }));
  };

  const handleUpdateCallDataType = (dataType) => {
    dispatch(updateCallDataType({ apiId: selectedApiId, callId: selectedCallId, dataType }));
  };

  const handleUpdateCallRequestType = (requestType) => {
    dispatch(updateCallRequestType({ apiId: selectedApiId, callId: selectedCallId, requestType }));
  };

  const handleAddCallHeader = () => {
    dispatch(addCallHeader({ apiId: selectedApiId, callId: selectedCallId }));
  };

  const handleRemoveCallHeader = (headerId) => {
    dispatch(removeCallHeader({ apiId: selectedApiId, callId: selectedCallId, headerId }));
  };

  const handleUpdateCallHeaderKey = (headerId, value) => {
    dispatch(updateCallHeader({ apiId: selectedApiId, callId: selectedCallId, headerId, field:'key', value }));
  };

  const handleUpdateCallHeaderValue = (headerId, value) => {
    dispatch(updateCallHeader({ apiId: selectedApiId, callId: selectedCallId, headerId, field:'value', value }));
  };

  const handleAddCallParameter = () => {
    dispatch(addCallParameter({ apiId: selectedApiId, callId: selectedCallId }));
  };

  const handleRemoveCallParameter = (parameterId) => {
    dispatch(removeCallParameter({ apiId: selectedApiId, callId: selectedCallId, parameterId }));
  };

  const handleUpdateCallParameterKey = (parameterId, value) => {
    dispatch(updateCallParameter({ apiId: selectedApiId, callId: selectedCallId, parameterId, field:'key', value }));
  };

  const handleUpdateCallParameterValue = (parameterId, value) => {
    dispatch(updateCallParameter({ apiId: selectedApiId, callId: selectedCallId, parameterId, field:'value', value }));
  };


  return {
    addCall: handleAddCall,
    removeCall: handleRemoveCall,

    updateCallValue: handleUpdateCallValue,
    updateCallUseAs: handleUpdateCallUseAs,
    updateCallDataType: handleUpdateCallDataType,
    updateCallRequestType: handleUpdateCallRequestType,

    addCallHeader: handleAddCallHeader,
    removeCallHeader: handleRemoveCallHeader,
    updateCallHeaderKey: handleUpdateCallHeaderKey,
    updateCallHeaderValue: handleUpdateCallHeaderValue,

    addCallParameter: handleAddCallParameter,
    removeCallParameter: handleRemoveCallParameter,
    updateCallParameterKey: handleUpdateCallParameterKey,
    updateCallParameterValue: handleUpdateCallParameterValue,
  };
};
