
export const initialEntities = {
  entities: {},
  ids: [],
};

export const actionsQueries = {

  setActorAgents: (state, action) => {
    const actorAgents = action.payload;
    state.ids = actorAgents.map(role => role.id);
    state.entities = actorAgents.reduce((acc, actorAgent) => {
      acc[actorAgent.id] = actorAgent;
      return acc;
    }, {});
  },
};
