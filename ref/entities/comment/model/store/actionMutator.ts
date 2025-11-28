import { commentAdapterReference } from './adapter';
import { CommentModel, CommentState } from '../../type';
import { PayloadAction } from '@reduxjs/toolkit';


export const actionsMutator = {
  addComment: (state: CommentState, action: PayloadAction<CommentModel>) => {
    commentAdapterReference.addOne(state, action.payload);
  },
};
