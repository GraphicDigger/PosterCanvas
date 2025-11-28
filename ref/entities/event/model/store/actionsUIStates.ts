
export const initialUIState = {
  ui: {
    hoveredEventId: null,
    focusedEventId: null,
    selectedEventId: null,
  },
};

export const actionsUIState = {

  setHoveredEventId: (state, action) => {
    state.ui.hoveredEventId = action.payload;
  },
  setFocusedEventId: (state, action) => {
    state.ui.focusedEventId = action.payload;
  },
  setSelectedEventId: (state, action) => {
    state.ui.selectedEventId = action.payload;
  },
};

