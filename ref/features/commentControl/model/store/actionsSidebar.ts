import { type CommentControlState } from '../../types';
import { PayloadAction } from '@reduxjs/toolkit';

export const initialSidebarState = {
  isOpenReplies: false,
};

export const actionsSidebar = {
  setIsOpenReplies: (state: CommentControlState, action: PayloadAction<boolean>) => {
    state.isOpenReplies = action.payload;
  },
  toggleIsOpenReplies: (state: CommentControlState) => {
    state.isOpenReplies = !state.isOpenReplies;
  },
  openReplies: (state: CommentControlState) => {
    state.isOpenReplies = true;
  },
  closeReplies: (state: CommentControlState) => {
    state.isOpenReplies = false;
  },
};
