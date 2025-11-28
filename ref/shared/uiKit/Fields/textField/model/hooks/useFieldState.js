import { useState, useCallback } from 'react';

/**
 * Хук для управления состояниями поля ввода (hover, focus)
 * @param {Object} options - Параметры хука
 * @param {Function} options.onFocus - Обработчик получения фокуса
 * @param {Function} options.onBlur - Обработчик потери фокуса
 * @returns {Object} - Интерфейс для работы с состояниями
 */
export const useFieldState = ({
  onFocus = () => {},
  onBlur = () => {},
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleHover = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  const handleFocus = useCallback((e) => {
    setIsFocused(true);
    onFocus(e);
  }, [onFocus]);

  const handleBlur = useCallback((e) => {
    setIsFocused(false);
    onBlur(e);
  }, [onBlur]);

  return {
    isHovered,
    isFocused,
    handleHover,
    handleLeave,
    handleFocus,
    handleBlur,
  };
};
