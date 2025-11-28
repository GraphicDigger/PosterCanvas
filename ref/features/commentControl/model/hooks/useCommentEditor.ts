import { v4 as uuidv4 } from 'uuid';
import { useCallback, useState } from 'react';
import { ENTITY_KINDS } from '@/shared/constants';
import { type NewComment, type NewReply, useCommentMutator } from '@/entities/comment';
import { usePinPlacer } from './usePinPlacer';
import { useCommentStates } from '@/entities/comment';

export const useCommentEditor = () => {
  const { handleSelect: handleSelectComment } = useCommentStates();
  const [textComment, setTextComment] = useState<string>('');
  const { addComment } = useCommentMutator();
  const { relativePinPosition, setRelativePinPosition, setAbsolutePinPosition } = usePinPlacer();

  const handleCreateComment = useCallback(() => {
    if (!textComment || !relativePinPosition) {return;}

    const comment: NewComment = {
      id: uuidv4(),
      text: textComment,
      memberId: 'id-user-1-member-1-workspace-1',
      targetId: relativePinPosition.targetId,
      targetType: ENTITY_KINDS.ELEMENT,
      pin: {
        x: relativePinPosition.relativeX,
        y: relativePinPosition.relativeY,
      },
    };

    addComment(comment);
    setTextComment('');
    setRelativePinPosition(null);
    setAbsolutePinPosition(null);
    handleSelectComment(comment.id);
  }, [
    addComment,
    relativePinPosition,
    textComment,
  ]);

  const handleCreateReply = useCallback((parentId: string) => {
    if (!textComment || !parentId) { return; }

    const reply: NewReply = {
      text: textComment,
      memberId: 'id-user-1-member-1-workspace-1',
      parentId: parentId,
      targetId: null,
      targetType: null,
    };

    addComment(reply);
    setTextComment('');
    setRelativePinPosition(null);
    setAbsolutePinPosition(null);
  }, [
    addComment,
    relativePinPosition,
    textComment,
  ]);


  const handleChangeTextComment = useCallback((text: string) => {
    setTextComment(text);
  }, []);

  return {
    textComment,
    handleChangeTextComment,
    createComment: handleCreateComment,
    createReply: handleCreateReply,
  };
};
