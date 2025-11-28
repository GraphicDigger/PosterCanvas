
export const initialEntities = {
  entities: {},
  ids: [],
};

export const actionsQueries = {

  setVariableModes: (state, action) => {
    const variableModes = action.payload;
    state.ids = variableModes.map(role => role.id);
    state.entities = variableModes.reduce((acc, variableMode) => {
      acc[variableMode.id] = variableMode;
      return acc;
    }, {});
  },
};
