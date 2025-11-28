export const initialUIState = {
  ui: {
    hoveredVariableModeGroupId: null,
    focusedVariableModeGroupId: null,
    selectedVariableModeGroupId: null,
  },
};

export const actionsUIState = {

  setHoveredVariableModeGroupId: (state, action) => {
    state.ui.hoveredVariableModeGroupId = action.payload;
  },
  setFocusedVariableModeGroupId: (state, action) => {
    state.ui.focusedVariableModeGroupId = action.payload;
  },
  setSelectedVariableModeGroupId: (state, action) => {
    state.ui.selectedVariableModeGroupId = action.payload;
  },
};

