import { useState, useCallback, useEffect } from 'react';

// Хук для управления состоянием селекта (открыт/закрыт, фокус на опции)

export const useSelectState = ({
  onOpen,
  onClose,
  selectRef,
  disabled = false,
}) => {
  // Состояния селекта
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [focusedOptionIndex, setFocusedOptionIndex] = useState(-1);

  // Открытие/закрытие селекта
  const toggleOpen = useCallback(() => {
    if (disabled) {return;}

    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);

    if (newIsOpen) {
      if (onOpen) {onOpen();}
      setFocusedOptionIndex(0);
    } else {
      if (onClose) {onClose();}
      setFocusedOptionIndex(-1);
    }
  }, [disabled, isOpen, onOpen, onClose]);

  // Функция для закрытия селекта
  const close = useCallback(() => {
    if (isOpen) {
      setIsOpen(false);
      if (onClose) {onClose();}
      setFocusedOptionIndex(-1);
    }
  }, [isOpen, onClose]);

  // Открытие селекта
  const open = useCallback(() => {
    if (!isOpen && !disabled) {
      setIsOpen(true);
      if (onOpen) {onOpen();}
      setFocusedOptionIndex(0);
    }
  }, [isOpen, disabled, onOpen]);

  // Обработка наведения мыши
  const handleHover = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  // Обработка клика вне компонента
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        close();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, close, selectRef]);

  return {
    isOpen,
    isHovered,
    isFocused,
    focusedOptionIndex,
    setFocusedOptionIndex,
    toggleOpen,
    open,
    close,
    handleHover,
    handleLeave,
    setIsFocused,
  };
};
