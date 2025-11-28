/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import { lineColors, surfaceColors } from '../../../shared/styles';
import { Box } from '../../../shared/uiKit/Box';
import { MessageInput } from '../../../shared/uiKit/MessageInput';
import { Scrollbar } from '../../../shared/uiKit/Scrollbar';
import { useAIAssistant } from '../model';
import { ResizableWrapper } from '../../../shared/uiKit/ResizableWrapper';
import { Stack } from '../../../shared/uiKit/Stack';
import { Surface } from '../../../shared/uiKit/Surface';
import { Message } from '../../../shared/uiKit/Message';
import { Text } from '../../../shared/uiKit/Text';
import { useDataCreator } from '../../createMockData';

// Паттерн для создания моковых данных
const CREATE_MOCK_DATA_PATTERN = /созда.*модел|модел.*колле|создай.+коллекц|model|schema/i;

export const AiCoder = () => {
  const theme = useTheme();
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { createMockData, isCreated } = useDataCreator();

  const {
    isModelEnabled,
    messages,
    activeChatId,
    createChat,
    sendMessage,
  } = useAIAssistant();

  // Создание нового чата при первом рендере, если нет активного
  useEffect(() => {
    if (!activeChatId) {
      createChat();
    }
  }, [activeChatId, createChat]);

  // Обработчик изменения ввода пользователя
  const handleInputChange = (value) => {
    setUserInput(value);
  };

  // Обработчик отправки сообщения
  const handleSubmit = async () => {
    if (!userInput.trim() || !activeChatId || !isModelEnabled) {return;}

    const currentInput = userInput;
    setUserInput('');
    setIsLoading(true);

    try {
      // Проверяем, соответствует ли ввод паттерну для создания данных
      if (CREATE_MOCK_DATA_PATTERN.test(currentInput) && !isCreated) {
        // Создаем моковые данные
        setTimeout(() => {
          createMockData();
        }, 1000);
      }

      // Отправляем сообщение и ждем ответ
      await sendMessage(currentInput);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ResizableWrapper side='left' maxWidth={1000}>
      <Surface>
        <Stack padding={4}>
          <Scrollbar scrollToBottom>
            <Stack height='max-content' gap={2}>
              {messages.length > 0 ?
                messages.map((message) => (
                  message.role === 'user' ? (
                    <Message
                      key={message.id}
                      align='right'
                      maxWidth='80%'
                      fill
                    >
                      {message.content}
                    </Message>
                  ) : (
                    <Message
                      key={message.id}
                      align='left'
                    >
                      {message.content}
                    </Message>
                  )
                )) : (
                  <Stack align='center' justify='center' >
                    <Text>
                                            Ask a question to the AI ​​assistant
                    </Text>
                  </Stack>
                )
              }
              {isLoading && (
                <TypingIndicator>
                  <Dot delay="0s" />
                  <Dot delay="0.2s" />
                  <Dot delay="0.4s" />
                </TypingIndicator>
              )}
            </Stack>
          </Scrollbar>
          <MessageInput
            buttonsVisible
            minHeight={40}
            maxHeight={200}
            value={userInput}
            onChange={handleInputChange}
            onSubmit={handleSubmit}
            disabled={isLoading || !isModelEnabled}
          />
        </Stack>
      </Surface>
    </ResizableWrapper>
  );
};


const TypingIndicator = styled.div`
    display: flex;
    align-items: center;
    align-self: flex-start;
    padding: 8px 12px;
    background-color: ${({ theme }) => theme.sys.color.surfaceContainer.default};
    border-radius: 8px;
    gap: 4px;
`;

const Dot = styled.div`
    width: 3px;
    height: 3px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.sys.color.outline.default};
    animation: pulse 1.5s infinite;
    animation-delay: ${({ delay }) => delay};
    
    @keyframes pulse {
        0% { opacity: 0.3}
        50% { opacity: 1;}
        100% { opacity: 0.3;}
    }
`;
