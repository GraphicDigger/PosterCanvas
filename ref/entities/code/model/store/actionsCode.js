
export const initialCodeState = {
  entities: {},
  ids: [],
  ui: {
    hoveredCodeId: null,
    focusedCodeId: null,
    selectedCodeId: null,
  },
};

export const actionsCode = {
  setHoveredCodeId: (state, action) => {
    state.ui.hoveredCodeId = action.payload;
  },
  setFocusedCodeId: (state, action) => {
    state.ui.focusedCodeId = action.payload;
  },
  setSelectedCodeId: (state, action) => {
    state.ui.selectedCodeId = action.payload;
  },
  resetSelectedCode: (state) => {
    state.ui.selectedCodeId = null;
  },
  setCodes: (state, action) => {
    const codes = action.payload;
    state.entities = codes.reduce((acc, code) => {
      acc[code.id] = code;
      return acc;
    }, {});
    state.ids = codes.map(code => code.id);
  },
  updateCode: (state, action) => {
    const updatedCode = action.payload;
    if (state.entities[updatedCode.id]) {
      state.entities[updatedCode.id] = updatedCode;
    }
  },
  addCode: (state, action) => {
    const newCode = action.payload;
    if (!state.entities[newCode.id]) {
      state.entities[newCode.id] = newCode;
      state.ids.push(newCode.id);
    }
  },

};

