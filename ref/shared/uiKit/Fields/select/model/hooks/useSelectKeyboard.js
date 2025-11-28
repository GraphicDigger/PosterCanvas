import { useCallback } from 'react';

//Хук для управления клавиатурной навигацией в селекте

export const useSelectKeyboard = ({
  isOpen,
  open,
  close,
  focusedOptionIndex,
  setFocusedOptionIndex,
  options,
  handleSelect,
  multiple,
  disabled,
  onKeyDown,
}) => {
  // Навигация по опциям с помощью клавиатуры
  const handleKeyboardNavigation = useCallback((event) => {
    if (disabled) {return;}

    switch (event.key) {
    case 'ArrowDown':
      if (!isOpen) {
        open();
      } else if (focusedOptionIndex < options.length - 1) {
        setFocusedOptionIndex(focusedOptionIndex + 1);
      }
      event.preventDefault();
      break;

    case 'ArrowUp':
      if (!isOpen) {
        open();
        setFocusedOptionIndex(options.length - 1);
      } else if (focusedOptionIndex > 0) {
        setFocusedOptionIndex(focusedOptionIndex - 1);
      }
      event.preventDefault();
      break;

    case 'Enter':
    case ' ':
      if (isOpen && focusedOptionIndex >= 0 && focusedOptionIndex < options.length) {
        handleSelect(options[focusedOptionIndex].value);
        if (!multiple) {
          close();
        }
        event.preventDefault();
      } else if (!isOpen) {
        open();
        event.preventDefault();
      }
      break;

    case 'Escape':
      if (isOpen) {
        close();
        event.preventDefault();
      }
      break;

    case 'Tab':
      if (isOpen) {
        close();
      }
      break;

    default:
      // Поиск опции, начинающейся с нажатой буквы
      if (isOpen && /^[a-zA-Z0-9]$/.test(event.key)) {
        const char = event.key.toLowerCase();
        const index = options.findIndex((opt, idx) =>
          idx > focusedOptionIndex && opt.label.toLowerCase().startsWith(char),
        );

        if (index !== -1) {
          setFocusedOptionIndex(index);
        } else {
          // Если не нашли после текущего элемента, ищем с начала
          const fromStartIndex = options.findIndex(opt =>
            opt.label.toLowerCase().startsWith(char),
          );
          if (fromStartIndex !== -1) {
            setFocusedOptionIndex(fromStartIndex);
          }
        }
      }
      break;
    }
  }, [disabled, isOpen, focusedOptionIndex, options, handleSelect, multiple, open, close, setFocusedOptionIndex]);

  // Обработчик клавиатурных событий
  const handleKeyDown = useCallback((event) => {
    // Сначала обрабатываем нашу собственную навигацию
    handleKeyboardNavigation(event);

    // Затем вызываем внешний обработчик, если он есть и событие не было предотвращено
    if (onKeyDown && !event.defaultPrevented) {
      onKeyDown(event);
    }
  }, [handleKeyboardNavigation, onKeyDown]);

  // Получение пропсов для опции селекта
  const getMenuItemProps = useCallback((optionValue) => {
    const isSelected = options.findIndex(opt => opt.value === optionValue);
    const isFocused = options.findIndex(opt => opt.value === optionValue) === focusedOptionIndex;

    return {
      onClick: () => handleSelect(optionValue),
      role: 'option',
      'aria-selected': isSelected !== -1,
      tabIndex: isFocused ? 0 : -1,
      selected: isSelected !== -1,
      focused: isFocused,
    };
  }, [options, focusedOptionIndex, handleSelect]);

  return {
    handleKeyDown,
    getMenuItemProps,
  };
};
