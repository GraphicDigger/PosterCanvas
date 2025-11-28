import { createSelector } from '@reduxjs/toolkit';


export const selectImporterState = (state) => state.importer || {};

//Селектор для проверки, открыт ли импортер
export const selectIsImporterOpen = createSelector(
  [selectImporterState],
  (importerState) => importerState.isImporterOpen || false,
);
