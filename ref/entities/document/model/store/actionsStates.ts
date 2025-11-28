import type { PayloadAction } from '@reduxjs/toolkit';
import type { DocumentState, DocumentIdPayload, DocumentUIState } from '../../types';

export const initialUIState: DocumentUIState = {
  hoveredId: null,
  focusedId: null,
  selectedId: null,
};

export const actionsUIState = {

  setHoveredDocumentId: (state: DocumentState, action: PayloadAction<DocumentIdPayload>) => {
    state.hoveredId = action.payload.id;
  },
  setFocusedDocumentId: (state: DocumentState, action: PayloadAction<DocumentIdPayload>) => {
    state.focusedId = action.payload.id;
  },
  setSelectedDocumentId: (state: DocumentState, action: PayloadAction<DocumentIdPayload>) => {
    state.selectedId = action.payload.id;
  },
  resetSelectedDocument: (state: DocumentState) => {
    state.selectedId = null;
  },
};

