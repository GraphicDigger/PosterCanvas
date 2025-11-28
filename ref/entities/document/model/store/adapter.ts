import {
  selectDocumentById,
  selectSelectedDocument,
  setSelectedDocumentId,
  resetSelectedDocument,
} from '../store';


export const documentAdapter: Record<string, unknown> = {
  getById: (state: RootState, id: string) => selectDocumentById(state, id),
  getSelected: (state: RootState) => selectSelectedDocument(state),
  select: setSelectedDocumentId,
  resetSelected: resetSelectedDocument,
};
