import type { RootState } from '@/app/store';
import { createSelector } from '@reduxjs/toolkit';
import type { ContextLink } from '../../types';
// Добавить импорты для получения объектов контекста
import { selectDocumentEntities } from '@/entities/document';
import { selectTaskEntities } from '@/entities/task';
import { selectChatEntities } from '@/entities/chat';
import { selectMemberEntities } from '@/entities/actorMember';
import { getContextObject } from '../../lib';

export const selectContextLinkState = (state: RootState) => state.contextLinkEntity;
export const selectContextLinkEntities = (state: RootState) => selectContextLinkState(state).entities;
export const selectContextLinkIds = (state: RootState) => selectContextLinkState(state).ids;

export const selectHoveredContextLinkId = (state: RootState) => selectContextLinkState(state).hoveredId;
export const selectFocusedContextLinkId = (state: RootState) => selectContextLinkState(state).focusedId;
export const selectSelectedContextLinkId = (state: RootState) => selectContextLinkState(state).selectedId;

export const selectContextLinkCheckStates = createSelector(
  [selectSelectedContextLinkId, selectFocusedContextLinkId, selectHoveredContextLinkId, (_, id) => id],
  (selectedId, focusedId, hoveredId, ContextLinkId) => ({
    isSelected: selectedId === ContextLinkId,
    isFocused: focusedId === ContextLinkId,
    isHovered: hoveredId === ContextLinkId,
  }),
);

export const selectAllContextLinks = createSelector(
  [selectContextLinkEntities, selectContextLinkIds],
  (entities, ids) => (ids || []).map((id: string) => entities[id]).filter(Boolean) as ContextLink[],
);

export const selectSelectedContextLink = createSelector(
  [selectSelectedContextLinkId, selectContextLinkEntities],
  (selectedId, entities) => {
    if (!selectedId || !entities) {return null;}
    return entities[selectedId] || null;
  },
);

export const selectContextLinksByIds = createSelector(
  [selectContextLinkEntities, (_, ids) => ids],
  (entities, ids) => {
    if (!ids || !entities) {return [];}
    return ids.map((id: string) => entities[id]).filter(Boolean);
  },
);

export const selectContextLinkById = createSelector(
  [selectContextLinkEntities, (_, id) => id],
  (entities, id) => entities[id] || null,
);

export const selectContextLinksMap = createSelector(
  [selectAllContextLinks],
  (links) => {
    const map: Record<string, ContextLink[]> = {};
    links.forEach(link => {
      if (!map[link.entityId]) {map[link.entityId] = [];}
      map[link.entityId].push(link);
    });
    return map;
  },
);

// Stable input selectors to prevent unnecessary re-computations
const selectDocumentEntitiesStable = createSelector(
  [selectDocumentEntities],
  (entities) => entities,
);

const selectTaskEntitiesStable = createSelector(
  [selectTaskEntities],
  (entities) => entities,
);

const selectChatEntitiesStable = createSelector(
  [selectChatEntities],
  (entities) => entities,
);

export const selectContextObjectsMap = createSelector(
  [
    selectContextLinksMap,
    selectDocumentEntitiesStable,
    selectTaskEntitiesStable,
    selectChatEntitiesStable,
  ],
  (linksMap, documentEntities, taskEntities, chatEntities) => {
    const contextObjectsMap: Record<string, Array<ContextLink & { contextObject: any }>> = {};

    // Проходим по всем entityId в карте
    Object.keys(linksMap).forEach(entityId => {
      const links = linksMap[entityId];

      contextObjectsMap[entityId] = links.map(link => ({
        ...(getContextObject(
          link.contextType,
          link.contextId,
          {
            documentEntities,
            taskEntities,
            chatEntities,
          })

        ),
      }));
    });

    return contextObjectsMap;
  },
);
