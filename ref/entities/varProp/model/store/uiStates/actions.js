export const initialUIState = {
  ui: {
    hoveredPropId: null,
    focusedPropId: null,
    selectedPropId: null,
  },
};

export const actionsUIState = {

  setHoveredPropId: (state, action) => {
    state.ui.hoveredPropId = action.payload;
  },

  setFocusedPropId: (state, action) => {
    state.ui.focusedPropId = action.payload;
  },

  setSelectedPropId: (state, action) => {
    state.ui.selectedPropId = action.payload;
  },

  resetSelectedPropId: (state) => {
    state.ui.selectedPropId = null;
  },
};
