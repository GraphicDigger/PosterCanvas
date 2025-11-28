export const initialUIState = {
  ui: {
    hoveredActorRoleId: null,
    focusedActorRoleId: null,
    selectedActorRoleId: null,
  },
};

export const actionsUIState = {

  setHoveredActorRoleId: (state, action) => {
    state.ui.hoveredActorRoleId = action.payload;
  },
  setFocusedActorRoleId: (state, action) => {
    state.ui.focusedActorRoleId = action.payload;
  },
  setSelectedActorRoleId: (state, action) => {
    state.ui.selectedActorRoleId = action.payload;
  },
};

