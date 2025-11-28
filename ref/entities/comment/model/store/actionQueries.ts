import type { CommentState, CommentModel } from '../../type';
import { commentAdapterReference } from './adapter';

export const initialEntities = commentAdapterReference.getInitialState();

export const actionsQueries = {
  setComments: (state: CommentState, action: { payload: CommentModel[] }) => {
    commentAdapterReference.setAll(state, action.payload);
  },
};
