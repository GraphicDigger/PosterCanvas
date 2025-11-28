import { FIELD_TYPES } from '../textField/model/constants/types';

// Обработчики изменения значения для разных типов полей
export const createChangeHandler = ({
  type,
  onChange,
  pattern,
  maxLength,
  adjustHeight,
}) => (e) => {
  let newValue = e.target.value;

  // Применяем специфичные для типа поля преобразования
  switch (type) {
  case FIELD_TYPES.NUMBER:
    newValue = newValue.replace(/[^\d]/g, '');
    break;
        // Добавляйте обработку для новых типов здесь
  }

  // Общая валидация
  if (pattern && !new RegExp(pattern).test(newValue)) {
    return;
  }

  if (maxLength && newValue.length > maxLength) {
    newValue = newValue.slice(0, maxLength);
  }

  if (onChange) {
    onChange({ ...e, target: { ...e.target, value: newValue } });
  }

  // Подстройка высоты для textarea
  if (type === FIELD_TYPES.TEXTAREA) {
    adjustHeight?.();
  }
};

// Обработчики нажатия клавиш
export const createKeyDownHandler = ({
  type,
  value,
  onSubmit,
  submitOnEnter,
  submitOnCtrlEnter,
  preventNewLine,
}) => (e) => {
  const isCtrlPressed = e.ctrlKey || e.metaKey;

  if (e.key === 'Enter') {
    // Для обычного input всегда отправляем при нажатии Enter
    if (type === FIELD_TYPES.TEXT) {
      e.preventDefault();
      if (value && onSubmit) {
        onSubmit(value);
      }
      return;
    }

    // Для textarea проверяем условия отправки
    if (type === FIELD_TYPES.TEXTAREA) {
      const shouldSubmit = (submitOnEnter && !isCtrlPressed) ||
                               (submitOnCtrlEnter && isCtrlPressed);

      if (preventNewLine || shouldSubmit) {
        e.preventDefault();
        if (value && onSubmit) {
          onSubmit(value);
        }
        return;
      }
    }
  }
};

// Обработчики вставки
export const createPasteHandler = ({
  type,
  onPaste,
}) => (e) => {
  // Проверка для числового поля
  if (type === FIELD_TYPES.NUMBER) {
    const pastedText = e.clipboardData.getData('text');
    if (!/^\d+$/.test(pastedText)) {
      e.preventDefault();
      return;
    }
  }

  if (onPaste) {
    const files = Array.from(e.clipboardData.files);
    if (files.length > 0) {
      e.preventDefault();
      onPaste(files);
    }
  }
};

// Обработчик drop событий
export const createDropHandler = ({
  onDrop,
  onPaste,
}) => (e) => {
  e.preventDefault();

  if (onDrop) {
    onDrop(e);
    return;
  }

  if (onPaste) {
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      onPaste(files);
    }
  }
};
