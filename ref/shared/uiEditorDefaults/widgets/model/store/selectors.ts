import type { RootState } from '@/app/store';
import { createSelector } from '@reduxjs/toolkit';
import type { DefaultWidget } from '../types';
import { ENTITY_KINDS } from '@/shared/constants';
import { elementsToTree, elementsToFlatList } from '@/shared/lib/utils';

export const selectDefaultWidgetsState = (state: RootState) => state.defaultWidgets;
export const selectDefaultWidgetsEntities = (state: RootState) => selectDefaultWidgetsState(state).entities;
export const selectDefaultWidgetsIds = (state: RootState) => selectDefaultWidgetsState(state).ids;

export const selectHoveredDefaultWidgetId = (state: RootState) => selectDefaultWidgetsState(state).hoveredId;
export const selectFocusedDefaultWidgetId = (state: RootState) => selectDefaultWidgetsState(state).focusedId;
export const selectSelectedDefaultWidgetId = (state: RootState) => selectDefaultWidgetsState(state).selectedId;

export const selectDefaultWidgetCheckStates = createSelector(
  [selectSelectedDefaultWidgetId, selectFocusedDefaultWidgetId, selectHoveredDefaultWidgetId, (_, id) => id],
  (selectedId, focusedId, hoveredId, DefaultWidgetId) => ({
    isSelected: selectedId === DefaultWidgetId,
    isFocused: focusedId === DefaultWidgetId,
    isHovered: hoveredId === DefaultWidgetId,
  }),
);


export const selectAllDefaultWidgets = createSelector(
  [selectDefaultWidgetsEntities, selectDefaultWidgetsIds],
  (entities, ids) => (ids || []).map((id: string) => entities[id]).filter(Boolean) as UiDefaultEntity[],
);


export const selectSelectedDefaultWidget = createSelector(
  [selectSelectedDefaultWidgetId, selectDefaultWidgetsEntities],
  (selectedId, entities) => {
    if (!selectedId || !entities) { return null; }
    return entities[selectedId] || null;
  },
);


export const selectDefaultWidgetByIds = createSelector(
  [selectDefaultWidgetsEntities, (_, ids) => ids],
  (entities, ids) => {
    if (!ids || !entities) { return []; }
    return ids.map((id: string) => entities[id]).filter(Boolean);
  },
);


export const selectDefaultWidgetById = createSelector(
  [selectDefaultWidgetsEntities, (_, id) => id],
  (entities, id) => entities[id] || null,
);


export const selectWidgetsWithChildrens = createSelector(
  [selectDefaultWidgetsEntities, (state) => state],
  (entities, state) => {
    if (!entities) { return []; }

    const allEntities = Object.values(entities);
    const widgets = allEntities.filter((entity: DefaultWidget) => entity.type === ENTITY_KINDS.WIDGET);

    return widgets.map(widget => {
      const children = elementsToTree(allEntities as any, widget.id, ENTITY_KINDS.WIDGET) as any[];
      return {
        ...widget,
        childrens: children,
      };
    });
  },
);

export const selectFlattenWidgetWithChildren = createSelector(
  [(_, id) => id, selectWidgetsWithChildrens],
  (id, entities) => {
    const widget = entities.find((entity: DefaultWidget) => entity.id === id);
    if (!widget) {return [];}

    return elementsToFlatList(widget);
  },
);
