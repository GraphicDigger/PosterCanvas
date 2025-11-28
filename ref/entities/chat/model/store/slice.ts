import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { initialUIState, actionsUIState } from './actionsStates';
import { actionsQueries } from './actionsQueries';
import { actionsMutation } from './actionsMutation';
import type { ChatState, Chat } from '../../types';

export const chatAdapter = createEntityAdapter<Chat>({
  selectId: (chat) => chat.id || chat.key || `chat-${Date.now()}-${Math.random()}`,
});

export const initialEntities = chatAdapter.getInitialState();

const initialState: ChatState = {
  ...initialEntities,
  ...initialUIState,
};

const chatEntitySlice = createSlice({
  name: 'chatEntity',
  initialState,
  reducers: {
    ...actionsUIState,
    ...actionsQueries,
    ...actionsMutation,
  },
});

export const {

  setChats,

  setHoveredChatId,
  setFocusedChatId,
  setSelectedChatId,
  resetSelectedChat,

  addChat,
  updateChat,
  removeChat,

} = chatEntitySlice.actions;

export default chatEntitySlice.reducer;
