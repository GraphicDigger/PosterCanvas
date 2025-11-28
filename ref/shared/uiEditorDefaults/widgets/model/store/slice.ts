import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { initialUIState, actionsUIState } from './actionsStates';
import { actionsQueries } from './actionsQueries';
import { actionsMutation } from './actionsMutation';
import type { UiDefaultEntityState, UiDefaultEntity } from '../../types';

export const defaultWidgetsAdapter = createEntityAdapter<DefaultWidget>({
  selectId: (entity) => entity.id || entity.name || `entity-${Date.now()}-${Math.random()}`,
});

export const initialEntities = defaultWidgetsAdapter.getInitialState();

const initialState: UiDefaultEntityState = {
  ...initialEntities,
  ...initialUIState,
};

const defaultWidgetsSlice = createSlice({
  name: 'defaultWidgets',
  initialState,
  reducers: {
    ...actionsUIState,
    ...actionsQueries,
    ...actionsMutation,
  },
});

export const {

  setDefaultWidgets,

  setHoveredDefaultWidgetId,
  setFocusedDefaultWidgetId,
  setSelectedDefaultWidgetId,
  resetSelectedDefaultWidget,

  addDefaultWidget,
  updateDefaultWidget,
  removeDefaultWidget,

} = defaultWidgetsSlice.actions;

export default defaultWidgetsSlice.reducer;
