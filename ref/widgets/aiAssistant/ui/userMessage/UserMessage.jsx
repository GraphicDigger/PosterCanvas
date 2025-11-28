import { Message } from '../../../../shared/uiKit/Message';

export const UserMessage = ({ message }) => (
  <Message key={message.id} align='right' maxWidth='80%' fill>
    {message.content}
  </Message>
);
