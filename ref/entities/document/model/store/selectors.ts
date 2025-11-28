import type { RootState } from '@/app/store';
import { createSelector } from '@reduxjs/toolkit';
import type { Document } from '../../types';
import { selectMembersById } from '../../@x/actorMember';
import { selectContextLinksMap } from '../../../entityContextLink';


export const selectDocumentState = (state: RootState) => state.documentEntity;
export const selectDocumentEntities = (state: RootState) => selectDocumentState(state).entities;
export const selectDocumentIds = (state: RootState) => selectDocumentState(state).ids;

export const selectHoveredDocumentId = (state: RootState) => selectDocumentState(state).hoveredId;
export const selectFocusedDocumentId = (state: RootState) => selectDocumentState(state).focusedId;
export const selectSelectedDocumentId = (state: RootState) => selectDocumentState(state).selectedId;

export const selectDocumentCheckStates = createSelector(
  [selectSelectedDocumentId, selectFocusedDocumentId, selectHoveredDocumentId, (_, id) => id],
  (selectedId, focusedId, hoveredId, DocumentId) => ({
    isSelected: selectedId === DocumentId,
    isFocused: focusedId === DocumentId,
    isHovered: hoveredId === DocumentId,
  }),
);

export const selectAllDocuments = createSelector(
  [
    selectDocumentEntities,
    selectDocumentIds,
    (state) => state],
  (entities, ids, state) => {

    return (ids || []).map((id: string) =>
      ({
        ...entities[id],
        member: selectMembersById(state, entities[id].userId) || null,
      })).filter(Boolean) as Document[];
  },
);

export const selectSelectedDocument = createSelector(
  [selectSelectedDocumentId, selectDocumentEntities],
  (selectedId, entities) => {
    if (!selectedId || !entities) {return null;}
    return entities[selectedId] || null;
  },
);

export const selectDocumentsByIds = createSelector(
  [selectDocumentEntities, (_, ids) => ids],
  (entities, ids) => {
    if (!ids || !entities) {return [];}
    return ids.map((id: string) => entities[id]).filter(Boolean);
  },
);

export const selectDocumentById = createSelector(
  [selectDocumentEntities, (_, id) => id],
  (entities, id) => entities[id] || null,
);

export const makeSelectDocumentById = (id: string) => createSelector(
  [selectDocumentEntities],
  (entities) => entities[id] || null,
);

export const makeSelectDocumentByIds = (ids: string[] = []) => createSelector(
  [selectDocumentEntities],
  (entities) => ids.map((id) => entities[id]).filter(Boolean),
);
