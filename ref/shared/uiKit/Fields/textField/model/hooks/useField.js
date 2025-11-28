import { useRef, useMemo, useCallback } from 'react';
import { useFieldValue } from './useFieldValue';
import { useFieldState } from './useFieldState';
import { useTextAreaHeight } from './useTextAreaHeight';
import { useFieldKeyboard } from './useFieldKeyboard';
import { useSpecialEvents } from './useSpecialEvents';
import { useNumericInput } from './useNumericInput';


export const useField = ({
  inputRef: externalInputRef,
  value = '',
  type = 'text',
  onChange = () => { },
  onFocus,
  onBlur,
  onKeyDown,
  onEnter,
  onEscape,
  onPaste,
  onDrop,
  clearOnEscape = false,
  bufferOnBlur = false,
  autoAdjustHeight = true,
  minHeight = 28,
  maxHeight,
  // Параметры для числовых полей
  numeric = false,
  allowDecimals = true,
  allowNegative = false,
  allowUnits = false,
  units = [],
  maxLength = null,
  min = null,
  max = null,
  ...restProps
}) => {
  // Создаем локальный ref, если не передан извне
  const internalInputRef = useRef(null);
  const inputRef = externalInputRef || internalInputRef;

  // Определяем, является ли поле textarea
  const isTextArea = useMemo(() => type === 'textarea', [type]);

  // Инициализируем хук для числовых полей (если нужно)
  const numericInput = useNumericInput({
    allowDecimals,
    allowNegative,
    allowUnits,
    units,
    maxLength,
    min,
    max,
    onChange: numeric ? onChange : null,
  });

  // Управление значением поля
  const {
    internalValue,
    handleChange: originalHandleChange,
    resetValue,
    internalFieldOnBlur,
  } = useFieldValue({
    value,
    onChange,
    bufferOnBlur,
    onBlur,
  });

  // для числовой валидации иначе простой onChange
  const handleChange = useCallback((event) => {
    if (numeric) {
      // Правильное извлечение значения - учитываем что target.value может быть пустой строкой
      let value;
      if (event && typeof event === 'object' && 'target' in event) {
        value = event.target.value;
      } else {
        value = event;
      }
      if (numericInput.isValidInput(value)) {
        originalHandleChange(event);
      }
    } else {
      originalHandleChange(event);
    }
  }, [numeric, numericInput, originalHandleChange]);


  const {
    isHovered,
    isFocused,
    handleHover,
    handleLeave,
    handleFocus,
    handleBlur,
  } = useFieldState({
    onFocus,
    onBlur: internalFieldOnBlur,
  });

  // Управление высотой textarea
  const { adjustHeight } = useTextAreaHeight({
    inputRef,
    value: internalValue,
    isTextArea,
    autoAdjustHeight,
    minHeight,
    maxHeight,
  });

  // Обработка клавиатурных событий
  const { handleKeyDown } = useFieldKeyboard({
    inputRef,
    onKeyDown,
    onEnter,
    onEscape,
    clearOnEscape,
    resetValue,
  });

  // Обработка специальных событий
  const { handlePaste, handleDrop } = useSpecialEvents({
    onChange: handleChange,
    onPaste,
    onDrop,
  });

  // Собираем все параметры
  const fieldProps = {
    ref: inputRef,
    type: isTextArea ? undefined : type,
    value: internalValue ?? '',
    onChange: handleChange,
    onKeyDown: handleKeyDown,
    onFocus: handleFocus,
    onBlur: handleBlur,
    onMouseEnter: handleHover,
    onMouseLeave: handleLeave,
    onPaste: handlePaste,
    onDrop: handleDrop,
    ...restProps,
  };

  return {
    inputRef,
    fieldProps,
    isHovered,
    isFocused,
    value: internalValue,
    adjustHeight,
    resetValue,
    handleChange,
    handleKeyDown,
    handleFocus,
    handleBlur,
    handleHover,
    handleLeave,
    handlePaste,
    handleDrop,
    // Числовые функции (если поле числовое)
    ...(numeric && {
      isValidInput: numericInput.isValidInput,
      formatValue: numericInput.formatValue,
      parseValue: numericInput.parseValue,
      getNumericValue: numericInput.getNumericValue,
      getUnit: numericInput.getUnit,
    }),
  };
};
