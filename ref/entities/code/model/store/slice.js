import { createSlice } from '@reduxjs/toolkit';
import { initialCodeState, actionsCode } from './actionsCode';
import { CODE_TYPES } from '../constants/codeTypes';
import { ENTITY_KINDS } from '../../../../shared/constants';


const initialState = {
  ...initialCodeState,
};

const codeEntitySlice = createSlice({
  name: 'codeEntity',
  initialState,
  reducers: {
    // codes
    setHoveredCodeId: actionsCode.setHoveredCodeId,
    setFocusedCodeId: actionsCode.setFocusedCodeId,
    setSelectedCodeId: actionsCode.setSelectedCodeId,
    resetSelectedCode: actionsCode.resetSelectedCode,
    setCodes: actionsCode.setCodes,
    updateCode: actionsCode.updateCode,
    addCode: actionsCode.addCode,
  },
});

export const {
  // codes
  setHoveredCodeId,
  setFocusedCodeId,
  setSelectedCodeId,
  resetSelectedCode,
  setCodes,
  updateCode,
  addCode,
} = codeEntitySlice.actions;

export default codeEntitySlice.reducer;
