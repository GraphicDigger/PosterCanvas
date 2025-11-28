export const initialEntities = {
  ids: [],
  entities: {},
};

export const actionsQueries = {
  setVariables: (state, action) => {
    const variables = action.payload;
    state.entities = {};
    state.ids = [];
    variables.forEach(variable => {
      state.entities[variable.id] = variable;
      state.ids.push(variable.id);
    });
  },
};
