import { dataModels } from './dataModels.data';

export const dataModelApi = {
  getModels: async () => {
    // В будущем здесь будет реальный API запрос
    return dataModels;
  },

  getModelById: async (id) => {
    // В будущем здесь будет реальный API запрос
    return dataModels.find(model => model.id === id);
  },
};
