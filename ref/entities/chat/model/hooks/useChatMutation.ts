import { v4 as uuidv4 } from 'uuid';
import { Chat } from '../../types';
import { useDispatch } from 'react-redux';
import { addChat, updateChat, removeChat } from '../store';
import { ENTITY_KINDS } from '@/shared/constants';

export const useChatMutation = () => {
  const dispatch = useDispatch();

  const handleAddChat = (chat: Chat) => {
    dispatch(addChat({
      ...chat,
      id: uuidv4(),
      name: chat.name || 'New Chat',
      userId: chat.userId,
      kind: ENTITY_KINDS.CHAT,
      projectId: chat.projectId,
      createdAt: new Date().toISOString(),
      modifiedAt: new Date().toISOString(),
    }));
  };

  const handleUpdateChat = (chat: Chat) => {
  };

  const handleDeleteChat = (chat: Chat) => {
  };

  return {
    addChat: handleAddChat,
  };
};
