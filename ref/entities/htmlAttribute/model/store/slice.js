import { createSlice } from '@reduxjs/toolkit';
import { initialUIState, actionsUIState } from './uiStates/actions';
import { initialEntities, actionsQueries } from './queries/actions';
import { actionsMutation } from './mutation/actions';

const initialState = {
  ...initialEntities,
  ...initialUIState,
};

const htmlAttrEntitySlice = createSlice({
  name: 'htmlAttrEntity',
  initialState,
  reducers: {
    ...actionsUIState,
    ...actionsQueries,
    ...actionsMutation,
  },
});

export const {

  setHtmlAttrs,

  setHoveredHtmlAttrId,
  setFocusedHtmlAttrId,
  setSelectedHtmlAttrId,

  addHtmlAttr,
  updateHtmlAttr,
  removeHtmlAttr,

} = htmlAttrEntitySlice.actions;

export default htmlAttrEntitySlice.reducer;
