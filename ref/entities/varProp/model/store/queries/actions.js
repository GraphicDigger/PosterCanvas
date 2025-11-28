
export const initialEntities = {
  ids: [],
  entities: {},
  byComponent: {},
};


export const actionsQueries = {

  setProps: (state, action) => {
    // state.ids = [];
    // state.entities = {};
    // state.byComponent = {};

    const props = action.payload;
    props.forEach(prop => {
      if (!state.entities[prop.id]) {
        state.entities[prop.id] = prop;
        state.ids.push(prop.id);

        if (prop.componentId) {
          if (!state.byComponent[prop.componentId]) {
            state.byComponent[prop.componentId] = [];
          }
          if (!state.byComponent[prop.componentId].includes(prop.id)) {
            state.byComponent[prop.componentId].push(prop.id);
          }
        }
      }
    });
  },
};
