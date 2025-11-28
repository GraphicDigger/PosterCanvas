
export const initialQueries = {
  ids: [],
  entities: {},
};

export const actionsQueries = {

  setTokenCollections: (state, action) => {
    const collections = action.payload;
    state.entities = {};
    state.ids = [];

    collections.forEach(collection => {
      state.ids.push(collection.id);
      state.entities[collection.id] = collection;
    });
  },

};
