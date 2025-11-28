import { useEffect } from 'react';


export const useKeyboard = ({
  onEscape,
  onKeyDown,
  enabled = true,
}: {
    onEscape?: () => void;
    onEnter?: () => void;
    onKeyDown?: (event: KeyboardEvent) => void;
    enabled?: boolean;
} = {}) => {
  useEffect(() => {
    if (!enabled) {return;}

    const handleKeyDown = (event: KeyboardEvent) => {

      if (onKeyDown) {onKeyDown(event);}

      switch (event.key) {
      case 'Escape':
        if (onEscape) {
          event.preventDefault();
          onEscape();
        }
        break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);

  }, [onEscape, onKeyDown, enabled]);
};
