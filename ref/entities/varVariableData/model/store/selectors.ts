import { createSelector } from '@reduxjs/toolkit';
// Remove the circular dependency import
// import { selectSelectedScreenId } from '../../@x/screen';
import { ENTITY_KINDS, VARIABLE_TYPES } from '@/shared/constants';
import { selectSelectedScreenId } from '../../@x/screen';
import { selectSelectedComponentId } from '../../@x/component';

// Базовые селекторы
const selectVariableState = state => state.dataVariableEntity;
const selectVariableUI = state => state.dataVariableEntity?.ui;
const selectVariableEntities = state => state.dataVariableEntity?.entities ?? {};
const selectVariableIds = state => state.dataVariableEntity?.ids ?? [];

// Селекторы для отдельных частей состояния
export const selectHoveredVariableId = (state) => selectVariableUI(state)?.hoveredVariableId ?? null;
export const selectFocusedVariableId = (state) => selectVariableUI(state)?.focusedVariableId ?? null;
export const selectSelectedVariableId = (state) => selectVariableUI(state)?.selectedVariableId ?? null;

export const selectVariableCheckStates = createSelector(
  [selectSelectedVariableId, selectFocusedVariableId, selectHoveredVariableId, (_, id) => id],
  (selectedId, focusedId, hoveredId, variableId) => ({
    isSelected: selectedId === variableId,
    isFocused: focusedId === variableId,
    isHovered: hoveredId === variableId,
  }),
);

// Селекторы данных
export const selectAllVariables = createSelector(
  [selectVariableIds, selectVariableEntities],
  (ids, entities) => {
    const variables = ids.map(id => entities[id]).filter(Boolean);
    return variables;
  },
);

export const selectVariableById = createSelector(
  [selectVariableEntities, (_, id) => id],
  (entities, id) => entities[id],
);

export const selectScreenVariables = createSelector(
  [selectAllVariables],
  (variables) => {
    const filtered = variables.filter(variable => variable.ownership.type === ENTITY_KINDS.SCREEN);
    return filtered;
  },
);

export const selectComponentVariables = createSelector(
  [selectAllVariables],
  (variables) => {
    const filtered = variables.filter(variable => variable.ownership.type === ENTITY_KINDS.COMPONENT);
    return filtered;
  },
);

export const selectVariablesBySelectedScreen = createSelector(
  [selectScreenVariables, (state) => selectSelectedScreenId(state)],
  (variables, screenId) => {
    const allVariables = variables.filter(variable => variable.ownership.id === screenId);
    const dataTypeVariables = allVariables.filter(variable => variable.type === VARIABLE_TYPES.DATA);
    return {
      allVariables,
      dataTypeVariables,
    };
  },
);

export const selectVariablesBySelectedComponent = createSelector(
  [selectComponentVariables, (state) => selectSelectedComponentId(state)],
  (variables, componentId) => {
    const allVariables = variables.filter(variable => variable.ownership.id === componentId);
    const dataTypeVariables = allVariables.filter(variable => variable.type === VARIABLE_TYPES.DATA);
    return {
      allVariables,
      dataTypeVariables,
    };
  },
);

export const selectVariablesByScreenId = createSelector(
  [selectAllVariables, (_, screenId) => screenId],
  (variables, screenId) => {
    const filtered = variables.filter(variable => variable.screenId === screenId);
    return filtered;
  },
);

// component variables
export const selectVariablesByComponentId = createSelector(
  [selectComponentVariables, (_, componentId) => componentId],
  (variables, componentId) => {
    const filtered = variables.filter(variable => variable.componentId === componentId);
    return filtered;
  },
);


export const makeSelectVariableById = (id: string) => createSelector(
  [selectVariableEntities],
  (entities) => entities[id] || null,
);

export const makeSelectVariableByIds = (ids: string[] = []) => createSelector(
  [selectVariableEntities],
  (entities) => ids.map((id) => entities[id]).filter(Boolean),
);
