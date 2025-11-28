import { createSlice } from '@reduxjs/toolkit';
import { initialUIState, actionsUIState } from './uiStates/actions';
import { initialEntities, actionsQueries } from './queries/actions';
import { actionsMutation } from './mutation/actions';

const initialState = {
  ...initialUIState,
  ...initialEntities,
};

const dataRecordEntitySlice = createSlice({
  name: 'dataRecordEntity',
  initialState,
  reducers: {
    ...actionsUIState,
    ...actionsQueries,
    ...actionsMutation,
  },
});

export const {
  setRecords,

  setHoveredRecordId,
  setFocusedRecordId,
  setSelectedRecordId,
  resetSelectedRecord,

  addDataRecord,
  updateRecord,
  removeDataRecord,
} = dataRecordEntitySlice.actions;

export { dataRecordEntitySlice as dataRecordSlice };
export default dataRecordEntitySlice.reducer;
