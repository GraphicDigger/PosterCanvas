import { useMemo, useCallback, useState } from 'react';
import { mockResponses, buttonResponses } from '../../api/mockResponses';
import { useAIAssistant } from './useAIAssistant';
import { useCreateMockScreens } from '../../../../features/createMockScreen';
import { useDataCreator } from '../../../../features/createMockData';

//Единый хук для обработки всей логики сообщений AI-ассистента
export const useAIAssistantMessageHandler = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [userInput, setUserInput] = useState('');
  const { createMockScreens, isCreated: isCreatedMockScreens } = useCreateMockScreens();
  const { createMockData, isCreated } = useDataCreator();
  const { isModelEnabled, activeChatId, sendMessage, addAssistantMessage } = useAIAssistant();


  // Функция для отправки прямого ответа на основе нажатой кнопки
  const sendButtonResponse = useCallback((buttonText) => {
    // Получаем соответствующий ответ из словаря или используем дефолтный
    const response = buttonResponses[buttonText] || buttonResponses['default'];

    // Отправляем сообщение от ассистента
    if (addAssistantMessage) {
      addAssistantMessage(response);
    } else {
      console.error('addAssistantMessage is not defined in useAIAssistant');
      // Fallback - используем sendMessage
      if (activeChatId) {
        sendMessage(response, true);
      }
    }
  }, [addAssistantMessage, sendMessage, activeChatId]);


  //Обработчик для анализа сообщения на наличие кнопок
  const processMessage = useCallback((content) => {
    if (!content) {
      return {
        processedContent: '',
        hasButton: false,
        buttonProps: null,
      };
    }

    // Проверяем, содержит ли сообщение шаблон кнопки {{button:текст:цвет}}
    const buttonMatches = content.match(/{{button:(.*?):(.*?)}}/g);

    if (buttonMatches && buttonMatches.length > 0) {
      // Создаем массив для хранения информации о кнопках
      const buttons = [];
      let processedContent = content;

      // Обрабатываем каждый шаблон кнопки
      buttonMatches.forEach(match => {
        const parts = match.match(/{{button:(.*?):(.*?)}}/);
        if (parts && parts.length === 3) {
          const buttonText = parts[1] || 'default';
          const buttonColor = parts[2] || 'default';

          // Добавляем информацию о кнопке
          buttons.push({
            text: buttonText,
            color: buttonColor,
            onClick: () => {
              console.log(`Кнопка "${buttonText}" нажата`);

              // Отправляем сразу сообщение-ответ вместо запроса подтверждения
              sendButtonResponse(buttonText);
            },
          });

          // Удаляем шаблон кнопки из контента
          processedContent = processedContent.replace(match, '');
        }
      });

      // Если найдена хотя бы одна кнопка
      if (buttons.length > 0) {
        return {
          processedContent: processedContent.trim(),
          hasButton: true,
          buttonProps: buttons,
        };
      }
    }

    // Если шаблон кнопки не найден, возвращаем исходный текст
    return {
      processedContent: content,
      hasButton: false,
      buttonProps: null,
    };
  }, [sendButtonResponse]);


  //Обработчик изменения ввода пользователя
  const handleInputChange = useCallback((value) => {
    setUserInput(value);
  }, []);


  //Обработчик отправки сообщения
  const handleSubmitMessage = useCallback(async (activeChatId, isModelEnabled) => {
    if (!userInput.trim() || !activeChatId || !isModelEnabled) {return;}

    const currentInput = userInput;
    setUserInput('');
    setIsLoading(true);

    try {
      // Отправляем сообщение и ждем ответ
      await sendMessage(currentInput);

      // Проверяем, соответствует ли ввод паттерну для создания данных
      const matchedResponse = mockResponses.find(({ pattern }) => pattern.test(currentInput));

      if (matchedResponse) {
        // Обработка создания моковых данных
        if (matchedResponse.action === 'createMockData' && !isCreated) {
          setTimeout(() => {
            createMockData();
          }, 1000);
        }

        // Обработка создания моковых экранов
        if (matchedResponse.action === 'createMockScreen' && !isCreatedMockScreens) {
          setTimeout(() => {
            createMockScreens();
          }, 1000);
        }
      }
    } catch (error) {
      console.error('Error handling submit:', error);
    } finally {
      setIsLoading(false);
    }
  }, [userInput, sendMessage, createMockData, createMockScreens, isCreated, isCreatedMockScreens]);

  return {
    // Состояния
    userInput,
    isLoading,

    // Методы для работы с формой ввода
    handleInputChange,
    handleSubmitMessage,

    // Методы для работы с сообщениями
    processMessage,
    sendButtonResponse,
  };
};
