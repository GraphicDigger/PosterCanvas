import {
  selectChatById,
  selectSelectedChat,
  setSelectedChatId,
  resetSelectedChat,
} from '../store';
import type { RootState } from '@/app/store';


export const chatAdapter: Record<string, unknown> = {
  getById: (state: RootState, id: string) => selectChatById(state, id),
  getSelected: selectSelectedChat,
  select: setSelectedChatId,
  resetSelected: resetSelectedChat,
};
