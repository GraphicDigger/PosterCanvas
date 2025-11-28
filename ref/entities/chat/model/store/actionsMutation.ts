import type { PayloadAction } from '@reduxjs/toolkit';
import { chatAdapter } from './slice';
import type { ChatState, Chat } from '../../types';

export const actionsMutation = {

  addChat: (state: ChatState, action: PayloadAction<Chat>) => {
    chatAdapter.addOne(state, action.payload);
  },

  updateChat: (state: ChatState, action: PayloadAction<Chat>) => {
    chatAdapter.updateOne(state, {
      id: action.payload.id,
      changes: action.payload,
    });
  },

  removeChat: (state: ChatState, action: PayloadAction<string>) => {
    chatAdapter.removeOne(state, action.payload);
  },

};
