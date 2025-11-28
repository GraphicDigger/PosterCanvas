import { useCallback, useEffect } from 'react';

/**
 * Хук для автоматической подстройки высоты textarea
 * @param {Object} options - Параметры хука
 * @param {Object} options.inputRef - Ссылка на DOM-элемент textarea
 * @param {any} options.value - Текущее значение поля
 * @param {boolean} options.isTextArea - Флаг, указывающий, что поле является textarea
 * @param {boolean} options.autoAdjustHeight - Флаг, указывающий необходимость автоподстройки высоты
 * @param {number} options.minHeight - Минимальная высота в пикселях
 * @param {number} options.maxHeight - Максимальная высота в пикселях
 * @returns {Object} - Интерфейс для работы с высотой
 */
export const useTextAreaHeight = ({
  inputRef,
  value,
  isTextArea,
  autoAdjustHeight = true,
  minHeight = 28,
  maxHeight,
}) => {
  const adjustHeight = useCallback(() => {
    if (!isTextArea || !autoAdjustHeight || !inputRef?.current) {return;}

    const textarea = inputRef.current;
    textarea.style.height = `${minHeight}px`;

    const newHeight = Math.max(textarea.scrollHeight, minHeight);

    if (maxHeight && newHeight > maxHeight) {
      textarea.style.height = `${maxHeight}px`;
      textarea.style.overflowY = 'auto';
    } else {
      textarea.style.height = `${newHeight}px`;
      textarea.style.overflowY = 'hidden';
    }
  }, [maxHeight, minHeight, autoAdjustHeight, inputRef, isTextArea]);

  // Подстраиваем высоту при изменении значения или maxHeight
  useEffect(() => {
    if (isTextArea) {
      adjustHeight();
    }
  }, [value, maxHeight, adjustHeight, isTextArea]);

  return { adjustHeight };
};
