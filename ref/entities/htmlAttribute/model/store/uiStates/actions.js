export const initialUIState = {
  ui: {
    hoveredHtmlAttrId: null,
    focusedHtmlAttrId: null,
    selectedHtmlAttrId: null,
  },
};

export const actionsUIState = {

  setHoveredHtmlAttrId: (state, action) => {
    state.ui.hoveredHtmlAttrId = action.payload;
  },
  setFocusedHtmlAttrId: (state, action) => {
    state.ui.focusedHtmlAttrId = action.payload;
  },
  setSelectedHtmlAttrId: (state, action) => {
    state.ui.selectedHtmlAttrId = action.payload;
  },
};

