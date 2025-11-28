import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { initialUIState, actionsUIState } from './actionsStates';
import { actionsQueries } from './actionsQueries';
import { actionsMutation } from './actionsMutation';
import type { DocumentState, Document } from '../../types';

export const documentAdapter = createEntityAdapter<Document>({});

export const initialEntities = documentAdapter.getInitialState();

const initialState: DocumentState = {
  ...initialEntities,
  ...initialUIState,
};

const documentEntitySlice = createSlice({
  name: 'documentEntity',
  initialState,
  reducers: {
    ...actionsUIState,
    ...actionsQueries,
    ...actionsMutation,
  },
});

export const {

  setDocuments,

  setHoveredDocumentId,
  setFocusedDocumentId,
  setSelectedDocumentId,
  resetSelectedDocument,

  addDocument,
  updateDocument,
  removeDocument,

} = documentEntitySlice.actions;

export default documentEntitySlice.reducer;
