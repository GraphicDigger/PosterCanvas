export const initialUIState = {
  ui: {
    hoveredActorAgentId: null,
    focusedActorAgentId: null,
    selectedActorAgentId: null,
  },
};

export const actionsUIState = {

  setHoveredActorAgentId: (state, action) => {
    state.ui.hoveredActorAgentId = action.payload;
  },
  setFocusedActorAgentId: (state, action) => {
    state.ui.focusedActorAgentId = action.payload;
  },
  setSelectedActorAgentId: (state, action) => {
    state.ui.selectedActorAgentId = action.payload;
  },
};

