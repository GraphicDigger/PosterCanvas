import type { PayloadAction } from '@reduxjs/toolkit';
import { defaultWidgetsAdapter } from './slice';
import type { UiDefaultEntityState, UiDefaultEntity } from '../../types';

export const actionsMutation = {

  addDefaultWidget: (state: UiDefaultEntityState, action: PayloadAction<UiDefaultEntity>) => {
    defaultWidgetsAdapter.addOne(state, action.payload);
  },

  updateDefaultWidget: (state: UiDefaultEntityState, action: PayloadAction<UiDefaultEntity>) => {
    defaultWidgetsAdapter.updateOne(state, {
      id: action.payload.id,
      changes: action.payload,
    });
  },

  removeDefaultWidget: (state: UiDefaultEntityState, action: PayloadAction<string>) => {
    defaultWidgetsAdapter.removeOne(state, action.payload);
  },

};
