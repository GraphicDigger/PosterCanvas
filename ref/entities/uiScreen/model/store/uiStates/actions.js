
export const initialUIStates = {
  focusedScreenId: null,
  hoveredScreenId: null,
  selectedScreenId: null,
};

export const actionsUIStates = {
  setFocusedScreenId: (state, action) => {
    state.focusedScreenId = action.payload;
  },
  setHoveredScreenId: (state, action) => {
    state.hoveredScreenId = action.payload;
  },
  setSelectedScreenId: (state, action) => {
    state.selectedScreenId = action.payload;
  },
};
