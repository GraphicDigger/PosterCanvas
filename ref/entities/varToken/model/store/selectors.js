import { createSelector } from '@reduxjs/toolkit';
import { TOKEN_TYPES } from '../constants/tokenTypes';

// base selectors
const selectTokenState = state => state.tokenEntity;
const selectTokenEntities = state => state.tokenEntity.entities;
const selectTokenIds = state => state.tokenEntity.ids;
const selectTokenUI = state => state.tokenEntity.ui;

// token UI selectors
export const selectHoveredTokenId = state => selectTokenUI(state).hoveredTokenId;
export const selectFocusedTokenId = state => selectTokenUI(state).focusedTokenId;
export const selectSelectedTokenId = state => selectTokenUI(state).selectedTokenId;

// token states
export const selectTokenCheckStates = createSelector(
  [selectTokenUI, (_, id) => id],
  (ui, tokenId) => ({
    isSelected: ui.selectedTokenId === tokenId,
    isFocused: ui.focusedTokenId === tokenId,
    isHovered: ui.hoveredTokenId === tokenId,
  }),
);

// selected token
export const selectSelectedToken = createSelector(
  [selectSelectedTokenId, selectTokenEntities],
  (selectedId, entities) => {
    if (!selectedId) {return null;}
    return entities[selectedId];
  },
);

// tokens by type
export const selectTokensByType = createSelector(
  [selectTokenEntities, (_, type) => type],
  (entities, type) => {
    return Object.values(entities).filter(token => token.type === type);
  },
);

// all tokens
export const selectAllTokens = createSelector(
  [selectTokenIds, selectTokenEntities],
  (ids, entities) => {
    // console.log('ids', ids);
    // console.log('entities', entities);
    if (!ids || !entities) {return [];}
    return ids.map(id => entities[id]).filter(Boolean);
  },
);

export const selectTokenById = createSelector(
  [selectTokenEntities, (_, id) => id],
  (entities, id) => entities[id],
);

// tokens by ids
export const selectTokensByIds = createSelector(
  [selectTokenEntities, (_, ids) => ids],
  (entities, ids) => {
    if (!ids || !ids.length) {return [];}
    return ids.map(id => entities[id]).filter(Boolean);
  },
);

// Check is color token
export const selectIsColorToken = createSelector(
  [selectTokenEntities, (_, color) => color],
  (entities, color) => {
    return Object.values(entities).some(token =>
      token.type === TOKEN_TYPES.COLOR && token.mode?.value === color,
    );
  },
);

export const selectTokensByCollectionId = createSelector(
  [selectTokenEntities, (_, collectionId) => collectionId],
  (entities, collectionId) => {
    return Object.values(entities).filter(token => token.collectionId === collectionId);
  },
);

