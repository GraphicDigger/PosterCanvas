
export const initialEntities = {
  entities: {},
  ids: [],
};

export const actionsQueries = {

  setUserspaces: (state, action) => {
    const userspaces = action.payload;
    state.ids = userspaces.map(role => role.id);
    state.entities = userspaces.reduce((acc, userspace) => {
      acc[userspace.id] = userspace;
      return acc;
    }, {});
  },
};
