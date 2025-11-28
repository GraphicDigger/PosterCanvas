export const initialInstanceUI = {
  hoveredInstanceId: null,
  focusedInstanceId: null,
  selectedInstanceId: null,
};

export const actionsInstanceUI = {
  setHoveredInstanceId: (state, action) => {
    state.ui.hoveredInstanceId = action.payload;
  },
  setFocusedInstanceId: (state, action) => {
    state.ui.focusedInstanceId = action.payload;
  },
  setSelectedInstanceId: (state, action) => {
    state.ui.selectedInstanceId = action.payload;
  },
};
