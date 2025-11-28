export const initialUIState = {
  ui: {
    hoveredWorkspaceId: null,
    focusedWorkspaceId: null,
    selectedWorkspaceId: null,
  },
};

export const actionsUIState = {

  setHoveredWorkspaceId: (state, action) => {
    state.ui.hoveredWorkspaceId = action.payload;
  },
  setFocusedWorkspaceId: (state, action) => {
    state.ui.focusedWorkspaceId = action.payload;
  },
  setSelectedWorkspaceId: (state, action) => {
    state.ui.selectedWorkspaceId = action.payload;
  },
};

