import { createSlice } from '@reduxjs/toolkit';
import { initialUIState, actionsUIState } from './uiStates/actions';
import { initialEntities, actionsQueries } from './queries/actions';
import { actionsMutation } from './mutation/actions';

const initialState = {
  ...initialEntities,
  ...initialUIState,
};

const notificationEntitySlice = createSlice({
  name: 'notificationEntity',
  initialState,
  reducers: {
    ...actionsUIState,
    ...actionsQueries,
    ...actionsMutation,
  },
});

export const {

  setNotifications,

  setHoveredNotificationId,
  setFocusedNotificationId,
  setSelectedNotificationId,

  addNotification,
  updateNotification,
  removeNotification,
  hideNotification,
  dismissNotification,
  readNotification,

} = notificationEntitySlice.actions;

export default notificationEntitySlice.reducer;
