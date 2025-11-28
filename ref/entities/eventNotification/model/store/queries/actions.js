
export const initialEntities = {
  entities: {},
  ids: [],
};

export const actionsQueries = {

  setNotifications: (state, action) => {
    const notifications = action.payload;
    state.ids = notifications.map(role => role.id);
    state.entities = notifications.reduce((acc, notification) => {
      acc[notification.id] = notification;
      return acc;
    }, {});
  },
};
