
export const initialUIState = {
  ui: {
    hoveredRecordId: null,
    focusedRecordId: null,
    selectedRecordId: null,
  },
};

export const actionsUIState = {

  setHoveredRecordId: (state, action) => {
    state.ui.hoveredRecordId = action.payload;
  },
  setFocusedRecordId: (state, action) => {
    state.ui.focusedRecordId = action.payload;
  },
  setSelectedRecordId: (state, action) => {
    state.ui.selectedRecordId = action.payload;
  },
  resetSelectedRecord: (state) => {
    state.ui.selectedRecordId = null;
  },
};
