import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialUIState, actionsUIState } from './uiStates/actions';
import { initialEntities, actionsQueries } from './queries/actions';
import { actionsMutation } from './mutation/actions';
import type { DataModel, DataModelState } from '../../types';

const initialState: DataModelState = {
  ...initialEntities,
  ui: {
    selectedModelId: null,
    focusedModelId: null,
    hoveredModelId: null,
    isLoading: false,
    error: null,
  },
  queries: {
    searchTerm: '',
    filterBy: [],
    sortBy: 'name',
    sortOrder: 'asc',
  },
  draft: null,
};

const dataModelSlice = createSlice({
  name: 'dataModelEntity',
  initialState,
  reducers: {
    ...actionsUIState,
    ...actionsQueries,
    ...actionsMutation,
  },
});

export const {
  setModels,
  addDataModel,

  setHoveredModelId,
  setFocusedModelId,
  setSelectedModelId,

  updateModel,
  removeModel,
} = dataModelSlice.actions;

export default dataModelSlice.reducer;
