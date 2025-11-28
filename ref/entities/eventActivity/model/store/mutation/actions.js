export const actionsMutation = {

  addActivity: (state, action) => {
    const activity = action.payload;
    if (!state.entities[activity.id]) {
      state.ids.push(activity.id);
      state.entities[activity.id] = activity;
    }
  },

  updateActivity: (state, action) => {

  },

  removeActivity: (state, action) => {

  },

};
