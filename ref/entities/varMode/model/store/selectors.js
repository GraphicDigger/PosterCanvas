import { createSelector } from '@reduxjs/toolkit';
import { selectSelectedVariableModeId } from './selectorsStates';
import { selectVariableModeGroupById } from '../../@x/variableModeGroup';
import { selectPresetCollectionById, selectSelectedPresetCollection } from '../../../varPresetCollection/model/store/selectors';

export const selectVariableModeState = (state) => state?.variableModeEntity || {};
export const selectVariableModeEntities = (state) => selectVariableModeState(state)?.entities || {};
export const selectVariableModeIds = (state) => selectVariableModeState(state)?.ids || [];
export const selectVariableModeUI = (state) => selectVariableModeState(state)?.ui || {};

export const selectVariableModeById = (state, id) => selectVariableModeEntities(state)[id];

// selected VariableMode
export const selectSelectedVariableMode = createSelector(
  [selectSelectedVariableModeId, selectVariableModeEntities],
  (selectedId, entities) => {
    if (!selectedId || !entities) {return null;}
    return entities[selectedId] || null;
  },
);

// get all modes
export const selectAllVariableModes = createSelector(
  [state => state, selectVariableModeIds, selectVariableModeEntities],
  (state, ids, entities) => {
    if (!ids || !entities) {return [];}
    const modes = ids.map(id => entities[id]).filter(Boolean);
    return modes.map(mode => ({
      ...mode,
      modeGroup: selectVariableModeGroupById(state, mode.modeGroupId),
    }));
  },
);

// get entities by ids
export const selectVariableModesByIds = createSelector(
  [selectVariableModeEntities, (_, ids) => ids],
  (entities, ids) => {
    if (!ids || !entities) {return [];}
    return ids.map(id => entities[id]).filter(Boolean);
  },
);

export const selectVariableModesByVariableId = createSelector(
  [selectVariableModeEntities, (_, VariableId) => VariableId],
  (entities, VariableId) => {
    if (!VariableId || !entities) {return [];}
    return Object.values(entities).filter(mode => mode.VariableId === VariableId);
  },
);

export const selectVariableModesByType = createSelector(
  [selectVariableModeEntities, (_, type) => type],
  (entities, type) => {
    if (!type || !entities) {return [];}
    return Object.values(entities).filter(mode => mode.type === type);
  },
);

export const selectVariableModesByModeGroupType = createSelector(
  [selectAllVariableModes, (_, modeGroupType) => modeGroupType],
  (entities, modeGroupType) => {
    if (!modeGroupType || !entities) {return [];}
    const modes = Object.values(entities).filter(mode => mode.modeGroup?.type === modeGroupType);
    return modes;
  },
);

export const selectVariableModesByVariableModeGroupId = createSelector(
  [selectVariableModeEntities, (_, modeGroupId) => modeGroupId],
  (entities, modeGroupId) => {
    if (!modeGroupId || !entities) {return [];}
    return Object.values(entities).filter(mode => mode.modeGroupId === modeGroupId);
  },
);

// получить по ids и найти isDefault
export const selectDefaultVariableModeByIds = createSelector(
  [selectAllVariableModes, (_, ids) => ids],
  (allModes, ids) => {
    if (!ids || !allModes) {return [];}
    const defaultMode = ids.map(id => allModes.find(mode => mode.id === id)).filter(Boolean).find(entity => entity.isDefault);
    return defaultMode;
  },
);

export const selectDefaultVariableModeByCollectionId = createSelector(
  [state => state, (_, collectionId) => collectionId],
  (state, collectionId) => {
    console.log('[selectDefaultVariableModeByCollectionId] collectionId', collectionId);
    if (!collectionId) {return [];}
    const collection = selectPresetCollectionById(state, collectionId);
    const defaultMode = selectDefaultVariableModeByIds(state, collection.variableModeIds);
    return defaultMode;
  },
);

export const selectVariableModesByCollectionId = createSelector(
  [selectAllVariableModes, (state, collectionId) => selectPresetCollectionById(state, collectionId)],
  (variableModes, presetCollection) => {
    if (!presetCollection || !variableModes) {return [];}
    const collectionModes = variableModes.filter(variableMode => presetCollection.variableModeIds.includes(variableMode.id));
    return collectionModes;
  },
);

export const selectSelectedCollectionModes = createSelector(
  [selectAllVariableModes, selectSelectedPresetCollection],
  (variableModes, selectedCollection) => {
    if (!selectedCollection || !variableModes || !selectedCollection.variableModeIds) {return [];}
    return variableModes.filter(variableMode => selectedCollection.variableModeIds.includes(variableMode.id));
  },
);

