import { createSelector } from '@reduxjs/toolkit';
import { selectSelectedPresetModeValueId } from './selectorsStates';
import { selectAllVariableModes } from '../../@x/variableMode';

export const selectPresetModeValueState = (state) => state.presetModeValueEntity;
export const selectPresetModeValueEntities = (state) => selectPresetModeValueState(state).entities;
export const selectPresetModeValueIds = (state) => selectPresetModeValueState(state).ids;
export const selectPresetModeValueUI = (state) => selectPresetModeValueState(state).ui;

export const selectPresetModeValueById = (state, id) => selectPresetModeValueEntities(state)[id];

// get all modes
export const selectAllPresetModeValues = createSelector(
  [selectPresetModeValueIds, selectPresetModeValueEntities, selectAllVariableModes],
  (ids, entities, allVariableModes) => {
    if (!ids || !entities) {return [];}

    return ids
      .map(id => {
        const modeValue = entities[id];
        if (!modeValue) {return null;}

        const relatedVariableMode = allVariableModes.find(mode => mode.id === modeValue.variableModeId);
        const isDefault = relatedVariableMode?.isDefault === true;

        return {
          ...modeValue,
          isDefault,
        };
      })
      .filter(Boolean);
  },
);

// selected PresetModeValue
export const selectSelectedPresetModeValue = createSelector(
  [selectSelectedPresetModeValueId, selectPresetModeValueEntities],
  (selectedId, entities) => {
    if (!selectedId || !entities) {return null;}
    return entities[selectedId] || null;
  },
);

export const selectModeValueById = createSelector(
  [selectAllPresetModeValues, (_, id) => id],
  (allModeValues, id) => {
    if (!id || !allModeValues) {return null;}
    return allModeValues.find(modeValue => modeValue.id === id);
  },
);

// get entities by ids
export const selectPresetModeValuesByIds = createSelector(
  [selectPresetModeValueEntities, (_, ids) => ids],
  (entities, ids) => {
    if (!ids || !entities) {return [];}
    return ids.map(id => entities[id]).filter(Boolean);
  },
);

export const selectPresetModeValuesByVariableModeId = createSelector(
  [selectPresetModeValueEntities, (_, variableModeId) => variableModeId],
  (entities, variableModeId) => {
    if (!entities || !variableModeId) {return [];}

    return Object.values(entities)
      .filter(entity => entity && entity.variableModeId === variableModeId);
  },
);

export const selectPresetModeValuesByPresetIds = createSelector(
  [selectPresetModeValueEntities, (_, presetIds) => presetIds],
  (entities, presetIds) => {
    if (!entities || !presetIds) {return [];}
    return Object.values(entities).filter(entity => entity && presetIds.includes(entity.presetId));
  },
);

// фильтр PresetModeValues по variableModeId и collectionPresetsIds
export const selectPresetModeValuesByVariableModeIdAndPresetIds = createSelector(
  [
    selectPresetModeValueEntities,
    (_, variableModeId) => variableModeId,
    (_, __, presetIds) => presetIds,
  ],
  (entities, variableModeId, presetIds) => {
    if (!entities || !variableModeId || !presetIds) {return [];}

    return Object.values(entities)
      .filter(entity =>
        entity &&
                entity.variableModeId === variableModeId &&
                presetIds.includes(entity.presetId));
  },
);

export const selectPresetModeValueByPresetIdAndVariableModeId = createSelector(
  [selectPresetModeValueEntities, (_, presetId) => presetId, (_, __, variableModeId) => variableModeId],
  (entities, presetId, variableModeId) => {
    if (!entities || !presetId || !variableModeId) {return null;}
    return Object.values(entities).find(entity => entity && entity.presetId === presetId && entity.variableModeId === variableModeId);
  },
);
