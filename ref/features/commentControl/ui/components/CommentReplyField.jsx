
import { MessageInput } from '@/shared/uiKit/MessageInput';
import { useCommentEditor, useCommentControl, useCommentSidebar } from '../../model';

export const CommentReplyField = () => {

  const { selectedCommentId } = useCommentControl();
  const { textComment, handleChangeTextComment, createReply } = useCommentEditor();
  const { isRepliesOpen } = useCommentSidebar();

  const handleSubmit = () => {
    createReply(selectedCommentId);
  };

  const handlePlusClick = () => {
    console.log('Plus clicked');
  };

  const handleFileClick = () => {
    console.log('File clicked');
  };

  const handlePaste = (files) => {
    console.log('Files pasted:', files);
  };

  return (
    <MessageInput
      value={textComment}
      onChange={handleChangeTextComment}
      onSubmit={handleSubmit}
      onPlusClick={handlePlusClick}
      onFileClick={handleFileClick}
      onPaste={handlePaste}
      placeholder={isRepliesOpen ? 'Reply to comment...' : 'Add comment...'}
      buttonsVisible
      autoFocus={isRepliesOpen}
    />
  );
};
