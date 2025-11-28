import { createSelector } from '@reduxjs/toolkit';
import { ENTITY_KINDS, VARIABLE_TYPES } from '../../../../shared/constants';
import { ELEMENT_TAGS } from '../constants';
import { selectVariablesBySelectedScreen, selectVariablesBySelectedComponent, selectAllVariables } from '../../@x/variables';
import { selectRawDataRecordsByModelId } from '../../@x/dataRecord';
import { PRESET_TYPES, selectPresetById } from '../../@x/preset';
import { selectAllProps, selectPropsByComponentId } from '../../@x/props';
import { selectSelectedComponentId } from '../../@x/component';

// Base selectors
export const selectElementEntities = state => state.elementEntity.entities;
export const selectElementIds = state => state.elementEntity.ids;
export const selectElementUI = state => state.elementEntity.ui;
export const selectElementOwnership = state => state.elementEntity.ownership;

// UI selectors
export const selectHoveredElementId = state => selectElementUI(state).hoveredElementId;
export const selectFocusedElementId = state => selectElementUI(state).focusedElementId;
export const selectSelectedElementId = state => selectElementUI(state).selectedElementId;

export const selectSelectedElementById = createSelector(
  [selectElementEntities, (_, id) => id],
  (entities, id) => entities[id],
);

// Check states
export const selectElementCheckStates = createSelector(
  [selectSelectedElementId, selectFocusedElementId, selectHoveredElementId, (_, id) => id],
  (selectedId, focusedId, hoveredId, elementId) => ({
    isSelected: selectedId === elementId,
    isFocused: focusedId === elementId,
    isHovered: hoveredId === elementId,
  }),
);
// Selected element
export const selectSelectedElement = createSelector(
  [selectSelectedElementId, selectElementEntities],
  (selectedId, entities) => selectedId ? entities[selectedId] : null,
);

// Entity selectors
export const selectAllElements = createSelector(
  [selectElementIds, selectElementEntities],
  (ids, entities) => ids.map(id => entities[id]),
);

export const selectElementById = createSelector(
  [selectElementEntities, (_, id) => id],
  (entities, id) => entities[id],
);

// Ownership selectors
export const selectElementsByOwnership = createSelector(
  [
    selectElementEntities,
    selectElementOwnership,
    (_, props) => props,
  ],
  (entities, ownership, { type, ownerId }) => {
    const elementIds = ownership[type]?.[ownerId] || [];
    return elementIds.map(id => entities[id]).filter(Boolean);
  },
);

// Селектор для получения элементов, принадлежащих экрану
export const selectElementsByScreenId = createSelector(
  [selectElementEntities, selectElementOwnership, (_, screenId) => screenId],
  (entities, ownership, screenId) => {
    const elementIds = ownership[ENTITY_KINDS.SCREEN]?.[screenId] || [];
    return elementIds.map(id => entities[id]).filter(Boolean);
  },
);

// Селектор для получения элементов, принадлежащих компоненту
export const selectElementsByComponentId = createSelector(
  [selectElementEntities, selectElementOwnership, (_, componentId) => componentId],
  (entities, ownership, componentId) => {
    const elementIds = ownership[ENTITY_KINDS.COMPONENT]?.[componentId] || [];
    return elementIds.map(id => entities[id]).filter(Boolean);
  },
);

export const selectElementIdsByScreenId = createSelector(
  [selectElementEntities, selectElementOwnership, (_, screenId) => screenId],
  (entities, ownership, screenId) => {
    const elementIds = ownership[ENTITY_KINDS.SCREEN]?.[screenId] || [];
    return elementIds.map(id => entities[id]).filter(Boolean);
  },
);

// Map всех экранов к их root элементам / Map of all screens to their root elements
export const selectScreenCanvasMap = createSelector(
  [selectElementEntities],
  (entities) => {
      const map = {};
      // Проходим по всем элементам и находим canvas элементы / Iterate through all elements and find canvas elements
      Object.values(entities).forEach(element => {
          // Проверяем, что это canvas элемент с ownership экрана / Check if this is a canvas element with screen ownership
          if (
              element?.attributes?.id === 'canvas' &&
              element?.ownership?.type === ENTITY_KINDS.SCREEN &&
              element?.ownership?.id
          ) {
              const screenId = element.ownership.id;
              map[screenId] = element;
          }
      });
      return map;
  }
);

export const selectCanvasByScreenId = createSelector(
    [selectScreenCanvasMap, (_, screenId) => screenId],
    (canvasMap, screenId) => {
        return canvasMap[screenId] || null;
    }
);


export const selectElementBoundVariablesByElementId = createSelector(
  [
    selectElementEntities,
    selectVariablesBySelectedScreen,
    selectVariablesBySelectedComponent,
    (state) => selectPropsByComponentId(state, selectSelectedComponentId(state)),
    (_, elementId) => elementId,
  ],
  (entities, variablesByScreen, variablesByComponent, propsBySelectedComponent, elementId) => {
    const screenVariables = variablesByScreen.allVariables.filter(variable => entities[elementId]?.bindings?.some(v => v.id === variable.id));
    const componentVariables = variablesByComponent.allVariables.filter(variable => entities[elementId]?.bindings?.some(v => v.id === variable.id));
    const componentProps = propsBySelectedComponent.filter(prop => entities[elementId]?.bindings?.some(v => v.id === prop.id));
    const variables = [...screenVariables, ...componentVariables, ...componentProps];
    return variables;
  },
);

export const selectElementBoundTypographyPresetByElementId = createSelector(
  [
    (state) => state,
    selectElementEntities,
    (_, elementId) => elementId,
  ],
  (state, entities, elementId) => {
    const binding = entities[elementId]?.bindings?.find(preset => preset.kind === ENTITY_KINDS.PRESET_MODE_VALUE && preset.presetType === PRESET_TYPES.TYPOGRAPHY);
    if (!binding) { return null; }
    const preset = selectPresetById(state, binding.presetId);
    return {
      ...binding,
      presetName: preset?.name,
    };
  },
);

export const selectElementAttributesByElementId = createSelector(
    [selectElementEntities, (_, elementId) => elementId],
    (entities, elementId) => {
        const attributes = entities[elementId]?.attributes || [];
        return attributes;
    },
);

export const selectElementCssClassesByElementId = createSelector(
    [selectElementEntities, (_, elementId) => elementId],
    (entities, elementId) => {
        const classes = entities[elementId]?.attributes?.classes || [];
        return classes;
    },
);


// export const selectElementBoundDataRecordsByElementId = createSelector(
//     [
//         (state) => state,
//         (_, elementId) => elementId,
//         selectAllVariables,
//         selectAllProps
//     ],
//     (state, elementId, allVariables, allProps) => {
//         const element = selectElementById(state, elementId);
//         if (!element) return null;
//
//         const bindings = element.bindings || [];
//         if (bindings.length === 0) return null;
//
//         const dataVariableBinding = bindings.find(b => b.kind === ENTITY_KINDS.DATA_VARIABLE && b.type === VARIABLE_TYPES.DATA);
//         const propBinding = bindings.find(b => b.kind === ENTITY_KINDS.PROP && b.type === VARIABLE_TYPES.DATA);
//
//         const dataVariable = allVariables.find(v => v.id === dataVariableBinding?.id);
//         const prop = allProps.find(p => p.id === propBinding?.id);
//
//         const modelId = prop?.defaultValue.modelId || dataVariable?.value?.id;
//         if (!modelId) return null
//
//         const dataRecords = selectRawDataRecordsByModelId(state, modelId);
//
//         return dataRecords;
//     }
// );

