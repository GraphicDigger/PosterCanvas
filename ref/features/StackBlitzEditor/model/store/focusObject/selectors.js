import { createSelector } from '@reduxjs/toolkit';

export const selectFocusedObject = (state) => state.stackBlitz?.focusObject || null;
export const selectObjectMetrics = (state) => state.stackBlitz?.objectMetrics || null;
export const selectIsSelecting = (state) => state.stackBlitz?.isSelecting || false;
export const selectError = (state) => state.stackBlitz?.error || null;


export const selectFocusObjectStates = createSelector(
  [selectFocusedObject, selectObjectMetrics, selectIsSelecting, selectError],
  (id, objectMetrics, isSelecting, error) => ({
    id,
    objectMetrics,
    isSelecting,
    error,
  }),
);

