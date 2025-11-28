import { RootState } from '@/app/store';
import { ENTITY_KINDS } from '../../../../shared/constants';
import { createSelector } from '@reduxjs/toolkit';
import { selectAllMembers } from '../../../actorMember';
import { commentAdapterReference } from './adapter';
import { enrichComment } from '../../lib';
import { makeSelectAllNestedElementsFromTree } from '../../../uiTree';

export const selectCommentState = (state: RootState) => state.commentEntity;

export const {
  selectAll: selectAllComments,
  selectById: selectCommentById,
  selectIds: selectCommentIds,
  selectEntities: selectCommentEntities,
} = commentAdapterReference.getSelectors<RootState>(selectCommentState);

export const selectHoveredCommentId = (state: RootState) => selectCommentState(state).hoveredCommentId;
export const selectFocusedCommentId = (state: RootState) => selectCommentState(state).focusedCommentId;
export const selectSelectedCommentId = (state: RootState) => selectCommentState(state).selectedCommentId;

export const selectCommentCheckStates = createSelector(
  [selectSelectedCommentId, selectFocusedCommentId, selectHoveredCommentId, (_, id) => id],
  (selectedId, focusedId, hoveredId, CommentId) => ({
    isSelected: selectedId === CommentId,
    isFocused: focusedId === CommentId,
    isHovered: hoveredId === CommentId,
  }),
);


export const selectSelectedComment = createSelector(
  [selectSelectedCommentId, selectCommentEntities, selectAllComments, selectAllMembers],
  (selectedId, entities, allComments, members) => {
    if (!selectedId || !entities) {return null;}
    const comment = entities[selectedId];
    if (!comment) {return null;}

    return enrichComment(comment, members, allComments);
  },
);


// Stable input selectors to prevent unnecessary re-computations
const selectCommentsStable = createSelector(
  [selectCommentIds, selectCommentEntities],
  (ids, entities) => {
    if (!ids || !entities) {return [];}
    return ids.map(id => entities[id]).filter(Boolean);
  },
);

const selectMembersStable = createSelector(
  [selectAllMembers],
  (members) => members,
);

export const selectAllCompositeComments = createSelector(
  [selectCommentsStable, selectMembersStable],
  (comments, members) => {
    // Фильтруем только основные комментарии (parentId: null)
    const mainComments = comments.filter(comment => comment.parentId === null);

    return mainComments.map(comment =>
      enrichComment(comment, members, comments),
    ).filter(Boolean);
  },
);

export const makeSelectCompositeCommentsByOwner = (ownerType: string, ownerId: string) => createSelector(
  [
    selectCommentsStable,
    selectMembersStable,
    makeSelectAllNestedElementsFromTree(ownerType, ownerId),
  ],
  (allComments, members, elements) => {
    const elementIds = elements.map(element => element.id);
    // Filter comments directly instead of calling another selector
    const commentsByElementIds = allComments.filter(comment => elementIds.includes(comment.targetId));
    const filteredComments = commentsByElementIds.filter(comment => comment.parentId === null);
    const comments = filteredComments.map(comment => enrichComment(comment, members, allComments)).filter(Boolean);
    // console.log('[makeSelectCompositeCommentsByOwner] comments', comments);
    return comments;
  },
);

export const makeSelectCommentById = (id: string) => createSelector(
  [selectCommentEntities],
  (entities) => entities?.[id] ?? null,
);

// Универсальный селектор для получения комментария по ID с обогащенными данными
export const makeSelectCompositeCommentById = (id: string) => createSelector(
  [selectCommentEntities, selectCommentsStable, selectMembersStable],
  (entities, allComments, members) => {
    const comment = entities?.[id];
    if (!comment) {return null;}

    return enrichComment(comment, members, allComments);
  },
);

export const makeSelectCommentsByIds = (ids: string[] = []) => createSelector(
  [selectCommentEntities],
  (entities) => ids.map((id) => entities?.[id]).filter(Boolean),
);

export const makeSelectCommentsByElementIds = (elementIds: string[] = []) => createSelector(
  [selectCommentsStable],
  (comments) => comments.filter((comment) => elementIds.includes(comment.targetId)).filter(Boolean),
);
