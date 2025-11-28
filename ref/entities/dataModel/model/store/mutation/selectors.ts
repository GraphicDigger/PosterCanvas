import { createSelector } from '@reduxjs/toolkit';
import { selectEntities, selectIds } from '../selectors';
import type { DataModel } from '../../../types';

// Mutation selectors
export const selectDataModelById = createSelector(
  [selectEntities, (state: { dataModelEntity: any }, id: string) => id],
  (entities, id): DataModel | undefined => entities[id],
);

export const selectDataModelExists = createSelector(
  [selectEntities, (state: { dataModelEntity: any }, id: string) => id],
  (entities, id): boolean => id in entities,
);

export const selectDataModelCount = createSelector(
  [selectIds],
  (ids): number => ids.length,
);

export const selectDataModelIds = createSelector(
  [selectIds],
  (ids): string[] => [...ids],
);

export const selectDataModelEntities = createSelector(
  [selectEntities],
  (entities): Record<string, DataModel> => ({ ...entities }),
);
