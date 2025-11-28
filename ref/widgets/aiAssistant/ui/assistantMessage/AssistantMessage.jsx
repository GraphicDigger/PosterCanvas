import { Message } from '../../../../shared/uiKit/Message';
import { Stack } from '../../../../shared/uiKit/Stack';
import { Button } from '../../../../shared/uiKit/Button';
import { useAIAssistantMessageHandler } from '../../model';

export const AssistantMessage = ({ message }) => {
  const { processMessage } = useAIAssistantMessageHandler();

  // Если processMessage не определена, используем fallback
  const fallbackProcessMessage = (content) => ({
    processedContent: content,
    hasButton: false,
    buttonProps: null,
  });

  const {
    processedContent,
    hasButton,
    buttonProps,
  } = processMessage ? processMessage(message.content) : fallbackProcessMessage(message.content);

  return (
    <Message
      key={message.id}
      align='left'
      border={hasButton}
    >
      <Stack gap={2}>
        {processedContent}
        {hasButton && (
          <Stack direction="row" justify='flex-end' gap={2}>
            {Array.isArray(buttonProps) &&
                            // Отображаем множество кнопок, если buttonProps - массив
                            buttonProps.map((button, index) => (
                              <Button
                                key={`${index}-${button.text}`}
                                color={button.color}
                                onClick={button.onClick}
                              >
                                {button.text}
                              </Button>
                            ))
            }
          </Stack>
        )}
      </Stack>
    </Message>
  );
};
