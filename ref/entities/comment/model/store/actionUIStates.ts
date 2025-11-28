import type { PayloadAction } from '@reduxjs/toolkit';
import type { CommentUIState } from '../../type';

export const initialUIState: CommentUIState = {
  hoveredCommentId: null,
  focusedCommentId: null,
  selectedCommentId: null,
};

export const actionsUIState = {
  setHoveredCommentId: (state: CommentUIState, action: PayloadAction<string | null>) => {
    state.hoveredCommentId = action.payload;
  },
  setFocusedCommentId: (state: CommentUIState, action: PayloadAction<string | null>) => {
    state.focusedCommentId = action.payload;
  },
  setSelectedCommentId: (state: CommentUIState, action: PayloadAction<string | null>) => {
    state.selectedCommentId = action.payload;
  },
};

