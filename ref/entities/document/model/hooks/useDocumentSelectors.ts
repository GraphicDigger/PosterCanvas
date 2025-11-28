import { useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/app/store';
import {
  selectAllDocuments,
  selectSelectedDocument,
  makeSelectDocumentById,
  makeSelectDocumentByIds,
} from '../store';

interface Props {
    id?: string;
    ids?: string[];
}

export const useDocumentSelectors = ({ id, ids }: Props = {}) => {

  const allDocuments = useSelector(selectAllDocuments);
  const selectedDocument = useSelector(selectSelectedDocument);

  const documentById = id ? useSelector(makeSelectDocumentById(id)) : undefined;
  const documentByIds = ids ? useSelector(makeSelectDocumentByIds(ids)) : [];

  return {
    allDocuments,
    selectedDocument,
    documentById,
    documentByIds,
  };
};
