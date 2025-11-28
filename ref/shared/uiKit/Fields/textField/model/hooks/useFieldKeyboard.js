import { useCallback } from 'react';

// Хук для обработки клавиатурных событий в поле ввода

export const useFieldKeyboard = ({
  onKeyDown,
  onEnter,
  onEscape,
  clearOnEscape,
  resetValue,
  inputRef,
}) => {
  const handleKeyDown = useCallback(
    (event) => {
      if (onKeyDown) {
        onKeyDown(event);
      }

      // Alt+Enter или Meta+Enter для вставки новой строки
      if (event.key === 'Enter' && (event.altKey || event.metaKey)) {
        if (inputRef && inputRef.current && event.target.tagName === 'TEXTAREA') {
          event.preventDefault();

          const start = event.target.selectionStart;
          const end = event.target.selectionEnd;
          const value = event.target.value;

          const newValue = value.substring(0, start) + '\n' + value.substring(end);

          const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, 'value').set;
          nativeInputValueSetter.call(event.target, newValue);
          event.target.dispatchEvent(new Event('input', { bubbles: true }));

          event.target.selectionStart = event.target.selectionEnd = start + 1;
        }
        return;
      }

      if (event.key === 'Enter' && !event.altKey && !event.metaKey && onEnter) {
        event.preventDefault();
        onEnter(event);
      }

      if (event.key === 'Escape') {
        if (onEscape) {
          event.preventDefault();
          onEscape(event);
        }

        if (clearOnEscape && resetValue) {
          event.preventDefault();
          resetValue();
        }
      }
    },
    [onKeyDown, onEnter, onEscape, clearOnEscape, resetValue, inputRef],
  );

  return { handleKeyDown };
};
