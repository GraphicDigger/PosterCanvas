import { createSelector } from '@reduxjs/toolkit';
import { selectAllPresetModeValues } from '../../@x/presetModeValue';
import { COLLECTION_TYPES, selectDefaultPresetCollection, selectPresetCollectionById } from '../../@x/presetCollection';
import { selectAllVariableModes } from '../../@x/variableMode';

// base selectors
const selectPresetState = (state) => state.presetEntity;
export const selectPresetEntities = (state) => selectPresetState(state).entities;
export const selectPresetIds = (state) => selectPresetState(state).ids;

// token UI selectors
const selectPresetUI = (state) => selectPresetState(state).ui;
export const selectHoveredPresetId = state => selectPresetUI(state).hoveredPresetId;
export const selectFocusedPresetId = state => selectPresetUI(state).focusedPresetId;
export const selectSelectedPresetId = state => selectPresetUI(state).selectedPresetId;

// token states
export const selectPresetCheckStates = createSelector(
  [selectPresetUI, (_, id) => id],
  (ui, presetId) => ({
    isSelected: ui.selectedPresetId === presetId,
    isFocused: ui.focusedPresetId === presetId,
    isHovered: ui.hoveredPresetId === presetId,
  }),
);

// selected preset
export const selectSelectedPreset = createSelector(
  [selectSelectedPresetId, selectPresetEntities],
  (selectedId, entities) => {
    if (!selectedId) {return null;}
    return entities[selectedId];
  },
);

// presets by type
export const selectPresetsByType = createSelector(
  [selectPresetEntities, (_, type) => type],
  (entities, type) => {
    return Object.values(entities).filter(preset => preset.type === type);
  },
);

// all presets
export const selectAllPresets = createSelector(
  [selectPresetIds, selectPresetEntities, selectAllPresetModeValues],
  (ids, entities, presetModeValues) => {
    if (!ids || !entities || !presetModeValues) {return [];}
    return ids.map(id => {
      const preset = entities[id];
      const modeValues = presetModeValues.filter(modeValue => modeValue.presetId === id);
      return {
        ...preset,
        modeValues,
      };
    }).filter(Boolean);
  },
);

export const selectPresetById = createSelector(
  [selectPresetEntities, (_, id) => id],
  (entities, id) => entities[id],
);

// presets by ids
export const selectPresetsByIds = createSelector(
  [selectPresetEntities, (_, ids) => ids],
  (entities, ids) => {
    if (!ids || !ids.length) {return [];}
    return ids.map(id => entities[id]).filter(Boolean);
  },
);

export const selectPresetsByCollectionId = createSelector(
  [selectAllPresets, (_, collectionId) => collectionId],
  (presets, collectionId) => {
    if (!collectionId || !presets) {return [];}
    return presets.filter(preset => preset.collectionId === collectionId);
  },
);

export const selectTypographyCollectionPresets = createSelector(
  [selectDefaultPresetCollection, selectAllPresets],
  (collections, presets) => {
    const typographyCollection = collections?.find(collection => collection.type === COLLECTION_TYPES.TYPOGRAPHY);
    return presets.filter(preset => preset.collectionId === typographyCollection?.id);
  },
);

export const selectCollectionPresetsAndModes = createSelector(
  [(state) => state, selectAllVariableModes, selectAllPresetModeValues, (_, collectionId) => collectionId],
  (state, variableModes, presetValues, collectionId) => {
    if (!collectionId || !variableModes || !presetValues) {return { presets: [], modes: [] };}

    const collection = selectPresetCollectionById(state, collectionId);
    const presets = selectPresetsByCollectionId(state, collectionId);

    const collectionModes = collection?.variableModeIds
      .map(modeId => variableModes.find(vm => vm.id === modeId))
      .filter(Boolean);

    const collectionPresets = presets.map(preset => {
      if (!preset) {return null;}
      const presetModeValues = {};
      collectionModes.forEach(mode => {
        const value = presetValues.find(pmv => pmv.presetId === preset.id && pmv.variableModeId === mode.id);
        presetModeValues[mode.id] = value ? value.value : undefined;
      });
      return { ...preset, modeValues: presetModeValues };
    }).filter(Boolean);

    return {
      modes: collectionModes,
      presets: collectionPresets,
    };
  },
);
