import { createSelector } from '@reduxjs/toolkit';
import { ENTITY_KINDS, VARIABLE_TYPES } from '../../../../shared/constants';
import { ELEMENT_TAGS } from '../constants';
import { selectFocusedEntity } from '../../@x/uiFocus';
import { selectVariablesBySelectedScreen, selectVariablesBySelectedComponent, selectAllVariables } from '../../@x/variables';
import { selectRawDataRecordsByModelId } from '../../@x/dataRecord';
import { PRESET_TYPES, selectPresetById } from '../../@x/preset';
import { selectAllProps, selectPropsByComponentId } from '../../@x/props';
import { selectSelectedComponentId } from '../../@x/component';

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

export const selectElementBoundDataRecordsByElementId = createSelector(
  [
    (state) => state,
    (_, elementId) => elementId,
    selectAllVariables,
    selectAllProps,
  ],
  (state, elementId, allVariables, allProps) => {
    const element = selectElementById(state, elementId);
    if (!element) {return null;}

    const bindings = element.bindings || [];
    if (bindings.length === 0) {return null;}

    const dataVariableBinding = bindings.find(b => b.kind === ENTITY_KINDS.DATA_VARIABLE && b.type === VARIABLE_TYPES.DATA);
    const propBinding = bindings.find(b => b.kind === ENTITY_KINDS.PROP && b.type === VARIABLE_TYPES.DATA);

    const dataVariable = allVariables.find(v => v.id === dataVariableBinding?.id);
    const prop = allProps.find(p => p.id === propBinding?.id);

    const modelId = prop?.defaultValue.modelId || dataVariable?.value?.id;
    if (!modelId) {return null;}

    const dataRecords = selectRawDataRecordsByModelId(state, modelId);

    return dataRecords;
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
    if (!binding) {return null;}
    const preset = selectPresetById(state, binding.presetId);
    return {
      ...binding,
      presetName: preset?.name,
    };
  },
);

