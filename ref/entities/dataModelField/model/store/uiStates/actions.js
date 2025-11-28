
export const initialUIState = {
  ui: {
    hoveredModelFieldId: null,
    focusedModelFieldId: null,
    selectedModelFieldId: null,
  },
};

export const actionsUIState = {

  setHoveredModelFieldId: (state, action) => {
    state.ui.hoveredModelFieldId = action.payload;
  },
  setFocusedModelFieldId: (state, action) => {
    state.ui.focusedModelFieldId = action.payload;
  },
  setSelectedModelFieldId: (state, action) => {
    // console.log('setSelectedModelFieldId', action.payload);
    state.ui.selectedModelFieldId = action.payload;
  },
  resetSelectedModelFieldId: (state) => {
    state.ui.selectedModelFieldId = null;
  },

};
