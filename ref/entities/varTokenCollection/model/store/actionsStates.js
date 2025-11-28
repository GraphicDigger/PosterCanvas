
export const initialUIStates = {
  ui: {
    hoveredTokenCollectionId: null,
    focusedTokenCollectionId: null,
    selectedTokenCollectionId: null,
  },
};

export const actionsUIStates = {

  setHoveredTokenCollectionId: (state, action) => {
    state.ui.hoveredTokenCollectionId = action.payload;
  },
  setFocusedTokenCollectionId: (state, action) => {
    state.ui.focusedTokenCollectionId = action.payload;
  },
  setSelectedTokenCollectionId: (state, action) => {
    state.ui.selectedTokenCollectionId = action.payload;
  },

};
