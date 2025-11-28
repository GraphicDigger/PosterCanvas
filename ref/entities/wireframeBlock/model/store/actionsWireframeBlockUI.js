export const initialWireframeBlockUI = {
  hoveredWireframeBlockId: null,
  focusedWireframeBlockId: null,
  selectedWireframeBlockId: null,
};

export const actionsWireframeBlockUI = {
  setHoveredWireframeBlockId: (state, action) => {
    state.ui.hoveredWireframeBlockId = action.payload;
  },
  setFocusedWireframeBlockId: (state, action) => {
    state.ui.focusedWireframeBlockId = action.payload;
  },
  setSelectedWireframeBlockId: (state, action) => {
    state.ui.selectedWireframeBlockId = action.payload;
    // console.log('selectedBlock', action.payload);
  },
};
