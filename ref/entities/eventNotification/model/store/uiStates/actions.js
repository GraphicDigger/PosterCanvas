export const initialUIState = {
  ui: {
    hoveredNotificationId: null,
    focusedNotificationId: null,
    selectedNotificationId: null,
  },
};

export const actionsUIState = {

  setHoveredNotificationId: (state, action) => {
    state.ui.hoveredNotificationId = action.payload;
  },
  setFocusedNotificationId: (state, action) => {
    state.ui.focusedNotificationId = action.payload;
  },
  setSelectedNotificationId: (state, action) => {
    state.ui.selectedNotificationId = action.payload;
  },
};

