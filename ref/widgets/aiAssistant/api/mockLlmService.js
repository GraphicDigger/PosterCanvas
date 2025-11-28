import { mockResponses } from './mockResponses';

//Сервис для мок-ответов от LLM с искусственной задержкой
export const mockLlmService = {

  //Получает ответ на основе текста запроса
  getResponse: async (prompt) => {
    // Имитация задержки ответа LLM (от 0.5 до 1.5 секунд)
    const delay = 1500 + Math.random() * 1000;

    return new Promise((resolve) => {
      setTimeout(() => {
        // Ищем совпадение по паттернам
        const matchedResponse = mockResponses.find(item =>
          item.pattern.test(prompt),
        );

        // Возвращаем найденный ответ или ответ по умолчанию
        resolve(matchedResponse
          ? matchedResponse.response
          : "I don't quite understand the request. Could you clarify what exactly you need to do with the data models or code? 😊",
        );
      }, delay);
    });
  },
};
