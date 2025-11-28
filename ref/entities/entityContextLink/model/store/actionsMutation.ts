import type { PayloadAction } from '@reduxjs/toolkit';
import { contextLinkAdapter } from './slice';
import type { ContextLinkState, ContextLink } from '../../types';

export const actionsMutation = {

  addContextLink: (state: ContextLinkState, action: PayloadAction<ContextLink>) => {
    contextLinkAdapter.addOne(state, action.payload);
  },

  updateContextLink: (state: ContextLinkState, action: PayloadAction<ContextLink>) => {
    contextLinkAdapter.updateOne(state, {
      id: action.payload.id,
      changes: action.payload,
    });
  },

  removeContextLink: (state: ContextLinkState, action: PayloadAction<string>) => {
    contextLinkAdapter.removeOne(state, action.payload);
  },

};
