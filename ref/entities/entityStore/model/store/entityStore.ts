import { entityAdapters } from './entityAdapters';
import { RootState } from '@/app/store';

export const entityStore = {
  selectors: {
    getById: (state: RootState, entityKind: any, entityId: any) =>
      entityAdapters[entityKind]?.getById(state, entityId) ?? null,

    getSelected: (state: RootState, entityKind: any) =>
      entityAdapters[entityKind]?.getSelected(state) ?? null,
  },

  actions: {
    select: (entityKind: any, entityId: any) =>
      entityAdapters[entityKind]?.select(entityId) ?? null,

    resetSelected: (entityKind: any) =>
      entityAdapters[entityKind]?.resetSelected() ?? null,
  },
};

export const { selectors: entitySelectors, actions: entityActions } = entityStore;
