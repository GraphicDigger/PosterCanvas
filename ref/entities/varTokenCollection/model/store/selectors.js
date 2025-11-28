import { createSelector } from '@reduxjs/toolkit';
import { selectAllTokenValues } from '../../@x/tokenValues';
import { selectTokensByCollectionId } from '../../@x/token';
import { selectAllVariableModes } from '../../../varMode/model/store/selectors';

// Базовые селекторы с защитой от некорректного состояния
const selectTokenCollectionState = state => state?.tokenCollectionEntity || {};
const selectTokenCollectionUI = state => selectTokenCollectionState(state)?.ui || {};
const selectTokenCollectionEntities = state => selectTokenCollectionState(state)?.entities || {};
const selectTokenCollectionIds = state => selectTokenCollectionState(state)?.ids || [];

// Селекторы для отдельных частей состояния
export const selectHoveredTokenCollectionId = (state) => selectTokenCollectionUI(state).hoveredTokenCollectionId;
export const selectFocusedTokenCollectionId = (state) => selectTokenCollectionUI(state).focusedTokenCollectionId;
export const selectSelectedTokenCollectionId = (state) => selectTokenCollectionUI(state).selectedTokenCollectionId;

// Состояния коллекции
export const selectTokenCollectionCheckStates = createSelector(
  [selectSelectedTokenCollectionId, selectFocusedTokenCollectionId, selectHoveredTokenCollectionId, (_, id) => id],
  (selectedId, focusedId, hoveredId, tokenCollectionId) => ({
    isSelected: selectedId === tokenCollectionId,
    isFocused: focusedId === tokenCollectionId,
    isHovered: hoveredId === tokenCollectionId,
  }),
);

export const selectSelectedTokenCollection = createSelector(
  [selectSelectedTokenCollectionId, selectTokenCollectionEntities],
  (selectedId, entities) => {
    if (!selectedId || !entities) {return null;}
    return entities[selectedId] || null;

  },
);

export const selectAllTokenCollections = createSelector(
  [selectTokenCollectionIds, selectTokenCollectionEntities],
  (ids, entities) => {
    if (!ids || !entities) {return [];}
    return ids.map(id => entities[id]).filter(Boolean);
  },
);

export const selectTokenCollectionById = createSelector(
  [selectTokenCollectionEntities, (_, id) => id],
  (entities, id) => entities[id] || null,
);

// Stable input selectors to prevent unnecessary re-computations
const selectVariableModesStable = createSelector(
  [selectAllVariableModes],
  (modes) => modes,
);

const selectTokenValuesStable = createSelector(
  [selectAllTokenValues],
  (values) => values,
);

// Селектор для получения коллекции с модами и токенами
export const selectCollectionTokensAndModes = createSelector(
  [(state) => state, selectVariableModesStable, selectTokenValuesStable, (_, collectionId) => collectionId],
  (state, variableModes, tokenValues, collectionId) => {
    if (!collectionId || !variableModes || !tokenValues) {return { tokens: [], modes: [] };}

    const collection = selectTokenCollectionById(state, collectionId);
    const tokens = selectTokensByCollectionId(state, collectionId);

    if (!collection || !collection.variableModeIds) {
      return { tokens: [], modes: [] };
    }

    const collectionModes = collection.variableModeIds
      .map(modeId => variableModes.find(vm => vm.id === modeId))
      .filter(Boolean);

    const collectionTokens = tokens.map(token => {
      if (!token) {return null;}
      const tokenModeValues = {};
      collectionModes.forEach(mode => {
        const value = tokenValues.find(tv => tv.tokenId === token.id && tv.variableModeId === mode.id);
        tokenModeValues[mode.id] = value ? value.value : undefined;
      });
      return { ...token, modeValues: tokenModeValues };
    }).filter(Boolean);

    return {
      modes: collectionModes,
      tokens: collectionTokens,
    };
  },
);
