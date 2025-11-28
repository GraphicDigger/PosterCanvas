import { v4 as uuidv4 } from 'uuid';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectAllChats,
  selectActiveChat,
  selectActiveChatMessages,
  selectActiveChatId,
  selectSelectedMessageId,
  selectSelectedMessage,
  selectIsModelEnabled,
  selectIsAssistantOpen,
} from '../store/index';
import {
  createChat,
  deleteChat,
  addMessage,
  selectMessage,
  setActiveChat,
  toggleModelEnabled,
  setModelEnabled,
  toggleAssistant,
  setAssistantOpen,
} from '../store/index';

import { llmService } from '../../api';

//Единый хук для всех операций с AI-ассистентом

export const useAIAssistant = () => {
  const dispatch = useDispatch();

  const isModelEnabled = useSelector(selectIsModelEnabled);
  const isAssistantOpen = useSelector(selectIsAssistantOpen);

  const chats = useSelector(selectAllChats);
  const activeChat = useSelector(selectActiveChat);
  const activeChatId = useSelector(selectActiveChatId);

  const messages = useSelector(selectActiveChatMessages);
  const selectedMessage = useSelector(selectSelectedMessage);
  const selectedMessageId = useSelector(selectSelectedMessageId);


  // Chat actions
  const handleCreateChat = () => {
    const chatId = `chat-${uuidv4()}`;
    dispatch(createChat(chatId));
    return chatId;
  };

  const handleDeleteChat = (chatId) => {
    dispatch(deleteChat(chatId));
  };

  const handleSetActiveChat = (chatId) => {
    dispatch(setActiveChat(chatId));
  };

  // Message actions
  const handleAddMessage = (content, role = 'user') => {
    if (!activeChatId) {return null;}

    const message = {
      id: `msg-${uuidv4()}`,
      role,
      content,
      timestamp: new Date().toISOString(),
    };

    dispatch(addMessage({
      chatId: activeChatId,
      message,
    }));

    return message.id;
  };

  const handleSelectMessage = (messageId) => {
    dispatch(selectMessage(messageId));
  };

  // LLM integration
  const handleSendMessage = async (content) => {
    if (!content.trim() || !activeChatId || !isModelEnabled) {return null;}

    // Add user message
    handleAddMessage(content, 'user');

    try {
      // Get response from LLM
      const responseText = await llmService.getResponse(content);

      // Add assistant message
      handleAddMessage(responseText, 'assistant');
    } catch (error) {
      // Add error message
      handleAddMessage(
        'Извините, произошла ошибка при обработке вашего запроса.',
        'assistant',
      );
      console.error('LLM error:', error);
    }
  };

  // Функция для отправки сообщения от ассистента напрямую (без ввода пользователя)
  const handleAddAssistantMessage = (content) => {
    if (!content.trim() || !activeChatId) {return null;}

    // Add assistant message directly
    return handleAddMessage(content, 'assistant');
  };

  return {
    // State
    chats,
    activeChat,
    activeChatId,
    messages,
    selectedMessageId,
    selectedMessage,
    isModelEnabled,
    isAssistantOpen,

    // Chat methods
    createChat: handleCreateChat,
    deleteChat: handleDeleteChat,
    setActiveChat: handleSetActiveChat,

    // Message methods
    addMessage: handleAddMessage,
    selectMessage: handleSelectMessage,

    // LLM integration
    sendMessage: handleSendMessage,
    addAssistantMessage: handleAddAssistantMessage,
  };
};
