export const initialElementUI = {
  ui: {
    hoveredElementId: null,
    focusedElementId: null,
    selectedElementId: null,
  },
};

export const actionsElementUI = {
  setHoveredElementId: (state, action) => {
    state.ui.hoveredElementId = action.payload;
  },
  setFocusedElementId: (state, action) => {
    state.ui.focusedElementId = action.payload;
  },
  setSelectedElementId: (state, action) => {
    state.ui.selectedElementId = action.payload;
  },

  resetFocusedElementId: (state) => {
    state.ui.focusedElementId = null;
  },
  resetSelectedElementId: (state) => {
    state.ui.selectedElementId = null;
  },

};
