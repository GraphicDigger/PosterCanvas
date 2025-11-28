import { v4 as uuidv4 } from 'uuid';
import { ENTITY_KINDS, VARIABLE_TYPES } from '@/shared/constants';

export const actionsMutation = {

  addProp: (state, action) => {
    const { componentId, type } = action.payload;
    console.log('[addProp] componentId: ', componentId);
    console.log('[addProp] type: ', type);
    const defaultValues = {
      [VARIABLE_TYPES.STRING]: '',
      [VARIABLE_TYPES.NUMBER]: 0,
      [VARIABLE_TYPES.BOOLEAN]: false,
      [VARIABLE_TYPES.COLOR]: '#000000',
      [VARIABLE_TYPES.IMAGE]: '',
      [VARIABLE_TYPES.VIDEO]: '',
      [VARIABLE_TYPES.DATA]: { modelId: 'model0' },
      [VARIABLE_TYPES.DATE]: new Date().toISOString(),
      [VARIABLE_TYPES.JSON]: '{}',
    };

    const newProp = {
      id: uuidv4(),
      name: `${type}Prop`,
      kind: ENTITY_KINDS.PROP,
      type,
      componentId,
      defaultValue: defaultValues[type],
    };

    if (!state.entities[newProp.id]) {
      state.entities[newProp.id] = newProp;
      state.ids.push(newProp.id);

      if (newProp.componentId) {
        if (!state.byComponent[newProp.componentId]) {
          state.byComponent[newProp.componentId] = [];
        }
        if (!state.byComponent[newProp.componentId].includes(newProp.id)) {
          state.byComponent[newProp.componentId].push(newProp.id);
        }
      }
    }
  },

  updateProp: (state, action) => {
    const { id, ...updates } = action.payload;
    if (state.entities[id]) {
      state.entities[id] = { ...state.entities[id], ...updates };
    }
  },

  deleteProp: (state, action) => {
    const propId = action.payload;
    const prop = state.entities[propId];

    if (prop) {
      // Удаляем из byComponent
      if (prop.componentId && state.byComponent[prop.componentId]) {
        state.byComponent[prop.componentId] = state.byComponent[prop.componentId]
          .filter(id => id !== propId);
      }

      // Удаляем из ids
      state.ids = state.ids.filter(id => id !== propId);

      // Удаляем из entities
      delete state.entities[propId];
    }
  },

  addValueToProp: (state, action) => {
    const { propId, valueId } = action.payload;
    const prop = state.entities[propId];
    if (prop) {
      prop.valueIds = prop.valueIds || [];
      if (!prop.valueIds.includes(valueId)) {
        prop.valueIds.push(valueId);
      }
    }
  },

  removeValueFromProp: (state, action) => {
    const { propId, valueId } = action.payload;
    const prop = state.entities[propId];
    if (prop && prop.valueIds) {
      prop.valueIds = prop.valueIds.filter(id => id !== valueId);
    }
  },


  bindigPropsToComponent: (state, action) => {
    const { componentId, propIds } = action.payload;

    if (!componentId || !propIds || propIds.length === 0) {return;}
    // Инициализируем массив для компонента, если его нет
    if (!state.byComponent[componentId]) {
      state.byComponent[componentId] = [];
    }

    // Добавляем каждый проп к компоненту
    propIds.forEach(propId => {
      if (state.entities[propId] && !state.byComponent[componentId].includes(propId)) {
        state.byComponent[componentId].push(propId);
        // Также обновляем componentId в самом пропсе
        state.entities[propId].componentId = componentId;
      }
    });
  },

};
