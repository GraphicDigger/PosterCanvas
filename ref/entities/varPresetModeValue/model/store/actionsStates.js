export const initialUIState = {
  ui: {
    hoveredPresetModeValueId: null,
    focusedPresetModeValueId: null,
    selectedPresetModeValueId: null,
  },
};

export const actionsUIState = {

  setHoveredPresetModeValueId: (state, action) => {
    state.ui.hoveredPresetModeValueId = action.payload;
  },
  setFocusedPresetModeValueId: (state, action) => {
    state.ui.focusedPresetModeValueId = action.payload;
  },
  setSelectedPresetModeValueId: (state, action) => {
    state.ui.selectedPresetModeValueId = action.payload;
  },
};

