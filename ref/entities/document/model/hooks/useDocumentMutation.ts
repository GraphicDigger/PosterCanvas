import { v4 as uuidv4 } from 'uuid';
import { Document } from '../../types';
import { useDispatch } from 'react-redux';
import { addDocument, updateDocument, removeDocument } from '../store';
import { ENTITY_KINDS } from '@/shared/constants';

export const useDocumentMutation = () => {
  const dispatch = useDispatch();

  const handleAddDocument = (document: Document) => {
    dispatch(addDocument({
      ...document,
      id: uuidv4(),
      title: document.title || 'New Document',
      userId: document.userId,
      projectId: document.projectId,
      kind: ENTITY_KINDS.DOCUMENT,
      createdAt: new Date().toISOString(),
      modifiedAt: new Date().toISOString(),
    }));
  };

  const handleUpdateDocument = (document: Document) => {
  };

  const handleDeleteDocument = (document: Document) => {
  };

  return {
    addDocument: handleAddDocument,
  };
};
