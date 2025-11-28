import type { ChatState, Chat } from '../../types';
import { chatAdapter } from './slice';

export const actionsQueries = {
  setChats: (state: ChatState, action: { payload: Chat[] }) => {
    chatAdapter.setAll(state, action.payload);
  },
};
