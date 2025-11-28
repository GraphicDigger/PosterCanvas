
export const initialEntities = {
  entities: {},
  ids: [],
};

export const actionsQueries = {

  setRecords: (state, action) => {
    const records = action.payload;
    state.entities = records.reduce((acc, record) => {
      acc[record.id] = record;
      return acc;
    }, {});
    state.ids = records.map(record => record.id);

  },
};
