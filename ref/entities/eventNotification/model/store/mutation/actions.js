export const actionsMutation = {

  addNotification: (state, action) => {
    const notification = action.payload;
    if (!state.entities[notification.id]) {
      state.ids.push(notification.id);
      state.entities[notification.id] = notification;
    }
  },

  updateNotification: (state, action) => {
    const { id, ...updates } = action.payload;
    if (state.entities[id]) {
      state.entities[id] = { ...state.entities[id], ...updates };
    }
  },

  // Полное удаление из Redux
  removeNotification: (state, action) => {
    const id = action.payload;
    if (state.entities[id]) {
      delete state.entities[id];
      state.ids = state.ids.filter((notificationId) => notificationId !== id);
    }
  },

  // Auto-dismiss: скрывает из UI (устанавливает shownAt)
  // Persistent: остается в Redux, Temporary: удаляется позже
  hideNotification: (state, action) => {
    const id = action.payload;
    if (state.entities[id]) {
      state.entities[id] = {
        ...state.entities[id],
        shownAt: new Date().toISOString(),
      };
    }
  },

  // Пользователь закрыл крестиком (устанавливает dismissedAt)
  // Остается в Redux до Activity Highlight
  dismissNotification: (state, action) => {
    const id = action.payload;
    if (state.entities[id]) {
      state.entities[id] = {
        ...state.entities[id],
        shownAt: new Date().toISOString(), // Также скрываем из UI
        dismissedAt: new Date().toISOString(),
      };
    }
  },

  // Пользователь открыл уведомление (устанавливает readAt)
  // Удаляется из Redux сразу после установки
  readNotification: (state, action) => {
    const id = action.payload;
    if (state.entities[id]) {
      // Сначала устанавливаем readAt
      state.entities[id] = {
        ...state.entities[id],
        readAt: new Date().toISOString(),
      };
      // Затем удаляем из Redux
      delete state.entities[id];
      state.ids = state.ids.filter((notificationId) => notificationId !== id);
    }
  },

};
