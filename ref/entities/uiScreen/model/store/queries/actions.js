export const initialEntities = {
  ids: [],
  entities: {},
};

export const actionsQueries = {
  setScreens: (state, action) => {
    const screens = action.payload.screens || action.payload;
    state.entities = {};
    state.ids = [];
    if (Array.isArray(screens)) {
      screens.forEach(screen => {
        state.entities[screen.id] = screen;
        state.ids.push(screen.id);
      });
    }
  },
};
