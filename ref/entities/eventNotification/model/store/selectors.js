import { createSelector } from '@reduxjs/toolkit';
import { selectSelectedNotificationId } from './uiStates/selectors';
import { selectEventEntities } from '../../@x/event';
import { selectMemberById, selectMemberEntities } from '../../@x/member';
import { ENTITY_KINDS } from '@/shared/constants';

export const selectNotificationState = (state) => state.notificationEntity;
export const selectNotificationEntities = (state) => selectNotificationState(state).entities;
export const selectNotificationIds = (state) => selectNotificationState(state).ids;
export const selectNotificationUI = (state) => selectNotificationState(state).ui;


// Entity selectors
export const selectAllNotifications = (state) => selectNotificationIds(state).map(id => selectNotificationById(state, id));
export const selectNotificationById = (state, id) => selectNotificationEntities(state)[id];


// selected Notification
export const selectSelectedNotification = createSelector(
  [selectSelectedNotificationId, selectNotificationEntities],
  (selectedId, entities) => {
    if (!selectedId || !entities) { return null; }
    return entities[selectedId] || null;
  },
);

// get entities by ids
export const selectNotificationsByIds = createSelector(
  [selectNotificationEntities, (_, ids) => ids],
  (entities, ids) => {
    if (!ids || !entities) { return []; }
    return ids.map(id => entities[id]).filter(Boolean);
  },
);

// Persistent notifications (stored in Redux, can be dismissed from UI)
// Постоянные уведомления (хранятся в Redux, могут быть скрыты из UI)
export const selectPersistentNotifications = createSelector(
  [selectAllNotifications],
  (notifications) => {
    return notifications.filter(n => n.persistent === true);
  },
);

// Visible persistent notifications (persistent and NOT dismissed)
// Видимые постоянные уведомления (постоянные и НЕ скрытые)
export const selectVisiblePersistentNotifications = createSelector(
  [selectPersistentNotifications],
  (persistentNotifications) => {
    return persistentNotifications.filter(n => !n.dismissed);
  },
);

export const makeSelectNotificationById = (id) => createSelector(
  [selectNotificationEntities],
  (entities) => entities?.[id] ?? null,
);

export const makeSelectNotificationsByIds = (ids) => createSelector(
  [selectNotificationEntities],
  (entities) => {
    if (!ids || !entities) {return [];}
    return ids.map(id => entities[id]).filter(Boolean);
  },
);

// Селектор для получения всех notifications с их events
export const selectAllCompositeNotifications = createSelector(
  [
    selectAllNotifications,
    selectEventEntities,
    selectMemberEntities,
    state => state,
  ],
  (notifications, events, members, state) => {
    if (!events || !members || !notifications) {return [];}

    return notifications.map(notification => {
      const event = events[notification.eventId];
      const createdByDetail = members[notification.source.createdBy];

      return {
        ...notification,
        event: event || null,
        createdByDetail: createdByDetail || null,
      };
    });
  },
);

