
export const initialEntities = {
  entities: {},
  ids: [],
};

export const actionsQueries = {

  setActorRoles: (state, action) => {
    const actorRoles = action.payload;
    state.ids = actorRoles.map(role => role.id);
    state.entities = actorRoles.reduce((acc, actorRole) => {
      acc[actorRole.id] = actorRole;
      return acc;
    }, {});
  },
};
