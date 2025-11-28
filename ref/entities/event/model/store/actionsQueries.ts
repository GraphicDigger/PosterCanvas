
export const initialEntities = {
  entities: {},
  ids: [],
};

export const actionsQueries = {

  setEvents: (state, action) => {
    const events = action.payload;
    state.ids = events.map(role => role.id);
    state.entities = events.reduce((acc, event) => {
      acc[event.id] = event;
      return acc;
    }, {});
  },
};
