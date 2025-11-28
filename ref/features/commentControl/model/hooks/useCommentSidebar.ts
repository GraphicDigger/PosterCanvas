import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { openReplies, closeReplies, selectIsOpenReplies } from '../store';

export const useCommentSidebar = () => {
  const dispatch = useDispatch();

  const isRepliesOpen = useSelector(selectIsOpenReplies);

  const handleOpenReplies = useCallback(() => {
    dispatch(openReplies());
  }, [dispatch]);

  const handleCloseReplies = useCallback(() => {
    dispatch(closeReplies());
  }, [dispatch]);

  return {
    isRepliesOpen,
    handleOpenReplies,
    handleCloseReplies,
  };
};
