import type { DocumentState, Document } from '../../types';
import { documentAdapter } from './slice';

export const actionsQueries = {
  setDocuments: (state: DocumentState, action: { payload: Document[] }) => {
    documentAdapter.setAll(state, action.payload);
  },
};
