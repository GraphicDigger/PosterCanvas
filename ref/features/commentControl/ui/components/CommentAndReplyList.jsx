import { CommentList, RepliesList } from '@/entities/comment';
import { useCommentControl } from '../../model';

export const CommentAndReplyList = ({
  onOpenReplies,
  isRepliesOpen,
}) => {

  const { comments } = useCommentControl();
  // console.log('comments', comments);

  return (
    isRepliesOpen
      ? <RepliesList />
      : <CommentList
        comments={comments}
        onOpenReplies={onOpenReplies}
      />
  );
};
