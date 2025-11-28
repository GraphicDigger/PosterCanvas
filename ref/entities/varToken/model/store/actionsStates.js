
export const initialUIStates = {
  ui: {
    hoveredTokenId: null,
    focusedTokenId: null,
    selectedTokenId: null,
  },
};

export const actionsUIStates = {

  setHoveredTokenId: (state, action) => {
    state.ui.hoveredTokenId = action.payload;
  },
  setFocusedTokenId: (state, action) => {
    state.ui.focusedTokenId = action.payload;
  },
  setSelectedTokenId: (state, action) => {
    state.ui.selectedTokenId = action.payload;
  },

};
