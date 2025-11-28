import { chats } from './chat.data';
import type { Chat } from '../types';

interface ChatApi {
    getChats: () => Promise<Chat[]>;
}

export const chatApi: ChatApi = {
  getChats: async () => {
    await new Promise(res => setTimeout(res, 100));
    return chats;
  },
};
