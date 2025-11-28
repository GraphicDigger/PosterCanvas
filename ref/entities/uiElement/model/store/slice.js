import { createSlice } from '@reduxjs/toolkit';
import { ENTITY_KINDS } from '../../../../shared/constants';
import { initialElementQuery, actionsElementQuery } from './actionsElementQuery';
import { initialElementUI, actionsElementUI } from './actionsElementUI';
import { actionsElementMutation } from './actionsElementMutation';

const initialState = {
  ...initialElementQuery,
  ...initialElementUI,

};

const elementEntitySlice = createSlice({
  name: 'elementEntity',
  initialState,
  reducers: {
    ...actionsElementUI,
    ...actionsElementQuery,
    ...actionsElementMutation,
  },
});


export const {

  setElements,

  setElementStyles,
  setElementStyle,
  updateElementStyle,
  removeElementStyle,

  updateElementAttributes,
  removeElementAttributes,

  updateElementContent,
  removeElementContent,

  updateElementBindings,
  removeElementBindings,

  setHoveredElementId,
  setFocusedElementId,
  setSelectedElementId,
  resetFocusedElementId,
  resetSelectedElementId,

  addElement,
  addElements,
  updateElement,
  removeElement,


} = elementEntitySlice.actions;

export default elementEntitySlice.reducer;
