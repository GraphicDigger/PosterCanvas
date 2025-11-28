import type { RootState } from '@/app/store';
import { createSelector } from '@reduxjs/toolkit';
import type { Chat } from '../../types';
import { selectMembersById } from '../../@x/actorMember';

export const selectChatState = (state: RootState) => state.chatEntity;
export const selectChatEntities = (state: RootState) => selectChatState(state).entities;
export const selectChatIds = (state: RootState) => selectChatState(state).ids;

export const selectHoveredChatId = (state: RootState) => selectChatState(state).hoveredId;
export const selectFocusedChatId = (state: RootState) => selectChatState(state).focusedId;
export const selectSelectedChatId = (state: RootState) => selectChatState(state).selectedId;

export const selectChatCheckStates = createSelector(
  [selectSelectedChatId, selectFocusedChatId, selectHoveredChatId, (_, id) => id],
  (selectedId, focusedId, hoveredId, ChatId) => ({
    isSelected: selectedId === ChatId,
    isFocused: focusedId === ChatId,
    isHovered: hoveredId === ChatId,
  }),
);

export const selectAllChats = createSelector(
  [selectChatEntities, selectChatIds, (state) => state],
  (entities, ids, state) => {
    return (ids || []).map((id: string) =>
      ({
        ...entities[id],
        member: selectMembersById(state, entities[id].userId) || null,
      })).filter(Boolean) as Chat[];
  },
);

export const selectSelectedChat = createSelector(
  [selectSelectedChatId, selectChatEntities],
  (selectedId, entities) => {
    if (!selectedId || !entities) {return null;}
    return entities[selectedId] || null;
  },
);

export const selectChatsByIds = createSelector(
  [selectChatEntities, (_, ids) => ids],
  (entities, ids) => {
    if (!ids || !entities) {return [];}
    return ids.map((id: string) => entities[id]).filter(Boolean);
  },
);

export const selectChatById = createSelector(
  [selectChatEntities, (_, id) => id],
  (entities, id) => entities[id] || null,
);
