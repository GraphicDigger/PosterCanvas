import { useEffect, useCallback } from 'react';

type KeyHandler = (event: KeyboardEvent) => void;

interface UseKeyboardOptions {
    onEscape?: KeyHandler;
    onEnter?: KeyHandler;
    onArrowUp?: KeyHandler;
    onArrowDown?: KeyHandler;
    keys?: Record<string, KeyHandler>;
    onKeyDown?: KeyHandler;
    enabled?: boolean;
}

export const useKeyboard = ({
  onEscape,
  onEnter,
  onArrowUp,
  onArrowDown,
  keys = {},
  onKeyDown,
  enabled = true,
}: UseKeyboardOptions = {}) => {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      onKeyDown?.(event);

      const handlers: Record<string, KeyHandler> = {
        ...(onEscape ? { Escape: onEscape } : {}),
        ...(onEnter ? { Enter: onEnter } : {}),
        ...(onArrowUp ? { ArrowUp: onArrowUp } : {}),
        ...(onArrowDown ? { ArrowDown: onArrowDown } : {}),
        ...keys,
      };

      const handler = handlers[event.key];
      if (handler) {
        event.preventDefault();
        handler(event);
      }
    },
    [
      onEscape,
      onEnter,
      onArrowUp,
      onArrowDown,
      keys,
      onKeyDown,
    ],
  );

  useEffect(() => {
    if (!enabled) {return;}
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [enabled, handleKeyDown]);
};
