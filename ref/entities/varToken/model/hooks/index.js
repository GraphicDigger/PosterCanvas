import { useTokenMutation } from './useTokenMutation';
import { useTokenStates } from './useTokenStates';
import { useAllTokens, useTokenById, useColorTokens } from './useTokens';

export const useToken = () => {
  const {
    addToken,
    updateToken,
    removeTokensFromCollection,
  } = useTokenMutation();

  const {
    isSelected,
    isFocused,
    isHovered,
    handleSelect,
    handleFocus,
    handleHover,
  } = useTokenStates();

  const {
    allTokens,
  } = useAllTokens();

  const {
    token,
    tokenById,
  } = useTokenById();

  const {
    colorTokens,
    isColorToken,
  } = useColorTokens();

  return {
    addToken,
    updateToken,
    removeTokensFromCollection,

    isSelected,
    isFocused,
    isHovered,
    handleSelect,
    handleFocus,
    handleHover,

    allTokens,
    token,
    tokenById,
    colorTokens,
    isColorToken,
  };
};
