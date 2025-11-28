import { createSlice } from '@reduxjs/toolkit';
import { initialUIState, actionsUIState } from './actionsUIStates';
import { initialEntities, actionsQueries } from './actionsQueries';
import { actionsMutation } from './actionsMutations';

const initialState = {
  ...initialEntities,
  ...initialUIState,
};

const eventEntitySlice = createSlice({
  name: 'eventEntity',
  initialState,
  reducers: {
    ...actionsUIState,
    ...actionsQueries,
    ...actionsMutation,
  },
});

export const {
  setEvents,

  setHoveredEventId,
  setFocusedEventId,
  setSelectedEventId,

  addEvent,

} = eventEntitySlice.actions;

export default eventEntitySlice.reducer;
