
export const initialUIState = {
  hoveredModelId: null,
  focusedModelId: null,
  selectedModelId: null,
  isLoading: false,
  error: null,
};

export const actionsUIState = {
  setHoveredModelId: (state, action) => {
    state.ui.hoveredModelId = action.payload;
  },

  setFocusedModelId: (state, action) => {
    state.ui.focusedModelId = action.payload;
  },

  setSelectedModelId: (state, action) => {
    state.ui.selectedModelId = action.payload;
  },

  setLoading: (state, action) => {
    state.ui.isLoading = action.payload;
  },

  setError: (state, action) => {
    state.ui.error = action.payload;
  },
};
