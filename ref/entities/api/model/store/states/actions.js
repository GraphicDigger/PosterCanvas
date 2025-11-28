export const initialUIState = {
  hoveredApiId: null,
  focusedApiId: null,
  selectedApiId: null,

  hoveredCallId: null,
  focusedCallId: null,
  selectedCallId: null,

  hoveredCategoryId: null,
  focusedCategoryId: null,
  selectedCategoryId: null,

};

export const actionsUIState = {

  // Api
  setHoveredApiId: (state, action) => {
    state.hoveredApiId = action.payload;
  },
  resetHoveredApiId: (state) => {
    state.hoveredApiId = null;
  },
  setFocusedApiId: (state, action) => {
    state.focusedApiId = action.payload;
  },
  resetFocusedApiId: (state) => {
    state.focusedApiId = null;
  },
  setSelectedApiId: (state, action) => {
    state.selectedApiId = action.payload;
    console.log('[actions] selectedApiId', state.selectedApiId);
  },
  resetSelectedApiId: (state) => {
    state.selectedApiId = null;
  },


  // Call
  setHoveredCallId: (state, action) => {
    state.hoveredCallId = action.payload;
  },
  resetHoveredCallId: (state) => {
    state.hoveredCallId = null;
  },
  setFocusedCallId: (state, action) => {
    state.focusedCallId = action.payload;
  },
  resetFocusedCallId: (state) => {
    state.focusedCallId = null;
  },
  setSelectedCallId: (state, action) => {
    state.selectedCallId = action.payload;
    console.log('[actions] selectedCallId', state.selectedCallId);
  },
  resetSelectedCallId: (state) => {
    state.selectedCallId = null;
  },


  // Category
  setHoveredCategoryId: (state, action) => {
    state.hoveredCategoryId = action.payload;
  },

  resetHoveredCategoryId: (state) => {
    state.hoveredCategoryId = null;
  },

  setFocusedCategoryId: (state, action) => {
    state.focusedCategoryId = action.payload;
  },

  resetFocusedCategoryId: (state) => {
    state.focusedCategoryId = null;
  },

  setSelectedCategoryId: (state, action) => {
    state.selectedCategoryId = action.payload;
    console.log('[actions] selectedCategoryId', state.selectedCategoryId);
  },

  resetSelectedCategoryId: (state) => {
    state.selectedCategoryId = null;
  },


};
