import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '@/app/store';

export const selectEventState = (state: RootState) => state.eventEntity;
export const selectEventEntities = (state: RootState) => selectEventState(state).entities;
export const selectEventIds = (state: RootState) => selectEventState(state).ids;
export const selectEventUI = (state: RootState) => selectEventState(state).ui;

export const selectHoveredEventId = (state: RootState) => selectEventUI(state).hoveredEventId;
export const selectFocusedEventId = (state: RootState) => selectEventUI(state).focusedEventId;
export const selectSelectedEventId = (state: RootState) => selectEventUI(state).selectedEventId;

export const selectEventCheckStates = createSelector(
  [selectSelectedEventId, selectFocusedEventId, selectHoveredEventId, (_, id) => id],
  (selectedId, focusedId, hoveredId, EventId) => ({
    isSelected: selectedId === EventId,
    isFocused: focusedId === EventId,
    isHovered: hoveredId === EventId,
  }),
);

export const selectAllEvents = createSelector(
  [selectEventIds, selectEventEntities],
  (ids, entities) => ids.map(id => entities[id]),
);

export const selectEventById = (state, id) => selectEventEntities(state)[id];

export const selectSelectedEvent = createSelector(
  [selectSelectedEventId, selectEventEntities],
  (selectedId, entities) => {
    if (!selectedId || !entities) {return null;}
    return entities[selectedId] || null;
  },
);

export const selectEventsByIds = createSelector(
  [selectEventEntities, (_, ids) => ids],
  (entities, ids) => {
    if (!ids || !entities) {return [];}
    return ids.map(id => entities[id]).filter(Boolean);
  },
);

export const makeSelectEventById = (id) => createSelector(
  [selectEventEntities],
  (entities) => entities?.[id] ?? null,
);

export const makeSelectEventsByIds = (ids) => createSelector(
  [selectEventEntities],
  (entities) => {
    if (!ids || !entities) {return [];}
    return ids.map(id => entities[id]).filter(Boolean);
  },
);
