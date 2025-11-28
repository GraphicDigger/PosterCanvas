import { PayloadAction } from '@reduxjs/toolkit';
import type { DataModelState } from '../../../types';

export const initialUIState = {
  hoveredModelId: null,
  focusedModelId: null,
  selectedModelId: null,
  isLoading: false,
  error: null,
};

export const actionsUIState = {
  setHoveredModelId: (state: DataModelState, action: PayloadAction<string | null>) => {
    state.ui.hoveredModelId = action.payload;
  },

  setFocusedModelId: (state: DataModelState, action: PayloadAction<string | null>) => {
    state.ui.focusedModelId = action.payload;
  },

  setSelectedModelId: (state: DataModelState, action: PayloadAction<string | null>) => {
    state.ui.selectedModelId = action.payload;
  },

  setLoading: (state: DataModelState, action: PayloadAction<boolean>) => {
    state.ui.isLoading = action.payload;
  },

  setError: (state: DataModelState, action: PayloadAction<string | null>) => {
    state.ui.error = action.payload;
  },
};
