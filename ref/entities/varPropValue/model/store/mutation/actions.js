import { v4 as uuidv4 } from 'uuid';
export const actionsMutation = {

  addPropValue: (state, action) => {
    const { propId, type } = action.payload;
    const defaultValue = {
      string: '',
      number: 0,
      boolean: false,
      color: '#000000',
    }[type] || '';

    const newValue = {
      id: uuidv4(),
      name: 'New Value',
      value: defaultValue,
      propId,
      type,
      isDefault: false,
    };
    state.entities[newValue.id] = newValue;
    state.ids.push(newValue.id);

    if (newValue.propId) {
      if (!state.byProp[newValue.propId]) {
        state.byProp[newValue.propId] = [];
      }
      if (!state.byProp[newValue.propId].includes(newValue.id)) {
        state.byProp[newValue.propId].push(newValue.id);
      }
    }
  },

  updatePropValue: (state, action) => {
    const { id, propId, ...updates } = action.payload;
    if (state.entities[id]) {
      state.entities[id] = { ...state.entities[id], propId, ...updates };
    }
  },

  changeDefaultPropValue: (state, action) => {
    const id = action.payload;
    const targetValue = state.entities[id];

    if (!targetValue) {return;}

    const propId = targetValue.propId;
    if (!propId || !state.byProp[propId]) {return;}

    const propValueIds = state.byProp[propId];

    // Если кликнутое значение уже дефолтное - просто отключаем его
    if (targetValue.isDefault === true) {
      state.entities[id].isDefault = false;
      return;
    }

    // Иначе отключаем все дефолтные и устанавливаем новый дефолт
    propValueIds.forEach(valueId => {
      const propValue = state.entities[valueId];
      if (propValue && propValue.isDefault === true) {
        state.entities[valueId].isDefault = false;
      }
    });

    // Устанавливаем новый дефолт
    state.entities[id].isDefault = true;
  },

  deletePropValue: (state, action) => {
    const id = action.payload;
    const propId = state.entities[id]?.propId;

    delete state.entities[id];
    state.ids = state.ids.filter(valueId => valueId !== id);

    if (propId && state.byProp[propId]) {
      state.byProp[propId] = state.byProp[propId].filter(
        valueId => valueId !== id,
      );
    }
  },
};
