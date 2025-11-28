

export const actionsMutation = {

  addVariable: (state, action) => {
    const variable = action.payload;
    state.entities[variable.id] = variable;
    if (!state.ids.includes(variable.id)) {
      state.ids.push(variable.id);
    }
  },

  updateVariable: (state, action) => {
    const { id, ...update } = action.payload;
    if (state.entities[id]) {
      state.entities[id] = { ...state.entities[id], ...update };
    }
  },

  removeVariable: (state, action) => {
    const id = action.payload;
    delete state.entities[id];
    state.ids = state.ids.filter(variableId => variableId !== id);
  },


};
