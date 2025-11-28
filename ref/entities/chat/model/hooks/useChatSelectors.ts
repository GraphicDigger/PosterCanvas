import { useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/app/store';
import {
  selectAllChats,
  selectSelectedChat,
  selectChatsByIds,
  selectChatById,
} from '../store';


export const useChatSelectors = () => {

  const allChats = useSelector(selectAllChats);
  const selectedChat = useSelector(selectSelectedChat);
  const getChatById = useSelector(selectChatByIdFn);
  const getChatByIds = useSelector(selectChatByIdsFn);

  return {
    allChats,
    selectedChat,
    getChatById,
    getChatByIds,
  };
};

const selectChatByIdsFn = createSelector(
  [(state: RootState) => state],
  (state) => (id: string) => selectChatsByIds(state, id),
);

const selectChatByIdFn = createSelector(
  [(state: RootState) => state],
  (state) => (id: string) => selectChatById(state, id),
);

