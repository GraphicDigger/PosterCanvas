export const initialUIState = {
  ui: {
    hoveredVariableModeId: null,
    focusedVariableModeId: null,
    selectedVariableModeId: null,
  },
};

export const actionsUIState = {

  setHoveredVariableModeId: (state, action) => {
    state.ui.hoveredVariableModeId = action.payload;
  },
  setFocusedVariableModeId: (state, action) => {
    state.ui.focusedVariableModeId = action.payload;
  },
  setSelectedVariableModeId: (state, action) => {
    state.ui.selectedVariableModeId = action.payload;
  },
};

