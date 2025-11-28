export const initialUIState = {
  ui: {
    hoveredTokenValueId: null,
    focusedTokenValueId: null,
    selectedTokenValueId: null,
  },
};

export const actionsUIState = {

  setHoveredTokenValueId: (state, action) => {
    state.ui.hoveredTokenValueId = action.payload;
  },
  setFocusedTokenValueId: (state, action) => {
    state.ui.focusedTokenValueId = action.payload;
  },
  setSelectedTokenValueId: (state, action) => {
    state.ui.selectedTokenValueId = action.payload;
  },
};

