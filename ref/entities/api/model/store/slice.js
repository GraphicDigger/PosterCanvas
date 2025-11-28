import { createSlice } from '@reduxjs/toolkit';
import { actionsUIState, initialUIState } from './states/actions';
import { actionsApiEditor, initialApiEditor } from './mutation/actions';

const initialState = {
  ...initialApiEditor,
  ...initialUIState,
};

const apiEntitySlice = createSlice({
  name: 'apiEntity',
  initialState,
  reducers: {
    ...actionsUIState,
    ...actionsApiEditor,
  },
});

export const {
  setApis,
  addApi,
  removeApi,
  updateApiName,
  updateApiAuthentication,
  updateApiKeyName,
  updateApiKeyValue,

  addApiHeader,
  updateApiHeader,
  removeApiHeader,

  addApiParameter,
  updateApiParameter,
  removeApiParameter,

  setHoveredApiId,
  resetHoveredApiId,
  setFocusedApiId,
  resetFocusedApiId,
  setSelectedApiId,
  resetSelectedApiId,

  addCall,
  removeCall,
  updateCallValue,
  updateCallUseAs,
  updateCallDataType,
  updateCallRequestType,

  addCallHeader,
  removeCallHeader,
  updateCallHeader,

  addCallParameter,
  removeCallParameter,
  updateCallParameter,

  setHoveredCallId,
  resetHoveredCallId,
  setFocusedCallId,
  resetFocusedCallId,
  setSelectedCallId,
  resetSelectedCallId,

  setHoveredCategoryId,
  resetHoveredCategoryId,
  setFocusedCategoryId,
  resetFocusedCategoryId,
  setSelectedCategoryId,
  resetSelectedCategoryId,

} = apiEntitySlice.actions;

export default apiEntitySlice.reducer;
