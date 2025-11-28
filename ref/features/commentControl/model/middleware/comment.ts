import { createListenerMiddleware } from '@reduxjs/toolkit';
import { closeReplies, selectIsOpenReplies } from '../store';
import { toggleCommentsInDesignMode } from '../../../../entities/mode/editorMode/model/store/slice';
import { selectIsCommentsMode } from '../../../../entities/mode/editorMode/model/store/selectors';
import type { RootState } from '../../../../app/store';

export const commentControlMiddleware = createListenerMiddleware();

// если при выходе из режима комментариев включен replies, то закрываем его
commentControlMiddleware.startListening({
  actionCreator: toggleCommentsInDesignMode,
  effect: async (_action, listenerApi) => {
    const state = listenerApi.getState() as RootState;
    const isCommentsModeActive = selectIsCommentsMode(state);

    if (!isCommentsModeActive) {
      const isRepliesOpen = selectIsOpenReplies(state);
      if (isRepliesOpen) {
        listenerApi.dispatch(closeReplies());
      }
    }
  },
});
