export const initialMessenger = {
  chats: {},
  activeChatId: null,
  selectedMessageId: null,
};

export const actionsMessenger = {
  // Добавление нового сообщения в чат
  addMessage: (state, action) => {
    const { chatId, message } = action.payload;

    // Если чат не существует, создаем новый
    if (!state.chats[chatId]) {
      state.chats[chatId] = {
        id: chatId,
        messages: [],
        createdAt: new Date().toISOString(),
      };
    }

    // Добавляем сообщение
    state.chats[chatId].messages.push(message);
  },

  // Установка активного чата
  setActiveChat: (state, action) => {
    state.activeChatId = action.payload;
  },

  // Выбор сообщения
  selectMessage: (state, action) => {
    state.selectedMessageId = action.payload;
  },

  // Создание нового пустого чата
  createChat: (state, action) => {
    const chatId = action.payload || `chat-${Date.now()}`;

    state.chats[chatId] = {
      id: chatId,
      messages: [],
      createdAt: new Date().toISOString(),
    };

    state.activeChatId = chatId;
  },

  // Удаление чата
  deleteChat: (state, action) => {
    const chatId = action.payload;

    if (state.chats[chatId]) {
      delete state.chats[chatId];

      // Если удаляем активный чат, сбрасываем активный
      if (state.activeChatId === chatId) {
        state.activeChatId = null;
      }
    }
  },

  // Сброс всего стора сообщений
  resetMessenger: () => initialMessenger,
};
