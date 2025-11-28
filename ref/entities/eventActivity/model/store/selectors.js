import { createSelector } from '@reduxjs/toolkit';
import { selectSelectedActivityId } from './uiStates/selectors';
import { selectEventEntities } from '../../@x/event';
import { selectMemberById, selectMemberEntities } from '../../@x/member';
import { entitySelectors } from '../../@x/entity';
import { ENTITY_KINDS } from '@/shared/constants';
import { selectNotificationEntities } from '../../@x/notification';

export const selectActivityState = (state) => state.activityEntity;
export const selectActivityEntities = (state) => selectActivityState(state).entities;
export const selectActivityIds = (state) => selectActivityState(state).ids;
export const selectActivityUI = (state) => selectActivityState(state).ui;

export const selectActivityById = (state, id) => selectActivityEntities(state)[id];

export const selectAllActivities = createSelector(
  [selectActivityEntities, selectActivityIds],
  (entities, ids) => ids.map(id => entities[id]).filter(Boolean),
);

export const selectSelectedActivity = createSelector(
  [selectSelectedActivityId, selectActivityEntities],
  (selectedId, entities) => {
    if (!selectedId || !entities) {return null;}
    return entities[selectedId] || null;
  },
);

// get entities by ids
export const selectActivitiesByIds = createSelector(
  [selectActivityEntities, (_, ids) => ids],
  (entities, ids) => {
    if (!ids || !entities) {return [];}
    return ids.map(id => entities[id]).filter(Boolean);
  },
);

export const makeSelectActivityById = (id) => createSelector(
  [selectActivityEntities],
  (entities) => entities?.[id] ?? null,
);

export const makeSelectActivitiesByIds = (ids) => createSelector(
  [selectActivityEntities],
  (entities) => {
    if (!ids || !entities) {return [];}
    return ids.map(id => entities[id]).filter(Boolean);
  },
);

// Селектор для получения всех activities с их events
export const selectAllCompositeActivities = createSelector(
  [selectAllActivities, selectEventEntities, selectMemberEntities, selectNotificationEntities],
  (activities, events, members, notifications) => {

    // correspondence map: eventId → notificationId
    const notificationMap = new Map();
    if (notifications) {
      Object.values(notifications).forEach(notification => {
        if (notification.eventId) {
          notificationMap.set(notification.eventId, notification.id);
        }
      });
    }

    return activities.map(activity => {
      const event = events[activity.eventId] || null;

      const createdByDetail = members[activity.source.createdBy];

      const notificationId = notificationMap.get(activity.eventId) || null;
      const inbox = notificationId !== null;

      return {
        ...activity,
        event,
        createdByDetail,
        inbox,
        notificationId,
      };
    });
  },
);

export const makeSelectCompositeActivityById = (activityId) => createSelector(
  [selectActivityEntities, selectEventEntities, selectMemberEntities, state => state],
  (activities, events, members, state) => {
    if (!activities || !events || !members) {return null;}

    const activity = activities[activityId];
    if (!activity) {return null;}

    const event = events[activity.eventId];
    const createdByDetail = activity.source?.createdByType === ENTITY_KINDS.ACTOR_MEMBER ? members[activity.source.createdBy] : null;

    return {
      ...activity,
      event: event || null,
      createdByDetail: createdByDetail || null,
    };
  },
);

