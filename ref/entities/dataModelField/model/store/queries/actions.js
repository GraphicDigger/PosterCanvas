
export const initialEntities = {
  entities: {},
  ids: [],
};

export const actionsQueries = {

  setModelFields: (state, action) => {
    const modelFields = action.payload;
    state.ids = modelFields.map(modelField => modelField.id);
    state.entities = modelFields.reduce((acc, modelField) => {
      acc[modelField.id] = modelField;
      return acc;
    }, {});
  },

};
