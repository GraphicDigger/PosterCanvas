import { dataModelFields } from './dataModelFields.data';

export const dataModelFieldsApi = {
  getModelsFields: async () => {
    // В будущем здесь будет реальный API запрос
    return dataModelFields;
  },

};
