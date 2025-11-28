

export const initialUIStates = {
  ui: {
    hoveredPresetCollectionId: null,
    focusedPresetCollectionId: null,
    selectedPresetCollectionId: null,
  },
};

export const actionsUIStates = {

  setHoveredPresetCollectionId: (state, action) => {
    state.ui.hoveredPresetCollectionId = action.payload;
  },
  setFocusedPresetCollectionId: (state, action) => {
    state.ui.focusedPresetCollectionId = action.payload;
  },
  setSelectedPresetCollectionId: (state, action) => {
    state.ui.selectedPresetCollectionId = action.payload;
  },

};
