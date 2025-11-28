export const initialUIState = {
  ui: {
    hoveredUserspaceId: null,
    focusedUserspaceId: null,
    selectedUserspaceId: null,
  },
};

export const actionsUIState = {

  setHoveredUserspaceId: (state, action) => {
    state.ui.hoveredUserspaceId = action.payload;
  },
  setFocusedUserspaceId: (state, action) => {
    state.ui.focusedUserspaceId = action.payload;
  },
  setSelectedUserspaceId: (state, action) => {
    state.ui.selectedUserspaceId = action.payload;
  },
};

