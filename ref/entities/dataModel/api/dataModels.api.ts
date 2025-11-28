import { dataModels } from './dataModels.data';
import type { DataModel, DataModelQuery } from '../types';

export const dataModelApi = {
  /**
   * Get all data models
   */
  getModels: async (query?: DataModelQuery): Promise<DataModel[]> => {
    // In the future, this will be a real API request
    let result = [...dataModels];

    if (query?.search) {
      const searchTerm = query.search.toLowerCase();
      result = result.filter(model =>
        model.name.toLowerCase().includes(searchTerm) ||
        model.description?.toLowerCase().includes(searchTerm),
      );
    }

    if (query?.filterBy && query.filterBy.length > 0) {
      result = result.filter(model =>
        query.filterBy!.some(filter => model.tags?.includes(filter)),
      );
    }

    if (query?.sortBy) {
      result.sort((a, b) => {
        const aValue = a[query.sortBy as keyof DataModel] as string;
        const bValue = b[query.sortBy as keyof DataModel] as string;
        const order = query.sortOrder === 'desc' ? -1 : 1;
        return aValue.localeCompare(bValue) * order;
      });
    }

    if (query?.limit) {
      const offset = query.offset || 0;
      result = result.slice(offset, offset + query.limit);
    }

    return result;
  },

  /**
   * Get data model by ID
   */
  getModelById: async (id: string): Promise<DataModel | undefined> => {
    // In the future, this will be a real API request
    return dataModels.find(model => model.id === id);
  },

  /**
   * Create new data model
   */
  createModel: async (modelData: Omit<DataModel, 'id' | 'createdAt' | 'updatedAt'>): Promise<DataModel> => {
    // In the future, this will be a real API request
    const newModel: DataModel = {
      ...modelData,
      id: `model-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 100));

    return newModel;
  },

  /**
   * Update existing data model
   */
  updateModel: async (id: string, updates: Partial<DataModel>): Promise<DataModel | undefined> => {
    // In the future, this will be a real API request
    const existingModel = dataModels.find(model => model.id === id);
    if (!existingModel) {return undefined;}

    const updatedModel: DataModel = {
      ...existingModel,
      ...updates,
      id, // Ensure ID doesn't change
      updatedAt: new Date().toISOString(),
    };

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 100));

    return updatedModel;
  },

  /**
   * Delete data model
   */
  deleteModel: async (id: string): Promise<boolean> => {
    // In the future, this will be a real API request
    const modelIndex = dataModels.findIndex(model => model.id === id);
    if (modelIndex === -1) {return false;}

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 100));

    return true;
  },
};
