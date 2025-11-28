
export const initialEntities = {
  entities: {},
  ids: [],
};

export const actionsQueries = {

  setActivities: (state, action) => {
    const activities = action.payload;
    state.ids = activities.map(role => role.id);
    state.entities = activities.reduce((acc, activity) => {
      acc[activity.id] = activity;
      return acc;
    }, {});
  },
};
