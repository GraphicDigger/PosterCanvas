import { PayloadAction } from '@reduxjs/toolkit';
import type { DataModel, DataModelState } from '../../../types';

export const initialEntities = {
  entities: {},
  ids: [],
};

export const actionsQueries = {
  setModels: (state: DataModelState, action: PayloadAction<DataModel[]>) => {
    const models = action.payload;
    state.ids = models.map(model => model.id);
    state.entities = models.reduce((acc, model) => {
      acc[model.id] = model;
      return acc;
    }, {} as Record<string, DataModel>);
  },
};
