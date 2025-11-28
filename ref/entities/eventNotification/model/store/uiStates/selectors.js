import { selectNotificationUI } from '../selectors';
import { createSelector } from '@reduxjs/toolkit';

export const selectHoveredNotificationId = (state) => selectNotificationUI(state).hoveredNotificationId;
export const selectFocusedNotificationId = (state) => selectNotificationUI(state).focusedNotificationId;
export const selectSelectedNotificationId = (state) => selectNotificationUI(state).selectedNotificationId;

export const selectNotificationCheckStates = createSelector(
  [selectSelectedNotificationId, selectFocusedNotificationId, selectHoveredNotificationId, (_, id) => id],
  (selectedId, focusedId, hoveredId, NotificationId) => ({
    isSelected: selectedId === NotificationId,
    isFocused: focusedId === NotificationId,
    isHovered: hoveredId === NotificationId,
  }),
);
