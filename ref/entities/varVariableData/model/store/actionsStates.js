export const initialUIState = {
  ui: {
    focusedVariableId: null,
    hoveredVariableId: null,
    selectedVariableId: null,
  },
};

export const actionsUIState = {

  setFocusedVariableId: (state, action) => {
    state.ui.focusedVariableId = action.payload;
  },
  setHoveredVariableId: (state, action) => {
    state.ui.hoveredVariableId = action.payload;
  },
  setSelectedVariableId: (state, action) => {
    state.ui.selectedVariableId = action.payload;
  },

  resetSelectedVariableId: (state) => {
    state.ui.selectedVariableId = null;
  },
};
