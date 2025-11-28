import { createSelector } from '@reduxjs/toolkit';

// Базовые селекторы
const selectVariantState = state => state.variantEntity;
const selectVariantEntities = state => state.variantEntity.entities;
const selectVariantIds = state => state.variantEntity.ids;
const selectVariantByComponent = state => state.variantEntity.byComponent;
const selectVariantUI = state => state.variantEntity.ui;

// UI селекторы
export const selectHoveredVariantId = state => selectVariantUI(state).hoveredVariantId;
export const selectFocusedVariantId = state => selectVariantUI(state).focusedVariantId;
export const selectSelectedVariantId = state => selectVariantUI(state).selectedVariantId;

export const selectVariantCheckStates = createSelector(
  [selectSelectedVariantId, selectFocusedVariantId, selectHoveredVariantId, (_, id) => id],
  (selectedId, focusedId, hoveredId, variantId) => ({
    isSelected: selectedId === variantId,
    isFocused: focusedId === variantId,
    isHovered: hoveredId === variantId,
  }),
);

// selectedVariant
export const selectSelectedVariant = createSelector(
  [selectSelectedVariantId, selectVariantEntities],
  (selectedVariantId, entities) => {
    if (!selectedVariantId) {return null;}
    return entities[selectedVariantId];
  },
);

export const selectAllVariants = createSelector(
  [selectVariantIds, selectVariantEntities],
  (ids, entities) => ids.map(id => entities[id]),
);

export const selectVariantById = createSelector(
  [selectVariantEntities, (_, id) => id],
  (entities, id) => entities[id],
);

// Селектор для получения вариантов компонента
export const selectVariantsByComponentId = createSelector(
  [selectVariantByComponent, selectVariantEntities, (_, componentId) => componentId],
  (byComponent, entities, componentId) => {
    const variantIds = byComponent[componentId] || [];
    return variantIds.map(id => entities[id]);
  },
);
