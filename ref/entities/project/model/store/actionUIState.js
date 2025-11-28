
export const initialUIStates = {
  ui: {
    focusedProjectId: null,
    hoveredProjectId: null,
    selectedProjectId: 'project-1',
  },
};

export const actionsUIStates = {
  setHoveredProjectId: (state, action) => {
    state.ui.hoveredProjectId = action.payload;
  },
  setFocusedProjectId: (state, action) => {
    state.ui.focusedProjectId = action.payload;
  },
  setSelectedProjectId: (state, action) => {
    state.ui.selectedProjectId = action.payload;
    console.log('selectedProjectId', state.ui.selectedProjectId);
  },
  resetSelectedProjectId: (state) => {
    state.ui.selectedProjectId = null;
  },
};
