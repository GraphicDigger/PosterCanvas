import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isImporterOpen: false,
};

export const importerSlice = createSlice({
  name: 'importer',
  initialState,
  reducers: {
    openImporter: (state) => {
      state.isImporterOpen = true;
      console.log('openImporter');
    },
    closeImporter: (state) => {
      state.isImporterOpen = false;

    },
    toggleImporter: (state) => {
      state.isImporterOpen = !state.isImporterOpen;
    },
  },
});

export const {
  openImporter, closeImporter, toggleImporter } = importerSlice.actions;

export default importerSlice.reducer;
