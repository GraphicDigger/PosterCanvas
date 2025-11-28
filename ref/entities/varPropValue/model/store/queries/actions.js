export const initialEntities = {
  ids: [],
  entities: {},
  byProp: {},
};

export const actionsQueries = {
  setPropValues: (state, action) => {
    state.ids = [];
    state.entities = {};
    state.byProp = {};

    const propValues = action.payload;
    propValues.forEach(propValue => {
      if (!state.entities[propValue.id]) {
        state.entities[propValue.id] = propValue;
        state.ids.push(propValue.id);

        if (propValue.propId) {
          if (!state.byProp[propValue.propId]) {
            state.byProp[propValue.propId] = [];
          }
          if (!state.byProp[propValue.propId].includes(propValue.id)) {
            state.byProp[propValue.propId].push(propValue.id);
          }
        }
      }
    });
  },
};
