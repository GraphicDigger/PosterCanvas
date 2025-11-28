import { v4 as uuidv4 } from 'uuid';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { addComment } from '../store';
import { CommentModel, NewComment } from '../../type';
import { ENTITY_KINDS } from '@/shared/constants';


export const useCommentMutator = () => {
  const dispatch = useDispatch();

  const handleAddComment = useCallback((comment: NewComment) => {
    const newComment: CommentModel = {
      ...comment,
      id: comment.id || uuidv4(),
      kind: ENTITY_KINDS.COMMENT,
      parentId: comment.parentId || null,
      targetId: comment.targetId || null,
      targetType: comment.targetType || null,
      text: comment.text,
      createdAt: new Date().toISOString(),
      memberId: comment.memberId,
      likes: 0,
      pin: comment.pin,
    };
    console.log('newComment', newComment);
    dispatch(addComment(newComment));
  }, [dispatch]);

  return {
    addComment: handleAddComment,
  };
};
