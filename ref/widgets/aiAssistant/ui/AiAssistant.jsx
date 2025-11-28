/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import { SlotBar, LeftSlot, RightSlot } from '../../../shared/uiKit/SlotBar';
import { LayoutFlexHIcon, PlusIcon, FileIcon, AiIcon } from '../../../shared/assets/icons';
import { ButtonTool } from '../../../shared/uiKit/ButtonTool';
import { MessageInput } from '../../../shared/uiKit/MessageInput';
import { Scrollbar } from '../../../shared/uiKit/Scrollbar';
import { ResizableWrapper } from '../../../shared/uiKit/ResizableWrapper';
import { Stack } from '../../../shared/uiKit/Stack';
import { Surface } from '../../../shared/uiKit/Surface';
import { Message } from '../../../shared/uiKit/Message';
import { Text } from '../../../shared/uiKit/Text';
import { Button } from '../../../shared/uiKit/Button';
import { ButtonToolGroup } from '../../../shared/uiKit/ButtonTool';

import { useDataCreator } from '../../../features/createMockData';
import { useAIAssistant, useAIAssistantVisibility } from '../model';
import { mockResponses } from '../api/mockResponses';
import { useCreateMockScreens } from '../../../features/createMockScreen';
import { useAIAssistantMessageHandler, useAIAssistantSubmit, useAIAssistantHooks } from '../model';

import { UserMessage } from './userMessage';
import { AssistantMessage } from './assistantMessage';


export const AiAssistant = () => {
  const theme = useTheme();

  const { createMockData, isCreated } = useDataCreator();
  const { toggleAssistant } = useAIAssistantVisibility();
  const { createMockScreens, isCreated: isCreatedMockScreens } = useCreateMockScreens();

  const {
    isModelEnabled,
    messages,
    activeChatId,
    createChat,
    sendMessage,
  } = useAIAssistant();

  const {
    userInput,
    isLoading,
    handleInputChange,
    handleSubmitMessage,
    processMessage,
  } = useAIAssistantMessageHandler();

  // Создание нового чата при первом рендере, если нет активного
  useEffect(() => {
    if (!activeChatId) {
      createChat();
    }
  }, [activeChatId, createChat]);

  // Обертка для вызова handleSubmitMessage с нужными параметрами
  const handleSubmit = () => {
    handleSubmitMessage(activeChatId, isModelEnabled);
  };

  return (
    <ResizableWrapper side='left' maxWidth={1000} initialWidth={400}>
      <Surface>
        <Stack>
          <SlotBar divider>
            <LeftSlot>
              <ButtonTool onClick={toggleAssistant}>
                <LayoutFlexHIcon />
              </ButtonTool>
            </LeftSlot>
            <RightSlot>
              <ButtonTool>
                <PlusIcon />
              </ButtonTool>
            </RightSlot>
          </SlotBar>
          <Stack padding={4}>
            <Scrollbar scrollToBottom>
              {messages.length > 0
                ?
                <Stack height='max-content' gap={4}>
                  {messages.map((message) => (
                    message.role === 'user'
                      ? <UserMessage key={message.id} message={message} />
                      : <AssistantMessage key={message.id} message={message} />
                  ))}
                  {isLoading && (
                    <TypingIndicator>
                      <Dot delay="0s" />
                      <Dot delay="0.2s" />
                      <Dot delay="0.4s" />
                    </TypingIndicator>
                  )}
                </Stack>
                : (
                  <Stack align='center' justify='center' gap={4} >
                    <AiIcon size='xl' />
                    <Text color={theme.sys.typography.color.secondary}>
                                            Ask a question to the AI ​​assistant
                    </Text>
                  </Stack>
                )
              }
            </Scrollbar>
            <MessageInput
              buttonsVisible
              minHeight={40}
              maxHeight={200}
              value={userInput}
              onChange={handleInputChange}
              onSubmit={handleSubmit}
              disabled={isLoading || !isModelEnabled}
            >
              <Stack direction='row' justify='space-between'>
                <Stack direction='row' width='max-content'>
                  <Button variant='blank' color='default' size='small'>
                                        Context
                  </Button>
                  <Button variant='blank' color='default' size='small'>
                                        Agent
                  </Button>
                  <Button variant='blank' color='default' size='small'>
                                        Claude 3.7
                  </Button>
                </Stack>
                <ButtonToolGroup>
                  <ButtonTool onClick={() => { }}>
                    <PlusIcon />
                  </ButtonTool>
                  <ButtonTool onClick={() => { }}>
                    <FileIcon />
                  </ButtonTool>
                </ButtonToolGroup>
              </Stack>
            </MessageInput>
          </Stack>
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
    background-color: ${({ theme }) => theme.sys.color.onSurfaceVariant};
    border-radius: 8px;
    gap: 4px;
`;

const Dot = styled.div`
    width: 3px;
    height: 3px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.sys.color.onSurfaceVariant};
    animation: pulse 1.5s infinite;
    animation-delay: ${({ delay }) => delay};
    
    @keyframes pulse {
        0% { opacity: 0.3}
        50% { opacity: 1;}
        100% { opacity: 0.3;}
    }
`;
