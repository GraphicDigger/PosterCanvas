import { createSelector } from '@reduxjs/toolkit';

// Базовые селекторы
const selectCodeState = state => state.codeEntity;
const selectCodeUI = state => state.codeEntity.ui;
const selectCodeEntities = state => state.codeEntity.entities;
const selectCodeIds = state => state.codeEntity.ids;

// UI селекторы
export const selectHoveredCodeId = (state) => selectCodeUI(state).hoveredCodeId;
export const selectFocusedCodeId = (state) => selectCodeUI(state).focusedCodeId;
export const selectSelectedCodeId = (state) => selectCodeUI(state).selectedCodeId;

// Селекторы состояний
export const selectCodeCheckStates = createSelector(
  [selectSelectedCodeId, selectFocusedCodeId, selectHoveredCodeId, (_, id) => id],
  (selectedId, focusedId, hoveredId, codeId) => ({
    isSelected: selectedId === codeId,
    isFocused: focusedId === codeId,
    isHovered: hoveredId === codeId,
  }),
);

// all codes
export const selectAllCodes = createSelector(
  [selectCodeIds, selectCodeEntities],
  (ids, entities) => ids.map(id => entities[id]),
);

// code types
export const selectCodesByType = createSelector(
  [selectAllCodes, (_, type) => type],
  (codes, type) => codes.filter(code => code.type === type),
);

export const selectCodeById = createSelector(
  [selectCodeEntities, (_, id) => id],
  (entities, id) => entities[id],
);

// selected code
export const selectSelectedCode = createSelector(
  [selectSelectedCodeId, selectCodeEntities],
  (selectedCodeId, entities) => {
    if (!selectedCodeId) {return null;}
    return entities[selectedCodeId];
  },
);

// component codes
export const selectCodesByComponentId = createSelector(
  [selectAllCodes, (_, componentId) => componentId],
  (codes, componentId) => codes.filter(code =>
    code.componentId === componentId,
  ).sort((a, b) => {
    if (a.lang === 'jsx' && b.lang === 'css') {return -1;}
    if (a.lang === 'css' && b.lang === 'jsx') {return 1;}
    return 0;
  }),
);

// screen codes
export const selectCodesByScreenId = createSelector(
  [selectAllCodes, (_, screenId) => screenId],
  (codes, screenId) => codes.filter(code =>
    code.screenId === screenId,
  ).sort((a, b) => {
    if (a.lang === 'jsx' && b.lang === 'css') {return -1;}
    if (a.lang === 'css' && b.lang === 'jsx') {return 1;}
    return 0;
  }),
);
