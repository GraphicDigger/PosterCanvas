import { getPropsData } from './props.data';

// Lazy-loaded props cache - only evaluated when first accessed
let _propsCache = null;
const getPropsCache = () => {
  if (!_propsCache) {
    _propsCache = getPropsData();
  }
  return _propsCache;
};

export const propApi = {
  getProps: () => {
    try {
      const props = getPropsCache();
      const propsArray = Object.values(props);
      // console.log('Props from API:', propsArray);
      return Promise.resolve(propsArray);
    } catch (error) {
      // console.error('API error:', error);
      return Promise.reject(error);
    }
  },

  // Добавляем метод для создания пропа
  addProp: (newProp) => {
    try {
      const props = getPropsCache();
      // Имитируем сохранение в БД
      props[newProp.id] = newProp;
      // console.log('Added new prop:', newProp);
      return Promise.resolve(newProp);
    } catch (error) {
      // console.error('API error while adding prop:', error);
      return Promise.reject(error);
    }
  },

  // Добавляем метод для обновления пропа
  updateProp: (id, updates) => {
    try {
      const props = getPropsCache();
      if (!props[id]) {
        throw new Error(`Prop with id ${id} not found`);
      }
      props[id] = { ...props[id], ...updates };
      // console.log('Updated prop:', props[id]);
      return Promise.resolve(props[id]);
    } catch (error) {
      // console.error('API error while updating prop:', error);
      return Promise.reject(error);
    }
  },

  // Добавляем метод для удаления пропа
  deleteProp: (id) => {
    try {
      const props = getPropsCache();
      if (!props[id]) {
        throw new Error(`Prop with id ${id} not found`);
      }
      delete props[id];
      // console.log('Deleted prop with id:', id);
      return Promise.resolve(id);
    } catch (error) {
      // console.error('API error while deleting prop:', error);
      return Promise.reject(error);
    }
  },

  // For testing: reset the cache
  _resetCache: () => {
    _propsCache = null;
  },
};
