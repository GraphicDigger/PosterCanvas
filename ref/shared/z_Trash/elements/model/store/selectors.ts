import type { RootState } from '@/app/store';
import { createSelector } from '@reduxjs/toolkit';
import type { DefaultElement } from '../../types';
import { ENTITY_KINDS } from '@/shared/constants';
import { elementsToTree, elementsToFlatList } from '@/shared/lib/utils';

export const selectDefaultElementsState = (state: RootState) => state.defaultElements;
export const selectDefaultElementsEntities = (state: RootState) => selectDefaultElementsState(state).entities;
export const selectDefaultElementsIds = (state: RootState) => selectDefaultElementsState(state).ids;

export const selectHoveredDefaultElementId = (state: RootState) => selectDefaultElementsState(state).hoveredId;
export const selectFocusedDefaultElementId = (state: RootState) => selectDefaultElementsState(state).focusedId;
export const selectSelectedDefaultElementId = (state: RootState) => selectDefaultElementsState(state).selectedId;

export const selectDefaultElementsCheckStates = createSelector(
  [selectSelectedDefaultElementId, selectFocusedDefaultElementId, selectHoveredDefaultElementId, (_, id) => id],
  (selectedId, focusedId, hoveredId, DefaultElementId) => ({
    isSelected: selectedId === DefaultElementId,
    isFocused: focusedId === DefaultElementId,
    isHovered: hoveredId === DefaultElementId,
  }),
);


export const selectAllDefaultElements = createSelector(
  [selectDefaultElementsEntities, selectDefaultElementsIds],
  (entities, ids) => (ids || []).map((id: string) => entities[id]).filter(Boolean) as UiDefaultEntity[],
);


export const selectSelectedDefaultElement = createSelector(
  [selectSelectedDefaultElementId, selectDefaultElementsEntities],
  (selectedId, entities) => {
    if (!selectedId || !entities) { return null; }
    return entities[selectedId] || null;
  },
);


export const selectDefaultElementsByIds = createSelector(
  [selectDefaultElementsEntities, (_, ids) => ids],
  (entities, ids) => {
    if (!ids || !entities) { return []; }
    return ids.map((id: string) => entities[id]).filter(Boolean);
  },
);


export const selectDefaultElementById = createSelector(
  [selectDefaultElementsEntities, (_, id) => id],
  (entities, id) => entities[id] || null,
);


export const selectDefaultElementsTree = createSelector(
  [selectDefaultElementsEntities],
  (entities) => {
    if (!entities) return []

    const allEntities = Object.values(entities) as any[];
    const tree = allEntities.map(element => {
      const children = elementsToTree(allEntities as any, element.id, ENTITY_KINDS.ELEMENT) as any[];
      return {
        ...element,
        childrens: children,
      };
    });
    return tree
  },
);

export const selectDefaultElementWithChildren = createSelector(
  [selectDefaultElementsTree, (_, id) => id],
  (elements, id) => {
    const element = elements.find((elem: DefaultElement) => elem.id === id);
    if (!element) return []

    return elementsToFlatList(element);
  },
);

export const selectDefaultElementWithChildrenByTag = createSelector(
  [selectDefaultElementsTree, (_, tag) => tag],
  (elements, tag) => {
    const element = elements.find((element: DefaultElement) => element.tag === tag);
    if (!element) { return null; }

    return elementsToFlatList(element)[0];
  },
);


