export const initialUIState = {
  ui: {
    hoveredActorPositionId: null,
    focusedActorPositionId: null,
    selectedActorPositionId: null,
  },
};

export const actionsUIState = {

  setHoveredActorPositionId: (state, action) => {
    state.ui.hoveredActorPositionId = action.payload;
  },
  setFocusedActorPositionId: (state, action) => {
    state.ui.focusedActorPositionId = action.payload;
  },
  setSelectedActorPositionId: (state, action) => {
    state.ui.selectedActorPositionId = action.payload;
  },
};

