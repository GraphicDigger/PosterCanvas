export const initialStates = {
  ui: {
    hoveredPresetId: null,
    focusedPresetId: null,
    selectedPresetId: null,
  },
};

export const actionsStates = {

  setHoveredPresetId: (state, action) => {
    state.ui.hoveredPresetId = action.payload;
  },
  setFocusedPresetId: (state, action) => {
    state.ui.focusedPresetId = action.payload;
  },
  setSelectedPresetId: (state, action) => {
    state.ui.selectedPresetId = action.payload;
  },


};
