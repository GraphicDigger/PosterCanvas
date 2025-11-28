import { createSelector } from 'reselect';

export const selectAllChats = (state) => state.aiAssistant?.chats || {};

export const selectActiveChatId = (state) => state.aiAssistant?.activeChatId || null;

export const selectActiveChat = createSelector(
  [selectActiveChatId, selectAllChats],
  (chatId, chats) => chatId ? chats[chatId] : null,
);

export const selectActiveChatMessages = createSelector(
  [selectActiveChat],
  (chat) => chat ? chat.messages || [] : [],
);

export const selectSelectedMessageId = (state) => state.aiAssistant?.selectedMessageId || null;

export const selectSelectedMessage = createSelector(
  [selectSelectedMessageId, selectActiveChatMessages],
  (selectedId, messages) => {
    if (!selectedId || !messages.length) {return null;}
    return messages.find(message => message.id === selectedId) || null;
  },
);
