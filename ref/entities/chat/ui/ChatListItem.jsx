import { ListItem, ListItemButton, ListItemText } from '../../../shared/uiKit/List';
import { useChat } from '../model';
import { forwardRef } from 'react';

export const ChatListItem = forwardRef(({ onClick, chat }, ref) => {

  const name = chat.name;

  const {
    isChatFocused,
    isChatSelected,
    handleChatHover,
    handleChatFocus,
    handleChatSelect,
  } = useChat(chat.id);

  const handleClick = (id) => {
    handleChatSelect(id);
    onClick && onClick();
  };

  return (
    <ListItem>
      <ListItemButton
        ref={ref}
        isSelected={isChatSelected}
        isFocused={isChatFocused}
        onClick={() => handleClick(chat.id)}
        onMouseEnter={() => handleChatHover(chat.id)}
        onMouseLeave={() => handleChatHover(null)}
        onFocus={() => handleChatFocus(chat.id)}
        onBlur={() => handleChatFocus(null)}
      >
        <ListItemText>{name}</ListItemText>
      </ListItemButton>
    </ListItem>
  );
});

