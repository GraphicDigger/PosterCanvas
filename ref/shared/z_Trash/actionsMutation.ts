import type { PayloadAction } from '@reduxjs/toolkit';
import { defaultElementsAdapter } from '../uiEditorDefaults/elements/model/store/slice';
import type { DefaultElementsState, DefaultElement } from '../uiEditorDefaults/elements/types';

export const actionsMutation = {

  addDefaultElement: (state: DefaultElementsState, action: PayloadAction<DefaultElement>) => {
    defaultElementsAdapter.addOne(state, action.payload);
  },

  updateDefaultElement: (state: DefaultElementsState, action: PayloadAction<DefaultElement>) => {
    defaultElementsAdapter.updateOne(state, {
      id: action.payload.id,
      changes: action.payload,
    });
  },

  removeDefaultElement: (state: DefaultElementsState, action: PayloadAction<string>) => {
    defaultElementsAdapter.removeOne(state, action.payload);
  },

};
