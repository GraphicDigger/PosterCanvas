import type { PayloadAction } from '@reduxjs/toolkit';
import { documentAdapter } from './slice';
import type { DocumentState, Document } from '../../types';

export const actionsMutation = {

  addDocument: (state: DocumentState, action: PayloadAction<Document>) => {
    documentAdapter.addOne(state, action.payload);
  },

  updateDocument: (state: DocumentState, action: PayloadAction<Document>) => {
    documentAdapter.updateOne(state, {
      id: action.payload.id,
      changes: action.payload,
    });
  },

  removeDocument: (state: DocumentState, action: PayloadAction<string>) => {
    documentAdapter.removeOne(state, action.payload);
  },

};
