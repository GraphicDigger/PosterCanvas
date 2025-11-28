export const initialUIState = {
  ui: {
    hoveredActivityId: null,
    focusedActivityId: null,
    selectedActivityId: null,
  },
};

export const actionsUIState = {

  setHoveredActivityId: (state, action) => {
    state.ui.hoveredActivityId = action.payload;
  },
  setFocusedActivityId: (state, action) => {
    state.ui.focusedActivityId = action.payload;
  },
  setSelectedActivityId: (state, action) => {
    state.ui.selectedActivityId = action.payload;
  },
  resetSelectedActivityId: (state) => {
    state.ui.selectedActivityId = null;
  },
};

