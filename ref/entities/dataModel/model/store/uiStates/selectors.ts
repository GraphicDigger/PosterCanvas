import { selectUI } from '../selectors';
import { createSelector } from '@reduxjs/toolkit';
import type { DataModelState } from '../../../types';

// UI selectors
export const selectSelectedModelId = (state: { dataModelEntity: DataModelState }) =>
  selectUI(state).selectedModelId;

export const selectHoveredModelId = (state: { dataModelEntity: DataModelState }) =>
  selectUI(state).hoveredModelId;

export const selectFocusedModelId = (state: { dataModelEntity: DataModelState }) =>
  selectUI(state).focusedModelId;

export const selectIsLoading = (state: { dataModelEntity: DataModelState }) =>
  selectUI(state).isLoading;

export const selectError = (state: { dataModelEntity: DataModelState }) =>
  selectUI(state).error;

// Field states selector
export const selectDataModelCheckStates = createSelector(
  [selectSelectedModelId, selectFocusedModelId, selectHoveredModelId, (state: { dataModelEntity: DataModelState }, id: string) => id],
  (selectedId, focusedId, hoveredId, modelId) => ({
    isSelected: selectedId === modelId,
    isFocused: focusedId === modelId,
    isHovered: hoveredId === modelId,
  }),
);

// Model states selector
export const selectDataModelStates = createSelector(
  [selectSelectedModelId, selectFocusedModelId, selectHoveredModelId],
  (selectedId, focusedId, hoveredId) => ({
    selectedModelId: selectedId,
    focusedModelId: focusedId,
    hoveredModelId: hoveredId,
  }),
);
