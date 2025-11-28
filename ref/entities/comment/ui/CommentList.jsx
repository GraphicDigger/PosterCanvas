import React from 'react';
import { CommentCard, useComment } from '@/entities/comment';

export const CommentList = ({
  comments,
  onOpenReplies,
}) => {
  return (
    <>
      {comments?.map((comment) => (
        <CommentCard
          key={comment.id}
          comment={comment}
          onClick={() => onOpenReplies()}
        />
      ))}

    </>
  );
};

export const RepliesList = () => {

  const { selectedComment } = useComment();

  // Проверяем, что selectedComment существует
  if (!selectedComment) {
    return null;
  }

  return (
    <>
      <CommentCard
        key={selectedComment.id}
        comment={selectedComment}
      />
      {selectedComment?.replies?.map((comment) => (
        <CommentCard
          key={comment.id}
          comment={comment}

        />
      ))}
    </>
  );
};

