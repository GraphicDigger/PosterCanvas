export const initialVisible = {
  isModelEnabled: true,
  isAssistantOpen: false,
};

export const actionsVisible = {
  // Включение/выключение модели
  toggleModelEnabled: (state) => {
    state.isModelEnabled = !state.isModelEnabled;
  },

  setModelEnabled: (state, action) => {
    state.isModelEnabled = action.payload;
  },

  // Открытие/закрытие интерфейса ассистента
  toggleAssistant: (state) => {
    state.isAssistantOpen = !state.isAssistantOpen;
  },

  setAssistantOpen: (state, action) => {
    state.isAssistantOpen = action.payload;
  },

  // Сброс настроек видимости
  resetVisible: () => initialVisible,
};
