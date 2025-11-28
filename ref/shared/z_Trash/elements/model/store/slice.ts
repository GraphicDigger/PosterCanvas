import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { initialUIState, actionsUIState } from './actionsStates';
import { actionsQueries } from './actionsQueries';
import type { DefaultElementsState, DefaultElement } from '../../types';

export const defaultElementsAdapter = createEntityAdapter<DefaultElement>({
  selectId: (entity: DefaultElement) => entity.id || entity.name || `entity-${Date.now()}-${Math.random()}`,
});

export const initialEntities = defaultElementsAdapter.getInitialState();

const initialState: DefaultElementsState = {
  ...initialEntities,
  ...initialUIState,
};

const defaultElementsSlice = createSlice({
  name: 'defaultElements',
  initialState,
  reducers: {
    ...actionsUIState,
    ...actionsQueries,
  },
});

export const {

  setDefaultElements,

  setHoveredDefaultElementId,
  setFocusedDefaultElementId,
  setSelectedDefaultElementId,
  resetSelectedDefaultElement,

} = defaultElementsSlice.actions;

export default defaultElementsSlice.reducer;
