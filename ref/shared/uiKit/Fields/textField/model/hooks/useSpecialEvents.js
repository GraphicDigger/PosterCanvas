import { useCallback } from 'react';

// Хук для обработки специальных событий в поле ввода (вставка, перетаскивание)

export const useSpecialEvents = ({
  onChange,
  onPaste,
  onDrop,
}) => {
  const handlePaste = useCallback(
    (event) => {
      if (onPaste) {
        onPaste(event);
      }

      if (!event.defaultPrevented && onChange) {
        const pastedValue = event.clipboardData.getData('text');
        onChange({
          target: {
            value: pastedValue,
          },
        });
      }
    },
    [onChange, onPaste],
  );

  const handleDrop = useCallback(
    (event) => {
      if (onDrop) {
        onDrop(event);
      }

      if (!event.defaultPrevented && onChange) {
        event.preventDefault();
        const droppedValue = event.dataTransfer.getData('text');
        onChange({
          target: {
            value: droppedValue,
          },
        });
      }
    },
    [onChange, onDrop],
  );

  return {
    handlePaste,
    handleDrop,
  };
};
