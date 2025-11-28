export const initialUIState = {
  ui: {
    hoveredPropValueId: null,
    focusedPropValueId: null,
    selectedPropValueId: null,
  },
};

export const actionsUIState = {

  setHoveredPropValueId: (state, action) => {
    state.ui.hoveredPropValueId = action.payload;
  },

  setFocusedPropValueId: (state, action) => {
    state.ui.focusedPropValueId = action.payload;
  },

  setSelectedPropValueId: (state, action) => {
    state.ui.selectedPropValueId = action.payload;
  },

};

