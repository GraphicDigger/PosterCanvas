import { createSelector } from '@reduxjs/toolkit';
import { COLLECTION_TYPES } from '../constants/collectionTypes';

// Базовые селекторы
const selectPresetCollectionState = state => state.presetCollectionEntity;
const selectPresetCollectionUI = state => state.presetCollectionEntity.ui;
const selectPresetCollectionEntities = state => state.presetCollectionEntity.entities;
const selectPresetCollectionIds = state => state.presetCollectionEntity.ids;

// Селекторы для отдельных частей состояния
export const selectHoveredPresetCollectionId = (state) => selectPresetCollectionUI(state).hoveredPresetCollectionId;
export const selectFocusedPresetCollectionId = (state) => selectPresetCollectionUI(state).focusedPresetCollectionId;
export const selectSelectedPresetCollectionId = (state) => selectPresetCollectionUI(state).selectedPresetCollectionId;

// Состояния коллекции
export const selectPresetCollectionCheckStates = createSelector(
  [selectSelectedPresetCollectionId, selectFocusedPresetCollectionId, selectHoveredPresetCollectionId, (_, id) => id],
  (selectedId, focusedId, hoveredId, presetCollectionId) => ({
    isSelected: selectedId === presetCollectionId,
    isFocused: focusedId === presetCollectionId,
    isHovered: hoveredId === presetCollectionId,
  }),
);

// Все коллекции
export const selectAllPresetCollections = createSelector(
  [selectPresetCollectionIds, selectPresetCollectionEntities],
  (ids, entities) => {
    if (!ids || !entities) {return [];}
    const collections = ids.map(id => entities[id]).filter(Boolean);
    return collections;
  },
);

export const selectDefaultPresetCollection = createSelector(
  [selectAllPresetCollections],
  (collections) => {
    if (!collections) {return null;}
    return collections.filter(collection => collection.type !== undefined);
  },
);

export const selectTypographyPresetCollection = createSelector(
  [selectDefaultPresetCollection],
  (collections) => {
    if (!collections) {return null;}
    return collections.find(collection => collection.type === COLLECTION_TYPES.TYPOGRAPHY);
  },
);

// Коллекция по ID
export const selectPresetCollectionById = createSelector(
  [selectAllPresetCollections, (_, id) => id],
  (collections, id) => collections.find(collection => collection.id === id) || null,
);

// Выбранная коллекция
export const selectSelectedPresetCollection = createSelector(
  [selectSelectedPresetCollectionId, selectPresetCollectionEntities],
  (selectedId, entities) => {
    if (!selectedId || !entities) {return null;}
    return entities[selectedId] || null;
  },
);

