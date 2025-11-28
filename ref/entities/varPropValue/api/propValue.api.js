import { propValues } from './propValue.data';

export const propValueApi = {


  getPropValues: () => {
    try {
      const propValuesArray = Object.values(propValues);
      return Promise.resolve(propValuesArray);
    } catch (error) {
      return Promise.reject(error);
    }
  },

  addPropValue: (newPropValue) => {
    try {
      // Создаем новый объект propValues с добавленным значением
      const updatedPropValues = {
        ...propValues,
        [newPropValue.id]: newPropValue,
      };

      Object.assign(propValues, updatedPropValues);

      return Promise.resolve(newPropValue);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  updatePropValue: (id, updates) => {
    try {
      if (!propValues[id]) {
        throw new Error(`PropValue with id ${id} not found`);
      }

      // Создаем новый объект для обновляемого значения
      const updatedValue = {
        ...propValues[id],
        ...updates,
      };

      // Создаем новый объект propValues с обновленным значением
      const updatedPropValues = {
        ...propValues,
        [id]: updatedValue,
      };

      // Обновляем исходный объект
      Object.assign(propValues, updatedPropValues);

      return Promise.resolve(updatedValue);
    } catch (error) {
      return Promise.reject(error);
    }
  },

  deletePropValue: (id) => {
    try {
      if (!propValues[id]) {
        throw new Error(`PropValue with id ${id} not found`);
      }

      // Создаем новый объект без удаляемого значения
      const { [id]: removed, ...updatedPropValues } = propValues;

      // Обновляем исходный объект
      Object.assign(propValues, updatedPropValues);

      return Promise.resolve(true);
    } catch (error) {
      return Promise.reject(error);
    }
  },
};
