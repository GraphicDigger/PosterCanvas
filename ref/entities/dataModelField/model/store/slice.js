import { createSlice } from '@reduxjs/toolkit';
import { initialUIState, actionsUIState } from './uiStates/actions';
import { initialEntities, actionsQueries } from './queries/actions';
import { actionsMutation } from './mutation/actions';

const initialState = {
  ...initialEntities,
  ...initialUIState,
  draft: null,
};

const dataModelFieldSlice = createSlice({
  name: 'dataModelFieldEntity',
  initialState,
  reducers: {
    ...actionsUIState,
    ...actionsQueries,
    ...actionsMutation,
  },
});

export const {
  setHoveredModelFieldId,
  setFocusedModelFieldId,
  setSelectedModelFieldId,
  setSelectedModelId,

  addDataModelField,
  addDataModelDefaultFields,
  upsertDataModelFields,
  updateDataModelField,
  updateDataModelFields,
  removeDataModelField,
  setDataModelFieldsForModel,

  setModelFields,

} = dataModelFieldSlice.actions;

export default dataModelFieldSlice.reducer;
