import { useDispatch, useSelector } from 'react-redux';
import {
  setHoveredChatId,
  setFocusedChatId,
  setSelectedChatId,
  selectChatCheckStates,
} from '../store';

export const useUIStates = (chatId: string) => {
  const dispatch = useDispatch();

  const {
    isSelected: isChatSelected,
    isFocused: isChatFocused,
    isHovered: isChatHovered,
  } = useSelector(state => selectChatCheckStates(state, chatId));

  const handleChatHover = (id: string) => {
    dispatch(setHoveredChatId({ id }));
  };

  const handleChatFocus = (id: string) => {
    dispatch(setFocusedChatId({ id }));
  };

  const handleChatSelect = (id: string) => {
    dispatch(setSelectedChatId({ id }));
  };

  return {
    isChatSelected,
    isChatFocused,
    isChatHovered,
    handleChatHover,
    handleChatFocus,
    handleChatSelect,
  };
};
