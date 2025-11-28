import { useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/app/store';
import {
  selectAllContextLinks,
  selectContextLinksByIds,
  selectContextLinkById,
} from '../store';


export const useContextLinkSelectors = () => {

  const allContextLinks = useSelector(selectAllContextLinks);

  const getContextLinkById = useSelector(selectContextLinkByIdFn);
  const getContextLinkByIds = useSelector(selectContextLinkByIdsFn);

  return {
    allContextLinks,
    getContextLinkById,
    getContextLinkByIds,
  };
};

const selectContextLinkByIdsFn = createSelector(
  [(state: RootState) => state],
  (state) => (id: string) => selectContextLinksByIds(state, id),
);

const selectContextLinkByIdFn = createSelector(
  [(state: RootState) => state],
  (state) => (id: string) => selectContextLinkById(state, id),
);

