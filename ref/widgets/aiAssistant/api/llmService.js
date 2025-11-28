import { mockLlmService } from './mockLlmService';

// Флаг для переключения между моком и реальной моделью
const USE_REAL_LLM = false;

// Здесь будет реализация настоящего LLM-сервиса
const realLlmService = {
  getResponse: async (prompt) => {
    // В будущем здесь будет реальный вызов API языковой модели
    throw new Error('Реальная LLM еще не интегрирована');
  },
};

// Экспортируем активный сервис на основе флага
export const llmService = USE_REAL_LLM ? realLlmService : mockLlmService;
