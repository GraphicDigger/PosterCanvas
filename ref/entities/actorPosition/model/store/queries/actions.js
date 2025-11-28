
export const initialEntities = {
  entities: {},
  ids: [],
};

export const actionsQueries = {

  setActorPositions: (state, action) => {
    const actorPositions = action.payload;
    state.ids = actorPositions.map(role => role.id);
    state.entities = actorPositions.reduce((acc, actorPosition) => {
      acc[actorPosition.id] = actorPosition;
      return acc;
    }, {});
  },
};
