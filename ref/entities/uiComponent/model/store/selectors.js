import { createSelector } from '@reduxjs/toolkit';
import { componentApi } from '../../api/components.api';
import { selectPropsByComponentId } from '../../@x/props';
import { selectNestedInstancesByComponentId } from '../../@x/instances';

// Базовый селектор для всего состояния
export const selectComponentEntities = (state) => state.componentEntity.entities;
export const selectComponentIds = (state) => state.componentEntity.ids;
export const selectComponentStates = (state) => state.componentEntity.ui;

// Селекторы для отдельных частей состояния
export const selectHoveredComponentId = (state) => state.componentEntity.ui.hoveredComponentId;
export const selectFocusedComponentId = (state) => state.componentEntity.ui.focusedComponentId;
export const selectSelectedComponentId = (state) => state.componentEntity.ui.selectedComponentId;

export const selectComponentById = (state, id) => selectComponentEntities(state)[id];

export const selectComponentCheckStates = createSelector(
  [selectSelectedComponentId, selectFocusedComponentId, selectHoveredComponentId, (_, id) => id],
  (selectedId, focusedId, hoveredId, componentId) => ({
    isSelected: selectedId === componentId,
    isFocused: focusedId === componentId,
    isHovered: hoveredId === componentId,
  }),
);

// allComponents
export const selectAllComponents = createSelector(
  [selectComponentIds, selectComponentEntities],
  (ids, entities) => {
    return ids.map(id => entities[id]);
  },
);

// selectedComponent
export const selectSelectedComponent = createSelector(
  [selectSelectedComponentId, selectComponentEntities],
  (selectedComponentId, entities) => {
    if (!selectedComponentId) {return null;}
    return entities[selectedComponentId];
  },
);

export const selectCompositeComponentById = createSelector(
  [selectComponentEntities, (_, componentId) => componentId, (state) => state],
  (entities, componentId, state) => {
    const component = entities[componentId];
    if (!component) {return null;}
    const componentProps = selectPropsByComponentId(state, componentId);
    return {
      ...component,
      props: componentProps,

    };
  },
);
