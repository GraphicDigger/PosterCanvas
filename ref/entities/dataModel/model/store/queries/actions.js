
export const initialEntities = {
  entities: {},
  ids: [],
};

export const actionsQueries = {

  setModels: (state, action) => {
    const models = action.payload;
    state.ids = models.map(model => model.id);
    state.entities = models.reduce((acc, model) => {
      acc[model.id] = model;
      return acc;
    }, {});
  },

};
