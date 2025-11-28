
export const initialEntities = {
  entities: {},
  ids: [],
};

export const actionsQueries = {

  setVariableModeGroups: (state, action) => {
    const variableModeGroups = action.payload;
    state.ids = variableModeGroups.map(role => role.id);
    state.entities = variableModeGroups.reduce((acc, variableModeGroup) => {
      acc[variableModeGroup.id] = variableModeGroup;
      return acc;
    }, {});
  },
};
